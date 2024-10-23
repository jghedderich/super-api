import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDirectoryDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  emails: string[];
}

export class UpdateDirectoryDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  emails: string[];
}

export class PatchDirectoryDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsOptional()
  emails: string[];
}
