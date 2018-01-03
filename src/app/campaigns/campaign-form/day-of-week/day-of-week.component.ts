import { Component, OnInit, ElementRef } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-day-of-week',
  templateUrl: './day-of-week.component.html',
  styleUrls: ['./day-of-week.component.scss']
})
export class DayOfWeekComponent implements OnInit {

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
