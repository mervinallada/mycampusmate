<template>
  <div class="wrapper p-5">
    <div class="container">
      <!-- WE ADD .PREVENT TO AVOID RELOADING THE PAGE WHEN THE FORM SUBMITS -->
      <form class="bg-white p-5 bg-blur" @submit.prevent="submitForm">
        <h1>User Registration</h1>
        <hr />
        <div class="row mb-3 gy-2">
          <div class="col-md-3">
            <label class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              v-model="form.first_name"
              required
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Middle Name</label>
            <input
              type="text"
              class="form-control"
              v-model="form.middle_name"
              required
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              v-model="form.last_name"
              required
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Name Extension</label>
            <input
              type="text"
              class="form-control"
              v-model="form.name_extension"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Birthday</label>
            <input
              type="date"
              class="form-control"
              v-model="form.birth_date"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Sex</label>
            <select class="form-select" v-model="form.sex">
              <option selected value="" disabled>--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              v-model="form.address"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Contact Number</label>
            <input
              type="text"
              class="form-control"
              v-model="form.contact_num"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Emergency Contact Number</label>
            <input
              type="text"
              class="form-control"
              v-model="form.emergency_contact"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Student ID Number</label>
            <input
              type="text"
              class="form-control"
              v-model="form.student_num"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Picture of ID</label>
            <input
              class="form-control"
              type="file"
              required
              accept="image/*"
              @change="fileSelected"
              ref="fileRef"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              v-model="form.username"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="form.email"
              required
            />
          </div>
          <div class="col-12">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="form.password"
              required
            />
          </div>
          <div class="col-12">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :value="false"
                id="confirm"
                required
                v-model="form.confirm"
              />
              <label class="form-check-label fst-italic text-sm" for="confirm">
                In submitting this form I agree to my details being used for the
                website and I also understand that my data will be held
                securely. I understand that when this information is no longer
                required for this purpose my data will be disposed properly.
              </label>
            </div>
          </div>
        </div>

        <!-- SHOW ONLY THIS SUCCESS MESSAGE WHEN SUCCESSFULLY REGISTERED -->
        <div class="alert alert-success" role="alert" v-if="showSuccess">
          <span class="fw-bold">Successfully registered!</span> You will have to
          wait for the confirmation of your account from the admin before you
          can login.
        </div>

        <!-- SHOW ONLY THIS ERROR MESSAGE WHEN REGISTER FAILED -->
        <div class="alert alert-danger" role="alert" v-if="errorMsg">
          <span class="fw-bold">{{ errorMsg }}</span>
        </div>

        <button type="submit" class="btn btn-danger" :disabled="loading">
          Register
        </button>
        <RouterLink to="/login" class="btn btn-secondary ms-2">Back</RouterLink>
      </form>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import { ref } from "vue";

// THIS IS WHERE THE USER INPUT WILL BE STORED AND EVENTUALLY WILL BE SENT INTO THE API
const form = ref({
  first_name: "",
  last_name: "",
  middle_name: "",
  name_extension: "",
  birth_date: "",
  sex: "",
  address: "",
  contact_num: "",
  emergency_contact: "",
  student_num: "",
  file: "",
  username: "",
  email: "",
  password: "",
  confirm: false,
  usertype: 2,
  is_approved: 0,
});

const showSuccess = ref(false);
const errorMsg = ref(null);
const loading = ref(false);
const fileRef = ref(null);

// SUBMIT THE FORM
const submitForm = async () => {
  try {
    loading.value = true;
    const response = await api.post("/jwt/register/", form.value, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    loading.value = false;
    fileRef.value = null;

    // CLEAR THE INPUTS WHEN SUCCESSFULLY REGISTERED
    form.value.first_name = "";
    form.value.last_name = "";
    form.value.middle_name = "";
    form.value.name_extension = "";
    form.value.birth_date = "";
    form.value.sex = "";
    form.value.address = "";
    form.value.contact_num = "";
    form.value.emergency_contact = "";
    form.value.student_num = "";
    form.value.file = "";
    form.value.username = "";
    form.value.email = "";
    form.value.password = "";
    form.value.confirm = false;
    showSuccess.value = true;
  } catch (error) {
    errorMsg.value = error.response.data;
  }
};

const fileSelected = (e) => {
  const input = e.target;
  if (!input.files || input.files.length === 0) return;

  form.value.file = input.files[0];
};
</script>

<style scoped>
.wrapper {
  background-color: #c23c21;
  min-height: 100vh;
}

.text-sm {
  font-size: 0.8rem;
}
</style>
