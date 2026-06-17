// Aguarda o carregamento do documento para registrar os eventos de clique
document.addEventListener("DOMContentLoaded", () => {
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedButton = e.target;
            const isCorrect = selectedButton.getAttribute('data-correct') === 'true';
            
            checkAnswer(selectedButton, isCorrect, options);
        });
    });
});

function checkAnswer(selectedButton, isCorrect, allOptions) {
    // Desabilita todos os botões após a escolha do usuário
    allOptions.forEach(btn => btn.disabled = true);

    const feedback = document.getElementById('quiz-feedback');

    if (isCorrect) {
        selectedButton.classList.add('correct');
        feedback.innerHTML = "✅ Correto! Vozes robóticas e pedidos de dinheiro urgentes são sinais claros de Deepfakes e golpes.";
        feedback.style.color = "var(--success)";
    } else {
        selectedButton.classList.add('incorrect');
        feedback.innerHTML = "❌ Incorreto. Essa atitude pode espalhar golpes ou causar prejuízos financeiros. O correto é desconfiar e checar.";
        feedback.style.color = "var(--danger)";
        
        // Destaca automaticamente a alternativa correta para fins educativos
        allOptions.forEach(btn => {
            if (btn.getAttribute('data-correct') === 'true') {
                btn.classList.add('correct');
            }
        });
    }
}
