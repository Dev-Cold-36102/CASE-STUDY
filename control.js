var check = 1;
var checkMouse = 1;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(evt) {
    if (evt.keyCode == 39) {
        rightPress = true;
    } else if (evt.keyCode == 37) {
        leftPress = true;
    }
}

function keyUpHandler(evt) {
    if (evt.keyCode == 39) {
        rightPress = false;
    } else if (evt.keyCode == 37) {
        leftPress = false;
    }
}

function mouseMoveHandler(evt) {
    if (check == 1) {
        if (checkMouse == 1) {
            var relativeX = evt.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width - bar.width / 2 && relativeX - bar.width / 2 > 0) {
                bar.positionX = relativeX - bar.width / 2;
            }
        }

    }

}

function x2speed() {
    speed /= 2;
    clearInterval(playElement);
    setInterval(run, speed);
}

function checkCollision() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            var temp = brickStatus[i][j];
            if (temp.status == 1) {
                if (ball.positionX > temp.positionX && ball.positionX < temp.positionX + brick.width && ball.positionY > temp.positionY && ball.positionY < temp.positionY + brick.height) {
                    dy = -dy;
                    temp.status = 0;
                    score++;
                    if (score == 8 * 4) {
                        alert("WIN!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function pause() {
    if (check == 0) {
        check = 1;
        document.getElementById("pauseResume").innerHTML = "PAUSE";
    } else {
        check = 0;
        document.getElementById("pauseResume").innerHTML = "RESUME";
    }
}

function useMouse() {
    if (checkMouse == 0) {
        checkMouse = 1;
        document.getElementById("useMouse").innerHTML = "NOT USE MOUSE";
    } else {
        checkMouse = 0;
        document.getElementById("useMouse").innerHTML = "USE MOUSE";
    }
}

function destroyBrick() {
    if (ball.positionX > canvas.width - ball.radius || ball.positionX < ball.radius) {
        dx = -dx;
    }
    if (ball.positionY < ball.radius) {
        dy = -dy;
    } else if (ball.positionY + ball.radius > canvas.height - bar.height) {
        if (ball.positionX > bar.positionX && ball.positionX < bar.positionX + bar.width) {
            dy = -dy;
        } else {
            lives--;

            ball.positionX = canvas.width / 2;
            ball.positionY = canvas.height - ball.radius - bar.height;

            bar.positionX = (canvas.width - bar.width) / 2;
        }
    }

}

function run() {
    if (lives == 0) {
        window.location.reload();
        alert("GAME OVER (-_-)");
    }

    if (check == 1) {
        drawAll();
        if (countBomb == 2) {
            drawBomb(bomb1);
            bomb1.status();
            bomb1.positionY += 3;
        } else if (countBomb == 3) {
            drawBomb(bomb1);
            drawBomb(bomb2);
            bomb1.positionY += 3;
            bomb2.positionY += 4;
            bomb1.status();
            bomb2.status();
        }

        if (rightPress && bar.positionX < canvas.width - bar.width) {
            bar.positionX += 10;
        } else if (leftPress && bar.positionX > 0) {
            bar.positionX -= 10;
        }
    } else {
        heart.positionY += 0;
        bomb.positionY += 0;
        bomb1.positionY += 0;
        bomb2.positionY += 0;
        ball.positionX += 0;
        ball.positionY += 0;
    }
    console.log(speed);

}



