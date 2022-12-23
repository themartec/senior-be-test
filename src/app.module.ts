import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app/controllers/app.controller';
import { DriveController } from './app/controllers/drive.controller';
import { AppService } from './app/services/app.service';


@Module({
  imports: [MulterModule.register({dest: './tempFolder'})],
  controllers: [AppController, DriveController],
  providers: [AppService],
})
export class AppModule {}
