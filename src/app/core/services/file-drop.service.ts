import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Injectable({
  providedIn: 'root'
})
export class FileDropService {
  fileDropped = new BehaviorSubject<NgxFileDropEntry>(null);

  isAccepted(filename: string, accepted: string[]): boolean {
    const ext = filename.split('.').pop();
    return accepted.includes(`.${ext}`);
  }
}
