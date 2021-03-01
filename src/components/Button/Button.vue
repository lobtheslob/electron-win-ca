<template>

  <button @click="onClick" class="Button">
    <slot>Button</slot>
  </button>
</template>

<script>

export default {
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>
.Button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  box-shadow: 5px 10px #888888;
}
</style>