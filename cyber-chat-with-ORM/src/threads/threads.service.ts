import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from "./entities/thread.entity"



@Injectable()
export class ThreadsService {
constructor(
    @InjectRepository(Thread)
    private readonly thread: Repository<Thread>,
  ) {}
  create(createThreadDto: CreateThreadDto) {
    return this.thread.save(createThreadDto)
  }

  findAll() {
    return  this.thread.find();
  }

  findOne(id: string) {
    return this.thread.findOneBy({id});
  }

  update(id: string, updateThreadDto: UpdateThreadDto) {
    return this.thread.update(id,updateThreadDto);
  }

  remove(id: string) {
    return this.thread.delete(id);
  }
}
