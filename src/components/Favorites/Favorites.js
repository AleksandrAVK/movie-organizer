import React, { Component } from 'react';
import './Favorites.css';


class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
            { imdbID: 'tt0068646', Title: 'The Godfather', Year: 1972 }
        ],
        listNameFromInput: '',
        disabled: false
    }

    getIdSearchFilm = () => {
        const { arrFromFavoriteList } = this.props;
        const idFilm = arrFromFavoriteList.map((idFilm) => { return idFilm.imdbID });
        // console.log(idFilm);
        return idFilm
    };


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
        window.open(`/list/${data.id}`)
    }

    changeInputName = (event) => {
        setTimeout(this.setState({ listNameFromInput: event.target.value }),
            1500);
    }

    blockSaveButton = () => {
        alert("Ваш список сформирован");
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
                            <button className={this.state.disabled ? "favorites__delete-buton-disabled" : "favorites__delete-buton"} disabled={this.state.disabled} onClick={() => { this.props.deleteFilm(item.imdbID)}}>Удалить</button>
                        </div>;
                    })}
                </ul>
                { this.state.disabled ?
                    <button onClick={this.getListFilms} type="button" className="favorites__save">Перейти к списку</button>
                    :
                    <button onClick={this.blockSaveButton} type="button" className="favorites__save">Сохранить список</button>
                    
                }
            </div>
        );
    }
}


// ссылка 

export default Favorites;
// onClick={}