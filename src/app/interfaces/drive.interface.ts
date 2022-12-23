export interface Drive {
    id: number;
    name: string;
    link: string;
    image: Image;
  }

export interface Image {
    url: string;
    style: string;
  }

export interface DriveFile {
  id: string;
  name: string;
  link: string;
  downloadLink: string;
  icon: string;
}