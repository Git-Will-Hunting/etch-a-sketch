const gridContainer = document.querySelector(".grid-container");
const header = document.querySelector(".header");
console.log(header);
const gridSize = 16;

// get window size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - header.offsetHeight;

// determine grid square size
const gridSquareSize = Math.floor(Math.min(windowWidth, windowHeight) / gridSize);

// set grid container size
gridContainer.style.width = `${gridSquareSize * gridSize}px`;
gridContainer.style.height = `${gridSquareSize * gridSize}px`;

// create grid squares
function drawGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.style.width = `${gridSquareSize - 2}px`;
        gridSquare.style.height = `${gridSquareSize - 2}px`;
        gridSquare.style.border = "1px solid black";
        gridContainer.appendChild(gridSquare);
    }
    // display grid squares with flex
    gridContainer.style.display = "flex";
    gridContainer.style.flexWrap = "wrap";
    
}

// grid square hover effect
function hoverEffect(e) {
    e.target.style.backgroundColor = "black";
    setTimeout(() => {
        e.target.style.backgroundColor = "white";
    }
    , 1500);
}


// draw grid
drawGrid(gridSize);

// event listeners
const gridSquares = document.querySelectorAll(".grid-square");
gridSquares.forEach(gridSquare => {
    gridSquare.addEventListener("mouseover", hoverEffect);
});