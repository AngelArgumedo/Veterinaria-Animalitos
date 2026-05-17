# Plan de Desarrollo — Sistema Veterinario Animalitos MVP

## 1. Problema real identificado

El flujo actual del Centro Veterinario Animalitos:

```
Llega el paciente
      ↓
Se llena el volante en papel (Nombre, especie, género, peso, temp, motivo, propietario, pago)
      ↓
El veterinario atiende
      ↓
Más tarde alguien intenta pasar los datos al sistema HOPS
      ↓
No da tiempo / se pierde / se re-digita con errores
```

El volante de papel captura **14 campos clave** en ~60 segundos.
HOPS requiere llenar **dos formularios separados (~30 campos)** para lograr lo mismo.

**La solución no es reemplazar HOPS. Es digitalizar el volante de papel.**

---

## 2. Objetivo del MVP

Construir una PWA (Progressive Web App) offline-first que:

- Replique el volante de ingreso en formato digital optimizado para móvil
- Guarde los datos localmente sin necesidad de internet
- Sincronice con el backend cuando haya conexión
- Permita a la recepcionista registrar un ingreso en menos de 90 segundos desde el celular

---

## 3. Stack tecnológico

| Capa | Tecnología | Razón |
|---|---|---|
| Frontend | React + Vite | PWA, rápido, ecosistema maduro |
| Estado local | IndexedDB + Dexie.js | Offline-first, persistente, asíncrono |
| Backend | NestJS + Fastify | Modular, TypeScript nativo, rápido |
| Base de datos | Turso (SQLite) | Económico, plan gratuito, compatible offline |
| Deploy frontend | Cloudflare Pages | Gratis, CDN global, PWA ideal |
| Deploy backend | Railway / Render | Low cost, fácil CI/CD |

---

## 4. Arquitectura del sistema

```
[Móvil/Tablet - Recepción]
        │
        ▼
[React PWA + Dexie.js / IndexedDB]
        │  ← Guarda localmente al instante
        │  → Muestra "Guardado" sin esperar red
        │
   [Sync Worker]  ← Background, cuando hay internet
        │
        ▼
[NestJS + Fastify API]
        │
        ▼
[Turso - SQLite distribuido]
```

### Principio central

> El frontend ES el sistema. El backend solo sincroniza.

---

## 5. Formularios analizados

### 5.1 Volante de papel (flujo real de recepción)

```
DATOS DEL PACIENTE          │  DATOS DEL PROPIETARIO
────────────────────────────│────────────────────────
Nombre                      │  Nombre
Especie: [Canino] [Felino]  │  Documento de identidad
Género:  [Macho]  [Hembra]  │  Dirección
Estado:  [Castrado/Esteril] │  Teléfono
Edad                        │  Correo electrónico
Peso (kg)                   │  Valor total cancelado
Temperatura                 │  Método de pago
M. Consulta (motivo)        │
```

**Este es el formulario core del MVP.**

### 5.2 Formulario HOPS — Propietario (referencia)

Campos adicionales que HOPS maneja (para sincronización futura):
- Apellidos separados, Ciudad, Dirección, WhatsApp
- Tipo de documento + dígito verificador
- Ocupación, Cómo conoció la veterinaria
- Valoración (Bueno/Regular/Malo)
- Observaciones, Aceptación de notificaciones

### 5.3 Formulario HOPS — Mascota (referencia)

Campos adicionales:
- No. historia (auto), No. microchip
- Especie+Raza (dropdown combinado), Fecha nacimiento exacta
- Temperamento, Color, Alergias, Foto

---

## 6. Formulario de ingreso rápido (MVP móvil)

### Diseño de pantalla

