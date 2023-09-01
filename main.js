/* 
rgb(234, 255, 0) = yellow
rgb(20, 31, 245) = blue
rgb(240, 78, 20) = red
rgb(0, 0, 0) = black
rgb(255, 255, 255) = white

COLOR INSPIRATION FROM : https://aifont.process.studio/
*/

colorSets = [
  ["rgb(234, 255, 0)", "rgb(0, 0, 0)"],
  ["rgb(20, 31, 245", "rgb(255, 255, 255)"],
  ["rgb(240, 78, 20)", "rgb(0, 0, 0)"],
];
let setNr = 0;

let backgroundColor;
function changeColor() {
  backgroundColor = colorSets[setNr][0];
  textColor = colorSets[setNr][1];

  document.body.style.backgroundColor = backgroundColor;
  document.querySelector(".title").style.color = textColor;

  if (setNr < 3) {
    setNr++;
  }
  if (setNr == 3) {
    setNr = 0;
  }
}

const coordinatesText = document.getElementById("coordinates");
let xCoord;
let yCoord;

document.addEventListener("mousemove", (event) => {
  xCoord = event.clientX;
  yCoord = event.clientY;
  let coords = [xCoord + ", " + yCoord];
  coordinatesText.textContent = coords;
});

// how to create a span-html element inspired from https://www.tutorialspoint.com/html-dom-span-object#:~:text=The%20HTML%20DOM%20span%20object,and%20getElementById()%20method%20respectively.
function createDot() {
  randomSize = Math.floor((Math.random() - 0.45) * 22); // random nr between -5 and 5
  console.log(randomSize);
  var dot = document.createElement("SPAN");
  dot.classList.add("dotStyle"); // adding the css formats
  document.body.appendChild(dot);
  dot.style.backgroundColor = backgroundColor;
  dot.style.left = xCoord - 20 + "px";
  dot.style.top = yCoord - 20 + "px";
  dot.style.height = 50 + randomSize + "px";
  dot.style.width = 50 + randomSize + "px";
}

document.body.addEventListener("click", function () {
  console.log("clicked");
  translateText();
  createDot();
  changeColor();
});

function translateText() {
  const textToTranslate =
    "there are as many Internet Architectures as there are Users";
  const apiKey = process.env.API_KEY;
  const languages = [
    "fr",
    "es",
    "de",
    "ja",
    "ko",
    "ru",
    "ar",
    "it",
    "nl",
    "pt",
    "sv",
    "pl",
    "fi",
    "tr",
    "hi",
    "he",
    "th",
    "vi",
    "id",
    "el",
  ];
  const randomLanguage =
    languages[Math.floor(Math.random() * languages.length)];
  //using Google Language API Documentation
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&source=en&target=${randomLanguage}&q=${encodeURIComponent(
    textToTranslate
  )}`;
  // making request
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const translatedText = data.data.translations[0].translatedText;
      document.getElementById("textToTranslate").textContent = translatedText; // updating the text on the website
    });
}