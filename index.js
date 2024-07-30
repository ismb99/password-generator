var characters = [
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
// Select DOM elements
var generateButton = document.getElementById("generateButton");
var toggleMode = document.getElementById("toggleMode");
var checkboxSymbols = document.getElementById("checkbox-symbols");
var checkboxNumbers = document.getElementById("checkbox-numbers");
var passwordDisplay1 = document.getElementById("passwordDisplay1");
var passwordDisplay2 = document.getElementById("passwordDisplay2");
var h1Element = document.querySelector(".title");
var pEl = document.querySelector(".text");
var clipboard1 = document.getElementById("clipboard1");
var clipboard2 = document.getElementById("clipboard2");
var copyMessage1 = document.getElementById("copyMessage1");
var copyMessage2 = document.getElementById("copyMessage2");
var strength1 = document.getElementById("strength1");
var strength2 = document.getElementById("strength2");
// Toggle dark/light theme
toggleMode.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    h1Element.classList.toggle("dark-color");
    pEl.classList.toggle("dark-color");
    var headerElement = document.querySelector("header");
    if (headerElement instanceof HTMLElement) {
        headerElement.classList.toggle("headerDark");
    }
    toggleMode.classList.toggle("bi-brightness-high-fill");
    toggleMode.classList.toggle("bi-moon");
});
// Generate random password and render it
generateButton.addEventListener("click", function () {
    var passwordLengthElement = document.getElementById("passwordLength");
    var passwordLength = Math.max(8, Math.min(32, parseInt(passwordLengthElement.value) || 12));
    var generatedPassword1 = generatePassword(passwordLength);
    var generatedPassword2 = generatePassword(passwordLength);
    if (passwordDisplay1) {
        passwordDisplay1.textContent = generatedPassword1;
        flashBackground(passwordDisplay1);
    }
    if (passwordDisplay2) {
        passwordDisplay2.textContent = generatedPassword2;
        flashBackground(passwordDisplay2);
    }
    if (strength1)
        strength1.textContent = "Strength: ".concat(getPasswordStrength(generatedPassword1));
    if (strength2)
        strength2.textContent = "Strength: ".concat(getPasswordStrength(generatedPassword2));
});
function generatePassword(length) {
    var password = "";
    for (var i = 0; i < length; i++) {
        password += getRandomCharacter();
    }
    return password;
}
function getRandomCharacter() {
    var filteredChars = characters.filter(function (c) {
        if (!checkboxSymbols.checked && /[^a-zA-Z0-9]/.test(c))
            return false;
        if (!checkboxNumbers.checked && /[0-9]/.test(c))
            return false;
        return true;
    });
    var randomIndex = Math.floor(Math.random() * filteredChars.length);
    return filteredChars[randomIndex];
}
function flashBackground(element) {
    element.style.transition = "background-color 0.3s";
    element.style.backgroundColor = "#4CAF50";
    setTimeout(function () {
        element.style.backgroundColor = "";
    }, 300);
}
function getPasswordStrength(password) {
    var length = password.length;
    var hasLower = /[a-z]/.test(password);
    var hasUpper = /[A-Z]/.test(password);
    var hasNumber = /\d/.test(password);
    var hasSpecial = /[^A-Za-z0-9]/.test(password);
    var strength = [
        length >= 12,
        hasLower,
        hasUpper,
        hasNumber,
        hasSpecial,
    ].filter(Boolean).length;
    if (strength < 3)
        return "Weak";
    if (strength < 5)
        return "Medium";
    return "Strong";
}
function copyToClipboard(text, messageElement) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
        messageElement.style.display = "block";
        setTimeout(function () {
            messageElement.style.display = "none";
        }, 2000);
    })
        .catch(function (err) { return console.error("Could not copy text: ", err); });
}
clipboard1.addEventListener("click", function () {
    if (passwordDisplay1.textContent) {
        copyToClipboard(passwordDisplay1.textContent, copyMessage1);
    }
});
clipboard2.addEventListener("click", function () {
    if (passwordDisplay2.textContent) {
        copyToClipboard(passwordDisplay2.textContent, copyMessage2);
    }
});
