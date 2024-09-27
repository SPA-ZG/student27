<!-- eslint-disable vue/no-mutating-props -->
<template>
  <li class="list-group-item">
    <div v-if="item.editing">
      <textarea class="form-control my-2" v-model="item.editedText"></textarea>
      <div>
        <button @click="$emit('save-item', card, item)" class="btn btn-sm btn-secondary me-1">
          Save
        </button>
        <button @click="$emit('cancel-edit', card, item)" class="btn btn-sm btn-secondary me-1">
          Cancel
        </button>
        <button
          v-if="!item.isNewItem"
          @click="$emit('delete-item', item)"
          class="btn btn-sm btn-secondary me-1"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-else @click="$emit('edit-item', item)">
      {{ item.text }}
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaskCardItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
</script>
