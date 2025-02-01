# Keycloud

¡Bienvenido al repositorio del frontend de **Keycloud**, un gestor de contraseñas!  
Este proyecto está construido con **Angular** y permite almacenar y gestionar contraseñas de manera segura.

## Pasos para que funcione

Sigue estos pasos para configurar y ejecutar el proyecto:

### 1. Crear un archivo `config.ts`

Dentro de la carpeta `/src`, crea un archivo llamado **`config.ts`** con el siguiente contenido:

```
export const CONFIG = {
  secretKey: 'aaaabbbbccccdddd' // Clave secreta para encriptar y desencriptar
};
```
### 2. Alternativa: Escribir la clave directamente en encriptacion.service.ts

Si prefieres no crear el archivo `config.ts`, puedes escribir directamente la clave en el archivo `encriptacion.service.ts` en lugar de crear el archivo `config.ts`.

### 3. Instalar dependencias
```
npm install
```

### 4. Ejecutar la aplicación
Finalmente, inicia la aplicación con el siguiente comando:
```
ng serve -o
```
Esto abrirá automáticamente el proyecto en tu navegador.

## Funcionalidades
 - Encriptación de contraseñas: Utiliza la clave secreta configurada para encriptar y desencriptar las contraseñas de forma segura.
 - Gestión de contraseñas: Agrega, edita y elimina contraseñas de manera sencilla.

## Contribuciones
Si deseas contribuir al proyecto, ¡siéntete libre de abrir un **pull request**!

## Tecnologías usadas
**Angular:** Framework principal para la interfaz de usuario.
**TypeScript:** Lenguaje de programación utilizado para estructurar el código.
**Node.js:** Entorno de ejecución para ejecutar los comandos de desarrollo.

## Tecnologías usadas
Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto conmigo a través de [LinkedIn](https://www.linkedin.com/in/adrian-martin-cano/)

