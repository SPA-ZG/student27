import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { tasksRef } from '../firebase.js'
import { set } from 'firebase/database'

export const useTaskStore = defineStore('taskStore', () => {
  const cards = ref([])

  /**
   * Asynchronously saves the tasks to Firebase.
   *
   * @return {Promise<void>} A Promise that resolves when the tasks are saved successfully,
   * and rejects with an error if the save operation fails.
   */
  async function saveToFirebase() {
    try {
      await set(tasksRef, cards.value)
    } catch (error) {
      console.error('Error saving to Firebase:', error)
    }
  }

  /**
   * Set the value of 'cards' to the provided 'newCards' and save to Firebase.
   *
   * @param {any} newCards - The new value for 'cards'
   * @return {void}
   */
  function setCards(newCards) {
    cards.value = newCards
    saveToFirebase()
  }

  const totalItems = computed(() => {
    let count = 0
    if (cards.value) {
      cards.value.forEach((card) => {
        if (card.items) count += card.items.length
      })
    }
    return count
  })

  const totalCategories = computed(() => {
    return cards.value.filter((card) => !card.isArchived).length
  })

  const totalArchivedCategories = computed(() => {
    return cards.value.filter((card) => card.isArchived).length
  })

  /**
   * Adds a new card to the cards array and saves it to Firebase.
   */
  function addCard() {
    if (!cards.value) {
      cards.value = []
    }

    const cardId = cards.value.length + 1

    const newCard = {
      id: cardId,
      isArchived: false,
      items: [{ id: 1, text: 'First item', editing: false, editedText: '', isNewItem: false }],
      title: `Card ${cardId}`
    }

    cards.value.push(newCard)
    saveToFirebase()
  }

  /**
   * Deletes the specified card from the cards array and saves the updated array to Firebase.
   *
   * @param {Object} card - The card object to be deleted
   * @return {void}
   */
  function deleteCard(card) {
    const index = cards.value.findIndex((c) => c.id === card.id)
    if (index !== -1) {
      cards.value.splice(index, 1)
    }
    saveToFirebase()
  }

  /**
   * Archives a card by setting its isArchived property to true.
   *
   * @param {object} card - the card to be archived
   * @return {void}
   */
  function archiveCard(card) {
    const index = cards.value.findIndex((c) => c.id === card.id)
    if (index !== -1) {
      cards.value[index].isArchived = true
    }
    saveToFirebase()
  }
  /**
   * Restores the specified card by setting its 'isArchived' property to false.
   *
   * @param {Object} card - The card object to be restored.
   * @return {void} No return value.
   */
  function restoreCard(card) {
    const index = cards.value.findIndex((c) => c.id === card.id)
    if (index !== -1) {
      cards.value[index].isArchived = false
    }
    saveToFirebase()
  }

  /**
   * Adds a new item to the card.
   *
   * @param {object} card - The card object to which the new item will be added.
   * @return {undefined} This function does not return a value.
   */
  function addNewItem(card) {
    const newItem = {
      id: card.items.length + 1,
      text: '',
      editing: true,
      editedText: '',
      isNewItem: true
    }
    card.items.push(newItem)
  }

  return {
    cards,
    totalItems,
    totalCategories,
    totalArchivedCategories,
    setCards,
    addCard,
    deleteCard,
    archiveCard,
    restoreCard,
    addNewItem,
    saveToFirebase
  }
})
