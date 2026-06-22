// Base de dados de perguntas do jogo
const quizQuestions = [
    {
        text: "Um vídeo mostra um político famoso confessando um crime grave horas antes da votação, mas a voz dele está ligeiramente robotizada e ele quase não pisca os olhos.",
        isFake: true,
        explanation: "Correto! Piscadas ausentes ou artificiais e voz robotizada são fortes indícios de um áudio/vídeo gerado por Deepfake."
    },
    {
        text: "Um portal de notícias de grande credibilidade publica uma matéria assinada por um jornalista conhecido, contendo links para documentos oficiais do governo.",
        isFake: false,
        explanation: "Correto! Fontes jornalísticas transparentes, com assinaturas e links para dados brutos, são marcas de notícias reais."
    },
    {
        text: "Você recebe uma mensagem no WhatsApp dizendo que uma marca famosa está distribuindo brindes grátis se você clicar em um link esquisito imediatamente.",
        isFake: true,
        explanation: "Correto! Golpes de phishing utilizam senso de urgência e links suspeitos para roubar dados de usuários através do desejo por vantagens."
    },
    {
        text: "Um áudio enviado em um grupo de família traz a voz idêntica do seu primo pedindo dinheiro emprestado por pix por ter sofrido um acidente de carro.",
        isFake: true,
        explanation: "Correto! Criminosos utilizam ferramentas de clonagem de voz por IA (áudio deepfake) extraídas de redes sociais para aplicar o golpe do Pix."
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTextElement = document.getElementById("question-text");
const feedbackElement = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz-container");
const scoreBox = document.getElementById("score-box");
const scoreTextElement = document.getElementById("score-text");

function loadQuestion() {
    feedbackElement.classList.add("hidden");
    feedbackElement.className = ""; // Limpa classes de estilo anteriores
    
    if (currentQuestionIndex < quizQuestions.length) {
        questionTextElement.innerText = quizQuestions[currentQuestionIndex].text;
    } else {
        showResults();
    }
}

function checkAnswer(userSelectedFake) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    feedbackElement.classList.remove("hidden");
    
    // Se a escolha do usuário bate com a natureza da pergunta (se ela é fake ou não)
    if (userSelectedFake === currentQuestion.isFake) {
        score++;
        feedbackElement.innerText = "✅ Acertou! " + currentQuestion.explanation;
        feedbackElement.classList.add("correct");
    } else {
        feedbackElement.innerText = "❌ Errou! " + currentQuestion.explanation;
        feedbackElement.classList.add("incorrect");
    }
    
    currentQuestionIndex++;
    
    // Pequena pausa para o jogador ler a explicação antes da próxima pergunta
    setTimeout(() => {
        loadQuestion();
    }, 4500); 
}

function showResults() {
    quizContainer.classList.add("hidden");
    scoreBox.classList.remove("hidden");
    scoreTextElement.innerText = `Você acertou ${score} de ${quizQuestions.length} situações de segurança digital!`;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreBox.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
}

// Inicia o jogo assim que a página carrega
window.onload = loadQuestion;
