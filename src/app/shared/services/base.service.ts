import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { handleError } from '../../../utils/handle-error';

export class BaseService {
  httpError$ = new BehaviorSubject<any>(null);
  private _sb: MatSnackBar;

  constructor(snackbar: MatSnackBar) {
    this._sb = snackbar;
  }

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
    this._sb.open(message, 'Ok', options);
  }
}