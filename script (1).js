document.addEventListener('DOMContentLoaded', () => {
    let totalAcertos = 0;
    const totalPerguntas = document.querySelectorAll('.quiz-block').length;
    let perguntasRespondidas = 0;

    document.querySelectorAll('.quiz-block').forEach(block => {
        const botoes = block.querySelectorAll('.quiz-option');
        const feedbackDiv = block.querySelector('.quiz-feedback');

        botoes.forEach(botao => {
            botao.addEventListener('click', () => {
                const ehCorreto = botao.getAttribute('data-correct') === 'true';
                perguntasRespondidas++;

                // Bloqueia as demais opções desta pergunta
                botoes.forEach(btn => btn.disabled = true);

                // Processamento de acertos/erros
                if (ehCorreto) {
                    totalAcertos++;
                    botao.classList.add('correct-choice');
                    feedbackDiv.textContent = "✅ Excelente! Escolha segura. Você aplicou o pensamento crítico.";
                    feedbackDiv.className = "quiz-feedback show feedback-success";
                } else {
                    botao.classList.add('incorrect-choice');
                    feedbackDiv.textContent = "❌ Alerta de Risco: Esta ação propaga desinformação ou expõe você a fraudes.";
                    feedbackDiv.className = "quiz-feedback show feedback-error";
                }

                // Quando todas as perguntas forem respondidas, exibe o painel global
                if (perguntasRespondidas === totalPerguntas) {
                    const painelPlacar = document.getElementById('quiz-score-panel');
                    const spanValor = document.getElementById('score-value');
                    if (painelPlacar && spanValor) {
                        spanValor.textContent = totalAcertos;
                        painelPlacar.classList.remove('hidden');
                    }
                }
            });
        });
    });
});
