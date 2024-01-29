import { Article } from "./article";

export class News {

    constructor(
        public status: string,
        public totalResults: number,
        public articles: Article[]
      ) {}

}
