<script setup lang="ts">

type Props = {
  type?: 'th'|'td'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'td'
})

</script>

<template>
  <th v-if="props.type === 'th'" v-bind="$attrs">
    <slot />
  </th>
  <td v-else v-bind="$attrs">
    <slot />
  </td>
</template>
