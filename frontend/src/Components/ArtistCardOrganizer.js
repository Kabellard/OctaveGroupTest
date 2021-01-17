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
      <div>
        <table className="table">
          <tbody>
            {this.state.groupedResults.map((group, index) => (
              <tr key={index}> 
                {group.map((searchResult, index) => (
                  <td key={index} style={{width:"25%"}}> 
                    <ArtistCard 
                      artistInfo={searchResult} 
                    />  
                  </td>
                ))} 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  }

}