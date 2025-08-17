import { historiaAleatoria } from './aleatorio.js';
import { perguntas } from './perguntas.js';

let indicePergunta = 0;
let pontos = { positivo: 0, equilibrado: 0, negativo: 0 };
let nomeUsuario = "";

const nomesAleatorios = ["Alex", "Beatriz", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gustavo", "Helena", "Igor", "Júlia"];

const caixaNome = document.querySelector(".caixa-nome");
const botaoComecar = document.getElementById("botaoComecar");
const quizArea = document.querySelector(".quiz-area");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const tituloResultado = document.getElementById("titulo-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.getElementById("botao-reiniciar");

// Histórias detalhadas
const historias = {
    positivo: [
        "Sua IA ajudou a erradicar doenças e criou novas oportunidades para educação e cultura global...",
        "Graças às suas escolhas, a IA se tornou uma parceira essencial em todos os setores da sociedade...",
        "O mundo tornou-se mais inovador e justo com a colaboração entre humanos e IA..."
    ],
    equilibrado: [
        "Você utilizou a IA de maneira cautelosa, reconhecendo riscos e benefícios...",
        "O avanço da IA foi supervisionado e regulado, mantendo um equilíbrio entre inovação e segurança...",
        "Sua cautela permitiu que a IA fosse usada como ferramenta poderosa sem gerar desigualdades..."
    ],
    negativo: [
        "A IA acabou tomando decisões arriscadas, confirmando seus receios sobre seus perigos...",
        "O mundo enfrentou desafios significativos devido ao mau uso da inteligência artificial...",
        "Apesar das intenções positivas, a IA gerou problemas inesperados em diferentes setores..."
    ]
};

botaoComecar.addEventListener("click", () => {
    nomeUsuario = document.getElementById("nomeUsuario").value.trim();

    if (!nomeUsuario) {
        const indiceNome = Math.floor(Math.random() * nomesAleatorios.length);
        nomeUsuario = nomesAleatorios[indiceNome];
    }

    caixaNome.style.display = "none";
    quizArea.style.display = "block";
    mostrarPergunta();
});

function mostrarPergunta() {
    const perguntaAtual = perguntas[indicePergunta];
    caixaPerguntas.textContent = perguntaAtual.pergunta;
    caixaAlternativas.innerHTML = "";

    perguntaAtual.alternativas.forEach(alternativa => {
        const btn = document.createElement("button");
        btn.textContent = alternativa.texto;
        btn.classList.add("alternativa");

        btn.addEventListener("click", () => resposta(alternativa.tipo, alternativa.proxima));
        btn.addEventListener("mousedown", () => btn.style.backgroundColor = "#ff4d4d");
        btn.addEventListener("mouseup", () => btn.style.backgroundColor = "");
        btn.addEventListener("mouseleave", () => btn.style.backgroundColor = "");

        caixaAlternativas.appendChild(btn);
    });
}

function resposta(tipo, proxima) {
    pontos[tipo]++;

    if (proxima !== null && proxima !== undefined) {
        indicePergunta = proxima;
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    quizArea.style.display = "none";
    caixaResultado.style.display = "block";
    botaoReiniciar.style.display = "block";

    const maxPontos = Math.max(pontos.positivo, pontos.equilibrado, pontos.negativo);
    let perfil = "equilibrado";

    if (pontos.positivo === maxPontos && pontos.positivo !== pontos.equilibrado && pontos.positivo !== pontos.negativo) perfil = "positivo";
    else if (pontos.negativo === maxPontos && pontos.negativo !== pontos.equilibrado && pontos.negativo !== pontos.positivo) perfil = "negativo";

    document.body.className = `resultado-${perfil}`;
    tituloResultado.textContent = perfil === "positivo" ? `Parabéns, ${nomeUsuario}!` :
        perfil === "negativo" ? `Cuidado, ${nomeUsuario}...` :
        `Equilibrado, ${nomeUsuario}`;

    const historia = historiaAleatoria(perfil, historias);
    textoResultado.textContent = historia;

    const resultadoCard = document.querySelector(".resultado-card");
    resultadoCard.classList.add("mostrar");
}

botaoReiniciar.addEventListener("click", () => {
    pontos = { positivo: 0, equilibrado: 0, negativo: 0 };
    indicePergunta = 0;
    document.body.className = "";
    caixaResultado.style.display = "none";
    botaoReiniciar.style.display = "none";
    caixaNome.style.display = "block";

    const resultadoCard = document.querySelector(".resultado-card");
    resultadoCard.classList.remove("mostrar");
});