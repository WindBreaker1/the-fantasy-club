import { game } from '../game.js'

export let currentStory = 'main'
export let currentScene = "mq_0";

const festeringWombStory = {
  mq_0: { speaker: `Narrator`, text: `You wake up in a dark, dark place...`, next: `mq_1` },
  mq_1: { speaker: `Yourself`, text: `Do you remember your name?`, next: `mq_2` },
  mq_2: { speaker: `Yourself`, text: `Do you remember your face?`, next: `mq_3` },
  mq_3: { speaker: `Yourself`, text: `Then you're a newborn. A simple mass of flesh, and blood, and bone. A human-shaped hole in the universe.`, next: `mq_4` },
  mq_4: { speaker: `Yourself`, text: `Do you think you will achieve great things?`, next: `mq_5` },
  mq_5: { speaker: `Yourself`, text: `Do you think those achievements will matter?`, next: `mq_6` },
};

export const stories = {
  main: {
    act_1: {
      festeringWombStory,
    },
    //act_2,
    //act_3,
  },
  side: {
    //quest_1,
    //quest_2,
    //quest_3
  }
};


// template
const storyTemplate = {
  // basic dialogue
  mq_t: { speaker: ``, text: ``, next: `mq_t` },
  // complex dialogue with choices
  mq_t: {
    speaker: ``,
    text: ``,
    choices: [
      { text: ``,
        next: `mq_t`,
        requirement: ``,
        effect: ``,
      },
      { text: ``,
        next: `mq_t`,
        requirement: ``,
        effect: ``,
      },
    ]
  },
};


















// ======================================= Gore Forest ===================================== //
// const goreForestStory = {
//   gf_0: { speaker: `Game`, text: `You wake up in a dark, dark place.`, next: `gf_1` },
//   gf_1: { speaker: `Game`, text: `It's <span class='red-text'>eerily</span> silent...`, next: `gf_2` },
//   gf_2: { speaker: `Game`, text: `It's moist...`, next: `gf_3` },
//   gf_3: { speaker: `Game`, text: `It smells of flowers...`, next: `gf_4` },
//   gf_4: { speaker: `Game`, text: `You see a faint light in the far distance...`, next: `gf_5` },
//   gf_5: {
//     speaker: `Yourself`,
//     text: `Do you respond to the light? (You need 5 Wood...)`,
//     choices: [
//       { text: `Yes`,
//         next: `gf_6`,
//         requirement: () => player.resources.wood >= 5,
//         effect: () => {player.takeDamage(50); addItem(items.Shovel); spendResource('wood', 5);} 
//       },
//       { text: `No`, next: `ending_one` }
//     ]
//   },
//   gf_6: { speaker: `Game`, text: `An angelic voice calls out to you.`, next: `gf_7` },
//   ending_one: { 
//     speaker: `Game`, 
//     text: `You choose to stay in the dark and warm embrace of death...`,
//     next: null,
//     choices: [
//       { text: `Reset Universe`, effect: () => resetGame() }
//     ]
//   },
//   gf_7: { speaker: `Game`, text: `She had pure white, long hair, and angular face features. Her eyes were a pale blue, almost as pale as her smooth skin.`, next: `gf_8` },
//   gf_8: { speaker: `Erina`, text: `Break from your cocoon, ${player.info.name}.`, next: `gf_9` },
//   gf_9: { speaker: `Erina`, text: `Break free from this prison womb, ${player.info.name}...`, next: `gf_10` },
//   gf_10: { speaker: `${player.info.name}`, text: `You struggle and you struggle...`, next: `gf_11` },
//   gf_11: { speaker: `${player.info.name}`, text: `...Until finally you breathe fresh air.`, next: `gf_12` },
//   gf_12: { speaker: `Game`, text: `The rotting corpse from which you spawned out of burst at the seams at your birth.`, next: `gf_13` },
//   gf_13: { speaker: `Erina`, text: `Alright, next up, we're going to Drake Valley!`, next: `dv_0` },

//   // template
//   gf_t: { speaker: `Game`, text: ``, next: `gf_t` },
// };