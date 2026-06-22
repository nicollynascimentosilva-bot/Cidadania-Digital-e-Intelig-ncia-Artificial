function modoEscuro() {
    document.body.classList.toggle("dark");
}function analisar(){

let texto =
document.getElementById("noticia")
.value.toLowerCase();

let resultado =
document.getElementById("resultado");

if(texto.includes("milagre") ||
   texto.includes("ganhe dinheiro")){

resultado.innerHTML =
"⚠️ Atenção: notícia suspeita.";
}
else{
resultado.innerHTML =
"✅ Verifique fontes confiáveis.";
}
}
