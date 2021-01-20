import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.spotify.com/',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      // "Authorization": "Bearer BQDAlR4J6yC_2pvB1HUuIYsI5yaP3lEgIc-ibFptlYRmqp41M2ArCMH9XctIR0oRkmvL7Z3A_3dU6Q4csDRf0KplKAUVtb4SmiCK7RGsaGZDvWqplgQwJz-zHDbjbSAa5vnXbUInC_TYjcYbIPzfSI9bwmNfpWxDwho"
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
    },
    postOrder(order) {
        return this.execute("post", `/post_new_order/`, {
            first_name: order.firstName,
            last_name: order.lastName,
            vendor_color_id: order.vendorColor.id,
            size: order.size
        });
    },
}

export default SpotifyApi