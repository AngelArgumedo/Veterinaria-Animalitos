import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createClient, Client } from '@libsql/client';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private client: Client;
  db: LibSQLDatabase<typeof schema>;

  async onModuleInit() {
    const url = process.env.DATABASE_URL || 'file:./dev.db';
    const authToken = process.env.DATABASE_AUTH_TOKEN;

    this.client = createClient({ url, authToken });
    this.db = drizzle(this.client, { schema });

    await this.runMigrations();
    this.logger.log(`Base de datos conectada: ${url}`);
  }

  private async runMigrations() {
    await this.client.executeMultiple(`
      CREATE TABLE IF NOT EXISTS especies (
        id TEXT PRIMARY KEY,
        nombre TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS razas (
        id TEXT PRIMARY KEY,
        especie_id TEXT NOT NULL,
        nombre TEXT NOT NULL,
        is_custom INTEGER DEFAULT 0,
        synced INTEGER DEFAULT 1,
        FOREIGN KEY (especie_id) REFERENCES especies(id)
      );

      CREATE TABLE IF NOT EXISTS propietarios (
        id TEXT PRIMARY KEY,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        ciudad TEXT DEFAULT 'CALI',
        direccion TEXT,
        telefono TEXT,
        whatsapp TEXT,
        email TEXT,
        tipo_documento TEXT,
        documento TEXT NOT NULL,
        digito_verificador TEXT,
        ocupacion TEXT,
        como_conocio TEXT,
        valoracion TEXT DEFAULT 'BUENO',
        observaciones TEXT,
        acepta_whatsapp INTEGER DEFAULT 0,
        acepta_email INTEGER DEFAULT 0,
        synced INTEGER DEFAULT 0,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS mascotas (
        id TEXT PRIMARY KEY,
        no_historia TEXT UNIQUE,
        no_microchip TEXT,
        nombre TEXT NOT NULL,
        especie_id TEXT NOT NULL,
        raza_id TEXT,
        propietario_id TEXT,
        genero TEXT DEFAULT 'MACHO',
        estado_reproductivo TEXT,
        fecha_nacimiento TEXT,
        temperamento TEXT DEFAULT 'SOCIAL',
        peso REAL,
        color TEXT,
        alergias TEXT,
        foto_url TEXT,
        synced INTEGER DEFAULT 0,
        created_at TEXT,
        updated_at TEXT,
        FOREIGN KEY (especie_id) REFERENCES especies(id),
        FOREIGN KEY (raza_id) REFERENCES razas(id),
        FOREIGN KEY (propietario_id) REFERENCES propietarios(id)
      );

      CREATE TABLE IF NOT EXISTS ingresos (
        id TEXT PRIMARY KEY,
        fecha TEXT,
        mascota_id TEXT,
        mascota_nombre TEXT,
        especie_id TEXT,
        raza_id TEXT,
        genero TEXT,
        castrado_esterilizado INTEGER DEFAULT 0,
        edad TEXT,
        peso REAL,
        temperatura REAL,
        motivo_consulta TEXT,
        propietario_id TEXT,
        propietario_nombre TEXT,
        propietario_documento TEXT,
        propietario_telefono TEXT,
        propietario_email TEXT,
        valor_total REAL,
        metodo_pago TEXT,
        synced INTEGER DEFAULT 0,
        created_at TEXT,
        updated_at TEXT,
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id),
        FOREIGN KEY (propietario_id) REFERENCES propietarios(id)
      );
    `);
  }
}
