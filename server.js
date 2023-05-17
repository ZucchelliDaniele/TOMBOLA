import { WebSocketServer } from 'ws';

class sockets {
  #socket;#group;#nickname;
  constructor(socket, nick, group) {
    this.setSocket=socket
    this.setGroup=group
    this.setNick=nick
  }
  set setNick(nickname) {
    this.#nickname=nickname;
  }
  get nick() {
    return this.#nickname
  }
  set setSocket(socket) {
    this.#socket=socket;
  }
  set setGroup(group) {
    this.#group=group;
  }
  get socket() {
    return this.#socket;
  }
  get group() {
    return this.#group
  }
}

var webSockets = [];
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.send('connection successful');
  ws.on('message', function message(data) {
    var message=JSON.parse(data.toString())
    if(message.connect == 1) {
      console.log("CONNESSO")
      for(let i=0; i<webSockets.length; i++) {
        if(webSockets[i].socket!=ws) {
          webSockets.push(new sockets(ws, message.nick, message.group))
          console.log("ID: "+i+" NICK: "+webSockets[i].nick+" GROUP: "+webSockets[i].group)
        }
        if(webSockets[i].socket==ws) {
          webSockets[i].setSocket=ws;
          webSockets[i].setGroup=message.group;
          webSockets[i].setNick=message.nick;
          console.log("ID: "+i+" NICK: "+webSockets[i].nick+" GROUP: "+webSockets[i].group)
        }
      }
    }
    else {
    console.log('received: %s', message.msg);
    let group;
    for(let j=0; j<webSockets.length; j++) {
      if(webSockets[j].socket==ws) {
        group=webSockets[j].group;
      }
    }
    for(let j=0; j<webSockets.length; j++) {
      if(webSockets[j].socket!=ws && webSockets[j].group == group) {
        webSockets[j].socket.send(message.msg.toString());
      }
    }
  }
  });
});