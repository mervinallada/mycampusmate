<template>
  <!-- STUDENT PAGE HEADER -->
  <nav class="shadow p-2">
    <div class="container d-flex justify-content-between align-items-center">
      <span class="navbar-brand">
        <VLazyImage src="/logo.png" width="200" />
      </span>

      <span class="d-none d-sm-block">
        <VLazyImage src="/about.png" width="30" />
      </span>

      <button
        class="btn d-block d-sm-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>
    </div>

    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">
          My Campus Mate
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="mt-3 d-flex flex-column gap-3">
          <button
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            @click="newsfeedClicked"
          >
            NewsFeed
          </button>
          <button
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            @click="timelineClicked"
          >
            Timeline
          </button>
          <button class="btn btn-light" data-bs-dismiss="offcanvas">
            Friend Requests
          </button>
          <button
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            @click="chatsClicked"
          >
            Chats
          </button>
          <button
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            @click="groupchatClicked"
          >
            Group Chat
          </button>
          <button
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            @click="profileClicked"
          >
            Profile
          </button>
          <button
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            @click="helpClicked"
          >
            Help Center
          </button>
          <button
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            @click="emits('logoutClicked')"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const emits = defineEmits([
  "newsfeedClicked",
  "timelineClicked",
  "logoutClicked",
]);

const router = useRouter();
const route = useRoute();

const profileClicked = () => {
  router.push("/student/profile");
};

const newsfeedClicked = () => {
  if (route.path == "/student/newsfeed") {
    emits("newsfeedClicked");
  } else {
    router.push("/student/newsfeed");
  }
};

const timelineClicked = async () => {
  if (route.path == "/student/newsfeed") {
    emits("timelineClicked");
  } else {
    await router.push("/student/newsfeed");
  }
};

const groupchatClicked = () => {
  router.push("/student/group-chat");
};

const helpClicked = () => {
  router.push("/student/help");
};

const chatsClicked = () => {
  router.push("/student/users");
};
</script>
