import type { Post } from "./data/data.t";
import { posts } from "./data/data.t";


export const getPosts = (): Post[] => {
    return posts;
}

