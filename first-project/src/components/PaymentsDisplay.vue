<template>
  <!-- <div class="list">
    <div class="displayList">#</div>
    <div class="displayList">date</div>
    <div class="displayList">category</div>
    <div class="displayList">value</div>
  </div> -->

  <div class="payments-list">
    <div class="list">
      <div class="item" v-for="(item, idx) in items" :key="idx">
        {{ idx + 1 }} - {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
};
</script>

<style lang="sass" scoped>

.list
    display: flex
.displayList
    font-size: 20px
    padding: 10px
    width: 90px
</style>
