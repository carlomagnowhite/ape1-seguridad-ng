import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { UserInfo } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  open: boolean = false;

  private readonly supabaseService: SupabaseService = inject(SupabaseService);

    userEncryptedGetted = signal<UserInfo[] | null>(null);
  
  ngOnInit() {
    this.getMessages();
  }

  async getMessages() {
    const messages = await this.supabaseService.getEncriptedMessages();
    this.userEncryptedGetted.set(messages);
    console.log(messages);
  }
  
  openModal(){
    this.open = true;
  }
  closeModal(){
    this.open = false;
  }
}
