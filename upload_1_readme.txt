URL aplikacije u cloudu: https://personal-task-manager-2be33.web.app/

1. interpolation/one-way binding - Da, src/views/DashboardView.vue, :18, :36, :80, :87
2. two-way binding - Da, src/components/TaskCard.vue, :12, varijabla editedTitle je dvosmjerno povezana s inputom, src/components/TaskCardItem.vue, :5, varijabla item.editedText je dvosmjerno povezana s textareom i objektom card.item koji je prosljeđen iz parent komponente
3. methods - Da, src/components/TaskCard.vue, :114
4. computed properties - Da, src/views/OpentasksView.vue, :44, src/stores/task.js, :34, :44, :48
5. barem jedan scoped style - Da, src/components/AppMenu.vue, :49
6. lifecycle hook - Da, src/views/DashboardView.vue, :121
7. routing - Da, src/routing/index.js
8. (barem) dvije komponente - Da, src/components/AppMenu.vue (komponenta bez stanja), src/components/TaskCard.vue (komponenta sa stanjem), src/components/TaskCardItem.vue (komponenta bez stanja)
9. barem jedna komponenta mora emitirati barem jedan event - Da, src/components/TaskCardItem.vue, :7, :10, :15, :22
10. store, Pinia - Da, src/stores/task.js
11. asinkroni dohvat podataka, Da - src/firebase, :23 - inicijalni dohvat podataka, src/stores/task.js, :15 - spremanje u firebase