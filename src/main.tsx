@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color: #e2e8f0;
  background: #090b0f;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

html, body, #root {
  min-height: 100%;
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(50, 213, 131, 0.12), transparent 30%), #090b0f;
}

body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 9999px;
}

.card {
  @apply bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg shadow-slate-950/30;
}

input, select, textarea, button {
  @apply transition-all duration-200;
}

button:hover {
  @apply brightness-110;
}

.chart-card {
  @apply card p-4;
}
