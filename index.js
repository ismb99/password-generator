const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

// Select dom elements
const generateButton = document.querySelector(".btn");
const toggleMode = document.querySelector(".bi-brightness-high-fill");
const checkboxSymbols = document.getElementById("checkbox-symbols");
const checkboxNumbers = document.getElementById("checkbox-numbers");
const passwordDisplay1 = document.querySelector(".generatedPasswordDisplay1 ");
const passwordDisplay2 = document.querySelector(".generatedPasswordDisplay2 ");
const h1Element = document.querySelector(".title");
const pEl = document.querySelector(".text");
const clipboard1 = document.querySelector(".copy-pass1");
const clipboard2 = document.querySelector(".copy-pass2");

// Toggle dark/light theme
toggleMode.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");
  h1Element.classList.toggle("dark-color");
  pEl.classList.toggle("dark-color");
  const headerElement = document.querySelector("header");
  headerElement.classList.toggle("headerDark");

  if (toggleMode.classList.contains("bi-brightness-high-fill")) {
    toggleMode.classList.remove("bi-brightness-high-fill");
    toggleMode.classList.add("bi-moon");
  } else {
    toggleMode.classList.remove("bi-moon");
    toggleMode.classList.add("bi-brightness-high-fill");
  }
});

// Generate random password and render it

generateButton.addEventListener("click", () => {
  const passwordLength = document.getElementById("passwordLength").value;
  let generatedPassword1 = "";
  let generatedPassword2 = "";
  for (let i = 0; i < passwordLength; i++) {
    if (checkboxNumbers.checked && checkboxSymbols.checked) {
      generatedPassword1 += getRandomCharacter();
      generatedPassword2 += getRandomCharacter();
    } else if (checkboxSymbols.checked) {
      generatedPassword1 += getRandomLettersAndSymbols();
      generatedPassword2 += getRandomLettersAndSymbols();
    } else if (checkboxNumbers.checked) {
      generatedPassword1 += getRandomNumberAndLetters();
      generatedPassword2 += getRandomNumberAndLetters();
    } else {
      generatedPassword1 += getRandomLetters();
      generatedPassword2 += getRandomLetters();
    }
  }
  passwordDisplay1.textContent = generatedPassword1;
  passwordDisplay2.textContent = generatedPassword2;
});

const copyMessage1 = document.querySelector(".copyMessage1");
const copyMessage2 = document.querySelector(".copyMessage2");

clipboard1.addEventListener("click", () => {
  var copyText = passwordDisplay1.textContent;

  navigator.clipboard.writeText(copyText);

  console.log(copyText);

  copyMessage1.style.display = "inline";
  setTimeout(() => {
    copyMessage1.style.display = "none";
  }, 5000);
  // alert("Copied the text: " + copyText);
});

clipboard2.addEventListener("click", () => {
  var copyText = passwordDisplay2.textContent;

  navigator.clipboard.writeText(copyText);

  copyMessage2.style.display = "inline";

  console.log(copyText);
  setTimeout(() => {
    copyMessage2.style.display = "none";
  }, 5000);
  // alert("Copied the text: " + copyText);
});

// Filter characters array
const filterLetter = characters.filter((letter) => /[a-zA-Z]/.test(letter));
const filterNumbers = characters.filter((number) => /[0-9]/.test(number));
const filterSymbols = characters.filter(
  (symbol) => !/[a-zA-Z0-9]/.test(symbol)
);

// combined arrays
const lettersAndNumbers = filterLetter.concat(filterNumbers);
const lettersAndSymbols = filterLetter.concat(filterSymbols);

// Random functions
function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * characters.length);
  const randomCharacter = characters[randomIndex];
  return randomCharacter;
}
function getRandomLetters() {
  const randomIndex = Math.floor(Math.random() * filterLetter.length);
  const randomLetter = filterLetter[randomIndex];
  return randomLetter;
}
function getRandomNumberAndLetters() {
  const randomIndex = Math.floor(Math.random() * lettersAndNumbers.length);
  const randomNumbersAndLetters = lettersAndNumbers[randomIndex];
  return randomNumbersAndLetters;
}
function getRandomLettersAndSymbols() {
  const randomIndex = Math.floor(Math.random() * lettersAndSymbols.length);
  const randomSymbolsAndLetters = lettersAndSymbols[randomIndex];
  return randomSymbolsAndLetters;
}
