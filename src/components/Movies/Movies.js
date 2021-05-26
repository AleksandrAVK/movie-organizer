import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    state = {
        movies: [
            {
                imdbID: 'tt3896198',
                Title: "Guardians of the Galaxy Vol. 2",
                Year: 2017,
                Poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

            },
            {
                imdbID: 'tt0068646',
                Title: "The Godfather",
                Year: 1972,
                Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

            }
        ]
    }


    render() {
        // console.log(this.props.searchArr.length);
        return (
            <ul className="movies">
                { 
                (this.props.searchArr.length > 0) &&
                   this.props.searchArr.map((movie) => (
                        <li className="movies__item" key={movie.imdbID}>
                            <MovieItem {...movie} disabled ={false} addFilmToList={this.props.addFilmToList} textButton={this.props.textButton} />
                        </li>
                    ))
                }
                {  !(this.props.searchArr.length > 0 ) &&
                    this.state.movies.map((movie) => (
                        <li className="movies__item" key={movie.imdbID}>
                            <MovieItem {...movie} disabled ={true} class={"movies__item_button-red"}/>
                        </li>
                    ))}


            </ul>
        );
    }
}

export default Movies;