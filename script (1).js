/**
 * Portal Cidadania Digital 2026 - Scripts Funcionais
 * Código revisado contra erros de console e com comentários explicativos.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Recursos de Acessibilidade (Contraste)
    // ==========================================
    const btnContrast = document.getElementById('toggle-contrast');
    
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            // Liga/Desliga a classe de contraste mapeada nas variáveis do CSS
            document.body.classList.toggle('high-contrast');
            
            // Atualiza textualmente o botão para o usuário entender a ação
            const isHigh = document.body.classList.contains('high-contrast');
            btnContrast.innerText = isHigh ? 'A-' : 'A+';
        });
    }

    // ==========================================
    // 2. Processamento e Validação Lógica do Quiz
    // ==========================================
    const btnVerify = document.getElementById('btn-verify');
    const feedbackBox = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('feedback-text');

    if (btnVerify && feedbackBox && feedbackText) {
        btnVerify.addEventListener('click', () => {
            // Busca o input do tipo radio que foi marcado pelo usuário
            const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');

            // Tratativa de erro preventiva para evitar falha de script caso clique vazio
            if (!selectedOption) {
                alert('Por favor, selecione uma das alternativas para realizar a análise computacional.');
                return;
            }

            // Armazena o valor bruto em constante para processamento limpo
            const userChoice = selectedOption.value;
            
            // Limpa as classes de respostas anteriores antes de aplicar o novo estilo
            feedbackBox.classList.remove('hidden', 'correct', 'wrong');

            // Condicional funcional baseada na resposta certa (fake)
            if (userChoice === 'fake') {
                feedbackBox.classList.add('correct');
                feedbackText.innerText = 'Excelente análise! Pequenas falhas de renderização nas bordas do rosto, iluminação que oscila sem padrão físico e ausência de piscadas naturais são assinaturas digitais clássicas de mídias sintetizadas por Inteligência Artificial (Deepfakes).';
            } else {
                feedbackBox.classList.add('wrong');
                feedbackText.innerText = 'Atenção necessária. Embora pareça real à primeira vista, artefatos flutuantes nas extremidades da face e anomalias de luz de fundo expõem falhas matemáticas de reconstrução algorítmica.';
            }
        });
    }

    // ==========================================
    // 3. Formulário Semântico e Contador Acumulador
    // ==========================================
    const reportForm = document.getElementById('report-form');
    const successToast = document.getElementById('form-success');
    const counterValue = document.getElementById('counter-value');
    
    // Variável interna de escopo que atua como banco de dados temporário da sessão
    let sessionReportsTotal = 0;

    if (reportForm && successToast && counterValue) {
        reportForm.addEventListener('submit', (event) => {
            // Bloqueia o evento padrão de refresh da página do HTML5
            event.preventDefault();

            // Processamento matemático dos dados antes de renderizar
            sessionReportsTotal += 1;

            // Transmite a informação processada para a interface do usuário
            counterValue.innerText = sessionReportsTotal;
            
            // Revela a caixa de sucesso oculta modificando o display
            successToast.classList.remove('hidden');

            // Limpa os campos preenchidos para novos envios do usuário
            reportForm.reset();
        });
    }
});
