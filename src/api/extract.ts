import type { Style } from "../sections/FilterDropdown";

export interface ExtractRequest {
  url: string;
  numCtx: number;
  styles: Style[];
}

export interface ExtractCallbacks {
  onChunk: (style: Style, chunk: string, replace?: boolean) => void;
}

type StreamEvent = {
  style?: Style;
  content?: string[];
};

export async function extractStream(
  req: ExtractRequest,
  callbacks: ExtractCallbacks,
  signal: AbortSignal
): Promise<void> {
  const response = await fetch("http://localhost:8080/extract/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      url: req.url,
      num_ctx: req.numCtx,
      styles: req.styles,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const raw = line.slice(5).trim();
      if (!raw || raw === "[DONE]") continue;

      try {
        const parsed = JSON.parse(raw) as StreamEvent;
        const { style, content } = parsed;
        if (!style || !Array.isArray(content) || content.length === 0) continue;

        if (content.length === 1) {
          // summary: stream text incrementally, append each chunk
          callbacks.onChunk(style, content[0], false);
        } else {
          // takeaways: replace with full updated markdown list
          const markdown = content.map((item) => `- ${item}`).join("\n");
          callbacks.onChunk(style, markdown, true);
        }
      } catch {
        // ignore unparseable events
      }
    }
  }
}
