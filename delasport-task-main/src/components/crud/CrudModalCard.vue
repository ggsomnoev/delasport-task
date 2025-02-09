<script setup lang="ts">
import CloseIcon from 'vue-material-design-icons/Close.vue';

type Props = {
  title?: string,
  closeLabel?: string
  submitLabel?: string
  hideClose?: boolean
  hideSubmit?: boolean
  validForm?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeLabel: 'Close',
  submitLabel: 'Submit',
  hideClose: false,
  hideSubmit: false,
  validForm: false,
})

const emit = defineEmits(['update:close', 'update:submit'])

function onClose() {
  emit('update:close')
}
function onSubmit() {
  emit('update:submit')
}

</script>

<template>
  <div class="z-card">
    <div class="z-card__header">
      <slot name="header">
        <h2 v-if="props.title">{{props.title}}</h2>
      </slot>
      <CloseIcon class="z-card__close" @click="onClose()"></CloseIcon>
    </div>

    <div class="z-card__body">
      <slot />
    </div>

    <div class="z-card__actions">
      <slot name="actions">
        <button v-if="!props.hideClose" @click="onClose()" class="z-btn">{{ props.closeLabel }}</button>
        <button v-if="!props.hideSubmit" class="z-btn z-btn--secondary" @click="onSubmit()" :disabled="!props.validForm">{{ props.submitLabel }}</button>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$card-padding-horizontal: 12px;
$card-padding-vertical: 8px;

button {
  & + button {
    margin-left: 12px;
  }
}

.z-card {
  background-color: #fff;
  border-radius: 8px;
  width: 600px;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__close {
    margin-left: auto;
    line-height: 0;
    cursor: pointer;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $card-padding-vertical $card-padding-horizontal;
    flex-grow: 0;
  }

  &__body {
    padding: $card-padding-vertical $card-padding-horizontal;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    overflow-y: auto;
    flex-grow: 1;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: $card-padding-vertical $card-padding-horizontal;
    flex-grow: 0;
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
