const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Captura de Interface Interna
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreText = document.getElementById("final-score-text");
const scoreDisplay = document.getElementById("score-display");
const livesDisplay = document.getElementById("lives-display");

const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

// Parâmetros da Engine
let score = 0;
let totalVitals = 100; // Sistema baseado em porcentagem de integridade (Premium)
let isGameRunning = false;
let loopId;
let items = [];
let spawnTimer = 0;

// Elemento Controlado (Cesta Minimalista de Linha Fina)
const basket = {
    x: 310,
    y: 360,
    width: 80,
    height: 6,
    speed: 16,
    color: "#d4af37" // Cor dourada corporativa
};

let keys = { ArrowLeft: false, ArrowRight: false };

// Classe Construtora dos Blocos de Mídia Sintética
class FallItem {
    constructor() {
        this.x = Math.random() * (canvas.width - 40) + 20;
        this.y = -20;
        this.width = 55;
        this.height = 18;
        this.speed = Math.random() * 1.5 + 2.5 + (score * 0.005);
        
        this.isFake = Math.random() < 0.55;
        this.color = this.isFake ? "#f87171" : "#34d399";
        this.label = this.isFake ? "SYNTH" : "DATA";
    }

    draw() {
        // Design Premium: Bordas finas geométricas sem preenchimento pesado
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Sub-linha de brilho sutil
        ctx.fillStyle = this.color;
        ctx.font = "bold 8px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(this.label, this.x + this.width / 2, this.y + 12);
    }

    update() {
        this.y += this.speed;
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid de linhas de fundo sutis (estética de terminal financeiro/tecnológico)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    for(let i = 50; i < canvas.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }

    // Movimentação da Cesta
    if (keys.ArrowLeft && basket.x > 0) basket.x -= basket.speed;
    if (keys.ArrowRight && basket.x < canvas.width - basket.width) basket.x += basket.speed;

    // Renderização do Cesto (Traço Premium)
    ctx.fillStyle = basket.color;
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
    
    // Brilho sob o cesto
    ctx.fillStyle = "rgba(214, 175, 55, 0.15)";
    ctx.fillRect(basket.x - 4, basket.y + basket.height, basket.width + 8, 2);

    // Geração de fluxos
    spawnTimer++;
    if (spawnTimer >= 40) {
        items.push(new FallItem());
        spawnTimer = 0;
    }

    // Varredura de colisões
    for (let i = items.length - 1; i >= 0; i--) {
        items[i].update();
        items[i].draw();

        // Verificação Matemática de Coleta
        if (
            items[i].y + items[i].height >= basket.y &&
            items[i].y <= basket.y + basket.height &&
            items[i].x + items[i].width >= basket.x &&
            items[i].x <= basket.x + basket.width
        ) {
            if (items[i].isFake) {
                // Penalidade
                totalVitals -= 25;
                if(totalVitals <= 0) {
                    totalVitals = 0;
                    livesDisplay.innerText = "CRÍTICO";
                    endGame();
                    return;
                }
                livesDisplay.innerText = totalVitals + "%";
            } else {
                // Progresso
                score += 5;
                scoreDisplay.innerText = score + "%";
            }
            items.splice(i, 1);
            continue;
        }

        // Remover se sair do escopo
        if (items[i].y > canvas.height) {
            items.splice(i, 1);
        }
    }

    if (isGameRunning) {
        loopId = requestAnimationFrame(updateGame);
    }
}

function startGame() {
    score = 0;
    totalVitals = 100;
    items = [];
    spawnTimer = 0;
    basket.x = 310;
    
    scoreDisplay.innerText = "0%";
    livesDisplay.innerText = "100%";
    livesDisplay.className = "hud-value text-gold";

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    isGameRunning = true;

    updateGame();
}

function endGame() {
    isGameRunning = false;
    cancelAnimationFrame(loopId);
    livesDisplay.className = "hud-value text-red";
    finalScoreText.innerText = `Nível de Consciência Digital Retido: ${score}%`;
    gameOverScreen.classList.remove("hidden");
}

// Escutas de Teclado Ativas
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        keys[e.key] = true;
    }
});
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        keys[e.key] = false;
    }
});

// Vinculação de Botões Auxiliares
btnLeft.addEventListener("mousedown", () => { keys.ArrowLeft = true; });
btnLeft.addEventListener("mouseup", () => { keys.ArrowLeft = false; });
btnLeft.addEventListener("touchstart", (e) => { e.preventDefault(); keys.ArrowLeft = true; });
btnLeft.addEventListener("touchend", () => { keys.ArrowLeft = false; });

btnRight.addEventListener("mousedown", () => { keys.ArrowRight = true; });
btnRight.addEventListener("mouseup", () => { keys.ArrowRight = false; });
btnRight.addEventListener("touchstart", (e) => { e.preventDefault(); keys.ArrowRight = true; });
btnRight.addEventListener("touchend", () => { keys.ArrowRight = false; });

btnStart.addEventListener("click", startGame);
btnRestart.addEventListener("click", startGame);
