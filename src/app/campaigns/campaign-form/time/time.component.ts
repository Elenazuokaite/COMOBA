import { Component, OnInit, ElementRef } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1, //must be divisible by step
    limit:  24, //must be divisible by step
    range: {
      min: 0,
      max: 24,
    },
    pips: {
      mode: 'count', //there were too much pips to see anything
      values: 5,
      density: 4
    },
    step: 1,
  };
someRange: number|number[] =  [6,22];

  constructor(
    private elRef: ElementRef,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  remove(){    
        this.elRef.nativeElement.querySelector('.time-selection').remove();
        this.appService.openSnackBar();
      }
}
