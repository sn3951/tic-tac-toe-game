const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn")

let currentPlayer;
let gameGrid

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
//lets create a function to initialize the game
function initGame() {
    currentPlayer = "X"
    gameGrid = ["", "", "", "", "", "", "", "", ""]
    newGamebtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`
    //UI pas bhi empty karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = ""
        boxes[index].style.pointerEvents = "all"
        box.classList = `box box-${index + 1}`
    })

}
initGame()
function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X"
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer
        gameGrid[index] = currentPlayer
        boxes[index].style.pointerEvents = "none"
        //swap turn
        swapTurn()
        //check koi jeet toh nahi gaya
        checkGameOver()
    }
}
function checkGameOver() {
    let answer = ""
    winningPositions.forEach((position) => {
        // all 3 boxes be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" ||
            gameGrid[position[1]] !== "" ||
            gameGrid[position[2]] !== "") &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[0]] === gameGrid[position[2]]
        ) {
            //check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X"
            else answer = "O"

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            // now we know that X or O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    })
    //it means we have winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`
        newGamebtn.classList.add("active")
        return
    }
    //lets check whether there is a tie
    let fillCount = 0
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++
        }
        //board is filled, game is tie
        if (fillCount === 9) {
            gameInfo.innerText = "Game Tied !"
            newGamebtn.classList.add("active")
        }
    })

}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index)
    })
})
newGamebtn.addEventListener("click", initGame)