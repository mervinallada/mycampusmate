<template>
  <div class="vh-100 d-flex flex-column overflow-auto">
    <!-- ADMIN NAVIGATION BAR -->
    <AdminNav></AdminNav>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- ADMIN SIDEBAR -->
      <AdminSideBar></AdminSideBar>
      <!-- MAIN CONTENT -->
      <div class="p-3 flex-grow-1 overflow-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page">
              User Applications
            </li>
          </ol>
        </nav>

        <div class="container">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search name here"
              v-model="search"
            />
          </div>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Student ID Num</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, idx) in filteredResults">
                <th scope="row">{{ idx + 1 }}</th>
                <td>
                  {{
                    user.student.first_name +
                    " " +
                    user.student.middle_name +
                    " " +
                    user.student.last_name
                  }}
                </td>
                <td>{{ user.student.age }}</td>
                <td>{{ user.student.address }}</td>
                <td>{{ user.student.student_num }}</td>
                <td>
                  <!-- 0 = PENDING, 1 = APPROVED, 2 = REJECTED -->
                  <!-- DISPLAY PENDING BADGE IF USER STATUS IS PENDING -->
                  <span
                    v-if="user.is_approved == 0"
                    class="badge rounded-pill text-bg-primary"
                    >Pending</span
                  >
                  <!-- DISPLAY APPROVED BADGE IF USER STATUS IS APPROVED -->
                  <span
                    v-if="user.is_approved == 1"
                    class="badge rounded-pill text-bg-success"
                    >Approved</span
                  >
                  <!-- DISPLAY REJECTED BADGE IF USER STATUS IS REJECTED -->
                  <span
                    v-if="user.is_approved == 2"
                    class="badge rounded-pill text-bg-danger"
                    >Rejected</span
                  >
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <RouterLink
                      :to="`/admin/user-applications/${user.id}`"
                      class="btn btn-primary"
                      >View</RouterLink
                    >
                    <!-- DISABLE BUTTON IF USER IS APPROVED OR REJECTED -->
                    <button
                      type="button"
                      class="btn btn-success"
                      :disabled="user.is_approved"
                      @click="approveStudent(user.id)"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      :disabled="user.is_approved"
                      @click="rejectStudent(user.id)"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

const users = ref(null);
const search = ref("");
const filteredResults = ref([]);

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

// GET ALL USERS
const loadUsers = async () => {
  const response = await api.get("/admin/getAllStudent/");
  users.value = response.data;
  filteredResults.value = users.value;
};

// LOAD USERS WHEN PAGE LOADS
onMounted(async () => {
  await loadUsers();
});

// APPROVE STUDENT
const approveStudent = async (id) => {
  await api.put("/admin/approveStudent/", null, { params: { id } });
  const user = users.value.find((x) => x.id == id);
  user.is_approved = 1;
};

// REJECT STUDENT
const rejectStudent = async (id) => {
  await api.delete("/admin/rejectStudent/", { params: { id } });
  const user = users.value.find((x) => x.id == id);
  user.is_approved = 2;
};
</script>
