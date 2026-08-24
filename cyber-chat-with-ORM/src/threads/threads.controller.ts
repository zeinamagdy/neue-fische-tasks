import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards
} from '@nestjs/common';
import { returnResponse } from '../common/utils/returedResponse.util';

import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadResponseDto } from './dto/thread-response.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { CommentResponseDto } from 'src/comments/dto/comment-response.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.create(createThreadDto);
  }

  @Post('/:id/comments')
  async addComment(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    console.log("id",typeof id)
    const result = await this.threadsService.addComment(createCommentDto,id);
    return returnResponse(result, CommentResponseDto, 'Thread');
  }

  @Get()
  async findAll() {
    const threads = await this.threadsService.findAll();
    return returnResponse(threads, ThreadResponseDto, 'thread');
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const thread = await this.threadsService.findOne(id);
    return returnResponse(thread, ThreadResponseDto, 'thread');
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ) {
    return this.threadsService.update(id, updateThreadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.remove(id);
  }
}
