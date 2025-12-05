<template>
  <h1 class="w-fit bg-green-300 text-white mx-auto p-4">register page</h1>

  <Form
    :resolver="resolver"
    :initialValues="initialValues"
    @submit="onFormSubmit"
    class="flex justify-center flex-col gap-4 w-[50%] mx-auto"
  >
    <div class="flex flex-col gap-1">
      <InputText name="username" type="text" placeholder="Username" />
    </div>
    <div class="flex flex-col gap-1">
      <InputText name="email" type="text" placeholder="Email" />
    </div>
    <div class="w-full">
      <Password placeholder="password" toggleMask />
    </div>
    <div class="">
      <Password
        name="password"
        placeholder="Password"
        :feedback="false"
        class="w-fit"
        fluid
        toggleMask
      />
    </div>
    <Button type="submit" severity="secondary" label="Submit" class="w-fit" />
  </Form>
</template>
 
 <script setup>
import { ref } from "vue";

const value = ref(null);
</script>