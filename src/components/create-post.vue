<template>
  <div class="p-3 rounded bg-white">
    <div class="mb-3">
      <!-- USER WHO POST BUTTON-->
      <button class="btn mb-2 d-flex gap-2 align-items-center">
        <VLazyImage
          :src="profile"
          class="rounded-circle"
          width="24"
          height="24"
        />
        <span class="text-sm">{{ name }}</span>
      </button>

      <div class="mb-3 border" v-if="fileUploadPath">
        <VLazyImage class="w-100 object-fit-cover" :src="fileUploadPath" />
      </div>

      <!-- POST TEXT INPUT-->
      <textarea
        class="form-control overflow-y-hidden"
        rows="3"
        placeholder="What's on your mind?"
        ref="textAreaRef"
        @input="resize"
        v-model="postContent"
      ></textarea>
    </div>
    <div class="d-flex justify-content-end gap-3">
      <button 
        class="btn btn-info emoji" 
        style="height: 40px; width: 40px;" 
        @click="toggleEmoji">
        <i class="fa-regular fa-face-smile"></i>
      </button>
      <EmojiPicker v-show="showEmoji" :native="true" @select="onSelectEmoji"/> <!-- added -->
      <input
        type="file"
        class="d-none"
        id="uploadImage"
        accept="image/*"
        @change="fileSelected"
      />
      <button
        v-if="fileUploadPath && !loading"
        class="btn btn-danger"
        @click="removePostImage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
          />
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
          />
        </svg>
      </button>
      <label class="btn btn-success" for="uploadImage" v-if="!loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-image"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          <path
            d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"
          />
        </svg>
      </label>
      <button
        :disabled="(!postContent && !fileUploadPath) || loading"
        class="btn btn-primary"
        @click="createPost"
      >
        <span v-if="loading">Posting...</span>
        <span v-else>Post</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import api from "@/http/api";
import { ref } from "vue";
import EmojiPicker from "vue3-emoji-picker"; // emoji plugin
import 'vue3-emoji-picker/css' // emoji design

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["postCreated"]);

const textAreaRef = ref(null);
const fileUploadPath = ref("");
const fileUpload = ref(null);
const postContent = ref("");
const loading = ref(false);
const showEmoji = ref(false);

// added for emoji
function onSelectEmoji(emoji) { 
  postContent.value += emoji.i;
}

function toggleEmoji() {
  showEmoji.value = !showEmoji.value;
}

// AUTO RESIZE THE INPUT BASE ON THE CONTENT
const resize = (e) => {
  postContent.value = e.target.value;
  textAreaRef.value.style.height = "auto";
  textAreaRef.value.style.height = textAreaRef.value.scrollHeight + "px";
};

const fileSelected = (e) => {
  const input = e.target;

  if (!input.files || input.files.length === 0) return;
  const file = input.files[0];
  fileUpload.value = file;

  const reader = new FileReader();

  reader.onload = (result) => {
    fileUploadPath.value = result.target.result;
    e.target.value = "";
  };

  reader.readAsDataURL(file);
};

const removePostImage = () => {
  fileUploadPath.value = "";
  fileUpload.value = null;
};

const createPost = async () => {
  loading.value = true;
  const response = await api.post(
    "/post/create",
    {
      file: fileUpload.value,
      post_description: postContent.value,
      visibility: 1,
    },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  loading.value = false;

  postContent.value = "";
  fileUploadPath.value = "";
  fileUpload.value = null;
  emits("postCreated");
};
</script>

<style scoped>
textarea {
  resize: none;
}
.text-sm {
  font-size: 0.8rem;
}
.emoji {
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
}
</style>
