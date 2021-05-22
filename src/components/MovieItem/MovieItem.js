import React, { Component } from 'react';
import './MovieItem.css';

class MovieItem extends Component {

    render() {
        const { Title,Year, Poster,imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button disabled={this.props.disabled} onClick={()=> {this.props.addFilmToList(imdbID)}} type="button"  className={`movie-item__add-button ${this.props.class}`}> Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;