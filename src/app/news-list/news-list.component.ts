import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { state, style, transition, animate } from '@angular/animations';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  animations: [
    trigger('fade', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(600),
      ]),
      transition('* => void', [
        animate(600,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class NewsListComponent implements OnInit {
  filteredStatus = '';
  movies: any[];
  newsList: any[];
  newsSourceData: any[];
  isLoading = true;

  constructor(private route: Router, private NewsService: NewsService) {}

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList() {
    this.NewsService.showAllSources().subscribe((news: any) => {
      this.newsList = news.sources;
      this.getDataFromNewsSource(this.newsList[0].id);
    });
  }

  goToNewsSource(news) {
    this.getDataFromNewsSource(news.id);
  }

  getDataFromNewsSource(id) {
    this.NewsService.showNewsFromASource(id).subscribe((news: any) => {
      this.isLoading = false;
      this.newsSourceData = news.articles;
    });
  }
  // getDataFromNewsSourceoofline() {
  //   // Simulate loading data from the local JSON file
  //   this.newsSourceData = (newsData as any).articles;
  //   this.isLoading = false;
  // }
  getNewsByName() {
    this.NewsService.searchNewByName(this.filteredStatus).subscribe((news: any) => {
      this.isLoading = false;
      this.newsSourceData = news.articles;
    });
  }

  onDetails(news) {
    window.open(news.url, '_blank');

  }
  onDowload(news) {
    window.open(news.url, '_blank');

  }
}
