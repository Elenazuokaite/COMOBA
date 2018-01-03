import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AppService {

    private subjects: Subject<any>[] = [];

    constructor(
        public snackBar: MatSnackBar
    ) {

    }

    publish(eventName: string) {

        this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
        this.subjects[eventName].next();
    }

    on(eventName: string): Observable<any> {

        this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
        return this.subjects[eventName].asObservable();
    }
    openSnackBar() {
        this.snackBar.open('Target removed', '', {
          duration: 3000,
        });
      }  
}