document.addEventListener('DOMContentLoaded', () => {
    const num = Math.floor(Math.random() * 8) + 1;
    document.querySelector('body').style.backgroundImage = `url(./img/${num}.jpg)`
})