<template>
  <div class="min-vh-100 d-flex flex-column overflow-auto">
    <!-- ADMIN NAVIGATION BAR -->
    <AdminNav></AdminNav>
    <div class="d-flex flex-grow-1 overflow-auto">
      <AdminSideBar></AdminSideBar>
      <div class="p-3 flex-grow-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>

        <div class="container text-center">
          <div class="row gap-3">
            <div class="col">
              <div class="card text-bg-success mb-3 h-100">
                <div class="card-header">Approved</div>
                <div class="card-body">
                  <h5 class="card-title">{{ studentCount.approved }}</h5>
                  <p class="card-text">
                    This shows the total number of approved users
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card text-bg-primary mb-3 h-100">
                <div class="card-header">Pending</div>
                <div class="card-body">
                  <h5 class="card-title">{{ studentCount.pending }}</h5>
                  <p class="card-text">
                    This shows the total number of pending users
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card text-bg-danger mb-3 h-100">
                <div class="card-header">Rejected</div>
                <div class="card-body">
                  <h5 class="card-title">{{ studentCount.rejected }}</h5>
                  <p class="card-text">
                    This shows the total number of rejected users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminNav from "@/components/admin-nav.vue";
import AdminSideBar from "@/components/admin-sidebar.vue";
import api from "@/http/api";
import { onMounted, ref } from "vue";

// DISPLAY LOADING TEXT IF LOADING IS NOT DONE YET
const studentCount = ref({
  approved: "Loading",
  pending: "Loading",
  rejected: "Loading",
});

// COUNT THE TOTAL NUMBER OF APPROVED, PENDING, AND REJECTED USERS
const loadCountStudents = async () => {
  const response = await api.get("/admin/countAll/");
  studentCount.value = response.data;
};

// LOAD ONLY WHEN THE PAGE IS LOADED
onMounted(async () => {
  await loadCountStudents();
});
</script>
