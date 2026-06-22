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
let totalVitals = 100;
let isGameRunning = false;
let loopId;
let items = [];
let spawnTimer = 0;

// Elemento Controlado (Cesta Minimalista de Linha Fina)
const basket = {
    x: 310,
    y: 360,
    width: 85,
    height: 6,
    speed: 15,
    color: "#d4af37"
};

let keys = { ArrowLeft: false, ArrowRight: false };

// Classe Construtora dos Blocos de Mídia Sintética
class FallItem {
    constructor() {
        this.x = Math.random() * (canvas.width - 60) + 30;
        this.y = -20;
        this.width = 60;
        this.height = 18;
        
        // Dificuldade Progressiva linear e oscilação lateral suave
        this.speedY = Math.random() * 1.2 + 2.5 + (score * 0.006);
        this.driftX = (Math.random() - 0.5) * 0.8;
        
        this.isFake = Math.random() < 0.55;
        this.color = this.isFake ? "#f87171" : "#34d399";
        this.label = this.isFake ? "SYNTH" : "DATA";
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.color;
        ctx.font = "bold 8px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(this.label, this.x + this.width / 2, this.y + 12);
    }

    update() {
        this.y += this.speedY;
        this.x += this.driftX;
        
        // Colisão com as paredes laterais invisíveis para manter o bloco na tela
        if (this.x < 0 || this.x + this.width > canvas.width) {
            this.driftX *= -1;
        }
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid de linhas digitais sutis ao fundo (Visual Premium)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
    ctx.lineWidth = 1;
    for(let i = 50; i < canvas.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }

    // Movimentação do Escudo por Teclado
    if (keys.ArrowLeft && basket.x > 0) basket.x -= basket.speed;
    if (keys.ArrowRight && basket.x < canvas.width - basket.width) basket.x += basket.speed;

    // Renderização do Cesto
    ctx.fillStyle = basket.color;
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
    
    ctx.fillStyle = "rgba(214, 175, 55, 0.12)";
    ctx.fillRect(basket.x - 4, basket.y + basket.height, basket.width + 8, 2);

    // Controle de Spawn Inteligente baseado no Score
    spawnTimer++;
    let spawnRate = Math.max(25, 42 - Math.floor(score * 0.1));
    if (spawnTimer >= spawnRate) {
        items.push(new FallItem());
        spawnTimer = 0;
    }

    // Processamento dos Itens Ativos
    for (let i = items.length - 1; i >= 0; i--) {
        items[i].update();
        items[i].draw();

        // Verificação de Coleta Avançada
        if (
            items[i].y + items[i].height >= basket.y &&
            items[i].y <= basket.y + basket.height &&
            items[i].x + items[i].width >= basket.x &&
            items[i].x <= basket.x + basket.width
        ) {
            if (items[i].isFake) {
                totalVitals -= 25;
                if(totalVitals <= 0) {
                    totalVitals = 0;
                    livesDisplay.innerText = "CRÍTICO";
                    endGame();
                    return;
                }
                livesDisplay.innerText = totalVitals + "%";
            } else {
                score += 5;
                scoreDisplay.innerText = score + "%";
            }
            items.splice(i, 1);
            continue;
        }

        if (items[i].y > canvas.height) {
            // Se deixar de pegar um dado real (DATA), há uma pequena perda de integridade
            if (!items[i].isFake) {
                totalVitals = Math.max(0, totalVitals - 5);
                livesDisplay.innerText = totalVitals + "%";
                if (totalVitals <= 0) {
                    endGame();
                    return;
                }
            }
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
    livesDisplay.innerText = "CRÍTICO";
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

// Suporte e Mapeamento para Cliques de Botão (Mobile e Mouse)
const setLeft = (state) => { keys.ArrowLeft = state; };
const setRight = (state) => { keys.ArrowRight = state; };

btnLeft.addEventListener("mousedown", () => setLeft(true));
btnLeft.addEventListener("mouseup", () => setLeft(false));
btnLeft.addEventListener("mouseleave", () => setLeft(false));
btnLeft.addEventListener("touchstart", (e) => { e.preventDefault(); setLeft(true); });
btnLeft.addEventListener("touchend", () => setLeft(false));

btnRight.addEventListener("mousedown", () => setRight(true));
btnRight.addEventListener("mouseup", () => setRight(false));
btnRight.addEventListener("mouseleave", () => setRight(false));
btnRight.addEventListener("touchstart", (e) => { e.preventDefault(); setRight(true); });
btnRight.addEventListener("touchend", () => setRight(false));

btnStart.addEventListener("click", startGame);
btnRestart.addEventListener("click", startGame);
