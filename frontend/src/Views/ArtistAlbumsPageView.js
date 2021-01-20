import React, {Component} from "react";
import SpotifyApi from '../Api/SpotifyApi';
import _ from "lodash";
import AlbumCard from '../Components/AlbumCards/AlbumCard';


export default class ArtistAlbumsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            splitAlbums: []
        };
    }

    componentDidMount(){
        const artistId = this.props.match.params.artistId;

        const token = sessionStorage.getItem("token");

        SpotifyApi.getArtistAlbums(artistId, token)
            .then((r) => {
                console.log('r: ', JSON.stringify(r, null, 2));
                const groupedAlbums = _.chunk(r.items, 4);
                this.setState({splitAlbums: groupedAlbums});

            })
            .catch((error)=> {
                console.log(error);
            });
    }

    render() {
        // static strings
        const ALBUMS = 'Albums';

        const artistName = this.props.location.state.artistName;

        return(
            <div>
                <div className="container has-text-left">
                    <p className="title is-4"> {artistName} </p>
                    <p className="subtitle is-6"> {ALBUMS} </p>

                </div>

                <table className="table">
                    <tbody>
                    {this.state.splitAlbums.map((albumsGroup, index) => (
                        <tr key={index}>
                            {albumsGroup.map((album, index) => (
                                <td key={index} style={{width:"25%"}}>
                                    <AlbumCard
                                        albumInfo={album}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}