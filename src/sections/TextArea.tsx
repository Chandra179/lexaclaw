import type { Component } from "solid-js";

interface TextAreaProps {
  value: string;
  onInput: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TextArea: Component<TextAreaProps> = (props) => {
  return (
    <textarea
      value={props.value}
      onInput={(e) => props.onInput(e.currentTarget.value)}
      placeholder={props.placeholder ?? "Enter URL..."}
      disabled={props.disabled}
      rows={1}
      class="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
    />
  );
};

export default TextArea;
