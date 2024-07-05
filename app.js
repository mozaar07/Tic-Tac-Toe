let game = document.querySelector(".game");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-Btn");
let resultBox = document.querySelector(".result-box");
let result = document.querySelector("#result");
let newBtn = document.querySelector(".new-Btn");
let changeColor = document.getElementsByClassName("box");

let turnX = true;
let count = 0;

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    resultBox.classList.add("hide");
    game.classList.remove("hide");
    resetBtn.classList.remove("hide");
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].style.background = "#366a3c";
        let pos2 = boxes[pattern[1]].style.background = "#366a3c";
        let pos3 = boxes[pattern[2]].style.background = "#366a3c";
    }
}

const gameDraw = () => {
    result.innerText = `Game was a Draw.`;
    resultBox.classList.remove("hide");
    game.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX){
            box.innerText = "X";
            box.style.color = "#F5F5DC";
            box.style.background = "#294c2e";
            turnX = false;
        }
        else{
            box.innerText = "O";
            turnX = true;
            box.style.color = "#CD853F";
            box.style.background = "#294c2e";
        }
        box.disabled = true;
        count++;

        let isWinner = false; 
        isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            setTimeout(() => {
                gameDraw();
            }, 1000)
            // gameDraw();
        }

        // checkWinner();
    });
});



const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    result.innerText = `Congratulations, Winner is ${winner}`;
    resultBox.classList.remove("hide");
    resetBtn.classList.add("hide");
    game.classList.add("hide");
    disableBoxes();
}

// const timeout = setTimeout(resultDelay, 2000);


const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                boxes[pattern[0]].style.background = "#d4af37";
                boxes[pattern[1]].style.background = "#d4af37";
                boxes[pattern[2]].style.background = "#d4af37";

                setTimeout(() => {
                    showWinner(pos1);
                }, 1500)
                return true;
                // let timeout = setTimeout(showWinner(), 3000);
                // timeout(showWinner(pos1));
                // showWinner(pos1);
            }
        }
    }
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);