import { Component, ComponentRef, Inject, OnInit } from '@angular/core';
import { CdkPortalOutletAttachedRef, ComponentPortal } from '@angular/cdk/portal';
import { MAT_DIALOG_DATA, } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent implements OnInit {
  portal: ComponentPortal<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.portal = new ComponentPortal(this.data.component);
  }

  attach(ref: CdkPortalOutletAttachedRef) {
    ref = ref as ComponentRef<typeof this.data.component>;
    for (let prop in this.data){
      ref.instance[prop] = this.data[prop];
    }
  }
}
