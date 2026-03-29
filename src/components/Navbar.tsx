import type { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <nav class="fixed top-0 left-0 right-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div class="mx-auto flex h-14 max-w-3xl items-center px-4">
        <span class="text-lg font-bold tracking-tight text-gray-900">
          Lexaclaw
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
