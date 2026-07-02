const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 20;
let intervalTime = 200;
const eatSound = new Audio('assets/eat.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');

function playEatSound() {
    eatSound.currentTime = 0;
    eatSound.play();
}

function playGameOverSound() {
    gameOverSound.play();
}


function createBoard() {
    for (let i = 0; i < 400; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares. push (square);
    }
}
createBoard();

function startGame() {
    //איפוס
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    direction = 1;
    scoreDisplay.textContent = score;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    generateApple();
    timerId = setInterval(move, intervalTime);
}

function move() {
  
    const hitbottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    const hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    const hitright = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitleft = (currentSnake[0] % 20 === 0 && direction === -1);
    const hitSelf = squares[currentSnake[0] + direction]?.classList.contains('snake');
    if (hitbottom || hitTop || hitright || hitleft || hitSelf) {
        return endGame();
    }
   
    const tail = currentSnake.pop();
    squares [tail].classList.remove('snake');

    const newHead = currentSnake[0] + direction;
    squares[newHead].classList.add('snake');
    currentSnake.unshift(newHead);
    //apple
    if (squares[newHead].classList.contains('apple')) {
        playEatSound();
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++;
        scoreDisplay.textContent = score;
        generateApple();
    }
  

}
  //swipes
     document.addEventListener ('touchstart',e => {
        touchedX = e.changedTouches[0].screenX;
        touchedY = e.changedTouches[0].screenY;
        handleswipe();
    }, false);
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleswipe();
    }, false);

function changeDir(newDirection) {
    if (direction + newDirection !== 0) {
        direction = newDirection;}
    }
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}
//פונקציה שמטפלת בשינוי כיוון לכפתורים ומקלדת
function changeDir(newDirection) {
   // מניעת פניית פרסה
   if (direction + newDirection !== 0) {
       direction = newDirection;
   }
}
 //תמיכה במקלדת למחשב
document.addEventListener('keydown', (e) => {   
    if (e.key === 'ArrowUp') changeDir(-20);
    if (e.key === 'ArrowDown') changeDir(20);
    if (e.key === 'ArrowLeft') changeDir(1);
    if (e.key === 'ArrowRight') changeDir(-1);
});




if (squares[newHead] .classList.contains('apple')) {
    squares[newHead].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    score++; scoreDisplay.textContent = score;
    generateApple();
}
function endGame() {
    playGameOverSound();
    return clearInterval(timerId);
}
function handleswipe() {
        const dx = touchEndX - touchedX;
        const dy = touchEndY - touchedY;
    
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 30) {
            if (absDx > absDy) {
                if (dx > 0) changeDir(-1);
        else changeDir(1);
        } else {
            if (dy > 0) changeDir(20);
            else changeDir(-20);
        }
    }
}
