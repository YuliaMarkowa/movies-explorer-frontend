import React, {useEffect, useState} from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import './MoviesCardList.css';

function MoviesCardList({isMovieAmount, getMoviesAmount, movies, isFetched}) {
    const [updatedMovies, setUpdatedMovies] = useState([]);
    const [triggerBtn, setTriggerBtn] = useState(0);

    function moreMovies() {
        setTriggerBtn(getMoviesAmount + triggerBtn);
    }

    useEffect(()=> {
        setUpdatedMovies([...movies.slice(0, isMovieAmount)])
    }, [isMovieAmount, movies])

    useEffect(()=> {
        setUpdatedMovies([...movies.slice(0, isMovieAmount + triggerBtn)]);
    }, [triggerBtn])

    return (
        <>
            <ul className="movies__list">
                {updatedMovies.length ? 
                    updatedMovies.map(movie => 
                        (
                            <li key={movie.id}>
                                <MoviesCard movie={movie} />
                            </li>
                        )
                    )
                    : isFetched && <li className="movies__list-empty">Ничего не найдено</li>
                }
            </ul>

            {!(updatedMovies.length === movies.length) && 
                (
                    <MoreButton moreMovies={moreMovies} />
                )
            }
        </>
    );
}

export default MoviesCardList;
