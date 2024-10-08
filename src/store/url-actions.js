import { setShortenedLink } from "./url-slice";
import CryptoJS from "crypto-js";

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const encodeBase62 = int => {
    if (int === 0)
        return BASE62[0];

    let encoded = '';
    while (int > 0) {
        encoded = BASE62[int % 62] + encoded;
        int = Math.floor(int / 62);
    }

    return encoded;
}

const decodeBase62 = str => {
    let decoded = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const val = BASE62.indexOf(char);
        if (val === -1)
            throw new Error('Invalid character.');

        decoded = decoded * 62 + val;
    }
    return decoded;
}

const hashUrl = (url) => {
    const hash = CryptoJS.SHA256(url).toString(CryptoJS.enc.Hex);
    const numID = parseInt(hash.slice(0, 16), 16);
    return numID;
}

export const fetchOriginalUrl = (shortUrlID) => {
    const numID = decodeBase62(shortUrlID);
    return async dispatch => {
        try {
            const response = await fetch(`https://url-shortener-ac1ce-default-rtdb.firebaseio.com/${numID}.json`);

            if (!response.ok) {
                throw new Error('Failed to fetch URL.');
            }

            const data = await response.json();

            if (!data || !data.originalUrl) {
                throw new Error('URL not found.');
            }

            const originalUrl = data.originalUrl.startsWith('http') ? data.originalUrl : `http://${data.originalUrl}`;
            dispatch(setShortenedLink(originalUrl));
        } catch (error) {
            console.log(error);
        }
    }
}

export const storeUrl = (originalUrl) => {
    return async dispatch => {
        const numID = hashUrl(originalUrl);
        const uniqueID = encodeBase62(numID);
        try {
            const response = await fetch(`https://url-shortener-ac1ce-default-rtdb.firebaseio.com/${numID}.json`,
                {
                    method: 'PUT',
                    body: JSON.stringify({ originalUrl: originalUrl.trim() }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok)
                throw new Error('Failed to store URL.');

            const shortenedUrl = `http://localhost:5173/${uniqueID}`;
            dispatch(setShortenedLink(shortenedUrl));
        } catch (error) {
            console.log(error);

        }
    }
}