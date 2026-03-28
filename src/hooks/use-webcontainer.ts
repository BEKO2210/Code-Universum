"use client";

import { useEffect, useRef, useCallback } from "react";
import type { WebContainer } from "@webcontainer/api";
import { getWebContainer, teardownWebContainer } from "@/lib/webcontainer/instance";
import { usePreviewStore } from "@/stores/preview-store";

export function useWebContainer() {
  const containerRef = useRef<WebContainer | null>(null);
  const { setStatus, setUrl, setError, reset } = usePreviewStore();

  useEffect(() => {
    return () => {
      teardownWebContainer();
      reset();
    };
  }, [reset]);

  const boot = useCallback(async () => {
    try {
      setStatus("booting");
      const container = await getWebContainer();
      containerRef.current = container;
      setStatus("idle");
      return container;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to boot WebContainer");
      return null;
    }
  }, [setStatus, setError]);

  const mountAndRun = useCallback(
    async (
      fileTree: import("@webcontainer/api").FileSystemTree,
      projectType: "static" | "node" | "nextjs" | "vite" = "static"
    ) => {
      const container = containerRef.current ?? (await boot());
      if (!container) return;

      try {
        // Mount files
        setStatus("mounting");
        await container.mount(fileTree);

        if (projectType === "static") {
          // For static sites, serve via a simple HTTP server
          const serverProcess = await container.spawn("npx", [
            "-y",
            "serve",
            ".",
            "-l",
            "3000",
          ]);

          serverProcess.output.pipeTo(
            new WritableStream({
              write(data) {
                console.log("[WebContainer]", data);
              },
            })
          );

          container.on("server-ready", (_port, url) => {
            setUrl(url);
            setStatus("ready");
          });
        } else {
          // For Node projects, install deps and run dev server
          setStatus("installing");
          const installProcess = await container.spawn("npm", ["install"]);

          const installExitCode = await installProcess.exit;
          if (installExitCode !== 0) {
            setError("npm install failed");
            return;
          }

          setStatus("running");
          const devProcess = await container.spawn("npm", ["run", "dev"]);

          devProcess.output.pipeTo(
            new WritableStream({
              write(data) {
                console.log("[WebContainer]", data);
              },
            })
          );

          container.on("server-ready", (_port, url) => {
            setUrl(url);
            setStatus("ready");
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "WebContainer error");
      }
    },
    [boot, setStatus, setUrl, setError]
  );

  return { boot, mountAndRun };
}
