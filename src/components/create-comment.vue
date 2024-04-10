<template>
  <div>
    <!-- COMMENT INPUT -->
    <div class="d-flex gap-3 mb-3">
      <VLazyImage
        :src="profile"
        class="rounded-circle"
        width="24"
        height="24"
      />
      <textarea
        class="form-control overflow-y-hidden"
        rows="3"
        placeholder="Write a comment"
        ref="textAreaRef"
        @input="resize"
        v-model="comment"
      ></textarea>
    </div>

    <!-- COMMENT BUTTON -->
    <div class="d-flex justify-content-end gap-3">
      <button 
        class="btn btn-info emoji" 
        style="height: 40px; width: 40px;" 
        @click="toggleEmoji">
        <i class="fa-regular fa-face-smile"></i>
      </button>
      <EmojiPicker v-show="showEmoji" :native="true" @select="onSelectEmoji"/> <!-- added -->
      <button class="btn btn-success btn-sm" @click="emits('refreshComments')">
        Refresh Comments
      </button>
      <button
        v-if="isAdmin"
        class="btn btn-primary btn-sm"
        @click="createAdminComment"
        :disabled="!comment || loading"
      >
        <span v-if="loading"> Commenting</span>
        <span v-else>Comment</span>
      </button>

      <button
        v-else
        class="btn btn-primary btn-sm"
        @click="createStudentComment"
        :disabled="!comment || loading"
      >
        <span v-if="loading"> Commenting</span>
        <span v-else>Comment</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/http/api";
import EmojiPicker from "vue3-emoji-picker"; // emoji plugin
import 'vue3-emoji-picker/css' // emoji design

const showEmoji = ref(false);
const emits = defineEmits(["refreshComments", "commentCreated"]);

const props = defineProps({
  id: {
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  postId: {
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const comment = ref("");
const textAreaRef = ref(null);
const loading = ref(false);

// added for emoji
function onSelectEmoji(emoji) { 
  comment.value += emoji.i;
}

function toggleEmoji() {
  showEmoji.value = !showEmoji.value;
}


// AUTO RESIZE THE INPUT BASE ON THE CONTENT
const resize = () => {
  textAreaRef.value.style.height = "auto";
  textAreaRef.value.style.height = textAreaRef.value.scrollHeight + "px";
};

const createAdminComment = async () => {
  loading.value = true;
  const response = await api.post("/comments/addComment/", {
    admin_id: props.id,
    post_id: props.postId,
    comments: comment.value,
  });
  loading.value = false;
  comment.value = "";
  emits("commentCreated", { comment: comment.value });
};

const createStudentComment = async () => {
  loading.value = true;
  const response = await api.post("/comments/addComment/", {
    student_id: props.id,
    post_id: props.postId,
    comments: comment.value,
  });
  loading.value = false;
  comment.value = "";
  emits("commentCreated", { comment: comment.value });
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
