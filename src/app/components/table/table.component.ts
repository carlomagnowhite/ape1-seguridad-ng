import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  open: boolean = false;

  openModal(){
    this.open = true;
  }
  closeModal(){
    this.open = false;
  }
}
