<template>
  <div id="app">
    <div :class="[$style.header]">
      <h1>My Personal Cost</h1>
    </div>
    <button :class="[$style.toggle]" @click="toggleElement">
      ADD NEW COST +
    </button>
    <div :class="[$style.wrapper]" v-if="isVisible">
      <AddPaymentForm
        @addNewPayment="addNewPaymentData"
        :category-list="categoryList"
      />
      <br />
      <div>Total Sum = {{ getFPV }}</div>
      <PaymentsDisplay :items="paymentList" />
      <PaymentsDisplay :items="categoryList" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
  },
  data: () => {
    return {
      isVisible: false,
    };
  },
  methods: {
    ...mapMutations(["setPaymentsListData", "addDataToPaymentList"]),
    ...mapActions({
      fetchListData: "fetchData",
    }),
    addNewPaymentData(value) {
      this.addDataToPaymentList(value);
    },
    fetchData() {
      return [
        {
          date: "12.03.2020",
          category: "Car",
          value: 180,
        },
        {
          date: "12.04.2020",
          category: "Internet",
          value: 100,
        },
        {
          date: "28.08.2019",
          category: "Food",
          value: 300,
        },
        {
          date: "11.03.2018",
          category: "Sport",
          value: 1400,
        },
      ];
    },
    toggleElement() {
      this.isVisible = !this.isVisible;
    },
  },
  computed: {
    ...mapGetters(["getFullPaymentValue"]),
    getFPV() {
      return this.getFullPaymentValue;
    },
    paymentList() {
      return this.$store.getters.getPaymentList;
    },
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
  },
  created() {
    // this.paymentsList = this.fetchData();
    // this.$store.commit("setPaymentsListData", this.fetchData());
    if (!this.fetchListData.length) {
      this.fetchListData();
    }
    this.$store.dispatch("fetchCategoryList");
  },
};
</script>

<style lang="sass" scoped module>
.header
  font-size: 20px
.wrapper
  margin-top: 10px
.toggle
  background-color: #5cab9a
  color: white
  border: none
  font-size: 20px
</style>
