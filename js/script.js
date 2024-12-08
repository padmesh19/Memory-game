const cardsMainArray = [
  {
    name: "antman",
    icon: '<img src="./public/antman.png" class="w-1/2" loading="eager">',
  },
  {
    name: "avengers",
    icon: '<img src="./public/avengers.png" class="w-1/2" loading="eager">',
  },
  {
    name: "batman",
    icon: '<img src="./public/batman.png" class="w-1/2" loading="eager">',
  },
  {
    name: "deadpool",
    icon: '<img src="./public/deadpool.png" class="w-1/2" loading="eager">',
  },
  {
    name: "ironman",
    icon: '<img src="./public/ironman.png" class="w-1/2" loading="eager">',
  },
  {
    name: "shield",
    icon: '<img src="./public/shield.png" class="w-1/2" loading="eager">',
  },
  {
    name: "panther",
    icon: '<img src="./public/panther.png" class="w-1/2" loading="eager">',
  },
  {
    name: "spidermask",
    icon: '<img src="./public/spidermask.png" class="w-1/2" loading="eager">',
  },
  {
    name: "superman",
    icon: '<img src="./public/superman.png" class="w-1/2" loading="eager">',
  },
  {
    name: "wolverine",
    icon: '<img src="./public/wolverine.png" class="w-1/2" loading="eager">',
  },
];

const gameBoard = document.getElementById("gameBoard");
let width = document.body.offsetHeight + "px";
gameBoard.style.width = width;
let maxWidth = document.body.offsetWidth;
if (document.body.offsetWidth <= 768) {
  gameBoard.style.maxWidth = maxWidth * 0.95 + "px";
  gameBoard.style.maxHeight = maxWidth * 0.95 + "px";
} else {
  gameBoard.style.maxWidth = maxWidth * 0.7 + "px";
  gameBoard.style.maxHeight = maxWidth * 0.7 + "px";
}
gameBoard.classList.add(
  "grid",
  "my-2",
  "grid-cols-4",
  "grid-rows-3",
  "gap-4",
  "content-center",
  "justify-between"
);

const gameBtn = document.getElementById("game-buttons");
const backBtn = document.createElement("button");
backBtn.setAttribute("id", "backBtn");
backBtn.setAttribute("onclick", "goToHome()");
backBtn.innerText = "Back";
backBtn.classList.add(
  "px-4",
  "py-2",
  "rounded-lg",
  "bg-[#212A31]",
  "text-slate-50"
);

const resetBtn = document.createElement("button");
resetBtn.setAttribute("id", "resetBtn");
resetBtn.addEventListener("click", function () {
  flipCount = 0;
  document.getElementById("noOfFlip").innerText = flipCount;
  noOfCards();
  count = 0;
  seconds = 0;
  minutes = 0;
  document.getElementById(
    "timer-count"
  ).textContent = `${minutes} : ${seconds}`;
  intervalId = 0;
});
resetBtn.innerText = "Reset";
resetBtn.classList.add(
  "px-4",
  "py-2",
  "rounded-lg",
  "bg-red-700",
  "text-slate-50"
);
gameBtn.appendChild(backBtn);
gameBtn.appendChild(resetBtn);

let wonpage = document.getElementById("won-page");
const homeBtn = document.createElement("button");
homeBtn.setAttribute("onclick", "goToHome()");
homeBtn.innerText = "HOME";
homeBtn.classList.add(
  "py-4",
  "px-12",
  "bg-slate-950",
  "text-white",
  "font-bold",
  "rounded-lg"
);
wonpage.appendChild(homeBtn);

let gameStatus = document.getElementById("game-status");
const gridSize = document.createElement("select");
gridSize.classList.add(
  "px-4",
  "py-2",
  "rounded-lg",
  "bg-indigo-700",
  "text-slate-50"
);
gridSize.setAttribute("id", "grid-size");
gridSize.setAttribute("onchange", "noOfCards()");
let option1 = document.createElement("option");
option1.value = 3;
option1.innerText = "12 Cards";
let option2 = document.createElement("option");
option2.value = 4;
option2.innerText = "16 Cards";
let option3 = document.createElement("option");
option3.value = 5;
option3.innerText = "20 Cards";
gridSize.appendChild(option1);
gridSize.appendChild(option2);
gridSize.appendChild(option3);
gameStatus.appendChild(gridSize);

let timer = document.getElementById("timer-text");
let seconds = 0;
let minutes = 0;
let intervalId;

