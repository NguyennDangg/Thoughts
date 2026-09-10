import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { GalleryImage } from '../../images/entities/image.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => GalleryImage, (image) => image.thought)
    images: GalleryImage[];
}