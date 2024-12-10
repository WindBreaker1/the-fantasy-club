import items from './items.js'
import enemies from './enemy.js'
import { addDialogue } from '../game.js';

// inititalising player object
const player = {
	// important stuff
	Name: 'Nameless',
	Description: 'Buff dude.',
	HP: 100,
	MP: 100,
	AP: 10,
	Gold: 0,
	Location: 'Womb',
	// player statistics
	Strength: 1,
	Dexterity: 1,
	Constitution: 1,
	Luck: 1,
	Charisma: 1,
	// inventory
	inventory: {},
	// player game states
	isDead: false,
	hasAxe: false,
	hasPickaxe: false,
	hasWeapon: false,
	endingsUnlocked: {
		ending_one: false,
	},
	// functions
	takeDamage(damage) {
		this.HP -= damage;
		addDialogue("[Game]", `${this.Name} takes ${damage} damage...`)
	},
}

export default player;