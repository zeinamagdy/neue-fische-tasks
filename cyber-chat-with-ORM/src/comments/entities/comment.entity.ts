import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Thread } from 'src/threads/entities/thread.entity';

@Entity('comment')
export class Comment {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  threadId: string;

  @Column({ type: 'varchar', length: 120 })
  author: string;

  @Column({ type: 'text' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Thread, (thread) => thread.comments)
  Thread: Thread;
}
