<template>
  <main class="content">
    <div class="container p-0">
      <h1 class="h3 mb-3">Open Tasks Board</h1>
      <div class="row">
        <div class="col">
          <div class="row">
            <task-card
              v-for="card in activeCards"
              :key="card.id"
              :card="card"
              @add-new-item="addNewItem(card)"
            ></task-card>
            <div class="col-12 col-md-auto mb-3 d-flex align-items-center">
              <button @click="addCard" class="btn btn-lg btn-dark">
                <i class="bi bi-plus-circle"></i> Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, computed } from 'vue'
import TaskCard from '../components/TaskCard.vue'
import { useTaskStore } from '@/stores/task'

export default defineComponent({
  name: 'OpenTasks',
  components: {
    TaskCard
  },
  /**
   * Set up the component's data and methods for managing tasks.
   *
   * @return {object} An object containing activeCards, totalItems, addCard, and addNewItem
   */
  setup() {
    const store = useTaskStore()

    const activeCards = computed(() => {
      return store.cards ? store.cards.filter((card) => !card.isArchived) : []
    })

    const totalItems = store.totalItems
    const addCard = () => {
      store.addCard()
    }
    const addNewItem = (card) => {
      store.addNewItem(card)
    }

    return {
      activeCards,
      totalItems,
      addCard,
      addNewItem
    }
  }
})
</script>
