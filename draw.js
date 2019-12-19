function Brick(width, height) {
    this.width = width;
    this.height = height;
}

function Ball(x, y, radius) {
    this.positionX = x;
    this.positionY = y;
    this.radius = radius;

    this.move = function () {
        this.positionX += dx;
        this.positionY += dy;
    };

}

function Bar(x, y, width, height) {
    this.positionX = x;
    this.positionY = y;
    this.width = width;
    this.height = height;

    this.move = function (x) {
        this.positionX += x;
    }
}

function Obstacles(positionX, positionY, width, height, src, live) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.src = src;
    this.live = live;
    this.status = function () {
        if (this.positionY + this.height > canvas.height - bar.height) {
            if (this.positionX + this.width > bar.positionX && this.positionX + this.width < bar.positionX + bar.width) {
                this.positionY = 0;
                ctx.clearRect(bar.positionX, bar.positionY, bar.width, bar.height);

                if (this.live > 0) {
                    if (lives < 3) {
                        lives += this.live;
                        audioHeart.play();
                    }
                } else {
                    lives += this.live;
                    audioBomb.play();
                }
                this.positionX = Math.random() * (canvas.width - this.width);
            }
        }
        if (this.positionY > canvas.height) {
            this.positionY = 0;
            this.positionX = Math.random() * (canvas.width - this.width);
        }
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ball = new Ball(canvas.width / 2, canvas.height - 25, 13);
var bar = new Bar((canvas.width - 120) / 2, canvas.height - 10, 120, 10);
var heart = new Obstacles(Math.random() * (canvas.width - 30), 0, 30, 30, "heart.png", 1);
var bomb = new Obstacles(Math.random() * (canvas.width - 30), 0, 30, 40, "bomb.png", -1);
var bomb1 = new Obstacles(Math.random() * (canvas.width - 31), -10, 31, 41, "bomb.png", -1);
var bomb2 = new Obstacles(Math.random() * (canvas.width - 32), 0, 32, 42, "bomb.png", -1);
var brickStatus = [];
var brick = new Brick(75, 20);
var brickPadding = 20;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;
var rightPress = false;
var leftPress = false;
var dx = 3 / 2;
var dy = -3 / 2;
var score = 0;
var lives = 3;
var speed = 10;
var countBomb = 1;
var playElement;
var audioBomb = new Audio('bomb.mp3');
var audioHeart = new Audio('ting.mp3');
var audioBrick = new Audio('brick.mp3');
var audioBall = new Audio('ball.mp3');
var audioGame = new Audio('Mario.mp3');
var audioBackground = new Audio('background.mp3');
setInterval(audioBackground.play(),127000);

for (let i = 0; i < 4; i++) {
    brickStatus[i] = [];
    for (let j = 0; j < 8; j++) {
        brickStatus[i][j] = {positionX: 0, positionY: 0, status: 1};
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.positionX, ball.positionY, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


function drawBar() {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(bar.positionX, bar.positionY, bar.width, bar.height);
    ctx.closePath();
}

function drawBrick() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            if (brickStatus[i][j].status == 1) {
                var brickX = (j * (brick.width + brickPadding)) + brickOffsetLeft;
                var brickY = (i * (brick.height + brickPadding)) + brickOffsetTop;
                brickStatus[i][j].positionX = brickX;
                brickStatus[i][j].positionY = brickY;
                ctx.beginPath();
                ctx.fillStyle = "#ff8905";
                ctx.fillRect(brickX, brickY, brick.width, brick.height);
                ctx.closePath();

            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawHeart() {
    let picture = new Image();
    picture.src = heart.src;

    ctx.drawImage(picture, heart.positionX, heart.positionY, heart.width, heart.height);


}

function drawBomb(bombIndex) {
    let picture = new Image();
    picture.src = bombIndex.src;
    picture.onload = function () {
        ctx.drawImage(picture, bombIndex.positionX, bombIndex.positionY, bombIndex.width, bombIndex.height);
    }
}

function easy() {
    countBomb = 1;
}

function normal() {
    countBomb = 2;
}

function difficult() {
    countBomb = 3;
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#d6cbff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawHeart();
    drawBall();
    drawBar();
    drawBrick();
    drawScore();
    drawLives();
    drawBomb(bomb);
    heart.positionY += 1;
    bomb.positionY += 2;
    ball.move();
    checkCollision();
    ballMove();
    bomb.status();
    heart.status();
}





