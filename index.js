"use strict";

// Function to fetch additional details (image and type) for a single Pokémon
function fetchPokemonDetails(url, number) {
	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const pokemonDetails = {
				number,
				name: data.name,
				image: data.sprites.front_default,
				type: data.types[0].type.name,
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
						pokemonName.textContent = details.name;

						const pokemonType = document.createElement("p");
						pokemonType.textContent = `${details.type}`;

						// Add class name based on the Pokémon's type
						pokemonDiv.classList.add(details.type);

						pokemonDiv.appendChild(pokemonNumber);
						pokemonDiv.appendChild(pokemonImage);
						pokemonDiv.appendChild(pokemonName);
						pokemonDiv.appendChild(pokemonType);

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

// Initial call to fetch Pokémon data
fetchPokemons();
