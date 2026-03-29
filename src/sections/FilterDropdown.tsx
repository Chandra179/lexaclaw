import { createSignal, For, Show, onCleanup } from "solid-js";
import type { Component } from "solid-js";

export type Style = "summary" | "takeaways";
export type NumCtx = 4096 | 8192;

export interface FilterValues {
  numCtx: NumCtx;
  styles: Style[];
}

interface FilterDropdownProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  disabled?: boolean;
}

const CTX_OPTIONS: NumCtx[] = [4096, 8192];
const STYLE_OPTIONS: { value: Style; label: string }[] = [
  { value: "summary", label: "Summary" },
  { value: "takeaways", label: "Takeaways" },
];

const FilterDropdown: Component<FilterDropdownProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  let containerRef!: HTMLDivElement;

  const handleOutsideClick = (e: MouseEvent) => {
    if (!containerRef.contains(e.target as Node)) setOpen(false);
  };

  document.addEventListener("mousedown", handleOutsideClick);
  onCleanup(() => document.removeEventListener("mousedown", handleOutsideClick));

  const toggleStyle = (style: Style) => {
    const current = props.values.styles;
    const next = current.includes(style)
      ? current.filter((s) => s !== style)
      : [...current, style];
    if (next.length === 0) return;
    props.onChange({ ...props.values, styles: next });
  };

  const activeCount = () => props.values.styles.length;

  return (
    <div ref={containerRef} class="relative shrink-0">
      <button
        type="button"
        disabled={props.disabled}
        onClick={() => setOpen((v) => !v)}
        class={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors disabled:opacity-50 ${
          open()
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm2 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Filter
        <Show when={activeCount() > 0}>
          <span class="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {activeCount()}
          </span>
        </Show>
      </button>

      <Show when={open()}>
        <div class="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
          <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Context size
          </p>
          <div class="mb-4 flex gap-2">
            <For each={CTX_OPTIONS}>
              {(opt) => (
                <button
                  type="button"
                  onClick={() =>
                    props.onChange({ ...props.values, numCtx: opt })
                  }
                  class={`flex-1 rounded-lg border py-1.5 text-sm font-medium transition-colors ${
                    props.values.numCtx === opt
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              )}
            </For>
          </div>

          <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Styles
          </p>
          <div class="flex flex-col gap-1.5">
            <For each={STYLE_OPTIONS}>
              {({ value, label }) => {
                const checked = () => props.values.styles.includes(value);
                return (
                  <label class="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={checked()}
                      onChange={() => toggleStyle(value)}
                      class="h-4 w-4 rounded border-gray-300 accent-blue-600"
                    />
                    <span class="text-sm text-gray-700">{label}</span>
                  </label>
                );
              }}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default FilterDropdown;
