import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';
import { WishlistComponent } from './wishlist.component';
import { Wishlist } from 'src/app/model/wishlist';
import { Source } from 'src/app/model/source';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let wishlistServiceSpy: jasmine.SpyObj<WishlistService>;
  //let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const wishlistSpy = jasmine.createSpyObj('WishlistService', ['getUserWishlist', 'deleteNews']);
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [WishlistComponent],
      providers: [
        { provide: WishlistService, useValue: wishlistSpy },
        { provide: MatSnackBar, useValue: snackBarSpyObj },
        { provide: ActivatedRoute, useValue: { queryParams: of({ email: 'test@example.com' }) } }
      ]
    });

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    wishlistServiceSpy = TestBed.inject(WishlistService) as jasmine.SpyObj<WishlistService>;
  //  snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserWishlist on ngOnInit', () => {
    const testData = [
      new Wishlist(
        1,
        'nazim@gmail.com',
        new Source('1', 'AAJ TAK'),
        'Author 1',
        'Article 1',
        'Description 1',
        'http://example.com/1',
        'image_url_1',
        '2023-01-01',
        'Content 1'
      ),
    ];

    wishlistServiceSpy.getUserWishlist.and.returnValue(of(testData));

    component.ngOnInit();

    expect(component.wishlistData).toEqual(testData);
  });

//   fit('should handle error when getUserWishlist fails', () => {
//     const testData = [
//       new Wishlist(
//         1,
//         'user123',
//         new Source('1', 'Source 1'),
//         'Author 1',
//         'Article 1',
//         'Description 1',
//         'http://example.com/1',
//         'image_url_1',
//         '2023-01-01',
//         'Content 1'
//       ),
//       // Add more wishlist items as needed
//     ];
    
//     wishlistServiceSpy.getUserWishlist.and.returnValue(throwError({ message: 'Error message' }));
  
//     component.ngOnInit();
  
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       expect(component.wishlistData).toEqual([]);
//      // expect(snackBarSpy.open).toHaveBeenCalledWith('Error message', '', { duration: 3000 });
//     });
//   });

//   fit('should call deleteNews on deleteNews', () => {
//     const wishlistId = 1;
//     spyOn(window, 'confirm').and.returnValue(true);
//     wishlistServiceSpy.deleteNews.and.returnValue(of(''));

//     component.deleteNews(wishlistId);

//     expect(wishlistServiceSpy.deleteNews).toHaveBeenCalledWith(wishlistId);
//     expect(component.wishlistData).toEqual([]);
//     expect(snackBarSpy.open).toHaveBeenCalledWith('Article removed from wishlist', 'OK', { duration: 3000 });
//   });


});
