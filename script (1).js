/* Paleta de Cores e Estilo Dark Gamer */
:root {
    --bg-color: #0b0f19;
    --card-bg: #151f32;
    --text-color: #f1f5f9;
    --accent-color: #38bdf8;
    --danger-color: #ef4444;
    --success-color: #4ade80;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
}

header {
    background: linear-gradient(135deg, #1e1b4b, #2e1065);
    text-align: center;
    padding: 3rem 1rem;
    border-bottom: 4px solid var(--accent-color);
}

header h1 {
    font-size: 2.6rem;
    color: var(--accent-color);
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
}

nav {
    display: flex;
    justify-content: center;
    background-color: #030712;
    position: sticky;
    top: 0;
    z-index: 100;
}

nav a {
    color: var(--text-color);
    padding: 1rem 1.5rem;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.2s;
}

nav a:hover {
    background-color: var(--accent-color);
    color: var(--bg-color);
}

.container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.card {
    background-color: var(--card-bg);
    padding: 2.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

h2 {
    color: var(--accent-color);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
}

p { margin-bottom: 1rem; }
ul, ol { margin-left: 1.5rem; margin-bottom: 1rem; }
li { margin-bottom: 0.6rem; }

/* Layout Alternado de Imagens/Emojis */
.section-layout {
    display: flex;
    gap: 2rem;
    align-items: center;
    flex-wrap: wrap;
}

.section-layout.reverse { flex-direction: row-reverse; }
.text-block { flex: 2; min-width: 280px; }

.image-block {
    flex: 1;
    min-width: 150px;
    font-size: 6rem;
    text-align: center;
    user-select: none;
    animation: float 4s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* =========================================
   ESTRUTURA COMPLETA DO JOGO 
============================================ */
.game-section {
    border: 2px solid var(--accent-color);
    text-align: center;
}

.game-hud {
    display: flex;
    justify-content: space-around;
    font-size: 1.4rem;
    font-weight: bold;
    margin: 1rem 0;
    background-color: #030712;
    padding: 0.6rem;
    border-radius: 8px;
}

#game-canvas-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid #334155;
    background-color: #030712;
}

canvas {
    display: block;
    width: 100%;
    height: auto;
}

/* Botões do Painel Touch/Mouse */
.mobile-controls {
    display: flex;
    background-color: #111827;
    border-top: 2px solid #334155;
}

.control-btn {
    flex: 1;
    padding: 1.2rem;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    background-color: transparent;
    color: white;
    cursor: pointer;
}
.control-btn:active { background-color: #1f2937; }

/* Telas Sobrepostas */
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(3, 7, 18, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

#game-over-screen h3 {
    color: var(--danger-color);
    font-size: 2.2rem;
    margin-bottom: 1rem;
}

#game-over-screen p { font-size: 1.3rem; margin-bottom: 1.5rem; }

.play-btn {
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: var(--accent-color);
    color: var(--bg-color);
    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);
    transition: transform 0.1s;
}
.play-btn:hover { transform: scale(1.04); }

.hidden { display: none !important; }

footer {
    text-align: center;
    padding: 2.5rem;
    background-color: #030712;
    color: #64748b;
    margin-top: 4rem;
}

@media (max-width: 600px) {
    header h1 { font-size: 1.8rem; }
    .card { padding: 1.5rem; }
}
