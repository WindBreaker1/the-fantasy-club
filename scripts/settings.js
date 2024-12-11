// ================================== Settings Logic ================================== //

const fontSelector = document.querySelector("#font-selector");


export const settings = {
  fontChoice: fontSelector.value,
};

/**
 * @description code that changes the font
*/


fontSelector.addEventListener("change", () => {
  document.body.style.fontFamily = fontSelector.value;
})

document.body.style.fontFamily = fontSelector.value;