```
┌────────────────────────────────────────┐
│  ← INGRESO RÁPIDO          [💾 local] │
├────────────────────────────────────────┤
│  PACIENTE                              │
│  ┌─────────────────────────────────┐  │
│  │ Nombre de la mascota            │  │
│  └─────────────────────────────────┘  │
│                                        │
│  Especie   [Canino] [Felino] [Otro]   │
│  Género    [Macho ] [Hembra]           │
│  Estado    [ ] Castrado/Esterilizado   │
│                                        │
│  Edad [___] años/meses                 │
│  Peso [___] kg    Temp [___] °C        │
│                                        │
│  ┌─────────────────────────────────┐  │
│  │ Motivo de consulta...           │  │
│  └─────────────────────────────────┘  │
├────────────────────────────────────────┤
│  PROPIETARIO                           │
│  ┌─────────────────────────────────┐  │
│  │ Nombre completo                 │  │
│  └─────────────────────────────────┘  │
│  ┌─────────────────────────────────┐  │
│  │ Documento                       │  │
│  └─────────────────────────────────┘  │
│  ┌─────────────────────────────────┐  │
│  │ Teléfono                        │  │
│  └─────────────────────────────────┘  │
│  ┌─────────────────────────────────┐  │
│  │ Email (opcional)                │  │
│  └─────────────────────────────────┘  │
├────────────────────────────────────────┤
│  PAGO                                  │
│  Valor [$__________]                   │
│  [Efectivo] [Tarjeta] [Transferencia] │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐ │
│  │      REGISTRAR INGRESO           │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

---

## 7. Modelo de datos

### Entidades principales

```typescript
// Ingreso (formulario principal - volante digital)
interface Ingreso {
  id: string                    // UUID local
  fecha: string                 // ISO datetime
  // Paciente
  mascotaNombre: string
  especieId: 'canino' | 'felino' | 'otro'
  razaId?: string
  genero: 'macho' | 'hembra'
  castradoEsterilizado: boolean
  edad?: string                 // "2 años", "6 meses"
  peso?: number
  temperatura?: number
  motivoConsulta?: string
  // Propietario
  propietarioNombre: string
  propietarioDocumento?: string
  propietarioTelefono?: string
  propietarioEmail?: string
  // Pago
  valorTotal?: number
  metodoPago?: 'efectivo' | 'tarjeta' | 'transferencia'
  // Sync
  synced: boolean
  createdAt: string
  updatedAt: string
}

// Propietario (perfil completo para HOPS)
interface Propietario {
  id: string
  nombres: string
  apellidos: string
  ciudad: string
  direccion?: string
  telefono?: string
  whatsapp?: string
  email?: string
  tipoDocumento?: string
  documento: string
  digitoVerificador?: string
  ocupacion?: string
  comoConociо?: string
  valoracion?: 'BUENO' | 'REGULAR' | 'MALO'
  observaciones?: string
  aceptaWhatsapp: boolean
  aceptaEmail: boolean
  synced: boolean
  createdAt: string
  updatedAt: string
}

// Mascota (perfil completo para HOPS)
interface Mascota {
  id: string
  noHistoria?: string
  noMicrochip?: string
  nombre: string
  especieId: string
  razaId?: string
  propietarioId?: string
  genero: 'MACHO' | 'HEMBRA'
  estadoReproductivo?: string
  fechaNacimiento?: string
  temperamento?: string
  peso?: number
  color?: string
  alergias?: string
  fotoUrl?: string
  synced: boolean
  createdAt: string
  updatedAt: string
}

// Especie
interface Especie {
  id: string  // 'canino' | 'felino' | 'otro'
  nombre: string
}

// Raza
interface Raza {
  id: string
  especieId: string
  nombre: string
  isCustom: boolean
  synced: boolean
}
```

---

## 8. Estrategia Especie y Raza

### Problema con HOPS
Lista plana de ~100+ ítems con formato `ESPECIE (RAZA)`. Inutilizable en móvil.

### Solución propuesta

**Desktop:** Dropdown searchable único (backward compatible con HOPS)

**Móvil:** Selector en dos pasos

```
Paso 1 — Chips de especie (horizontal, siempre visible)
  ┌─────────┐ ┌─────────┐ ┌─────────┐
  │ Canino  │ │ Felino  │ │  Otro   │
  └─────────┘ └─────────┘ └─────────┘

Paso 2 — Lista filtrada por especie + búsqueda
  ┌───────────────────────────────┐
  │ 🔍 buscar raza...            │
  └───────────────────────────────┘
  ○ Poodle
  ○ Mestizo
  ○ Golden Retriever
  ─────────────────────────────────
  + Agregar raza personalizada
```

**Datos:** Pre-cargados en IndexedDB al primer uso (seed desde backend).
Razas custom: se guardan localmente y sincronizan después.

---

## 9. Estrategia Offline-First

### Flujo de datos

```
Usuario llena formulario
        ↓
Dexie.js guarda en IndexedDB { synced: false }
        ↓
UI muestra "Guardado localmente ✓"  (instantáneo, sin esperar red)
        ↓
Sync Worker detecta { synced: false } cada 30 segundos
        ↓
Si hay internet → POST /api/v1/sync → marca { synced: true }
        ↓
