import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NewsService, WeatherResponse } from 'src/app/services/news.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article';
import { News } from 'src/app/model/news';
import { ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [DatePipe]
})
export class UserDashboardComponent implements AfterViewInit {

  currentMode = 'light';

  articles: Article[] = [];
  searchResults: Article[] = [];
  searchKeyword = '';

  currentPage = 1;
  totalResults: number | undefined;
  pageSize = 12;

  currentTemperature: number | undefined;
  // feelsLikeTemperature:number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private newsService: NewsService,
    private wishlist: WishlistService,
    private snack: MatSnackBar,
    private datePipe: DatePipe,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private modeService: ModeService
  ) {}

  

  ngAfterViewInit() {


     // Subscribe to mode changes
     this.modeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
    //  console.log("MODE DAshboard"+ this.currentMode);
      
    });

    this.newsService.getTemperature().subscribe(
      (weather: WeatherResponse) => {
        this.currentTemperature = weather.current.temp_c;
      },
      // (error) => {
      //   console.log(error);
      // }
    );

    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.currentPage - 1;

    // Checking if data is already loaded, then update paginator length
    if (this.totalResults) {
      this.paginator.length = this.totalResults;
    } else {
      // If data is not loaded, fetch it and update paginator length
      this.getNews();
    }
  }

  getNews() {
    if (this.searchKeyword.trim() === '') {
      this.updateNews(this.currentPage);
    } else {
      this.searchNews();
    }
  }

  updateNews(pageNo: number) {
    this.newsService.topHeadlines(pageNo, this.pageSize).subscribe(
      (data: News) => {
        this.totalResults = data.totalResults;
        this.articles = data.articles;
        this.paginator.length = this.totalResults;
      },
      // (error) => {
      //   console.log(error);
      // }
    );
  }

  searchNews() {
    if (this.searchKeyword.trim() === '') {
      this.snack.open('Please enter some keyword for searching', '', {
        duration: 3000,
      });
      return
    }

    this.newsService
      .fetchNews(this.searchKeyword, this.currentPage, this.pageSize)
      .subscribe(
        (data: News) => {
          this.totalResults = data.totalResults;
          this.searchResults = data.articles;
          this.paginator.length = this.totalResults;
       //   console.log("daat", data);
          
       //   console.log("SEAChB CATE",+ this.searchResults);
       //   console.log("total"+this.totalResults);
          
          
        },
        // (error) => {
        //   console.log(error);
        // }
      );
  }

  addToFavorites(article: Article) {
  
    this.wishlist.addToWishlist(article).subscribe(
      () => {
      //  console.log(data);
        this.snack.open('News: ' + article.title + ' Added to Wishlist!!', '', {
          duration: 3000,
        });
      },
      (error) => {
      //  console.log(error);

        let errorMessage = 'Something went wrong';

        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.snack.open(errorMessage, '', { duration: 3000 });
      }
    );
  }

  handlePageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    if (this.searchKeyword.trim() === '') {
      this.updateNews(this.currentPage);
    } else {
      this.searchNews();
    }
  }

  // changePageSize() {
  //   this.currentPage = 1;

  //   if (this.searchKeyword.trim() === '') {
  //     this.updateNews(this.currentPage);
  //   } else {
  //     this.searchNews();
  //   }
  // }

  getCurrentDateTime(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'fullDate') + ' ' + this.datePipe.transform(currentDate, 'shortTime');
  }

  fetchNewsByCategory(category: string) {
    // Update the searchKeyword with the selected category
    this.searchKeyword = category;

    // Call the searchNews method to fetch news based on the selected category
    this.searchNews();

    // Clear the searchKeyword after fetching the news
    this.searchKeyword = '';
  }
  
  
}
