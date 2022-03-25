import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileDropService } from 'src/app/core/services/file-drop.service';

@Component({
  selector: 'app-file-dropper',
  templateUrl: './file-dropper.component.html',
  styleUrls: ['./file-dropper.component.scss'],
})
export class FileDropperComponent {
  @Input()
  acceptedFileTypes: string[] = [];
  
  @Input()
  multiple: boolean;

  @Input()
  message: string;

  constructor(private fileDropService: FileDropService) { }

  dropped(files: NgxFileDropEntry[]) {
    for (const v of files) {
      if (!v.fileEntry.isFile || !this.fileDropService.isAccepted(v.relativePath, this.acceptedFileTypes)) {
        continue;
      }
      this.fileDropService.fileDropped.next(v);
    }
  }
}
