import { useState } from "react";
import { ITrainer } from "../type/Trainer";
import axios from "axios";
import { IPokemon } from "../type/Pokemon";
let Trainers: ITrainer[] = [
    {
        name: "Ash",
        picture: "https://i.kinja-img.com/image/upload/7bca6663c23a82b79c367ba087304233.jpg",
        age: 10,
        Pokedollars: 1000,
    },
    {
        name: "Misty",
        picture: "https://example.com/misty.png",
        age: 12,
        Pokedollars: 2000,
    },
    {
        name: "Brock",
        picture: "https://example.com/brock.png",
        age: 15,
        Pokedollars: 3000,
    },
    {
        name: "Gary",
        picture: "https://example.com/gary.png",
        age: 16,
        Pokedollars: 4000,
        catchedPokemons: [],
    }
]

function ProfilPage() {
    function definePokemonGender(male: number, Female: number) {
        let randomNumber = Math.floor(Math.random())
        if (randomNumber < male / 100) {
            return "Male";
        }
        else {
            return "Female"
        }
    }

    function definePokemonHp(level: number = 1) {
        let baseHp = 50; // Base HP for the Pokemon
        let iv = Math.floor(Math.random() * 32); // IV between 0 and 31
        let ev = Math.floor(Math.random() * 256); // EV between 0 and 255
        return Math.floor((2 * baseHp + iv + (ev / 4)) * level / 100) + level + 10;
    }

    function definePokemonIsShiny() {
        let randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber < 10) { // 10% chance to be shiny
            return true;
        }
        else {
            return false;
        }
    }

    function getPokemonApiDataById(id: string) {
        let result = {} as IPokemon;
        axios.get('https://tyradex.vercel.app/api/v1/pokemon/' + id)
            .then((response) => {
                let tempoResponse = response.data;
                console.log(tempoResponse);
                let pokemonData: IPokemon = {
                    name: tempoResponse.name,
                    gender: tempoResponse.sexe ? definePokemonGender(tempoResponse.sexe.male, tempoResponse.sexe.femelle) : "Unknown",
                    type: tempoResponse.types.name,
                    natures: tempoResponse.talents,
                    shiny: definePokemonIsShiny(),
                    IV: [
                        tempoResponse.stats.hp,
                        tempoResponse.stats.atk,
                        tempoResponse.stats.def,
                        tempoResponse.stats.spd,
                        tempoResponse.stats.spe_atk,
                        tempoResponse.stats.spe_def,
                    ],
                    EV: {
                        HP: Math.floor(Math.random() * 256),
                        Attack: Math.floor(Math.random() * 256),
                        Defense: Math.floor(Math.random() * 256),
                        Speed: Math.floor(Math.random() * 256),
                        SpecialAttack: Math.floor(Math.random() * 256),
                        SpecialDefense: Math.floor(Math.random() * 256)
                    },
                }
                result = pokemonData;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                throw error;
            },
            );
        return result;
    }

    const [currentTrainer, setCurrentTrainer] = useState<ITrainer | null>(null);
    function getTrainerByName(name: string) {
        console.log(Trainers.find((trainer) => trainer.name === name))
        return Trainers.find((trainer) => trainer.name === name);
    }
    function updateCurrentTrainer(trainer: ITrainer | undefined) {
        if (!trainer) {
            console.error("Trainer not found");
            return;
        }
        setCurrentTrainer(trainer);
    }
    return (
        <div>
            <h1>Choose a Trainer's profile </h1>
            <h2>Trainers:</h2>
            <ul id="TrainerList">
                {Trainers.map((trainer, index) => (
                    <button id="TrainerButton"
                        key={index}
                        onClick={() => updateCurrentTrainer(getTrainerByName(trainer.name))}
                    >
                        <img id="TrainerImage" src={trainer.picture} alt={trainer.name} width={50} height={50} />
                    </button>
                ))}

            </ul>

            {currentTrainer ? (
                <div>
                    <p>Catched pokemon's of : {currentTrainer.name}</p>
                    <ul>
                        {currentTrainer.catchedPokemons && currentTrainer.catchedPokemons.map((pokemon, index) => (
                            <li key={index}>{pokemon.name}</li>
                        ))}
                    </ul>
                </div>
            ) :
                (
                    <p>No trainer found</p>
                )
            }
            <button id="CatchButton" onClick={() => {
                let pokemonId = Math.floor(Math.random() * 700); // Random Pokemon ID
                let pokemonData: IPokemon = getPokemonApiDataById(pokemonId.toString());
                if (currentTrainer) {
                    currentTrainer.catchedPokemons?.push();
                    console.log("Pokemon caught:", pokemonData);
                }
            }
            }
            ></button>
        </div >

    );

}

export default ProfilPage;