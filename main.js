document.getElementById("pauseResume").innerHTML = "PAUSE";
document.getElementById("useMouse").innerHTML = "NOT USE MOUSE";
document.getElementById("myCanvas").innerHTML="<img width=\"790\" height=\"600\" src=\"gameover.jpg\">";
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

