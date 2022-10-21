import Bmob from "hydrogen-js-sdk"
import config from "../config"

// console.log(config)

Bmob.initialize(config.SecretKey, config.APISafeKey)
console.log(`Bomb initialized`)
console.log(`Bomb: ${Bmob}`);

const MyBmob=Bmob

export default MyBmob
