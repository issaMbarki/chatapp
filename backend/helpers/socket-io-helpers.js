const leaveAllRooms =(socket)=>{
    const socketRooms =socket.rooms 
    socketRooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
      }
    });
  }
const joinORcreateNewRoom=(socket,roomId)=>{
socket.join(roomId)
}
  module.exports = {
 leaveAllRooms,
 joinORcreateNewRoom,
  };