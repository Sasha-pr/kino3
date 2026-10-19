import { Component, inject, signal } from '@angular/core';
import { Film } from '../../models/film';
import { DEMO_FILMS } from '../../data/demo-fimls';
import { FilmCard } from '../../film-card/film-card';
import { Favorites } from '../../services/favorites';
import { FilmService } from '../../services/film.services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-catalog',
  imports: [FilmCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  favorites = inject(Favorites);
  api = inject(FilmService);
  title = 'Кадр';
  films = signal<Film[]>([]);
  loading = signal(true);
  request = new Subscription();
  ngOnInit(): void {
    this.load();
  }
  load() {
    this.request.unsubscribe();
    this.loading.set(true);
    this.films.set([]);

    this.request = this.api.getCollection('TOP_250_MOVIES').subscribe({
      next: (result) => {
        this.films.set(result.items);
        this.loading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.loading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.request.unsubscribe();
  }
}
