import React, {Component} from "react";
import SpotifyApi from '../Api/SpotifyApi';
import { withRouter } from 'react-router-dom';
import ArtistCardOrganizer from '../Components/ArtistCards/ArtistCardOrganizer.js';

class SearchPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchTerms : '',
      foundArtist: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    componentDidMount(){
        const searchTerms = this.props.match.params.searchTerms;

        if ( searchTerms === undefined ){
            return 1;
        } else {
            const token = sessionStorage.getItem("token");
            SpotifyApi.getSearchArtist(searchTerms, token)
                .then((r) => {
                    // console.log('r: ', JSON.stringify(r, null, 2));
                    this.setState({foundArtist: r.artists.items});
                    // console.log('hey', this.state.foundArtist);
                })
                .catch((error)=> {
                    console.log(error);
                });

        }

    }

  handleSubmit(event) {
      const { history } = this.props;
      const searchTerms = this.state.searchTerms;
      history.push(`/artistSearch/${searchTerms}`);

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
export default withRouter(SearchPage);