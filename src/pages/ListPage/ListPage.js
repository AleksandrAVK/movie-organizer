import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [
            { Title: 'The Godfather', Year: 1972, imdbID: 'tt0068646' }
        ],
        title: '',
        moviesID: []
    }

    componentDidMount() {
        const idParams = this.props.match.params;
        console.log(idParams);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID

        let getNewList = async () => {
            const res = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${idParams.id}`);
            const data = await res.json();
            // console.log(data);
            this.setState({ title: data.title, moviesID: data.movies });
            // console.log(this.state.moviesID);
            return data;
        }
        // console.log(getNewList);

        const selectedMoviesList = getNewList()
            .then((data) => {
                // console.log(data);
                let selectedMovie = data.movies.map((idFilm) => {
                    // console.log(idFilm);
                    let NewList = async () => {
                        // console.log(idFilm);
                        const res = await fetch(`http://www.omdbapi.com/?i=${idFilm}&apikey=dbf0b196`);
                        // console.log(res);
                        const data = await res.json();
                        // console.log(data);
                        return data;
                    }
                    return NewList(idFilm);
                })
                Promise.all(selectedMovie).then((filmList) => {
                    this.setState({ movies: filmList })
                })
            });
    }

    backHome = () => {

        window.open("/")

    }
    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <>
                                <div className="list-page__newList">
                                    <a className="list-page__newList" href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">
                                        <img className="list-page__img-for-newList" src={item.Poster} alt={item.Title}></img>
                                        <li className="list-page__img-for-newList_title" key={item.imdbID}>{item.Title} ({item.Year})</li>
                                    </a>
                                    <div>Description :<br />{item.Plot}</div>
                                </div>
                            </>
                        );
                    })}
                    <button type="button" onClick={this.backHome}>Назад </button>

                </ul>
            </div>
        );
    }
}

export default ListPage;