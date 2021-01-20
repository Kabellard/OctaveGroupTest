import React, {Component} from "react";
import SpotifyApi from '../Api/SpotifyApi';
import {withRouter} from 'react-router-dom';
import ArtistCardOrganizer from '../Components/ArtistCards/ArtistCardOrganizer.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerms: '',
            foundArtist: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const searchTerms = this.props.match.params.searchTerms;

        if (searchTerms === undefined) {
            return 1;
        } else {
            const token = sessionStorage.getItem("token");
            SpotifyApi.getSearchArtist(searchTerms, token)
                .then((r) => {
                    this.setState({foundArtist: r.artists.items});
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        alert("Session expired, please log in again");
                        this.props.history.push('/');
                    }
                });

        }

    }

    handleSubmit(event) {
        const {history} = this.props;
        const searchTerms = this.state.searchTerms;
        history.push(`/artistSearch/${searchTerms}`);

    }

    handleChange(event) {
        this.setState({
            searchTerms: event.target.value,
        });
    }

    render() {
        let searchResults = (this.state.foundArtist.length > 0) ?
            <ArtistCardOrganizer searchResults={this.state.foundArtist}/> :
            '';

        return (
            <div className="container">
                <div className="container is-vcentered"
                     style={{
                         marginTop: "7.5vh",
                         marginLeft: "12.5vw",
                         marginRight: "12.5vw"
                     }}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="control has-icons-right">
                            <input
                                className="input is-success is-large"
                                type="text"
                                placeholder="Search for an Artist"
                                value={this.state.searchTerms}
                                onChange={this.handleChange}
                            />
                            <span className="icon is-large is-right">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </form>
                </div>
                <div className="container is-centered"
                    style={{
                        marginTop: "5vh"
                    }}
                >
                    {searchResults}
                </div>
            </div>
        );
    }
}

export default withRouter(SearchPage);