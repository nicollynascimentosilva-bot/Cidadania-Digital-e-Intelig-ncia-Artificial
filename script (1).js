// Seleciona todos os botões de opção do quiz
document.querySelectorAll('.quiz-option').forEach(botao => {
    botao.addEventListener('click', () => {
        // Converte o texto "true" ou "false" do HTML em um valor booleano real
        const ehCorreto = botao.getAttribute('data-correct') === 'true';
        
        // Executa a função de verificação
        verificarResposta(ehCorreto);
    });
});

// Sua função adaptada e integrada ao layout
function verificarResposta(isCorrect) {
    const feedback = document.getElementById("quiz-feedback");
    
    if (isCorrect) {
        feedback.textContent = "✅ Correto! Você agiu com segurança e criticidade digital.";
        feedback.className = "feedback-success"; // Classe correspondente ao nosso CSS
    } else {
        feedback.textContent = "❌ Atenção! Essa ação espalha a fraude ou gera prejuízo. Pense crítico!";
        feedback.className = "feedback-error"; // Classe correspondente ao nosso CSS
    }
}

