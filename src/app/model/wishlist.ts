import { Source } from "./source";

export class Wishlist {
    constructor(
      public  wishlistId: number,
      public  userId: string,
      public  source: Source,
      public  author: string,
      public  title: string,
      public  description: string,
      public  url: string,
      public  urlToImage: string,
      public  publishedAt: string,
      public  content: string,
    
      ) { }
    }
