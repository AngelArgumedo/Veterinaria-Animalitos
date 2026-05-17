import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIngresoDto } from '../../ingresos/dto/create-ingreso.dto';
import { CreatePropietarioDto } from '../../propietarios/dto/create-propietario.dto';
import { CreateMascotaDto } from '../../mascotas/dto/create-mascota.dto';
import { CreateRazaDto } from '../../especies/dto/create-raza.dto';

export class SyncRazaDto extends CreateRazaDto {
  localId: string;
  especieId: string;
}

export class SyncPayloadDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngresoDto)
  ingresos?: (CreateIngresoDto & { localId: string })[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePropietarioDto)
  propietarios?: (CreatePropietarioDto & { localId: string })[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMascotaDto)
  mascotas?: (CreateMascotaDto & { localId: string })[];

  @IsOptional()
  @IsArray()
  razasCustom?: SyncRazaDto[];
}
