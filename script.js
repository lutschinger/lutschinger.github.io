const ball = document.querySelector('.ball');
const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const scoreDisplay = document.getElementById('score');

const container = document.querySelector('.container');
const containerRect = container.getBoundingClientRect();

const ballSpeedX = 5;
const ballSpeedY = 2;
const paddleSpeed = 8; // Both paddles move at the same speed

let ballX = containerRect.width / 2;
let ballY = containerRect.height / 2;
let ballDirectionX = 1;
let ballDirectionY = 1;

let leftPaddleY = containerRect.height / 2 - 40;
let rightPaddleY = containerRect.height / 2 - 40;

let leftPlayerScore = 0;
let rightPlayerScore = 0;

function moveRightPaddle() {
    // Basic AI: Move the right paddle toward the ball's vertical position
    if (rightPaddleY + 40 < ballY) {
        rightPaddleY += paddleSpeed;
    } else if (rightPaddleY + 40 > ballY) {
        rightPaddleY -= paddleSpeed;
    }

    // Ensure the right paddle stays within the container
    if (rightPaddleY < 0) {
        rightPaddleY = 0;
    } else if (rightPaddleY > containerRect.height - 80) {
        rightPaddleY = containerRect.height - 80;
    }

    rightPaddle.style.top = rightPaddleY + 'px';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    } else if (e.key === 'ArrowDown' && leftPaddleY < containerRect.height - 80) {
        leftPaddleY += paddleSpeed;
    }
    leftPaddle.style.top = leftPaddleY + 'px';
});

function updateBallPosition() {
    ballX += ballSpeedX * ballDirectionX;
    ballY += ballSpeedY * ballDirectionY;

    if (ballY <= 0 || ballY >= containerRect.height - 20) {
        ballDirectionY *= -1;
    }

    if (ballX <= 0) {
        // Ball hit left wall, reset ball position and increment right player's score
        ballX = containerRect.width / 2;
        ballY = containerRect.height / 2;
        ballDirectionX *= -1;
        rightPlayerScore++;
    } else if (ballX >= containerRect.width - 20) {
        // Ball hit right wall, reset ball position and increment left player's score
        ballX = containerRect.width / 2;
        ballY = containerRect.height / 2;
        ballDirectionX *= -1;
        leftPlayerScore++;
    }

    if (
        ballX <= 20 &&
        ballY >= leftPaddleY &&
        ballY <= leftPaddleY + 80
    ) {
        // Ball hit the left paddle
        ballDirectionX *= -1;
    }

    if (
        ballX >= containerRect.width - 30 &&
        ballY >= rightPaddleY &&
        ballY <= rightPaddleY + 80
    ) {
        // Ball hit the right paddle
        ballDirectionX *= -1;
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Update the score display
    scoreDisplay.textContent = `Left: ${leftPlayerScore} - Right: ${rightPlayerScore}`;
}

function gameLoop() {
    updateBallPosition();
    moveRightPaddle(); // Update the right paddle's position
    requestAnimationFrame(gameLoop);
}

gameLoop();
