<template>
  <div class="container p-0">
    <div class="login__title-wrapper">
      <h1 class="login__title-text">Join Chatroom</h1>
    </div>
    <div class="form">
      <p class="text-red-500 text-sm mb-3" v-if="error.error">
        {{ error.message }}
      </p>
      <div class="mb-4 w-full">
        <input
          type="text"
          id="username"
          class="login__form-input"
          placeholder="Username"
          v-model="username"
          required
        />
      </div>
      <div class="mb-40 w-full">
        <input
          type="text"
          id="room-id"
          class="login__form-input"
          placeholder="RoomID"
          v-model="roomId"
          required
        />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <button type="button" class="login__form-btn-login" @click="joinRoom()">
        Join
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const username = ref('');
const roomId = ref('');
const router = useRouter();
const error = ref({
  error: false,
  message: ''
});

const joinRoom = () => {
  store
    .dispatch('join/joinRoom', {
      username: username.value,
      roomId: roomId.value
    })
    .then(() => {
      router.push({
        name: 'room',
        params: {
          id: roomId.value
        }
      });
    })
    .catch((err) => {
      error.value = err.response.data;
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
.login {
  &__title {
    &-wrapper {
      @apply mt-10 mb-7;
    }

    &-text {
      @apply text-3xl font-bold text-center;
    }
  }

  &__form {
    @apply flex flex-col items-center justify-center;

    &-input {
      @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700;
      @apply dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-transparent;
      height: 50px;
    }

    &-btn-login {
      background-color: #5db075;
      @apply text-white uppercase rounded-full w-full py-4;
    }
  }
}
</style>
