import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.spotify.com/',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Bearer BQCwnL-8ry2Q4z40BBxdDHCsN9PLV7JU5YtezMTmMLTZjgMV2bMv3Pvvf7v8AfOrY0KmW7a28d6t2E7tKN-zAWB36jtrLSvm8Kr6q1HtUKTMI0y0zNb-Gv5TNf_N4xtq5MPc7nWLl0Mw-6axscveDb6VX-VrJ3dg84w"
     },
});

const SpotifyApi = {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data,

            headers: {},
        }).then((req) => {
            return req.data;
        });
    },
    getSearchArtist(searchTerms) {
        return this.execute("get", `/v1/search?q=${searchTerms}&type=artist`, { data: null });
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