<template>
  <div class="vw-100 vh-100 d-flex flex-column overflow-auto">
    <!-- HEADER -->
    <StudentHeader
      @newsfeed-clicked="newsFeedClicked"
      @timeline-clicked="searchStudent(authStudent.id)"
      @logout-clicked="logout"
    ></StudentHeader>
    <main class="flex-grow-1 container overflow-auto">
      <div class="row h-100 overflow-auto">
        <!-- LEFT SIDEBAR -->
        <div class="col h-100 overflow-auto d-none d-sm-block">
          <div class="p-3 h-100 overflow-auto d-flex flex-column">
            <!-- SEARCH PERSON INPUT -->
            <div class="mb-3 position-relative">
              <input
                type="text"
                class="form-control"
                placeholder="Search person here"
                v-model="searchInput"
              />

              <!-- SEARCH RESULT -->
              <div
                class="mb-3 bg-white position-absolute border overflow-auto"
                style="z-index: 9; width: 100%; max-height: 400px"
                v-if="searchResult.length > 0"
              >
                <div class="d-grid column gap-2">
                  <button
                    @click="searchStudent(student.student.id)"
                    class="btn d-flex justify-content-start align-items-center gap-2"
                    v-for="student in searchResult"
                  >
                    <VLazyImage
                      :src="`${apiUrl}${student.student.student_profile?.file_path}${student.student.student_profile?.file_rand_name}`"
                      class="rounded-circle"
                      width="24"
                      height="24"
                    />
                    <span class="text-sm">{{
                      `${student.student.first_name} ${student.student.last_name}`
                    }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- NAVIGATION BUTTONS -->
            <div class="flex-grow-1 overflow-auto">
              <StudentSidebar
                @newsfeed-clicked="newsFeedClicked"
                @timeline-clicked="searchStudent(authStudent.id)"
                @logout-clicked="logout"
              ></StudentSidebar>
            </div>
          </div>
        </div>

        <!-- MAIN CONTENT/NEWSFEED -->
        <div
          class="col col-sm-6 overflow-auto h-100 overflow-auto bg-body-secondary"
        >
          <div
            class="p-3 h-100 overflow-auto d-flex flex-column gap-3"
            ref="newsfeedRef"
          >
            <h4 v-if="!authStudent || !posts || !users || !students">
              LOADING...
            </h4>
            <!-- DISPLAY CREATE POST IF USER DID NOT SEARCH A STUDENT -->
            <CreatePost
              v-if="authStudent && !currentStudent"
              :name="`${authStudent.first_name} ${authStudent.last_name}`"
              :profile="`${apiUrl}${authStudent.student_profile?.file_path}${authStudent.student_profile?.file_rand_name}`"
              @post-created="getPosts"
            ></CreatePost>
            <!-- DISPLAY THIS POSTS IF USER DID NOT SEARCH A STUDENT -->
            <template v-if="posts.length > 0 && authStudent && !currentStudent">
              <Post
                v-for="post in posts"
                :key="post.id"
                :post="post"
                :isOwnPost="post.student_id == authStudent.id"
                :user-id="authStudent.user_id"
                :id="authStudent.id"
                :is-admin="false"
                :profile="`${apiUrl}${authStudent.student_profile?.file_path}${authStudent.student_profile?.file_rand_name}`"
                @post-deleted="postDeleted"
                @comment-created="refreshPosts"
                @refresh-comments="refreshPosts"
                @comment-deleted="refreshPosts"
                @reported="refreshPosts"
              ></Post>
            </template>
            <!-- TIMELINE -->

            <!-- DISPLAY THIS TIMELINE IF USER SEARCHED A STUDENT -->
            <template v-if="currentStudent">
              <Timeline
                :student="currentStudent"
                :is-own-timeline="currentStudent.id == authStudent.id"
                :auth-student-id="authStudent.id"
                :is-admin="false"
                @postCreatedTimeline="refreshSearchStudent"
                @postDeletedTimeline="postDeletedTimeline"
                @toggle-like="refreshSearchStudent"
                @refresh-comments="refreshSearchStudent"
                @comment-deleted="refreshSearchStudent"
                @reported="refreshSearchStudent"
                @comment-created="refreshSearchStudent"
              ></Timeline>
            </template>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="col h-100 overflow-auto d-none d-sm-block">
          <div class="p-3 h-100 overflow-auto d-flex flex-column">
            <!-- SEARCH FRIEND INPUT -->
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search friend here"
              />
            </div>

            <div class="flex-grow-1 overflow-auto">
              <FriendList
                v-if="users && authStudent"
                :users="users"
                :logged-in-id="authStudent.user_id"
              ></FriendList>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import StudentHeader from "@/components/student-header.vue";
import StudentSidebar from "@/components/student-sidebar.vue";
import FriendList from "@/components/friend-list.vue";
import CreatePost from "@/components/create-post.vue";
import Post from "@/components/post.vue";
import Timeline from "@/components/timeline.vue";
import api from "@/http/api";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();
const newsfeedRef = ref(null);
const authStudent = ref(null);
const posts = ref([]);
const students = ref([]);
const users = ref([]);
const searchInput = ref("");
const searchResult = ref([]);
const currentStudent = ref(null);

watch(searchInput, () => {
  if (searchInput.value) {
    searchResult.value = students.value.filter((x) => {
      const fullname =
        `${x.student.first_name} ${x.student.last_name}`.toLowerCase();
      return fullname.includes(searchInput.value);
    });
  } else {
    searchResult.value = [];
  }
});

onMounted(async () => {
  await getCurrentUser();
  await Promise.all([getStudents(), getPosts(), getUsers()]);
});

const getCurrentUser = async () => {
  const response = await api.get("/student/getOneStudent/");
  authStudent.value = response.data;
};

const getPosts = async () => {
  const response = await api.get("/post/get");
  posts.value = response.data;
};

const getStudents = async () => {
  const response = await api.get("/admin/getAllStudent/");
  students.value = response.data;
};

const getUsers = async () => {
  const response = await api.get("/admin/getAllUser/");
  users.value = response.data;
};

const searchStudent = async (id) => {
  const response = await api.get(`/post/getOne/?id=${id}`);
  currentStudent.value = response.data;
  searchInput.value = "";
};

const refreshPosts = async () => {
  currentStudent.value = null;
  await getPosts();
};

const newsFeedClicked = async () => {
  await refreshPosts();
  newsfeedRef.value.scrollTop = 0;
};

const refreshSearchStudent = async (id) => {
  await searchStudent(id);
};

const postDeleted = (id) => {
  const idx = posts.value.findIndex((x) => x.id == id);
  posts.value.splice(idx, 1);
};

const postDeletedTimeline = (studentId, postId) => {
  const idx = currentStudent.value.poststudent.findIndex((x) => x.id == postId);
  currentStudent.value.poststudent.splice(idx, 1);
};

const logout = async () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
.text-sm {
  font-size: 0.8rem;
}
</style>
