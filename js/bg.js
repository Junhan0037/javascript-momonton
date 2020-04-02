const body = document.querySelector("body");

const IMG_NUMBER = 7;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `./images/${imgNumber}.jpg`
    image.classList.add("bgImage"); // class명을 추가하면서 css적용
    body.prepend(image);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
    return number;
}

function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();