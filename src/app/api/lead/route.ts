import { NextResponse } from "next/server";

/**
 * Recebe o formulário do site e repassa para o webhook do n8n.
 *
 * O envio é feito aqui no servidor (e não direto do navegador) porque o
 * webhook do n8n não responde com cabeçalhos CORS — um fetch do cliente
 * seria bloqueado. Assim a URL também não vai para o bundle do cliente.
 */

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "https://n8n.vsgrowth.com.br/webhook/form-site-vs";

const TIMEOUT_MS = 10_000;

type Lead = {
  nome: string;
  whatsapp: string;
  faturamento: string;
};

function ehLeadValido(valor: unknown): valor is Lead {
  if (typeof valor !== "object" || valor === null) return false;
  const d = valor as Record<string, unknown>;
  return (
    typeof d.nome === "string" &&
    d.nome.trim().length > 1 &&
    typeof d.whatsapp === "string" &&
    d.whatsapp.replace(/\D/g, "").length >= 10 &&
    typeof d.faturamento === "string" &&
    d.faturamento.trim().length > 0
  );
}

export async function POST(request: Request) {
  let corpo: unknown;

  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  if (!ehLeadValido(corpo)) {
    return NextResponse.json(
      { erro: "Preencha nome, WhatsApp e faturamento corretamente." },
      { status: 400 }
    );
  }

  const payload = {
    nome: corpo.nome.trim(),
    whatsapp: corpo.whatsapp.trim(),
    faturamento: corpo.faturamento,
    origem: "site-vs-growth",
    enviadoEm: new Date().toISOString(),
  };

  try {
    const resposta = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text().catch(() => "");
      console.error(
        `[lead] n8n respondeu ${resposta.status}: ${detalhe.slice(0, 300)}`
      );
      return NextResponse.json(
        { erro: "Não conseguimos registrar seu contato agora." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (erro) {
    console.error("[lead] falha ao chamar o webhook do n8n:", erro);
    return NextResponse.json(
      { erro: "Não conseguimos registrar seu contato agora." },
      { status: 502 }
    );
  }
}
