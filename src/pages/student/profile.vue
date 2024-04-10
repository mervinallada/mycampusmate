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
            <li class="breadcrumb-item active" aria-current="page">Profile</li>
          </ol>
        </nav>

        <div class="mx-auto" style="max-width: 400px">
          <div v-if="authStudent">
            <div
              class="border p-5 d-flex align-items-center flex-column gap-3 bg-white mb-3"
            >
              <img
                :src="filePath"
                width="150"
                height="150"
                class="border rounded-circle"
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
          </div>

          <form @submit.prevent="updatePassword">
            <div class="row mb-3">
              <div class="col-12">
                <label class="form-label">Old Password</label>
                <input
                  type="password"
                  class="form-control"
                  required
                  v-model="oldPassword"
                />
              </div>
              <div class="col-12">
                <label class="form-label">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  required
                  v-model="newPassword"
                />
              </div>
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                Change Password
              </button>
              <RouterLink
                to="/student/newsfeed"
                type="submit"
                class="btn btn-secondary"
                >Back</RouterLink
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import StudentHeader from "@/components/student-header.vue";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;
const authStudent = ref(null);
const profile = ref(null);
const filePath = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const loading = ref(false);

const getCurrentUser = async () => {
  const response = await api.get("/student/getOneStudent/");
  authStudent.value = response.data;
  filePath.value = `${apiUrl}${authStudent.value.student_profile?.file_path}${authStudent.value.student_profile?.file_rand_name}`;
};

onMounted(async () => {
  await getCurrentUser();
});

const fileSelected = async (e) => {
  const input = e.target;

  if (!input.files || input.files.length === 0) return;

  const reader = new FileReader();
  const file = input.files[0];
  profile.value = file;
  await updateProfile();

  reader.onload = (result) => {
    filePath.value = result.target.result;
  };

  reader.readAsDataURL(file);
};

const updateProfile = async () => {
  const response = await api.put(
    "/jwt/changeProfile/",
    { file: profile.value },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  await Swal.fire({
    title: "Success",
    text: "User profile updated successfully",
    icon: "success",
  });
};

const updatePassword = async () => {
  try {
    loading.value = true;
    const response = await api.put("/jwt/changePassword/", {
      old_password: oldPassword.value,
      new_password: newPassword.value,
    });
    oldPassword.value = "";
    newPassword.value = "";
    await Swal.fire({
      title: "Success",
      text: "User password updated successfully",
      icon: "success",
    });
  } catch (error) {
    await Swal.fire({
      title: "Error",
      text: "Old password is incorrect",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
