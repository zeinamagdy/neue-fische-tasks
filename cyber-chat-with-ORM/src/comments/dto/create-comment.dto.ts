// Create CreateCommentDto in comments/dto/ with body and author. The thread ID comes from the URL, not the body.

import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  threadId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  body: string;
  //As it will come from JWT
  // @IsString()
  // @MaxLength(120)
  // author: string;
}
