import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.spotify.com/',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
     },
});

const SpotifyApi = {
    async execute(method, resource, data, token) {
        return client({
            method,
            url: resource,
            data,


            headers: {
                "Authorization": `Bearer ${token}`
            },
        }).then((req) => {
            return req.data;
        });
    },
    getSearchArtist(searchTerms, token) {
        return this.execute(
            "get",
            `/v1/search?q=${searchTerms}&type=artist&offset=0&limit=20`,
            { data: null },
            token
        );
    },
    getArtistAlbums(artistId, token) {
        return this.execute(
            "get",
            `/v1/artists/${artistId}/albums`,
            { data: null },
            token
        );
    }
}

export default SpotifyApi