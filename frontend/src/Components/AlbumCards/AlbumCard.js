import React, {Component} from "react";

export default class AlbumCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            external_urls: props.external_urls,
            followers: ''
        };

    }

    render() {
        const imageUrl = (this.props.albumInfo.images.length > 0) ?
            this.props.albumInfo.images[0].url :
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
        const albumName = this.props.albumInfo.name;
        const artistNames = [];
        this.props.albumInfo.artists.forEach((artist) => {
            artistNames.push(artist.name);
        })
        const releaseDate = this.props.albumInfo.release_date;
        const numberOfTracks = this.props.albumInfo.total_tracks;
        const TRACK_STRING= (numberOfTracks > 1) ?
            'Tracks' :
            'Track' ;

        const previewLink = this.props.albumInfo.external_urls.spotify;

        return(
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img
                            src={imageUrl}
                            alt="Album"
                        />
                    </figure>
                </div>

                <div className="card-content has-text-left">
                    <p className="title is-4"> {albumName} </p>
                    {artistNames.map((name, index) => (
                        <p className="subtitle is-6" key={index}>
                            {name}
                        </p>
                    ))}
                    <br/>


                    <p className="subtitle is-6">
                        {releaseDate}
                    </p>
                    <p className="subtitle is-6">
                        {numberOfTracks} {TRACK_STRING}
                    </p>
                    <a href={previewLink}>Preview on Spotify</a>

                </div>
            </div>
        );
    }
}