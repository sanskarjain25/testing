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
        animate(
          600,
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
  movies: any[] = [];
  newsList: any[] = [];
  newsSourceData: any[] = [];
  isLoading = true;

  constructor(private route: Router, private NewsService: NewsService) {}

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList() {
    if (this.isBrowser()) {
      if (navigator.onLine) {
        // Fetch news list from the API if online
        this.NewsService.showAllSources().subscribe((news: any) => {
          this.newsList = news.sources;

          // Save the data to localStorage
          localStorage.setItem('newsList', JSON.stringify(this.newsList));

          // Fetch data from the first source
          this.getDataFromNewsSource(this.newsList[0]?.id);
        });
      } else {
        // Load news list from localStorage if offline
        const storedNewsList = localStorage.getItem('newsList');
        if (storedNewsList) {
          this.newsList = JSON.parse(storedNewsList);
          this.getDataFromNewsSource(this.newsList[0]?.id);
        } else {
          console.error('No offline data available.');
        }
      }
    } else {
      console.error('localStorage is not available in this environment.');
    }
  }

  goToNewsSource(news) {
    this.getDataFromNewsSource(news.id);
  }

  getDataFromNewsSource(id: string) {
    if (this.isBrowser()) {
      if (navigator.onLine) {
        // Fetch news data from the API if online
        this.NewsService.showNewsFromASource(id).subscribe((news: any) => {
          this.isLoading = false;
          this.newsSourceData = news.articles;

          // Save the data to localStorage
          localStorage.setItem(`newsSource_${id}`, JSON.stringify(this.newsSourceData));
        });
      } else {
        // Load news data from localStorage if offline
        const storedNewsData = localStorage.getItem(`newsSource_${id}`);
        if (storedNewsData) {
          this.newsSourceData = JSON.parse(storedNewsData);
          this.isLoading = false;
        } else {
          console.error('No offline data available for this source.');
        }
      }
    } else {
      console.error('localStorage is not available in this environment.');
    }
  }

  getNewsByName() {
    if (this.isBrowser()) {
      if (navigator.onLine) {
        this.NewsService.searchNewByName(this.filteredStatus).subscribe((news: any) => {
          this.isLoading = false;
          this.newsSourceData = news.articles;

          // Save the search result to localStorage
          localStorage.setItem('searchedNews', JSON.stringify(this.newsSourceData));
        });
      } else {
        // Load the last search result from localStorage if offline
        const storedSearchedNews = localStorage.getItem('searchedNews');
        if (storedSearchedNews) {
          this.newsSourceData = JSON.parse(storedSearchedNews);
          this.isLoading = false;
        } else {
          console.error('No offline search data available.');
        }
      }
    } else {
      console.error('localStorage is not available in this environment.');
    }
  }

  onDetails(news) {
    window.open(news.url, '_blank');
  }

  onDownload(news) {
    window.open(news.url, '_blank');
  }

  // Utility method to check if running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}