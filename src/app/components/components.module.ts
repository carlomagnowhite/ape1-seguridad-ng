import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { AddMsjEncryptionComponent } from './add-msj-encryption/add-msj-encryption.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
    AddMsjEncryptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent
  ]
})
export class ComponentsModule { }
