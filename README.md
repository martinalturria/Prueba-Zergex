# Crypto Project

Este documento proporciona las instrucciones necesarias para configurar y ejecutar los entornos de desarrollo y producción para el proyecto Crypto, que incluye tanto un backend desarrollado con Node.js y Express como un frontend desarrollado con React.js.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/en/download/) (v14 o superior)
- [PostgreSQL](https://www.postgresql.org/download/) (Base de datos)

## Configuración del entorno

### Clonar el repositorio

Primero, clona el repositorio en tu máquina local usando Git:

```bash
git clone <url-del-repositorio>
cd nombre-del-repositorio
```

## Backend (API-Crypto)
Instalación de dependencias:
```bash
cd API-Crypto
npm install
```

### Configuración de variables de entorno:
Crea un archivo .env en el directorio raíz del backend. Debe contener las siguientes variables:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

Construir el proyecto:
```bash
npm run build
```
Ejecutar en modo desarrollo:
```bash
npm run dev
```
Ejecutar en producción:
```bash
npm start
```

## Frontend (APP-Crypto)
Instalación de dependencias:
```bash
cd frontend
npm install
```
Ejecutar en modo desarrollo:
```bash
npm run dev
```
Construir el proyecto para producción:
```bash
npm run build
```

### Contacto
Si tienes preguntas o necesitas ayuda con la configuración, puedes contactar a martingabalturria@gmail.com.