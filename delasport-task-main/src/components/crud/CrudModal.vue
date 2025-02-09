<script setup lang="ts">
import {ref} from "vue";

defineExpose({
  openModal,
  closeModal
})

const modal = ref<boolean>(false)

function openModal() {
  modal.value = true
}

function closeModal() {
  modal.value = false
}

</script>

<template>
  <div v-if="modal" class="z-modal__container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$card-padding-horizontal: 12px;
$card-padding-vertical: 8px;

.z-modal {
  &__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    animation: fade-in-fwd 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }
}


@keyframes fade-in-fwd {
  0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>
