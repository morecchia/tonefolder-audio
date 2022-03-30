import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FocusService {
  focusChange$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}
