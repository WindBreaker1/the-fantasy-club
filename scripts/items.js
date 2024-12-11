import player from './player.js'
import enemies from './enemy.js'

// the constructor class for every item
export class Item {
	constructor(name, rarity, description) {
		this.name = name;
		this.rarity = rarity;
		this.description = description;
	}
}

// the actual list of items
const Rock = new Item("Rock", "Common", "Oooga-booga.");
const Dagger = new Item("Dagger", "Common", "Pointy, stabby, killing device.")
const Shovel = new Item("Shovel", "Common", "A sturdy shovel.");

// items exported in a single object for better importing
const items = {
	Rock,
	Dagger,
	Shovel,
}

export default items;