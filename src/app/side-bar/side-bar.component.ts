import { Component, OnInit } from '@angular/core';
import { Area } from '../dashboard-area/area';
import { AREA_STATIC } from '../dashboard-area/area-static';
import { Ttype } from '../dashboard-type/ttype';
import { TTYPE_STATIC } from '../dashboard-type/ttype-static';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  types: Ttype[] = TTYPE_STATIC;
  constructor() { }

  ngOnInit() {
  }

}
