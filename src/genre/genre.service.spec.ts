import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GenreService } from './genre.service';

describe('GenreService', () => {
  let service: GenreService;

  const testGenreName = 'action';

  const genreArray = [
    { id: 1, name: testGenreName },
    { id: 2, name: 'horror' },
    { id: 3, name: 'romance' },
  ];

  const singleGenre = genreArray[0];

  const mockPrismaService = {
    genre: {
      create: jest.fn().mockResolvedValue(singleGenre),
      findMany: jest.fn().mockResolvedValue(genreArray),
      findUnique: jest.fn().mockResolvedValue(singleGenre),
      update: jest.fn().mockResolvedValue(singleGenre),
      delete: jest.fn().mockResolvedValue({ deleted: true }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<GenreService>(GenreService);
  });

  it('Should return list', async () => {
    const genres = await service.list();
    expect(genres).toEqual(genreArray);
  });

  it('Should return single value', async () => {
    const genre = await service.getById(1);
    expect(genre).toEqual(singleGenre);
  });

  it('Should Create data on database', () => {
    const dto = { name: 'action' };
    expect(service.create(dto)).resolves.toEqual(singleGenre);
  });

  it('Should update data', async () => {
    const dto = { name: 'action' };
    const genre = await service.update(1, dto);
    expect(genre).toEqual(singleGenre);
  });

  it('Should delete data', () => {
    expect(service.delete(1)).resolves.toEqual({ deleted: true });
  });
});
