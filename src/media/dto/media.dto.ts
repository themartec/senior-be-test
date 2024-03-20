import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class WatermartTextDto {
  @IsString()
  @IsNotEmpty()
  file: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  options: Record<string, any>[];
}

export class WatermartImageDto {
  @IsString()
  @IsNotEmpty()
  file: string;

  @IsString()
  @IsNotEmpty()
  options: string;
}

export class MergeVideoDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ArrayMinSize(2)
  files: string[];
}