Si no hay internet → reintenta en el próximo ciclo
```

### Estados de un registro

| Estado | Indicador visual |
|---|---|
| `synced: false` | Ícono nube con reloj ⏳ |
| `synced: true`  | Ícono nube con check ✓ |
| Error de sync  | Ícono nube con alerta ⚠️ |

---

## 10. Estructura del proyecto

```
Veterinaria-Animalitos/
├── PLAN.md                          ← Este archivo
├── Dockerfile                       ← Contenedor de desarrollo
├── docker-compose.yml               ← Orquestador dev (un solo contenedor)
│
├── frontend/                        ← React + Vite PWA (por scaffoldear)
│   └── .gitkeep
│
└── backend/                         ← NestJS + Fastify
    └── src/
        ├── main.ts
        ├── app.module.ts
        └── app/
            ├── core/                ← Guards, filters, interceptors globales
            ├── features/
            │   ├── ingresos/        ← Formulario rápido (volante digital)
            │   ├── propietarios/    ← Perfil completo propietario
            │   ├── mascotas/        ← Perfil completo mascota
            │   ├── especies/        ← Especies + razas + seed
            │   └── sync/            ← Endpoint de sincronización offline
            └── shared/
                └── database/        ← Drizzle ORM + Turso/SQLite
```

---

## 11. API Endpoints

### Ingresos (formulario rápido)
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/v1/ingresos` | Listar ingresos |
| `POST` | `/api/v1/ingresos` | Crear ingreso rápido |
| `GET` | `/api/v1/ingresos/:id` | Obtener ingreso |
| `PATCH` | `/api/v1/ingresos/:id` | Actualizar ingreso |

### Propietarios
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/v1/propietarios` | Listar propietarios |
| `POST` | `/api/v1/propietarios` | Crear propietario |
| `GET` | `/api/v1/propietarios/:id` | Obtener propietario |
| `PATCH` | `/api/v1/propietarios/:id` | Actualizar propietario |
| `GET` | `/api/v1/propietarios/buscar?q=` | Búsqueda por nombre/doc |

### Mascotas
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/v1/mascotas` | Listar mascotas |
| `POST` | `/api/v1/mascotas` | Crear mascota |
| `GET` | `/api/v1/mascotas/:id` | Obtener mascota |
| `PATCH` | `/api/v1/mascotas/:id` | Actualizar mascota |

### Especies y Razas
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/v1/especies` | Listar especies con razas |
| `GET` | `/api/v1/especies/:id/razas` | Razas por especie |
| `POST` | `/api/v1/especies/:id/razas` | Agregar raza custom |

### Sync
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/v1/sync` | Batch sync desde cliente offline |
| `GET` | `/api/v1/sync/seed` | Descargar datos iniciales (razas, etc.) |

---

## 12. Roadmap de desarrollo

### Fase 1 — Backend base (semana 1)
- [x] Estructura NestJS + Fastify
- [x] Schema SQLite con Drizzle ORM
- [x] Feature: Especies + Razas con seed
- [ ] Feature: Ingresos (CRUD)
- [ ] Feature: Propietarios (CRUD)
- [ ] Feature: Mascotas (CRUD)
- [ ] Feature: Sync endpoint

### Fase 2 — Frontend MVP (semana 2-3)
- [ ] Scaffold React + Vite + PWA
- [ ] Setup Dexie.js + schema local
- [ ] Formulario de ingreso rápido (mobile-first)
- [ ] Sync Worker background
- [ ] Indicadores de estado offline/online

### Fase 3 — Formularios completos (semana 4)
- [ ] Formulario propietario completo
- [ ] Formulario mascota completo
- [ ] Selector Especie+Raza (chips + bottom sheet)
- [ ] Upload de foto (cámara en móvil)

### Fase 4 — Pulido y deploy (semana 5)
- [ ] Tests básicos
- [ ] Deploy frontend → Cloudflare Pages
- [ ] Deploy backend → Railway/Render
- [ ] Setup Turso producción
- [ ] Prueba real en clínica

---

## 13. Decisiones de diseño UX móvil

| Patrón | Aplicación |
|---|---|
| Chips horizontales | Especie, Género, Método de pago, Valoración |
| Bottom sheet | Dropdowns con muchas opciones (razas, propietario) |
| Toggle switch | Notificaciones (WhatsApp/Email) |
| Sticky footer | Botones Registrar/Cancelar siempre visibles |
| Input types nativos | `tel`, `email`, `number`, `date` para teclados correctos |
| Camera-first | Foto de mascota → abre cámara directamente en móvil |
| Auto-save draft | Guarda en IndexedDB en cada cambio (nunca se pierde) |
| Indicador sync | Badge visible con estado de sincronización |
