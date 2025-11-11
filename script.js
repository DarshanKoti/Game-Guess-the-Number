    const radNum = parseInt(Math.random() * 100 + 1);

    const form = document.querySelector("form")
    const userInput = document.querySelector("#userInput");
    const guessBtn = document.querySelector("#guessBtn")
    let guessSlot = document.querySelector(".guessSlot")
    let remaining = document.querySelector(".remainingSlot")

    const p = document.createElement("p")
    form.appendChild(p)



    let prevGuess = []
    let numGuess = 1;

    let playGame = true;

    if (playGame) {
        guessBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const guess = parseInt(userInput.value)

            validateGuess(guess)
        })
    }

    function validateGuess(guess) {
        if (isNaN(guess)) {
            showError("⚠️ Please enter valid number.")
        }
        else if (guess < 1 || guess > 100) {
            showError("⚠️ Enter number between 1-100 range.")
        }
        else {
            prevGuess.push(guess)
            if (numGuess === 10) {
                displayGuess(guess)
                p.className = "p-1 text-md rounded my-1 font-bold text-green-500"
                p.textContent = `❌ Game Over!! Random number was ${radNum}`;
                endGame();
                return;
            }
            else {
                checkGuess(guess)
                displayGuess(guess)
            }

        }
    }

    function checkGuess(guess) {
        if (guess === radNum) {
            p.className = "p-1 text-md rounded my-1 font-bold text-green-500"
            p.textContent = "✅ You Guessed it right! You won!!";
            endGame();
        }
        else if (guess > radNum) {
            showError("🔺Your number is 'TOO HIGH'.")
        }
        else if (guess < radNum) {
            showError("🔻Your number is 'TOO LOW'.")
        }
    }

    function displayGuess() {
        userInput.value = "";
        guessSlot.innerHTML = `${prevGuess}`;
        numGuess++;
        remaining.innerHTML = `${11 - numGuess}`
    }

    function showError(msg) {
        p.className = "p-1 text-md rounded my-1 font-bold text-red-500"
        p.textContent = msg;
    }

    function endGame(guess) {
        userInput.value = "";
        userInput.setAttribute("disabled", "")
        guessBtn.style.display = "none"

        playGame = false;
        newGame()
    }

    function newGame(guess) {
        let startBtn = document.createElement("button");
        startBtn.textContent = "Start New Game"
        startBtn.className = "w-xs bg-black p-2 font-bold rounded my-2 text-white";
        
        document.querySelector("section").appendChild(startBtn);

        startBtn.addEventListener("click",()=>{
            location.reload();
        })
        
    }


