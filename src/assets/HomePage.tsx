function HomePage() {
    return (
        <div>
            <h1>El Pokedexo</h1>
            <button id="ProfileButton">
                <a href="/profile">Go to Profile</a>
            </button>
            <button id="CatchButton">
                <a href="/catch">Catch Pokemon</a>
            </button>
            <button id="PokedexButton">
                <a href="/pokedex">Pokedex</a>
            </button>
        </div>
    );
}

export default HomePage;