<template>
  <div
    class="d-flex align-items-center flex-wrap bg-light rounded p-2 position-relative"
  >
    <div
      class="position-absolute"
      v-if="isOwnComment"
      style="right: 10px; top: 0"
    >
      <span @click="deleteComment" v-if="!loading" style="cursor: pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          class="bi bi-x-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
          />
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </span>
      <span class="text-danger text-xs" v-else>Deleting...</span>
    </div>
    <!-- PERSON WHO COMMENT BUTTON-->
    <button class="btn d-flex gap-2 align-items-center">
      <VLazyImage
        :src="profile"
        class="rounded-circle"
        width="24"
        height="24"
      />
      <div class="d-flex flex-column align-items-start">
        <span class="text-xs">{{ fullname }}</span>
      </div>
    </button>
    <span class="text-xs">{{ comments }}</span>
  </div>
</template>

<script setup>
import api from "@/http/api";
import { ref } from "vue";
const props = defineProps({
  profile: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  isOwnComment: {
    type: Boolean,
    required: true,
  },
  commentId: {
    required: true,
  },
});

const emits = defineEmits(["commentDeleted"]);

const loading = ref(false);

const deleteComment = async () => {
  loading.value = true;
  const response = await api.put(`/comments/delete/?id=${props.commentId}`);
  loading.value = false;
  emits("commentDeleted");
};
</script>

<style scoped>
.text-sm {
  font-size: 0.8rem;
}
.text-xs {
  font-size: 0.7rem;
}
</style>
