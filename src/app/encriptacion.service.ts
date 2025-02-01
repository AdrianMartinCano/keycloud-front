import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CONFIG } from './config';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {
  private secretKey = CryptoJS.enc.Utf8.parse(CONFIG.secretKey); // Convertimos la clave a bytes

  constructor() { }

  encriptar(value: string): string {
    const encrypted = CryptoJS.AES.encrypt(value, this.secretKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  desencriptar(value: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(value, this.secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error al desencriptar:', error);
      return ''; 
    }
  }
}
