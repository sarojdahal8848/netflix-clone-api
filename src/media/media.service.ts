import { Injectable } from '@nestjs/common';
import { Multer } from 'multer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDTO, UpdateMediaDTO } from './dto';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}
  async list() {
    try {
      const response = await this.prisma.media.findMany({
        include: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const response = await this.prisma.media.findUnique({
        where: { id },
        include: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(file: Express.Multer.File, dto: CreateMediaDTO) {
    try {
      const response = await this.prisma.media.create({
        data: {
          image: file.filename,
          genreId: Number(dto.genreId),
          title: dto.title,
          language: dto.language,
          description: dto.description,
          period: dto.period,
          type: dto.type,
          trailer: dto.trailer,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, file: Express.Multer.File, dto: UpdateMediaDTO) {
    const updateData = {
      image: file?.filename,
      genreId: Number(dto.genreId),
      title: dto.title,
      language: dto.language,
      description: dto.description,
      period: dto.period,
      type: dto.type,
      trailer: dto.trailer,
    };

    console.log({ updateData });
    try {
      const response = await this.prisma.media.update({
        data: updateData,
        where: { id },
      });
      console.log({ response });
      return response;
    } catch (error) {
      throw error;
    }
  }

  delete() {
    return { msg: 'Netflix Delete' };
  }
}
