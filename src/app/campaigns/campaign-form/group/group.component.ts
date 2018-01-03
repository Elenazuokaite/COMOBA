import { Component, OnInit, ElementRef } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

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
