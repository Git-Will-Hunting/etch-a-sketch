const gridContainer = document.querySelector(".grid-container");
const header = document.querySelector(".header");
const resetButton = document.querySelector("#reset-button");
const gridSizeInput = document.querySelector(".grid-size-input");


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
});    
}

// grid square hover effect
function hoverEffect(e) {
    // add a random hsl color to the grid square on first hover
    if (e.target.style.backgroundColor === "") {
        e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    }
    // if the grid square is already colored, darken it by 10%
    else {
        const currentColor = e.target.style.backgroundColor;
        const currentColorHSL = currentColor.match(/\d+/g);
        const newColorHSL = `
        hsl(${currentColorHSL[0]}, ${currentColorHSL[1]}%, ${currentColorHSL[2] - 10}%)`;
        e.target.style.backgroundColor = newColorHSL;
    }
    // transition back to white
    setTimeout(() => {
        e.target.style.backgroundColor = "white";
    }
    , 300 * gridSizeInput.value);
}


// draw grid
drawGrid(gridSizeInput.value);



resetButton.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    drawGrid();
});