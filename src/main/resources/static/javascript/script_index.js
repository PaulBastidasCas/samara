function createHeart() {
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
setInterval(createHeart, 200);

const bowArea = document.getElementById('bow-area');
const arrow = document.getElementById('arrow');
const envelope = document.getElementById('envelope');
const envelopeHeart = document.getElementById('envelope-heart');

let isDragging = false;
let startY = 0;
let currentPull = 0;
const maxPull = 120;
let alreadyShot = false;

bowArea.addEventListener('pointerdown', (e) => {
    if (alreadyShot) return;
    isDragging = true;
    startY = e.clientY;
    arrow.style.opacity = '1';
    arrow.style.transition = 'none';
});

document.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    if (deltaY > 0) {
        currentPull = Math.min(deltaY, maxPull);
        arrow.style.transform = `translateY(${currentPull}px)`;
    }
});

document.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    if (currentPull > 40) {
        shootArrow();
    } else {
        resetArrow();
    }
});

function shootArrow() {
    alreadyShot = true;
    const distanceToTarget = window.innerHeight * -0.60;

    arrow.style.transition = 'transform 0.3s cubic-bezier(0.5, 0, 0.75, 0)';
    arrow.style.transform = `translateY(${distanceToTarget}px)`;

    setTimeout(() => {
        arrow.style.opacity = '0';
        envelopeHeart.style.opacity = '0';

        envelope.classList.add('vibrate-anim');
        explodeHeartEffect();

        setTimeout(() => {
            window.location.href = 'cuestionario.html';
        }, 600);

    }, 300);
}

function resetArrow() {
    currentPull = 0;
    arrow.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    arrow.style.transform = `translateY(0px)`;
    arrow.style.opacity = '0';
}

function explodeHeartEffect() {
    const rect = envelopeHeart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('mini-heart-explosion');
        particle.innerText = Math.random() > 0.5 ? '❤️' : '🩷';

        particle.style.left = (centerX - 10) + 'px';
        particle.style.top = (centerY - 10) + 'px';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 500);
    }
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