// Settings Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
    "footer"
).innerHTML = `${gameName} Game Created By Elawamy`;

// Setting Game Option
let numbersOfTries = 6;
let numbersOfLetter = 6;
let currentTry = 1;
let numberOfHints = 2;

// Mange Words
let wordToGuess = "";
const words = [
    "Create",
    "Update",
    "Delete",
    "Master",
    "Branch",
    "Mainly",
    "Elzero",
    "School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);

let messageArea = document.querySelector(".message");

// MAnage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    // Create Main Try Div
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try-${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        // Create inputs
        for (let j = 1; j <= numbersOfLetter; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    // Disabled All Input Expect First One
    const inputInDisabledDiv = document.querySelectorAll(
        ".disabled-inputs input"
    );
    inputInDisabledDiv.forEach((input) => (input.disabled = true));

    // convert input to UpperCase
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });
    });

    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (e) {
            // console.log(e);
            const curentIndex = Array.from(inputs).indexOf(e.target); // e.target OR this
            // console.log(curentIndex);
            if (e.key === "ArrowRight") {
                const nextInput = curentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (e.key === "ArrowLeft") {
                const prevInput = curentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }
        });
    });
}
const guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", handleGuesses);

function handleGuesses() {
    let successGuess = true;

    for (let i = 1; i <= numbersOfLetter; i++) {
        const inputField = document.querySelector(
            `#guess-${currentTry}-letter-${i}`
        );
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];

        // Game Logic

        if (letter === actualLetter) {
            inputField.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("no");
            successGuess = false;
        }

        // check if user win or lose
    }
    if (successGuess) {
        messageArea.innerHTML = `You Win The Word Is: <span>${wordToGuess} 👏</span> `;
        getHintButton.disabled = true;

        if (numberOfHints === 2) {
            messageArea.innerHTML += `<p>WOW!😃 You Didn\`t Use Hints</p> `;
        }
        // Add Disabled Class On All Tries Divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        // Disabled Check Button
        guessBtn.disabled = true;
    } else {
        document
            .querySelector(`.try-${currentTry}`)
            .classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(
            `.try-${currentTry} input`
        );
        currentTryInputs.forEach((input) => (input.disabled = true));
        currentTry++;

        const nextTryInputs = document.querySelectorAll(
            `.try-${currentTry} input`
        );
        nextTryInputs.forEach((input) => (input.disabled = false));

        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
            document
                .querySelector(`.try-${currentTry}`)
                .classList.remove("disabled-inputs");
            el.children[1].focus();
        } else {
            guessBtn.disabled = true;
            getHintButton.disabled = true;
            messageArea.innerHTML = `You Lose 🥴 The Word Is: <span>${wordToGuess}</span> `;
        }
    }
}
function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) {
        getHintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(enabledInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter(
        (input) => input.value === ""
    );
    // console.log(emptyEnabledInputs);

    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(
            Math.random() * emptyEnabledInputs.length
        );
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        // console.log(randomIndex);
        // console.log(randomInput);
        // console.log(indexToFill);
        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toLocaleUpperCase();
        }
    }
}

function handleBackSpace(e) {
    if (e.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
}
document.addEventListener("keydown", handleBackSpace);

window.onload = function () {
    generateInput();
};
