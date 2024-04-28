import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
 
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],

})
export class DialogComponent {
  @Output() closeModalEvent = new EventEmitter();

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
