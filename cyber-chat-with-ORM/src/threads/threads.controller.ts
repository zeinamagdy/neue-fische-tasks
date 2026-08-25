import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { returnResponse } from '../common/utils/returedResponse.util';
import { UpdateOrdelResponse } from '../common/utils/update-delResponse';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadResponseDto } from './dto/thread-response.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { CommentResponseDto } from 'src/comments/dto/comment-response.dto';
import { Userctx } from 'src/common/decorators/user.decorator';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto,@Userctx('username') username :string) {
    return this.threadsService.create(createThreadDto,username);
  }

  @Post('/:id/comments')
  async addComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const result = await this.threadsService.addComment(createCommentDto, id);
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
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThreadDto: UpdateThreadDto,
    @Userctx('username') username: string,
  ) {
    const result = await this.threadsService.update(id, username, updateThreadDto);
    UpdateOrdelResponse(result, 'update', 'thread');
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.threadsService.remove(id);
    UpdateOrdelResponse(result,'delelte',"thread")
  }
}
