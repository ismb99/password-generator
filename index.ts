type CharacterArray = string[];

const characters: CharacterArray = [
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
const generateButton = document.getElementById(
  "generateButton"
) as HTMLButtonElement;
const toggleMode = document.getElementById("toggleMode") as HTMLElement;
const checkboxSymbols = document.getElementById(
  "checkbox-symbols"
) as HTMLInputElement;
const checkboxNumbers = document.getElementById(
  "checkbox-numbers"
) as HTMLInputElement;
const passwordDisplay1 = document.getElementById(
  "passwordDisplay1"
) as HTMLDivElement;
const passwordDisplay2 = document.getElementById(
  "passwordDisplay2"
) as HTMLDivElement;
const h1Element = document.querySelector(".title") as HTMLHeadingElement;
const pEl = document.querySelector(".text") as HTMLParagraphElement;
const clipboard1 = document.getElementById("clipboard1") as HTMLElement;
const clipboard2 = document.getElementById("clipboard2") as HTMLElement;
const copyMessage1 = document.getElementById("copyMessage1") as HTMLDivElement;
const copyMessage2 = document.getElementById("copyMessage2") as HTMLDivElement;
const strength1 = document.getElementById("strength1") as HTMLDivElement;
const strength2 = document.getElementById("strength2") as HTMLDivElement;

// Toggle dark/light theme
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  h1Element.classList.toggle("dark-color");
  pEl.classList.toggle("dark-color");

  const headerElement = document.querySelector("header");
  if (headerElement instanceof HTMLElement) {
    headerElement.classList.toggle("headerDark");
  }

  toggleMode.classList.toggle("bi-brightness-high-fill");
  toggleMode.classList.toggle("bi-moon");
});

// Generate random password and render it
generateButton.addEventListener("click", () => {
  const passwordLengthElement = document.getElementById(
    "passwordLength"
  ) as HTMLInputElement;
  const passwordLength = Math.max(
    8,
    Math.min(32, parseInt(passwordLengthElement.value) || 12)
  );

  const generatedPassword1 = generatePassword(passwordLength);
  const generatedPassword2 = generatePassword(passwordLength);

  if (passwordDisplay1) {
    passwordDisplay1.textContent = generatedPassword1;
    flashBackground(passwordDisplay1);
  }
  if (passwordDisplay2) {
    passwordDisplay2.textContent = generatedPassword2;
    flashBackground(passwordDisplay2);
  }

  if (strength1)
    strength1.textContent = `Strength: ${getPasswordStrength(
      generatedPassword1
    )}`;
  if (strength2)
    strength2.textContent = `Strength: ${getPasswordStrength(
      generatedPassword2
    )}`;
});

function generatePassword(length: number): string {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomCharacter();
  }
  return password;
}

function getRandomCharacter(): string {
  const filteredChars = characters.filter((c) => {
    if (!checkboxSymbols.checked && /[^a-zA-Z0-9]/.test(c)) return false;
    if (!checkboxNumbers.checked && /[0-9]/.test(c)) return false;
    return true;
  });
  const randomIndex = Math.floor(Math.random() * filteredChars.length);
  return filteredChars[randomIndex];
}

function flashBackground(element: HTMLElement) {
  element.style.transition = "background-color 0.3s";
  element.style.backgroundColor = "#4CAF50";
  setTimeout(() => {
    element.style.backgroundColor = "";
  }, 300);
}

function getPasswordStrength(password: string): string {
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const strength = [
    length >= 12,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  if (strength < 3) return "Weak";
  if (strength < 5) return "Medium";
  return "Strong";
}

function copyToClipboard(text: string, messageElement: HTMLElement) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      messageElement.style.display = "block";
      setTimeout(() => {
        messageElement.style.display = "none";
      }, 2000);
    })
    .catch((err) => console.error("Could not copy text: ", err));
}

clipboard1.addEventListener("click", () => {
  if (passwordDisplay1.textContent) {
    copyToClipboard(passwordDisplay1.textContent, copyMessage1);
  }
});

clipboard2.addEventListener("click", () => {
  if (passwordDisplay2.textContent) {
    copyToClipboard(passwordDisplay2.textContent, copyMessage2);
  }
});
