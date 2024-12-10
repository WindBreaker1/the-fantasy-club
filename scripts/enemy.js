import player from './player.js'
import items from './items.js'

// the constructor class for every enemy

class Enemy {
	constructor(name, description, hp, ap, dmg) {
		this.name = name;
		this.description = description;
		this.hp = hp;
		this.ap = ap;
		this.dmg = dmg;
	}
}

// the actual list of enemies
const Rat = new Enemy("Rat", "Small, mangy rat.", 10, 0, 2);

const enemies = {
	Rat,
}

export default enemies;