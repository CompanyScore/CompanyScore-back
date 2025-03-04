import { Test, TestingModule } from '@nestjs/testing';
import { SuggestCompanyController } from './suggest-company.controller';
import { SuggestCompanyService } from './suggest-company.service';

describe('SuggestCompanyController', () => {
  let controller: SuggestCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestCompanyController],
      providers: [SuggestCompanyService],
    }).compile();

    controller = module.get<SuggestCompanyController>(SuggestCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
