const palavras = {
  facil: [
    "civil",
    "soda",
    "remo",
    "vespa",
    "fibra",
    "envio",
    "nove",
    "Cola",
    "Topo",
    "Vir",
    "Mimo",
    "Borda",
    "Sauna",
    "Lobo",
    "Terno",
    "Cena",
    "Bolsa",
    "Agudo",
    "Perna",
    "Ceu",
  ],
  medio: [
    "Catedral",
    "Forjar",
    "Esporte",
    "Cupido",
    "Clemente",
    "Parede",
    "Camelo",
    "Cavalo",
    "Colônia",
    "Aventura",
    "Tiroteio",
    "Aberto",
    "Comprar",
    "Esgrima",
    "Estribo",
    "Decolar",
    "Orelha",
    "Pestana",
    "Pendurar",
    "Carteira",
  ],
  dificil: [
    "cabeleireiro",
    "transplante",
    "Apartamento",
    "Porcelana",
    "Decoração",
    "Embaixador",
    "Vazamento",
    "Taxidermia",
    "Formigueiro",
    "Absolvido",
    "Precipício",
    "Espinafre",
    "Supermercado",
    "Nervosismo",
    "realidade",
    "Orangotango",
    "Estrábico",
    "Aritmética",
    "Quadro-negro",
    "Quadrúpede",
  ],
};

let palavraSecreta = "";
let completaPS;
let arrayPS = [];
let descobertasPS = [];

let tentativas = [];

//#region desenho
const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");

const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const draw = (part) => {
  switch (part) {
    case "forca":
      context.strokeStyle = "#444";
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(175, 225);
      context.lineTo(5, 225);
      context.moveTo(30, 225);
      context.lineTo(30, 5);
      context.lineTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;

    case "cabeca":
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case "corpo":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case "bracoDireito":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case "bracoEsquerdo":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case "pernaDireita":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case "pernaEsquerda":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;

    case "rosto":
      context.lineWidth = 2;
      context.beginPath();
      context.arc(90, 45, 2, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();

      context.lineWidth = 2;
      context.beginPath();
      context.arc(110, 45, 2, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();

      context.linWidth = 2;
      context.beginPath();
      context.moveTo(95, 60);
      context.lineTo(105, 60);
      context.stroke();
      break;
  }
};

const perdas = [
  "forca",
  "cabeca",
  "corpo",
  "bracoDireito",
  "bracoEsquerdo",
  "pernaDireita",
  "pernaEsquerda",
  "rosto",
];
let step = 0;

const nextLoss = (letter) => {
  draw(perdas[step++]);
  document
    .querySelector('td[data-letter="' + letter + '"]')
    .classList.add("table-danger");

  if (step > 7) {
    endGame(false);
  }
};

//#endregion

const restartGame = () => {
  clearCanvas();
  step = 0;
  draw(perdas[step]);
  step++;
  document.getElementById("tr-palavra").innerHTML = "";
  document
    .querySelectorAll(`td[data-letter]`)
    .forEach((item) => item.classList.remove("table-success", "table-danger"));
  radios.forEach((item) => {
    item.checked = false;
    item.removeAttribute("disabled");
  });
  tentativas = [];
  document.getElementById("game").classList.add("d-none");
};

window.onload = () => {
  restartGame();
};

const montarPalavra = (showWord = false) => {
  const tr = document.getElementById("tr-palavra");
  tr.innerHTML = "";
  if (!showWord) {
    descobertasPS.forEach((item, index) => {
      const td = document.createElement("td");
      td.innerHTML = item;
      if (item != "_") {
        td.classList.add("text-primary");
      }
      tr.appendChild(td);
    });
  } else {
    arrayPS.forEach((item, index) => {
      const td = document.createElement("td");
      td.innerHTML = item;
      td.classList.add("text-danger");
      tr.appendChild(td);
    });
  }
};

const radios = document.querySelectorAll('[name="dificuldade"]');
const onSelectDificuldade = (e) => {
  const dificuldade = document.querySelector('[name="dificuldade"]:checked')
    .value;
  indexPS = Math.floor(Math.random() * 20); // 0 a 19
  palavraSecreta = palavras[dificuldade][indexPS];
  completaPS = palavraSecreta.toLowerCase();
  palavraSecreta = palavraSecreta
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase(); //substitui acentos e deixa tudo minúsculo
  console.log(palavraSecreta);
  arrayPS = palavraSecreta.split("");
  descobertasPS = [];
  for (i = 0; i < palavraSecreta.length; i++) {
    if (palavraSecreta[i] == "-") {
      descobertasPS[i] = "-";
    } else {
      descobertasPS[i] = "_";
    }
  }

  radios.forEach((item) => item.setAttribute("disabled", true));
  document.getElementById("game").classList.remove("d-none");
  montarPalavra();
};
radios.forEach((item) =>
  item.addEventListener("change", (e) => onSelectDificuldade(e))
);

const getAllIndexes = (arr, val) => {
  let indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
};

const tratarPalavra = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const nextFind = (letter) => {
  const indexes = getAllIndexes(arrayPS, letter);
  indexes.forEach((item) => (descobertasPS[item] = completaPS[item]));
  document
    .querySelector(`td[data-letter="${letter}"]`)
    .classList.add("table-success");
  montarPalavra();

  if (!descobertasPS.includes("_")) {
    endGame(true);
  }
};

const form = document.getElementById("guess-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let guess = document.getElementById("guess").value;
  guess = tratarPalavra(guess);

  if (tentativas.includes(guess)) {
    alert("Essa letra já foi usada, tente outra.");
    return;
  }

  tentativas.push(guess);
  if (arrayPS.includes(guess)) {
    nextFind(guess);
  } else {
    nextLoss(guess);
  }

  form.reset();
});

const endGame = (vitoria) => {
  if (!vitoria) {
    montarPalavra(true);
    setTimeout(() => {}, 3000);
  }
  const textVariant = vitoria ? "Você ganhou!!" : "Você perdeu :(";
  let jogarNovamente = confirm(
    `${textVariant}\nA palavra era "${completaPS}".\n\nDeseja jogar novamente?`
  );

  if (jogarNovamente) {
    restartGame();
  } else {
    document
      .querySelectorAll("input, button")
      .forEach((item) => item.setAttribute("disabled", true));
  }
};
