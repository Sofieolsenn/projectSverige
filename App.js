import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=8569a89a';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]); // Clear movies if no results found
        }
    };

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);
    
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className='search'>
                <input 
                    placeholder="Search for movies"
                    value={searchTerm} // Controlled input
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} // Trigger search on click
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    );
};

export default App;
