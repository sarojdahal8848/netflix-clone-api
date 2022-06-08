import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGenreDTO, EditGenreDTO } from './dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}
  @Get()
  list() {
    return this.genreService.list();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) genreId: number) {
    return this.genreService.getById(genreId);
  }

  @Post()
  create(@Body() dto: CreateGenreDTO) {
    return this.genreService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) genreId: number,
    @Body() dto: EditGenreDTO,
  ) {
    console.log({ genreId, dto });
    return this.genreService.update(genreId, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) genreId: number) {
    return this.genreService.delete(genreId);
  }
}
