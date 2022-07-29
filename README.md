<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Desarrollo

1. Clonar el repositorio
2. Ejecutar

```
  yarn install
```

3. Tener Nest CLI instalado

```
  npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. Copiar y renombrar el archivo `.env.example` por `.env`

6. Completar variables de entorno

7. Levantar app en desarrollo

```
yarn start:dev
```

5. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/seed
```

# Docker

1. Copiar y renombrar el archivo `.env.example` por `.env.prod`

2. Completar variables de entorno

### Build

docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

### Run

docker-compose -f docker-compose.prod.yaml --env-file .env.prod up

### Nota

Por defecto, **docker-compose** usa el archivo `.env`, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con

```
docker-compose -f docker-compose.prod.yaml up --build
```

## Stack

- MongoDB
- Nest
