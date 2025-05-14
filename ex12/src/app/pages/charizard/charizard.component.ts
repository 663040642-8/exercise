import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-charizard',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './charizard.component.html',
  styleUrl: './charizard.component.scss'
})
export class CharizardComponent {

}
