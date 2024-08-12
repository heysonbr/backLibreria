# Mi Proyecto de Libros con Firebase y Express

Este proyecto es una API REST que utiliza Firebase Firestore como base de datos para almacenar información sobre libros.

## Requisitos

- Node.js
- npm
- express
- Cuenta de Firebase

## Configuración

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto con `npm install`.
3. Crea un proyecto en Firebase y obtén tus credenciales de servicio.
4. Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Firebase como variables de entorno. Aquí tienes un ejemplo de cómo debería ser tu archivo `.env`:
   IREBASE_PROJECT_ID="your-firebase-project-id" FIREBASE_PRIVATE_KEY_ID="your-firebase-private-key-id" FIREBASE_KEY="your-firebase-key" FIREBASE_CLIENT_EMAIL="your-firebase-client-email" FIREBASE_CLIENT_ID="your-firebase-client-id" FIREBASE_AUTH_URI="your-firebase-auth-uri" FIREBASE_TOKEN_URI="your-firebase-token-uri" FIREBASE_AUTH_PROVIDER_X509_CERT_URL="your-firebase-auth-provider-x509-cert-url" FIREBASE_CLIENT_X509_CERT_URL="your-firebase-client-x509-cert-url"

## Ejecución

Para iniciar el servidor, ejecuta `node index.js` en la línea de comandos.

## Endpoints

- `GET /books`: Devuelve una lista de todos los libros.
- `GET /books/:id`: Devuelve los detalles de un libro específico.
- `POST /books`: Crea un nuevo libro. El cuerpo de la solicitud debe contener los detalles del libro en formato JSON.
- `POST /bookss`: Crea varios libros a la vez. El cuerpo de la solicitud debe contener una lista de libros en formato JSON.
- `PUT /books/:id`: Actualiza los detalles de un libro específico. El cuerpo de la solicitud debe contener los detalles del libro actualizados en formato JSON.
- `DELETE /books/:id`: Elimina un libro específico.

Cada libro debe tener un formato JSON como el siguiente:

```json
{
  "escritor": "Nombre del escritor",
  "paginas": "Número de páginas",
  "ISBN": "Número ISBN del libro",
  "caratula": "URL de la imagen de la carátula",
  "genero": "Género del libro",
  "titulo": "Título del libro",
  "sinopsis": "Sinopsis del libro"
}
```
