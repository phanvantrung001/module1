var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var x = 20;
var y = 20;
var dx = 5,
  dy = 2;
var radius = 10;
var paddle = {
  width: 70,
  height: 10,
  x: 0,
  y: canvas.height - 10,
  speed: 5,
};
var BrickConfig = {
  offsetX: 25,
  offsetY: 25,
  margin: 25,
  width: 70,
  height: 15,
  totalRow: 3,
  totalCol: 5,
};
var isGameOver = false;
var isGamewin = false;
var UserScore = 0;
var MaxScore = BrickConfig.totalCol * BrickConfig.totalRow;

var Bricklick = [];
isMovingleft = false;
isMovingright = false;
for (var i = 0; i < BrickConfig.totalRow; i++) {
  for (var j = 0; j < BrickConfig.totalCol; j++) {
    Bricklick.push({
      x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.margin),
      y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.margin),

      isBroken: false,
    });
  }
}
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.keyCode == 37) {
    paddle.isMovingright = true;
  } else if (event.keyCode == 39) {
    paddle.isMovingleft = true;
  }
});

document.addEventListener("keyup", function (event) {
  console.log(event);
  if (event.keyCode == 37) {
    paddle.isMovingright = false;
  } else if (event.keyCode == 39) {
    paddle.isMovingleft = false;
  }
});
function drawBall() {
  context.beginPath();
  context.arc(x, y, radius, 0, 3.14 * 2);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
}
function drawPaddle() {
  context.beginPath();
  context.rect(paddle.x, paddle.y, paddle.width, paddle.height);

  context.fillStyle = "blue";
  context.fill();
  context.closePath();
}
function drawGach() {
  Bricklick.forEach(function (b) {
    if (!b.isBroken) {
      context.beginPath();
      context.rect(b.x, b.y, BrickConfig.width, BrickConfig.height);
      context.fill();
      context.closePath();
    }
  });
}

function xulythanhchandichuyen() {
  if (paddle.isMovingleft) {
    paddle.x += paddle.speed;
  } else if (paddle.isMovingright) {
    paddle.x -= paddle.speed;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  } else if (paddle.x > canvas.width - paddle.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

function drawBalltoado() {
  if (x < radius || x > context.width - radius) {
    dx = -dx;
  }
  if (y < radius || y > context.height - radius) {
    dy = -dy;
  }
}

function MyThanhchan() {
  if (
    x + radius >= paddle.x &&
    x + radius <= paddle.x + paddle.width &&
    y + radius >= canvas.height - paddle.height
  )
    dy = -dy;
}

function drawBallvacham() {
  x += dx;
  y += dy;
}
function hendleGameOver() {
  if (isGamewin) {
    alert("you win");
  } else {
    alert("you lose");
  }
}

function draw() {
  {
    Bricklick.forEach(function (b) {
      if (!b.isBroken) {
        if (
          x >= b.x &&
          x <= b.x + BrickConfig.width &&
          y + radius >= b.y &&
          y - radius <= b.y + BrickConfig.height
        ) {
          dy = -dy;
          b.isBroken = true;
          UserScore += 1;
          if (UserScore >= MaxScore) {
            isGameOver = true;
            isGamewin = true;
          }
        }
      }
    });
  }
  if (!isGameOver) {
    context.clearRect(0, 0, (context.height = "500"), (context.width = "500"));
    drawBall();
    drawPaddle();

    drawBallvacham();
    MyThanhchan();
    xulythanhchandichuyen();

    drawGach();
    requestAnimationFrame(draw);
    if (y > context.height - radius) {
      isGameOver = true;
    }

    drawBalltoado();
  } else {
    hendleGameOver();
  }
}
draw();
