import {ResetToken} from './ResetToken.js';
import { ErrorResponse } from './ErrorResponse.js';

export interface UsuarioToken{
    id:number;
    nombre:string;
    email:string;
    resetTokens:ResetToken;
    errorResponse?:ErrorResponse;
}

