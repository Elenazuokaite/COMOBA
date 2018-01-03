import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef
} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth.service';
import {AuthHttp} from 'angular2-jwt';

import {GlobalVariable} from '../../config';
@Injectable()
export class TargetsService {

  baseApiUrl = GlobalVariable.BACK_END_URL;
  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector,
      private http: Http,
      private auth: AuthService,
      private authHttp: AuthHttp
  ) { }
  appendComponentToBody(component: any, target:any) {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the div
    document.getElementById("campaign_targets").appendChild(domElem);

  }
  createTarget(id:any, target_type:string){
    var formData: FormData = new FormData();
    formData.append('type', target_type);

    return this.authHttp.post(this.baseApiUrl + '/campaign/target/new/'+id, formData,
    {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})}
    ).map(
          (response: Response) => {
              return response.json();
          }
      );
  }
}