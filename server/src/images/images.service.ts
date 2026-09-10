import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryImage } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(GalleryImage)
    private imagesRepository: Repository<GalleryImage>,
  ) {}

  create(url: string, dto: CreateImageDto): Promise<GalleryImage> {
    const image = this.imagesRepository.create({
      url,
      description: dto.description,
      thought: dto.thoughtId ? { id: +dto.thoughtId } : undefined,
    });
    return this.imagesRepository.save(image);
  }

  findAll(): Promise<GalleryImage[]> {
    return this.imagesRepository.find({ order: { uploadedAt: 'DESC' } });
  }

  async update(id: number, dto: UpdateImageDto): Promise<GalleryImage> {
    const image = await this.imagesRepository.findOne({ where: { id } });
    if (!image) throw new NotFoundException('Image not found');
    await this.imagesRepository.update(id, dto);
    return this.imagesRepository.findOne({
      where: { id },
    }) as Promise<GalleryImage>;
  }
}
