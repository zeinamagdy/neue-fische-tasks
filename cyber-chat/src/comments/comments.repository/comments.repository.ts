import { Injectable } from "@nestjs/common";
import { comments } from "src/comments/entities/comment.entity";


@Injectable()
export class CommentsRepository {
    private Comments = Map<number, Comment> 

}
