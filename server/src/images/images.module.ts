import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryImage } from './entities/image.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryImage]), AuthModule],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [TypeOrmModule],
})
export class ImagesModule {}
