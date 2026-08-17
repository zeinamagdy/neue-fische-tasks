import { Controller, Get, Delete, Post, Query, Param,NotFoundException, Body } from '@nestjs/common';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadServices: ThreadsService) {}
  @Get()
  getAll() {
    return this.threadServices.getAllThreads();
  }
  @Get(':id')
  getByid(@Param('id') id: string) {
    return this.threadServices
      .getAllThreads()
      .filter((item) => item.id === id);
  }
  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const deleted = this.threadServices.deleteThread(id);
    if (!deleted) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return { message: `User with ID "${id}" deleted.` };
  }
  @Post()
  create(@Body() body){
    return this.threadServices.createThread(body.title,body.body)

  }
}
