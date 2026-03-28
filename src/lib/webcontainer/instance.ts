import { WebContainer } from "@webcontainer/api";

let instance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

/**
 * Get or boot the singleton WebContainer instance.
 * Only ONE WebContainer can exist per browser tab.
 */
export async function getWebContainer(): Promise<WebContainer> {
  if (instance) return instance;

  if (bootPromise) return bootPromise;

  bootPromise = WebContainer.boot().then((container) => {
    instance = container;
    return container;
  });

  return bootPromise;
}

/**
 * Tear down the WebContainer instance.
 * Call this on unmount or navigation away from preview pages.
 */
export function teardownWebContainer(): void {
  if (instance) {
    instance.teardown();
    instance = null;
    bootPromise = null;
  }
}
