import { Server } from 'http';
// import {}

// class SocketService {
//     private io: socketIO.Server;

//     constructor(server: Server) {
//         this.io = socketIO(server);

//         this.io.on('connection', (socket: socketIO.Socket) => {
//             console.log('A user connected');

//             socket.on('disconnect', () => {
//                 console.log('A user disconnected');
//             });

//             socket.on('message', (message: string) => {
//                 console.log('Message received: ', message);
//                 this.io.emit('message', message);
//             });
//         });
//     }
// }

// export default SocketService;