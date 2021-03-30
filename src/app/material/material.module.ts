import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule} from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

const MATERIAL = [
  MatListModule,
  MatSliderModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatDialogModule,
  DragDropModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL
  ],
  exports: [...MATERIAL],
})
export class MaterialModule { }
