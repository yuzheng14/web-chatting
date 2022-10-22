import { debug, Realtime } from "leancloud-realtime";
import AV from 'leancloud-storage'

import config from "../config";

const realtime = new Realtime({
    appId: config.appId,
    appKey: config.appKey,
    server: config.server,
})

AV.init({
    appId: config.appId,
    appKey: config.appKey,
    serverURL: config.server
})

debug.enable()

export default realtime

export { AV }
