// Task 1: The Request Boundary
// Create CreateThreadDto and UpdateThreadDto in threads/dto/. The create DTO should require title, body, and author,
// each with sensible class-validator rules and length limits. The update DTO should extend PartialType(CreateThreadDto) from @nestjs/mapped-types.

import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  body: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  author: string;
}
