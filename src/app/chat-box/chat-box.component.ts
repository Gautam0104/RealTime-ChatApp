import { Component, OnInit } from '@angular/core';
import  io from 'socket.io-client'


const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  
  socket:any;
  message!:string;
constructor() { }
ngOnInit() {
  this.setupSocketConnection();
}



SendMessage() {
   this.socket.emit('message', this.message);
   const element = document.createElement('li');
   element.innerHTML = this.message;
   element.style.background = 'green';
   element.style.color = 'white';
   element.style.padding =  '5px 20px';
   element.style.margin = '10px';
   element.style.textAlign = 'right';
   element.style.fontFamily = 'cursive';
   element.style.float = 'right';
   element.style.width = 'auto';
   element.style.border = '2px solid black ';
   element.style.borderRadius = '10px'
   element.style.clear = 'both';
   document.getElementById("message-list")?.appendChild(element);
   this.message = '';
}
setupSocketConnection() {
  this.socket = io(SOCKET_ENDPOINT);
  this.socket.on('message-broadcast', (data: string) => {
  if (data) {
   const element = document.createElement('li');
   element.innerHTML = data;
   element.style.background = 'black';
   element.style.color = 'white';
   element.style.padding =  '5px 20px';
   element.style.margin = '10px';
   element.style.fontFamily = 'cursive';
   element.style.width = 'auto';
   element.style.border = '2px solid black ';
   element.style.borderRadius = '10px'
   element.style.clear = 'both';
   document.getElementById('message-list')?.appendChild(element);
   }
 });
}

}



