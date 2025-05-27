const questoes = [
  {
    pergunta: "Qual é o maior planeta do sistema solar?",
    respostas: [
      { texto: "Terra", correta: false },
      { texto: "Júpiter", correta: true },
      { texto: "Saturno", correta: false },
      { texto: "Marte", correta: false }
    ]
  },
  {
    pergunta: "Qual é a capital da França?",
    respostas: [
      { texto: "Paris", correta: true },
      { texto: "Londres", correta: false },
      { texto: "Berlim", correta: false },
      { texto: "Roma", correta: false }
    ]
  },
  {
    pergunta: "Qual elemento químico tem o símbolo 'O'?",
    respostas: [
      { texto: "Ouro", correta: false },
      { texto: "Oxigênio", correta: true },
      { texto: "Prata", correta: false },
      { texto: "Hélio", correta: false }
    ]
  }
];

let indiceQuestao = 0;
let acertos = 0;

function comecar() {
  indiceQuestao = 0;
  acertos = 0;
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  mostrarQuestao();
}

function mostrarQuestao() {
  const questaoAtual = questoes[indiceQuestao];
  document.getElementById("pergunta").textContent = questaoAtual.pergunta;

  const ul = document.getElementById("respostas");
  ul.innerHTML = "";

  questaoAtual.respostas.forEach((resp, i) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    const inputId = `resposta-${indiceQuestao}-${i}`;
    input.type = "radio";
    input.name = "resposta";
    input.value = i;
    input.id = inputId;

    const label = document.createElement("label");
    label.htmlFor = inputId;
    label.textContent = resp.texto;

    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
  });
}

function proximaQuestao() {
  const radios = document.getElementsByName("resposta");
  let selecionado = -1;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selecionado = i;
      break;
    }
  }

  if (selecionado === -1) {
    alert("Por favor, selecione uma resposta!");
    return;
  }

  if (questoes[indiceQuestao].respostas[selecionado].correta) {
    acertos++;
  }

  indiceQuestao++;

  if (indiceQuestao < questoes.length) {
    mostrarQuestao();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("resultado").classList.remove("hidden");

  const porcentagem = Math.round((acertos / questoes.length) * 100);
  document.getElementById("porcentagem").textContent =
    `Você acertou ${porcentagem}% (${acertos} de ${questoes.length})`;

  let mensagem = "";
  let emojiAcerto = "";

  if (porcentagem === 100) {
    mensagem = "Eita Caramba! Você huMILHOU total! Acertou tudo e provou que é o rei (ou rainha) do Milhão!";
    emojiAcerto = "👑🥳🌽";
  } else if (porcentagem >= 80) {
    mensagem = "Uau! Você quase zerou! Mandou super bem!";
    emojiAcerto = "👏🔥🌽";
  } else if (porcentagem >= 50) {
    mensagem = "Boa! Você se saiu bem. Um pouco mais de treino e você chega lá!";
    emojiAcerto = "👍🙂🌽";
  } else {
    mensagem = "Opa! Foi por pouco. Que tal tentar de novo?";
    emojiAcerto = "😅🌽";
  }

  document.getElementById("mensagem").textContent = mensagem;
  document.getElementById("emoji-acerto").textContent = emojiAcerto;
}

function recomecar() {
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("inicio").classList.remove("hidden");
}
