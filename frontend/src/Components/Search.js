import React, {Component} from "react";
import SpotifyApi from '../Api/SpotifyApi';
// import ArtistCard from './ArtistCard.js';
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

  async handleSubmit(event) {
    event.preventDefault();
    if(this.state.searchTerms === '') {
      this.setState({searchTerms: []});
      return 0;
    }
    

    console.log("Search started");
    const result = await SpotifyApi.getSearchArtist(this.state.searchTerms);
    console.log("Search Result", result);
    this.setState({foundArtist: result.artists.items});
    console.log('hey', this.state.foundArtist);
    event.preventDefault();
  }

  handleChange(event) {
      this.setState({searchTerms: event.target.value});
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