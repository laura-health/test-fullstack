import io from "socket.io-client";

export const ENDPOINT = "http://localhost:5000/api/v1";
export const SOCKET = io.connect(`${ENDPOINT}`)