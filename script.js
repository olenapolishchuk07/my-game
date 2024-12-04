const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let score = 0;
let timeLeft = 30;
let bubbleInterval;
let specialBubbleInterval;
let timerInterval;
let bubblesPopped = 0;

function handleBubbleClick(bubble, timeChange) {
    timeLeft += timeChange; // Збільшити або зменшити час
    score += 1; // Збільшити рахунок
    scoreDisplay.textContent = `Score: ${score}`; // Оновити рахунок
    bubblesPopped += 1; // Збільшити кількість попшених бульбашок
    timerDisplay.textContent = `Time: ${timeLeft}`; // Оновити час
    bubble.remove(); // Видалити бульбашку
}

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    bubble.style.left = Math.random() * 90 + "%";
    bubble.style.top = Math.random() * 90 + "%";
    bubble.style.width = bubble.style.height = Math.random() * 30 + 30 + "px";
    bubble.style.animationDuration = Math.random() * 4 + 4 + "s";

    const bubbleType = Math.random();
    if (bubbleType < 0.8) {
        bubble.classList.add("white");
        bubble.addEventListener("click", () => handleBubbleClick(bubble, 0));
    } else if (bubbleType < 0.9) {
        bubble.classList.add("red");
        bubble.addEventListener("click", () => handleBubbleClick(bubble, -5)); // Зменшити час на 5
    } else {
        bubble.classList.add("gold");
        bubble.addEventListener("click", () => handleBubbleClick(bubble, 5)); // Збільшити час на 5
    }

    gameContainer.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, parseInt(bubble.style.animationDuration) * 1000);
}

function createSpecialBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    bubble.style.left = Math.random() * 90 + "%";
    bubble.style.top = Math.random() * 90 + "%";
    bubble.style.width = bubble.style.height = Math.random() * 30 + 30 + "px";
    bubble.style.animationDuration = Math.random() * 4 + 4 + "s";

    if (Math.random() < 0.5) {
        bubble.classList.add("red");
        bubble.addEventListener("click", () => handleBubbleClick(bubble, -5)); // Зменшити час на 5
    } else {
        bubble.classList.add("gold");
        bubble.addEventListener("click", () => handleBubbleClick(bubble, 5)); // Збільшити час на 5
    }

    gameContainer.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, parseInt(bubble.style.animationDuration) * 1000);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    bubblesPopped = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    restartButton.style.display = "none";

    bubbleInterval = setInterval(createBubble, 500);
    specialBubbleInterval = setInterval(createSpecialBubble, 2000);
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(bubbleInterval);
    clearInterval(specialBubbleInterval);
    clearInterval(timerInterval);

    const remainingBubbles = document.querySelectorAll(".bubble");
    remainingBubbles.forEach(bubble => {
        bubble.classList.add("fade-out");
    });

    setTimeout(() => {
        alert(`Game Over! You popped ${bubblesPopped} bubbles.`);
        restartButton.style.display = "block";
    }, 1000);
}

restartButton.addEventListener("click", startGame);

startGame();