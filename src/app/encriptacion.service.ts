import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  private secretKey = '1234321';
  constructor() { }
  encriptar(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  desencriptar(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
