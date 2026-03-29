import { createMemo, Show } from "solid-js";
import type { Component } from "solid-js";
import { marked } from "marked";
import type { Style } from "./FilterDropdown";

interface ResultBlockProps {
  style: Style;
  content: string;
  streaming?: boolean;
}

const LABELS: Record<Style, string> = {
  summary: "Summary",
  takeaways: "Key Takeaways",
};

const ResultBlock: Component<ResultBlockProps> = (props) => {
  const html = createMemo(() => marked.parse(props.content) as string);

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center gap-2">
        <h3 class="text-base font-semibold text-gray-900">
          {LABELS[props.style]}
        </h3>
        <Show when={props.streaming}>
          <span class="inline-flex gap-0.5">
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:0ms]" />
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:150ms]" />
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:300ms]" />
          </span>
        </Show>
      </div>
      <div
        class="text-sm leading-relaxed text-gray-700
          [&_p]:mb-3 [&_p:last-child]:mb-0
          [&_ul]:space-y-1.5 [&_ul]:pl-5
          [&_li]:list-disc [&_li]:marker:text-blue-500
          [&_strong]:font-semibold [&_strong]:text-gray-900
          [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs"
        innerHTML={html()}
      />
    </div>
  );
};

export default ResultBlock;
