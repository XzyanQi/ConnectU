import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { AuthService } from './../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  currentUserId: string;
  public users: Observable<any>;
  public chatRooms: Observable<any>;
  public selectedChatRoomMessages: Observable<any>;

  constructor(
    public auth: AuthService, 
    private api: ApiService
  ) { 
   this.getId();
  }

  getId() {
    this.currentUserId = this.auth.getId();
    console.log('Current User ID:', this.currentUserId); 
    if (!this.currentUserId) {
      console.error('Failed to retrieve current user ID');
    }
  }
  
  getUsers() {
    if (!this.currentUserId) {
      this.getId();
    }
    const query = this.api.whereQuery('uid', '!=', this.currentUserId);
    console.log('Firestore Query:', query); 
    this.users = this.api.collectionDataQuery('users', query);
    this.users.subscribe(data => console.log('Filtered Users:', data));
  }

  async createChatRoom(user_id: string) {
    try {
      let room: any;
      const querySnapshot = await this.api.getDocs(
        'chatRooms',
        this.api.whereQuery(
          'members',
          'in',
          [[user_id, this.currentUserId], [this.currentUserId, user_id]]
        )
      );
  
      room = querySnapshot.map((doc: any) => doc);
      console.log('exist docs: ', room);
  
      if (room?.length > 0) return room[0];
  
      const data = {
        members: [this.currentUserId, user_id],
        type: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      room = await this.api.addDocument('chatRooms', data);
      return room;
    } catch (e) {
      throw e;
    }
  }
  

  getChatRooms() {
    this.getId();
    this.chatRooms = this.api.collectionDataQuery(
      'chatRooms',
      this.api.whereQuery('members', 'array-contains', this.currentUserId)
    ).pipe(
      switchMap((rooms: any[]) => {
        return forkJoin(
          rooms.map((room) => {
            const userId = room.members.find((id: string) => id !== this.currentUserId);
            return this.api.getDocById(`users/${userId}`).then(user => ({
              ...room,
              user: user.data()
            }));
          })
        );
      })
    );
  }
  

  getChatRoomMessages(chatRoomId: string) {
    this.selectedChatRoomMessages = this.api.collectionDataQuery(
      `chats/${chatRoomId}/messages`,
      this.api.orderByQuery('createdAt', 'desc')
    ).pipe(
      map((arr: any[]) => [...arr].reverse())
    );
  }
  

  async sendMessage(chatId, msg) {
    try {
      const new_message = {
        message: msg,
        sender: this.currentUserId,
        createdAt: new Date()
      };
      console.log(chatId);
      if(chatId) {
        await this.api.addDocument(`chats/${chatId}/messages`, new_message);
      }
    } catch(e) {
      throw(e);
    }
  }

}
