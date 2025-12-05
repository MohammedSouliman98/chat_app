<template>
  <h1>Welcome to the Chat Application</h1>
  <div class="flex flex-row justify-between md:w-[60%] mx-auto">
    <div class="w-full">
      <div class="w-full flex justify-between bg-green-500 p-4">
        <div class="flex gap-4">
          <h1 class="font-bold text-xl">Clone whatsapp</h1>

          <!-- <Select
            v-model="selectedUser"
            :options="info.users"
            optionLabel="name"
            placeholder="Select Room"
            class="w-full text-white md:w-56"
          /> -->
          <div
            v-for="(color, index) in colors"
            :key="index"
            class="flex items-center gap-2"
          >
            <RadioButton
              v-model="selectedColor"
              :inputId="`color-${index}`"
              :name="color"
              :value="color"
            />
            <label :for="`color-${index}`">{{ color }}</label>
          </div>
          {{ selectedColor }}
          <select name="" v-model="message.recivedId" id="">
            <option v-for="(user, index) in info.users" :key="index">
              {{ user }}
            </option>
          </select>
        </div>
        {{ socket.id }}
        <Button label="Logout" />
      </div>

      <div class="chat" id="chat">
        <!-- <div class="w-full flex justify-start my-3">
          <Message class="w-[50%] flex justify-start">
            <div class="flex gap-7 items-center mb-2">
              <h1 class="text-white">mohammed</h1>
              <span class="text-white">time datae</span>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              praesentium odit quas earum. Dolor nulla incidunt cumque ipsa.
              Expedita cupiditate consectetur rerum impedit officia laudantium
              tempora labore facilis libero temporibus?
            </p>
          </Message>
        </div> -->
        <div
          class="w-full flex my-3"
          :class="m.recive ? 'justify-start' : 'justify-end'"
          v-for="(m, index) in messages"
          :key="index"
        >
          <Message
            class="w-[50%] flex justify-start"
            :severity="m.recive ? m.color : selectedColor"
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
      {{ messages }}
      <Form class="flex gap-3">
        <InputText
          type="text"
          @keyup.enter="sendmessage"
          v-model="message.content"
          fluid
        />
        <Button @click="sendmessage" label="Send" />
      </Form>
    </div>
    <!-- <NuxtLink to="/name">Go to Name Page</NuxtLink> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { io, Socket } from "socket.io-client";

const info = ref({
  users: [],
});

const selectedUser = ref("");
const selectedColor = ref("success");

const colors = ref(["success", "info", "warn", "error"]);

var messages = ref([]);

function pushmessage(info) {
  messages.value.push(info);
}

const socket = io("http://localhost:8000");
socket.connect();

const message = ref({
  recivedId: selectedUser,
  content: "",
  color: selectedColor,
  username: "mohammed",
  date: new Date().toLocaleString(),
  recive: false,
});

function sendmessage() {
  const messageforsend = {
    recivedId: message.value.recivedId,
    content: message.value.content,
    color: message.value.selectedColor,
    username: message.value.username,
    date: message.value.date,
    recive: message.value.recive,
  };
  socket.emit("send-message", messageforsend);
  pushmessage(messageforsend);
  message.value.content = "";
}

socket.on("recive-message", (data) => {
  console.log(data);
  messages.value.push(data);
});

socket.on("update-users", (users) => {
  info.value.users = users;
});

// console.log(users.value);
</script>