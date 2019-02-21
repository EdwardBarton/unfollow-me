<template>
  <v-container fluid fill-height text-xs-center>
    <v-layout column>
      <v-flex xs12>
        <v-layout align-center justify-center row fill-height>
          <div class="home">
            <h3 class="display-2">Unfollow Me</h3>
            <form @submit.prevent="getFriends">
              <v-text-field
                v-model="source"
                prefix="@"
                clearable
                autofocus
                placeholder="yourTwitterHandle"
              ></v-text-field>
              <v-text-field
                v-model="target"
                prefix="@"
                clearable
                placeholder="realDonaldTrump"
              ></v-text-field>
              <v-btn color="#00aced" dark>Go</v-btn>
            </form>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      source: "",
      target: ""
    };
  },
  methods: {
    getFriends() {
      this.$store
        .dispatch("getFriends")
        .then(() => this.$router.push("/friends"));
    }
  }
};
</script>

<style scoped>
.home {
  background: white;
  border-radius: 15px;
  padding: 20px 40px;
}
h3 {
  margin-bottom: 30px;
}
form {
  /* max-width: 500px; */
  border-radius: 10px;
  font: 15px Arial, Helvetica, sans-serif;
  background: white;
  height: 100%;
}
/* form label {
  display: block;
  margin: 0px 0px 3px 0px;
  text-align: left;
}
form input {
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border: 1px solid #000;
  background: #fff;
  box-shadow: 1px 1px 4px #ebebeb;
  -moz-box-shadow: 1px 1px 4px #ebebeb;
  -webkit-box-shadow: 1px 1px 4px #ebebeb;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  padding: 7px;
  outline: none;
  margin-bottom: 15px;
}
form input:focus {
  border: 1px solid #00aced;
} */
</style>
