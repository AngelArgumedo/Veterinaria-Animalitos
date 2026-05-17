import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRazaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;
}
