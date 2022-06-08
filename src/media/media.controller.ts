import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateMediaDTO, UpdateMediaDTO } from './dto';
import { MediaService } from './media.service';

@Controller('api/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}
  @Get()
  list() {
    return this.mediaService.list();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) mediaId: number) {
    return this.mediaService.getById(mediaId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb) {
          const extension = file.originalname.split('.')[1];
          const postfix = Date.now();
          cb(null, `${file.fieldname}-${postfix}.${extension}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateMediaDTO,
  ) {
    return this.mediaService.create(file, dto);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb) {
          const extension = file.originalname.split('.')[1];
          const postfix = Date.now();
          cb(null, `${file.fieldname}-${postfix}.${extension}`);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) mediaId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateMediaDTO,
  ) {
    console.log({ file });
    return this.mediaService.update(mediaId, file, dto);
  }

  @Delete(':id')
  delete() {
    return this.mediaService.delete();
  }
}
