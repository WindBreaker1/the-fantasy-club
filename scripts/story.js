import { game } from '../game.js'

export let currentStory = 'main'
export let currentScene = "gf_0";

export const story = {
  main: {
    act_1: {
      festeringWombStory,
    },
    act_2,
    act_3,
  },
  side: {
    quest_1,
    quest_2,
    quest_3
  }
};

const festeringWombStory = {
  mq_0: { speaker: `Narrator`, text: `You wake up in a dark, dark place...`, next: `mq_1` },
  mq_1: { speaker: `Yourself`, text: `Do you remember your name?`, next: `mq_2` },
  mq_2: { speaker: `Yourself`, text: `Do you remember your face?`, next: `mq_3` },
  mq_3: { speaker: `Yourself`, text: `Then you're a newborn. A simple mass of flesh, and blood, and bone. A human-shaped hole in the universe.`, next: `mq_4` },
  mq_4: { speaker: `Yourself`, text: `Do you think you will achieve great things?`, next: `mq_5` },
  mq_5: { speaker: `Yourself`, text: `Do you think those achievements will matter?`, next: `mq_6` },
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
