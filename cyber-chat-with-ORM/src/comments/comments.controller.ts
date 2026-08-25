import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { returnResponse } from '../common/utils/returedResponse.util';
import { Userctx } from '../common/decorators/user.decorator';
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Userctx('username') username: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.create(createCommentDto, username);
  }

  @Get()
  async findAll(
    @Userctx('username') username: string,
  ): Promise<CommentResponseDto> {
    if (!username) {
      throw new BadRequestException('Username is missing from request context');
    } else {
      const comments = await this.commentsService.findAllByusername(username);
      return returnResponse(comments, CommentResponseDto, 'comments');
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.findOne(id);
    return returnResponse(comment, CommentResponseDto, 'comment');
  }
  @Get('thread/:threadId')
  async findAllByThreadId(
    @Param('threadId', ParseUUIDPipe) threadId: string,
    @Userctx('username') username: string,
  ) {
    const commentsByThread = await this.commentsService.findAllByThreadId(
      threadId,
      username,
    );
    return returnResponse(commentsByThread, CommentResponseDto, 'comment');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Userctx('username') username: string,
  ) {
    const result = await this.commentsService.update(
      id,
      username,
      updateCommentDto,
    );
    if (result.affected === 0)
      throw new NotFoundException(
        'Comment not found or you are not authorized to edit it',
      );
    return {
      statusCode: 200,
      message: 'Comment updated successfully',
      data: updateCommentDto,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    console.log('id', id);
    return this.commentsService.remove(id);
  }
}
