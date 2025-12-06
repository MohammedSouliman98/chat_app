import { Server } from "socket.io";

let io;
const initsocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      Credential: true,
    },
  });

  var messages = new Map();
  const onlineusers = new Map();

  io.on("connection", (socket) => {
    console.log("connected");

    // console.log("onlineusers :", onlineusers);

    socket.on("register", (userId) => {
      onlineusers.set(userId, socket.id);
    });

    socket.on("send-message", (data) => {
      const { recivedId, content, senderId, date, username, color } = data;

      const message = {
        type: "private",
        content: content,
        senderId: senderId,
        recivedId: recivedId,
        date: date,
        color: color,
        username: username,
        recive: true,
      };

      messages.set(senderId, message);
      console.log(message);
      io.to(`${onlineusers.get(recivedId)}`).emit("recive-message", message);
    });

    socket.on("join-room", (data) => {
      socket.emit("message-room", messages);
      let { room, userId, date, username } = data;
      socket.join(room);
      const welcomemessage = {
        type: "room",
        content: "welcome to our group",
        date: new Date().toLocaleString(),
        username: username,
        color: "info",
        recive: true,
      };

      socket.to(room).emit("user-joined", welcomemessage);

      socket.on("message-group", (m) => {
        console.log(messages);

        const { content, senderId, date, username, color } = m;
        const messagegroup = {
          type: "room",
          senderId: senderId,
          content: content,
          date: date,
          username: username,
          color: color,
          recive: true,
        };
        messages.set(room, messagegroup);
        socket.to(room).emit("recive-message", messagegroup);
      });
    });

    // io.on("disconnect", () => {
    //   console.log("disconnect user");
    // });
  });

  return io;
};

export { initsocket };
