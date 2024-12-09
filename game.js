// inititalising player object
const player = {
  // important stuff
  Name: 'Uga-Buga',
  Description: 'Buff dude.',
  HP: 100,
  MP: 100,
  AP: 10,
  Gold: 0,
  Location: '',
  // player statistics
  Strength: 8,
  Dexterity: 10,
  Constitution: 0,
  Luck: 4,
  Charisma: 0,
  // player game states
  isDead: false,
  hasAxe: false,
  hasWeapon: false,
  endingsUnlocked: {
    ending_one: false,
  },
}

// menus

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
showAreaBox('gore-forest-box');



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

// targeting html container for areas
const areaContainer = document.querySelector(".areas");
const areaBox = document.querySelector(".area-box");

// gore forest
const GoreForest = {
  label: "Gore Forest",
  description: "A dead forest...",
}

const goreForestBox = document.querySelector("#gore-forest-box");
const cutWoodButton = document.querySelector("#cut-wood-button");
const exploreGoreForestButton = document.querySelector("#explore-gore-forest-button")

cutWoodButton.addEventListener("click", () => {
  if (player.hasAxe == false) {
    addDialogue("[Game]", "You don't have an axe...")
  } else {
    addDialogue("[Game]", "You cut some wood!");
  }
})

// intialize chatbox
const chatBox = document.querySelector(".chat-box");
// function for chatbox
function addDialogue(speaker, dialogue) {
  const dialogueDiv = document.createElement("div");
  dialogueDiv.textContent = `${speaker}: ${dialogue}`;
  chatBox.insertBefore(dialogueDiv, chatBox.firstChild);
}

// add chat input
const textInput = document.querySelector(".text-input");
// on Enter keypress, add the text to the dialogue box
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const inputValue = textInput.value;
    addDialogue(player.Name, inputValue);
    textInput.value = "";
  }
})

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
      { text: `Yes`, next: `gf_6`, effect: () => {playerTakesDamage(50)} },
      { text: `No`, next: `ending_one` }
    ]
  },
  gf_6: { speaker: `[Game]`, text: `An angelic voice calls out to you.`, next: null },
  ending_one: { 
    speaker: `[Game]`, 
    text: `You choose to stay in the dark and warm embrace of death...`,
    next: null,
    choices: [
      { text: `Reset Universe`, effect: () => location.reload() }
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



















// function for resetting the game
function resetGame() {
  location.reload();
}

// function for player damage
function playerTakesDamage(damage) {
  player.HP -= damage;
  addDialogue("[Game]", `${player.Name} takes ${damage} damage...`)
}











// ======================= Testing Area ========================= //

// initialising areas
const area = {
  Forest: {
    label: "🌲Forest",
    description: "Welcome to the Forest!",
  },
  Mountain: {
    label: "🏔️Mountain",
    description: "You are on a Mountain peak!",
  },
  Farm: {
    label: "🧑‍🌾Farm",
    description: "Welcome to the peaceful Farm!",
  },
}

/**
 * @description similar to for loop on line 19 
*/
for (const specificArea in area) {
  const areaButton = document.createElement("button");
  areaButton.textContent = `${area[specificArea].label}`;
  areaContainer.appendChild(areaButton);
  
  areaButton.addEventListener("click", () => {
    const areaData = area[specificArea];
    areaBox.style.display = "block";
    areaBox.textContent = areaData.description;
    player.Location = areaData.label;
    console.log(player.Location)
  })
}