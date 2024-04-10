<template>
  <div>
    <!-- LIST OF FRIENDS -->
    <ul class="list-group list-group-flush">
      <template v-for="user in users">
        <template v-if="user.id != loggedInId">
          <RouterLink
            :to="`/student/messages/${user.id}`"
            class="list-group-item list-group-item-action d-flex align-items-center gap-3"
          >
            <VLazyImage
              :src="
                user.admin
                  ? `${apiUrl}${user.admin.admin_profile?.file_path}${user.admin.admin_profile?.file_rand_name}`
                  : `${apiUrl}${user.student.student_profile?.file_path}${user.student.student_profile?.file_rand_name}`
              "
              class="rounded-circle"
              width="24"
              height="24"
            />
            <span>{{
              user.admin
                ? `${user.admin.first_name} ${user.admin.last_name}`
                : `${user.student.first_name} ${user.student.last_name}`
            }}</span>
          </RouterLink>
        </template>
      </template>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  users: {
    required: true,
  },
  loggedInId: {
    required: true,
  },
});

const apiUrl = import.meta.env.VITE_API_URL;
</script>
