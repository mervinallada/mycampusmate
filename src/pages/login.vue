<template>
  <div class="p-3">
    <img src="/bg.png" src-placeholder="/bg-thumbnail.png" class="bg-img" />
    <div class="darken"></div>
    <div class="d-flex justify-content-center">
      <!-- WE ADD .PREVENT TO AVOID RELOADING THE PAGE WHEN THE FORM SUBMITS -->
      <form class="my-5 p-5 border bg-white" @submit.prevent="submitForm">
        <div class="d-flex justify-content-center mb-3">
          <VLazyImage src="/logo.png" width="300" />
        </div>
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" v-model="form.username" />
        </div>
        <div class="mb-3 position-relative">
          <label class="form-label">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control pe-4"
            v-model="form.password"
          />
          <button
            v-if="!showPassword"
            type="button"
            class="btn btn-sm position-absolute password"
            @click="showPassword = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"
              />
              <path
                d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"
              />
            </svg>
          </button>

          <button
            v-if="showPassword"
            type="button"
            class="btn btn-sm position-absolute password"
            @click="showPassword = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
              />
            </svg>
          </button>
        </div>

        <!-- DISPLAY ERROR MESSAGE IF THE ERRORMSG VARIABLE HAS A VALUE OR NOT EMPTY -->
        <div class="alert alert-danger text-center" v-if="errorMsg">
          {{ errorMsg }}
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-danger" :disabled="loading">
            <template v-if="loading">
              <span class="spinner-border spinner-border-sm"></span>
              <span class="ms-2">Logging in...</span>
            </template>
            <span v-else>Login</span>
          </button>
        </div>

        <p class="mt-3 text-center">
          Not a member? Sign up
          <RouterLink to="/register" class="">here</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// THIS IS WHERE THE USER INPUT WILL BE STORED AND EVENTUALLY WILL BE SENT INTO THE API
const form = ref({
  username: "",
  password: "",
});
const loading = ref(false);
const showPassword = ref(false);

// WE STORE THE ERROR MESSAGE HERE IF LOGIN FAILED
const errorMsg = ref(null);

// SUBMIT THE FORM
const submitForm = async () => {
  try {
    loading.value = true;
    const response = await api.post("/jwt/login/", form.value);

    // STORE THE TOKEN IN LOCAL STORAGE IF LOGIN SUCCESS
    const token = response.data.token;
    localStorage.setItem("token", token);

    if (response.data.data.usertype === 1) {
      // REDIRECT TO ADMIN DASHBOARD IF USERTYPE IS ADMIN
      router.push("/admin/dashboard");
    } else {
      // REDIRECT TO STUDENT DASHBOARD IF USERTYPE IS STUDENT
      router.push("/student/newsfeed");
    }
  } catch (error) {
    errorMsg.value = error.response.data;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
form {
  width: 500px;
  z-index: 999;
}

.darken {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.bg-blur {
  backdrop-filter: blur(5px);
}

.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.password {
  position: absolute;
  right: 0;
  top: 50%;
}
</style>
