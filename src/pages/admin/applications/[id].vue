<template>
  <div class="min-vh-100 d-flex flex-column overflow-auto">
    <!-- ADMIN NAVIGATION BAR -->
    <AdminNav></AdminNav>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- ADMIN SIDEBAR -->
      <AdminSideBar></AdminSideBar>
      <!-- MAIN CONTENT -->
      <div class="p-3 flex-grow-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">User Applications</li>
            <li class="breadcrumb-item active" aria-current="page">
              User Information
            </li>
          </ol>
        </nav>

        <div class="container">
          <VLazyImage
            :src="filePath"
            width="100"
            height="100"
            class="rounded-circle border mb-3"
          />

          <div class="row g-3 mb-3">
            <div class="col-md-3">
              <label class="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.first_name"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Middle Name</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.middle_name"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.last_name"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Extension Name</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.extension_name"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Birth Date</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.birth_date"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Age</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.age"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Sex</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.sex"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.address"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Contact Number</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.contact_num"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Emergency Contact Number</label>
              <input
                type="text"
                class="form-control"
                readonly
                v-model="user.emergency_contact"
              />
            </div>
          </div>

          <RouterLink to="/admin/user-applications" class="btn btn-primary"
            >Back</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import AdminNav from "@/components/admin-nav.vue";
import AdminSideBar from "@/components/admin-sidebar.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const user = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  extension_name: "",
  birth_date: "",
  age: "",
  sex: "",
  address: "",
  contact_num: "",
  emergency_contact: "",
});

const filePath = ref("");

const loadUser = async () => {
  const response = await api.get(`/admin/getOneStudent/?id=${route.params.id}`);
  user.value.first_name = response.data.first_name;
  user.value.middle_name = response.data.middle_name;
  user.value.last_name = response.data.last_name;
  user.value.extension_name = response.data.extension_name;
  user.value.birth_date = response.data.birth_date;
  user.value.age = response.data.age;
  user.value.sex = response.data.sex;
  user.value.address = response.data.address;
  user.value.contact_num = response.data.contact_num;
  user.value.emergency_contact = response.data.emergency_contact;
  filePath.value = `${import.meta.env.VITE_API_URL}${
    response.data.student_profile?.file_path
  }`;
};

onMounted(async () => {
  await loadUser();
});
</script>
