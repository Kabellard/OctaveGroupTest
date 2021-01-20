import React, {Component} from "react";
import ArtistCard from './ArtistCard.js';
import _ from "lodash";

export default class ArtistCardOrganizer extends Component {
  constructor(props) {
    super(props);

    const groupedResults = _.chunk(props.searchResults, 4);

    this.state = {
      groupedResults: groupedResults
    }
  }

  render() {
    return(
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {this.props.searchResults.map((result, index) => (
            <div className="column is-one-quarter-desktop is-half-mobile is-one-third-tablet"
                 style={{
                   display:"grid"
                 }}
                 key={index}>
              <ArtistCard
                  artistInfo={result}
                  key={index}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}