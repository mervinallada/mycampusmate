<template>
  <div class="vw-100 vh-100 d-flex flex-column overflow-auto">
    <!-- HEADER -->
    <StudentHeader></StudentHeader>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- MAIN CONTENT -->
      <div class="container p-3 flex-grow-1 d-flex flex-column overflow-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page">
              Group Chat
            </li>
          </ol>
        </nav>

        <div class="input-group mb-3">
          <RouterLink to="/student/newsfeed" class="btn btn-outline-primary"
            >Back</RouterLink
          >
          <button
            class="btn btn-primary"
            :disabled="!groupName || loading"
            @click="createGroupChat"
          >
            <span v-if="loading">Creating GC...</span>
            <span v-else>Create GC</span>
          </button>
          <input type="text" class="form-control" v-model="groupName" />
        </div>

        <div class="d-flex flex-column gap-3">
          <RouterLink
            :to="`/student/group-chat/${group.id}`"
            class="btn btn-outline-primary text-start"
            v-for="group in groups"
            :key="group.id"
          >
            {{ group.group_name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import StudentHeader from "@/components/student-header.vue";
import { onMounted, ref } from "vue";

const groupName = ref("");
const groups = ref([]);
const loading = ref(false);

const loadGroupChats = async () => {
  const response = await api.get("/messages/groupChats/");
  groups.value = response.data;
};

onMounted(async () => {
  await loadGroupChats();
});

const createGroupChat = async () => {
  loading.value = true;
  const response = await api.post("/messages/createGroup/", {
    group_name: groupName.value,
  });
  loading.value = false;
  groupName.value = "";
  await loadGroupChats();
};
</script>
