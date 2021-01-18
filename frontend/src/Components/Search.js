import React, {Component} from "react";
import SpotifyApi from '../Api/SpotifyApi';
import ArtistCardOrganizer from './ArtistCardOrganizer.js';

export default class SearchPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchTerms : '',
      foundArtist: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    SpotifyApi.getSearchArtist(this.state.searchTerms)
      .then((r) => {
        console.log('r: ', JSON.stringify(r, null, 2));
        this.setState({foundArtist: r.artists.items});
        console.log('hey', this.state.foundArtist);
        })
      .catch((error)=> {
        console.log(error);
      });

  }

  handleChange(event) {
      this.setState({
        searchTerms: event.target.value,
        foundArtist: []
      });
  }

  render() {
    let searchResults = (this.state.foundArtist.length > 0) ?
      <ArtistCardOrganizer searchResults={this.state.foundArtist} /> :
      '' ;

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            className="input" 
            type="text" 
            placeholder="Search for an Artist"
            value={this.state.searchTerms}
            onChange={this.handleChange}
          />
        </form>

        {searchResults}

      </div>
    );
  }
}