<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import CrudTable from '@/components/crud/CrudTable.vue'
import api from '@/services/api'

type FormData = {
  Name?: string
  Surname?: string
  Email?: string
  Age?: string
  FavoriteColor?: string
  ContactPreference?: Array<string>
}

let formData = ref<FormData>({
  Name: undefined,
  Surname: undefined,
  Email: undefined,
  Age: undefined,
  FavoriteColor: undefined,
  ContactPreference: []
})

let fieldErrors = ref<Record<string, string | undefined>>({})

const rows = ref<Array<Record<string, any>>>([])

onMounted(async () => {
  try {
    const response = await api.get('/users')

    rows.value = response.data?.users.map((user: any) => ({
      Id: user.id,
      Name: user.name,
      Surname: user.surname,
      Email: user.email,
      Age: user.age,
      FavoriteColor: user.favorite_color,
      ContactPreference: user.contact_preference
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})

const headers = [
  { key: 'Name', value: 'Name' },
  { key: 'Surname', value: 'Surname' },
  { key: 'Email', value: 'Email' },
  { key: 'Age', value: 'Age' },
  { key: 'FavoriteColor', value: 'Favorite color' },
  { key: 'ContactPreference', value: 'Contact preference' },
  { key: 'Actions', value: 'Actions' }
]

const validators = {
  email: (v?: string) => {
    if (!v) {
      return false
    }

    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
  },
  age: (v?: string) => {
    if (!v) {
      return false
    }

    return /^(0|[1-9][0-9]?|1[01][0-9]|120)$/.test(v)
  },
  contactPreference: (v?: Array<string>) => {
    return !!v?.length
  }
}

const validForm = computed(() => {
  const validEmail = validators.email(formData.value.Email)
  const validAge = validators.age(formData.value.Age)
  const validContactPreference = validators.contactPreference(formData.value.ContactPreference)

  return validEmail && validAge && validContactPreference
})
function validateField(
  fieldName: keyof typeof formData.value,
  rule: (input: any) => boolean,
  errorMessage: string = 'field is invalid'
) {
  const valid: boolean = rule(formData.value[fieldName])

  if (!valid) {
    fieldErrors.value[fieldName] = errorMessage
  } else {
    delete fieldErrors.value[fieldName]
  }
}

async function create() {
  try {
    const response = await api.post('/users', formData.value)

    if (response.data?.new_user) {
      const newUser = {
        Id: response.data.new_user.id,
        Name: response.data.new_user.name,
        Surname: response.data.new_user.surname,
        Email: response.data.new_user.email,
        Age: response.data.new_user.age,
        FavoriteColor: response.data.new_user.favorite_color,
        ContactPreference: response.data.new_user.contact_preference
      }

      rows.value.push(newUser)
    }

    resetForm()
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

async function update(index: number) {
  try {
    const userId = rows.value[index].Id

    const response = await api.put(`/users/${userId}`, formData.value)

    if (response.data?.updated_user) {
      rows.value[index] = {
        Id: response.data.updated_user.id,
        Name: response.data.updated_user.name,
        Surname: response.data.updated_user.surname,
        Email: response.data.updated_user.email,
        Age: response.data.updated_user.age,
        FavoriteColor: response.data.updated_user.favorite_color,
        ContactPreference: response.data.updated_user.contact_preference
      }
    }
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

function preview(index: number) {
  formData.value = { ...rows.value[index] }
}

function exportJSON() {
  const filename = `users-${new Date().toISOString().substring(0, 10)}.json`
  const jsonStr = JSON.stringify(rows.value)

  let element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

function resetForm() {
  formData.value = Object.assign(
    {},
    {
      Name: undefined,
      Surname: undefined,
      Email: undefined,
      Age: undefined,
      FavoriteColor: undefined,
      ContactPreference: []
    }
  )

  fieldErrors.value = Object.assign({}, {})
}

async function deleteItem(index: number) {
  try {
    const userId = rows.value[index].Id

    await api.delete(`/users/${userId}`)

    rows.value.splice(index, 1)
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
</script>

<template>
  <main>
    <CrudTable
      :headers="headers"
      :rows="rows"
      :valid-form="validForm"
      @update:export="exportJSON()"
      @update:create="create()"
      @update:preview="preview"
      @update:edit="update"
      @update:close-modal="resetForm()"
      @update:remove="deleteItem($event)"
    >
      <div class="z-row">
        <label for="name">Name</label>
        <input v-model.trim="formData.Name" id="name" type="text" class="z-input" />
      </div>
      <div class="z-row">
        <label for="surname">Surname</label>
        <input v-model.trim="formData.Surname" id="surname" type="text" class="z-input" />
      </div>
      <div class="z-row">
        <label for="email">Email<span class="required">*</span></label>
        <input
          v-model.trim="formData.Email"
          id="email"
          type="email"
          class="z-input"
          @input="validateField('Email', validators.email, 'Invalid Email address')"
        />
        <div class="error-msg">{{ fieldErrors?.Email }}</div>
      </div>
      <div class="z-row">
        <label for="age">Age<span class="required">*</span></label>
        <input
          v-model.number="formData.Age"
          id="age"
          type="number"
          class="z-input"
          min="0"
          @input="validateField('Age', validators.age, 'Age must be a number between 0 and 120')"
        />
        <div class="error-msg">{{ fieldErrors?.Age }}</div>
      </div>
      <div class="z-row">
        <label for="favorite_color">Favorite color</label>
        <select id="favorite_color" v-model="formData.FavoriteColor" class="z-input">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
      </div>

      <div>Contact Preference<span class="required">*</span></div>
      <div class="horizontal-row">
        <input
          v-model="formData.ContactPreference"
          type="checkbox"
          value="email"
          id="checkbox_email"
          @change="
            validateField(
              'ContactPreference',
              validators.contactPreference,
              'Select at least 1 option'
            )
          "
        />
        <label for="checkbox_email">email</label>
      </div>
      <div class="horizontal-row">
        <input
          v-model="formData.ContactPreference"
          type="checkbox"
          value="phone_call"
          id="checkbox_phone_call"
          @change="
            validateField(
              'ContactPreference',
              validators.contactPreference,
              'Select at least 1 option'
            )
          "
        />
        <label for="checkbox_phone_call">phone_call</label>
      </div>
      <div class="horizontal-row">
        <input
          v-model="formData.ContactPreference"
          type="checkbox"
          value="sms"
          id="checkbox_sms"
          @change="
            validateField(
              'ContactPreference',
              validators.contactPreference,
              'Select at least 1 option'
            )
          "
        />
        <label for="checkbox_sms">sms</label>
      </div>
      <div class="error-msg">{{ fieldErrors?.ContactPreference }}</div>

      <template #exportModal>
        <code>
          <pre>{{ JSON.parse(JSON.stringify({ ...rows })) }}</pre>
        </code>
      </template>
    </CrudTable>
  </main>
</template>

<style lang="scss" scoped>
.error-msg {
  color: red;
}

.z-row {
  margin-bottom: 8px;

  > label {
    display: block;
  }
}

.horizontal-row {
  display: flex;
  align-items: center;

  input[type='checkbox'] {
    margin-right: 4px;
  }
}

.required {
  color: red;
}
</style>
