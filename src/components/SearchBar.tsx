import type { Component } from "solid-js";
import TextArea from "../sections/TextArea";
import Button from "../sections/Button";
import FilterDropdown, { type FilterValues } from "../sections/FilterDropdown";

interface SearchBarProps {
  url: string;
  onUrlInput: (value: string) => void;
  filters: FilterValues;
  onFiltersChange: (values: FilterValues) => void;
  onSearch: () => void;
  loading?: boolean;
}

const SearchBar: Component<SearchBarProps> = (props) => {
  const canSearch = () => props.url.trim().length > 0 && !props.loading;

  return (
    <div class="flex items-start gap-2">
      <div class="flex-1">
        <TextArea
          value={props.url}
          onInput={props.onUrlInput}
          placeholder="Paste a YouTube URL..."
          disabled={props.loading}
        />
      </div>

      <Button
        onClick={props.onSearch}
        disabled={!canSearch()}
        variant="primary"
      >
        {props.loading ? (
          <svg
            class="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        {props.loading ? "Analyzing..." : "Search"}
      </Button>

      <FilterDropdown
        values={props.filters}
        onChange={props.onFiltersChange}
        disabled={props.loading}
      />
    </div>
  );
};

export default SearchBar;
