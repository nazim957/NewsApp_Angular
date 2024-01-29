import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../model/wishlist';
import { Article } from '../model/article';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  public addToWishlist(wishlist: Article): Observable<Wishlist> {
    return this.http.post<Wishlist>('http://localhost:9090/api/v4/addFavNews', wishlist);
  }

  public getUserWishlist(email: string): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(`http://localhost:9090/api/v4/getFavNewsByUser/${email}`);
  }

  public deleteNews(id: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:9090/api/v4/deleteNews/${id}`);
  }
}