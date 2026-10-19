
import { Component, inject } from '@angular/core';
import { Favorites } from '../services/favorites';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  favorites = inject(Favorites);
}
