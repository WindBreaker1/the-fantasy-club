// ===================================== Imports ==================================== //
import player from './scripts/player.js'
import items, { Item } from './scripts/items.js'
import enemies from './scripts/enemy.js'
import { settings } from './scripts/settings.js';

// ================================= HTML DOM elements ================================ //
// intialize all the different boxes
const dialogueBox = document.querySelector(".dialogue-box");
// stat-box-text
const playerNameText = document.querySelector(".player-name-text");
const playerNameTextTwo = document.querySelector(".player-name-text-two");
const hpAmountText = document.querySelector(".hp-amount-text");
const mpAmountText = document.querySelector(".mp-amount-text");
const defenseAmountText = document.querySelector(".defense-amount-text");
const attackAmountText = document.querySelector(".attack-amount-text");
// targeting html container for player stats
const inventoryTable = document.querySelector("#inventory-table");
// intialize text input
const textInput = document.querySelector(".text-input");
// resources texts
const goldAmountText = document.querySelector("#gold-amount-text");
const woodAmountText = document.querySelector("#wood-amount-text");
// save, load, and reset buttons
const saveGameButton = document.querySelector("#save-button");
const loadGameButton = document.querySelector("#load-button");
const resetGameButton = document.querySelector("#reset-button");
// gore forest
const cutWoodButton = document.querySelector("#cut-wood-button");
const exploreGoreForestButton = document.querySelector("#explore-gore-forest-button");

// ================================== Important Functions =================================== //

/**
 * @description function for adding dialogue text to the dialogue box
*/
export function addDialogue(speaker, dialogue) {
  const dialogueDiv = document.createElement("div");
  dialogueDiv.textContent = `[${speaker}]: ${dialogue}`;
  //dialogueBox.insertBefore(dialogueDiv, dialogueBox.firstChild);
  dialogueBox.appendChild(dialogueDiv);
  dialogueBox.scrollTop = dialogueBox.scrollHeight;
}

/**
 * @description refresh the player stats texts
*/
export function refreshPlayerStatsText() {
  playerNameText.textContent = player.info.name;
  playerNameTextTwo.textContent = player.info.name;
  hpAmountText.textContent = player.stats.currentHP;
  mpAmountText.textContent = player.stats.currentMP;
  defenseAmountText.textContent = player.stats.defense;
  attackAmountText.textContent = player.stats.attack;
}
// refresh player stats upon page refresh
refreshPlayerStatsText();

/**
 * @description refresh the resources text
*/
export function refreshResourcesText() {
  woodAmountText.textContent = player.resources.wood;
}

/**
 * @description function for spending resources
*/
export function spendResource(resource, amount) {
  if (player.resources[resource] >= amount) {
    player.resources[resource] -= amount;
    refreshResourcesText();
    return true;
  }
  return false; // Not enough resources
}

/**
 * @description function for adding items to the inventory
*/
export function addItem(item) {
  if (player.inventory[item.name]) {
    addDialogue("Game", `${item.name} is already in inventory.`)
  } else {
    player.inventory[item.name] = {name: item.name, rarity: item.rarity, description: item.description};
    addDialogue("Game", `${item.name} has been added to the inventory.`)
    refreshItemTable();
  }
}

/**
 * @description for each item in the player's inventory, create a new td
*/
export function refreshItemTable() {
  for (const itemName in player.inventory) {
    const item = player.inventory[itemName];

    const row = document.createElement("tr");

    // Create and populate table cells
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    const rarityCell = document.createElement("td");
    rarityCell.textContent = item.rarity || "Common";

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = item.description;

    // Append the cells to the row
    row.appendChild(nameCell);
    row.appendChild(rarityCell);
    row.appendChild(descriptionCell);
    // Append the row to the table
    inventoryTable.appendChild(row);
  }
}
// intialize function upon reload
refreshItemTable();


// ================================= Secondary Functions ================================== //

// on Enter keypress, add the input text to the dialogue box
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const inputValue = textInput.value;
    addDialogue(`${player.info.name}`, inputValue);
    textInput.value = "";
  }
})

/**
 * @description function for incrementing wood by 1
*/
cutWoodButton.addEventListener("click", () => {
  if (player.hasAxe == false) {
    addDialogue("Game", "You don't have an axe...")
  } else {
    player.resources.wood += 1;
    addDialogue("Game", "You cut some wood!");
    refreshResourcesText();
    updateChoices();
  }
})



// ========================================================================================= //
// ======================================= STORY LOGIC ===================================== //
// ========================================================================================= //

let currentScene = "gf_0";

// ======================================= Gore Forest ===================================== //
const goreForestStory = {
  gf_0: { speaker: `Game`, text: `You wake up in a dark, dark place.`, next: "gf_1" },
  gf_1: { speaker: `Game`, text: `It's eerily silent...`, next: "gf_2" },
  gf_2: { speaker: `Game`, text: `It's moist...`, next: "gf_3" },
  gf_3: { speaker: `Game`, text: `It smells of flowers...`, next: "gf_4" },
  gf_4: { speaker: `Game`, text: `You see a faint light in the far distance...`, next: "gf_5" },
  gf_5: {
    speaker: `Yourself`,
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
  gf_6: { speaker: `Game`, text: `An angelic voice calls out to you.`, next: `gf_7` },
  ending_one: { 
    speaker: `Game`, 
    text: `You choose to stay in the dark and warm embrace of death...`,
    next: null,
    choices: [
      { text: `Reset Universe`, effect: () => resetGame() }
    ]
  },
  gf_7: { speaker: `Game`, text: `She had pale skin, pure white, long hair, and angular face features. Her eyes were a pale blue, almost as pale as her smooth skin.`, next: `gf_8` },
  gf_8: { speaker: `Erina`, text: `Break from your cocoon, ${player.info.name}.`, next: `gf_9` },
  gf_9: { speaker: `Erina`, text: `Break free from this prison womb, ${player.info.name}...`, next: `gf_10` },
  gf_10: { speaker: `${player.info.name}`, text: `You struggle and you struggle...`, next: `gf_11` },
  gf_11: { speaker: `${player.info.name}`, text: `...Until finally you breathe fresh air.`, next: `gf_12` },
  gf_12: { speaker: `Game`, text: `The rotting corpse from which you spawned out of burst at the seams at your birth.`, next: null },


  // template
  gf_t: { speaker: `Game`, text: ``, next: `gf_t` },
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






// ========================================================================================= //
// ======================================= SAVING LOGIC ==================================== //
// ========================================================================================= //

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
  addDialogue("Game", "You saved your progress!");

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

    refreshResourcesText();

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

loadGameButton.addEventListener("click", loadGameFromInput);

// loading the game upon reload of the page
function reloadGame() {
  window.addEventListener("load", () => {
    const savedCode = localStorage.getItem("gameSave");
    if (savedCode) {
      loadGame(savedCode);
    }
  });
}

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
  refreshResourcesText();
  addDialogue("Game", "Your progress has been reset.");
  
  
  console.log("Game progress reset to the beginning.");
}

resetGameButton.addEventListener("click", () => {resetGame()});






















// easter eggs
console.log('I should add this in the game ☠️ \n https://youtu.be/s4LrhEer6aw?si=RDyJqKtiD6sozy9F')