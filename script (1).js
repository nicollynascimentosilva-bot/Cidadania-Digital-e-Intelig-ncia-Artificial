/**
 * Portal Cidadania Digital 2026 - Scripts de Interatividade
 * Código limpo, modular e estruturado de forma puramente funcional.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Controle de Acessibilidade (Alto Contraste)
    // ==========================================
    const btnContrast = document.getElementById('toggle-contrast');
    
    btnContrast.addEventListener('click', () => {
        // Altera a classe no body alterando todas as propriedades css simultaneamente
        document.body.classList.toggle('high-contrast');
        
        // Mantém feedback visual acessível no botão
        if(document.body.classList.contains('high-contrast')) {
            btnContrast.innerText = 'A-';
        } else {
            btnContrast.innerText = 'A+';
        }
    });

    // ==========================================
    // 2. Simulador Interativo do Quiz Anti-Desinformação
    // ==========================================
    const btnVerify = document.getElementById('btn-verify');
    const feedbackBox = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('feedback-text');

    btnVerify.addEventListener('click', () => {
        // Captura a opção selecionada de forma segura
        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');

        if (!selectedOption) {
            alert('Por favor, selecione uma opção para analisar o caso.');
            return;
        }

        // Processamento prévio de informações antes de exibir em tela
        const answerValue = selectedOption.value;
        feedbackBox.classList.remove('hidden', 'correct', 'wrong');

        if (answerValue === 'fake') {
            feedbackBox.classList.add('correct');
            feedbackText.innerText = 'Correto! Oscilações bruscas na textura de pele, falhas ao piscar e iluminação dessincronizada são os principais padrões de falha gerados por modelos gerativos de IA hoje.';
        } else {
            feedbackBox.classList.add('wrong');
            feedbackText.innerText = 'Incorreto. Câmeras modernas capturam oscilações uniformes. Elementos flutuantes ou assimetrias faciais extremas em movimentos velozes indicam manipulação digital.';
        }
    });

    // ==========================================
    // 3. Gerenciamento do Formulário e Contadores Dinâmicos
    // ==========================================
    const reportForm = document.getElementById('report-form');
    const successToast = document.getElementById('form-success');
    const counterValue = document.getElementById('counter-value');
    
    // Variável de controle de estado em memória para processamento local
    let reportsCount = 0;

    reportForm.addEventListener('submit', (event) => {
        // Impede o recarregamento indesejado da página
        event.preventDefault();

        // Incremento do estado lógico antes da renderização
        reportsCount += 1;

        // Atualização reativa do DOM baseado no dado processado
        counterValue.innerText = reportsCount;
        
        // Exibe mensagem de feedback de sucesso ao usuário
        successToast.classList.remove('hidden');

        // Limpa o formulário de forma amigável
        reportForm.reset();
    });
});
