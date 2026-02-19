import React, { useMemo, useState } from "react";
import {
  Lock,
  User,
  ArrowRight,
  Database,
  BarChart3,
  Mail,
  MessageSquare,
  Layers,
  ShieldCheck,
  Cloud,
  Activity,
} from "lucide-react";

type Props = {
  onLogin: () => void;
};

const Pill = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--panel)]/5 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
    <Icon size={14} className="text-cyan-300" />
    <span className="whitespace-nowrap">{label}</span>
  </div>
);

const Stat = ({ k, v }: { k: string; v: string }) => (
  <div className="rounded-xl border border-white/10 bg-[var(--panel)]/5 px-4 py-3">
    <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">
      {k}
    </div>
    <div className="mt-1 text-sm font-extrabold text-white">{v}</div>
  </div>
);

const LoginView: React.FC<Props> = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);

  const DEMO_USER = "adm123";
  const DEMO_PASS = "123456";

  const sources = useMemo(
    () => [
      { icon: BarChart3, label: "GA4" },
      { icon: Mail, label: "RD Station" },
      { icon: Database, label: "BigQuery" },
      { icon: Cloud, label: "Cloud Run API" },
      { icon: MessageSquare, label: "WhatsApp / BLiP" },
      { icon: Layers, label: "Raw • Silver • Gold" },
      { icon: Activity, label: "Dashboards" },
      { icon: ShieldCheck, label: "Governança" },
    ],
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (user.trim() === DEMO_USER && pass === DEMO_PASS) {
      onLogin();
      return;
    }

    setError("Usuário ou senha inválidos. Use o demo para testar.");
  };

  const fillDemo = () => {
    setUser(DEMO_USER);
    setPass(DEMO_PASS);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-stretch">
        {/* Left: Login */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-[420px] lg:justify-start">
          <div className="w-full max-w-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 grid place-items-center shadow-lg shadow-violet-600/25">
                <span className="text-lg font-black">R</span>
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight">
                  RevOps <span className="text-cyan-300">OS</span>
                </div>
                <div className="text-xs text-white/60">
                  Sistema Operacional de Receita
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[var(--panel)]/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-5">
                <div className="text-sm font-extrabold">Acesso à plataforma</div>
                <div className="mt-1 text-xs text-white/60">
                  Entre com suas credenciais para visualizar os painéis.
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                    Usuário
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 focus-within:border-cyan-400/40">
                    <User size={16} className="text-white/50" />
                    <input
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      placeholder="Digite seu usuário"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
                      autoComplete="username"
                      name="username"
                      id="username"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                    Senha
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 focus-within:border-cyan-400/40">
                    <Lock size={16} className="text-white/50" />
                    <input
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Digite sua senha"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
                      autoComplete="current-password"
                      name="password"
                      id="password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
                >
                  Acessar Plataforma
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-0.5"
                  />
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="text-xs font-semibold text-white/65 hover:text-white"
                  >
                    Preencher demo
                  </button>
                  <div className="text-[11px] text-white/45">
                    Demo:{" "}
                    <span className="font-semibold text-white/70">
                      {DEMO_USER}
                    </span>{" "}
                    /{" "}
                    <span className="font-semibold text-white/70">
                      {DEMO_PASS}
                    </span>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-6 text-xs text-white/40">
              © {new Date().getFullYear()} RevOps OS. Todos os direitos
              reservados.
            </div>
          </div>
        </div>

        {/* Right: Visual / Branding */}
        <div className="hidden flex-1 items-center justify-center px-8 py-10 lg:flex">
          <div className="w-full max-w-2xl">
            <div className="rounded-3xl border border-white/10 bg-[var(--panel)]/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-2xl font-extrabold tracking-tight">
                    Conecte fontes. Normalize dados. Tome decisão.
                  </div>
                  <div className="mt-2 text-sm text-white/60">
                    Uma camada operacional que organiza funil, receita e
                    performance — com governança e rastreabilidade.
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {sources.map((s) => (
                      <Pill key={s.label} icon={s.icon} label={s.label} />
                    ))}
                  </div>
                </div>

                <div className="hidden xl:block">
                  <div className="grid gap-3">
                    <Stat k="Latência" v="< 200ms (API)" />
                    <Stat k="Modelo" v="Multi-tenant" />
                    <Stat k="Camadas" v="Raw • Silver • Gold" />
                  </div>
                </div>
              </div>

              {/* Decorative “data tools” illustration */}
              <div className="mt-8 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-7 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-extrabold text-white/70">
                      Pipeline
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      ingest → model → insight
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: "GA4 Sessions", w: "w-[86%]" },
                      { name: "RD Leads", w: "w-[72%]" },
                      { name: "Deals & Revenue", w: "w-[64%]" },
                      { name: "BigQuery Tables", w: "w-[78%]" },
                    ].map((row) => (
                      <div key={row.name}>
                        <div className="flex items-center justify-between text-[11px] text-white/55">
                          <span>{row.name}</span>
                          <span className="text-white/35">sync</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-[var(--panel)]/10">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 ${row.w}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs font-extrabold text-white/70">
                    Stack
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      { icon: Database, label: "Warehouse" },
                      { icon: BarChart3, label: "Dashboards" },
                      { icon: ShieldCheck, label: "Compliance" },
                      { icon: Layers, label: "Modeling" },
                    ].map((it) => (
                      <div
                        key={it.label}
                        className="rounded-xl border border-white/10 bg-[var(--panel)]/5 p-4"
                      >
                        <it.icon size={18} className="text-cyan-300" />
                        <div className="mt-2 text-sm font-extrabold">
                          {it.label}
                        </div>
                        <div className="text-xs text-white/45">
                          pronto p/ escalar
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[11px] text-white/45">
                Dica: quando você conectar dados reais, essa área pode virar
                “Status das integrações” (verde/amarelo/vermelho).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginView };