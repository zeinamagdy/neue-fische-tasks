import { Expose, Type } from 'class-transformer';

export class titleThread {
  @Expose()
  id: string;

  @Expose()
  title: string;
}
export class CommentResponseDto {
  @Expose()
  id: string;

  @Expose()
  body: string;



  @Expose()
  author: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => titleThread)
  thread: titleThread;
}
