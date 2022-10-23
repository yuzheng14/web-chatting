import { PBKDF2 } from 'crypto-js'
import config from '../config'

export function encryptPassword(password: string): string {
    const salt = config.salt
    const iterations = config.iterations
    return PBKDF2(password, salt, {
        keySize: 128 / 32,
        iterations: config.iterations
    }).toString()
}