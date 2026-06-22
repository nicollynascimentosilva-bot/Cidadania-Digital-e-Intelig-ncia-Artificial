/**
 * Portal Cidadania Digital 2026
 * Scripts funcionais padrão Google Vanilla JS (Sem dependências e Sem erros de console)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Alternador Contraste (Acessibilidade)
    // ==========================================
    const btnContrast = document.getElementById('toggle-contrast');
    
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    // ==========================================
    // 2. Validador do Quiz Anti-Desinformação
    // ==========================================
    const btnVerify = document.getElementById('btn-verify');
    const feedbackBox = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('feedback-text');

    if (btnVerify && feedbackBox && feedbackText) {
        btnVerify.addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="g-quiz"]:checked');

            if (!selectedOption) {
                alert('Selecione uma resposta para processar a verificação.');
                return;
            }

            const processedAnswer = selectedOption.value;
            feedbackBox.classList.remove('hidden', 'correct', 'wrong');

            if (processedAnswer === 'fake') {
                feedbackBox.classList.add('correct');
                feedbackText.innerText = 'Resposta correta. Elementos faciais tridimensionais que quebram a perspectiva física de luz e sombras em movimentos rápidos, acompanhados de descontinuidade no fluxo de áudio, são marcadores claros de síntese computacional.';
            } else {
                feedbackBox.classList.add('wrong');
                feedbackText.innerText = 'Resposta incorreta. Falhas de compressão digital degradam o arquivo de forma uniforme. Perda pontual de simetria anatômica e voz sem modulação humana indicam manipulação algorítmica.';
            }
        });
    }

    // ==========================================
    // 3. Central de Alertas & Contador de Dados
    // ==========================================
    const reportForm = document.getElementById('report-form');
    const successToast = document.getElementById('form-success');
    const counterValue = document.getElementById('counter-value');
    
    // Armazenamento em memória local antes da exibição
    let localReportsCounter = 0;

    if (reportForm && successToast && counterValue) {
        reportForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Processamento interno de dados
            localReportsCounter += 1;

            // Injeção de variáveis computadas no DOM
            counterValue.innerText = localReportsCounter;
            successToast.classList.remove('hidden');

            // Limpa o formulário de forma segura
            reportForm.reset();
        });
    }
});
