"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { TagBadge } from "@/components/ui/tag-badge";
import { SnippetPreview } from "@/components/preview/snippet-preview";
import type { ComponentWithAuthor } from "@/types";

interface ComponentCardProps {
  component: ComponentWithAuthor;
}

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <GlassCard glow="cyan" className="overflow-hidden flex flex-col">
      {/* Preview area */}
      <div className="relative h-48 border-b border-[var(--cu-border)]">
        <SnippetPreview
          html={component.code_html ?? undefined}
          css={component.code_css ?? undefined}
          js={component.code_js ?? undefined}
          tailwind={component.code_tailwind ?? undefined}
          theme="dark"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate">
            {component.title}
          </h3>
          <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {component.likes_count}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2">
          {component.author.avatar_url && (
            <img
              src={component.author.avatar_url}
              alt={component.author.username}
              className="w-5 h-5 rounded-full"
            />
          )}
          <span className="text-xs text-[var(--cu-text-secondary)]">
            {component.author.username}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {component.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag.id} label={tag.name} />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
