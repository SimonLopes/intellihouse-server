import { serverHttp } from "./http";

import "./websocket"

serverHttp.listen(3001, () => console.log("Server is runing"))