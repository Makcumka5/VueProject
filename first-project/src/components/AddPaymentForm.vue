<template>
  <div
    style="display: flex; 
    flex-direction: column; 
    width: 200px; 
    height: 100px; 
    margin-bottom: 10px"
    class="payment-form"
  >
    <input placeholder="Amout" type="number" v-model.number="value" />
    <!-- <input placeholder="Category" type="text" v-model.trim="category" /> -->
    <select v-model="category">
      <option v-for="(item, idx) in categoryList" :value="item" :key="idx">
        {{ item }}
      </option>
    </select>
    <input placeholder="Date" type="text" v-model.trim="date" />
    <button @click="onClick">Save</button>
  </div>
</template>

<script>
export default {
  name: "AddPaymentForm",
  props: ["categoryList"],
  data() {
    return {
      value: 0,
      category: "",
      date: "",
    };
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    onClick() {
      const { value, category } = this;
      const data = {
        date: this.date || this.getCurrentDate(),
        category,
        value,
      };
      //   console.log(data);
      this.$emit("addNewPayment", data);
    },
  },
};
</script>

<style lang="sass" scoped module>
.payment-form
    display: flex
    flex-direction: column
    width: 100px
    height: 20px
</style>
