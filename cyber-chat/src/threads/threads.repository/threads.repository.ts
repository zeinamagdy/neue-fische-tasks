import { Injectable } from '@nestjs/common';
import { threads, Thread } from 'src/threads/dto/entities/thread.entity';

@Injectable()
export class ThreadsRepository {
  private threads: Thread[] = threads;
 
  getAll() {
    return this.threads;
  }
  delete(id: string) {
    return this.threads.filter((item) => item.id == id);
  }
  create(title:string, body:string){
    const thread = {id: crypto.randomUUID(), title:title, body:body,createdAt: new Date()}
    threads.push(thread)
}
}