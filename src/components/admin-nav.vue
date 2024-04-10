<template>
  <!-- ADMIN NAVIGATION -->
  <nav style="background-color: #c23c21">
    <div
      class="container d-flex align-items-center justify-content-between py-2 px-1"
    >
      <a class="navbar-brand" href="#">
        <VLazyImage src="/logo.png" width="200" />
      </a>

      <div class="d-flex align-items-center gap-3">
        <div class="dropdown text-white">
          <button
            class="nav-link dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Admin
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <RouterLink
                class="dropdown-item d-flex align-items-center gap-2"
                to="/admin/settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"
                  />
                  <path
                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
                  />
                </svg>
                <span>Settings</span></RouterLink
              >
            </li>
            <li>
              <button
                class="dropdown-item btn d-flex align-items-center gap-2"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-power"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.5 1v7h1V1z" />
                  <path
                    d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>

        <button
          class="btn text-white d-block d-sm-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">
          My Campus Mate
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-flex flex-column gap-3">
          <router-link to="/admin/dashboard" class="btn btn-light"
            >Dashboard</router-link
          >
          <router-link to="/admin/user-applications" class="btn btn-light"
            >Manage User Application</router-link
          >
          <router-link to="/admin/community" class="btn btn-light"
            >Community</router-link
          >
          <router-link class="btn btn-light" to="/admin/messages"
            >Messages</router-link
          >
          <router-link class="btn btn-light" to="/admin/reported-posts"
            >Reported Posts</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import api from "@/http/api";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
