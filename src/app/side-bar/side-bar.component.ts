import { Component, OnInit } from '@angular/core';
import { Area } from '../dashboard-area/area';
import { AREA_STATIC } from '../dashboard-area/area-static';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  areas: Area[] = AREA_STATIC;
  constructor() { }

  ngOnInit() {
  }

}
