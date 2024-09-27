<template>
  <div class="col-12 col-lg-6 col-xl-4 mb-4">
    <div class="card card-border-primary">
      <div class="card-header text-bg-success d-flex justify-content-between align-items-center">
        <span
          v-if="!editingTitle"
          class="h5 my-0"
          @click="!card.isArchived ? (editingTitle = true) : null"
        >
          {{ card.title }}
        </span>
        <input v-else class="form-control" type="text" v-model="editedTitle" />
        <div>
          <span v-if="!card.isArchived">
            <div v-if="editingTitle" class="d-flex">
              <button class="btn btn-sm text-white" title="Save" @click="saveCardTitle">
                Save
              </button>
              <button class="btn btn-sm text-white" title="Edit" @click="editingTitle = false">
                Cancel
              </button>
            </div>
          </span>

          <button v-if="!card.isArchived" class="btn btn-sm text-white" @click="archiveCard(card)">
            Archive
          </button>
          <button v-else class="btn btn-sm text-white" @click="restoreCard(card)">Restore</button>
          <button title="Delete" class="btn btn-sm text-white me-2" @click="deleteCard(card)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>

      <div class="card-body">
        <ul class="list-group list-group-flush">
          <task-card-item
            v-for="item in card.items"
            :key="item.id"
            :item="item"
            @edit-item="editItem(card, item)"
            @save-item="saveItem(item)"
            @cancel-edit="cancelEdit(card, item)"
            @delete-item="deleteItem(card, item)"
          ></task-card-item>
          <li class="list-group-item" v-if="!card.isArchived">
            <button
              v-if="!card.items.some((item) => item.editing)"
              class="btn btn-sm px-0"
              @click="$emit('add-new-item')"
            >
              <i class="bi bi-plus-circle"></i>
              Add Item
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TaskCardItem from './TaskCardItem.vue'
import { useTaskStore } from '@/stores/task'

export default defineComponent({
  name: 'TaskCard',
  components: {
    TaskCardItem
  },
  /**
   * Setup function to initialize store and handle card operations.
   *
   * @return {object} Object containing card operation functions
   */
  setup() {
    const store = useTaskStore()
    const deleteCard = (card) => {
      store.deleteCard(card)
    }

    const archiveCard = (card) => {
      store.archiveCard(card)
    }
    const restoreCard = (card) => {
      store.restoreCard(card)
    }

    return {
      deleteCard,
      archiveCard,
      restoreCard
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editingTitle: false,
      editedTitle: this.card.title
    }
  },
  methods: {
    /**
     * Edit an item in the card's items array.
     *
     * @param {Object} card - The card object to edit the item in.
     * @param {Object} item - The item to be edited.
     * @return {void}
     */
    editItem(card, item) {
      card.items.forEach((i) => {
        if (i.id === item.id) {
          i.editing = true
          i.editedText = i.text
        } else {
          i.editing = false
        }
      })
      this.$emit('edit-item', item)
    },
    /**
     * Updates the item properties and saves it to Firebase.
     *
     * @param {Object} item - the item to be saved
     * @return {void}
     */
    saveItem(item) {
      item.text = item.editedText
      item.isNewItem = false
      item.editing = false

      this.saveToFirebase()
    },
    /**
     * Cancels the edit for a card item.
     *
     * @param {Object} card - the card containing the item
     * @param {Object} item - the item to cancel the edit for
     * @return {void}
     */
    cancelEdit(card, item) {
      if (item.isNewItem) {
        const index = card.items.findIndex((i) => i.id === item.id)
        card.items.splice(index, 1)
      }
      item.editing = false
    },
    /**
     * Deletes the specified item from the card.
     *
     * @param {Object} card - the card object
     * @param {Object} item - the item to be deleted
     * @return {void}
     */
    deleteItem(card, item) {
      const index = card.items.findIndex((i) => i.id === item.id)
      card.items.splice(index, 1)

      // Call saveToFirebase here
      this.saveToFirebase()
    },
    /**
     * Updates the card title and saves it to Firebase.
     *
     * @return {void}
     */
    saveCardTitle() {
      // eslint-disable-next-line vue/no-mutating-props
      this.card.title = this.editedTitle
      this.editingTitle = false

      // Call saveToFirebase here
      this.saveToFirebase()
    },
    /**
     * Save data to Firebase using the store's saveToFirebase method.
     */
    saveToFirebase() {
      // Access the store and call the saveToFirebase method
      const store = useTaskStore()
      store.saveToFirebase()
    }
  }
})
</script>