const timerCount = document.createElement("button");
timerCount.innerText = `${minutes} : ${seconds}`;
timerCount.setAttribute("id", "timer-count");
timerCount.classList.add(
  "inline",
  "px-4",
  "py-2",
  "rounded-lg",
  "bg-slate-700",
  "text-slate-50"
);
intervalId = setInterval(() => {
  seconds++;
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }
  timerCount.textContent = `${minutes} : ${seconds}`;
}, 1000);

let timerText = document.createElement("span");
timerText.innerHTML = "Time";
timerText.classList.add("px-4", "text-center");
timer.append(timerText);
timer.append(timerCount);

let count = document.getElementById("count");
const noOfFlip = document.createElement("button");
noOfFlip.setAttribute("id", "noOfFlip");
noOfFlip.innerText = 0;
noOfFlip.classList.add(
  "inline",
  "px-4",
  "py-2",
  "rounded-lg",
  "bg-slate-700",
  "text-slate-50"
);
let flip = document.createElement("span");
flip.innerHTML = "Flip-Count";
flip.classList.add("px-4", "text-center");
count.append(flip);
count.append(noOfFlip);

let startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", function () {
  count = 0;
  seconds = 0;
  minutes = 0;
  document.getElementById(
    "timer-count"
  ).textContent = `${minutes} : ${seconds}`;
  intervalId = 0;
});

function gridWidth() {
  let width = document.body.offsetHeight + "px";
  gameBoard.style.width = width;
  let maxWidth = document.body.offsetWidth;
  if (document.body.offsetWidth <= 768) {
    gameBoard.style.maxWidth = maxWidth * 0.95 + "px";
    gameBoard.style.maxHeight = maxWidth * 0.95 + "px";
  } else {
    gameBoard.style.maxWidth = maxWidth * 0.7 + "px";
    gameBoard.style.maxHeight = maxWidth * 0.7 + "px";
  }
}

let cardsArray = [];
let flippedCards = [];
let matchedPairs = 0;
let flipCount = 0;

function noOfCards() {
  document.getElementById("gameBoard").innerHTML = "";
  let gridCount = document.getElementById("grid-size").value;
  cardsArray = [];
  flipCount = 0;
  matchedPairs = 0;
  for (let i = 0; i < gridCount * 2; i++) {
    cardsArray.push(cardsMainArray[i]);
    cardsArray.push(cardsMainArray[i]);
  }
  flipCount = 0;
  document.getElementById("noOfFlip").innerText = flipCount;
  count = 0;
  seconds = 0;
  minutes = 0;
  document.getElementById(
    "timer-count"
  ).textContent = `${minutes} : ${seconds}`;
  intervalId = 0;
  shuffleCards();
  displayCards();
  if (gridCount == 5) {
    document
      .getElementById("gameBoard")
      .classList.remove("grid-cols-3", "grid-cols-4", "grid-cols-5");
    document.getElementById("gameBoard").classList.add("grid-cols-5");

    document
      .getElementById("gameBoard")
      .classList.remove("grid-rows-3", "grid-rows-4");
    document.getElementById("gameBoard").classList.add("grid-rows-4");
  } else if (gridCount == 4) {
    document
      .getElementById("gameBoard")
      .classList.remove("grid-cols-3", "grid-cols-4", "grid-cols-5");
    document.getElementById("gameBoard").classList.add("grid-cols-4");

    document
      .getElementById("gameBoard")
      .classList.remove("grid-rows-3", "grid-rows-4");
    document.getElementById("gameBoard").classList.add("grid-rows-4");
  } else {
    document
      .getElementById("gameBoard")
      .classList.remove("grid-cols-3", "grid-cols-4", "grid-cols-5");
    document.getElementById("gameBoard").classList.add("grid-cols-4");

    document
      .getElementById("gameBoard")
      .classList.remove("grid-rows-3", "grid-rows-4");
    document.getElementById("gameBoard").classList.add("grid-rows-3");
  }
}

for (let i = 0; i < 6; i++) {
  cardsArray.push(cardsMainArray[i]);
  cardsArray.push(cardsMainArray[i]);
}
shuffleCards();
displayCards();

function shuffleCards() {
  for (let i = cardsArray.length - 1; i >= 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [cardsArray[i], cardsArray[randIndex]] = [
      cardsArray[randIndex],
      cardsArray[i],
    ];
  }
}

