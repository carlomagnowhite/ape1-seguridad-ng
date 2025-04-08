import { Injectable } from '@angular/core';
import { AuthSession, createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { UserInfo } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }



  async getMessages(){
    const response = await this.supabase.from('messages').select('*')
    console.log(response.data)
    return response.data;
  }

  async getEncriptedMessages(){
    const response = await this.supabase.from('messages_encrypted').select('*')
    console.log(response.data)
    return response.data;
  }

  async createMessage(userInfo: UserInfo){
    const response = await this.supabase.from('messages').insert({
      name: userInfo.name,
      lastname: userInfo.lastname,
      email: userInfo.email,
    })
    console.log(response.data)
    return response.data;
  }

  async createEncryptedMessage(userInfo: UserInfo){
    const response = await this.supabase.from('messages_encrypted').insert({
      name: userInfo.name,
      lastname: userInfo.lastname,
      email: userInfo.email,
    })
    console.log(response.data)
    return response.data;
  }

}
