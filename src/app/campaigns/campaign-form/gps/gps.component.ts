import { Component, OnInit, ElementRef } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit {

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