function displayCards() {
  cardsArray.forEach((curr, index, arr) => {
    const card = document.createElement("div");
    card.setAttribute("id", index);
    card.classList.add("relative");
    card.classList.add("card-align");
    card.classList.add("active");
    card.style.cursor = "pointer";
    card.innerHTML = cardsArray[index].icon;
    const cardBack = document.createElement('div');
    cardBack.setAttribute("id", `cardBack-${index}`);
    cardBack.classList.add("cardback");
    card.appendChild(cardBack);
    gameBoard.append(card);
    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && this.classList.contains("active")) {
    let cardId = this.getAttribute("id");
    flippedCards.push(this);
    this.classList.remove("active");
    document.getElementById(`cardBack-${cardId}`).classList.add("hidden");
    if (flippedCards.length == 2) {
      setTimeout(checkMatch, 500);
    }
    flipCount++;
    document.getElementById("noOfFlip").innerText = flipCount;
  }
}

function checkMatch() {
  const card1Id = flippedCards[0].getAttribute("id");
  const card2Id = flippedCards[1].getAttribute("id");
  if (cardsArray[card1Id].name === cardsArray[card2Id].name) {
    flippedCards[0].classList.add("bg-green-600");
    flippedCards[0].classList.remove("active");
    flippedCards[1].classList.add("bg-green-600");
    flippedCards[1].classList.remove("active");
    matchedPairs++;
    setTimeout(checkGameOver(), 500);
  } else {
    document.getElementById(`cardBack-${card1Id}`).classList.remove("hidden");
    flippedCards[0].classList.add("active");
    document.getElementById(`cardBack-${card2Id}`).classList.remove("hidden");
    flippedCards[1].classList.add("active");
  }
  flippedCards = [];
}

function checkGameOver() {
  if (matchedPairs == cardsArray.length / 2) {
    goToWin();
  }
}

function goToGame() {
  document.getElementById("front-page").style.display = "none";
  document.getElementById("won-page").style.display = "none";
  document.getElementById("game-page").style.display = "flex";
}

function goToWin() {
  document.getElementById("front-page").style.display = "none";
  document.getElementById("game-page").style.display = "none";
  document.getElementById("won-page").style.display = "flex";
  document.getElementById("time").innerText = `${minutes} : ${seconds}`;
  document.getElementById(
    "show-name"
  ).innerHTML = `! Congratulations ${player} !`;
  if (cardsArray.length == 12) {
    if (flipCount - cardsArray.length <= 2) {
      document.getElementById("score-count").innerHTML = "10 / 10";
    } else if (flipCount - cardsArray.length == 4) {
      document.getElementById("score-count").innerHTML = "9 / 10";
    } else if (flipCount - cardsArray.length == 6) {
      document.getElementById("score-count").innerHTML = "8 / 10";
    } else if (flipCount - cardsArray.length == 8) {
      document.getElementById("score-count").innerHTML = "7 / 10";
    } else if (flipCount - cardsArray.length == 10) {
      document.getElementById("score-count").innerHTML = "6 / 10";
    } else {
      document.getElementById("score-count").innerHTML = "5 / 10";
    }
  } else if (cardsArray == 16) {
    if (flipCount - cardsArray.length <= 2) {
      document.getElementById("score-count").innerHTML = "10 / 10";
    } else if (flipCount - cardsArray.length == 4) {
      document.getElementById("score-count").innerHTML = "9 / 10";
    } else if (flipCount - cardsArray.length == 6) {
      document.getElementById("score-count").innerHTML = "8 / 10";
    } else if (flipCount - cardsArray.length == 8) {
      document.getElementById("score-count").innerHTML = "7 / 10";
    } else if (flipCount - cardsArray.length == 10) {
      document.getElementById("score-count").innerHTML = "6 / 10";
    } else {
      document.getElementById("score-count").innerHTML = "5 / 10";
    }
  } else {
    if (flipCount - cardsArray.length <= 2) {
      document.getElementById("score-count").innerHTML = "10 / 10";
    } else if (flipCount - cardsArray.length == 4) {
      document.getElementById("score-count").innerHTML = "9 / 10";
    } else if (flipCount - cardsArray.length == 6) {
      document.getElementById("score-count").innerHTML = "8 / 10";
    } else if (flipCount - cardsArray.length == 8) {
      document.getElementById("score-count").innerHTML = "7 / 10";
    } else if (flipCount - cardsArray.length == 10) {
      document.getElementById("score-count").innerHTML = "6 / 10";
    } else {
      document.getElementById("score-count").innerHTML = "5 / 10";
    }
  }
}

function goToHome(value) {
  document.getElementById("game-page").style.display = "none";
  document.getElementById("won-page").style.display = "none";
  document.getElementById("front-page").style.display = "flex";
  location.reload();
}

let player;

function playerName() {
  player = document.getElementById("player-name").value;
}
