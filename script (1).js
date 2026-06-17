function verificarResposta(isCorrect) {
    const feedback = document.getElementById("resultado-feedback");
    
    if (isCorrect) {
        feedback.textContent = "✅ Correto! Você agiu com segurança e criticidade digital.";
        feedback.className = "feedback correto";
    } else {
        feedback.textContent = "❌ Atenção! Essa ação espalha a fraude ou gera prejuízo. Pense crítico!";
        feedback.className = "feedback incorreto";
    }
}
