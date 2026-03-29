import type { Component } from "solid-js";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App: Component = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
