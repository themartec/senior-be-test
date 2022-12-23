import { Controller, Get, Redirect, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/drives', 301)
  getDrives() {
    return { url: '/drives' };
  }
  
}
