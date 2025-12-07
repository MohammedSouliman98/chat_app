<template>
  <div class="w-full h-screen content-center">
    <div
      class="md:w-[50%] w-full mx-auto p-5 border-2 border-green-500 rounded-xl"
    >
      <h1 class="w-fit font-bold text-xl capitalize mx-auto p-4 mb-10">
        register page
      </h1>
      <Message v-if="error" class="mb-3" severity="error"
        ><span v-for="(e, index) in error" :key="index">{{ e }}</span></Message
      >
      <Form
        :resolver="resolver"
        :initialValues="initialValues"
        class="flex justify-center flex-col gap-4 w-full mx-auto"
        @submit="submit"
      >
        <div class="flex flex-col gap-1">
          <InputText
            name="username"
            type="text"
            v-model="form.name"
            placeholder="Username"
          />
        </div>
        <div class="flex flex-col gap-1">
          <InputText
            name="email"
            type="text"
            v-model="form.email"
            placeholder="Email"
          />
        </div>
        <div class="w-full">
          <Password placeholder="password" v-model="form.password" toggleMask />
        </div>
        <div class="">
          <Password
            name="confirm"
            placeholder="confirm"
            :feedback="false"
            class="w-fit"
            v-model="form.confirm"
            fluid
            toggleMask
          />
        </div>
        <Button
          type="submit"
          severity="secondary"
          label="Submit"
          class="w-fit"
        />
      </Form>
    </div>
  </div>
</template>
 
 <script setup>
import { ref } from "vue";
import axiosClient from "../../axios";
const error = ref("");
const form = ref({
  name: "",
  email: "",
  password: "",
  confirm: "",
});
const token = useCookie("token").value;
if (token) {
  navigateTo("/");
}
// console.log(form.value);
function submit(e) {
  axiosClient
    .post("auth/register", form.value)
    .then((res) => {
      // localStorage.setItem("token", res.data.token);
      useCookie("token").value = res.data.token;
      useCookie("userinfo").value = res.data.user;
      navigateTo("/");
      // console.log(res.data);
    })
    .catch((err) => {
      error.value = err.response.data;
    });
}
</script>