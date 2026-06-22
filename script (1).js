// Base de dados visual do jogo
const quizQuestions = [
    {
        imageUrl: "https://unsplash.com",
        text: "Cenário 1: Esta imagem ultra colorida de um robô futurista humanoide operando computadores brilhantes.",
        isFake: true,
        explanation: "Correto! É FAKE. Trata-se de uma arte digital conceitual gerada inteiramente por algoritmos de IA, impossível de existir no mundo real atual."
    },
    {
        imageUrl: "https://unsplash.com",
        text: "Cenário 2: Uma mulher engenheira trabalhando concentrada em uma placa de circuito impresso real.",
        isFake: false,
        explanation: "Correto! É FATO. É uma fotografia real de banco de dados. Repare na precisão microscópica dos componentes e na anatomia perfeita dos dedos."
    },
    {
        imageUrl: "https://unsplash.com",
        text: "Cenário 3: Um astronauta flutuando em uma floresta tropical mágica com plantas fluorescentes e alienígenas.",
        isFake: true,
        explanation: "Correto! É FAKE. Uma composição gerada por IA geradora de imagens (como Midjourney ou DALL-E) misturando conceitos incompatíveis."
    },
    {
        imageUrl: "https://unsplash.com",
        text: "Cenário 4: Imagem do planeta Terra visto do espaço com conexões luminosas de dados cobrindo os continentes.",
        isFake: true,
        explanation: "Correto! É FAKE. Embora a base possa usar dados reais, a imagem em si é uma renderização digital/computacional artística, não uma foto de satélite."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let canAnswer = true; // Impede cliques repetidos antes do próximo cenário

const gameImageElement = document.getElementById("game-image");
const questionTextElement = document.getElementById("question-text");
const feedbackElement = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz-container");
const scoreBox = document.getElementById("score-box");
const scoreTextElement = document.getElementById("score-text");

function loadQuestion() {
    feedbackElement.classList.add("hidden");
    feedbackElement.className = ""; 
    canAnswer = true; // Libera os botões para clique
    
    if (currentQuestionIndex < quizQuestions.length) {
        // Atualiza a imagem e o texto explicativo
        gameImageElement.src = quizQuestions[currentQuestionIndex].imageUrl;
        questionTextElement.innerText = quizQuestions[currentQuestionIndex].text;
    } else {
        showResults();
    }
}

function checkAnswer(userSelectedFake) {
    if (!canAnswer) return; // Se já clicou, ignora novos cliques na mesma rodada
    canAnswer = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    feedbackElement.classList.remove("hidden");
    
    if (userSelectedFake === currentQuestion.isFake) {
        score++;
        feedbackElement.innerText = "✅ Acertou! " + currentQuestion.explanation;
        feedbackElement.classList.add("correct");
    } else {
        feedbackElement.innerText = "❌ Errou! " + currentQuestion.explanation;
        feedbackElement.classList.add("incorrect");
    }
    
    currentQuestionIndex++;
    
    // Aguarda 4 segundos para o jogador ver o resultado e troca de fase automaticamente
    setTimeout(() => {
        loadQuestion();
    }, 4000); 
}

function showResults() {
    quizContainer.classList.add("hidden");
    scoreBox.classList.remove("hidden");
    scoreTextElement.innerText = `Você identificou corretamente ${score} de ${quizQuestions.length} imagens no nosso teste de cidadania digital!`;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreBox.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
}

// Inicialização imediata ao carregar o documento
window.onload = loadQuestion;
