function createHeartBackground() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerText = Math.random() > 0.5 ? '❤️' : '🩷';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
    const duration = Math.random() * 4 + 4;
    heart.style.animationDuration = duration + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(createHeartBackground, 200);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameContainer = document.getElementById('game-container');

function resizeCanvas() {
    canvas.width = gameContainer.clientWidth;
    canvas.height = gameContainer.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let isGameOver = false;
let isVictory = false;
let pinkHearts = 0;
let redHearts = 0;
let lives = 3;

const pinkCounter = document.getElementById('pink-counter');
const redHeartsDisplay = document.getElementById('red-hearts-display');
const livesDisplay = document.getElementById('lives-display');
const gameOverScreen = document.getElementById('gameOverScreen');
const victoryScreen = document.getElementById('victoryScreen');

class Player {
    constructor() {
        this.size = 50;
        this.x = canvas.width / 2 - this.size / 2;
        this.y = canvas.height - this.size - 20;
        this.speed = 8;
        this.dx = 0;
        this.emoji = '🐈‍⬛';
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.emoji, this.x + this.size / 2, this.y + this.size / 2);
    }

    update() {
        this.x += this.dx;
        if (this.x < 0) this.x = 0;
        if (this.x + this.size > canvas.width) this.x = canvas.width - this.size;
    }
}

class Item {
    constructor(isObstacle) {
        this.size = 35;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = -50;
        this.isObstacle = isObstacle;

        const obstacles = ['🔪', '🪚', '⚔️'];
        this.emoji = isObstacle ? obstacles[Math.floor(Math.random() * obstacles.length)] : '🩷';

        this.speed = isObstacle ? (Math.random() * 5 + 6) : (Math.random() * 3 + 3);
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.emoji, this.x + this.size / 2, this.y + this.size / 2);
    }

    update() {
        this.y += this.speed;
    }
}

const player = new Player();
const items = [];
let frameCount = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') player.dx = -player.speed;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') player.dx = player.speed;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        player.dx = 0;
    }
});

function updateUI() {
    pinkCounter.innerText = `🩷 ${pinkHearts % 10}/10`;
    livesDisplay.innerText = `❤️x${lives}`;

    let redStr = '';
    for (let i = 0; i < 3; i++) {
        redStr += (i < redHearts) ? '❤️' : '🤍';
    }
    redHeartsDisplay.innerText = redStr;
}

function checkCollision(item) {
    const dx = (player.x + player.size / 2) - (item.x + item.size / 2);
    const dy = (player.y + player.size / 2) - (item.y + item.size / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (player.size / 2 + item.size / 2 - 10);
}

history.pushState(null, null, location.href);

window.addEventListener('popstate', function () {
    history.pushState(null, null, location.href);
});

function gameLoop() {
    if (isGameOver || isVictory) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frameCount % 25 === 0) {
        const isObstacle = Math.random() < 0.70;
        items.push(new Item(isObstacle));
    }

    player.update();
    player.draw();

    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.update();
        item.draw();

        if (checkCollision(item)) {
            if (item.isObstacle) {
                lives--;
                updateUI();
                if (lives <= 0) {
                    isGameOver = true;
                    gameOverScreen.classList.add('active');
                }
            } else {
                pinkHearts++;

                if (pinkHearts % 10 === 0) {
                    redHearts++;
                    if (redHearts >= 3) {
                        isVictory = true;
                        updateUI();
                        victoryScreen.classList.add('active');
                        setTimeout(() => {
                            window.location.href = 'cuestionario.html';
                        }, 2500);
                    }
                }
                updateUI();
            }
            items.splice(i, 1);
            continue;
        }

        if (item.y > canvas.height) {
            items.splice(i, 1);
        }
    }

    frameCount++;
    requestAnimationFrame(gameLoop);
}

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('musica-fondo');

    function playAudio() {
        audio.play().then(() => {
            console.log("Reproducción automática iniciada.");
        }).catch(error => {
            console.log("El navegador bloqueó el autoplay. Esperando interacción.");
        });
        document.removeEventListener('click', playAudio);
    }

    audio.play().catch(() => {
        document.addEventListener('click', playAudio);
    });
});

updateUI();
gameLoop();