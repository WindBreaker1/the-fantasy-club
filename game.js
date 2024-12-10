// ===================================== Imports ==================================== //
import player from './scripts/player.js'
import items from './scripts/items.js'
import enemies from './scripts/enemy.js'

// ================================= HTML DOM elements ================================ //
// intialize dialogue box
const dialogueBox = document.querySelector(".dialogue-box");
// intialize text input
const textInput = document.querySelector(".text-input");

// ======================================= Menus ====================================== //
const areaBoxes = document.querySelectorAll('.area-box');

const buttonToBoxMap = {
  inventory: 'inventory-box',
  stats: 'stats-box',
  codex: 'codex-box',
  credits: 'credits-box',
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
showAreaBox('inventory-box');



// targeting html container for player stats
const statsBox = document.querySelector("#stats-box");

/**
 * @description for each stat in player, create a new div
 * @returns {HTMLElement} statistic-name: statistic-value
 * @todo n/a
*/
for (const stat in player) {
  const statElement = document.createElement("div");
  statElement.textContent = `${stat}: ${player[stat]}`
  statsBox.appendChild(statElement);
}


// ==================================== Gore Forest =============================== //

// gore forest
const GoreForest = {
  label: "Gore Forest",
  description: "A dead forest...",
}

const cutWoodButton = document.querySelector("#cut-wood-button");
const exploreGoreForestButton = document.querySelector("#explore-gore-forest-button")

cutWoodButton.addEventListener("click", () => {
  if (player.hasAxe == false) {
    addDialogue("[Game]", "You don't have an axe...")
  } else {
    addDialogue("[Game]", "You cut some wood!");
  }
})




// on Enter keypress, add the text to the dialogue box
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const inputValue = textInput.value;
    addDialogue(player.Name, inputValue);
    textInput.value = "";
  }
})

// ================================== Story ===================================== //
// gore forest story
let currentScene = "gf_0";
const goreForestStory = {
  gf_0: { speaker: `[Game]`, text: `You wake up in a dark, dark place.`, next: "gf_1" },
  gf_1: { speaker: `[Game]`, text: `It's eerily silent...`, next: "gf_2" },
  gf_2: { speaker: `[Game]`, text: `It's moist...`, next: "gf_3" },
  gf_3: { speaker: `[Game]`, text: `It smells of flowers...`, next: "gf_4" },
  gf_4: { speaker: `[Game]`, text: `You see a faint light in the far distance...`, next: "gf_5" },
  gf_5: {
    speaker: `[Yourself]`,
    text: `Do you respond to the light?`,
    choices: [
      { text: `Yes`, next: `gf_6`, effect: () => {player.takeDamage(50); addItem(items.Shovel)} },
      { text: `No`, next: `ending_one` }
    ]
  },
  gf_6: { speaker: `[Game]`, text: `An angelic voice calls out to you.`, next: null },
  ending_one: { 
    speaker: `[Game]`, 
    text: `You choose to stay in the dark and warm embrace of death...`,
    next: null,
    choices: [
      { text: `Reset Universe`, effect: () => resetGame() }
    ]
  },
};

const choicesDiv = document.querySelector(".choices");

exploreGoreForestButton.addEventListener("click", () => {
   if (currentScene) {
    displayScene(currentScene);
  }
})




function displayScene(sceneKey) {
  const scene = goreForestStory[sceneKey];

  if (scene.text) {
    addDialogue(scene.speaker, scene.text);
  }

  choicesDiv.innerHTML = "";

  if (scene.choices) {
    // Display choices
    scene.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice.text;

      // Add event listener for the choice
      button.addEventListener("click", () => {
        if (choice.effect) {
          choice.effect();
        }
        currentScene = choice.next;
        displayScene(currentScene);
      });

      choicesDiv.appendChild(button);
    });
    exploreGoreForestButton.disabled = true; // Hide explore button while making a choice
  } else {
    exploreGoreForestButton.disabled = false; // Show explore button if no choices
    currentScene = scene.next; // Update the next scene
    if (!scene.next) {
      exploreGoreForestButton.disabled = true; // Disable explore if there are no more scenes
    }
  }
}

displayScene(currentScene);

















// ================================ Important Functions =============================== //

// function for adding dialogue text to the dialogue box
export function addDialogue(speaker, dialogue) {
  const dialogueDiv = document.createElement("div");
  dialogueDiv.textContent = `${speaker}: ${dialogue}`;
  dialogueBox.insertBefore(dialogueDiv, dialogueBox.firstChild);
}

// function for resetting the game
function resetGame() {
  location.reload();
}












// =================================== Testing Area ====================================== //

// put the player's chosen name inside the menu
const playerNameText = document.querySelector("#player-name");
playerNameText.textContent = player.Name;





// targeting html container for player stats
const inventoryTable = document.querySelector("#inventory-table");

/**
 * @description for each item in the player's inventory, create a new td
 * @returns {HTMLElement} item-name | item-description
 * @todo n/a
*/
function refreshItemTable() {
  for (const item in player.inventory) {
    const row = document.createElement("tr");
    
    const nameCell = document.createElement("td");
    nameCell.textContent = player.inventory[item].name;
    
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = player.inventory[item].description;
  
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
  
    inventoryTable.appendChild(row);
  }
}

addItem(items.Rock);
addItem(items.Dagger);
addItem(items.Shovel);

refreshItemTable();



// function for adding items to the inventory
function addItem(item) {
  if (player.inventory[item.name]) {
    addDialogue("[Game]", `${item.name} is already in inventory.`)
  } else {
    player.inventory[item.name] = {name: item.name, description: item.description};
    addDialogue("[Game]", `${item.name} has been added to the inventory.`)
  }
}




