# BIJU - Un viaje fotografico - Proyecto React galeria fotografica

"¡Bienvenido a nuestro proyecto! Descubre y comparte tus recuerdos con nosotros. ¡Esperamos ver tus fotos pronto!"

En que consiste este proyecto:
- Una aplicacion web enfocada a vivir una experiencia fotografica en comunidad.
- Podras subir y tomar fotos que seran vistas por todos los usuarios de nuestra comunidad.
- Podras reaccionar, compartir y comentar las publicaciones de todos los miembros de nuestra comunidad.
- Podras ver los comentarios que nuestra comunidad tiene sobre tus publicaciones.
- En esta comunidad podras vivir y subir tus experiencias diarias.

## Requerimientos

Descargar el proyecto:

```
$ git clone https://github.com/cysorianop/galeria-comunitaria-react.git
```

Una vez descargado el repositorio, se debe tener instalado:
  - "firebase": "^10.7.2",
  - "react": "^18.2.0",
  - "react-bootstrap": "^2.10.0",
  - "react-dom": "^18.2.0",
  - "react-modal": "^3.16.1",
  - "react-router-dom": "^6.21.3",
  - "react-webcam": "^7.2.0",
  - "uuid": "^9.0.1",

## Configuracion Firebase

- Primero se debe tener registrada la cuenta en: [[https://console.firebase.google.com/u/0/?hl=es](https://console.firebase.google.com/u/0/?hl=es)]

    # Crear proyecto

    - Se crea el proyecto mediante el respectivo boton.
    - Existe la posibilidad de activar Google Analytics esto es opcional.
    - Se aceptan las condiciones y se crea el proyecto.

    # Agregar Firebase a tu APP

    - Se agrega el nombre de la APP y se confirma la solicitud

    # Configuracion archivo firebase.js

    - Se debe agregar la configuracion firebase que arroja la plataforma dentro del archivo:

    ```
    const firebaseConfig = {
        apiKey: "XXXXXXXXXXXXXXXXX",
        authDomain: "XXXXXXXXXXX.com",
        projectId: "XXXXXXXXXX",
        storageBucket: "XXXXXXXXXX.com",
        messagingSenderId: "XXXXXXXXXX",
        appId: "XXXXXXXXXXXXXXXXXXXXXXXXX",
        measurementId: "X-XXXXXXXX"
    };
    ```

    # Agregar configuraciones

    Se debe generar las configuraciones de Autenticacion, Firestore database y storage. Para esto se ingresa a estas opciones y se siguen los pasos respectivos para la activacion de estas.

## Iniciar proyecto

Al iniciar el proyecto se debe tener en cuenta:

- El proyecto esta configurado para poder observar los cambios en la base de datos desde el administrador Firebase, para esto se debe configurar este espacio previamente.

    - Se deben instalar las dependencias:
     
    ```
        npm install
    ```

    - Se debe correr el build del proyecto:

    ```
        npm run build
    ```

    - Se debe iniciar el proyecto:

    ```
        npm start
    ```


## Urls

Para ver si todo está funcionando como se espera, vaya a la siguiente dirección: [[http://localhost:3000/](http://localhost:38000/)]


## Funcionamiento

Al interactura con nuestro entorno web encontraras una interfaz amigable.

Te encontraras con un login en el cual podras ingresar a tu cuenta o crear una si asi lo deseas. 

Encontraras una galeria comunitaria en la cual podras subir y tomar foto mediante las opciones que te brinda el aplicativo.

A su vez, podras encontrar una seccion de publicaciones donde podras ver tus reacciones o reaccionar al contenido que desees.

"Descubre nuevas perspectivas y conéctate con personas que comparten tus pasiones. ¡Esperamos verte en nuestro proyecto!"


## Mejoras

¡Nos encantaría que te involucraras y contribuiras al proyecto! Aquí hay algunas maneras en que puedes contribuir:

- Reportar Problemas: Si encuentras problemas o errores, por favor crea un nuevo número aquí .

- Solicitudes de Extracción: Si deseas mejorar o agregar nuevas características, ¡estaríamos encantados de recibir solicitudes de extracción!

- Pruebas: Ayúdanos a mejorar la calidad del código proporcionando pruebas y asegurándote de que todo funciona correctamente.

- Comentarios: Queremos saber tu opinión. Si tienes sugerencias o ideas, por favor compártelas.


## "Somos una comunidad de amantes de la fotografía. Únete y descubre la magia que creamos juntos. ¡Bienvenido!"