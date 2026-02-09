import { useEffect, useState } from "react";

type KpisResp = {
  ok: boolean;
  data?: any;
  error?: string;
};

export default function App() {
  const API = String(
    import.meta.env.VITE_API_URL || "https://revops-api-614980035835.us-east1.run.app"
  ).replace(/\/$/, "");

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // TROCA AQUI se quiser outro cliente
        const url = `${API}/kpis?client_id=dark&days=30`;

        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const text = await res.text();

        if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}: ${text.slice(0, 160)}`);

        if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
          const j = JSON.parse(text) as KpisResp;
          if (!j?.ok) throw new Error(j?.error || "API ok=false");
          setData(j.data ?? null);
        } else {
          throw new Error(`Resposta não-JSON (${res.status}) de ${url}: ${text.slice(0, 160)}`);
        }
      } catch (e: any) {
        setError(String(e?.message || e));
      }
    })();
  }, [API]);

  if (error) return <div style={{ padding: 16 }}>Erro: {error}</div>;

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>RevOps MVP (BigQuery via API)</h1>
      <p>
        <b>API:</b> {API}
      </p>

      <h3>KPIs (dark / 30d)</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}