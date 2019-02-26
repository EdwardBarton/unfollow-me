<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="f in user.friends" :key="f.id" md3>
        <v-card d-flex>
          <v-img :src="f.profile_image_url_https" aspect-ratio="1"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ f.name }}</h3>
              <h4>@{{ f.screen_name }}</h4>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn dark color="#00aced" @click="goToProfile(f.screen_name)"
              >Profile</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    user: "user"
  }),
  methods: {
    goToProfile(screenName) {
      window.open(`https://twitter.com/${screenName}`, "_blank");
    }
  }
};
</script>

<style scoped></style>
