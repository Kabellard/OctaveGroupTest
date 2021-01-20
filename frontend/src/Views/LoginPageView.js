import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const clientId = "674745874871409cb237f8a694d41778";

const domain = window.location.origin

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const redirectUri = `${domain}`;

// Get the hash of the url
// Token Hash Function inspired by: https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = "";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        // Set token
        let _token = hash.access_token;
        if (_token) {
            // Set token
            this.setState({
                token: _token
            });
            sessionStorage.setItem("token", _token)

            const { history } = this.props;
            history.push(`/artistSearch`);

        }
    }

    render() {
        return(
            <div className="container is-vcentered" style={{
                marginTop: "30vh"
            }}>
                <a
                    className="button is-success is-rounded is-large"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
                >
                    <span className="icon is-large">
                        <FontAwesomeIcon icon={faSpotify} />
                    </span>
                    <span>
                        Login to Spotify
                    </span>

                </a>
            </div>
        );
    }
}
export default withRouter(LoginPage);