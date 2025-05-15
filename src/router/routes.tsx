import { RouteObject } from 'react-router-dom';
import ProfilPage from '../assets/ProfilPage';
import HomePage from '../assets/HomePage';
import Pokedex from '../assets/Pokedex';
import App from '../App';
import PokemonPage from '../assets/PokemonPage';
const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                index: true,
                element: <HomePage />,
            },
            {
                path: '/profile',
                element: <ProfilPage />,
            },
            {
                path: '/pokedex/:pokeGenId?',
                element: <Pokedex />,
            },
            {
                path: '/pokemon/:pokemonId',
                element: <PokemonPage />,
            },
        ],
    },
];

export default routes;