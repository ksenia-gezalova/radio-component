<template>
  <section class="radio-group">
    <div class="radio-group__content" :class="{ column: isColumn }">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "RadioGroup",
  props: {
    value: {
      type: [String, Number, Boolean]
    },
    isColumn: {
      type: Boolean
    }
  },
  methods: {
    changeChecked(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-group {
  &__content {
    display: flex;
    align-items: center;
    & .radio + .radio {
      margin-left: 8px;
    }
    &.column {
      flex-direction: column;
      align-items: flex-start;
      & .radio {
        margin-left: 0;
        margin-bottom: 4px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
