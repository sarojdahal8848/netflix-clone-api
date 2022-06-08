import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGenreDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
