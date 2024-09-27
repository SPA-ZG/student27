<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <main id="content">
      <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 change-color">Dashboard</h1>
        </div>

        <div class="row">
          <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Items
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalItems }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Number of open categories
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalCategories }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Earnings (Monthly) Card Example -->
          <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                      Number of archived categories
                    </div>
                    <div class="row no-gutters align-items-center">
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{ totalArchivedCategories }}
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 mb-4">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Current active tasks</h6>
              </div>
              <div class="card-body">
                <div v-for="item in cards" :key="item.id" :item="item">
                  <div v-if="totalCategories > 0 && !item.isArchived">
                    <h4 class="small font-weight-bold">
                      {{ item.title }}
                    </h4>
                    <div class="progress mb-4">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        :style="{
                          width: ((item.items.length / totalItems) * 100).toFixed(2) + '%'
                        }"
                      >
                        {{ item.items.length }} tasks
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="totalCategories < 1">No open categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'

export default {
  /**
   * Setup function to initialize store and return necessary data.
   *
   * @return {object} Object containing totalItems, totalCategories, totalArchivedCategories and cards
   */
  setup() {
    const store = useTaskStore()
    const cards = store.cards
    const totalItems = store.totalItems
    const totalCategories = store.totalCategories
    const totalArchivedCategories = store.totalArchivedCategories
    onMounted(() => {
      changeColor()
    })

    const changeColor = () => {
      const elementsToChangeColor = document.querySelectorAll('.change-color')
      elementsToChangeColor.forEach((element) => {
        element.classList.add('change-color-green')
      })
    }
    return { totalItems, totalCategories, totalArchivedCategories, cards }
  }
}
</script>

<style>
.change-color-green {
  color: green;
}
</style>
