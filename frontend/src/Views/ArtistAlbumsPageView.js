import React, {Component} from "react";
import SpotifyApi from '../Api/SpotifyApi';
import AlbumCard from '../Components/AlbumCards/AlbumCard';
import {withRouter} from 'react-router-dom';


class ArtistAlbumsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: []
        };
    }

    componentDidMount(){
        const artistId = this.props.match.params.artistId;

        const token = sessionStorage.getItem("token");

        SpotifyApi.getArtistAlbums(artistId, token)
            .then((r) => {
                console.log('r: ', JSON.stringify(r, null, 2));
                this.setState({albums: r.items});

            })
            .catch((error)=> {
                console.log(error);
                if (error.response.status === 401) {
                    alert("Session expired, please log in again");
                    this.props.history.push('/');
                }
            });
    }

    render() {
        // static strings
        const ALBUMS = 'Albums';

        const artistName = this.props.location.state.artistName;

        return(
            <div>
                <div className="container has-text-left"
                    style={{
                        paddingTop: "2.5vh",
                        paddingBottom: "2.5vh"
                }}>
                    <p className="title is-2 has-text-white"> {artistName} </p>
                    <p className="subtitle is-3 has-text-white"> {ALBUMS} </p>
                </div>

                <div className="container">
                    <div className="columns is-multiline is-mobile">
                        {this.state.albums.map((album, index) => (
                            <div className="column is-one-quarter-desktop is-half-mobile is-one-third-tablet is-fullwidth"
                                 style={{
                                     display:"grid"
                                 }}
                                 key={index}>
                                <AlbumCard
                                    albumInfo={album}
                                    key={index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ArtistAlbumsPage);