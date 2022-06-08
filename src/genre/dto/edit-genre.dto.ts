import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class EditGenreDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
