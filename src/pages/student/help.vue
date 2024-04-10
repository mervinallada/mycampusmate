<template>
  <div class="vw-100 vh-100 d-flex flex-column overflow-auto">
    <!-- HEADER -->
    <StudentHeader></StudentHeader>
    <div class="d-flex flex-grow-1 overflow-auto">
      <!-- MAIN CONTENT -->
      <div class="container p-3 flex-grow-1overflow-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page">
              Help Center
            </li>
          </ol>
        </nav>

        <router-link to="/student/newsfeed" class="btn btn-primary"
          >Go Back</router-link
        >

        <h1 class="my-3 text-center">FAQ</h1>

        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                About Us
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                MyCampusMate is a research capstone project designed exclusively
                for Saint Francis of Assisi College students. It offers a secure
                space for students to post, message, connect with peers, and
                stay updated on important announcements. Our goal is to
                strengthen the sense of community and facilitate seamless
                communication within the campus.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                What is our Vision?
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Empowering Saint Francis of Assisi students by fostering a
                dynamic online community for seamless communication,
                collaboration, and knowledge exchange. To be a safe space for
                students to grow socially and individually by creating a lively
                environment that improves and strengthens the bonds among
                franciscans.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                What is our Mission?
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                MyCampusMate is dedicated to providing Saint Francis of Assisi
                College students with a centralized platform to connect, share
                ideas, and stay informed. We aim to enhance the overall campus
                experience through meaningful interactions and resourceful
                engagement. MyCampusMate aims to create a sense of belonging,
                solidarity, and cooperation among our peers as we empower our
                fellow students with a platform to showcase their talents and
                success. By fostering inclusivity, camaraderie, and personal
                growth, as we strive to improve the overall students experience.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
              >
                Community Standards and Guidelines
              </button>
            </h2>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <p>
                  Welcome to MyCampusMate! Our community guidelines serve as the
                  foundation for a positive and respectful online environment
                  exclusive to Saint Francis of Assisi students. By embracing
                  these guidelines, you contribute to a collaborative space
                  where ideas flow, connections thrive, and a sense of belonging
                  blossoms. Designed to ensure a secure, respectful, and
                  inclusive online space, these standards are the compass that
                  guides our interactions. By upholding these principles, you
                  contribute to a community that values diversity, safety, and
                  positive engagement. Let's foster an environment where each
                  member feels welcome, respected, and empowered to make the
                  most of their MyCampusMate experience. Let's build a digital
                  campus that reflects the spirit of our community, fostering
                  meaningful interactions and enhancing the overall student
                  experience. Thank you for being an essential part of
                  MyCampusMate!
                </p>

                <p class="my-3 fw-bold">Bulletin Board Announcements:</p>

                <ul style="list-style: square">
                  <li>
                    Administrators will use the bulletin board to share
                    important announcements, events, and updates relevant to the
                    Saint Francis of Assisi student community. This ensures
                    timely communication and keeps students informed about
                    campus matters.
                  </li>
                  <li>
                    Students are given opportunities to keep up with the
                    announcements, the bulletin board helps students to become
                    familiar with school matters.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Respect and Inclusivity:</p>

                <ul style="list-style: square">
                  <li>
                    Treat fellow students with respect, fostering an inclusive
                    and welcoming environment.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Positive Interaction:</p>

                <ul style="list-style: square">
                  <li>
                    Encourage positive and constructive discussions, avoiding
                    any form of harassment or negativity.
                  </li>
                  <li>
                    Committed to creating a safe space where everyone feels
                    comfortable to be themselves, Be mindful with words and
                    actions to ensure that it can't cause harm or suffering to
                    others.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Authenticity:</p>

                <ul style="list-style: square">
                  <li>
                    Provide accurate information and maintain transparency in
                    your interactions.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Appropriate Content:</p>

                <ul style="list-style: square">
                  <li>
                    Refrain from posting inappropriate or offensive content;
                    maintain a respectful tone.
                  </li>
                  <li>
                    It is prohibited to disseminate false information, make sure
                    your content is accurate and trustworthy. Content that
                    promotes discrimination, hate speech, harassment, or
                    inappropriate posts will not be tolerated and strictly
                    prohibited.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Privacy:</p>

                <ul style="list-style: square">
                  <li>
                    Respect the privacy of others and avoid sharing sensitive
                    personal information without consent.
                  </li>
                  <li>
                    Keep information private in the community. Do not share or
                    take photos of private messages or conversations without the
                    consent of all parties involved.
                  </li>
                  <li>
                    Protect your personal data and do not share or request
                    personal information.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Responsibility:</p>

                <ul style="list-style: square">
                  <li>
                    Take responsibility for your posts and interactions. Ensure
                    that your contributions positively contribute to the
                    community atmosphere. The admin reserves the right to delete
                    any content or suspend accounts that contravene policy on
                    anti-harassment.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Collaboration:</p>

                <ul style="list-style: square">
                  <li>
                    Encourage collaboration and knowledge-sharing. Help each
                    other succeed academically and personally.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Digital Etiquette:</p>

                <ul style="list-style: square">
                  <li>
                    Practice good digital etiquette when communicating. Use
                    clear and respectful language in all interactions. Keep in
                    mind that everybody is entitled to their own opinions, and
                    contradictions ought to be dealt with respect.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Moderation:</p>

                <ul style="list-style: square">
                  <li>
                    Report any content that violates community guidelines. Our
                    moderators will address issues promptly to maintain a safe
                    and productive space.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Anti-Harassment:</p>

                <ul style="list-style: square">
                  <li>
                    MyCampusMate has a zero-tolerance policy for harassment. Any
                    form of bullying, discrimination, or intimidation is
                    strictly prohibited.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Responsible Use of Features:</p>

                <ul style="list-style: square">
                  <li>
                    Utilize platform features responsibly. Misusing messaging,
                    posting, or other features to harass or harm others will
                    result in appropriate action.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Compliance with Local Laws:</p>

                <ul style="list-style: square">
                  <li>
                    Users must adhere to local laws and regulations in their
                    online activities. Any illegal activities will not be
                    tolerated.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Feedback and Reporting:</p>

                <ul style="list-style: square">
                  <li>
                    Encourage constructive feedback to improve the platform.
                    Report any violations promptly, and our moderation team will
                    address issues swiftly. Students are encouraged to give
                    their feedback from their experience to know the improvement
                    that needs to be done and report when they encounter any
                    issue that may hurt other users.
                  </li>
                </ul>

                <p class="my-3 fw-bold">Adherence to Terms of Service:</p>

                <ul style="list-style: square">
                  <li>
                    All users must adhere to the terms of service outlined by
                    MyCampusMate. Failure to comply may result in the account
                    being subjected to suspension or other actions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StudentHeader from "@/components/student-header.vue";
</script>
