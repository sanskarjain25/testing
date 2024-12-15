import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from './news';
import { Observable } from 'rxjs';

export type ApiResponse = {
  Response: string;
  Search: Movie[];
  totalResults: string;
};

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  API_KEY = '2322d1b706314ec48bab6cbeeb844040';
  constructor() {
    this.showAllSources().subscribe((movie: any) => {
      this.movies = movie.movies;
    });
  }
  movies: any[];
  http: HttpClient = inject(HttpClient);
  showAllSources(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(
      `https://newsapi.org/v2/top-headlines/sources?category=business&apiKey=${this.API_KEY}`,
      { headers: headers }
    );
  }

  showNewsFromASource(source): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(
      `https://newsapi.org/v2/top-headlines/?apiKey=${this.API_KEY}&sources=${source}`,
      { headers: headers }
    );
  }

  searchNewByName(searchTerm):  Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    https://newsapi.org/v2/everything?q=bitcoin&apiKey=API_KEY
    return this.http.get<any>(
      `https://newsapi.org/v2/top-headlines/?apiKey=${this.API_KEY}&q=${searchTerm}`,
      { headers: headers }
    );
  }
}
