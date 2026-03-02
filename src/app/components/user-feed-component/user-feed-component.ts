import { Component, effect, inject } from '@angular/core';
import { RssService } from '../../services/rss-service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-user-feed-component',
  imports: [CommonModule],
  templateUrl: './user-feed-component.html',
  styleUrl: './user-feed-component.scss',
})
export class UserFeedComponent {

  rssServ = inject(RssService);

  constructor(){
   effect(() =>{
    this.rssServ.news()
   })
  }


  timeAgo(pubDate: string | Date): string {
  const date = new Date(pubDate); // convierte string a Date si es necesario
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return 'meno di 1 ora fa';
  if (hours === 1) return '1 ora fa';
  return `${hours} ore fa`;
}

}
