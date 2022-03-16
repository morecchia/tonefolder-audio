import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { handleError } from '../../../utils/handle-error';

export class BaseService {
  httpError$ = new BehaviorSubject<any>(null);
  focusChange$ = new BehaviorSubject<boolean>(false);
  
  constructor(private snackbar: MatSnackBar) { }

  errorCallback = (errObj: HttpErrorResponse) => {
    console.log(errObj);
    this.httpError$.next(errObj);
    if (errObj) {
      const message = errObj.error && errObj.error.message
        ? errObj.error.message : 'Unknown error';
      this.showToast(message, 'error-state');
    }
    return handleError(errObj);
  }

  showToast(message: string, state?: string) {
    const options: MatSnackBarConfig = state ? { panelClass: state, duration: 2000 } : { duration: 2000 };
    this.snackbar.open(message, 'Ok', options);
  }
}