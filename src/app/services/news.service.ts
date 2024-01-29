import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../model/news';

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface WeatherResponse {
  location: Location;
  current: Current;
}


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  

  constructor(private http: HttpClient) { }

  public fetchNewsHome(keyword:string): Observable<News> {

    return this.http.get<News>(`http://localhost:8083/api/v3/getNews/${keyword}`)

  }

  public fetchNews(keyword:string, pageNo:number, pageSize:number): Observable<News> {
     return this.http.get<News>(`http://localhost:8083/api/v3/fetchNews/${keyword}/${pageNo}/${pageSize}`)

  }

  public topHeadlines(pageNo:number, pageSize:number ): Observable<News> {
     return this.http.get<News>(`http://localhost:8083/api/v3/topHeadlines/${pageNo}/${pageSize}`)
  }
  
  public getTemperature(): Observable<WeatherResponse> {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=ff4807c5452b4109bdf70001232112&q=Delhi/India`;
    return this.http.get<WeatherResponse>(apiUrl);
  }
  
}
