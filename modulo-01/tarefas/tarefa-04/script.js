const colorBox = document.getElementById("color-box");
const hexCode = document.getElementById("hex-code");
const changeColorBtn = document.getElementById("change-color-btn");

function getRandomHexColor() {
    const characters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function updateBackgroundColor() {
    const color = getRandomHexColor();

    colorBox.style.backgroundColor = color;
    colorBox.style.borderColor = color;
    hexCode.textContent = color;
}

changeColorBtn.addEventListener("click", updateBackgroundColor);

updateBackgroundColor();
