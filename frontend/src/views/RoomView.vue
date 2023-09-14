<template>
  <div class="h-screen mt-20">
    <ChatWrapper :chats="chats" />
    <div class="mt-20" v-if="chats.length > 5">
      <hr ref="scrollDown" />
    </div>
    <div class="fixed bottom-0 left-0 right-0 m-3">
      <input
        type="text"
        id="message"
        class="message__input"
        placeholder="Message here..."
        v-model="message"
        required
        @keyup.enter="sendChatMessage"
      />
      <button type="button" class="message__btn-send" @click="sendChatMessage">
        <i class="fas fa-arrow-up"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ChatWrapper from '@/components/ChatWrapper.vue';
import { useStore } from 'vuex';
import { socket } from '@/utils/helpers';

const store = useStore();
const chats = computed(() => store.state.chat.chats);
const roomId = computed(() => store.state.join.roomId);
const message = ref('');
const scrollDown = ref(null);

const sendChatMessage = () => {
  if (!message.value) return;
  store.dispatch('chat/sendChatMessage', message.value).then(() => {
    message.value = '';
    loadChats();
  });
};

const scrollToBottom = () => {
  if (chats.value.length < 5) return;
  let delay = null;
  delay = setTimeout(() => {
    if (scrollDown.value) {
      scrollDown.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, 200);
};

const loadChats = () => {
  store.dispatch('chat/getChatMessages', roomId.value);
};

socket.on('chat message', (message) => {
  if (message.roomId === roomId.value) {
    loadChats();
    scrollToBottom();
  }
});

onMounted(() => {
  loadChats();
  scrollToBottom();
});
watch(chats.value, () => {
  const checkChats = chats.value
    ? chats.value.map((chat) => chat.roomId === roomId.value)
    : [];

  if (checkChats.length === 0) {
    loadChats();
  }
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
