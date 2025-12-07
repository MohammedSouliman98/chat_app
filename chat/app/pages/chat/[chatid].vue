<template>
  <div class="flex flex-row justify-between h-screen md:w-[60%] mx-auto">
    <div class=".chat-all w-full h-screen">
      <div class="w-full flex justify-between bg-green-500 p-4">
        <div class="flex gap-4">
          <h1 class="font-bold text-xl">Clone whatsapp</h1>
        </div>
        <Button label="Logout" @click="logout" />
      </div>
      <h1 class="font-bold">
        chat with
        <span class="text-xl">{{ reciver || route.params.chatid }}</span>
      </h1>
      <div class="chat h-[75%] overflow-y-auto p-3" id="chat">
        <div
          class="w-full flex my-3"
          :class="
            currentuserid !== m.senderId ? 'justify-start' : 'justify-end'
          "
          v-for="(m, index) in messages"
          :key="index"
        >
          <Message
            class="w-[50%] flex"
            :class="
              currentuserid !== m.senderId ? 'justify-start' : 'justify-end'
            "
            :severity="m.recive ? m.color : route.query.color"
          >
            <div class="flex gap-7 justify-start items-center mb-2">
              <span class="text-white">{{ m.date }}</span>
              <h1 class="text-white">{{ m.username }}</h1>
            </div>
            <p>
              {{ m.content }}
            </p>
          </Message>
        </div>
      </div>
      <Form class="flex gap-3">
        <InputText
          type="text"
          @keyup.enter="sendmessage"
          v-model="message.content"
          fluid
        />
        <Button label="Send" @click="sendmessage" />
      </Form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";
import axiosClient from "~/axios";
var socket;
const route = useRoute();
const reciver = ref("");
const currentuserid = useCookie("userinfo").value.id;
const chatid = route.params.chatid;

const message = ref({
  recivedId: route.params.chatid,
  senderId: useCookie("userinfo").value.id,
  content: "",
  color: route.query.color,
  username: useCookie("userinfo").value.name,
  date: new Date().toLocaleString(),
  recive: false,
});

// console.log(parseInt(route.params.chatid));

var messages = ref([]);

const token = useCookie("token").value;
if (!token) {
  navigateTo("auth/login");
}

onMounted(() => {
  socket = io("http://localhost:8000");
  if (chatid == "room1" || chatid == "room2") {
    console.log("room");

    socket.emit("join-room", {
      room: chatid,
      userId: useCookie("userinfo").value.id,
      date: new Date().toLocaleDateString,
      username: useCookie("userinfo").value.name,
    });
    socket.on("message-room", (m) => {
      m ? (messages.value = m) : "";
      // console.log(m);
    });
    socket.on("user-joined", (data) => {
      pushmessage(data);
    });
  } else {
    console.log("chat");
    axiosClient.get(`auth/getalluser`).then((res) => {
      res.data.find((user) => {
        if (user.id == chatid) {
          reciver.value = user.name;
        }
      });
    });
  }

  socket.emit("register", useCookie("userinfo").value.id);
  socket.on("recive-message", (data) => {
    pushmessage(data);
  });
});

function logout() {
  axiosClient.post("auth/logout").then((res) => {
    useCookie("token").value = null;
    navigateTo("/auth/login");
    console.log(res);
  });
}

function pushmessage(info) {
  messages.value.push(info);
}

function scrollToTop() {
  const chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
}

async function privatemessage() {
  const messageforsend = {
    recivedId: parseInt(message.value.recivedId),
    content: message.value.content,
    color: message.value.color,
    username: message.value.username,
    senderId: message.value.senderId,
    date: message.value.date,
    recive: message.value.recive,
  };
  socket.emit("send-message", messageforsend);
  await pushmessage(messageforsend);
  message.value.content = "";
  scrollToTop();
}

async function groupmessage() {
  const messageforsend = {
    recivedId: message.value.recivedId,
    content: message.value.content,
    color: message.value.color,
    username: message.value.username,
    senderId: message.value.senderId,
    date: message.value.date,
    recive: message.value.recive,
  };
  socket.emit("message-group", messageforsend);
  await pushmessage(messageforsend);
  message.value.content = "";
  scrollToTop();
}

function sendmessage() {
  //   console.log("lkjflkjsd");
  if (chatid == "room1" || chatid == "room2") {
    groupmessage();
  } else {
    privatemessage();
  }
}
</script>