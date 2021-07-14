<template>
  <div class="payment-form">
    <input placeholder="Amout" type="number" v-model.number="value" />
    <!-- <input placeholder="Category" type="text" v-model.trim="category" /> -->
    <select v-model="category">
      <option v-for="(item, idx) in categories" :value="item" :key="idx">
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
      category: "Food",
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
      console.log(data);
      if (this.routeName === "AddPaymentFromLink") {
        this.$store.commit("addDataToPaymentList", data);
        this.$router.push({
          name: "dashboard",
        });
      }
      this.$emit("addNewPayment", data);
    },
  },
  computed: {
    categories() {
      if (this.categoryList?.length) {
        return this.categoryList;
      }
      return this.$store.getters.getCategoryList;
    },
    routeName() {
      return this.$route.name;
    },
  },
  created() {
    const { query, params } = this.$route;
    if (params?.category) {
      this.category = params.category;
    }
    if (query?.value) {
      this.value = Number(query.value);
    }
  },
};
</script>
