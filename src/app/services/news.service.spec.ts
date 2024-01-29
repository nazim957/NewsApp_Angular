import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { News } from '../model/news';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
    });

    // Inject the service (which imports the HttpClient) and the Test Controller
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch news for home', () => {
    const keyword = 'example';
    service.fetchNewsHome(keyword).subscribe((news: News) => {
      expect(news).toBeTruthy();
      expect(news.status).toBe('ok');
    });

    const req = httpMock.expectOne(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=819ce2fd80e94a9e905fbc630aa67cb0`);
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'ok' });
  });

  it('should fetch news with pagination', () => {
    const keyword = 'example';
    const pageNo = 1;
    const pageSize = 10;

    service.fetchNews(keyword, pageNo, pageSize).subscribe((news: News) => {
      expect(news).toBeTruthy();
      expect(news.status).toBe('ok');
    });

    const req = httpMock.expectOne(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=819ce2fd80e94a9e905fbc630aa67cb0&page=${pageNo}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'ok' });
  });

  it('should fetch top headlines', () => {
    const pageNo = 1;
    const pageSize = 10;

    service.topHeadlines(pageNo, pageSize).subscribe((news: News) => {
      expect(news).toBeTruthy();
      expect(news.status).toBe('ok');
    });

    const req = httpMock.expectOne(`https://newsapi.org/v2/top-headlines?country=in&apiKey=819ce2fd80e94a9e905fbc630aa67cb0&page=${pageNo}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'ok' });
  });

  it('should get temperature', () => {
    service.getTemperature().subscribe((weatherResponse) => {
      expect(weatherResponse).toBeTruthy();
      expect(weatherResponse.location).toBeTruthy();
    });

    const req = httpMock.expectOne('https://api.weatherapi.com/v1/current.json?key=ff4807c5452b4109bdf70001232112&q=Delhi/India');
    expect(req.request.method).toBe('GET');
    req.flush({ location: {} });
  });
});
