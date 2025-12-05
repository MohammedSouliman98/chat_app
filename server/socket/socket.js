import { Server } from "socket.io";

let io;
const initsocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      // Credential,
    },
  });

  var users = [];
  var messages = [];

  io.on("connection", (socket) => {
    console.log("connected");

    // socket.join(`user-${socket.id}`);
    console.log("connected user", socket.id);

    users.push(socket.id);
    io.emit("update-users", users);

    socket.on("send-message", (data) => {
      const { recivedId, content } = data;

      const message = {
        content: content,
        senderId: socket.id,
        recivedId: recivedId,
        date: data.date,
        color: data.color,
        username: "ali",
        recive: true,
      };

      console.log(data);
      io.to(`${recivedId}`).emit("recive-message", message);
      // socket.emit("massege-sent", message);
    });

    io.on("disconnect", () => {
      console.log("disconnect user");

      user.pop(socket.id);
      io.emit("update-users", users);
    });
  });

  return io;
};

export { initsocket };
