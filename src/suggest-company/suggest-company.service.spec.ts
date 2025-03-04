import { Test, TestingModule } from '@nestjs/testing';
import { SuggestCompanyService } from './suggest-company.service';

describe('SuggestCompanyService', () => {
  let service: SuggestCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestCompanyService],
    }).compile();

    service = module.get<SuggestCompanyService>(SuggestCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
