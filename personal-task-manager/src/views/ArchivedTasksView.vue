<template>
  <main class="content">
    <div class="container p-0">
      <h1 class="h3 mb-3">Archived Tasks Board</h1>
      <div class="row" v-if="archivedCards.length > 0">
        <div class="col">
          <div class="row">
            <task-card v-for="card in archivedCards" :key="card.id" :card="card"></task-card>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No archived tasks found.</p>
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
   * Setup the component and retrieve archived cards and total items from the store.
   *
   * @return {Object} Object containing archivedCards and totalItems
   */
  setup() {
    const store = useTaskStore()

    const archivedCards = computed(() => {
      return store.cards.filter((card) => card.isArchived)
    })

    const totalItems = store.totalItems

    return {
      archivedCards,
      totalItems
    }
  }
})
</script>
