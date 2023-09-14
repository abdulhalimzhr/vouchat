<template>
  <div class="container">
    <ChatBubble
      v-for="chat in props.chats"
      :key="chat.id"
      :message="chat.message"
      :username="chat.username"
      :self="isMine(chat.sessionId)"
      :timestamp="chat.createdAt"
      :show="isRightRoom(chat.roomId)"
    />
  </div>
</template>

<script setup lang="ts">
import ChatBubble from '@/components/ChatBubble.vue';
import { ChatItem } from '../types/chatType';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  chats: {
    type: Array as () => ChatItem[],
    required: true
  }
});

const isMine = (sessionId: string) => {
  return sessionId === store.state.join.sessionId;
};

const isRightRoom = (roomId: string) => {
  return roomId === store.state.join.roomId;
};
</script>
