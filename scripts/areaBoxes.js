/**
 * @description This is code that facilitates cycling between the different menus and areas of the game.
*/

const areaBoxes = document.querySelectorAll('.area-box');

const buttonToBoxMap = {
	// menu
	inventory: 'inventory-box',
	resources: 'resources-box',
	stats: 'stats-box',
	codex: 'codex-box',
	save: 'save-box',
  settings: 'settings-box',
	credits: 'credits-box',
	// areas
  festeringWomb: 'festering-womb-box',
	goreForest: 'gore-forest-box',
};

function showAreaBox(boxID) {
  areaBoxes.forEach(box => box.classList.remove('active'));
  const boxToShow = document.getElementById(boxID);
  if (boxToShow) {
    boxToShow.classList.add('active');
  }
}

Object.keys(buttonToBoxMap).forEach(buttonId => {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', () => {
    const boxId = buttonToBoxMap[buttonId];
    showAreaBox(boxId);
  });
});

//intializing on game start
showAreaBox('gore-forest-box');