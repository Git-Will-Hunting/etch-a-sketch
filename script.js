const gridContainer = document.querySelector(".grid-container");
const header = document.querySelector(".header");
const resetButton = document.querySelector(".reset-button");
const gridSizeInput = document.querySelector(".grid-size-input");

// mousedown toggle
let mouseDown = false;
window.addEventListener("mousedown", () => {
    mouseDown = true;
});
window.addEventListener("mouseup", () => {
    mouseDown = false;
});

// color modes
let currentMode = "black";
const colorModeButton = document.querySelector(".color-mode");
const blackModeButton = document.querySelector(".black-mode");
const eraserModeButton = document.querySelector(".eraser-mode");

colorModeButton.addEventListener("click", () => {
    currentMode = "color";
    colorModeButton.classList.add("active");
    blackModeButton.classList.remove("active");
    eraserModeButton.classList.remove("active");
});
blackModeButton.addEventListener("click", () => {
    currentMode = "black";
    colorModeButton.classList.remove("active");
    blackModeButton.classList.add("active");
    eraserModeButton.classList.remove("active");
});
eraserModeButton.addEventListener("click", () => {
    currentMode = "eraser";
    colorModeButton.classList.remove("active");
    blackModeButton.classList.remove("active");
    eraserModeButton.classList.add("active");
});

// get window size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - header.offsetHeight;

// determine grid square size
function getGridSquareSize() {
    if (windowWidth < windowHeight) {
        return Math.floor(windowWidth / gridSizeInput.value);
    } else {
        return Math.floor(windowHeight / gridSizeInput.value);
    }
}

// create grid squares
function drawGrid() {
    const gridSquareSize = getGridSquareSize();
    // set grid container size
    gridContainer.style.width = `${gridSquareSize * gridSizeInput.value}px`;
    gridContainer.style.height = `${gridSquareSize * gridSizeInput.value}px`;
    for (let i = 0; i < (gridSizeInput.value * gridSizeInput.value); i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.style.width = `${gridSquareSize - 2}px`;
        gridSquare.style.height = `${gridSquareSize - 2}px`;
        gridSquare.style.border = "1px rgba(0, 0, 0, 0.5) solid";
        gridContainer.appendChild(gridSquare);
    }
    // display grid squares with flex
    gridContainer.style.display = "flex";
    gridContainer.style.flexWrap = "wrap";
    // event listeners
    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach(gridSquare => {
        gridSquare.addEventListener("mouseover", hoverEffect);
    // color on click too
    gridSquares.forEach(square =>
        square.addEventListener("click", hoverEffect));

});    
}

// grid square hover effect
function hoverEffect(e) {
    // if mouse is not down, return
    if (e.type === "mouseover" && !mouseDown) return;
    // color mode
    // add a random hsl color to the grid square on first hover
    if(currentMode === "color"){
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === "black") {
        e.target.style.backgroundColor = "black";
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "white";
    }
}

// draw grid
drawGrid(gridSizeInput.value);

resetButton.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    drawGrid();
});