<template>
  <div class="vh-100 d-flex flex-column overflow-auto">
    <!-- ADMIN NAVIGATION BAR -->
    <AdminNav></AdminNav>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- ADMIN SIDEBAR -->
      <AdminSideBar></AdminSideBar>
      <!-- MAIN CONTENT -->
      <div class="p-3 flex-grow-1 d-flex flex-column overflow-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page">
              User Messages
            </li>
          </ol>
        </nav>

        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search name here"
            v-model="search"
          />
        </div>

        <div class="d-flex flex-column gap-2" v-if="!toUser">
          <button
            class="btn d-flex gap-2 align-items-center bg-light"
            @click="toUser = user"
            v-for="user in filteredResults"
          >
            <VLazyImage
              :src="`${apiUrl}${user.student.student_profile?.file_path}${user.student.student_profile?.file_rand_name}`"
              class="rounded-circle"
              width="24"
              height="24"
            />
            <span class="text-sm">{{
              `${user.student.first_name} ${user.student.last_name}`
            }}</span>
          </button>
        </div>

        <div v-else class="flex-grow-1 overflow-auto d-flex flex-column">
          <div
            class="px-2 text-bg-primary d-flex justify-content-between align-items-center"
          >
            <button class="btn btn-sm" @click="hideMessages">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="white"
                class="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                />
              </svg>
            </button>
            <h4 class="p-2">
              {{ `${toUser.student.first_name} ${toUser.student.last_name}` }}
            </h4>
          </div>

          <div class="flex-grow-1 overflow-auto d-flex flex-column gap-2 p-2">
            <div
              class="p-2 rounded-3"
              :class="{
                from: message.from == authAdmin.user_id,
                to: message.from != authAdmin.user_id,
              }"
              v-for="message in messages"
            >
              <p class="m-0">
                {{ message.message }}
              </p>
              <p
                class="text-xs m-0"
                :class="{
                  start: message.from == authAdmin.user_id,
                  end: message.from != authAdmin.user_id,
                }"
              >
                {{ message.createdAt }}
              </p>
            </div>
          </div>
          <div class="mt-auto d-flex align-items-center gap-3 p-1">
            <textarea
              class="form-control"
              rows="3"
              v-model="message"
            ></textarea>
            <button 
              class="btn btn-info emoji" 
              style="height: 50px; width: 50px;" 
              @click="toggleEmoji">
              <i class="fa-regular fa-face-smile"></i>
            </button>
            <div v-if="showEmoji == false" class="d-flex flex-column gap-2">
              <button
                class="btn btn-success"
                @click="getMessages"
                :disabled="loadingRefresh"
              >
                <span v-if="loadingRefresh">Loading Messages...</span>
                <span v-else>Refresh Messages</span>
              </button>
              <button
                class="btn btn-primary"
                :disabled="!message || loading"
                @click="sendMessage"
              >
                <span v-if="loading">Sending...</span>
                <span v-else>Send</span>
              </button>
            </div>
            <EmojiPicker v-show="showEmoji" :native="true" @select="onSelectEmoji"/> <!-- added -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import AdminNav from "@/components/admin-nav.vue";
import AdminSideBar from "@/components/admin-sidebar.vue";
import { onMounted, ref, watch } from "vue";
import EmojiPicker from "vue3-emoji-picker"; // emoji plugin
import 'vue3-emoji-picker/css' // emoji design

const apiUrl = import.meta.env.VITE_API_URL;
const users = ref(null);
const authAdmin = ref(null);
const toUser = ref(null);
const message = ref("");
const messages = ref([]);
const loading = ref(false);
const loadingRefresh = ref(false);

const search = ref("");
const filteredResults = ref([]);

const showEmoji = ref(false) // 

// added for emoji
function onSelectEmoji(emoji) { 
  message.value += emoji.i;
}

// added for toggle
function toggleEmoji() {
  showEmoji.value = !showEmoji.value;
}

const getCurrentUser = async () => {
  const response = await api.get("/jwt/getOne/");
  authAdmin.value = response.data;
};

// GET ALL USERS
const loadUsers = async () => {
  const response = await api.get("/admin/getAllStudent/");
  users.value = response.data;
  filteredResults.value = users.value;
};

// LOAD USERS WHEN PAGE LOADS
onMounted(async () => {
  await loadUsers();
  await getCurrentUser();
});

watch(toUser, async () => {
  if (toUser.value) {
    await getMessages();
  }
});

watch(search, () => {
  if (search.value) {
    filteredResults.value = users.value.filter((x) => {
      const name = `${x.student.first_name.toLowerCase()} ${x.student.middle_name.toLowerCase()} ${x.student.last_name.toLowerCase()}`;

      return name.includes(search.value.toLowerCase());
    });
  } else {
    filteredResults.value = users.value;
  }
});

const getMessages = async () => {
  loadingRefresh.value = true;
  const response = await api.get(
    `/messages/getOneMessages/?from=${authAdmin.value.user_id}&to=${toUser.value.id}`
  );
  loadingRefresh.value = false;
  messages.value = response.data;
  if (messages.value.length > 0) {
    messages.value.sort((a, b) => a.id - b.id);
  }
};

const sendMessage = async () => {
  loading.value = true;
  const response = await api.post("/messages/sendMessages/", {
    from: authAdmin.value.user_id,
    to: toUser.value.id,
    message: message.value,
  });
  loading.value = false;
  message.value = "";
  await getMessages();
};

const hideMessages = () => {
  toUser.value = null;
  messages.value = [];
};
</script>

<style scoped>
.from,
.to {
  width: 80%;
}
.to {
  background-color: #f5deb3;
  align-self: start;
  text-align: start;
}
.from {
  background-color: #b0e0e6;
  align-self: end;
  text-align: end;
}

.text-xs {
  font-size: 0.7rem;
  color: gray;
}

.start {
  text-align: left;
}

.end {
  text-align: right;
}
.emoji {
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
}
</style>
