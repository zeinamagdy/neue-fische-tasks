// Create CreateCommentDto in comments/dto/ with body and author. The thread ID comes from the URL, not the body.

import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: '111-111-1111-111',
    description: 'Unique UUID threadid',
  })
  @IsString()
  threadId: string;

  @ApiProperty({
    example: ' Swagger is a good tool to use',
    description: 'comment text',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  body: string;
  //As it will come from JWT
  // @IsString()
  // @MaxLength(120)
  // author: string;
}
