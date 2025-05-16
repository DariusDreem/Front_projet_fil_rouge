import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    types: string[];
    images: any;
    category: string; // Added category property
}

function Pokedex() {
    const { pokeGenId } = useParams();

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [generations, setGenerations] = useState<{ generation: string; from: number; to: number }[]>([]);
    const [loading, setLoading] = useState(true);

    async function getPkmnGenerations(Generation: string) {
        try {
            Generation === "" ? Generation = "" : Generation = "/" + Generation;
            const response = await axios.get('https://tyradex.app/api/v1/gen' + Generation);
            if (Generation === "") {
                setGenerations(response.data); // ce sont bien des objets
            }
            else {
                const PkmnResult = response.data.map((item: any) => ({
                    id: item.pokedex_id,
                    name: item.name.fr,
                    category: item.category,
                    sprite: item.sprites.regular,
                    types: item.types.map((t: any) => t.image),
                    images: item.sprites,
                }));
                setPokemons(PkmnResult);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Charger la liste des générations une seule fois
        async function fetchGenerations() {
            try {
                const response = await axios.get('https://tyradex.app/api/v1/gen');
                setGenerations(response.data);
            } catch (error) {
                console.error("Error fetching generations:", error);
            }
        }
        fetchGenerations();
    }, []);

    useEffect(() => {
        // Charger les Pokémon quand une génération est choisie
        async function fetchPokemons() {
            if (!pokeGenId) return;

            setLoading(true);
            try {
                const response = await axios.get(`https://tyradex.app/api/v1/gen/${pokeGenId}`);
                const PkmnResult = response.data.map((item: any) => ({
                    id: item.pokedex_id,
                    name: item.name.fr,
                    category: item.category,
                    sprite: item.sprites.regular,
                    types: item.types.map((t: any) => t.image),
                    images: item.sprites,
                }));
                setPokemons(PkmnResult);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemons();
    }, [pokeGenId]);


    return (
        <div>
            <h1>Pokedex</h1>
            <h2>Choose a Pokemon Generation</h2>
            <h3>All Generations</h3>
            <ul id="GenerationsList">
                {generations.map((gen) => (
                    <button id="GenerationsButton" onClick={() => window.location.href = `/pokedex/${gen.generation}`}>Generation {gen.generation} ({gen.from}–{gen.to})</button>
                ))}
            </ul>
            {pokeGenId && loading ? (
                <p>Loading...</p>
            ) : pokeGenId ? (
                <div>
                    <h3>Generation: {pokeGenId}</h3>
                    <div className="pokemon-grid">
                        {pokemons.map((pokemon) => (
                            <div key={pokemon.id} className="pokemon-card">
                                <h4>{pokemon.name}</h4>
                                <h5>{pokemon.category}</h5>
                                <a href={`/pokemon/${pokemon.id}`}><img src={pokemon.sprite} alt={pokemon.name} /></a>
                                <div className="types">
                                    {pokemon.types.map((type, idx) => (
                                        <img key={idx} src={type} alt={`type-${idx}`} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h3></h3>
                </div>
            )}
        </div>
    );
}
export type { Pokemon };
export default Pokedex;
