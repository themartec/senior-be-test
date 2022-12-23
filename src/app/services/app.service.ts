import { Injectable } from '@nestjs/common';
import { Drive } from 'src/app/interfaces/drive.interface';
import { authorize, listFiles, upload, download } from 'src/lib/drive/google'
import { Request, Response } from 'express';

@Injectable()
export class AppService {
  private drives: Drive[] = [
    { id: 1, name: 'One Drive', link: '/drives/google-drive', image: {url: "/resources/ggdrive.jpg", style: "width:200px;height:100px;"} },
    { id: 2, name: 'One Drive', link: '/drives/one-drive', image: {url: "/resources/OneDrive-Logo_17.png", style: "width:300px;height:100px;"} },

  ];  

  getDrives(): Drive[] {

    return this.drives;
  }

  getDrive(id): Drive {
    return this.drives.at(id);
  }

  async listDrive(request: Request, response: Response) {
    return authorize(request, response).then(listFiles).catch(console.error);
  }

  async uploadFile(request, response, file) {
    console.log(file);
    return authorize(request, response).then(function(client){upload(client, file)}).catch(console.error);
  }

  async downloadFile(request, response, fileId) {
    return authorize(request, response).then(function(client){download(client, fileId)}).catch(console.error)
  }
}
