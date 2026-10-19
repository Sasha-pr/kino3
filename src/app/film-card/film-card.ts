import { Component, input, output } from '@angular/core';
import { Film } from '../models/film';

@Component({
  selector: 'app-film-card',
  imports: [],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
})
export class FilmCard {
  film = input.required<Film>();
  saved = input(false);
  toggleFavorite = output<Film>();
}
