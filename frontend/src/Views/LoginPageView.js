import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import _ from "lodash";

const clientId = "674745874871409cb237f8a694d41778";
const domain = "http://localhost:3000/";

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const redirectUri = `${domain}`;
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
];
// Get the hash of the url
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

    // TODO SCOPE URL ELEMENT
    // &scope=${scopes.join("%20")}

    render() {
        return(
            <div>
                <a
                    className="button is-primary is-rounded"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                >
                    Login to Spotify
                </a>
            </div>
        );
    }
}
export default withRouter(LoginPage);