// ===================================== Imports ==================================== //
import player from './scripts/player.js'
import items, { Item } from './scripts/items.js'
import enemies from './scripts/enemy.js'
import { settings } from './scripts/settings.js';

// ================================= HTML DOM elements ================================ //
// intialize dialogue box
const dialogueBox = document.querySelector(".dialogue-box");
// intialize text input
const textInput = document.querySelector(".text-input");
// intialize wood amount text
const woodAmountText = document.querySelector("#wood-amount-text");
// save, load, and reset buttons
const saveGameButton = document.querySelector("#save-button");
const loadGameButton = document.querySelector("#load-button");
const resetGameButton = document.querySelector("#reset-button");


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
    player.resources.wood += 1;
    addDialogue("[Game]", "You cut some wood!");
    woodAmountText.textContent = player.resources.wood;
    updateChoices();
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
    text: `Do you respond to the light? (You need 5 Wood...)`,
    choices: [
      { text: `Yes`,
        next: `gf_6`,
        requirement: () => player.resources.wood >= 5,
        effect: () => {player.takeDamage(50); addItem(items.Shovel); spendResource('wood', 5);} 
      },
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

      const isRequirementMet = choice.requirement ? choice.requirement() : true;

      if (!isRequirementMet) {
        button.disabled = true; // Disable the button if the requirement is not met
        button.title = "Requirement not met"; // Optional: add a tooltip
      }

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
  //dialogueBox.insertBefore(dialogueDiv, dialogueBox.firstChild);
  dialogueBox.appendChild(dialogueDiv);
  dialogueBox.scrollTop = dialogueBox.scrollHeight;
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

    const rarityCell = document.createElement("td");
    rarityCell.textContent = player.inventory[item].rarity;
    
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = player.inventory[item].description;
  
    row.appendChild(nameCell);
    row.appendChild(rarityCell);
    row.appendChild(descriptionCell);
  
    inventoryTable.appendChild(row);
  }
}




refreshItemTable();



// function for adding items to the inventory
function addItem(item) {
  if (player.inventory[item.name]) {
    addDialogue("[Game]", `${item.name} is already in inventory.`)
  } else {
    player.inventory[item.name] = {name: item.name, rarity: item.rarity, description: item.description};
    addDialogue("[Game]", `${item.name} has been added to the inventory.`)
    refreshItemTable();
  }
}

// function for updating choices
function updateChoices() {
  const scene = goreForestStory[currentScene];

  if (scene.choices) {
    const buttons = choicesDiv.querySelectorAll("button");
    scene.choices.forEach((choice, index) => {
      const isRequirementMet = choice.requirement ? choice.requirement() : true;
      const button = buttons[index];
      button.disabled = !isRequirementMet;
      button.title = isRequirementMet ? "" : "Requirement not met"; // Optional tooltip
    });
  }
}

// function for spending resources
function spendResource(resource, amount) {
  if (player.resources[resource] >= amount) {
    player.resources[resource] -= amount;
    woodAmountText.textContent = player.resources.wood; // Update display dynamically
    return true;
  }
  return false; // Not enough resources
}







// =================================== Saving Progress =========================== //

// saving the game
function saveGame() {
  const gameState = {
    version: 0.1,

    currentScene,
    settings,
    player: {
      inventory: Object.values(player.inventory).map(item => ({
        name: item.name,
        rarity: item.rarity,
        description: item.description,
      })),
      resources: player.resources,
    },
  }

   // Serialize and encode the game state
  const jsonString = JSON.stringify(gameState);
  // Base64 encoding
  const saveCode = btoa(jsonString);
  // save in localStorage
  localStorage.setItem("gameSave", saveCode);
  // tell the player you saved their game
  addDialogue("[Game]", "You saved your progress!");

  console.log(`${saveCode}`);
  
  return saveCode;
}

saveGameButton.addEventListener("click", () => saveGame());

// loading the game
function loadGame(saveCode) {
  try {
    // Decode the Base64 save code
    const jsonString = atob(saveCode);
    const gameState = JSON.parse(jsonString);

    // Restore game state
    currentScene = gameState.currentScene;
    settings = gameState.settings;
    Object.assign(player.resources, gameState.player.resources);

    woodAmountText.textContent = player.resources.wood;

    // Load the scene
    displayScene(currentScene);
    console.log("Game loaded successfully!");
  } catch (error) {
    console.error("Failed to load game. Invalid save code.");
  }
}

function loadGameFromInput() {
  const saveCode = document.getElementById("saveCodeInput").value;
  
  if (saveCode) {
    loadGame(saveCode);
  } else {
    console.error("No save code provided.");
  }
}

document.querySelector("#load-button").addEventListener("click", loadGameFromInput);

// loading the game upon reload of the page
function reloadGame() {
  window.addEventListener("load", () => {
    const savedCode = localStorage.getItem("gameSave");
    if (savedCode) {
      loadGame(savedCode);
    }
  });
}


// eyJ2ZXJzaW9uIjowLjEsImN1cnJlbnRTY2VuZSI6ImdmXzEiLCJzZXR0aW5ncyI6WyJBcmlhbCJdLCJwbGF5ZXIiOnsiaW52ZW50b3J5IjpbXSwicmVzb3VyY2VzIjp7ImdvbGQiOjAsIndvb2QiOjB9fX0=



// resetting the game
function resetGame() {
  localStorage.removeItem("gameSave");

  currentScene = "gf_0";

  player.Name = 'Nameless';
  player.Description = 'Buff dude.';
  player.HP = 100;
  player.MP = 100;
  player.AP = 10;
  player.Location = 'Womb';
  player.Strength = 1;
  player.Dexterity = 1;
  player.Intelligence = 1;
  player.Constitution = 1;
  player.Luck = 1;
  player.Charisma = 1;
  player.inventory = {};
  player.resources = { gold: 0, wood: 0 };
  player.isDead = false;
  player.hasAxe = true;
  player.hasPickaxe = false;
  player.hasWeapon = false;
  player.endingsUnlocked = { ending_one: false };

  // Update UI elements (if necessary)
  woodAmountText.textContent = player.resources.wood;
  addDialogue("[Game]", "Your progress has been reset.");
  
  
  console.log("Game progress reset to the beginning.");
}

resetGameButton.addEventListener("click", () => {resetGame()});




















// easter eggs
console.log('I should add this in the game ☠️ \n https://youtu.be/s4LrhEer6aw?si=RDyJqKtiD6sozy9F')