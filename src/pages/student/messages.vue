<template>
  <div class="vh-100 d-flex flex-column overflow-auto">
    <!-- HEADER -->
    <StudentHeader></StudentHeader>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- MAIN CONTENT -->
      <div class="container p-3 flex-grow-1 d-flex flex-column overflow-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page">Messages</li>
          </ol>
        </nav>
        <div
          v-if="toUser && authStudent"
          class="flex-grow-1 overflow-auto d-flex flex-column"
        >
          <div
            class="px-2 text-bg-primary d-flex justify-content-between align-items-center"
          >
            <RouterLink class="btn btn-sm" to="/student/newsfeed">
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
            </RouterLink>
            <h4 class="p-2">
              {{
                toUser.student
                  ? `${toUser.student.first_name} ${toUser.student.last_name}`
                  : `${toUser.admin.first_name} ${toUser.admin.last_name}`
              }}
            </h4>
          </div>

          <div class="flex-grow-1 overflow-auto d-flex flex-column gap-2 p-2">
            <div
              class="p-2 rounded-3"
              :class="{
                from: message.from == authStudent.user_id,
                to: message.from != authStudent.user_id,
              }"
              v-for="message in messages"
            >
              <p class="m-0">
                {{ message.message }}
              </p>
              <p
                class="text-xs m-0"
                :class="{
                  start: message.from == authStudent.user_id,
                  end: message.from != authStudent.user_id,
                }"
              >
                {{ message.createdAt }}
              </p>
            </div>
          </div>
          <div class="mt-auto d-flex align-items-center gap-3">
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
import StudentHeader from "@/components/student-header.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import EmojiPicker from "vue3-emoji-picker"; // emoji plugin
import 'vue3-emoji-picker/css' // emoji design

const route = useRoute();
const authStudent = ref(null);
const toUser = ref(null);
const message = ref("");
const messages = ref([]);
const loading = ref(false);
const loadingRefresh = ref(false);
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
  const response = await api.get("/student/getOneStudent/");
  authStudent.value = response.data;
};

const getToUser = async () => {
  const response = await api.get(`/admin/getUser/?id=${route.params.id}`);
  toUser.value = response.data;
};

// LOAD USERS WHEN PAGE LOADS
onMounted(async () => {
  await getCurrentUser();
  await getToUser();
});

watch(toUser, async () => {
  if (toUser.value) {
    await getMessages();
  }
});

const getMessages = async () => {
  loadingRefresh.value = true;
  const response = await api.get(
    `/messages/getOneMessages/?from=${authStudent.value.user_id}&to=${toUser.value.id}`
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
    from: authStudent.value.user_id,
    to: toUser.value.id,
    message: message.value,
  });
  loading.value = false;
  message.value = "";
  await getMessages();
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
</style>
