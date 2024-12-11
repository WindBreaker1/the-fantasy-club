import { addDialogue } from '../game.js';

// inititalising player object
const player = {
	// important information
	info: {
		name: 'Nameless',
		description: 'Buff dude.',
		location: 'Womb',
	},
	// player statistics
	stats: {
		currentHP: 100,
		maxHP: 100,
		currentMP: 100,
		maxMP: 100,
		defense: 10,
		attack: 10,
		strength: 1,
		dexterity: 1,
		intelligence: 1,
		constitution: 1,
		luck: 1,
		charisma: 1,
	},
	// inventory
	inventory: {},
	// resources
	resources: {
		gold: 0,
		wood: 0,
	},
	// player game states
	gameState: {
		isDead: false,
		hasAxe: true,
		hasPickaxe: false,
		hasWeapon: false,
	},
	// functions
	takeDamage(amount) {
		this.stats.currentHP -= amount;
		addDialogue("[Game]", `${this.info.name} takes ${amount} damage...`)
	},
	heal(amount) {
		if (this.stats.currentHP < this.stats.maxHP) {
			let healAmount = Math.min(amount, this.stats.maxHP-this.stats.currentHP);
			this.stats.currentHP += healAmount;
			addDialogue("[Game]", `${this.info.name} heals ${amount} points!`)
		} else {
			addDialogue("[Game]", "You're fully healed!")
		}
	}
}

export default player;