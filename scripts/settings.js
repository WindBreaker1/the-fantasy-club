// ================================== Settings Logic ================================== //

const fontSelector = document.querySelector("#font-selector");

let fontChoice = fontSelector.value;

export const settings = [
  fontChoice,
];

/**
 * @description code that changes the font
*/


fontSelector.addEventListener("change", () => {
  document.body.style.fontFamily = fontSelector.value;
})

document.body.style.fontFamily = fontSelector.value;