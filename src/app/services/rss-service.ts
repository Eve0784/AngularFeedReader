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
    this.firestore.getUserFeeds()
      .then(feeds => {
        this.getNews(feeds);

      })
    // const userFeeds = this.firestore.getUserFeeds()
    //   .then(feeds => {
    //     // const firstFeed = feeds[0];
    //   })
  }
  getNews(feeds: Feed[]) {

    // console.log(feeds);


    const requests = [];

    for (const feed of feeds) {
      const request = fetch(feed.url)
        .then(async resp => {
          const origin = feed.name;
          const xml = await resp.text()
          return { origin, xml }
        })
        .catch(err => '');

      requests.push(request)
    }

    Promise.all(requests)
      .then(res => this.parseRss(res));
    // return fetch(firstFeed.url)
    //   .then(resp => resp.text())
    //   .then(text => this.parseRss(text))
  }
  parseRss(responses: any[]): any {
    const latestNews: News[] = [];

    for (const response of responses) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.xml, 'application/xml');

      const items = xml.querySelectorAll('item');

      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        //console.log(element);

        const thumbnail = element.getElementsByTagName("media:thumbnail")[0];

        const rawDate = element.querySelector('pubDate')?.textContent ?? '';
        const publicDate = new Date(rawDate); // Date real


        const news: News = {
          title: element.querySelector('title')?.innerHTML!,
          description: element.querySelector('description')?.innerHTML!,
          url: element.querySelector('link')?.innerHTML!,
          image: thumbnail?.getAttribute('url') ?? '',
          pubDate: publicDate,
          origin: response.origin?.toUpperCase() ?? ''
        }
        //console.log('IMAGE:', news.image);
        latestNews.push(news)

      }

    }

    latestNews.sort((n1, n2) => n2.pubDate!.getTime() - n1.pubDate!.getTime())

    this.news.set(latestNews);
    // console.log(latestNews);
  }
}


// free feeds nunti (app)
// f-Droid open source android
