import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-provider',
  templateUrl: './global-provider.component.html',
  styleUrls: ['./global-provider.component.css']
})
export class GlobalProviderComponent implements OnInit {

  public host="http://localhost:8080"

  constructor() { }

  ngOnInit() {
  }

}
