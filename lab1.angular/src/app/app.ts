import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

//siguendo TDD 
export class App implements OnInit {
  title = signal('Laboratiorio1!');

  ngOnInit(): void {


  }
}
