import base64 from 'base-64';
import {transformTicketToLanes} from './transform';

export async function invokeBackend({ path, queries, method = 'GET', body }, apiKey) {

    // const domain = 'http://localhost:9093';
    const domain = 'https://cors-anywhere.herokuapp.com/https://911.lazada.com';

    var esc = encodeURIComponent;
    var finalQueries = Object.keys(queries)
        .map(k => esc(k) + '=' + esc(queries[k]))
        .join('&');

    const url = domain + path + '?' + finalQueries;

    body = (body) ? JSON.stringify(body) : body;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + base64.encode(apiKey + ":X"));

    const results = await fetch(url, {method, body, headers})
        .then(res => res.json())
        .then(tickets => transformTicketToLanes(tickets));

    return results;
}