import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserInfo } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-add-msj-encryption',
  templateUrl: './add-msj-encryption.component.html',
  styleUrl: './add-msj-encryption.component.css'
})
export class AddMsjEncryptionComponent {

  @Input() open: boolean = false;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngForm: FormGroup;
  private readonly apiService: ApiService = inject(ApiService);

  constructor(private formBuilder: FormBuilder){
    this.ngForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  closeModal(){
    this.closeEvent.emit(false);
  }

  onSubmit(){
    if (this.ngForm.valid) {
      const user = this.mapearDatos();
      this.apiService.sendRegister(user).subscribe({
        next: (res) => {
          console.log("usuario creado ", res);
          this.closeModal();
        },
        error: (err) => {
          console.error("Error al crear el usuario. ", err);
        }
      });
    }else{
      console.warn("Formulario no válido");
      this.ngForm.markAsTouched();
    }
  }

  mapearDatos(): UserInfo{
    const user: UserInfo = {
      name : this.ngForm.get('name')?.value,
      lastname : this.ngForm.get('lastname')?.value,
      email : this.ngForm.get('email')?.value
    };
    return user;
  }

}
