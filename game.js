// ===================================== Imports ==================================== //
import player from './scripts/player.js';
import items, { Item } from './scripts/items.js';
import { stories, currentStory, currentScene } from './scripts/story.js';
import enemies from './scripts/enemy.js';
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
const resetGameButton = document.querySelector("#reset-button");
// gore forest
const cutWoodButton = document.querySelector("#cut-wood-button");
const exploreGoreForestButton = document.querySelector("#explore-gore-forest-button");

// ========================================== Sounds ======================================== //

const clickSound = new Audio("./public/click.mp3");
const cutWoodSound = new Audio("./public/log-split.mp3");

clickSound.volume = 0.5;
cutWoodSound.volume = 0.5;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Prevent overlapping sounds
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

// ================================== Important Functions =================================== //

/**
 * @description function for adding dialogue text to the dialogue box
*/
export function addDialogue(speaker, dialogue) {
  const dialogueDiv = document.createElement("div");
  dialogueDiv.innerHTML = `[${speaker}]: ${dialogue}`;
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
 * @description function for adding stats to player
*/
export function addStats(stat, amount) {
  if (player.stats[stat]) {
    player.stats[stat] += amount;
    refreshPlayerStatsText;
    return true;
  }
  return false;
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


// put all functions in a single object
export const game = {
  addDialogue,
  refreshPlayerStatsText,
  refreshResourcesText,
  spendResource,
  addStats,
  addItem,
  refreshItemTable,
}

// ================================= Secondary Functions ================================== //

// on Enter keypress, add the input text to the dialogue box
// textInput.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     const inputValue = textInput.value;
//     addDialogue(`${player.info.name}`, inputValue);
//     textInput.value = "";
//   }
// })

/**
 * @description function for incrementing wood by 1
*/
cutWoodButton.addEventListener("click", () => {
  if (player.hasAxe == false) {
    addDialogue("Game", "You don't have an axe...")
  } else {
    player.resources.wood += 1;
    cutWoodSound.play();
    addDialogue("Game", "You cut some wood!");
    refreshResourcesText();
    updateChoices();
  }
})



// ========================================================================================= //
// ======================================= STORY LOGIC ===================================== //
// ========================================================================================= //

currentStory;
currentScene;

const mainQuestButton = document.querySelector("#main-quest");
const choicesDiv = document.querySelector(".choices");


mainQuestButton.addEventListener("click", () => {
  if (!currentStory || !currentScene) {
    startStory('main', 'mq_0'); // Start from the beginning if no current state
  } else {
    displayScene(currentScene); // Continue from the current state
  }
});

// Utility function to retrieve nested scenes
function getNestedScene(story, sceneKey) {
  for (const act of Object.values(story)) {
    if (act[sceneKey]) {
      return act[sceneKey];
    }
  }
  return null; // Scene not found
}

function displayScene(sceneKey) {
  const story = stories[currentStory];
  const scene = getNestedScene(story, sceneKey);

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
    mainQuestButton.disabled = true; // Hide explore button while making a choice
  } else {
    mainQuestButton.disabled = false; // Show explore button if no choices
    currentScene = scene.next; // Update the next scene
    if (!scene.next) {
      mainQuestButton.disabled = true; // Disable explore if there are no more scenes
    }
  }
}

// function for updating choices
function updateChoices() {
  const story = stories[currentStory];
  const scene = story[sceneKey];

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

// function for starting the story
function startStory(storyKey, sceneKey = null) {
  if (!stories[storyKey]) {
    console.error(`Story ${storyKey} not found`);
    return;
  }

  currentStory = storyKey;
  currentScene = sceneKey || Object.keys(stories[storyKey])[0]; // Default to the first scene
  displayScene(currentScene);
}



// ========================================================================================= //
// ======================================= SAVING LOGIC ==================================== //
// ========================================================================================= //

// ==================================== Saving Progress ==================================== //
function saveGame() {
  const gameState = {
    version: 0.1,

    currentScene,
    player,
    settings,
  }

  const jsonString = JSON.stringify(gameState);
  localStorage.setItem("gameSave", jsonString);
  addDialogue("Game", "You saved your progress!");
}

saveGameButton.addEventListener("click", () => saveGame());

// ==================================== Loading Progress ==================================== //
function loadGameFromStorage() {
  try {
    const savedData = localStorage.getItem("gameSave");

    if (!savedData) {
      addDialogue("Game", "No saved game found.");
      console.error("No saved game found in localStorage.");
      return;
    }

    const gameState = JSON.parse(savedData);

    // Restore the game state
    currentScene = gameState.currentScene;
    Object.assign(player, gameState.player); // Ensure we retain references to the player object
    Object.assign(settings, gameState.settings);

    // Refresh UI elements
    refreshPlayerStatsText();
    refreshResourcesText();
    refreshItemTable();

    // Load the scene
    displayScene(currentScene);
    console.log("Game loaded successfully!");
    addDialogue("Game", "Your progress has been loaded!");
  } catch (error) {
    console.error("Failed to load game. Corrupted save data.", error);
    addDialogue("Game", "Failed to load progress. Save data is corrupted.");
  }
}

// Automatically load the game when the page reloads
function reloadGame() {
  window.addEventListener("load", () => {
    const savedData = localStorage.getItem("gameSave");
    if (savedData) {
      loadGameFromStorage();
    }
  });
}

reloadGame();

// ==================================== Resetting Progress ==================================== //
function resetGame() {
  localStorage.removeItem("gameSave");

  currentScene = "gf_0";

  // refresh text areas
  refreshPlayerStatsText();
  refreshResourcesText();
  refreshItemTable();

  addDialogue("Game", "Your progress has been reset.");
}

resetGameButton.addEventListener("click", () => resetGame());






















// easter eggs
console.log('I should add this in the game ☠️ \n https://youtu.be/s4LrhEer6aw?si=RDyJqKtiD6sozy9F')