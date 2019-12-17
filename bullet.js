function Bullet(x, y, width, height,src) {
    this.positionX = x;
    this.positionY = y;
    this.width = width;
    this.height = height;
    this.src=src;
}
function drawBullet() {
    let picture = new Image();
    picture.src = bullet.src ;
    picture.onload = function () {
        ctx.drawImage(picture, bullet.positionX, bullet.positionY, bullet.width, bullet.height);
    }
}