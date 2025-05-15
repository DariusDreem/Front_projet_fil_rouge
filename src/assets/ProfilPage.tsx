import { use, useEffect, useState } from "react";
import { ITrainer } from "../type/Trainer";
import axios from "axios";
import { IPokemon } from "../type/Pokemon";
import { useAppDispatch } from "../hook/useAppDispatch";
import { useAppSelector } from "../hook/useAppSelector";


// let Trainers: ITrainer[] = [
//     {
//         name: "Ash",
//         picture: "https://i.kinja-img.com/image/upload/7bca6663c23a82b79c367ba087304233.jpg",
//         age: 10,
//         Pokedollars: 1000,
//     },
//     {
//         name: "Misty",
//         picture: "https://archives.bulbagarden.net/media/upload/9/90/Misty_Burnt_Bike.png",
//         age: 12,
//         Pokedollars: 2000,
//     },
//     {
//         name: "Brock",
//         picture: "https://i.chzbgr.com/full/8435283968/hF976F717/brock-with-rock-lees-eyes",
//         age: 15,
//         Pokedollars: 3000,
//     },
//     {
//         name: "Gary",
//         picture: "https://preview.redd.it/whats-your-favorite-meme-freeze-frame-involving-gary-v0-4vmxzjsqdw9d1.jpeg?width=858&format=pjpg&auto=webp&s=4e75e81bc264454328bc904c555a5c79bc8781f4",
//         age: 16,
//         Pokedollars: 4000,
//         catchedPokemons: [],
//     }
// ]

function ProfilPage() {
    const [currentTrainer, setCurrentTrainer] = useState<ITrainer | null>(null);

    const Trainers: ITrainer[] = useAppSelector((state) => state.trainer);

    const dispatch = useAppDispatch();

    const pokemonTeam = useAppSelector((state) => state.trainer?.find((trainer) => trainer.name === currentTrainer?.name)?.catchedPokemons || []);


    function definePokemonGender(male: number, Female: number) {
        let randomNumber = Math.floor(Math.random())
        if (randomNumber < male / 100) {
            return "Male";
        }
        else {
            return "Female"
        }
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

    async function getPokemonApiDataById(id: string) {
        let result = {} as IPokemon;
        try {
            const response = await axios.get('https://tyradex.vercel.app/api/v1/pokemon/' + id);
            console.log(response.data);
            result = await assignPokemonDataToIPokemon(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
        return result;
    }

    async function assignPokemonDataToIPokemon(data: any) {
        let pokemonData: IPokemon = {
            id: data.pokedex_id,
            name: data.name.fr,
            sprite: data.sprites.regular,
            category: data.category,
            gender: data.sexe ? definePokemonGender(data.sexe.male, data.sexe.femelle) : "Unknown",
            type: data.types.name,
            natures: data.talents,
            shiny: definePokemonIsShiny(),
            IV: [
                data.stats.hp,
                data.stats.atk,
                data.stats.def,
                data.stats.spd,
                data.stats.spe_atk,
                data.stats.spe_def,
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
        return pokemonData;
    }

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

    useEffect(() => {
        console.log("Current Trainer:", currentTrainer);
    }, [currentTrainer]);

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
            <button id="CatchButton" onClick={async () => {
                let pokemonId = Math.floor(Math.random() * 1025); // Random Pokemon ID
                const pokemonData = await getPokemonApiDataById(pokemonId.toString());

                if (pokemonTeam && pokemonData) {
                    const updatedPokemonTeam = [...pokemonTeam, pokemonData];
                    setCurrentTrainer((currentTrainer) => currentTrainer ? {
                        ...currentTrainer,
                        catchedPokemons: updatedPokemonTeam
                    } : null);
                    dispatch({
                        type: "trainer/addCatchedPokemon",
                        payload: { pokemon: pokemonData, trainerId: currentTrainer ? Trainers.indexOf(currentTrainer) : -1 }
                    });

                }
            }}
            >
                Catch Pokemon
            </button>
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

        </div >

    );

}

export default ProfilPage;