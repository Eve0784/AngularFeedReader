import { inject, Injectable, signal } from '@angular/core';
import { FirestoreService } from './firestore-service';
import { Feed } from '../model/feed';
import { News } from '../model/news';

@Injectable({
  providedIn: 'root',
})
export class RssService {

  firestore = inject(FirestoreService);
  news = signal<News[]>([]);

  constructor() {
    const userFeeds = this.firestore.getUserFeeds()
      .then(feeds => {
        const firstFeed = feeds[0];
        this.getNews(firstFeed);
      })
  }
  getNews(firstFeed: Feed) {
    return fetch(firstFeed.url)
      .then(resp => resp.text())
      .then(text => this.parseRss(text))
  }
  parseRss(text: string): any {
    const latestNews: News[] = [];
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');

    const items = xml.querySelectorAll('item');
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      console.log(element);

      const thumbnail = element.getElementsByTagName("media:thumbnail")[0];

      const rawDate = element.querySelector('pubDate')?.textContent ?? '';
      const publicDate = new Date(rawDate); // Date real


      const news: News = {
        title: element.querySelector('title')?.innerHTML!,
        description: element.querySelector('description')?.innerHTML!,
        url: element.querySelector('link')?.innerHTML!,
        image: thumbnail?.getAttribute('url') ?? '',
        pubDate: publicDate
      }

      console.log('IMAGE:', news.image);
      latestNews.push(news)
    }

    this.news.set(latestNews);
    console.log(latestNews);



  }
}
