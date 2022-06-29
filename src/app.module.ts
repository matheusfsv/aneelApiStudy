import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Data } from './aneelData';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, Data],
})
export class AppModule {}
