<template>
  <div class="h-screen">
    <ChatWrapper :chats="chats" />
    <div class="fixed bottom-0 left-0 right-0 m-3">
      <input
        type="text"
        id="message"
        class="message__input"
        placeholder="Message here..."
        required
      />
      <button type="submit" class="message__btn-send">
        <i class="fas fa-arrow-up"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chat } from '@/types/chatType';
import ChatWrapper from '@/components/ChatWrapper.vue';

const chats = ref<Chat[]>([]);

onMounted(() => {
  chats.value = [
    {
      id: 1,
      username: 'John Doe',
      message: 'Hello World',
      self: false,
      timestamp: '2021-08-01T12:11:00.000Z'
    },
    {
      id: 2,
      username: 'Jane Doe',
      message: 'Hi, John',
      self: true,
      timestamp: '2021-08-01T12:12:00.000Z'
    }
  ];
});
</script>

<style lang="scss" scoped>
.message {
  &__input {
    @apply font-medium block w-full p-3 pr-11 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50;
    @apply focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent;
  }

  &__btn-send {
    @apply text-white absolute right-2.5 bottom-2.5 bg-green-600 rounded-full text-sm px-2 py-1 h-7 w-7;
  }
}
</style>
