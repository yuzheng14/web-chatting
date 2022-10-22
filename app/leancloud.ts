import { debug, Realtime } from "leancloud-realtime";
import config from "../config";

const realtime = new Realtime({
    appId: config.appId,
    appKey: config.appKey,
    server: config.server,
})

debug.enable()

export default realtime
