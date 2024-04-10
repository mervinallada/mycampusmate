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
              Reported Posts
            </li>
          </ol>
        </nav>

        <div class="container">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search post here"
              v-model="search"
            />
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Post</th>
                  <th scope="col">Reported By</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(post, idx) in filteredResults">
                  <th scope="row">{{ idx + 1 }}</th>
                  <td>{{ post.post_description }}</td>
                  <td>
                    {{
                      post.report_to_user.student
                        ? `${post.report_to_user.student.first_name} ${post.report_to_user.student.last_name}`
                        : `${post.report_to_user.admin.first_name} ${post.report_to_user.admin.last_name}`
                    }}
                  </td>
                  <td>
                    {{
                      new Date(post.createdAt).toLocaleString("en-PH", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour12: true,
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    }}
                  </td>
                  <td>
                    <span
                      class="text-danger fw-bold"
                      v-if="post.is_reported == 1"
                      >Unverified</span
                    >
                    <span class="text-success fw-bold" v-else>Verified</span>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="deletePost(post.id)"
                      :disabled="post.is_reported == 2"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

const reportedPosts = ref([]);
const search = ref("");
const filteredResults = ref([]);

const loadReports = async () => {
  const response = await api.get("/post/getReportedPost");
  reportedPosts.value = response.data;
  filteredResults.value = reportedPosts.value;
};

onMounted(async () => {
  await loadReports();
});

watch(search, () => {
  if (search.value) {
    filteredResults.value = reportedPosts.value.filter((x) => {
      return x.post_description
        .toLowerCase()
        .includes(search.value.toLowerCase());
    });
  } else {
    filteredResults.value = reportedPosts.value;
  }
});

const deletePost = async (id) => {
  await api.put(`/post/approveReport/?id=${id}`);

  const post = reportedPosts.value.find((x) => x.id == id);
  post.is_reported = 2;
};
</script>
