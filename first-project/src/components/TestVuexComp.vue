<template>
  <div>
    <input v-model="date" />
    <button @click="onSave">Save</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TestVuexComponent",
  data() {
    return {
      date: "",
    };
  },
  methods: {
    ...mapActions(["addData"]),
    onSave() {
      const { date } = this;
      this.addData(date);
    },
  },
};
</script>
