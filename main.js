// trascribed and editted from https://www.youtube.com/watch?v=PA57h3mFHik original file is here: https://goo.gl/KUsCZD

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var cvsW = cvs.width;
var cvsH = cvs.height;

var snakeW = 10;
var snakeH = 10;

var gameSpeed = 70;  //eGan this is the initial speed

var score = 0;
var direction = "right";//default direction

var timer = 100; //




//listen for players input
document.addEventListener("keydown", getDirection);

function getDirection(e) {
        if (e.keyCode == 37 && direction != "right") {
                direction = 'left';
        } else if (e.keyCode == 38 && direction != "down") {
                direction = 'up';
        } else if (e.keyCode == 39 && direction != "left") {
                direction = 'right';
        } else if (e.keyCode == 40 && direction != "up") {
                direction = 'down';
        }
}

function drawSnake(x, y) {

        ctx.fillStyle = "white";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.strokeStyle = "black";
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
}


//create a snake object with 4 cells

var len = 4;
var snake = [];

for (var i = (len - 1); i >= 0; i--) {
        snake.push({ x: i, y: 0 });
}

//create food
var food = {
        x: Math.round(Math.random() * ((cvsW / snakeW) - 1)),
        y: 1 + Math.round(Math.random() * ((cvsH / snakeH) - 2))//1+ and -2 used to keep initial food off y=0;
}
//draw food function
function drawFood(x, y) {

        ctx.fillStyle = "red";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.strokeStyle = "black";
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
}

//check for self collision
function checkCollision(x, y, array) {
        for (var i = 0; i < array.length; i++) {
                if (x == array[i].x && y == array[i].y) {
                        return true;
                }
        } return false;
}

function drawScore(x) {
        ctx.fillStyle = "orange";
        ctx.font = "19px Impact";
        ctx.fillText("score: " + Math.round(x), 10, cvsH - 5);
}
function playMoveSound() {
        var soundWalk = new Audio("walk.wav");
        soundWalk.play()
};

function playEatSound() {
        var soundEat = new Audio("eat.wav");
        soundEat.play()
};

function playEndSound() {
        var soundEnd= new Audio("end.wav");
        soundEnd.play()
};
playMoveSound();
setInterval(playMoveSound, 1300);

function draw() {

        ctx.clearRect(0, 0, cvsW, cvsH);
        timerFunction();
        for (var i = 0; i < snake.length; i++) {
                var x = snake[i].x;
                var y = snake[i].y;
                drawSnake(x, y);

        }
        //draw food
        drawFood(food.x, food.y);
        //snake head
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;


        //create a new head, based on previous head and direction 

        if (direction == "left") snakeX--;
        else if (direction == "up") snakeY--;
        else if (direction == "right") snakeX++;
        else if (direction == "down") snakeY++;

        //if hits wall is game over
        if (snakeX < 0 || snakeY < 0 || snakeX >= cvsW / snakeW || snakeY >= cvsH / snakeH || checkCollision(snakeX, snakeY, snake)) {
             
                location.reload();
        }

        //if snake eats food
        if (snakeX == food.x && snakeY == food.y) {

                food = {
                        x: Math.round(Math.random() * ((cvsW / snakeW) - 1)),
                        y: Math.round(Math.random() * ((cvsH) / snakeH) - (30 * (snakeH)))

                }
                //eGan check that new food is not on snake
                for (i = 0; i < snake.length; i++) {
                        if (x == snake[i].x || y == snake[i].y) {
                                food = {
                                        x: Math.round(Math.random() * ((cvsW / snakeW) - 1)),
                                        y: Math.round(Math.random() * ((cvsH / snakeH) - 1))

                                }

                        }
                }



                var newHead = {
                        x: snakeX,
                        y: snakeY
                };
                playEatSound();
                score += timer;
                timer = 100
                // score++;

                //eGan added accelration each time snake eats
                // clearInterval(game);
                // gameSpeed-=10;
                // game=setInterval(draw, gameSpeed); 
        } else {
                snake.pop();
                var newHead = {
                        x: snakeX,
                        y: snakeY
                };
        }
        snake.unshift(newHead);
        drawScore(score);


}

function timerFunction() {

        ctx.fillStyle = "orange";
        ctx.font = "19px impact ";
        ctx.fillText("timer: " + Math.round(timer), 150, cvsH - 5);
        timer -= .1;
}

 

var game = setInterval(draw, gameSpeed);


















