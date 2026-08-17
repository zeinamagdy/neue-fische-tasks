import { Injectable } from '@nestjs/common';
import {ThreadsRepository} from './threads.repository/threads.repository'

@Injectable()
export class ThreadsService {
    constructor(private readonly threadsRepository: ThreadsRepository){}

    getAllThreads(){
       return  this.threadsRepository.getAll()
    }
    deleteThread (id : string){
        return this.threadsRepository.delete(id)
    }
    createThread(title: string, body: string){
        return this.threadsRepository.create(title,body)
    }
}
