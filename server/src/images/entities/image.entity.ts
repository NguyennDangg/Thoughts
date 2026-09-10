import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class GalleryImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @ManyToOne(() => Post, (post) => post.images, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'thoughtId' })
  thought: Post;
}
