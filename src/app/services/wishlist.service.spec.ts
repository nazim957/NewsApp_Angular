import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WishlistService } from './wishlist.service';
import { Article } from '../model/article';
import { Wishlist } from '../model/wishlist';

describe('WishlistService', () => {
  let service: WishlistService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WishlistService],
    });
    service = TestBed.inject(WishlistService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to add to wishlist', () => {
    const wishlistItem: Article = {
      source: { id: '1', name: 'AAJ TAK' },
      author: 'AAJ TAK',
      title: 'BREAKING',
      description: 'Description',
      url: 'http://example.com',
      urlToImage: 'http://example.com/image.jpg',
      publishedAt: '2023-01-01',
      content: 'Current News',
    };

    const mockResponse: Wishlist = {
      wishlistId: 1,
      userId: 'nazim@gmail.com',
      source: { id: '1', name: 'Source' },
      author: 'AAJ TAK',
      title: 'BREAKING',
      description: 'Description',
      url: 'http://example.com',
      urlToImage: 'http://example.com/image.jpg',
      publishedAt: '2023-01-01',
      content: 'Current News',
    };

    service.addToWishlist(wishlistItem).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:9090/api/v4/addFavNews');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(wishlistItem);

    req.flush(mockResponse);
  });

  it('should send a GET request to retrieve user wishlist', () => {
    const userEmail = 'user@example.com';
    const mockResponse: Wishlist[] = [
      {
        wishlistId: 1,
        userId: 'nazim@gmail.com',
        source: { id: '1', name: 'AAJ TAK' },
        author: 'AAJ TAK',
        title: 'BREAKING',
        description: 'Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: '2023-01-01',
        content: 'Current News',
      },
      {
        wishlistId: 2,
        userId: 'nazim@gmail.com',
        source: { id: '2', name: 'NDTV INDIA' },
        author: 'Zee Nes',
        title: 'Title2',
        description: 'Description2',
        url: 'http://example2.com',
        urlToImage: 'http://example2.com/image.jpg',
        publishedAt: '2023-02-01',
        content: 'Content2',
      },
    ];

    service.getUserWishlist(userEmail).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.length).toBe(2);
    });

    const req = httpTestingController.expectOne(`http://localhost:9090/api/v4/getFavNewsByUser/${userEmail}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should send a DELETE request to delete a news item', () => {
    const wishlistId = 1;
    const mockResponse = 'Deleted';

    service.deleteNews(wishlistId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`http://localhost:9090/api/v4/deleteNews/${wishlistId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockResponse);
  });
});
