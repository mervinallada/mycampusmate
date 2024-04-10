<template>
  <div class="p-3 rounded bg-white position-relative">
    <div class="position-absolute" style="right: 10px; top: 10px">
      <div class="dropdown" @click.stop="">
        <button
          class="btn btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-autoClose="outside"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
            />
          </svg>
        </button>

        <ul class="dropdown-menu">
          <li v-if="isOwnPost">
            <button
              type="button"
              class="btn btn-sm dropdown-item"
              @click="deletePost"
              v-if="!loadingDelete"
            >
              Delete Post
            </button>
            <span
              class="dropdown-item text-danger"
              style="pointer-events: none"
              v-else
              >Deleting....</span
            >
          </li>
          <li v-else>
            <template v-if="post.is_reported == 0">
              <button
                v-if="!loadingReport"
                type="button"
                class="btn btn-sm dropdown-item"
                @click="reportPost"
              >
                Report Post
              </button>
              <span
                class="dropdown-item text-danger"
                style="pointer-events: none"
                v-else
                >Reporting....</span
              >
            </template>

            <span
              v-else
              class="dropdown-item text-danger"
              style="pointer-events: none"
              >Reported</span
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- PERSON WHO POST BUTTON-->
    <button class="btn mb-2 d-flex gap-2 align-items-center">
      <img
        :src="
          post.student_id
            ? `${apiUrl}${post.studentpost.student_profile?.file_path}${post.studentpost.student_profile?.file_rand_name}`
            : `${apiUrl}${post.adminpost.admin_profile?.file_path}${post.adminpost.admin_profile?.file_rand_name}`
        "
        class="rounded-circle"
        width="24"
        height="24"
      />
      <div class="d-flex flex-column align-items-start">
        <span class="text-sm">{{
          post.student_id
            ? `${post.studentpost.first_name} ${post.studentpost.last_name}`
            : `${post.adminpost.first_name} ${post.adminpost.last_name}`
        }}</span>
        <span class="text-xs text-secondary">{{
          new Date(post.createdAt).toLocaleString("en-PH", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour12: true,
            hour: "numeric",
            minute: "2-digit",
          })
        }}</span>
      </div>
    </button>

    <!-- POST TEXT CONTENT-->
    <pre
      style="
        white-space: pre-wrap;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      "
      >{{ post.post_description }}</pre
    >

    <!-- POST IMAGE -->
    <div class="mb-3 border" v-if="post.post_files.length > 0">
      <img
        class="w-100 object-fit-cover"
        :src="`${apiUrl}${post.post_files[0].file_path}${post.post_files[0].file_rand_name}`"
      />
    </div>
    <hr />

    <!-- ACTION BUTTONS -->
    <div
      class="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-4"
    >
      <!-- LIKE BUTTON -->
      <button class="btn d-flex align-items-center gap-2" @click="toggleLike">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          :fill="isLiked ? 'blue' : 'currentColor'"
          class="bi bi-hand-thumbs-up"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
          />
        </svg>
        <span>({{ likesCount }})</span>
        <span class="text-sm">{{ isLiked ? "Liked" : "Like" }}</span>
      </button>

      <!-- COMMENT BUTTON -->
      <button
        class="btn d-flex align-items-center gap-2"
        @click="showCreateComment = !showCreateComment"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-chat"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
          />
        </svg>
        <span>({{ post.comments_to_post.length }})</span>
        <span class="text-sm">Comment</span>
      </button>

      <!-- SHARE BUTTON -->
      <button
        v-if="!isAdmin"
        class="btn d-flex align-items-center gap-2"
        @click="toggleSharePost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          :fill="isShared ? 'blue' : 'currentColor'"
          class="bi bi-share"
          viewBox="0 0 16 16"
        >
          <path
            d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
          />
        </svg>
        <span class="text-sm">
          <span v-if="isShared">Shared</span>
          <span v-else>Share</span>
        </span>
      </button>
    </div>

    <!-- WRITE A COMMENT -->
    <div v-show="showCreateComment">
      <p>Make a comment</p>
      <CreateComment
        :id="id"
        :postId="post.id"
        :profile="profile"
        @comment-created="emits('commentCreated')"
        @refresh-comments="emits('refreshComments')"
        :is-admin="isAdmin"
      ></CreateComment>
      <hr />
      <div class="d-flex flex-column gap-2">
        <Comment
          v-for="comment in comments"
          :fullname="
            comment.admincomments
              ? `${comment.admincomments.first_name}  ${comment.admincomments.last_name}`
              : `${comment.studentcomments.first_name}  ${comment.studentcomments.last_name}`
          "
          :profile="
            comment.admincomments
              ? `${apiUrl}${comment.admincomments.admin_profile?.file_path}${comment.admincomments.admin_profile?.file_rand_name}`
              : `${apiUrl}${comment.studentcomments.student_profile?.file_path}${comment.studentcomments.student_profile?.file_rand_name}`
          "
          :comments="comment.comments"
          :comment-id="comment.id"
          :is-own-comment="
            comment.admincomments
              ? id == comment.admincomments.id
              : id == comment.studentcomments.id
          "
          @comment-deleted="emits('commentDeleted')"
        ></Comment>
        <hr v-if="post.comments_to_post.length > 0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CreateComment from "@/components/create-comment.vue";
import Comment from "@/components/comment.vue";
import api from "@/http/api";
import { ref, watch } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  isOwnPost: {
    type: Boolean,
    required: true,
  },
  userId: {
    required: true,
  },
  id: {
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
});
const emits = defineEmits([
  "postDeleted",
  "refreshComments",
  "commentCreated",
  "commentDeleted",
  "reported",
]);

const comments = ref(props.post.comments_to_post);

watch(
  () => props.post,
  () => {
    comments.value = props.post.comments_to_post;
  }
);

const showCreateComment = ref(false);
const isLiked = ref(false);
const isShared = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const loadingDelete = ref(false);
const loadingReport = ref(false);

const likesCount = ref(
  JSON.parse(props.post.likes)?.length > 0
    ? JSON.parse(props.post.likes)?.length
    : 0
);

watch(
  () => props.post,
  () => {
    const likes = JSON.parse(props.post.likes);
    if (likes?.length > 0 && likes.includes(props.userId)) {
      isLiked.value = true;
    } else {
      isLiked.value = false;
    }
  },
  { immediate: true }
);

const deletePost = async () => {
  loadingDelete.value = true;
  const response = await api.put(`/post/delete/?id=${props.post.id}`);
  loadingDelete.value = false;
  emits("postDeleted", props.post.id);
};

const toggleLike = async () => {
  isLiked.value = !isLiked.value;
  if (isLiked.value) {
    likesCount.value++;
  } else {
    likesCount.value--;
  }
  const response = await api.put(`/post/likePost/?id=${props.post.id}`);
};

const toggleSharePost = async () => {
  isShared.value = !isShared.value;
  if (isShared.value) {
    await Swal.fire({
      title: "Shared",
      text: "Post has been shared",
      icon: "success",
    });
  }
};

const reportPost = async () => {
  loadingReport.value = true;
  const response = await api.put("/post/reportPost/", {
    post_id: props.post.id,
    reason: "sample",
  });

  loadingReport.value = false;
  emits("reported");
};
</script>

<style scoped>
.text-sm {
  font-size: 0.8rem;
}
.text-xs {
  font-size: 0.7rem;
}

.dropdown-toggle::after {
  display: none;
}
</style>
