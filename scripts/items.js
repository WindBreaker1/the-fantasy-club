import player from './player.js'
import enemies from './enemy.js'

// the constructor class for every item
class Item {
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}
}

// the actual list of items
const Rock = new Item("Rock", "Oooga-booga.");
const Dagger = new Item("Dagger", "Pointy, stabby, killing device.")
const Shovel = new Item("Shovel", "A sturdy shovel.");

// items exported in a single object for better importing
const items = {
	Rock,
	Dagger,
	Shovel,
}

export default items;