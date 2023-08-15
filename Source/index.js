const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.querySelector("#bodyCount");
const resetbtn = document.querySelector("#reset");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground = "white";
const snakecolor = "lightgreen";
const snakeborder = "black";
const foodcolor = "red";
const unitsize = 25;
let xvelocity = unitsize;
let yvelocity = 0;
let foodX;
let foodY;
let score = 0;
let running = false;

let snake = [
  { x: unitsize * 4, y: 0 },
  { x: unitsize * 3, y: 0 },
  { x: unitsize * 2, y: 0 },
  { x: unitsize, y: 0 },
  { x: 0, y: 0 }
];

window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click", resetgame);

gamestart();

function gamestart() {
  running = true;
  scoretext.textContent = score;
  createfood();
  drawfood();
  nexttick();
}

function nexttick() {
  if (running) {
    setTimeout(() => {
      clearboard();
      drawfood();
      movesnake();
      drawsnake();
      checkgameover();
      nexttick();
    }, 100);
  } else {
    displaygameover();
  }
}

function clearboard() {
  ctx.fillStyle = boardbackground;
  ctx.fillRect(0, 0, gamewidth, gameheight);
}

function createfood() {
  function randomfood(min, max) {
    const randnum = Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;
    return randnum;
  }
  foodX = randomfood(0, gameheight - unitsize);
  foodY = randomfood(0, gameheight - unitsize);
}

function drawfood() {
  ctx.fillStyle = foodcolor;
  ctx.fillRect(foodX, foodY, unitsize, unitsize);
}

function movesnake() {
  const head = { x: snake[0].x + xvelocity, y: snake[0].y + yvelocity };
  snake.unshift(head);
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 1;
    scoretext.textContent = score;
    createfood();
  } else {
    snake.pop();
  }
}

function drawsnake() {
  ctx.fillStyle = snakecolor;
  ctx.strokeStyle = snakeborder;
  snake.forEach(snakepart => {
    ctx.fillRect(snakepart.x, snakepart.y, unitsize, unitsize);
    ctx.strokeRect(snakepart.x, snakepart.y, unitsize, unitsize);
  });
}

function changedirection(event) {
  const keypressed = event.keyCode;
  const left = 37;
  const up = 38;
  const right = 39;
  const down = 40;

  const goingup = (yvelocity === -unitsize);
  const goingdown = (yvelocity === unitsize);
  const goingright = (xvelocity === unitsize);
  const goingleft = (xvelocity === -unitsize);

  switch (true) {
    case (keypressed === left && !goingright):
      xvelocity = -unitsize;
      yvelocity = 0;
      break;
    case (keypressed === up && !goingdown):
      xvelocity = 0;
      yvelocity = -unitsize;
      break;
    case (keypressed === right && !goingleft):
      xvelocity = unitsize;
      yvelocity = 0;
      break;
    case (keypressed === down && !goingup):
      xvelocity = 0;
      yvelocity = unitsize;
      break;
  }
}

function checkgameover() {
  switch (true) {
    case (snake[0].x < 0):
    case (snake[0].x >= gamewidth):
    case (snake[0].y < 0):
    case (snake[0].y >= gameheight):
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
      break;
    }
  }
}

function displaygameover() {
  ctx.font = "50px arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER !!!", gamewidth / 2, gameheight / 2);
}

function resetgame() {
  score = 0;
  xvelocity = unitsize;
  yvelocity = 0;
  snake = [
    { x: unitsize * 4, y: 0 },
    { x: unitsize * 3, y: 0 },
    { x: unitsize * 2, y: 0 },
    { x: unitsize, y: 0 },
    { x: 0, y: 0 }
  ];
  gamestart();
}
