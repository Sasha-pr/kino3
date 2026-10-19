import { Injectable, signal } from '@angular/core';
import { Film } from '../models/film';
@Injectable({
  providedIn: 'root',
})
export class Favorites {
  films = signal<Film[]>(this.read());
  has(id: number) {
    for (const film of this.films()) {
      if (film.kinopoiskId === id) {
        return true;
      }
    }
    return false;
  }
  toggle(film: Film) {
    const updated: Film[] = [];

    for (const savedFilms of this.films()) {
      if (savedFilms.kinopoiskId !== film.kinopoiskId) {
        updated.push(savedFilms);
      }
    }
    updated.push(film);
    this.films.set(updated);
    this.save();
  }

  save(): void {
    const text = JSON.stringify(this.films());
    localStorage.setItem('favorites-bd', text);
  }

  read(): Film[] {
    try {
      const text = localStorage.getItem('favorites-bd');
      if (text === null) {
        return [];
      }
      const films: Film[] = [];
      const saved = JSON.parse(text);
      for (const film of saved) {
        films.push(film);
      }
      return films;
    } catch {
      return [];
    }
  }
}
