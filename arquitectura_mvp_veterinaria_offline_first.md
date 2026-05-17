# Arquitectura MVP — Sistema Veterinario Offline First

## Objetivo del proyecto

Diseñar un sistema extremadamente liviano, económico y fácil de mantener para el registro rápido de pacientes veterinarios.

La idea principal no es reemplazar sistemas como HOPS, sino resolver el problema operativo real:

- Registro manual en papel
- Doble digitación
- Retrasos al pasar información al sistema
- Pérdida de datos
- Dependencia del tiempo del personal

La solución propuesta se basa en una arquitectura:

- Offline First
- Eventualmente consistente
- Cacheada localmente
- De bajo costo
- Fácil de desplegar y mantener

---

# Problema identificado

Actualmente el flujo operativo es:

1. Llega un paciente
2. Se llena una bitácora en papel
3. El veterinario atiende
4. Más tarde alguien intenta pasar los datos al software principal

Problemas:

- Muchas veces no da tiempo
- Se pierde información
- Hay errores humanos
- El sistema principal deja de reflejar la realidad
- Existe doble trabajo

El verdadero problema no es la ausencia de software.

El problema es que el software actual no está optimizado para captura rápida en recepción.

---

# Filosofía de la solución

La aplicación debe:

- Funcionar incluso sin internet
- Ser extremadamente rápida
- No bloquear al usuario esperando respuestas del backend
- Guardar información localmente
- Sincronizar después sin presión

El frontend será la pieza principal del sistema.

El backend será solamente un servicio de sincronización.

---

# Stack Tecnológico

## Frontend

### React

Se utilizará React para la interfaz.

### ¿Por qué React?

- Ecosistema maduro
- Rápido desarrollo
- Gran compatibilidad con PWAs
- Excelente soporte para estados locales
- Integración sencilla con IndexedDB
- Amplia comunidad
- Fácil mantenimiento

Además, React permite construir interfaces extremadamente rápidas y minimalistas para recepción.

---

## Vite

Se utilizará Vite como bundler.

### ¿Por qué Vite?

- Inicio instantáneo del proyecto
- Hot reload extremadamente rápido
- Menor consumo de recursos
- Build optimizado
- Excelente integración con React

---

# Estrategia Offline First

## IndexedDB

Toda la información se almacenará primero localmente usando IndexedDB.

### ¿Por qué IndexedDB?

Porque:

- Está diseñada para almacenamiento persistente
- Funciona offline
- Soporta grandes volúmenes de datos
- Es asíncrona
- Es estable en navegadores modernos
- Mucho más robusta que LocalStorage

---

## Dexie.js

Dexie será la capa de abstracción sobre IndexedDB.

### ¿Por qué Dexie?

Trabajar directamente con IndexedDB es complejo.

Dexie simplifica:

- Queries
- Relaciones
- Versionado
- Sincronización
- Búsquedas
- Operaciones batch

Ejemplo conceptual:

```ts
await db.patients.add({
  name: 'Firulais',
  synced: false
})
```

---

# Arquitectura de sincronización

La aplicación NO dependerá del backend para funcionar.

## Flujo operativo

```text
Recepcionista llena formulario
        ↓
Datos guardados localmente
        ↓
Paciente queda registrado inmediatamente
        ↓
Sync worker envía información después
```

Esto permite:

- Experiencia instantánea
- Funcionamiento offline
- Reducir presión sobre backend
- Evitar pérdida de datos
- Mejor UX para recepción

---

# Backend

## NestJS

El backend será construido con NestJS.

### ¿Por qué NestJS?

- Arquitectura modular
- Escalable
- Excelente estructura empresarial
- Integración sencilla con Fastify
- Muy mantenible
- Soporte TypeScript nativo
- Ideal para crecimiento futuro

Además, permite evolucionar fácilmente hacia:

- OCR
- IA
- Integraciones externas
- WhatsApp
- Notificaciones
- Facturación
- Microservicios

---

## Fastify

NestJS utilizará Fastify como motor HTTP.

### ¿Por qué Fastify?

- Mucho más rápido que Express
- Menor consumo de memoria
- Mejor throughput
- Ideal para infraestructura económica
- Excelente rendimiento en VPS pequeños

---

# Base de datos

## Turso + SQLite

La base de datos recomendada es Turso.

### ¿Qué es Turso?

Turso es una plataforma basada en SQLite distribuido.

### ¿Por qué Turso?

Porque encaja perfectamente con una arquitectura Offline First.

Ventajas:

- Muy económica
- Plan gratuito suficiente para MVP
- Mantenimiento casi nulo
- SQLite es extremadamente estable
- Baja latencia
- Fácil de desplegar
- Muy buena para sistemas ligeros

---

# ¿Por qué NO PostgreSQL inicialmente?

Aunque PostgreSQL es excelente:

- Sería overkill para este problema
- Mayor complejidad operativa
- Mayor costo futuro
- Mayor consumo de recursos

El sistema inicialmente manejará:

- Formularios
- Texto
- Consultas simples
- Sincronización ligera

SQLite es más que suficiente.

---

# Estrategia de sincronización

Cada registro tendrá un estado:

```ts
{
  synced: false,
  createdAt: Date,
  updatedAt: Date
}
```

El sistema periódicamente buscará:

```ts
pendingRecords = records.where({ synced: false })
```

Y enviará los pendientes al backend.

---

# Ventajas de esta arquitectura

## 1. Costos extremadamente bajos

La mayor parte del trabajo ocurre en el dispositivo.

Esto reduce:

- Uso de CPU
- Uso de RAM
- Requests al servidor
- Necesidad de infraestructura potente

---

## 2. Excelente UX

El usuario nunca espera al servidor.

Todo se siente instantáneo.

---

## 3. Funciona sin internet

La veterinaria puede seguir operando incluso con internet inestable.

---

## 4. Escalable

Aunque parezca simple:

- Cada clínica genera pocos KB
- El tráfico es bajo
- La carga del backend es mínima

Esto permite escalar a múltiples clientes con costos reducidos.

---

# Posibles mejoras futuras

## OCR

Tomar una foto de la bitácora y extraer automáticamente los datos.

---

## Integración con WhatsApp

- Recordatorios
- Confirmaciones
- Consultas
- Notificaciones

---

## IA

- Clasificación automática
- Resumen clínico
- Predicción de visitas
- Asistencia veterinaria

---

## Sincronización con HOPS

A futuro puede desarrollarse:

- Integración directa
- API bridge
- Exportadores
- Automatización de migración

---

# Deploy recomendado

## Frontend

Cloudflare Pages.

### Ventajas

- Gratis
- CDN global
- Deploy rápido
- Excelente para PWAs

---

## Backend

Opciones:

- Railway
- Render
- VPS pequeño

Debido al bajo tráfico esperado, el backend puede funcionar con recursos mínimos.

---

# Estructura general de la arquitectura

```text
Frontend React PWA
        ↓
IndexedDB + Dexie
        ↓
Sync Worker
        ↓
NestJS + Fastify
        ↓
Turso (SQLite)
```

---

# Conclusión

La solución propuesta prioriza:

- Velocidad operativa
- Bajo costo
- Simplicidad
- Robustez
- Facilidad de mantenimiento

La idea central es que la veterinaria nunca dependa del backend para operar.

El backend existe únicamente para sincronizar y centralizar información.

Esto permite construir un sistema:

- Muy económico
- Muy rápido
- Fácil de usar
- Fácil de mantener
- Escalable
- Compatible con operaciones reales

La arquitectura está diseñada específicamente para resolver el problema operativo identificado en clínicas veterinarias pequeñas y medianas.

