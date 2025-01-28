import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {CONFIG} from './config';
@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  private secretKey = CONFIG.secretKey;
  constructor() { }
  encriptar(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  desencriptar(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
