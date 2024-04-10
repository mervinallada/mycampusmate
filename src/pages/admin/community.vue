<template>
  <div class="vh-100 d-flex flex-column overflow-auto bg-light">
    <!-- ADMIN NAVIGATION BAR -->
    <AdminNav></AdminNav>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- ADMIN SIDEBAR -->
      <AdminSideBar></AdminSideBar>
      <!-- MAIN CONTENT -->
      <div class="p-3 flex-grow-1 overflow-auto">
        <div style="height: 300px; position: relative">
          <VLazyImage src="/bg.png" class="cover-photo" />
          <VLazyImage
            src="/shortcut.png"
            class="profile-photo"
            width="200"
            height="200"
          />
        </div>

        <div style="margin-top: 150px">
          <nav>
            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Timeline
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                About
              </button>
              <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Images
              </button>
            </div>
          </nav>

          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              tabindex="0"
            >
              <div class="bg-white d-flex justify-content-center">
                <div style="max-width: 600px; width: 100%">
                  <CreatePost
                    v-if="authAdmin"
                    :name="`${authAdmin.first_name} ${authAdmin.last_name}`"
                    :profile="`${apiUrl}${authAdmin.admin_profile?.file_path}${authAdmin.admin_profile?.file_rand_name}`"
                    @post-created="getPosts"
                  ></CreatePost>

                  <template v-if="posts">
                    <Post
                      v-for="post in posts"
                      :key="post.id"
                      :post="post"
                      :isOwnPost="post.admin_id == authAdmin.id"
                      :user-id="authAdmin.user_id"
                      :id="authAdmin.id"
                      :is-admin="true"
                      :profile="`${apiUrl}${authAdmin.admin_profile?.file_path}${authAdmin.admin_profile?.file_rand_name}`"
                      @post-deleted="refreshPosts"
                      @comment-created="refreshPosts"
                      @refresh-comments="refreshPosts"
                      @comment-deleted="refreshPosts"
                      @reported="refreshPosts"
                    ></Post>
                  </template>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              tabindex="0"
            >
              <div class="row p-4 g-3">
                <div class="col-12">
                  <div class="bg-white border p-4 text-center">
                    <h4>About Us</h4>
                    <p>
                      MyCampusMate is a research capstone project designed
                      exclusively for Saint Francis of Assisi College students.
                      It offers a secure space for students to post, message,
                      connect with peers, and stay updated on important
                      announcements. Our goal is to strengthen the sense of
                      community and facilitate seamless communication within the
                      campus.
                    </p>
                  </div>
                </div>

                <div class="col-12">
                  <div class="d-flex gap-3">
                    <div class="bg-white border p-4 text-center">
                      <h4>Vision</h4>
                      <p>
                        Empowering Saint Francis of Assisi students by fostering
                        a dynamic online community for seamless communication,
                        collaboration, and knowledge exchange. To be a safe
                        space for students to grow socially and individually by
                        creating a lively environment that improves and
                        strengthens the bonds among franciscans.
                      </p>
                    </div>

                    <div class="bg-white border p-4 text-center">
                      <h4>Mission</h4>
                      <p>
                        MyCampusMate is dedicated to providing Saint Francis of
                        Assisi College students with a centralized platform to
                        connect, share ideas, and stay informed. We aim to
                        enhance the overall campus experience through meaningful
                        interactions and resourceful engagement. MyCampusMate
                        aims to create a sense of belonging, solidarity, and
                        cooperation among our peers as we empower our fellow
                        students with a platform to showcase their talents and
                        success. By fostering inclusivity, camaraderie, and
                        personal growth, as we strive to improve the overall
                        students experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="images tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              tabindex="0"
            >
              <!-- <img src="https://m.media-amazon.com/images/M/MV5BM2YwYTkwNjItNGQzNy00MWE1LWE1M2ItOTMzOGI1OWQyYjA0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg" alt="">
              <img src="https://static.tvtropes.org/pmwiki/pub/images/2e5c6d37_566f_4274_b62d_ebf5fcbd0722.png" alt="">
              <img src="https://images.justwatch.com/poster/248497985/s332/one-piece" alt=""> -->
              
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
import CreatePost from "@/components/create-post.vue";
import Post from "@/components/post.vue";
import { onMounted, ref } from "vue";
import api from "@/http/api";

const authAdmin = ref(null);
const apiUrl = import.meta.env.VITE_API_URL;
const posts = ref([]);

const getCurrentUser = async () => {
  const response = await api.get("/jwt/getOne/");
  authAdmin.value = response.data;
};

onMounted(async () => {
  await getCurrentUser();
  await getPosts();
});

const getPosts = async () => {
  const response = await api.get("/post/get");
  posts.value = response.data;
};

const refreshPosts = async () => {
  await getPosts();
};
</script>

<style scoped>
.cover-photo {
  width: 100%;
  height: 100%;
  object-position: bottom;
}
.profile-photo {
  border-radius: 1rem;
  border: 2px solid #eee;
  position: absolute;
  left: 30px;
  bottom: -100px;
}
.images img {
  height: 300px;
  width: 150px;
  margin: 20px 0px 20px 10px;
  border-radius: 5px;

}
</style>
