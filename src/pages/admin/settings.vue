<template>
  <div class="min-vh-100 d-flex flex-column overflow-auto bg-light">
    <!-- ADMIN NAVIGATION BAR -->
    <AdminNav></AdminNav>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- ADMIN SIDEBAR -->
      <AdminSideBar></AdminSideBar>
      <!-- MAIN CONTENT -->
      <div class="p-3 flex-grow-1">
        <h3 class="mb-3">Profile</h3>
        <div class="container">
          <div class="row g-3">
            <div class="col-md-4">
              <div
                class="border p-5 d-flex align-items-center flex-column gap-3 bg-white mb-3"
              >
                <img
                  :src="filePath"
                  width="150"
                  height="150"
                  class="border rounded-circle"
                  ref="imageRef"
                />
                <input
                  type="file"
                  class="d-none"
                  id="file"
                  accept="image/*"
                  @change="fileSelected"
                />
                <label for="file" class="btn btn-primary">Change Photo</label>
              </div>

              <div class="border bg-white">
                <p class="fw-bold text-secondary p-2">Change Password</p>

                <div class="p-3">
                  <form @submit.prevent="updateProfile">
                    <div class="mb-3">
                      <label class="form-label">New Password</label>
                      <input
                        type="password"
                        class="form-control"
                        required
                        v-model="user.password"
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="border bg-white mb-3">
                <p class="fw-bold text-secondary p-2 mb-3">User Settings</p>

                <div class="p-3">
                  <form @submit.prevent="updateProfile">
                    <div class="row mb-3">
                      <div class="col-md-6">
                        <label class="form-label">Username</label>
                        <input
                          type="text"
                          class="form-control"
                          required
                          v-model="user.username"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          required
                          v-model="user.email"
                        />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Save Settings
                    </button>
                  </form>
                </div>
              </div>

              <div class="border bg-white">
                <p class="fw-bold text-secondary p-2 mb-3">Contact Settings</p>

                <div class="p-3">
                  <form @submit.prevent="updateProfile">
                    <div class="row g-3 mb-3">
                      <div class="col-12">
                        <label class="form-label">Address</label>
                        <input
                          type="text"
                          class="form-control"
                          required
                          v-model="user.address"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Contact</label>
                        <input
                          type="text"
                          class="form-control"
                          required
                          v-model="user.contact_num"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Emergency Contact</label>
                        <input
                          type="text"
                          class="form-control"
                          required
                          v-model="user.emergency_contact"
                        />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Save Settings
                    </button>
                  </form>
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
import { onMounted, ref } from "vue";
import api from "@/http/api";
import Swal from "sweetalert2";

const imageRef = ref(null);
const user = ref({
  username: "",
  email: "",
  address: "",
  contact_num: "",
  emergency_contact: "",
  password: "",
  file: "",
});

const filePath = ref("");

const loadUser = async () => {
  const response = await api.get("/jwt/getOne/");
  user.value.username = response.data.user_admin.username;
  user.value.email = response.data.user_admin.email;
  user.value.address = response.data.address;
  user.value.contact_num = response.data.contact_num;
  user.value.emergency_contact = response.data.emergency_contact;
  filePath.value = `${import.meta.env.VITE_API_URL}${
    response.data.admin_profile?.file_path
  }${response.data.admin_profile?.file_rand_name}`;
};

onMounted(async () => {
  await loadUser();
});

const fileSelected = async (e) => {
  const input = e.target;

  if (!input.files || input.files.length === 0) return;

  const reader = new FileReader();
  const file = input.files[0];
  user.value.file = file;
  await updateProfile();

  reader.onload = (result) => {
    imageRef.value.src = result.target.result;
  };

  reader.readAsDataURL(file);
};

const updateProfile = async () => {
  const response = await api.put("/admin/update/", user.value, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  await Swal.fire({
    title: "Success",
    text: "User profile updated successfully",
    icon: "success",
  });
};
</script>
