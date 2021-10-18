<template>
  <label
    :class="{
      readonly,
    }"
    class="radio"
    :for="uuid"
  >
    <input
      :id="uuid"
      type="radio"
      :value="value"
      v-model="parentModel"
      :class="{
        checked: isChecked,
      }"
      :disabled="readonly"
    />
    <span class="radio__input"></span>
    <div class="radio__label" v-if="$slots.label || label">
      {{ label }}
      <slot name="label" v-if="!isLabel"></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: "Radio",
  data: vm => ({
    uuid: vm.uuIdv4()
  }),
  props: {
    value: {
      type: [String, Number, Boolean]
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean
    }
  },
  computed: {
    isParentGroup() {
      return this.$parent.$options.name === "radio-group";
    },
    isLabel() {
      return !!this.label;
    },
    isChecked() {
      return this.$parent.value === this.value;
    },
    parentModel: {
      get() {
        return this.isChecked
          ? this.isParentGroup
            ? this.$parent.value
            : this.value
          : null;
      },
      set(val) {
        this.$emit("change", val);
        this.isParentGroup
          ? this.$parent.changeChecked(val)
          : this.$emit("input", val);
      }
    }
  },
  methods: {
    uuIdv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  user-select: none;
  &.readonly {
    opacity: 0.6;
    &:hover {
      & input {
        & ~ .radio__input {
          background-color: transparent;
        }
      }
    }
  }
  &:hover {
    & input {
      & ~ .radio__input {
        background-color: transparent;
      }
    }
  }
  & input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    height: 0;
    width: 0;
    &.checked {
      & ~ .radio__input {
        &:before {
          background-color: #3d75e4;
          border-color: #3d75e4;
          z-index: 1;
        }
        &:after {
          content: "";
          position: absolute;
          border-radius: 50%;
          width: 8px;
          height: 8px;
          left: 8px;
          top: 8px;
          box-shadow: 0 2px 2px rgba(19, 57, 134, 0.32);
          background-color: #ffffff;
          z-index: 2;
        }
      }
      & ~ .radio__label {
        opacity: 1;
      }
    }
  }
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    &:before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid transparent;
      border-radius: 50%;
      top: 4px;
      left: 4px;
    }
  }
  &__label {
    color: #04153e;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.72;
    min-height: 24px;
    display: flex;
    align-items: center;
    width: 100%;
  }
}
</style>