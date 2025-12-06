<template>
  <h1>Welcome to the Chat Application</h1>
  <div class="flex flex-row justify-between md:w-[60%] mx-auto">
    <div class="w-full">
      <div class="w-full flex justify-between bg-green-500 p-4">
        <div class="flex gap-4">
          <h1 class="font-bold text-xl">Clone whatsapp</h1>
          <select name="" v-model="selectedColor" id="">
            <option value="" disabled>selectcolor</option>
            <option v-for="(color, index) in colors" :key="index">
              {{ color }}
            </option>
          </select>
          <select name="" v-model="selectedUser" id="" :disabled="selectedRoom">
            <option value="" disabled>select user</option>
            <option
              :value="user.id"
              v-for="(user, index) in users"
              :key="index"
            >
              {{ user.name }}
            </option>
          </select>
          <SelectButton
            v-model="selectedRoom"
            :options="rooms"
            @change="room"
            :disabled="selectedUser"
          />
          <Button
            label="Start chat"
            :disabled="!selectedUser && !selectedRoom"
            @click="startchat"
          ></Button>
        </div>
        <Button label="Logout" @click="logout" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";
import axiosClient from "~/axios";
const users = ref([]);

const selectedUser = ref(null);
const selectedColor = ref("warn");
const selectedRoom = ref(null);

const rooms = ref(["room1", "room2"]);

const colors = ref(["success", "info", "warn", "error"]);

const token = useCookie("token").value;
if (!token) {
  navigateTo("auth/login");
}
function startchat() {
  console.log(selectedUser.value);
  console.log(selectedRoom.value);
  selectedUser.value
    ? navigateTo(`/chat/${selectedUser.value}?color=${selectedColor.value}`)
    : navigateTo(`/chat/${selectedRoom.value}?color=${selectedColor.value}`);
}

function logout() {
  axiosClient.post("auth/logout").then((res) => {
    useCookie("token").value = null;
    console.log(res);
  });
}
onMounted(() => {
  axiosClient.get(`auth/getalluser`).then((res) => {
    users.value = res.data.filter(
      (user) => user.id !== useCookie("userinfo").value.id
    );
  });
});
</script>