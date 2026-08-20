import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,HttpStatus
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import {returnResponse} from '../common/utils/returedResponse.util'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get()
  async findAll(): Promise<CommentResponseDto> {
    const comments = await this.commentsService.findAll();
    return returnResponse(comments,CommentResponseDto,"comments")
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.findOne(id);
    return returnResponse(comment, CommentResponseDto,"comment");
  }
  @Get('thread/:threadId')
  async findAllByThreadId(@Param('threadId', ParseUUIDPipe) threadId: string) {
    const commentsByThread =
      await this.commentsService.findAllByThreadId(threadId);
    return returnResponse(commentsByThread, CommentResponseDto,"comment");
  }
  
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  remove(@Param('id', ParseUUIDPipe) id: string) {
    console.log('id', id);
    return this.commentsService.remove(id);
  }
}

