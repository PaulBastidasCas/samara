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

const btnMinimize = document.getElementById('btn-minimize');
const btnMaximize = document.getElementById('btn-maximize');
const btnClose = document.getElementById('btn-close');

btnClose.addEventListener('click', () => { window.location.href = 'index.html'; });

let heartsCount = 3;
const heartsArr = [document.querySelector('.h1'), document.querySelector('.h2'), document.querySelector('.h3')];
const dotsArr = [document.querySelector('.d2'), document.querySelector('.d1')];

btnMinimize.addEventListener('click', () => {
    if (heartsCount > 0) {
        heartsCount--;
        heartsArr[2 - heartsCount].classList.add('heart-hidden');
        if (heartsCount < 2) dotsArr[1 - heartsCount].style.opacity = '0';

        if (heartsCount === 0) {
            setTimeout(() => { window.location.replace('juego.html'); }, 500);
        }
    }
});

const modal = document.getElementById('image-modal');
const closeModal = document.querySelector('.close-modal');

btnMaximize.addEventListener('click', () => { modal.classList.add('show'); });
closeModal.addEventListener('click', () => { modal.classList.remove('show'); });
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });

const btnNo = document.getElementById('btn-no');
const btnNoWrapper = document.getElementById('btn-no-wrapper');
const mainPhoto = document.getElementById('main-photo');
const modalPhoto = document.getElementById('modal-photo');
const windowBody = document.querySelector('.window-body');

const fotosArr = [
    '../recursos/foto1.jpg', '../recursos/foto2.jpg', '../recursos/foto3.jpg', '../recursos/foto4.jpg', '../recursos/foto5.jpg',
    '../recursos/foto6.jpg', '../recursos/foto7.jpg', '../recursos/foto8.jpg', '../recursos/foto9.jpg', '../recursos/foto10.jpg'
];
let fotoActualIndex = 0;

btnNo.addEventListener('click', () => {
    fotoActualIndex = (fotoActualIndex + 1) % fotosArr.length;
    const nuevaFoto = fotosArr[fotoActualIndex];
    mainPhoto.src = nuevaFoto;
    modalPhoto.src = nuevaFoto;

    btnNoWrapper.style.transform = 'none';

    if (btnNoWrapper.style.position !== 'absolute') {
        btnNoWrapper.style.position = 'absolute';
        btnNoWrapper.style.zIndex = '50';

        btnNoWrapper.offsetWidth;

        btnNoWrapper.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
    }

    const bodyWidth = windowBody.clientWidth;
    const bodyHeight = windowBody.clientHeight;
    const btnWidth = btnNoWrapper.clientWidth;
    const btnHeight = btnNoWrapper.clientHeight;

    const randomX = Math.floor(Math.random() * (bodyWidth - btnWidth - 40)) + 20;
    const randomY = Math.floor(Math.random() * (bodyHeight - btnHeight - 40)) + 20;

    btnNoWrapper.style.left = randomX + 'px';
    btnNoWrapper.style.top = randomY + 'px';
});

const btnYes = document.getElementById('btn-yes');
const btnYesWrapper = document.getElementById('btn-yes-wrapper');
const questionText = document.getElementById('main-question');
const photoContainer = document.getElementById('photo-container');
const yesContainer = document.querySelector('.yes-wrapper');

btnYes.addEventListener('click', (e) => {
    btnNoWrapper.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    btnNoWrapper.style.transform = "translateY(200px) rotate(45deg)";
    btnNoWrapper.style.opacity = "0";

    questionText.innerHTML = "¡Sabía que dirías que sí!<br>Te amo ♡";
    questionText.classList.add('celebration-text');

    btnYesWrapper.style.transform = "translateX(50px)";
    yesContainer.style.transform = "scale(1.2)";
    yesContainer.style.boxShadow = "0 0 25px rgba(233, 93, 106, 0.6)";
    yesContainer.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    yesContainer.style.borderColor = "#e95d6a";
    btnYes.style.color = "#e95d6a";

    photoContainer.style.transform = "scale(1.05)";
    photoContainer.style.boxShadow = "0 10px 30px rgba(233, 93, 106, 0.3)";

    const rect = btnYes.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    for (let i = 0; i < 60; i++) {
        setTimeout(() => createFireworkHeart(clickX, clickY), Math.random() * 200);
    }
});

function createFireworkHeart(x, y) {
    const fw = document.createElement('div');
    fw.classList.add('firework-heart');
    fw.innerText = Math.random() > 0.5 ? '❤️' : '💖';
    fw.style.left = (x - 10) + 'px';
    fw.style.top = (y - 10) + 'px';

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 50;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = (Math.random() - 0.5) * 360 + 'deg';

    fw.style.setProperty('--tx', tx + 'px');
    fw.style.setProperty('--ty', ty + 'px');
    fw.style.setProperty('--rot', rot);

    document.body.appendChild(fw);
    setTimeout(() => fw.remove(), 1200);
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