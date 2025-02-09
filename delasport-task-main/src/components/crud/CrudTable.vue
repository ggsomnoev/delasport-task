<script setup lang="ts">
import TableRow from '@/components/crud/TableRow.vue'
import TableCell from '@/components/crud/TableCell.vue'
import CrudModal from '@/components/crud/CrudModal.vue'
import { ref } from 'vue'
import CrudModalCard from '@/components/crud/CrudModalCard.vue'
import TrashCan from 'vue-material-design-icons/TrashCan.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import CrudConfirmation from '@/components/crud/CrudConfirmation.vue'

type TableHeaderCell = {
  key: string
  value: string
}

type Props = {
  headers: Array<TableHeaderCell>
  rows: Array<Record<string, any>>
  validForm: boolean
}

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  rows: () => [],
  validForm: false
})

const emit = defineEmits([
  'update:create',
  'update:close-modal',
  'update:remove',
  'update:preview',
  'update:edit',
  'update:export'
])

const confirmationDialog = ref<InstanceType<typeof CrudConfirmation>>()

const modalComponent = ref<InstanceType<typeof CrudModal>>()

const isCreate = ref<boolean>(true)
const editIndex = ref<number | undefined>(undefined)

function openModal(createModal: boolean) {
  isCreate.value = createModal
  editIndex.value = undefined
  modalComponent?.value?.openModal()
}

function exportJSON() {
  emit('update:export')

  modalComponent?.value?.closeModal()

  // simulate API call
  setTimeout(() => {
    emit('update:close-modal')
  }, 300)
}

function onSubmit() {
  if (typeof editIndex.value !== 'undefined') {
    emit('update:edit', editIndex.value)
  } else {
    emit('update:create')
  }

  modalComponent?.value?.closeModal()

  // simulate API call
  setTimeout(() => {
    emit('update:close-modal')
  }, 300)
}

function onClose() {
  emit('update:close-modal')

  modalComponent?.value?.closeModal()
}

async function remove(index: number) {
  const confirmed = await confirm()

  if (!confirmed) {
    return
  }

  emit('update:remove', index)
}

async function preview(index: number) {
  emit('update:preview', index)
  openModal(true)
  editIndex.value = index
}

async function confirm() {
  let confirmed = false

  await confirmationDialog?.value
    ?.show({
      title: 'Confirm Delete',
      message: 'Please confirm you wish to proceed. The operation cannot be reverted!'
    })
    .then((result: any) => {
      if (result) {
        confirmed = true
      }
    })

  return confirmed
}
</script>

<template>
  <slot name="top">
    <div class="z-table__top">
      <button
        type="button"
        @click="openModal(false)"
        class="z-table__export z-btn z-btn--secondary"
      >
        Export JSON
      </button>
      <button type="button" @click="openModal(true)" class="z-table__create z-btn">Create</button>
    </div>
  </slot>

  <div class="z-table__container">
    <table class="z-table">
      <thead>
        <TableRow class="z-table__header">
          <TableCell v-for="cell in props.headers" :key="`th_${cell.key}`" type="th">{{
            cell.value
          }}</TableCell>
        </TableRow>
      </thead>
      <tbody>
        <template v-if="props.rows.length">
          <TableRow v-for="(row, index) in props.rows" :key="`tr_${index + 1}`">
            <TableCell
              v-for="[k, v] in Object.entries(row).filter(([key]) => key !== 'Id')"
              :key="`td_${index + 1}_${k}`"
            >
              <ul v-if="Array.isArray(v)">
                <li v-for="(cellItem, j) in v" :key="`cell_item_${j}`">{{ cellItem }}</li>
              </ul>
              <template v-else>{{ v || '-' }}</template>
            </TableCell>
            <TableCell>
              <Pencil class="actions--edit" @click="preview(index)"></Pencil>
              <TrashCan class="actions--remove" @click="remove(index)" />
            </TableCell>
          </TableRow>
        </template>
        <TableRow v-else>
          <td :colspan="props.headers.length" class="empty-cell">No data available...</td>
        </TableRow>
      </tbody>
    </table>
  </div>

  <CrudModal ref="modalComponent">
    <CrudModalCard
      v-show="isCreate"
      title="Create"
      @update:submit="onSubmit()"
      @update:close="onClose()"
      :valid-form="validForm"
    >
      <form @submit.prevent="onSubmit()">
        <slot />
      </form>
    </CrudModalCard>

    <CrudModalCard
      v-show="!isCreate"
      title="Export JSON"
      submit-label="Export file"
      @update:submit="exportJSON()"
      @update:close="onClose()"
      :valid-form="true"
    >
      <slot name="exportModal" />
    </CrudModalCard>
  </CrudModal>

  <CrudConfirmation ref="confirmationDialog" />
</template>

<style lang="scss" scoped>
.z-table {
  width: 100%;
  min-width: 550px;
  border-collapse: collapse;
  height: 1px;

  &__container {
    max-width: 100%;
    overflow-x: auto;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 12px;
  }

  &__create {
    margin-left: 12px;
  }

  &__export {
    margin-left: auto;
  }

  &__header {
    background-color: #efefef;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    font-weight: 500;
    white-space: nowrap;
  }

  .empty-cell {
    text-align: center;
    padding: 12px;
  }
}

.actions {
  &--remove {
    color: red;
    cursor: pointer;

    &:hover {
      color: rgba(255, 0, 0, 0.8);
    }
  }

  &--edit {
    color: grey;
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
