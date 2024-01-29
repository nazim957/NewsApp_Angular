import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Wishlist } from 'src/app/model/wishlist';
import { ModeService } from 'src/app/services/mode.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  currentMode = 'light';

  wishlistData: Wishlist[] = [];

  constructor(
    private wishlist: WishlistService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private modeService: ModeService
  ) {}

  ngOnInit() {

 // Subscribe to mode changes
 this.modeService.currentMode$.subscribe((mode) => {
  this.currentMode = mode;
 // console.log("MODE Wishlist"+ this.currentMode);
  
});

    this.route.queryParams.subscribe(params => {
      const userEmail = params['email'];
      if (userEmail) {
        this.getUserWishlist(userEmail);
      }
    });
  }

  getUserWishlist(email: string) {
    this.wishlist.getUserWishlist(email).subscribe(
      (data: Wishlist[]) => {
        this.wishlistData = data;
      //  console.log(data);
      },
      (error) => {
        let errorMessage = 'Something went wrong';
       // console.log(error);
       if (error && error.error && error.error.message) {
        errorMessage = error.error.message;
      }
       this.snack.open(errorMessage, '', { duration: 3000 });
      }
    );
  }

  deleteNews(id: number) {
   // console.log(id);
   Swal.fire({
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    title: 'Are you sure, want to delete this Article?',
  }).then((result) => {
    if (result.isConfirmed) {

    this.wishlist.deleteNews(id).subscribe(
      () => {
        //console.log(data);
        this.wishlistData = this.wishlistData.filter(item => item.wishlistId !== id);
        this.snack.open('Article removed from wishlist', 'OK', { duration: 3000 });
      },
      (error) => {
      //  console.log(error);

        let errorMessage = 'Something went wrong';

        if (error && error.error && error.error.message) {
          // Check if there is a custom error message from the server
          errorMessage = error.error.message;
        }

        this.snack.open(errorMessage, '', { duration: 3000 });
      }
    );
  }
})

}
}
