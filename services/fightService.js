import { fightRepository } from "../repositories/fightRepository.js";

class FightsService {
	search(search) {
		const fight = fightRepository.getOne(search);
		if (!fight) {
			return null;
		}
		return fight;
	}

	getAll() {
		const fights = fightRepository.getAll();
		if(!fights) {
			return null
		}
		return fights
	}

	create(data) {
		const newFight = fightRepository.create(data);
		if(!newFight) {
			return null
		}
		return newFight
	}

	update(id, data) {
		const updateFight = fightRepository.update(id, data);
		if(!updateFight) {
			return null
		}
		return updateFight
	}

	delete(id) {
		const deleteFight = fightRepository.delete(id);
		if(!deleteFight) {
			return null
		}
		return deleteFight
	}
}

const fightsService = new FightsService();

export { fightsService };
