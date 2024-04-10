<template>
  <div>
    <div class="mt-3 p-3 d-flex gap-3 bg-white">
      <div style="height: 300px; width: 100%; position: relative">
        <VLazyImage
          src="/bg.png"
          src-placeholder="/bg-thumbnail.png"
          class="cover-photo"
        />
        <VLazyImage
          :src="`${apiUrl}${student.student_profile?.file_path}${student.student_profile?.file_rand_name}`"
          class="profile-photo"
          width="200"
          height="200"
        />
      </div>
    </div>

    <div class="d-flex flex-column align-items-end mt-3">
      <h5 class="fw-bold">
        {{ `${student.first_name} ${student.last_name}` }}
      </h5>
      <div class="d-flex gap-2" v-if="!isOwnTimeline">
        <button class="btn btn-success btn-sm" @click="addFriend">
          Add Friend
        </button>
        <button class="btn btn-primary btn-sm" @click="showMessage = true">
          Message
        </button>
      </div>
    </div>

    <div class="d-flex flex-column gap-3 mt-5">
      <CreatePost
        v-if="isOwnTimeline"
        :name="`${student.first_name} ${student.last_name}`"
        :profile="`${apiUrl}${student.student_profile?.file_path}${student.student_profile?.file_rand_name}`"
        @post-created="postCreated"
      ></CreatePost>
      <Post
        :post="{
          createdAt: post.createdAt,
          id: post.id,
          post_description: post.post_description,
          post_files: post.post_files,
          visibility: post.visibility,
          student_id: authStudentId,
          likes: post.likes,
          comments_to_post: post.comments_to_post,
          studentpost: {
            first_name: student.first_name,
            middle_name: student.middle_name,
            last_name: student.last_name,
            age: student.age,
            address: student.address,
            student_num: student.student_num,
            student_profile: student.student_profile,
          },
        }"
        v-for="post in student.poststudent"
        :key="post.id"
        :isOwnPost="isOwnTimeline"
        :is-admin="false"
        :id="student.id"
        :user-id="student.user_id"
        :profile="`${apiUrl}${student.student_profile?.file_path}${student.student_profile?.file_rand_name}`"
        @post-deleted="deletePost(post.id)"
        @refresh-comments="emits('refreshComments', student.id)"
        @comment-created="emits('commentCreated', student.id)"
        @comment-deleted="emits('commentDeleted', student.id)"
        @reported="emits('reported', student.id)"
      ></Post>
    </div>
  </div>
</template>

<script setup>
import Post from "@/components/post.vue";
import CreatePost from "@/components/create-post.vue";
const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
  isOwnTimeline: {
    type: Boolean,
    required: true,
  },
  authStudentId: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits([
  "postCreatedTimeline",
  "postDeletedTimeline",
  "commentCreated",
  "refreshComments",
  "commentDeleted",
  "reported",
]);
const apiUrl = import.meta.env.VITE_API_URL;

const postCreated = () => {
  emits("postCreatedTimeline", props.student.id);
};

const deletePost = (postId) => {
  emits("postDeletedTimeline", props.student.id, postId);
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
</style>
