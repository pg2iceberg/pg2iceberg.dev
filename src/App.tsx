import {
  ArrowRight,
  Database,
  Zap,
  GitBranch,
  BarChart3,
  Layers,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { GitHubStars } from "@/components/github-stars";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

const k = "text-sky-400";
const v = "text-amber-200";
const c = "text-neutral-500";
const p = "text-neutral-100";

const yamlConfig = (
  <>
    <span className={k}>tables</span><span className={p}>:</span>{"\n"}
    <span className={p}>  - </span><span className={k}>name</span><span className={p}>: </span><span className={v}>public.users</span>{"\n"}
    <span className={p}>  - </span><span className={k}>name</span><span className={p}>: </span><span className={v}>public.orders</span>{"\n"}
    <span className={p}>    </span><span className={k}>iceberg</span><span className={p}>:</span>{"\n"}
    <span className={p}>      </span><span className={k}>partition</span><span className={p}>:</span>{"\n"}
    <span className={p}>        - </span><span className={v}>day(created_at)</span>{"\n"}
    {"\n"}
    <span className={k}>source</span><span className={p}>:</span>{"\n"}
    <span className={p}>  </span><span className={k}>mode</span><span className={p}>: </span><span className={v}>logical</span>  <span className={c}># or "query"</span>{"\n"}
    <span className={p}>  </span><span className={k}>postgres</span><span className={p}>:</span>{"\n"}
    <span className={p}>    </span><span className={k}>host</span><span className={p}>: </span><span className={v}>localhost</span>{"\n"}
    <span className={p}>    </span><span className={k}>port</span><span className={p}>: </span><span className={v}>5432</span>{"\n"}
    <span className={p}>    </span><span className={k}>database</span><span className={p}>: </span><span className={v}>myapp</span>{"\n"}
    <span className={p}>    </span><span className={k}>user</span><span className={p}>: </span><span className={v}>replicator</span>{"\n"}
    <span className={p}>    </span><span className={k}>password</span><span className={p}>: </span><span className={v}>{"${PG_PASSWORD}"}</span>{"\n"}
    <span className={p}>  </span><span className={k}>logical</span><span className={p}>:</span>{"\n"}
    <span className={p}>    </span><span className={k}>publication_name</span><span className={p}>: </span><span className={v}>pg2iceberg_pub</span>{"\n"}
    <span className={p}>    </span><span className={k}>slot_name</span><span className={p}>: </span><span className={v}>pg2iceberg_slot</span>{"\n"}
    {"\n"}
    <span className={k}>sink</span><span className={p}>:</span>{"\n"}
    <span className={p}>  </span><span className={k}>catalog_uri</span><span className={p}>: </span><span className={v}>http://localhost:8181</span>{"\n"}
    <span className={p}>  </span><span className={k}>warehouse</span><span className={p}>: </span><span className={v}>s3://my-data-lake/</span>{"\n"}
    <span className={p}>  </span><span className={k}>namespace</span><span className={p}>: </span><span className={v}>default</span>{"\n"}
    <span className={p}>  </span><span className={k}>s3_endpoint</span><span className={p}>: </span><span className={v}>s3.amazonaws.com</span>{"\n"}
    <span className={p}>  </span><span className={k}>s3_region</span><span className={p}>: </span><span className={v}>us-east-1</span>
  </>
);

const features = [
  {
    icon: Zap,
    title: "Real-time CDC",
    description:
      "Stream changes from PostgreSQL WAL directly to Iceberg tables with minimal replication lag.",
  },
  {
    icon: Layers,
    title: "Managed Iceberg",
    description:
      "Handles table maintenance automatically — compaction, orphan file deletion, and more.",
  },
  {
    icon: GitBranch,
    title: "Schema Evolution",
    description:
      "Automatically handles column additions, drops, and type migrations from your source database.",
  },
  {
    icon: Database,
    title: "Merge-on-Read",
    description:
      "Efficient updates and deletes using Iceberg merge-on-read semantics for fast append-only writes.",
  },
  {
    icon: BarChart3,
    title: "Prometheus Metrics",
    description:
      "Built-in observability with Prometheus metrics, health endpoints, and replication lag tracking.",
  },
  {
    icon: Layers,
    title: "Table Partitioning",
    description:
      "Supports Iceberg partitioning with transforms: identity, year, month, day, and hour.",
  },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <a href="/" className="text-lg font-semibold tracking-tight text-foreground">
            pg2iceberg
          </a>
          <div className="hidden items-center gap-4 text-sm text-muted-foreground sm:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#quickstart" className="transition-colors hover:text-foreground">
              Quickstart
            </a>
          </div>
        </div>
        <GitHubStars />
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <Badge variant="secondary" className="mb-6">
          Open Source &middot; MIT License
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          The shortest path from
          <br />
          <span className="text-muted-foreground">Postgres to Iceberg.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Replicate data from PostgreSQL to Apache Iceberg tables in near real-time.
          Query your data from any Iceberg-compatible query engines.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#quickstart"
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/pg2iceberg/pg2iceberg"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Simple Architecture
        </h2>
        <p className="mt-3 text-muted-foreground">
          One binary. No moving parts. Just Postgres and Iceberg.
        </p>
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="flex items-center justify-center gap-0">
            {/* App node */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-24 items-center justify-center border border-foreground/20 bg-background">
                <span className="text-xs font-medium text-foreground/70">App</span>
              </div>
            </div>
            {/* Arrow: App -> Postgres (long enough to span enclosure padding and touch Postgres box) */}
            <div className="h-px w-[60px] sm:w-[72px] bg-foreground/20 relative shrink-0 z-10">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-gray-400" />
            </div>
            {/* pg2iceberg enclosure + fork that extends out */}
            <div className="flex items-center">
              <div className="relative bg-emerald-500/5 border border-dashed border-emerald-500/30 px-6 py-8 sm:px-8 sm:py-8 -ml-[25px] sm:-ml-[33px]">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 px-3 text-[11px] font-medium tracking-[0.1em] text-emerald-600/60">
                  pg2iceberg
                </span>
                <div className="flex items-center">
                  <div className="relative shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center bg-foreground/[0.04] border border-foreground/10">
                      <Database className="h-6 w-6 text-foreground/60" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/70 whitespace-nowrap">
                      Postgres
                    </span>
                  </div>
                  <div className="w-12 h-px bg-foreground/20 relative shrink-0 sm:w-16">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-gray-400" />
                  </div>
                  <div className="relative shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center bg-foreground/[0.04] border border-foreground/10">
                      <Layers className="h-6 w-6 text-foreground/60" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/70 whitespace-nowrap">
                      Iceberg
                    </span>
                  </div>
                </div>
              </div>
              {/* Fork from Iceberg — negative margin to touch Iceberg box */}
              {/* self-center aligns this to the center of the enclosure's content area, not its padding */}
              <div className="flex items-center shrink-0 -ml-[25px] sm:-ml-[33px]">
                <svg width="72" height="132" viewBox="0 0 72 132" fill="none" className="text-foreground/20 shrink-0">
                  {/* Stem */}
                  <line x1="0" y1="66" x2="48" y2="66" stroke="currentColor" strokeWidth="1" />
                  {/* Top branch */}
                  <path d="M48 66 L48 18 L66 18" stroke="currentColor" strokeWidth="1" fill="none" />
                  <polygon points="66,15 72,18 66,21" fill="#9ca3af" />
                  {/* Middle branch */}
                  <line x1="48" y1="66" x2="66" y2="66" stroke="currentColor" strokeWidth="1" />
                  <polygon points="66,63 72,66 66,69" fill="#9ca3af" />
                  {/* Bottom branch */}
                  <path d="M48 66 L48 114 L66 114" stroke="currentColor" strokeWidth="1" fill="none" />
                  <polygon points="66,111 72,114 66,117" fill="#9ca3af" />
                </svg>
                <div className="flex flex-col gap-3">
                  {["Snowflake", "ClickHouse", "DuckDB"].map((engine) => (
                    <div
                      key={engine}
                      className="flex h-9 w-28 items-center justify-center border border-foreground/15 bg-background px-3"
                    >
                      <span className="text-[10px] font-medium text-foreground/60 whitespace-nowrap">
                        {engine}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Built for Production
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to replicate Postgres to Iceberg reliably.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <div className="mb-3 inline-flex rounded-none border border-border bg-muted/50 p-2.5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                <feature.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section id="quickstart" className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Quickstart
          </h2>
          <p className="mt-3 text-muted-foreground">
            Configure your source and sink, then run a single binary.
          </p>
        </div>
        <div className="mt-12 space-y-6">
          <div className="overflow-hidden rounded-none border border-neutral-700 bg-neutral-900">
            <div className="flex items-center gap-2 border-b border-neutral-700 bg-neutral-800 px-4 py-2.5">
              <Terminal className="h-4 w-4 text-neutral-400" />
              <span className="text-xs font-medium text-neutral-400">
                config.yaml
              </span>
            </div>
            <div className="relative">
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code>{yamlConfig}</code>
              </pre>
            </div>
          </div>
          <div className="overflow-hidden rounded-none border border-neutral-700 bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-800 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-400">
                  Terminal
                </span>
              </div>
              <CopyButton text="docker run -v ./config.yaml:/config.yaml ghcr.io/pg2iceberg/pg2iceberg" />
            </div>
            <pre className="overflow-x-auto p-4 text-sm">
              <code className="text-neutral-100">
                <span className="text-neutral-500 select-none">$ </span>docker run -v ./config.yaml:/config.yaml ghcr.io/pg2iceberg/pg2iceberg
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <span className="text-sm font-semibold text-foreground">pg2iceberg</span>
            <p className="mt-1 text-xs text-muted-foreground">
              Open source under the MIT License.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/pg2iceberg/pg2iceberg"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://github.com/pg2iceberg/pg2iceberg/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Issues
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <Hero />
      <Architecture />
      <Features />

      <QuickStart />
      <Footer />
    </div>
  );
}

export default App;