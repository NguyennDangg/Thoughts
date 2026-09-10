import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + extname(file.originalname);
          cb(null, unique);
        },
      }),
    }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateImageDto,
  ) {
    const url = `/uploads/${file.filename}`;
    return this.imagesService.create(url, dto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateImageDto) {
    return this.imagesService.update(+id, dto);
  }
}
