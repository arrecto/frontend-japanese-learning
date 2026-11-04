import { Suspense } from "react";

import { apiGet } from "@/lib/api";
import type { HealthStatus } from "@/types/corpus";

async function ApiStatus() {
  const health = await apiGet<HealthStatus>("/health/db", { cache: "no-store" }).catch(() => null);
  if (!health) return <span className="text-weak">API: unreachable</span>;
  return (
    <span className="text-correct">
      API: {health.status} · {health.speakers} speakers
    </span>
  );
}

export default function Home() {
  return (
    <main className="bg-canvas flex flex-1 flex-col items-center justify-center gap-3 p-8">
      <h1 className="font-display text-3xl font-medium tracking-tight">
        tuon
        <span lang="ja" className="font-jp text-accent ml-2 text-2xl">
          トゥオン
        </span>
      </h1>
      <p lang="ja" className="font-jp text-secondary text-lg tracking-wide">
        日本語の発音を聞き分けよう
      </p>
      <p className="font-mono text-muted text-xs tracking-widest">
        <Suspense fallback="API: checking…">
          <ApiStatus />
        </Suspense>
      </p>
    </main>
  );
}
