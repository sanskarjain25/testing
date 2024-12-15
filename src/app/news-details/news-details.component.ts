import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css',
})
export class NewsDetailsComponent {
  movies: any = {};
  index: number;
  constructor(
    private router: ActivatedRoute,
    private NewsService: NewsService
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.index = +params['id'];
    });
    this.movies = this.NewsService.movies[this.index];
    console.log(this.movies);
  }
}
