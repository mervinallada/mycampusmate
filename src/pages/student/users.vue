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
            <li class="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>

        <div class="input-group mb-3">
          <router-link
            to="/student/newsfeed"
            class="btn btn-primary"
            type="button"
            >Go Back</router-link
          >
          <input
            type="text"
            class="form-control"
            placeholder="Search user here"
            v-model="search"
          />
        </div>

        <FriendList
          v-if="filteredResults && authStudent"
          :users="filteredResults"
          :logged-in-id="authStudent.user_id"
        ></FriendList>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import StudentHeader from "@/components/student-header.vue";
import FriendList from "@/components/friend-list.vue";
import { onMounted, ref, watch } from "vue";

const users = ref([]);
const authStudent = ref(null);

const search = ref("");
const filteredResults = ref([]);

const getCurrentUser = async () => {
  const response = await api.get("/student/getOneStudent/");
  authStudent.value = response.data;
};

const getUsers = async () => {
  const response = await api.get("/admin/getAllUser/");
  users.value = response.data;
  filteredResults.value = users.value;
};

// LOAD USERS WHEN PAGE LOADS
onMounted(async () => {
  await Promise.all([getCurrentUser(), getUsers()]);
});

watch(search, () => {
  if (search.value) {
    filteredResults.value = users.value.filter((x) => {
      const name = x.student
        ? `${x.student.first_name.toLowerCase()} ${x.student.middle_name.toLowerCase()} ${x.student.last_name.toLowerCase()}`
        : `${x.admin.first_name.toLowerCase()} ${x.admin.middle_name.toLowerCase()} ${x.admin.last_name.toLowerCase()}`;

      return name.includes(search.value.toLowerCase());
    });
  } else {
    filteredResults.value = users.value;
  }
});
</script>
