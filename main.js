document.getElementById("pauseResume").innerHTML = "PAUSE";
document.getElementById("useMouse").innerHTML = "NOT USE MOUSE";
ctx.fillStyle = "#d6cbff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawBall();
drawBar();
drawBrick();
drawScore();
drawLives();

function alertGameOver() {
    alert("GAME OVER (-_-)");
}

function main() {
    check = 1;
    playElement = setInterval(run, speed);
}

function newGame() {
    document.location.reload();
}


