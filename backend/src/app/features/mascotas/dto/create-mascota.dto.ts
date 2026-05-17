import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMascotaDto {
  @IsOptional()
  @IsString()
  noHistoria?: string;

  @IsOptional()
  @IsString()
  noMicrochip?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  especieId: string;

  @IsOptional()
  @IsString()
  razaId?: string;

  @IsOptional()
  @IsString()
  propietarioId?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  estadoReproductivo?: string;

  @IsOptional()
  @IsString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsString()
  temperamento?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  peso?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  alergias?: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;
}
