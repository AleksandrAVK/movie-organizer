import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {
    state = {
        searchArr: [],
        arrFromFavoriteList: [],
        textButton: 'Добавить в список'
    }

    changeStateSearchArr = (data) => {
        this.setState({ searchArr: data });

    }
    addFilmToList = (id) => {
        const isContainsInFavorites = this.state.arrFromFavoriteList.find((film) => { return film.imdbID === id });
        if (isContainsInFavorites) {
            return null
        }
        const myChoice = this.state.searchArr.find((film) => { return film.imdbID === id });
        const cloneArrFromFavoriteList = [...this.state.arrFromFavoriteList];

        cloneArrFromFavoriteList.push(myChoice);
        this.setState({ arrFromFavoriteList: cloneArrFromFavoriteList })
    }
    deleteFilm = (id) => {
        const deleteFilm = this.state.arrFromFavoriteList.filter((film) => { return film.imdbID !== id });
        this.setState({ arrFromFavoriteList: deleteFilm })
    }

    render() {
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox changeStateSearchArr={this.changeStateSearchArr} />
                        </div>
                        <div className="main-page__movies">
                            <Movies addFilmToList={this.addFilmToList} searchArr={this.state.searchArr} textButton={this.state.textButton} />
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites arrFromFavoriteList={this.state.arrFromFavoriteList} deleteFilm={this.deleteFilm} />
                    </aside>
                </main>
            </div>
        );
    }
}

export default MainPage;