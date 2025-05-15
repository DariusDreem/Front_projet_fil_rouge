import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IPokemon } from "../type/Pokemon";

function PokemonPage() {
    const { pokemonId } = useParams();

    const [pokemon, setPokemon] = useState<IPokemon | null>(null);
    const [loading, setLoading] = useState(true);

    async function getPokemon() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            setPokemon(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getPokemon();
    }, [pokemonId]);

    return (
        <div>
            <h1>Pokemon Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : pokemon ? (
                <div className="pokemon-details">
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h3>Types:</h3>
                    <div className="types">
                        {pokemon.types.map((typeObj, idx) => (
                            <span key={idx} className="type">
                                {typeObj.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Pokemon not found</p>
            )}
        </div>
    );
}

export default PokemonPage;