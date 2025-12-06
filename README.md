# Backend Ecommerce 2.0

Backend completo para una aplicación de ecommerce desarrollado con Node.js y Express, que implementa múltiples modos de persistencia de datos (MongoDB, FileSystem y Memoria).

## 🚀 Características

- **Múltiples modos de persistencia**: MongoDB, FileSystem o Memoria
- **Autenticación y autorización**: Sistema completo con JWT y Passport
- **Arquitectura por capas**: DAO, Repository, Service, Controller
- **Gestión de carritos**: Sistema de carritos de compra por usuario
- **Sistema de tickets**: Generación de órdenes de compra
- **Recuperación de contraseña**: Con envío de emails
- **Roles de usuario**: Admin y User con diferentes permisos
- **Paginación**: Para productos y listados

## 📋 Requisitos previos

- Node.js (v14 o superior)
- MongoDB (si se usa persistencia MONGO)
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/charlyr95/backend-2-Coder.git
cd backend-2-Coder
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=3000
PERSISTENCE=MONGO
MONGO_URL=mongodb://localhost:27017
DB_NAME=ecommerce
JWT_SECRET=tu_secreto_jwt
NODE_ENV=development
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicación
EXPIRE_EMAIL_TOKEN=1h
```

4. Iniciar el servidor:
```bash
# Modo desarrollo (con watch)
npm run dev

# Modo producción
npm start
```

## 🗂️ Modos de Persistencia

El proyecto soporta tres modos de persistencia que se configuran mediante la variable de entorno `PERSISTENCE`:

- `MONGO`: Persistencia en MongoDB
- `FS`: Persistencia en sistema de archivos (JSON)
- `MEMORY`: Persistencia en memoria (solo para desarrollo)

## 🛣️ Endpoints API

### Autenticación (`/api/session`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/login` | Iniciar sesión | No |
| POST | `/register` | Registrar usuario | No |
| GET | `/current` | Obtener usuario actual | Sí |
| POST | `/recover-password` | Solicitar recuperación de contraseña | No |
| POST | `/reset-password` | Restablecer contraseña | No |

### Productos (`/api/products`)

| Método | Endpoint | Descripción | Autenticación | Rol |
|--------|----------|-------------|---------------|-----|
| GET | `/` | Listar productos | No | - |
| GET | `/:pid` | Obtener producto por ID | No | - |
| POST | `/` | Crear producto | Sí | Admin |
| PUT | `/:pid` | Actualizar producto | Sí | Admin |
| DELETE | `/:pid` | Eliminar producto | Sí | Admin |

### Carritos (`/api/carts`)

| Método | Endpoint | Descripción | Autenticación | Rol |
|--------|----------|-------------|---------------|-----|
| GET | `/` | Listar todos los carritos | Sí | Admin |
| POST | `/` | Crear carrito | Sí | User |
| GET | `/:cid` | Obtener carrito por ID | Sí | User (propio) |
| POST | `/:cid/product/:pid` | Agregar producto al carrito | Sí | User (propio) |
| PUT | `/:cid` | Actualizar productos del carrito | Sí | User (propio) |
| PUT | `/:cid/product/:pid` | Actualizar cantidad de producto | Sí | User (propio) |
| DELETE | `/:cid` | Vaciar carrito | Sí | User (propio) |
| DELETE | `/:cid/product/:pid` | Eliminar producto del carrito | Sí | User (propio) |

### Tickets (`/api/tickets`)

| Método | Endpoint | Descripción | Autenticación | Rol |
|--------|----------|-------------|---------------|-----|
| POST | `/` | Crear ticket/orden | Sí | User |
| GET | `/` | Listar todos los tickets | Sí | Admin |
| GET | `/:tid` | Obtener ticket por ID | Sí | Admin |
| GET | `/code/:code` | Obtener ticket por código | Sí | Admin |
| PUT | `/:tid` | Actualizar ticket | Sí | Admin |
| DELETE | `/:tid` | Eliminar ticket | Sí | Admin |

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación. Los tokens se envían como cookies HTTP-only.

### Registro de usuario

```json
POST /api/session/register
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

### Login

```json
POST /api/session/login
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

## 👥 Roles y Permisos

- **Admin**: Acceso completo a productos, tickets y visualización de todos los carritos
- **User**: Gestión de su propio carrito y creación de tickets

## 🏗️ Arquitectura del Proyecto

```
src/
├── app.js                 # Punto de entrada
├── config/               # Configuraciones
│   ├── config.js
│   ├── mongo.js
│   └── passport.js
├── controllers/          # Controladores
├── dao/                  # Data Access Objects
│   ├── factory.js
│   ├── fs/              # Persistencia FileSystem
│   ├── memory/          # Persistencia Memoria
│   └── mongo/           # Persistencia MongoDB
├── dto/                  # Data Transfer Objects
├── middlewares/          # Middlewares personalizados
├── repository/           # Capa de repositorio
├── routes/              # Rutas de la API
├── service/             # Lógica de negocio
└── utils/               # Utilidades
```

## 📦 Dependencias Principales

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **passport**: Autenticación
- **jsonwebtoken**: Manejo de JWT
- **bcrypt**: Hash de contraseñas
- **nodemailer**: Envío de emails
- **cors**: Habilitación de CORS
- **dotenv**: Variables de entorno

## 🛠️ Scripts Disponibles

```bash
npm start      # Iniciar servidor en modo producción
npm run dev    # Iniciar servidor en modo desarrollo con watch
npm test       # Ejecutar tests (por configurar)
```

## 🌐 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| PORT | Puerto del servidor | 3000 |
| PERSISTENCE | Modo de persistencia (MONGO/FS/MEMORY) | MEMORY |
| MONGO_URL | URL de conexión a MongoDB | - |
| DB_NAME | Nombre de la base de datos | - |
| JWT_SECRET | Clave secreta para JWT | mi-jwt-secreto |
| NODE_ENV | Entorno de ejecución | development |
| EMAIL_USER | Usuario de email para notificaciones | - |
| EMAIL_PASS | Contraseña del email | - |
| EXPIRE_EMAIL_TOKEN | Tiempo de expiración del token de email | 1h |

## 📝 Notas de Desarrollo

- Al usar persistencia en memoria se crea automáticamente un usuario administrador por defecto.
- Los tokens JWT se almacenan en cookies HTTP-only para mayor seguridad
- La paginación de productos está implementada con mongoose-paginate-v2
- Los carritos están vinculados a usuarios específicos

## 👤 Autor

**charlyr95**
- GitHub: [@charlyr95](https://github.com/charlyr95)
- Proyecto: [backend-2-Coder](https://github.com/charlyr95/backend-2-Coder)

---

⌨️ con ❤️ por [charlyr95](https://github.com/charlyr95)
