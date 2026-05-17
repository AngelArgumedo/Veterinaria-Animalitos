import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const especies = sqliteTable('especies', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
});

export const razas = sqliteTable('razas', {
  id: text('id').primaryKey(),
  especieId: text('especie_id').notNull().references(() => especies.id),
  nombre: text('nombre').notNull(),
  isCustom: integer('is_custom', { mode: 'boolean' }).default(false),
  synced: integer('synced', { mode: 'boolean' }).default(true),
});

export const propietarios = sqliteTable('propietarios', {
  id: text('id').primaryKey(),
  nombres: text('nombres').notNull(),
  apellidos: text('apellidos').notNull(),
  ciudad: text('ciudad').default('CALI'),
  direccion: text('direccion'),
  telefono: text('telefono'),
  whatsapp: text('whatsapp'),
  email: text('email'),
  tipoDocumento: text('tipo_documento'),
  documento: text('documento').notNull(),
  digitoVerificador: text('digito_verificador'),
  ocupacion: text('ocupacion'),
  comoConociо: text('como_conocio'),
  valoracion: text('valoracion').default('BUENO'),
  observaciones: text('observaciones'),
  aceptaWhatsapp: integer('acepta_whatsapp', { mode: 'boolean' }).default(false),
  aceptaEmail: integer('acepta_email', { mode: 'boolean' }).default(false),
  synced: integer('synced', { mode: 'boolean' }).default(false),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export const mascotas = sqliteTable('mascotas', {
  id: text('id').primaryKey(),
  noHistoria: text('no_historia').unique(),
  noMicrochip: text('no_microchip'),
  nombre: text('nombre').notNull(),
  especieId: text('especie_id').notNull().references(() => especies.id),
  razaId: text('raza_id').references(() => razas.id),
  propietarioId: text('propietario_id').references(() => propietarios.id),
  genero: text('genero').default('MACHO'),
  estadoReproductivo: text('estado_reproductivo'),
  fechaNacimiento: text('fecha_nacimiento'),
  temperamento: text('temperamento').default('SOCIAL'),
  peso: real('peso'),
  color: text('color'),
  alergias: text('alergias'),
  fotoUrl: text('foto_url'),
  synced: integer('synced', { mode: 'boolean' }).default(false),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export const ingresos = sqliteTable('ingresos', {
  id: text('id').primaryKey(),
  fecha: text('fecha'),
  // Paciente (puede ser mascota existente o datos del volante)
  mascotaId: text('mascota_id').references(() => mascotas.id),
  mascotaNombre: text('mascota_nombre'),
  especieId: text('especie_id').references(() => especies.id),
  razaId: text('raza_id').references(() => razas.id),
  genero: text('genero'),
  castradoEsterilizado: integer('castrado_esterilizado', { mode: 'boolean' }).default(false),
  edad: text('edad'),
  peso: real('peso'),
  temperatura: real('temperatura'),
  motivoConsulta: text('motivo_consulta'),
  // Propietario (puede ser propietario existente o datos del volante)
  propietarioId: text('propietario_id').references(() => propietarios.id),
  propietarioNombre: text('propietario_nombre'),
  propietarioDocumento: text('propietario_documento'),
  propietarioTelefono: text('propietario_telefono'),
  propietarioEmail: text('propietario_email'),
  // Pago
  valorTotal: real('valor_total'),
  metodoPago: text('metodo_pago'),
  // Control
  synced: integer('synced', { mode: 'boolean' }).default(false),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export type Especie = typeof especies.$inferSelect;
export type Raza = typeof razas.$inferSelect;
export type Propietario = typeof propietarios.$inferSelect;
export type Mascota = typeof mascotas.$inferSelect;
export type Ingreso = typeof ingresos.$inferSelect;
