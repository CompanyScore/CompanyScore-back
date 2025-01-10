import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'CompanyScore',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'CompanyScore',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
