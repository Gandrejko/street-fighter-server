import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
	search(search) {
		const fighter = fighterRepository.getOne(search);
		if (!fighter) {
			return null;
		}
		return fighter;
	}

	getAll() {
		const fighters = fighterRepository.getAll();
		if(!fighters) {
			return null
		}
		return fighters
	}

	create(data) {
		const newFighter = fighterRepository.create(data);
		if(!newFighter) {
			return null
		}
		return newFighter
	}

	update(id, data) {
		const updateFighter = fighterRepository.update(id, data);
		if(!updateFighter) {
			return null
		}
		return updateFighter
	}

	delete(id) {
		const deleteFighter = fighterRepository.delete(id);
		if(!deleteFighter) {
			return null
		}
		return deleteFighter
	}
}

const fighterService = new FighterService();

export { fighterService };
