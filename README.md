# ItinerarIA - Frontend

## Requisitos previos
Lista de dependencias y versiones necesarias para ejecutar el proyecto:
- Node.js (versión 21.7.1 o superior)
- npm

## Instalación

Instrucciones para clonar el repositorio e instalar dependencias:

```bash
git clone https://github.com/facundososab/itinerarIA-Frontend.git
cd itinerarIA-Frontend
npm install
```

Debe crear un archivo .env para definir la ruta del backend de la aplicación, de la siguiente manera:

```bash
VITE_API_URL = 'http://example:1000'
```
Por defecto será http://localhost:3000

## Uso
Cómo ejecutar la aplicación en un entorno de desarrollo:

```bash
npm run dev
```

Esto abrirá la aplicación en http://localhost:5173 (puedes ajustar la URL en el archivo vite.config.ts).

Para que la aplicación funcione correctamente, el backend debe estar ejecutandose ([ItinerarIA-Backend](https://github.com/TomasSanchezMachado/itinerarIA-Backend))


