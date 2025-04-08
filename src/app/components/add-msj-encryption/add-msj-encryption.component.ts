import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserInfo } from '../../interfaces/usuario.interface';
import { SupabaseService } from '../../services/supabase.service';
import { Observable, lastValueFrom } from 'rxjs';

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
  private readonly supabaseService: SupabaseService = inject(SupabaseService);

  userEncryptedGetted = signal<UserInfo | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private formBuilder: FormBuilder) {
    this.ngForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.createMessage({
      name: "JAIR",
      lastname: "MATEO",
      email: "PAREDES"
    });
  }

  closeModal() {
    this.closeEvent.emit(false);
  }

  async onSubmit() {
    if (this.ngForm.invalid) return;
    
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const userData = this.mapearDatos();
      await this.createMessage(userData);
      this.closeModal();
    } catch (err) {
      console.error('Error:', err);
      this.error.set(err instanceof Error ? err.message : 'Ocurrió un error');
    } finally {
      this.loading.set(false);
    }
  }

  private async createMessage(userInfo: UserInfo) {
    // Primero creamos el mensaje normal
    await this.supabaseService.createMessage(userInfo);
    
    // Luego creamos el mensaje cifrado
    await this.createEncryptedMessage(userInfo);
  }

  private async createEncryptedMessage(user: UserInfo) {
    // Esperamos a que se complete el cifrado
    const encryptedUser = await this.encryptData(user);
    
    // Guardamos el mensaje cifrado
    if (encryptedUser) {
      await this.supabaseService.createEncryptedMessage(encryptedUser);
    }
  }
  
  private async encryptData(userData: UserInfo): Promise<UserInfo> {
    try {
      // Convertimos el Observable a Promise con lastValueFrom
      const res = await lastValueFrom(this.apiService.sendRegister(userData));
      
      const encryptedUser: UserInfo = {
        name: res.usuario.name.texto_cifrado,
        lastname: res.usuario.lastname.texto_cifrado,
        email: res.usuario.email.texto_cifrado
      };
      
      this.userEncryptedGetted.set(encryptedUser);
      return encryptedUser;
    } catch (err) {
      console.error("Error al cifrar datos:", err);
      throw new Error("Error al cifrar los datos");
    }
  }

  private mapearDatos(): UserInfo {
    return {
      name: this.ngForm.get('name')?.value,
      lastname: this.ngForm.get('lastname')?.value,
      email: this.ngForm.get('email')?.value
    };
  }
}