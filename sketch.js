const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player,playerHead, playerBase, hands;
var playerShots = [];
var Hoop;
var numberOfShots = 12;

var score = 0;

function preload() {
  backgroundImg = loadImage("./Images/Background.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new InvisibleBase(1300, 820, 180, 150);
  player = new BasketballPlayer(1300, playerBase.body.position.y-120, 200, 180);
  playerHead = new BasketballPlayer2 (1304, player.body.position.y-110, 60, 45)
  hands = new Hands(1300,playerBase.body.position.y - 265,30,30);
  Hoop = new BasketballHoop(120, 330, 80, 80);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  // InvisibleBase.display();
  player.display();
  playerHead.display ();
  hands.display();

  Hoop.display();

  for (var i = 0; i < playerShots.length; i++) {
    console.log ("hi")
    if (playerShots[i] !== undefined) {
      playerShots[i].display();

     /* var HoopCollision = Matter.SAT.collides(
        Hoop.body,
        playerShots[i].body
      );


      if (HoopCollision) {
        score += 5;
        console.log("Hi")
      }*/
    if()
      else if (playerShots[i].body.position.x > width || playerShots[i].body.position.y > height) {
        if (!playerShots[i].isRemoved) {
          playerShots[i].remove(i);
        }
      }
    }
  }


  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(60);
  text("Basketball", width / 2, 80);

  // Score
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Score: " + score, width - 350, 100);

  // Basketball Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Shots: " + numberOfShots, 350, 100);
  if (numberOfShots == 0) {
    gameOver();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfShots > 0) {
      var posX = hands.body.position.x;
      var posY = hands.body.position.y;
      var angle = hands.body.angle;

      var ball = new Ball(posX, posY, angle);

      ball.trajectory = [];
      Matter.Body.setAngle(ball.body, angle);
      playerShots.push(ball);
      numberOfShots -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerShots.length) {
      var angle = hands.body.angle;
      playerShots[playerShots.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


