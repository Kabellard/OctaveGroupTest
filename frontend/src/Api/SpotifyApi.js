import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.spotify.com/',
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer BQAJoqFr1Cp9t6qcOu0sf86TPhrARCPMG12Y4w5rx5IirxryBiAXMkoXMM6G7J2ELUquuKNZ0IaRgDlQvVVv6pUW9t0h2qFMK0zlLPf720ayoAKdR0p1T6Y9FbsSBjAKPkbxe2LvqClXq_gqghNaChzWoDkhRouaw-8"
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
            console.log("axiosReq", req);
            console.log("headers", req.headers)
            return req.data;
        });
    },
    getSearchArtist(searchTerms) {
        return this.execute(
            "get",
            `/v1/search?q=${searchTerms}&type=artist&offset=0&limit=20`,
            { data: null }
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