document.getElementById("pauseResume").innerHTML = "PAUSE";
document.getElementById("useMouse").innerHTML = "NOT USE MOUSE";
drawBall();
drawBar();
drawBrick();
drawScore();
drawLives();
function choose_lever() {
    alert("please choose the lever (^-^)");
}
setTimeout(choose_lever,20);
function main() {
    check = 1;
    playElement = setInterval(run, speed);
}

function newGame() {
    document.location.reload();
}

