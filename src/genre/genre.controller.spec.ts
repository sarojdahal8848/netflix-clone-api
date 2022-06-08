import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

describe('GenreController', () => {
  let controller: GenreController;

  const mockGenreService = {
    create: jest.fn().mockReturnValue({ id: 1, name: 'action' }),
    list: jest.fn().mockReturnValue([{ id: 1, name: 'action' }]),
    getById: jest.fn().mockReturnValue({ id: 1, name: 'action' }),
    delete: jest.fn().mockReturnValue({ deleted: true }),
    update: jest.fn().mockReturnValue({ id: 1, name: 'action' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [GenreService],
    })
      .overrideProvider(GenreService)
      .useValue(mockGenreService)
      .compile();

    controller = module.get<GenreController>(GenreController);
  });

  it('should create genre', () => {
    const dto = { name: 'action' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });
  });

  it('should return list', () => {
    expect(controller.list()).toEqual([
      { id: expect.any(Number), name: expect.any(String) },
    ]);
  });

  it('Should get single data', () => {
    expect(controller.getById(1)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  it('Should delete data', () => {
    expect(controller.delete(1)).toEqual({ deleted: true });
  });

  it('Should update data', () => {
    expect(controller.update(1, { name: 'action' })).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });
});
