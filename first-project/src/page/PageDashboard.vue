<template>
  <div>
    <PaymentsDisplay :items="curElements" />
    <Pagination
      :length="paymentListLength"
      @changePage="onPaginate"
      :count="count"
      :cur="page"
    />
    <button @click="showPaymentsForm">ADD NEW COST +</button>
    <!-- <AddPaymentForm @addNewPayment="addNewPaymentData" :category-list="categoryList"/> -->
    <br />
    <div>Total Sum = {{ getFPV }}</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import Pagination from "../components/Pagination.vue";
export default {
  name: "PageDashboard",
  components: {
    PaymentsDisplay,
    Pagination,
  },
  data() {
    return {
      page: 1,
      count: 10,
      pageName: "",
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
    onPaginate(p) {
      this.page = p;
    },
    goToPage(page) {
      this.$router.push({
        name: page,
        params: {
          id: "123",
        },
      });
    },
    showPaymentsForm() {
      this.$modal.show("add", {
        header: "Add My Cost",
        compName: "AddPaymentForm",
        category: this.categoryList,
      });
    },
    // setPage(){
    //   this.pageName = location.pathname.slice(1)
    // }
  },
  computed: {
    ...mapGetters(["getFullPaymentValue"]),
    getFPV() {
      return this.getFullPaymentValue;
    },
    paymentList() {
      return this.$store.getters.getPaymentList;
    },
    paymentListLength() {
      return this.$store.getters.getPaymentList.length;
    },
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
    curElements() {
      const { count, page } = this;
      return this.paymentList.slice(
        count * (page - 1),
        count * (page - 1) + count
      );
    },
  },
  created() {
    // this.paymentsList = this.fetchData()
    // this.$store.commit('setPaymentsListData', this.fetchData())
    if (!this.fetchListData.length) {
      this.fetchListData();
    }
    this.$store.dispatch("fetchCategoryList");
  },
  mounted() {
    this.page = Number(this.$route.params.page) || 1;
    console.log(this.$route);
  },
};
</script>

<style></style>
