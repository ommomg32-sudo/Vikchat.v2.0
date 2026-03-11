const WebSocket = require("ws");

const wss = new WebSocket.Server({ port:3001 });

let waiting=null;

wss.on("connection",ws=>{

 if(waiting){
   ws.partner=waiting
   waiting.partner=ws
   waiting=null
 }else{
   waiting=ws
 }

 ws.on("message",msg=>{
   if(ws.partner){
     ws.partner.send(msg.toString())
   }
 })

})
