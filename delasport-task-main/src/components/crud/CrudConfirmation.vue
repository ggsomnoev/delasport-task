<script setup lang="ts">
import {ref} from "vue";
import CrudModalCard from "@/components/crud/CrudModalCard.vue";

type Options = {
  message?: string|undefined,
  title?: string|undefined
}

defineExpose({
  show,
  hide
})

const showDialog = ref<boolean>(false)

const options = ref<Options>({
  message: undefined,
  title: undefined
})

const resolvePromise = ref()

function show (opts: Options = {}) {
  showDialog.value = true
  options.value = Object.assign(opts)

  return new Promise<boolean>((resolve) => {
    resolvePromise.value = resolve
  })
}

function hide () {
  showDialog.value = false
}

function cancel () {
  hide()
  resolvePromise.value(false)
}

function confirm () {
  hide()
  resolvePromise.value(true)
}

</script>

<template>
  <div v-if="showDialog" class="z-modal__container">
    <CrudModalCard :title="options.title">
      <div>{{options.message}}</div>

      <template #actions>
        <button class="z-btn" @click="cancel()">Cancel</button>
        <button class="z-btn z-btn--error" @click="confirm()">Confirm</button>
      </template>
    </CrudModalCard>
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

button {
  outline: 0;

  & + button {
    margin-left: 12px;
    background-color: red;
    color: #fff;
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
