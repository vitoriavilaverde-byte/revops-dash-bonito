// src/utils/exporters.ts
type AnyRow = Record<string, any>;

function toCsv(rows: AnyRow[]) {
  if (!rows?.length) return "";
  const headers = Array.from(new Set(rows.flatMap(r => Object.keys(r))));
  const escape = (v: any) => {
    const s = v == null ? "" : String(v);
    const needs = /[",\n]/.test(s);
    const out = s.replace(/"/g, '""');
    return needs ? `"${out}"` : out;
  };
  const lines = [
    headers.join(","),
    ...rows.map(r => headers.map(h => escape(r[h])).join(",")),
  ];
  return lines.join("\n");
}

function downloadBlob(content: BlobPart, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportCSV(rows: AnyRow[], filename = "export.csv") {
  const csv = toCsv(rows);
  downloadBlob(csv, filename, "text/csv;charset=utf-8");
}

export function exportXLSX(rows: AnyRow[], filename = "export.xlsx") {
  // Sem lib externa: gera um HTML-table que o Excel abre como .xlsx (compatível)
  // Depois, se quiser, eu troco por SheetJS (xlsx) de verdade.
  const headers = Array.from(new Set(rows.flatMap(r => Object.keys(r))));
  const esc = (v: any) =>
    (v == null ? "" : String(v)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
  <html><head><meta charset="utf-8"/></head><body>
  <table border="1">
    <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
    <tbody>
      ${rows.map(r => `<tr>${headers.map(h => `<td>${esc(r[h])}</td>`).join("")}</tr>`).join("")}
    </tbody>
  </table>
  </body></html>`;
  downloadBlob(html, filename, "application/vnd.ms-excel");
}

export function exportPDFSimple(title: string, rows: AnyRow[], filename = "export.pdf") {
  // Sem lib externa: abre print dialog com um HTML básico (usuário salva como PDF)
  const headers = Array.from(new Set(rows.flatMap(r => Object.keys(r))));
  const esc = (v: any) =>
    (v == null ? "" : String(v)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>${esc(title)}</title>
      <style>
        body{font-family:system-ui,Segoe UI,Roboto,Arial;margin:24px}
        h1{font-size:18px;margin:0 0 12px}
        table{border-collapse:collapse;width:100%}
        th,td{border:1px solid #ddd;padding:8px;font-size:12px}
        th{background:#f3f4f6;text-align:left}
      </style>
    </head>
    <body>
      <h1>${esc(title)}</h1>
      <table>
        <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map(r => `<tr>${headers.map(h => `<td>${esc(r[h])}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
      <script>
        window.onload = () => { window.print(); };
      </script>
    </body>
  </html>`;

  const w = window.open("", "_blank");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
  // o usuário escolhe "Salvar como PDF"
}
