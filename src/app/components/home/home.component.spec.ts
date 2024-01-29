import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { NewsService } from 'src/app/services/news.service';
import { ModeService } from 'src/app/services/mode.service';
import { News } from 'src/app/model/news'; // Import the News class

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let newsService: NewsService;
  let modeService: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [NewsService, ModeService],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService);
    modeService = TestBed.inject(ModeService);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values set', () => {
    expect(component.isLoggedIn).toBe(false);
    expect(component.articlesToShow).toBe(5);
    expect(component.articles).toEqual([]);
  });

  it('should increase articlesToShow on loadMoreArticles', () => {
    const initialArticlesToShow = component.articlesToShow;
    component.loadMoreArticles();
    expect(component.articlesToShow).toBe(initialArticlesToShow + 5);
  });

  it('should call getNews on ngOnInit', () => {
    spyOn(component, 'getNews');
    component.ngOnInit();
    expect(component.getNews).toHaveBeenCalled();
  });

  it('should subscribe to mode changes on ngOnInit', () => {
    spyOn(modeService.currentMode$, 'subscribe');
    component.ngOnInit();
    expect(modeService.currentMode$.subscribe).toHaveBeenCalled();
  });

  it('should fetch news on getNews', waitForAsync(() => {
    const mockNewsResponse = {
      status: 'ok',
      totalResults: 2,
      articles: [
        { source: { id: '1', name: 'Source 1' }, author: 'Author 1', title: 'Article 1', description: 'Description 1', url: 'http://example.com/1', urlToImage: 'image_url_1', publishedAt: '2023-01-01', content: 'Content 1' },
        { source: { id: '2', name: 'Source 2' }, author: 'Author 2', title: 'Article 2', description: 'Description 2', url: 'http://example.com/2', urlToImage: 'image_url_2', publishedAt: '2023-01-02', content: 'Content 2' },
      ],
    };

    spyOn(newsService, 'fetchNewsHome').and.returnValue(of(mockNewsResponse as News));

    component.getNews();

    fixture.whenStable().then(() => {
      expect(component.articles).toEqual(mockNewsResponse.articles);
    });
  }));

});
