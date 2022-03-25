import { Component, Input } from '@angular/core';
import { FileListItem, UploadStatus } from 'src/app/shared/models/track';

@Component({
  selector: 'app-upload-table',
  templateUrl: './upload-table.component.html',
  styleUrls: ['./upload-table.component.scss']
})
export class UploadTableComponent {
  @Input()
  fileList: FileListItem[] = [];

  uploadStatus = UploadStatus;
  displayedColumns = ['name', 'size', 'status'];

  getUploadStatus(filename: string): string {
    const uploadStatus = this.fileList && this.fileList.find(u => u.name === filename);
    return uploadStatus ? uploadStatus.status : UploadStatus.pending;
  }
}
