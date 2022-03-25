import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { MatDialog, MatDialogRef, } from "@angular/material/dialog";
import { DialogContainerComponent } from "src/app/shared/components/dialog-container/dialog-container.component";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  dialogRef: MatDialogRef<DialogContainerComponent>;

  open(component: any, options: any) {
    const { data, width, height } = options;
    this.dialogRef = this.dialog.open(DialogContainerComponent, {
      data: {
        component,
        ...data
      },
      width,
      height,
    });
  }

  closed(): Observable<any> {
    return this.dialogRef.afterClosed()
      .pipe(
        take(1),
        map(res => res)
      );
  }
}
