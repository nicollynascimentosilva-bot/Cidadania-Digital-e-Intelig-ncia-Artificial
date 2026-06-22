// Monitora cliques em todos os blocos de quiz de forma independente
document.querySelectorAll('.quiz-block').forEach(block => {
    const botoes = block.querySelectorAll('.quiz-option');
    const feedbackDiv = block.querySelector('.quiz-feedback');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const ehCorreto = botao.getAttribute('data-correct') === 'true';

            // Desabilita todos os botões deste bloco após o palpite
            botoes.forEach(btn => btn.disabled = true);

            // Executa a validação visual e textual
            if (ehCorreto) {
                botao.classList.add('correct-choice');
                feedbackDiv.textContent = "✅ Correto! Você agiu com segurança e criticidade digital.";
                feedbackDiv.className = "quiz-feedback feedback-success";
            } else {
                botao.classList.add('incorrect-choice');
                feedbackDiv.textContent = "❌ Atenção! Essa ação espalha a fraude ou gera prejuízo. Pense crítico!";
                feedbackDiv.className = "quiz-feedback feedback-error";
            }
        });
    });
});
