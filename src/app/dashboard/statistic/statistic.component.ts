import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
// export class StatisticComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


/**
 * @title Basic table
 */

export class StatisticComponent {
  displayedColumns = ['position', 'name', 'datefrom', 'dateto', 'rotations', 'displaytime'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
}

export interface Element {
  name: string;
  position: number;
  datefrom: string;
  dateto: string;
  rotations: string;
  displaytime: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1,
    name: 'Minton Admin v1',
    datefrom: '01 / 01 / 2017', dateto: '26/04/2017', rotations: '5000', displaytime: '1hr 25mins 15s' },
  { position: 2,
    name: 'Minton Admin v1', datefrom: '01 / 01 / 2017', dateto: '26/04/2017', rotations: '5000', displaytime: '1hr 25mins 15s' },
  { position: 3,
    name: 'Minton Admin v1', datefrom: '01 / 01 / 2017', dateto: '26/04/2017', rotations: '5000', displaytime: '1hr 25mins 15s' },
  { position: 4,
    name: 'Minton Admin v1', datefrom: '01 / 01 / 2017', dateto: '26/04/2017', rotations: '5000', displaytime: '1hr 25mins 15s' },
  { position: 5,
    name: 'Minton Admin v1', datefrom: '01 / 01 / 2017', dateto: '26/04/2017', rotations: '5000', displaytime: '1hr 25mins 15s' },
];
