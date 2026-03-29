import { createSignal, For, Show } from "solid-js";
import type { Component } from "solid-js";
import SearchBar from "./SearchBar";
import ResultBlock from "../sections/ResultBlock";
import type { FilterValues, Style } from "../sections/FilterDropdown";
import { extractStream } from "../api/extract";

interface StyleResult {
  style: Style;
  content: string;
}

type PageState = "idle" | "streaming" | "done" | "error";

const Home: Component = () => {
  const [url, setUrl] = createSignal("");
  const [filters, setFilters] = createSignal<FilterValues>({
    numCtx: 4096,
    styles: ["takeaways"],
  });
  const [results, setResults] = createSignal<StyleResult[]>([]);
  const [state, setState] = createSignal<PageState>("idle");
  const [errorMsg, setErrorMsg] = createSignal("");

  let abortController: AbortController | null = null;

  const appendToStyle = (style: Style, chunk: string, replace?: boolean) => {
    setResults((prev) => {
      const existing = prev.find((r) => r.style === style);
      if (existing) {
        return prev.map((r) =>
          r.style === style
            ? { ...r, content: replace ? chunk : r.content + chunk }
            : r
        );
      }
      return [...prev, { style, content: chunk }];
    });
  };

  const handleSearch = async () => {
    if (!url().trim()) return;

    abortController?.abort();
    abortController = new AbortController();

    setState("streaming");
    setErrorMsg("");

    // Initialise empty result slots in selected order so they render immediately
    const orderedStyles: Style[] = (["summary", "takeaways"] as Style[]).filter(
      (s) => filters().styles.includes(s)
    );
    setResults(orderedStyles.map((style) => ({ style, content: "" })));

    try {
      await extractStream(
        { url: url().trim(), numCtx: filters().numCtx, styles: filters().styles },
        { onChunk: appendToStyle },
        abortController.signal
      );
      setState("done");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setErrorMsg((err as Error).message ?? "Something went wrong");
      setState("error");
    }
  };

  return (
    <main class="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pt-24 pb-16">
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Analyze any video
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Paste a YouTube URL, choose your analysis style, and get instant
          insights.
        </p>
      </div>

      <SearchBar
        url={url()}
        onUrlInput={setUrl}
        filters={filters()}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        loading={state() === "streaming"}
      />

      <Show when={state() === "error"}>
        <div class="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg()}
        </div>
      </Show>

      <Show when={results().length > 0}>
        <div class="mt-8 flex flex-col gap-4">
          <For each={results()}>
            {(result) => (
              <ResultBlock
                style={result.style}
                content={result.content}
                streaming={state() === "streaming"}
              />
            )}
          </For>
        </div>
      </Show>
    </main>
  );
};

export default Home;
