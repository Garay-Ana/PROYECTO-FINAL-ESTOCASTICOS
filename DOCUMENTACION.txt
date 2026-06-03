# Documentación Técnica - PESV Digital

## 1. Descripción General del Proyecto

### ¿Qué hace la aplicación?
PESV Digital es un sistema de gestión integral del Plan Estratégico de Seguridad Vial (PESV) diseñado para empresas de transporte en Colombia. La aplicación permite gestionar todos los 23 pasos establecidos en la Resolución 40595 de 2022 del Ministerio de Transporte, desde la conformación del comité de seguridad vial hasta la generación de reportes de autogestión y auditorías anuales.

### Problema que resuelve
El sistema soluciona la complejidad administrativa y técnica de implementar y mantener un PESV, permitiendo a las empresas:
- Centralizar toda la información de conductores, vehículos y documentación
- Automatizar alertas de vencimientos de documentos críticos
- Gestionar riesgos y programas de seguridad vial
- Registrar y analizar incidentes de tránsito
- Generar documentos normativos automáticamente con IA
- Cumplir con los indicadores de autogestión exigidos por el Ministerio de Transporte

### Público objetivo
- Empresas de transporte de carga y pasajeros en Colombia
- Gerentes de flotas y operaciones
- Líderes PESV y comités de seguridad vial
- Conductores y personal operativo
- Auditores de seguridad vial

### Tecnologías principales

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React | 18.3.1 |
| Frontend | Vite | 5.4.10 |
| Frontend | Tailwind CSS | 3.4.14 |
| Frontend | Zustand | 5.0.1 |
| Frontend | Recharts | 2.13.3 |
| Frontend | React Router DOM | 6.28.0 |
| Frontend | Axios | 1.7.7 |
| Backend | Node.js | 20+ |
| Backend | Express.js | 4.21.1 |
| Backend | Prisma ORM | 5.22.0 |
| Base de datos | PostgreSQL | 16 |
| Base de datos | SQLite (desarrollo) | - |
| IA | Anthropic Claude SDK | 0.39.0 |
| IA | Google Generative AI | 0.24.1 |
| Autenticación | JWT | 9.0.2 |
| Tareas programadas | node-cron | 3.0.3 |
| Validación | Zod | 3.23.8 |
| Generación PDF | PDFKit | 0.18.0 |

---

## 2. Arquitectura del Proyecto

### Estructura de carpetas

```
PROYECTO-ESTOCAS-main/
├── backend/                          # API REST con Node.js/Express
│   ├── prisma/                      # Configuración de base de datos
│   │   ├── schema.prisma           # Esquema de modelos Prisma
│   │   ├── seed.js                 # Datos de prueba iniciales
│   │   └── pesv.db                 # Base de datos SQLite (desarrollo)
│   ├── src/
│   │   ├── app.js                  # Configuración principal de Express
│   │   ├── config/                 # Configuraciones globales
│   │   │   ├── db.js              # Cliente Prisma
│   │   │   └── claude.js          # Configuración Claude API
│   │   ├── middlewares/            # Middlewares de Express
│   │   │   ├── auth.middleware.js # Verificación JWT
│   │   │   ├── errorHandler.js    # Manejo de errores
│   │   │   └── roles.middleware.js # Verificación de roles
│   │   ├── jobs/                   # Tareas programadas
│   │   │   └── alertas.job.js     # Job de alertas automáticas
│   │   └── modules/                # Módulos de negocio (19 módulos)
│   │       ├── acciones-correctivas/
│   │       ├── auditoria/
│   │       ├── auth/
│   │       ├── capacitaciones/
│   │       ├── comite/
│   │       ├── conductores/
│   │       ├── dashboard/
│   │       ├── desplazamientos/
│   │       ├── diagnostico/
│   │       ├── documentos/
│   │       ├── emergencias/
│   │       ├── ia/
│   │       ├── incidentes/
│   │       ├── mantenimientos/
│   │       ├── plan-trabajo/
│   │       ├── reporte-autogestion/
│   │       ├── riesgos/
│   │       ├── usuarios/
│   │       └── vehiculos/
│   ├── .env.example                # Plantilla de variables de entorno
│   ├── package.json                # Dependencias backend
│   └── server.js                   # Punto de entrada del servidor
│
├── frontend/                        # Aplicación React
│   ├── src/
│   │   ├── App.jsx                 # Rutas principales
│   │   ├── main.jsx                # Punto de entrada React
│   │   ├── index.css               # Estilos globales
│   │   ├── components/             # Componentes reutilizables
│   │   │   ├── capacititaciones/  # Componentes de capacitaciones
│   │   │   ├── ia/                # Componentes de asistente IA
│   │   │   ├── layout/            # Layout principal
│   │   │   └── ui/                # Componentes UI genéricos
│   │   ├── config/                 # Configuraciones
│   │   │   └── cloudinary.js      # Configuración Cloudinary
│   │   ├── hooks/                  # Custom hooks
│   │   │   ├── useAuth.js         # Hook de autenticación
│   │   │   └── useRole.js         # Hook de verificación de roles
│   │   ├── pages/                  # Páginas de la aplicación (20)
│   │   │   ├── AsistenteIA.jsx
│   │   │   ├── Auditoria.jsx
│   │   │   ├── Capacitaciones.jsx
│   │   │   ├── Comite.jsx
│   │   │   ├── Conductores.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Desplazamientos.jsx
│   │   │   ├── Diagnostico.jsx
│   │   │   ├── Documentos.jsx
│   │   │   ├── Emergencias.jsx
│   │   │   ├── Homepage.jsx
│   │   │   ├── Incidentes.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MaturityLevels.jsx
│   │   │   ├── MejoraContinua.jsx
│   │   │   ├── PlanTrabajo.jsx
│   │   │   ├── Reportes.jsx
│   │   │   ├── Riesgos.jsx
│   │   │   ├── Usuarios.jsx
│   │   │   └── Vehiculos.jsx
│   │   ├── router/                 # Configuración de rutas
│   │   │   └── index.js           # Rutas protegidas
│   │   ├── services/                # Servicios API (19 servicios)
│   │   │   ├── api.js             # Cliente Axios configurado
│   │   │   ├── auth.service.js
│   │   │   ├── capacitaciones.service.js
│   │   │   ├── comite.service.js
│   │   │   ├── conductores.service.js
│   │   │   ├── desplazamientos.service.js
│   │   │   ├── diagnostico.service.js
│   │   │   ├── documentos.service.js
│   │   │   ├── emergencias.service.js
│   │   │   ├── ia.service.js
│   │   │   ├── incidentes.service.js
│   │   │   ├── mantenimientos.service.js
│   │   │   ├── planTrabajo.service.js
│   │   │   ├── reporteAutogestion.service.js
│   │   │   ├── riesgos.service.js
│   │   │   ├── usuarios.service.js
│   │   │   └── vehiculos.service.js
│   │   └── store/                  # Estado global (Zustand)
│   │       └── authStore.js       # Store de autenticación
│   ├── index.html                   # HTML principal
│   ├── package.json                # Dependencias frontend
│   ├── vite.config.js              # Configuración Vite
│   └── tailwind.config.js          # Configuración Tailwind
│
├── docker-compose.yml              # Configuración PostgreSQL
├── README.md                       # Documentación para usuarios
└── DOCUMENTACION.md                # Este documento
```

