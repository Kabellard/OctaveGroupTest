import React, {Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";

export default class ArtistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      external_urls: props.external_urls,
      followers: ''
    };

    this.computeStars = this.computeStars.bind(this);
  }

  computeStars(popularity) {
    // logic to compute how many stars to be displayed on the cards based on the artist popularity 
    const starsToDisplay = [];

    let popularityScore = popularity;
    let negativityScore = 100 - popularity;

    while (popularityScore > 0){
      if (popularityScore >= 20) {
        const key = starsToDisplay.length;
        starsToDisplay.push(<FontAwesomeIcon icon={faStar} key={key} />);
        popularityScore = popularityScore - 20;
      } else if (popularityScore < 20) {
        const key = starsToDisplay.length;
        starsToDisplay.push(<FontAwesomeIcon icon={faStarHalf} key={key} />);
        break;
      }
    }

    while (negativityScore >= 20) {
      const key = starsToDisplay.length;
      starsToDisplay.push(<FontAwesomeIcon icon={emptyStar} key={key} />);
      negativityScore = negativityScore - 20;
    }

    return starsToDisplay;
  }

  render() {
    // Assigning different attributes to variables
    const imageUrl = (this.props.artistInfo.images.length > 0) ?
      this.props.artistInfo.images[0].url :
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    const artistName = this.props.artistInfo.name;
    const followerCount = this.props.artistInfo.followers.total;
    const starsToRender = this.computeStars(this.props.artistInfo.popularity);

    return(
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={imageUrl}
            alt="Artist"
            />
          </figure>
        </div>

        <div className="card-content has-text-left">
          <p className="title is-4"> {artistName} </p>
          <p className="subtitle is-6">
           {followerCount} followers 
          </p>
          <div>
            {starsToRender}
          </div>
        </div>
      </div>
    )
  }
}