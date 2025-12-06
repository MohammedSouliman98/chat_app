<template>
  <div class="w-full mx-auto h-screen content-center">
    <div class="w-[50%] mx-auto p-5 border-2 border-green-500 rounded-xl">
      <h1 class="w-fit font-bold text-xl capitalize mx-auto p-4">Login page</h1>

      <Form
        :resolver="resolver"
        :initialValues="initialValues"
        @submit="submit"
        class="flex justify-center flex-col gap-4 w-full mx-auto"
      >
        <div class="flex flex-col gap-1">
          <InputText
            name="email"
            type="email"
            v-model="form.email"
            placeholder="Email"
          />
          <Message severity="error">Message Content</Message>
        </div>
        <div class="">
          <Password v-model="form.password" toggleMask />
        </div>
        <Button type="submit" severity="secondary" label="Submit" />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosClient from "../../axios";

const token = useCookie("token").value;

if (token) {
  navigateTo("/");
}

// definePageMeta({
//   middleware: [
//     (to, from) => {

//     },
//   ],
// });

const form = ref({
  email: "",
  password: "",
});
function submit() {
  axiosClient.post("auth/login", form.value).then((res) => {
    // localStorage.setItem("token", res.data.token);
    useCookie("token").value = res.data.token;
    useCookie("userinfo").value = res.data.user;
    navigateTo("/");
    console.log(res.data);
  });
}
</script>