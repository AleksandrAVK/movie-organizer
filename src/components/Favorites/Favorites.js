import React, { Component } from 'react';
import './Favorites.css';
import { Link } from 'react-router-dom'


class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
            { imdbID: 'tt0068646', Title: 'The Godfather', Year: 1972 }
        ],
        listNameFromInput: '',
        disabled: false,
        linkFromServer: ''
    }

    getIdSearchFilm = () => {
        const { arrFromFavoriteList } = this.props;
        const idFilm = arrFromFavoriteList.map((idFilm) => { return idFilm.imdbID });
        // console.log(idFilm);
        return idFilm
    };


    linkFromServer = (data) => {
        this.setState({ linkFromServer: data })
    }


    getListFilms = async () => {
        const res = await
            fetch('https://acb-api.algoritmika.org/api/movies/list ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(
                    {
                        "title": this.state.listNameFromInput,
                        "movies": this.getIdSearchFilm()
                    }
                ),
            })
        const data = await res.json();
        this.linkFromServer(data.id);

    }

    changeInputName = (event) => {
        setTimeout(this.setState({ listNameFromInput: event.target.value }),
            1500);
    }

    blockSaveButton = () => {
        this.setState({ disabled: !this.state.disabled })
    }

    render() {

        return (
            <div className="favorites">
                <input onChange={this.changeInputName} value={this.state.listNameFromInput} disabled={this.state.disabled} placeholder="Новый список" className="favorites__name" />
                <ul className="favorites__list">
                    {this.props.arrFromFavoriteList.map((item) => {
                        return <div className="favorites__selected-movie">
                            <li key={item.imdbID}>{item.Title} ({item.Year}) </li>
                            <button className={this.state.disabled ? "favorites__delete-buton-disabled" : "favorites__delete-buton"} disabled={this.state.disabled} onClick={() => { this.props.deleteFilm(item.imdbID) }}>Удалить</button>
                        </div>;
                    })}
                </ul>
                {this.state.disabled ?
                    <Link className="favorites__save" to={`/list/${this.state.linkFromServer}`}>Перейти к списку</Link>
                    :
                    <button onClick={() => { this.getListFilms(); this.blockSaveButton() }} type="button" className="favorites__save">Сохранить список</button>

                }
            </div>
        );
    }
}


export default Favorites;
