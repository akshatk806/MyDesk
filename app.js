const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve the client-side code
app.use(express.static(__dirname + '/public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'offer' events and broadcast the offer to other clients
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  // Listen for 'answer' events and broadcast the answer to other clients
  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  // Listen for 'ice-candidate' events and broadcast the candidate to other clients
  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
