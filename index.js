"use strict";

import Team from "./Team.js";

const messageElement = document.getElementById("message");

// Example usage to add a Pokémon to the team
const myTeam = new Team();

function addPokemonToTeam(pokemon) {
	const result = myTeam.addPokemon(pokemon);

	if (result.startsWith("The Pokémon")) {
		// Success
		messageElement.textContent = result;
		messageElement.style.backgroundColor = "#88ff00";
		// Update the team description
	} else {
		// Error
		messageElement.textContent = result;
		messageElement.style.backgroundColor = "#ff0000";
	}
}

// Function to fetch additional details (image and types) for a single Pokémon
function fetchPokemonDetails(url, number) {
	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const pokemonDetails = {
				number,
				name: data.name,
				image: data.sprites.other["official-artwork"].front_default,
				types: data.types.map((type) => type.type.name),
			};
			return pokemonDetails;
		});
}

// Function to fetch and display Pokémon names, images, types, and numbers
function fetchPokemons() {
	const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";

	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			const pokemonList = document.getElementById("pokemon-list");
			const promises = [];

			data.results.forEach((pokemon, index) => {
				const pokemonUrl = pokemon.url;
				const number = index + 1; // Calculate Pokémon number

				promises.push(fetchPokemonDetails(pokemonUrl, number));
			});

			Promise.all(promises)
				.then((pokemonDetails) => {
					pokemonDetails.forEach((details) => {
						const pokemonDiv = document.createElement("div");
						pokemonDiv.classList.add("pokemon");

						const pokemonImage = document.createElement("img");
						pokemonImage.src = details.image;

						const pokemonNumber = document.createElement("h5");
						pokemonNumber.textContent = `#${details.number}`;

						const pokemonName = document.createElement("h1");
						pokemonName.textContent = capitalizeWords(details.name);

						const pokemonTypes = document.createElement("p");
						details.types.forEach((type) => {
							const typeElement = document.createElement("span");
							typeElement.textContent = capitalizeWords(type);
							typeElement.classList.add(type.toLowerCase());
							pokemonTypes.appendChild(typeElement);
						});

						pokemonDiv.appendChild(pokemonNumber);
						pokemonDiv.appendChild(pokemonImage);
						pokemonDiv.appendChild(pokemonName);
						pokemonDiv.appendChild(pokemonTypes);

						const addToTeamButton = document.createElement("button");
						addToTeamButton.textContent = "Add to Team";
						addToTeamButton.classList.add("add-to-team-button");

						// Append the button to the .pokemon div
						pokemonDiv.appendChild(addToTeamButton);

						addToTeamButton.addEventListener("click", () => {
							addPokemonToTeam(details);
						});

						// Append the .pokemon div to the list
						pokemonList.appendChild(pokemonDiv);
					});
				})
				.catch((error) => {
					console.error("Error fetching Pokémon details:", error);
				});
		})
		.catch((error) => {
			console.error("Error fetching Pokémon data:", error);
		});
}

function capitalizeWords(str) {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Initial call to fetch Pokémon data
fetchPokemons();
