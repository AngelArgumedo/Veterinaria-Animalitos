import { IsString, IsOptional, IsNumber, IsBoolean, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIngresoDto {
  @IsOptional()
  @IsString()
  fecha?: string;

  // Paciente
  @IsOptional()
  @IsString()
  mascotaId?: string;

  @IsOptional()
  @IsString()
  mascotaNombre?: string;

  @IsOptional()
  @IsString()
  especieId?: string;

  @IsOptional()
  @IsString()
  razaId?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsBoolean()
  castradoEsterilizado?: boolean;

  @IsOptional()
  @IsString()
  edad?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  peso?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  temperatura?: number;

  @IsOptional()
  @IsString()
  motivoConsulta?: string;

  // Propietario
  @IsOptional()
  @IsString()
  propietarioId?: string;

  @IsOptional()
  @IsString()
  propietarioNombre?: string;

  @IsOptional()
  @IsString()
  propietarioDocumento?: string;

  @IsOptional()
  @IsString()
  propietarioTelefono?: string;

  @IsOptional()
  @IsEmail()
  propietarioEmail?: string;

  // Pago
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  valorTotal?: number;

  @IsOptional()
  @IsString()
  metodoPago?: string;
}
