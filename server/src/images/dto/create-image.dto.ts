import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumberString()
  @IsOptional()
  thoughtId?: string; // optional - set if attaching to a post
}
