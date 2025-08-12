const perguntas = [
    {
        pergunta: "Qual é o maior objetivo da IA?",
        alternativas: [
            { texto: "Ajudar a humanidade", tipo: "positivo" },
            { texto: "Dominar o mundo", tipo: "negativo" }
        ]
    },
    {
        pergunta: "Como você reagiria se a IA ficasse mais inteligente que os humanos?",
        alternativas: [
            { texto: "Trabalharia junto", tipo: "positivo" },
            { texto: "Tentaria controlar", tipo: "negativo" }
        ]
    }
];

let indicePergunta = 0;
let pontos = { positivo: 0, negativo: 0 };
let nomeUsuario = "";

// Elementos
const caixaNome = document.querySelector(".caixa-nome");
const botaoComecar = document.getElementById("botaoComecar");
const quizArea = document.querySelector(".quiz-area");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const tituloResultado = document.getElementById("titulo-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const imagemResultado = document.getElementById("imagem-resultado");
const botaoReiniciar = document.getElementById("botao-reiniciar");

botaoComecar.addEventListener("click", () => {
    nomeUsuario = document.getElementById("nomeUsuario").value.trim();
    if (nomeUsuario === "") {
        alert("Digite seu nome para começar!");
        return;
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

        btn.addEventListener("click", () => resposta(alternativa.tipo));

        // Muda para vermelho ao pressionar
        btn.addEventListener("mousedown", () => {
            btn.style.backgroundColor = "#ff4d4d";
        });

        // Volta à cor original ao soltar clique
        btn.addEventListener("mouseup", () => {
            btn.style.backgroundColor = "";
        });

        // Volta à cor original se mouse sair do botão enquanto clicado
        btn.addEventListener("mouseleave", () => {
            btn.style.backgroundColor = "";
        });

        caixaAlternativas.appendChild(btn);
    });
}

function resposta(tipo) {
    pontos[tipo]++;
    indicePergunta++;
    if (indicePergunta < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    quizArea.style.display = "none";
    caixaResultado.style.display = "block";
    botaoReiniciar.style.display = "block";

    if (pontos.positivo > pontos.negativo) {
        document.body.style.backgroundColor = "#d4f5d4";
        tituloResultado.textContent = `Parabéns, ${nomeUsuario}!`;
        textoResultado.textContent = "Você acredita no uso positivo da IA!";
        imagemResultado.src = "img/positivo.png";
    } else {
        document.body.style.backgroundColor = "#f5d4d4";
        tituloResultado.textContent = `Cuidado, ${nomeUsuario}...`;
        textoResultado.textContent = "Você vê a IA como uma ameaça!";
        imagemResultado.src = "img/negativo.png";
    }
}

botaoReiniciar.addEventListener("click", () => {
    pontos = { positivo: 0, negativo: 0 };
    indicePergunta = 0;
    document.body.style.backgroundColor = "#f4f4f4";
    caixaResultado.style.display = "none";
    botaoReiniciar.style.display = "none";
    caixaNome.style.display = "block";
});
