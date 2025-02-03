const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const message = document.getElementById('message');

yesButton.addEventListener('click', () => {
    message.textContent = "I knew you would say yes! Meet me tomorrow @ 8pm at Bagpacker Cafe.";
    message.classList.remove('hidden');
});


function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    
    const randomX = Math.random() * (window.innerWidth - 50); 
    heart.style.left = `${randomX}px`;

    
    const randomDuration = Math.random() * 3 + 2; 
    heart.style.animationDuration = `${randomDuration}s`;

    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}


setInterval(createFallingHeart, 500); 

noButton.addEventListener('mouseover', () => {
    const randomX = Math.random() * (window.innerWidth - 100); 
    const randomY = Math.random() * (window.innerHeight - 50); 
    noButton.style.position = 'absolute';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
});