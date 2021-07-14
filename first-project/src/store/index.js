import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        paymentsList: [],
        category: [],
        data: "",
    },
    mutations: {
        setPaymentsListData(state, payload) {
            state.paymentsList = payload;
        },
        addDataToPaymentList(state, payload) {
            state.paymentsList.push(payload);
        },
        addCategory(state, paylod) {
            state.category = paylod;
        },
        // editPaymentList(state, payload){
        //     Vue.set(state.paymentsList, 0, payload)
        // }
    },
    getters: {
        getPaymentList: (state) => state.paymentsList,
        getFullPaymentValue: (state) => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
        },
        getCategoryFull: (state) => {
            return state.paymentsList.map((i) => i.category);
        },
        getCategoryList: (state) => {
            return state.category;
        },
    },
    // commit - вызов мутации
    // dispatch - вызов actions
    //
    actions: {
        someAction({ commit }, res) {
            commit("setPaymentsListData", res);
        },
        addData({ commit }, payload) {
            console.log(commit, payload);
        },
        fetchCategoryList({ commit }) {
            return new Promise((resolve) => {
                resolve([
                    "Food",
                    "Transport",
                    "Education",
                    "Internet",
                    "GB",
                    "Life",
                    "Sport",
                ]);
            }).then((res) => commit("addCategory", res));
        },
        fetchData({ dispatch }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = [];
                    for (let i = 1; i < 5; i++) {
                        items.push({
                            date: "01.07.2021",
                            category: "Food",
                            value: i,
                            id: i,
                        });
                    }
                    resolve(items);
                }, 2000);
            }).then((res) => dispatch("someAction", res));
        },
    },
});