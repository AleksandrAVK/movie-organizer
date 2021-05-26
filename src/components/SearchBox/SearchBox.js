import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
    }



    getData = async () => {
        const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(this.state.searchLine)}&apikey=dbf0b196`);
        const data = await res.json();
        if(data.Response === "True" ){
            console.log(data);
            return this.props.changeStateSearchArr(data.Search)
        } else {
            alert("Movie not found");
        }
        
    }


    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={this.getData}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;