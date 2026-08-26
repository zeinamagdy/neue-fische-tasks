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
  Query,
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
import { PaginationQueryDto } from '../common/dto/paginationQueryDto';
import { PaginatedResponseDto } from '../common/dto/paginated-responseDto';
import { plainToInstance } from 'class-transformer';

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
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<CommentResponseDto>> {
    const { page, limit } = pagination;

    if (!username) {
      throw new BadRequestException('Username is missing from request context');
    }
    const [comments, total] = await this.commentsService.findAllByusername({
      skip: (page - 1) * limit,
      take: limit,
      username,
    });
    const data = plainToInstance(CommentResponseDto, comments, {
      excludeExtraneousValues: true,
    });
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
    };
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
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Userctx('username') username: string,
  ) {
    const result = await this.commentsService.remove(id, username);
    if (result.affected === 0)
      throw new NotFoundException(
        'Comment not found or you are not authorized to edit it',
      );
    return {
      statusCode: 200,
      message: 'Comment deleted successfully',
    };
  }
}
