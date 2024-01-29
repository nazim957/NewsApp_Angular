import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { News } from 'src/app/model/news';
import { ModeService } from 'src/app/services/mode.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  currentMode = 'light';

  isLoggedIn = false; // Set this based on your authentication logic
  articlesToShow = 5; // Set the initial number of articles to show
  articles: Article[] = []; // Replace with your actual article type

  // Function to load more articles
  loadMoreArticles() {
    this.articlesToShow += 5; // Increase the number of articles to show
  }

  ngOnInit(): void {
    this.getNews();

     // Subscribe to mode changes
     this.modeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
     // console.log("MODE HOME"+ this.currentMode);
      
    });
  }

  constructor(private newsService: NewsService,  private modeService: ModeService) {}

  getNews() {
    this.newsService.fetchNewsHome("bitcoin").subscribe(
      (data: News) => {
       // console.log("DATA NEWS", data);
        this.articles = data.articles; // Assigning only the articles array
      },
      (error) => {
        console.log(error);
      }
    );
  }
}