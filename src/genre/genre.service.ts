import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDTO, EditGenreDTO } from './dto';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateGenreDTO) {
    try {
      const response = await this.prisma.genre.create({
        data: { ...dto },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async list() {
    try {
      const response = await this.prisma.genre.findMany();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const response = await this.prisma.genre.findUnique({ where: { id } });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, dto: EditGenreDTO) {
    try {
      const response = await this.prisma.genre.update({
        data: { ...dto },
        where: { id },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const response = await this.prisma.genre.delete({ where: { id } });
      if (response) return { deleted: true };
    } catch (error) {
      throw error;
    }
  }
}
