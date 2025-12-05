<template>
  <h1 class="w-fit bg-green-300 text-white mx-auto p-4">Login page</h1>

  <Form
    :resolver="resolver"
    :initialValues="initialValues"
    @submit="onFormSubmit"
    class="flex justify-center flex-col gap-4 w-[50%] mx-auto"
  >
    <div class="flex flex-col gap-1">
      <InputText name="email" type="text" placeholder="Email" />
      <Message severity="error">Message Content</Message>
    </div>
    <div class="">
      <Password v-model="value" toggleMask />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>

<script setup>
import { ref } from "vue";

const value = ref(null);
</script>