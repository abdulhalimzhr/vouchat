<template>
  <div class="container">
    <ChatBubble
      v-for="chat in props.chats"
      :key="chat.id"
      :message="chat.message"
      :username="chat.username"
      :self="chat.self"
      :timestamp="chat.timestamp"
    />
  </div>
</template>

<script setup lang="ts">
import ChatBubble from '@/components/ChatBubble.vue';
import { Chat } from '../types/chatType';

const props = defineProps({
  chats: {
    type: Array as () => Chat[],
    required: true
  }
});
</script>
