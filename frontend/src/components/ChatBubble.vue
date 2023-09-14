<template>
  <div class="chat-wrapper" :class="[props.self ? 'text-right' : 'text-left']">
    <div class="chat-bubble__username" v-show="!props.self">
      {{ props.username }}
    </div>
    <div class="chat-bubble" :class="[props.self ? 'self' : 'other']">
      <div class="chat-bubble__content w-full">
        <div class="chat-bubble__content-message">
          {{ props.message }}
        </div>
        <div
          class="chat-bubble__content-time"
          :class="[props.self ? 'text-left' : 'text-right']"
        >
          {{ formatTimeOrDate(new Date(props.timestamp)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTimeOrDate } from '@/utils/helpers';

const props = defineProps<{
  message: string;
  username: string;
  self: boolean;
  timestamp: string;
}>();
</script>

<style lang="scss" scoped>
.chat {
  @apply font-sans antialiased;
  &-bubble {
    @apply m-0 mb-5 inline-block relative w-full h-auto text-left;
    max-width: 200px;

    &__username {
      @apply text-xs text-gray-500;
    }

    &__content {
      @apply flex flex-col items-start p-2 rounded-lg;

      & > * {
        margin: 0;
      }

      &-message {
        @apply text-sm max-w-full break-words p-2;
      }

      &-time {
        @apply px-2 mx-auto my-1 w-full;
        font-size: 10px;
      }
    }

    &.other {
      @apply bg-gray-50 border border-gray-200 rounded-t-lg rounded-tl-lg rounded-br-lg;

      &::before {
        @apply w-0 h-0 absolute -bottom-3;
        content: '';
        border-left: 8px solid #e6e6e6;
        border-right: 3px solid transparent;
        border-top: 3px solid #e6e6e6;
        border-bottom: 8px solid transparent;
        left: -1px;
      }

      &::after {
        @apply w-0 h-0 absolute left-0;
        content: '';
        border-left: 12px solid #f6f6f6;
        border-right: 0 solid transparent;
        border-top: 0px solid #f6f6f6;
        border-bottom: 12px solid transparent;
        bottom: -10px;
      }
    }

    &.self {
      @apply rounded-t-lg rounded-tr-lg rounded-bl-lg text-white;
      background-color: #5db075;

      &::after {
        content: ' ';
        @apply absolute w-0 h-0 left-auto right-0 -bottom-3;
        border: 12px solid;
        border-color: #5db075 #5db075 transparent transparent;
      }
    }
  }
}
</style>