### Separación de responsabilidades

**Backend (API REST)**
- **app.js**: Configuración central de Express, CORS y middleware
- **modules/**: Cada módulo contiene `routes.js` (definición de endpoints) y `controller.js` (lógica de negocio)
- **middlewares/**: Autenticación, autorización y manejo de errores
- **jobs/**: Tareas programadas (cron jobs)
- **config/**: Configuración de base de datos y servicios externos

**Frontend (SPA React)**
- **pages/**: Componentes de página que renderizan vistas completas
- **components/**: Componentes reutilizables (UI, layout, específicos de módulos)
- **services/**: Cliente Axios para comunicación con la API
- **store/**: Estado global con Zustand (autenticación)
- **hooks/**: Custom hooks para lógica reutilizable
- **router/**: Configuración de rutas y protección de rutas

---

## 3. Módulos y Componentes

### Backend - Módulos Principales

#### 3.1 Auth (Autenticación)
**Ubicación**: `backend/src/modules/auth/`

**Archivos**:
- `auth.routes.js`: Define endpoints de login y obtención de usuario actual
- `auth.controller.js`: Lógica de autenticación con JWT

**Endpoints**:
- `POST /api/auth/login`: Inicia sesión y retorna token JWT
- `GET /api/auth/me`: Obtiene información del usuario autenticado

**Funciones principales**:
- `login(email, password)`: Valida credenciales y genera token JWT
- `me(req)`: Retorna datos del usuario desde el token decodificado

**Dependencias**: bcryptjs (hashing), jsonwebtoken (tokens), Prisma (Usuario model)

---

#### 3.2 Dashboard
**Ubicación**: `backend/src/modules/dashboard/`

**Archivos**:
- `dashboard.routes.js`: Endpoints de KPIs y métricas
- `dashboard.controller.js`: Cálculos de indicadores

**Endpoints**:
- `GET /api/dashboard/kpis`: KPIs principales (vehículos, conductores, incidentes)
- `GET /api/dashboard/accidentalidad`: Datos de accidentalidad por mes
- `GET /api/dashboard/alertas`: Alertas recientes no leídas
- `GET /api/dashboard/cumplimiento`: Porcentaje de cumplimiento PESV
- `GET /api/dashboard/costos`: Costos estimados de incidentes
- `PATCH /api/dashboard/alertas/:id/leer`: Marcar alerta como leída

**Funciones principales**:
- `kpis()`: Calcula conteos de vehículos, conductores, incidentes, capacitaciones
- `accidentalidad()`: Agrupa incidentes por mes y severidad
- `alertasRecientes()`: Retorna alertas no leídas ordenadas por fecha
- `cumplimiento()`: Calcula porcentaje de cumplimiento de indicadores
- `costos()`: Suma costos estimados de incidentes

**Dependencias**: Prisma (múltiples modelos)

---

#### 3.3 IA (Inteligencia Artificial)
**Ubicación**: `backend/src/modules/ia/`

**Archivos**:
- `ia.routes.js`: Endpoints para generación con Claude
- `ia.controller.js`: Lógica de integración con Anthropic Claude
- `claude.service.js`: Servicio de comunicación con API de Claude

**Endpoints**:
- `POST /api/ia/generar-documento`: Genera documento PESV con IA
- `POST /api/ia/consulta-normativa`: Consulta normativa PESV
- `POST /api/ia/investigar-incidente/:incidenteId`: Analiza causas de incidente
- `POST /api/ia/generar-informe-ejecutivo`: Genera informe mensual

**Funciones principales**:
- `generarDocumento(tipo, contexto)`: Genera política, procedimientos o actas
- `consultaNormativa(pregunta)`: Responde dudas sobre Resolución 40595
- `investigarIncidente(incidenteId)`: Analiza causas y recomienda acciones
- `generarInformeEjecutivo(datos)`: Genera resumen ejecutivo mensual

**Dependencias**: @anthropic-ai/sdk, Prisma

---

#### 3.4 Conductores
**Ubicación**: `backend/src/modules/conductores/`

**Endpoints**:
- `GET /api/conductores`: Lista todos los conductores
- `POST /api/conductores`: Crea nuevo conductor
- `GET /api/conductores/:id`: Obtiene conductor por ID
- `PATCH /api/conductores/:id`: Actualiza conductor
- `DELETE /api/conductores/:id`: Elimina conductor

**Funciones principales**: CRUD completo de conductores con validación de licencia

**Dependencias**: Prisma (Conductor, Usuario models)

---

#### 3.5 Vehículos
**Ubicación**: `backend/src/modules/vehiculos/`

**Endpoints**:
- `GET /api/vehiculos`: Lista todos los vehículos
- `POST /api/vehiculos`: Crea nuevo vehículo
- `GET /api/vehiculos/:id`: Obtiene vehículo por ID
- `PATCH /api/vehiculos/:id`: Actualiza vehículo
- `DELETE /api/vehiculos/:id`: Elimina vehículo

**Funciones principales**: CRUD de vehículos con validación de SOAT y tecnomecánica

**Dependencias**: Prisma (Vehiculo model)

---

#### 3.6 Documentos
**Ubicación**: `backend/src/modules/documentos/`

**Endpoints**:
- `GET /api/documentos`: Lista documentos
- `POST /api/documentos`: Crea documento
- `GET /api/documentos/:id`: Obtiene documento
- `PATCH /api/documentos/:id`: Actualiza documento
- `DELETE /api/documentos/:id`: Elimina documento

**Funciones principales**: Gestión documental con versionamiento y estados

**Dependencias**: Prisma (Documento, VersionDocumento models)

---

#### 3.7 Riesgos
**Ubicación**: `backend/src/modules/riesgos/`

**Endpoints**:
- `GET /api/riesgos`: Lista riesgos
- `POST /api/riesgos`: Crea riesgo
- `GET /api/riesgos/matriz`: Retorna matriz de riesgos
- `PATCH /api/riesgos/:id`: Actualiza riesgo
- `DELETE /api/riesgos/:id`: Elimina riesgo

**Funciones principales**: Gestión de riesgos con cálculo de nivel de riesgo (probabilidad × impacto)

**Dependencias**: Prisma (Riesgo, Diagnostico models)

---

#### 3.8 Capacitaciones
**Ubicación**: `backend/src/modules/capacitaciones/`

**Endpoints**:
- `GET /api/capacitaciones`: Lista capacitaciones
- `POST /api/capacitaciones`: Crea capacitación
- `POST /api/capacitaciones/:id/inscribir`: Inscribe usuario
- `POST /api/capacitaciones/:id/evaluar`: Evalúa usuario

**Funciones principales**: Gestión de capacitaciones con evaluaciones y certificados

**Dependencias**: Prisma (Capacitacion, UsuarioCapacitacion, Pregunta models)

---

#### 3.9 Incidentes
**Ubicación**: `backend/src/modules/incidentes/`

**Endpoints**:
- `GET /api/incidentes`: Lista incidentes
- `POST /api/incidentes`: Reporta incidente
- `GET /api/incidentes/estadisticas`: Estadísticas de incidentes
- `PATCH /api/incidentes/:id`: Actualiza incidente

**Funciones principales**: Registro y seguimiento de siniestros viales

**Dependencias**: Prisma (Incidente, FotoIncidente models)

---

#### 3.10 Otros módulos backend
- **Comité**: Gestión de comité de seguridad vial y reuniones
- **Diagnóstico**: Diagnóstico inicial de seguridad vial
- **Plan de trabajo**: Plan anual de actividades PESV
- **Emergencias**: Plan de emergencias y respuesta
- **Desplazamientos**: Registro de viajes y rutas
- **Mantenimientos**: Gestión de mantenimiento vehicular
- **Acciones correctivas**: Seguimiento de acciones post-incidente
- **Reporte autogestión**: Indicadores Paso 20
- **Auditoría**: Auditorías anuales PESV
- **Usuarios**: Gestión de usuarios y roles

---

### Frontend - Páginas Principales

#### 3.11 Login
**Ubicación**: `frontend/src/pages/Login.jsx`

**Props**: Ninguna (página pública)

**Estado interno**:
- `email`: String - Email del usuario
- `password`: String - Contraseña del usuario
- `loading`: Boolean - Estado de carga
- `error`: String - Mensaje de error

**Funciones principales**:
- `handleLogin()`: Envía credenciales a API y almacena token
- Navegación a /dashboard tras login exitoso

**Dependencias**: auth.service, useAuthStore, react-hook-form

---

#### 3.12 Dashboard
**Ubicación**: `frontend/src/pages/Dashboard.jsx`

**Props**: Ninguna

**Estado interno**:
- `kpis`: Object - KPIs principales
- `accidentalidad`: Array - Datos de accidentalidad
- `alertas`: Array - Alertas no leídas
- `loading`: Boolean - Estado de carga

**Funciones principales**:
- `fetchKpis()`: Obtiene KPIs del dashboard
- `fetchAccidentalidad()`: Obtiene datos de accidentalidad
- `fetchAlertas()`: Obtiene alertas recientes
- `marcarLeida(id)`: Marca alerta como leída

**Dependencias**: dashboard.service, Recharts (gráficos)

---

#### 3.13 Asistente IA
**Ubicación**: `frontend/src/pages/AsistenteIA.jsx`

**Props**: Ninguna

**Estado interno**:
- `messages`: Array - Historial de conversación
- `input`: String - Input del usuario
- `loading`: Boolean - Estado de carga

**Funciones principales**:
- `sendMessage()`: Envía mensaje a API de IA
- `generarDocumento(tipo)`: Genera documento específico
- `investigarIncidente(id)`: Analiza incidente con IA

**Dependencias**: ia.service, componentes de chat

---

#### 3.14 Documentos
**Ubicación**: `frontend/src/pages/Documentos.jsx`

**Props**: Ninguna

**Estado interno**:
- `documentos`: Array - Lista de documentos
- `filtro`: String - Filtro de búsqueda
- `modalOpen`: Boolean - Estado del modal

**Funciones principales**:
- `fetchDocumentos()`: Obtiene documentos
- `crearDocumento(data)`: Crea nuevo documento
- `generarConIA(tipo)`: Genera documento con IA
- `eliminarDocumento(id)`: Elimina documento

**Dependencias**: documentos.service, ia.service

---

#### 3.15 Riesgos
**Ubicación**: `frontend/src/pages/Riesgos.jsx`

**Props**: Ninguna

**Estado interno**:
- `riesgos`: Array - Lista de riesgos
- `matriz`: Object - Matriz de riesgos
- `filtroCategoria`: String - Filtro por categoría

**Funciones principales**:
- `fetchRiesgos()`: Obtiene riesgos
- `fetchMatriz()`: Obtiene matriz de riesgos
- `crearRiesgo(data)`: Crea riesgo
- `calcularNivel(probabilidad, impacto)`: Calcula nivel de riesgo

**Dependencias**: riesgos.service

---

#### 3.16 Capacitaciones
**Ubicación**: `frontend/src/pages/Capacitaciones.jsx`

**Props**: Ninguna

**Estado interna**:
- `capacitaciones`: Array - Lista de capacitaciones
- `inscripciones`: Array - Inscripciones del usuario
- `evaluacionActiva`: Object - Evaluación en curso

**Funciones principales**:
- `fetchCapacitaciones()`: Obtiene capacitaciones
- `inscribir(id)`: Inscribe usuario en capacitación
- `iniciarEvaluacion(id)`: Inicia evaluación
- `enviarRespuestas(respuestas)`: Envía respuestas de evaluación

**Dependencias**: capacitaciones.service

---

#### 3.17 Incidentes
**Ubicación**: `frontend/src/pages/Incidentes.jsx`

**Props**: Ninguna

**Estado interno**:
- `incidentes`: Array - Lista de incidentes
- `estadisticas`: Object - Estadísticas agregadas
- `filtroEstado`: String - Filtro por estado

**Funciones principales**:
- `fetchIncidentes()`: Obtiene incidentes
- `reportarIncidente(data)`: Reporta nuevo incidente
- `investigarConIA(id)`: Analiza incidente con IA
- `actualizarEstado(id, estado)`: Actualiza estado

**Dependencias**: incidentes.service, ia.service

---

#### 3.18 Vehículos
**Ubicación**: `frontend/src/pages/Vehiculos.jsx`

**Props**: Ninguna

**Estado interno**:
- `vehiculos`: Array - Lista de vehículos
- `filtroEstado`: String - Filtro por estado

**Funciones principales**:
- `fetchVehiculos()`: Obtiene vehículos
- `crearVehiculo(data)`: Crea vehículo
- `actualizarVehiculo(id, data)`: Actualiza vehículo
- `eliminarVehiculo(id)`: Elimina vehículo

**Dependencias**: vehiculos.service

---

#### 3.19 Conductores
**Ubicación**: `frontend/src/pages/Conductores.jsx`

**Props**: Ninguna

**Estado interno**:
- `conductores`: Array - Lista de conductores
- `filtroEstado`: String - Filtro por estado

**Funciones principales**:
- `fetchConductores()`: Obtiene conductores
- `crearConductor(data)`: Crea conductor
- `actualizarConductor(id, data)`: Actualiza conductor

**Dependencias**: conductores.service

---

### Frontend - Componentes Reutilizables

#### 3.20 Layout Components
**Ubicación**: `frontend/src/components/layout/`

**Componentes**:
- `Sidebar.jsx`: Barra lateral de navegación
- `Header.jsx`: Encabezado con información de usuario
- `Layout.jsx`: Layout principal que envuelve las páginas

**Props**:
- `Sidebar`: `collapsed` (Boolean), `onToggle` (Function)
- `Header`: `user` (Object), `onLogout` (Function)

---

#### 3.21 UI Components
**Ubicación**: `frontend/src/components/ui/`

**Componentes**:
- `Button.jsx`: Botón con variantes
- `Input.jsx`: Campo de entrada
- `Modal.jsx`: Modal reutilizable
- `Card.jsx`: Tarjeta contenedora
- `Table.jsx`: Tabla con paginación
- `Badge.jsx`: Etiqueta de estado

---

### Frontend - Hooks Personalizados

#### 3.22 useAuth
**Ubicación**: `frontend/src/hooks/useAuth.js`

**Retorna**:
- `user`: Object - Usuario autenticado
- `token`: String - Token JWT
- `loading`: Boolean - Estado de carga
- `login(email, password)`: Function - Inicia sesión
- `logout()`: Function - Cierra sesión

**Dependencias**: authStore, auth.service

---

#### 3.23 useRole
**Ubicación**: `frontend/src/hooks/useRole.js`

**Parámetros**: `roles` (Array de strings)

**Retorna**: `hasRole` (Boolean) - Indica si el usuario tiene alguno de los roles

**Dependencias**: authStore

---

### Frontend - Store

#### 3.24 authStore (Zustand)
**Ubicación**: `frontend/src/store/authStore.js`

**Estado**:
- `user`: Object - Usuario autenticado (persistido en localStorage)
- `token`: String - Token JWT (persistido en localStorage)

**Acciones**:
- `setAuth(user, token)`: Establece autenticación
- `logout()`: Limpia autenticación

**Persistencia**: localStorage con claves `pesv_user` y `pesv_token`

---

## 4. Flujos Principales de la Aplicación

### 4.1 Flujo de Autenticación

1. **Login**:
   - Usuario ingresa email y contraseña en `/login`
   - Frontend envía `POST /api/auth/login` con credenciales
   - Backend valida con bcrypt y genera token JWT (expira en 7d)
   - Backend retorna `{ user, token }`
   - Frontend almacena en localStorage y Zustand store
   - Usuario redirigido a `/dashboard`

2. **Verificación de token**:
   - Cada request protegido incluye header `Authorization: Bearer <token>`
   - Middleware `auth.middleware.js` verifica y decodifica token
   - Si inválido, retorna 401
   - Si válido, agrega `req.user` con datos del usuario

3. **Logout**:
   - Usuario cierra sesión
   - Frontend limpia localStorage y Zustand store
   - Redirige a `/login`

---

### 4.2 Flujo de Carga de Datos del Dashboard

1. **Usuario accede a `/dashboard`**
2. **Componente Dashboard monta**
3. **Efecto `useEffect` dispara fetchs paralelos**:
   - `GET /api/dashboard/kpis` → KPIs principales
   - `GET /api/dashboard/accidentalidad` → Datos por mes
   - `GET /api/dashboard/alertas` → Alertas no leídas
   - `GET /api/dashboard/cumplimiento` → Porcentaje cumplimiento
   - `GET /api/dashboard/costos` → Costos totales
4. **Backend consulta Prisma**:
   - KPIs: `count()` de múltiples modelos
   - Accidentalidad: `groupBy()` de incidentes por mes
   - Alertas: `findMany()` donde `leida: false`
5. **Frontend renderiza**:
   - Tarjetas con KPIs
   - Gráfico Recharts de accidentalidad
   - Lista de alertas con botón "Marcar leída"

---

### 4.3 Flujo de Generación de Documento con IA

1. **Usuario selecciona tipo de documento** (Política, Procedimiento, Acta)
2. **Frontend muestra formulario de contexto** (empresa, fecha, participantes)
3. **Usuario envía formulario**:
   - `POST /api/ia/generar-documento`
   - Body: `{ tipo, contexto }`
4. **Backend procesa**:
   - Construye prompt específico para Claude
   - Llama a `anthropic.messages.create()`
   - Prompt incluye contexto del PESV y normativa
5. **Claude genera documento**:
   - Retorna texto estructurado en Markdown
6. **Backend almacena**:
   - Crea registro en `Documento` con `generadoIA: true`
   - Guarda contenido generado
7. **Frontend muestra**:
   - Documento generado en editor
   - Opción de editar manualmente
   - Botón para aprobar y cambiar estado a "APROBADO"

---

### 4.4 Flujo de Reporte de Incidente

1. **Usuario accede a `/incidentes`**
2. **Click en "Reportar incidente"**
3. **Frontend muestra formulario**:
   - Tipo (accidente, near miss, daño)
   - Fecha, hora, lugar
   - Vehículo y conductor involucrados
   - Descripción
   - Lesionados, muertos
   - Fotos (opcional)
4. **Usuario envía formulario**:
   - `POST /api/incidentes`
   - Body con datos del incidente
5. **Backend procesa**:
   - Valida datos con Zod
   - Crea registro en `Incidente` con estado "REPORTADO"
   - Si hay fotos, las sube a Cloudinary
6. **Job de alertas (diario)**:
   - Verifica incidentes con estado "REPORTADO" > 7 días
   - Genera alerta si no ha sido investigado
7. **Usuario puede investigar**:
   - Click en "Investigar con IA"
   - `POST /api/ia/investigar-incidente/:id`
   - IA analiza causas y recomienda acciones
   - Estado cambia a "EN_INVESTIGACION"
8. **Cierre**:
   - Usuario completa investigación
   - Estado cambia a "CERRADO"
   - Se generan acciones correctivas

---

### 4.5 Flujo de Alertas Automáticas

1. **Job programado** (`alertas.job.js`):
   - Se ejecuta diariamente a las 6:00 AM (hora Bogotá)
   - Usando `node-cron` con timezone "America/Bogota"
2. **Verifica vehículos**:
   - Consulta todos los vehículos
   - Calcula días restantes para SOAT y tecnomecánica
   - Si ≤ 30 días: genera alerta tipo "SOAT_PROXIMO" o "TECNOMECANICA_PROXIMO"
   - Si ≤ 0 días: genera alerta tipo "SOAT_VENCIDO" o "TECNOMECANICA_VENCIDO"
   - Evita duplicados verificando alertas existentes no leídas
3. **Verifica conductores**:
   - Consulta todos los conductores
   - Calcula días restantes para licencia
   - Si ≤ 30 días: genera alerta "LICENCIA_PROXIMA"
   - Si ≤ 0 días: genera alerta "LICENCIA_VENCIDA"
4. **Verifica incidentes**:
   - Busca incidentes con estado "REPORTADO" creados hace > 7 días
   - Genera alerta "INCIDENTE_SIN_INVESTIGAR"
5. **Almacenamiento**:
   - Cada alerta se guarda en modelo `Alerta`
   - Incluye: tipo, mensaje, entidadId, entidadTipo, diasRestantes
6. **Visualización**:
   - Dashboard muestra alertas no leídas
   - Usuario puede marcar como leídas con `PATCH /api/dashboard/alertas/:id/leer`

---

### 4.6 Flujo de Capacitación y Evaluación

1. **Administrador crea capacitación**:
   - `POST /api/capacitaciones`
   - Define título, descripción, contenido, duración
   - Agrega preguntas de evaluación
2. **Conductor ve capacitaciones disponibles**:
   - `GET /api/capacitaciones`
   - Filtra por obligatorias y activas
3. **Conductor se inscribe**:
   - `POST /api/capacitaciones/:id/inscribir`
   - Crea registro en `UsuarioCapacitacion`
4. **Conductor toma evaluación**:
   - Accede a contenido de capacitación
   - Click en "Iniciar evaluación"
   - Responde preguntas
   - `POST /api/capacitaciones/:id/evaluar`
5. **Backend califica**:
   - Compara respuestas con correctas
   - Calcula puntaje
   - Si ≥ 70%: `aprobado: true`
   - Genera certificado (PDF con PDFKit)
6. **Registro de asistencia**:
   - Administrador marca asistencia en sesión presencial
   - `POST /api/capacitaciones/:id/asistencia`
   - Guarda en `AsistenciaCapacitacion`

---

## 5. Variables de Entorno y Configuración

### Backend (.env)

| Variable | Descripción | Obligatoria | Valor por defecto |
|----------|-------------|-------------|-------------------|
| `DATABASE_URL` | URL de conexión a base de datos | Sí | - |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | Sí | - |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token JWT | No | `7d` |
| `GEMINI_API_KEY` | API Key de Google Gemini (alternativa IA) | No | - |
| `ANTHROPIC_API_KEY` | API Key de Anthropic Claude (IA principal) | Sí | - |
| `PORT` | Puerto del servidor backend | No | `3001` |
| `NODE_ENV` | Entorno de ejecución | No | `development` |

**Ejemplo de configuración**:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pesv_db
JWT_SECRET=pesv_jwt_secret_2024_cambia_esto_en_produccion
JWT_EXPIRES_IN=7d
ANTHROPIC_API_KEY=sk-ant-api03-TU_CLAVE_REAL_AQUI
PORT=3001
NODE_ENV=development
```

> ⚠️ **Revisar**: En producción, `JWT_SECRET` debe ser una cadena aleatoria larga y `DATABASE_URL` debe apuntar a una base de datos PostgreSQL segura.

### Frontend (.env)

| Variable | Descripción | Obligatoria | Valor por defecto |
|----------|-------------|-------------|-------------------|
| `VITE_API_URL` | URL base de la API backend | No | `http://localhost:3001/api` |

**Ejemplo de configuración**:
```env
VITE_API_URL=http://localhost:3001/api
```

---

## 6. Instalación y Ejecución Local

### Requisitos previos

- **Node.js**: 20.x o superior
- **npm**: 9.x o superior (viene con Node.js)
- **Docker Desktop**: Para PostgreSQL (opcional, puede usar PostgreSQL instalado localmente)
- **Cuenta en Anthropic Console**: Para obtener API Key de Claude

### Paso 1 - Levantar la base de datos

**Opción A: Con Docker (recomendado)**
```bash
docker compose up -d
docker ps  # Verificar que esté corriendo
```

**Opción B: PostgreSQL local**
- Instalar PostgreSQL 16
- Crear base de datos `pesv_db`
- Configurar `DATABASE_URL` en `.env`

### Paso 2 - Configurar el backend

```bash
cd backend
npm install
```

**Configurar variables de entorno**:
```bash
cp .env.example .env
# Editar .env con tus valores reales
```

**Generar cliente Prisma y aplicar esquema**:
```bash
npx prisma generate
npx prisma db push
```

**Cargar datos de prueba**:
```bash
npm run seed
```

**Iniciar servidor de desarrollo**:
```bash
npm run dev
```

El backend estará disponible en: http://localhost:3001

Health check: http://localhost:3001/api/health

### Paso 3 - Configurar el frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

### Comandos disponibles

**Backend**:
```bash
npm start          # Inicia servidor en producción
npm run dev        # Inicia servidor en desarrollo (nodemon)
npm run seed       # Carga datos de prueba
npm run db:push    # Aplica esquema a base de datos
npm run db:generate # Genera cliente Prisma
npm run db:studio  # Abre Prisma Studio (UI de base de datos)
```

**Frontend**:
```bash
npm run dev        # Inicia servidor de desarrollo (Vite)
npm run build      # Compila para producción
npm run preview    # Previsualiza build de producción
```

### Credenciales de acceso (seed)

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Administrador | admin@pesv.co | admin123 |
| Líder PESV | lider@pesv.co | lider123 |
| Gerente | gerente@pesv.co | gerente123 |
| Conductor | c1@pesv.co | cond123 |

---

## 7. Decisiones Técnicas Importantes

### 7.1 Elección de Prisma ORM

**Por qué se eligió**:
- Type-safe: Autocompletado y validación de tipos en tiempo de desarrollo
- Migrations integradas: Gestión de esquema de base de datos controlada
- Multi-database: Soporta PostgreSQL y SQLite (facilita desarrollo local)
- Query builder intuitivo: Sintaxis más clara que SQL raw

**Patrón aplicado**: Cada módulo tiene su propio controller que usa `prisma` singleton desde `config/db.js`.

---

### 7.2 Elección de Zustand para estado global

**Por qué se eligió**:
- Más ligero que Redux: Menos boilerplate
- API simple: No necesita providers ni actions/thunks
- Persistencia integrada: Fácil integración con localStorage
- TypeScript-friendly: Buen soporte de tipos

**Patrón aplicado**: Solo se usa para autenticación (`authStore`). El estado local de componentes se maneja con `useState`.

---

### 7.3 Elección de Claude (Anthropic) para IA

**Por qué se eligió**:
- Contexto largo: Soporta hasta 200K tokens (útil para documentos largos)
- Mejor en español: Claude tiene excelente rendimiento en español
- API estable: Menos alucinaciones que otros modelos
- Costo razonable: Precios competitivos para uso empresarial

**Patrón aplicado**: Servicio centralizado `claude.service.js` que maneja todas las llamadas a la API de Claude con prompts específicos para cada tipo de documento.

---

### 7.4 Arquitectura de módulos en backend

**Por qué se eligió**:
- Separación de responsabilidades: Cada módulo es independiente
- Escalabilidad: Fácil agregar nuevos módulos sin afectar existentes
- Mantenibilidad: Código organizado por dominio de negocio
- Testabilidad: Cada módulo puede testearse independientemente

**Patrón aplicado**: Estructura `modules/{nombre}/` con `routes.js` y `controller.js` para cada dominio de negocio.

---

### 7.5 Uso de node-cron para alertas

**Por qué se eligió**:
- Integración nativa con Node.js: No requiere servicios externos
- Timezone support: Permite ejecutar en hora Bogotá
- Simple: Sintaxis cron familiar y fácil de configurar

**Patrón aplicado**: Job `alertas.job.js` que se inicia en `server.js` y se ejecuta diariamente a las 6:00 AM.

---

### 7.6 Validación con Zod

**Por qué se eligió**:
- Type-safe: Inferencia de tipos TypeScript automática
- Sintaxis intuitiva: Más fácil que Joi o Yup
- Lightweight: Menos overhead que otras librerías

> ⚠️ **Revisar**: Actualmente Zod no se usa extensivamente en el código. Se recomienda agregar validación Zod en todos los controllers para mejorar robustez.

---

### 7.7 Deuda técnica conocida

1. **Base de datos SQLite en desarrollo**: El schema.prisma configura SQLite pero el README indica PostgreSQL. Esto puede causar confusión.
   - **Recomendación**: Usar PostgreSQL también en desarrollo para consistencia.

2. **Falta de tests**: No hay pruebas unitarias ni de integración.
   - **Recomendación**: Agregar Jest para backend y Vitest para frontend.

3. **Manejo de errores básico**: El error handler es genérico.
   - **Recomendación**: Implementar errores específicos por dominio y códigos HTTP apropiados.

4. **No hay logging estructurado**: Solo `console.log` y `console.error`.
   - **Recomendación**: Implementar Winston o Pino para logging en producción.

5. **Falta de internacionalización**: Todo el texto está hardcoded en español.
   - **Recomendación**: Implementar i18n para soportar múltiples idiomas.

---

## 8. Glosario

### Términos del dominio PESV

| Término | Definición |
|---------|------------|
| **PESV** | Plan Estratégico de Seguridad Vial. Documento obligatorio para empresas de transporte en Colombia según Resolución 40595 de 2022. |
| **Resolución 40595 de 2022** | Normativa del Ministerio de Transporte de Colombia que establece los requisitos para implementar un PESV. |
| **Nivel de madurez PESV** | Clasificación de las empresas en 4 niveles: Básico, Intermedio, Estándar y Avanzado, según cumplimiento de indicadores. |
| **Comité de Seguridad Vial** | Grupo interno de la empresa responsable de liderar la implementación del PESV (Paso 1 y 2). |
| **Diagnóstico de seguridad vial** | Evaluación inicial de la empresa para identificar riesgos y estado actual (Paso 5 y 6). |
| **Matriz de riesgos** | Herramienta para evaluar riesgos según probabilidad e impacto, determinando nivel de riesgo (Bajo, Medio, Alto, Crítico). |
| **Programa de riesgos críticos** | Plan de gestión para riesgos con nivel Alto o Crítico (Paso 8). |
| **Plan anual de trabajo** | Documento que planifica actividades PESV para un año calendario (Paso 9). |
| **SOAT** | Seguro Obligatorio de Accidentes de Tránsito. Documento obligatorio para todos los vehículos en Colombia. |
| **Tecnomecánica** | Revisión técnico-mecánica obligatoria para vehículos en Colombia. |
| **Siniestro** | Incidente de tránsito con consecuencias (lesiones, muertes, daños). |
| **Near miss** | Casi-accidente: incidente que pudo causar daño pero no lo hizo. |
| **Incidente** | Cualquier evento relacionado con seguridad vial, incluyendo siniestros y near misses. |
| **Investigación de incidentes** | Análisis sistemático para identificar causas raíz y acciones correctivas (Paso 13). |
| **Causas directas** | Causas inmediatas de un incidente (ej: exceso de velocidad, falla mecánica). |
| **Causas básicas** | Causas subyacentes que permiten las causas directas (ej: falta de capacitación, cultura de seguridad). |
| **Acciones correctivas** | Medidas tomadas para prevenir recurrencia de incidentes (Paso 23). |
| **Capacitación** | Proceso de formación en seguridad vial para conductores y personal (Paso 15-18). |
| **Plan de emergencias** | Documento que define procedimientos de respuesta ante emergencias (Paso 12). |
| **Desplazamiento laboral** | Viaje realizado por un conductor en vehículo de la empresa (Paso 15). |
| **Mantenimiento** | Actividades de mantenimiento preventivo y correctivo de vehículos (Paso 17). |
| **Inspección vehicular** | Revisión periódica del estado de vehículos (Paso 16). |
| **Indicadores de autogestión** | Métricas que miden el cumplimiento del PESV (Paso 20). |
| **Reporte de autogestión** | Informe mensual que se envía al Ministerio de Transporte con indicadores PESV. |
| **Auditoría PESV** | Evaluación anual externa del cumplimiento del PESV (Paso 22). |
| **Mejora continua** | Proceso sistemático de mejora del PESV basado en auditorías y retroalimentación. |
| **Líder PESV** | Persona designada por la empresa para liderar la implementación del PESV. |
| **Gerente de flota** | Responsable de la gestión operativa de vehículos y conductores. |
| **Conductor** | Persona autorizada para operar vehículos de la empresa. |
| **Licencia de conducción** | Documento que autoriza a una persona para conducir vehículos. |
| **Categoría de licencia** | Clasificación de la licencia según tipo de vehículo (A1, A2, B1, B2, C1, C2, C3). |
| **Exceso de velocidad** | Violación de límites de velocidad establecidos. |
| **Jornada excedida** | Exceso de horas de conducción permitidas por ley. |
| **Factor de riesgo** | Condición o situación que puede causar un incidente. |
| **Control existente** | Medida ya implementada para mitigar un riesgo. |
| **Nivel de riesgo** | Resultado de multiplicar probabilidad por impacto (1-25). |
| **Probabilidad** | Likelihood de que ocurra un evento (1-5). |
| **Impacto** | Severidad de las consecuencias si ocurre el evento (1-5). |
| **Riesgo crítico** | Riesgo con nivel ≥ 15 que requiere atención inmediata. |
| **Riesgo alto** | Riesgo con nivel 10-14. |
| **Riesgo medio** | Riesgo con nivel 5-9. |
| **Riesgo bajo** | Riesgo con nivel 1-4. |
| **KPI** | Key Performance Indicator. Indicador clave de desempeño. |
| **Cloudinary** | Servicio de almacenamiento de imágenes en la nube. |
| **JWT** | JSON Web Token. Estándar para tokens de autenticación. |
| **Middleware** | Software que intercepta requests/responses en Express. |
| **ORM** | Object-Relational Mapping. Mapeo objeto-relacional (Prisma). |
| **Seed** | Datos iniciales cargados en la base de datos para pruebas. |
| **Cron job** | Tarea programada que se ejecuta en intervalos regulares. |
| **Hook** | Función especial en React que permite usar estado y otras features. |
| **Store** | Almacén de estado global (Zustand). |
| **Service** | Capa de servicios que encapsula llamadas a API. |
| **Controller** | Capa que maneja lógica de negocio en backend. |
| **Route** | Definición de endpoint HTTP en backend. |
| **Componente** | Unidad reutilizable de UI en React. |
| **Props** | Propiedades pasadas a componentes React. |
| **Estado** | Datos que pueden cambiar en un componente React. |
| **Effect** | Efecto secundario en React (useEffect). |

---

## Apéndice A: Modelos de Base de Datos

### Resumen de modelos Prisma

El esquema de base de datos contiene 26 modelos principales:

**Usuarios y roles**:
- `Usuario`: Usuarios del sistema con roles (ADMIN, LIDER_PESV, GERENTE, CONDUCTOR)
- `Conductor`: Información extendida de conductores

**Comité de seguridad vial**:
- `ComiteSeguridadVial`: Comité principal
- `MiembroComite`: Miembros del comité
- `ReunionComite`: Reuniones del comité

**Vehículos**:
- `Vehiculo`: Flota de vehículos
- `VehiculoConductor`: Asignaciones conductor-vehículo
- `InspeccionVehiculo`: Inspecciones periódicas
- `Mantenimiento`: Registro de mantenimientos

**Gestión documental**:
- `Documento`: Documentos PESV
- `VersionDocumento`: Historial de versiones

**Riesgos**:
- `Diagnostico`: Diagnóstico inicial
- `Riesgo`: Registro de riesgos
- `ProgramaRiesgoCritico`: Programas para riesgos críticos

**Planificación**:
- `PlanAnualTrabajo`: Plan anual de actividades

**Capacitaciones**:
- `Capacitacion`: Cursos de formación
- `Pregunta`: Preguntas de evaluación
- `UsuarioCapacitacion`: Inscripciones y resultados
- `AsistenciaCapacitacion`: Registro de asistencia

**Emergencias**:
- `PlanEmergencia`: Plan de respuesta a emergencias

**Incidentes**:
- `Incidente`: Registro de siniestros
- `FotoIncidente`: Evidencia fotográfica

**Desplazamientos**:
- `Desplazamiento`: Registro de viajes

**Mejora continua**:
- `AccionCorrectiva`: Acciones post-incidente
- `ReporteAutogestion`: Indicadores mensuales
- `Auditoria`: Auditorías anuales

**Sistema**:
- `Alerta`: Alertas automáticas

---

## Apéndice B: Endpoints API Completos

### Autenticación
- `POST /api/auth/login`
- `GET /api/auth/me`

### Dashboard
- `GET /api/dashboard/kpis`
- `GET /api/dashboard/accidentalidad`
- `GET /api/dashboard/alertas`
- `GET /api/dashboard/cumplimiento`
- `GET /api/dashboard/costos`
- `PATCH /api/dashboard/alertas/:id/leer`

### Usuarios
- `GET /api/usuarios`
- `POST /api/usuarios`
- `GET /api/usuarios/:id`
- `PATCH /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

### Conductores
- `GET /api/conductores`
- `POST /api/conductores`
- `GET /api/conductores/:id`
- `PATCH /api/conductores/:id`
- `DELETE /api/conductores/:id`

### Vehículos
- `GET /api/vehiculos`
- `POST /api/vehiculos`
- `GET /api/vehiculos/:id`
- `PATCH /api/vehiculos/:id`
- `DELETE /api/vehiculos/:id`

### Documentos
- `GET /api/documentos`
- `POST /api/documentos`
- `GET /api/documentos/:id`
- `PATCH /api/documentos/:id`
- `DELETE /api/documentos/:id`

### Riesgos
- `GET /api/riesgos`
- `POST /api/riesgos`
- `GET /api/riesgos/matriz`
- `PATCH /api/riesgos/:id`
- `DELETE /api/riesgos/:id`

### Capacitaciones
- `GET /api/capacitaciones`
- `POST /api/capacitaciones`
- `POST /api/capacitaciones/:id/inscribir`
- `POST /api/capacitaciones/:id/evaluar`

### Incidentes
- `GET /api/incidentes`
- `POST /api/incidentes`
- `GET /api/incidentes/estadisticas`
- `PATCH /api/incidentes/:id`

### IA
- `POST /api/ia/generar-documento`
- `POST /api/ia/consulta-normativa`
- `POST /api/ia/investigar-incidente/:incidenteId`
- `POST /api/ia/generar-informe-ejecutivo`

### Comité
- `GET /api/comite`
- `POST /api/comite`
- `GET /api/comite/reuniones`
- `POST /api/comite/reuniones`

### Diagnóstico
- `GET /api/diagnostico`
- `POST /api/diagnostico`

### Plan de trabajo
- `GET /api/plan-trabajo`
- `POST /api/plan-trabajo`

### Emergencias
- `GET /api/emergencias`
- `POST /api/emergencias`

### Desplazamientos
- `GET /api/desplazamientos`
- `POST /api/desplazamientos`

### Mantenimientos
- `GET /api/mantenimientos`
- `POST /api/mantenimientos`

### Acciones correctivas
- `GET /api/acciones-correctivas`
- `POST /api/acciones-correctivas`
- `PATCH /api/acciones-correctivas/:id`

### Reporte autogestión
- `GET /api/reporte-autogestion`
- `POST /api/reporte-autogestion`

### Auditoría
- `GET /api/auditoria`
- `POST /api/auditoria`

---

**Fin del documento**

*Documentación generada automáticamente - PESV Digital v1.0*
*Fecha: Junio 2026*
