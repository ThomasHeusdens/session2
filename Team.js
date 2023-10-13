class Team {
	constructor() {
		this.teamname = "Fatality";
		this.trainer = "Coach Thomas";
		this.roster = [];
	}

	describe() {
		return `
            <h2>Team Description</h2>
            <p>Team Name: ${this.teamname}</p>
            <p>Trainer: ${this.trainer}</p>
            <p>${this.roster.length}/6 Pokémon in the roster</p>
        `;
	}

	addPokemon(pokemon) {
		if (this.roster.length >= 6) {
			return "The roster is full!";
		}

		if (this.roster.some((existingPokemon) => existingPokemon.name === pokemon.name)) {
			return `This Pokémon (${pokemon.name}) is already part of your roster`;
		}

		this.roster.push(pokemon);
		return `The Pokémon ${pokemon.name} has been successfully added to the team!`;
	}
}

export default Team;
