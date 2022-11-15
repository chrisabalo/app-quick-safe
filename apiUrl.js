import axios from "axios";
import {io} from "socket.io-client";
//import config from "./config";

//const URL = `${config.URL_API_BASE}`;
const URI_API ='https://api-quick-safe-2022.herokuapp.com'

export const apiUrl = axios.create({
    baseURL: `${URI_API}/api/`,
    headers: { 'Accept': 'application/json' }
});

const URI_SOCKET = `${URI_API}`;
export const SOCKET = io(URI_SOCKET, {
    transports: ['websocket']
   // reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
})

