const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let score = 0;
let timeLeft = 30;
let bubbleInterval;
let specialBubbleInterval;
let timerInterval;
let bubblesPopped = 0; // Лічильник лопнутих бульбашок

// Функція для створення бульбашки
function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Випадкова позиція
    bubble.style.left = Math.random() * 90 + "%"; // Випадкова горизонтальна позиція
    bubble.style.top = Math.random() * 90 + "%"; // Випадкова вертикальна позиція
    bubble.style.width = bubble.style.height = Math.random() * 30 + 30 + "px"; // Випадковий розмір
    bubble.style.animationDuration = Math.random() * 4 + 4 + "s"; // Повільніша анімація (від 4 до 8 секунд)

    // Випадковий тип бульбашки (80% біла, 20% спеціальна)
    const bubbleType = Math.random();
    if (bubbleType < 0.8) {
        bubble.classList.add("white"); // Звичайна бульбашка
        bubble.addEventListener("click", () => {
            score += 1; // Збільшення рахунку для білої бульбашки
            bubblesPopped += 1; // Збільшуємо лічильник лопнутих бульбашок
            scoreDisplay.textContent = `Score: ${score}`;
            bubble.remove();
        });
    } else if (bubbleType < 0.9) {
        bubble.classList.add("red"); // Червона бульбашка
        bubble.addEventListener("click", () => {
            timeLeft -= 5; // Зменшення часу для червоної бульбашки
            timerDisplay.textContent = `Time: ${timeLeft}`;
            bubblesPopped += 1; // Збільшуємо лічильник лопнутих бульбашок
            bubble.remove();
        });
    } else {
        bubble.classList.add("gold"); // Золота бульбашка
        bubble.addEventListener("click", () => {
            timeLeft += 5; // Збільшення часу для золотої бульбашки
            timerDisplay.textContent = `Time: ${timeLeft}`;
            bubblesPopped += 1; // Збільшуємо лічильник лопнутих бульбашок
            bubble.remove();
        });
    }

    gameContainer.appendChild(bubble);

    // Видалення бульбашки після завершення анімації
    setTimeout(() => {
        bubble.remove();
        if (document.body.contains(bubble) && bubble.classList.contains("white")) {
            score -= 1; // Штраф за пропущену білу бульбашку
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }, parseInt(bubble.style.animationDuration) * 1000); // Чекаємо до завершення анімації
}

// Функція для створення однієї червоної або золотої бульбашки
function createSpecialBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Випадкова позиція
    bubble.style.left = Math.random() * 90 + "%"; // Випадкова горизонтальна позиція
    bubble.style.top = Math.random() * 90 + "%"; // Випадкова вертикальна позиція
    bubble.style.width = bubble.style.height = Math.random() * 30 + 30 + "px"; // Випадковий розмір
    bubble.style.animationDuration = Math.random() * 4 + 4 + "s"; // Повільніша анімація (від 4 до 8 секунд)

    // Випадковий вибір між червоною і золотою бульбашкою
    if (Math.random() < 0.5) {
        bubble.classList.add("red"); // Червона бульбашка
        bubble.addEventListener("click", () => {
            timeLeft -= 3; // Зменшення часу для червоної бульбашки
            timerDisplay.textContent = `Time: ${timeLeft}`;
            bubblesPopped += 1; // Збільшуємо лічильник лопнутих бульбашок
            bubble.remove();
        });
    } else {
        bubble.classList.add("gold"); // Золота бульбашка
        bubble.addEventListener("click", () => {
            timeLeft += 5; // Збільшення часу для золотої бульбашки
            timerDisplay.textContent = `Time: ${timeLeft}`;
            bubblesPopped += 1; // Збільшуємо лічильник лопнутих бульбашок
            bubble.remove();
        });
    }

    gameContainer.appendChild(bubble);

    // Видалення бульбашки після завершення анімації
    setTimeout(() => {
        bubble.remove();
    }, parseInt(bubble.style.animationDuration) * 1000); // Чекаємо до завершення анімації
}

// Функція для старту гри
function startGame() {
    // Скидання рахунку і часу
    score = 0;
    timeLeft = 30;
    bubblesPopped = 0; // Лічильник лопнутих бульбашок
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    // Сховати кнопку перезавантаження
    restartButton.style.display = "none";

    // Старт інтервалів
    bubbleInterval = setInterval(createBubble, 500); // Спавн бульбашок кожні 0.5 секунди (швидше)
    specialBubbleInterval = setInterval(createSpecialBubble, 2000); // Спавн однієї спеціальної бульбашки кожні 2 секунди (швидше)
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Функція для завершення гри
function endGame() {
    // Очистка інтервалів
    clearInterval(bubbleInterval);
    clearInterval(specialBubbleInterval);
    clearInterval(timerInterval);

    // Додаємо анімацію зникнення до всіх бульбашок
    const remainingBubbles = document.querySelectorAll(".bubble");
    remainingBubbles.forEach(bubble => {
        bubble.classList.add("fade-out"); // Додаємо клас для анімації зникнення
    });

    // Після завершення анімації виводимо повідомлення
    setTimeout(() => {
        alert(`Game Over! You popped ${bubblesPopped} bubbles.`);
        // Показати кнопку перезавантаження
        restartButton.style.display = "block";
    }, 1000); // Чекаємо 1 секунду на завершення анімації
}

// Додавання слухача події до кнопки перезавантаження
restartButton.addEventListener("click", startGame);

// Старт гри
startGame();
