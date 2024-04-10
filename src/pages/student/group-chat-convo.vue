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
            <li class="breadcrumb-item">Group Chat</li>
            <li class="breadcrumb-item active" aria-current="page">Convo</li>
          </ol>
        </nav>

        <div
          class="flex-grow-1 overflow-auto d-flex flex-column position-relative"
        >
          <div
            class="px-2 text-bg-primary d-flex justify-content-between align-items-center"
          >
            <div class="d-flex items-center p-2">
              <RouterLink class="btn btn-sm" to="/student/group-chat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  class="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              </RouterLink>
              <button class="btn" @click="showAddMember = !showAddMember">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  class="bi bi-person-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </button>
            </div>
            <h4 class="p-2 m-0" v-if="messages.length > 0">
              {{ messages[0].group_name }}
            </h4>
          </div>
          <div class="flex-grow-1 overflow-auto d-flex flex-column gap-2 p-2">
            <!-- ADD MEMBER MENU -->
            <template v-if="showAddMember">
              <div
                class="position-absolute border top-0 h-100 w-100 overflow-auto p-3 d-flex flex-column gap-2 bg-light"
                style="max-width: 300px"
                v-if="users.length > 0"
              >
                <button class="btn btn-danger" @click="showAddMember = false">
                  Close
                </button>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search user"
                  v-model="searchInput"
                />

                <div
                  class="d-flex justify-content-between align-items-center gap-2"
                  v-for="user in searchResult"
                >
                  <div
                    class="d-flex justify-content-start align-items-center gap-2 mt-2"
                  >
                    <VLazyImage
                      :src="
                        user.admin
                          ? `${apiUrl}${user.admin.admin_profile?.file_path}${user.admin.admin_profile?.file_rand_name}`
                          : `${apiUrl}${user.student.student_profile?.file_path}${user.student.student_profile?.file_rand_name}`
                      "
                      class="rounded-circle"
                      width="24"
                      height="24"
                    />
                    <span>{{
                      user.admin
                        ? `${user.admin.first_name} ${user.admin.last_name}`
                        : `${user.student.first_name} ${user.student.last_name}`
                    }}</span>
                  </div>

                  <!-- ADD MEMBER BUTTON -->
                  <button
                    class="btn"
                    @click="addMember(user.id)"
                    v-if="
                      !loadingAddMember && !isAdded(user.id) && isGroupAdmin()
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                      />
                      <path
                        fill-rule="evodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                      />
                    </svg>
                  </button>
                  <span
                    v-else-if="loadingAddMember && isGroupAdmin()"
                    class="text-xs"
                    >Pleas wait...</span
                  >

                  <div v-else-if="isAdded(user.id)">
                    <!-- REMOVE MEMBER BUTTON -->
                    <button
                      class="btn"
                      @click="removeMember(user.id)"
                      v-if="!loadingRemoveMember && isGroupAdmin()"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                        />
                        <path
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                        />
                      </svg>
                    </button>
                    <span
                      class="text-xs"
                      v-else-if="!loadingRemoveMember && !isGroupAdmin()"
                      >Added</span
                    >
                    <span
                      v-else-if="loadingRemoveMember && isGroupAdmin()"
                      class="text-xs"
                      >Please wait...</span
                    >
                  </div>
                </div>
              </div>
            </template>
            <template
              v-if="
                authStudent &&
                messages.length > 0 &&
                messages[0].group_message.length > 0
              "
            >
              <div
                class="p-2 rounded-3"
                :class="{
                  from: message.message_to_user_from.id == authStudent.user_id,
                  to: message.message_to_user_from.id != authStudent.user_id,
                }"
                v-for="message in messages[0].group_message"
              >
                <p class="m-0">
                  {{ message.message }}
                </p>
                <p class="text-xs m-0 d-flex justify-content-between">
                  <span
                    :class="{
                      first:
                        message.message_to_user_from.id == authStudent.user_id,
                      last:
                        message.message_to_user_from.id != authStudent.user_id,
                    }"
                    >{{ message.createdAt }}</span
                  >
                  <span
                    :class="{
                      last:
                        message.message_to_user_from.id == authStudent.user_id,
                      first:
                        message.message_to_user_from.id != authStudent.user_id,
                    }"
                    >{{
                      message.message_to_user_from.student
                        ? `${message.message_to_user_from.student.first_name} ${message.message_to_user_from.student.last_name}`
                        : `${message.message_to_user_from.admin.first_name} ${message.message_to_user_from.admin.last_name}`
                    }}</span
                  >
                </p>
              </div>
            </template>
          </div>

          <div class="mt-auto d-flex align-items-center gap-3">
            <textarea
              class="form-control"
              rows="3"
              v-model="message"
            ></textarea>
            <div class="d-flex flex-column gap-2">
              <button
                class="btn btn-success"
                :disabled="loadingRefresh"
                @click="loadMessages"
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

const route = useRoute();
const apiUrl = import.meta.env.VITE_API_URL;
const authStudent = ref(null);
const messages = ref([]);
const users = ref([]);
const members = ref([]);
const message = ref("");
const searchInput = ref("");
const searchResult = ref([]);
const showAddMember = ref(false);
const loading = ref(false);
const loadingRefresh = ref(false);
const loadingAddMember = ref(false);
const loadingRemoveMember = ref(false);

watch(searchInput, () => {
  if (searchInput.value) {
    searchResult.value = users.value.filter((x) => {
      const fullname = x.student
        ? `${x.student.first_name} ${x.student.last_name}`.toLowerCase()
        : `${x.admin.first_name} ${x.admin.last_name}`.toLowerCase();

      return fullname.includes(searchInput.value);
    });
  } else {
    searchResult.value = users.value;
  }
});

const loadMessages = async () => {
  loadingRefresh.value = true;
  const response = await api.get(
    `/messages/groupMessage/?id=${route.params.id}`
  );
  loadingRefresh.value = false;
  messages.value = response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/student/getOneStudent/");
  authStudent.value = response.data;
};

const getUsers = async () => {
  const response = await api.get("/admin/getAllUser/");
  users.value = response.data;
  searchResult.value = users.value;
};

const getMembers = async () => {
  const response = await api.get(`/group/getAllMember/?id=${route.params.id}`);
  members.value = response.data;
};

onMounted(async () => {
  await Promise.all([
    getCurrentUser(),
    loadMessages(),
    getUsers(),
    getMembers(),
  ]);
});

const sendMessage = async () => {
  loading.value = true;
  const response = await api.post("/messages/groupMessage/", {
    message: message.value,
    gc_id: route.params.id,
  });
  loading.value = false;
  message.value = "";
  await loadMessages();
};

const addMember = async (id) => {
  loadingAddMember.value = true;
  const response = await api.post("/messages/addMember/", {
    group_id: route.params.id,
    user_id: id,
  });
  loadingAddMember.value = false;
  await Promise.all([getUsers(), getMembers()]);
};

const isAdded = (id) => {
  if (members.value.length > 0) {
    const ids = members.value[0].group_to_member.flatMap(
      (x) => x.group_user.id
    );
    return ids.includes(id);
  }

  return false;
};

const removeMember = async (id) => {
  loadingRemoveMember.value = true;
  const response = await api.put(
    `/group/removeMember/?gc_id=${route.params.id}&user_id=${id}`
  );
  loadingRemoveMember.value = false;
  await Promise.all([getUsers(), getMembers()]);
};

const isGroupAdmin = () => {
  if (messages.value.length > 0) {
    return messages.value[0].group_admin == authStudent.value.user_id;
  }

  return false;
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

.first {
  order: 1;
}

.last {
  order: 2;
}
</style>
