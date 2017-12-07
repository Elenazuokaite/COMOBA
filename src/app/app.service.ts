import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class AppService {

    private subjects: Subject<any>[] = [];

    constructor() {

    }

    publish(eventName: string) {

        this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
        this.subjects[eventName].next();
    }

    on(eventName: string): Observable<any> {

        this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
        return this.subjects[eventName].asObservable();
    }
}