import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean, MaxLength } from 'class-validator';

export class CreatePropietarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  tipoDocumento?: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsOptional()
  @IsString()
  digitoVerificador?: string;

  @IsOptional()
  @IsString()
  ocupacion?: string;

  @IsOptional()
  @IsString()
  comoConociо?: string;

  @IsOptional()
  @IsString()
  valoracion?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsBoolean()
  aceptaWhatsapp?: boolean;

  @IsOptional()
  @IsBoolean()
  aceptaEmail?: boolean;
}
