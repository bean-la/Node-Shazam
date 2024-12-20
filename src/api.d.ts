import { SignatureGenerator } from './algorithm.js';
import { DecodedMessage } from './signatures.js';
export { ShazamRoot } from './types/shazam.js';
export declare class Endpoint {
    timezone: string;
    static SCHEME: string;
    static HOSTNAME: string;
    constructor(timezone: string);
    url(): string;
    params(): {
        sync: string;
        webv3: string;
        sampling: string;
        connected: string;
        shazamapiversion: string;
        sharehub: string;
        hubv5minorversion: string;
        hidelb: string;
        video: string;
    };
    headers(language?: string): {
        'X-Shazam-Platform': string;
        'X-Shazam-AppVersion': string;
        Accept: string;
        'Content-Type': string;
        'Accept-Encoding': string;
        'Accept-Language': string;
        'User-Agent': string;
    };
    sendRecognizeRequest(url: string, body: string, language?: string): Promise<ShazamRoot | null>;
    formatAndSendRecognizeRequest(signature: DecodedMessage, language?: string): Promise<ShazamRoot | null>;
}
export declare class Shazam {
    static MAX_TIME_SCEONDS: number;
    endpoint: Endpoint;
    constructor(timeZone?: string);
    headers(language?: string): {
        'X-Shazam-Platform': string;
        'X-Shazam-AppVersion': string;
        Accept: string;
        'Content-Type': string;
        'Accept-Encoding': string;
        'Accept-Language': string;
        'User-Agent': string;
    };
    /*
    * Recognise a song from an audio file
    * @param {string} path the path to the file
    * @param {Boolean} minimal false for full track data, true for simplified form
    * @param {string} language song language but it still mostly works even with incorrect language
    * @returns {ShazamRoot | null}
    */
    fromFilePath(path: string, minimal?: boolean, language?: string): Promise<ShazamRoot | {
        title: string;
        artist: string;
        album: string | undefined;
        year: string | undefined;
    } | null>;
    /**
     * Recognise a song from a video file
     * @param {string} path the path to the file
     * @param {Boolean} minimal false for full track data, true for simplified form
     * @param {string} language song language but it still mostly works even with incorrect language
     * @returns {ShazamRoot | null}
     */
    fromVideoFile(path: string, minimal?: boolean, language?: string): Promise<ShazamRoot | {
        title: string;
        artist: string;
        album: string | undefined;
        year: string | undefined;
    } | null>;
    /**
     * Recognise a song from Samples Array
     * @param {number[]} samples Samples array
     * @param {string} language  song language but it still mostly works even with incorrect language
     */
    recognizeSong(samples: number[], language?: string, callback?: ((state: 'generating' | 'transmitting') => void)): Promise<ShazamRoot | null>;
    /**
     * Recognise a song from Samples Array and return minial info
     * @param {number[]} samples Samples array
     * @param {string} language  song language but it still mostly works even with incorrect language
     */
    recognizeSongMinimal(samples: number[], language?: string, callback?: ((state: 'generating' | 'transmitting') => void)): Promise<{
        title: string;
        artist: string;
        album: string | undefined;
        year: string | undefined;
    } | null>;
    fullRecognizeSong(samples: number[], callback?: ((state: 'generating' | 'transmitting') => void), language?: string): Promise<ShazamRoot | null>;
    createSignatureGenerator(samples: number[]): SignatureGenerator;
    /**
     * Most shazamed tracks globally
     * @param {string} language  song language but it still mostly works even with incorrect language
     * @param {string} endpoint_country Endpoint country (doesnt matter much)
     * @param {string} limit limit to how many tracks are fetched
     * @param {string} offset the offset to start fetching from
     */
    top_tracks_global(language?: string, endpoint_country?: string, limit?: string, offset?: string): Promise<unknown>;
    /**
     * Most shazamed tracks for a country
     * @param {string} language  song language but it still mostly works even with incorrect language
     * @param {string} endpoint_country Endpoint country (doesnt matter much)
     * @param {string} country_code ISO country code for the country
     * @param {string} limit limit to how many tracks are fetched
     * @param {string} offset the offset to start fetching from
     */
    top_tracks_country(language: string, endpoint_country: string, country_code: string, limit: string, offset: string): Promise<unknown>;
    /**
    * Most shazamed tracks for a city
    * @param {string} language  song language but it still mostly works even with incorrect language
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} city_id Shazam city id
    * @param {string} limit limit to how many tracks are fetched
    * @param {string} offset the offset to start fetching from
    */
    top_tracks_city(language: string, endpoint_country: string, city_id: string, limit: string, offset: string): Promise<unknown>;
    /**
    * Info about a track
    * @param {string} language  song language but it still mostly works even with incorrect language
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} track_id Shazam track id
    */
    track_info(language: string, endpoint_country: string, track_id: string): Promise<unknown>;
    /**
    * List locations
    */
    list_locations(): Promise<unknown>;
    /**
    * Most shazamed tracks globally for a genre
    * @param {string} language  song language but it still mostly works even with incorrect language
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} genre Genre to search
    * @param {string} limit limit to how many tracks are fetched
    * @param {string} offset the offset to start fetching from
    */
    top_genre_tracks_world(language: string, endpoint_country: string, genre: string, limit: string, offset: string): Promise<unknown>;
    /**
    * Most shazamed tracks for a country
    * @param {string} language  song language but it still mostly works even with incorrect language
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} country ISO country code for the country
    * @param {string} genre Genre to search
    * @param {string} limit limit to how many tracks are fetched
    * @param {string} offset the offset to start fetching from
    */
    top_genre_tracks_country(language: string, endpoint_country: string, country: string, genre: string, limit: string, offset: string): Promise<unknown>;
    /**
    * Related songs for a track
    * @param {string} language  song language but it still mostly works even with incorrect language
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} track_id Shazam track id
    * @param {string} limit limit to how many tracks are fetched
    * @param {string} offset the offset to start fetching from
    */
    related_songs(language: string, endpoint_country: string, track_id: string, offset: string, limit: string): Promise<unknown>;
    /**
    * Search artist by name
    * @param {string} language  song language but it still mostly works even with incorrect language
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} query Artist name
    * @param {string} limit limit to how many tracks are fetched
    * @param {string} offset the offset to start fetching from
    */
    search_artist(language: string, endpoint_country: string, query: string, limit: string, offset: string): Promise<unknown>;
    /**
    * Search artist by id
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} artist_id Artist ID
    */
    search_artist_v2(endpoint_country: string, artist_id: string): Promise<unknown>;
    /**
    * Albums by an artist
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} artist_id Shazam artist id
    * @param {string} limit limit to how many tracks are fetched
    * @param {string} offset the offset to start fetching from
    */
    artist_albums(endpoint_country: string, artist_id: string, limit: string, offset: string): Promise<unknown>;
    /**
    * Search music on shazam
    * @param {string} language  song language but it still mostly works even with incorrect language
    * @param {string} endpoint_country Endpoint country (doesnt matter much)
    * @param {string} query Query to search
    * @param {string} limit limit to how many tracks are fetched
    * @param {string} offset the offset to start fetching from
    */
    search_music(language: string, endpoint_country: string, query: string, limit: string, offset: string): Promise<unknown>;
    /**
    * Get number of times a track was shazamed
    * @param {string} track Track ID
    */
    listen_count(track: string): Promise<unknown>;
}
