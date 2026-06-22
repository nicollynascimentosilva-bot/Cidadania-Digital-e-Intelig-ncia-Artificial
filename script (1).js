// Atributos de Estado do Jogo
let awareness = 50;
let fakeNews = 30;
let money = 100;
let days = 0;
let gameOver = false;

// Seleção correta de elementos do DOM
const txtAwareness = document.getElementById("stat-awareness");
const txtFakes = document.getElementById("stat-fakes");
const txtMoney = document.getElementById("stat-money");
const txtDays = document.getElementById("stat-days");

const cityVisual = document.getElementById("city-visual");
const cityAlertText = document.getElementById("city-alert-text");

const btnEducate = document.getElementById("btn-educate");
const btnInvest = document.getElementById("btn-invest");
const btnNextDay = document.getElementById("btn-next-day");

const messageBox = document.getElementById("game-message-box");
const gameTitle = document.getElementById("game-title");
const gameDesc = document.getElementById("game-desc");
const btnRestart = document.getElementById("btn-restart");

function updateUI() {
    // Sincroniza valores lógicos com a tela do navegador
    txtAwareness.innerText = awareness + "%";
    txtFakes.innerText = fakeNews + "%";
    txtMoney.innerText = money;
    txtDays.innerText = days;

    // Controla disponibilidade dos botões baseado no saldo
    btnEducate.disabled = (money < 30 || gameOver);
    btnInvest.disabled = (money < 50 || gameOver);
    btnNextDay.disabled = gameOver;

    // Altera as cores da cidade e os alertas com base no nível de fake news
    if (fakeNews >= 70) {
        cityVisual.className = "city-box-danger";
        cityAlertText.innerText = "🚨 ALERTA CRÍTICO: Deepfakes gerando tumultos e pânico generalizado nas ruas!";
    } else if (fakeNews >= 45) {
        cityVisual.className = "city-box-warn";
        cityAlertText.innerText = "⚠️ ATENÇÃO: Rumores de IA e desinformação se espalhando pelas redes.";
    } else {
        cityVisual.className = "city-box-normal";
        cityAlertText.innerText = "Status: Cidade operando normalmente com segurança digital estável.";
    }
}

function handleEducate() {
    if (money >= 30 && !gameOver) {
        money -= 30;
        awareness = Math.min(awareness + 20, 100);
        fakeNews = Math.max(fakeNews - 15, 0);
        updateUI();
        checkGameStatus();
    }
}

function handleInvest() {
    if (money >= 50 && !gameOver) {
        money -= 50;
        fakeNews = Math.max(fakeNews - 35, 0);
        awareness = Math.min(awareness + 5, 100);
        updateUI();
        checkGameStatus();
    }
}

function handleNextDay() {
    if (gameOver) return;
    
    days += 1;
    money += 20; // Recompensa diária de administração

    // Ataque randômico de robôs geradores de fake news a cada noite
    let attackValue = Math.floor(Math.random() * 15) + 10; 
    fakeNews = Math.min(fakeNews + attackValue, 100);

    // Se o nível de consciência for baixo, o ataque ganha força extra
    if (awareness < 40) {
        fakeNews = Math.min(fakeNews + 10, 100);
    } else {
        awareness = Math.max(awareness - 5, 0); // Desgaste natural de foco da população
    }

    updateUI();
    checkGameStatus();
}

function checkGameStatus() {
    if (fakeNews >= 100) {
        endGame(false, "A desinformação tomou 100% da rede urbana! A cidade ruiu socialmente devido a golpes, invasões e pânico de deepfakes. Você perdeu o cargo.");
    } else if (days >= 15 && fakeNews <= 25) {
        endGame(true, "Parabéns! Você governou com excelência por 15 dias, controlou a ameaça cibernética e transformou a cidade em um porto seguro de Cidadania Digital.");
    }
}

function endGame(isVictory, text) {
    gameOver = true;
    updateUI();
    messageBox.classList.remove("hidden");
    
    if (isVictory) {
        gameTitle.innerText = "🏆 Cidade Protegida!";
        messageBox.className = "win-style";
    } else {
        gameTitle.innerText = "❌ Colapso Cibernético!";
        messageBox.className = "lose-style";
    }
    gameDesc.innerText = text;
}

function resetGame() {
    awareness = 50;
    fakeNews = 30;
    money = 100;
    days = 0;
    gameOver = false;
    messageBox.classList.add("hidden");
    updateUI();
}

// Vincula todos os escutadores de ação dinamicamente
document.addEventListener("DOMContentLoaded", () => {
    btnEducate.addEventListener("click", handleEducate);
    btnInvest.addEventListener("click", handleInvest);
    btnNextDay.addEventListener("click", handleNextDay);
    btnRestart.addEventListener("click", resetGame);
    
    updateUI(); // Renderiza os dados iniciais na primeira abertura
});
