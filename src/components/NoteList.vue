<template>
    <div class="space-y-4">
      <!-- Message si aucune note -->
      <div 
        v-if="!notes.length" 
        class="text-center p-8 bg-white rounded-xl shadow-sm"
      >
        <p class="text-gray-500">
          Aucune note pour le moment. Commencez par en créer une !
        </p>
      </div>
  
      <!-- Liste des notes avec animation -->
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="space-y-4"
      >
        <NoteItem 
          v-for="note in sortedNotes" 
          :key="note.id" 
          :note="note"
          :is-selected="selectedNoteId === note.id"
          @click="selectNote(note.id)"
          @delete="handleDelete(note.id)" 
          @edit="handleEdit(note.id, $event)"
          @view="handleView(note.id)"
        />
      </TransitionGroup>
  
      <!-- Pagination si nécessaire -->
      <div 
        v-if="notes.length > itemsPerPage" 
        class="flex justify-center space-x-2 mt-6"
      >
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 rounded-md transition-colors',
            currentPage === page 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import NoteItem from "./NoteItem.vue";
  
  export default {
    name: "NoteList",
    components: { NoteItem },
    
    props: {
      notes: {
        type: Array,
        required: true,
        default: () => []
      },
      itemsPerPage: {
        type: Number,
        default: 10
      }
    },
  
    emits: ['delete', 'edit', 'view', 'select'],
  
    setup(props, { emit }) {
      const currentPage = ref(1);
      const selectedNoteId = ref(null);
  
      // Tri des notes par date de création/modification
      const sortedNotes = computed(() => {
        return [...props.notes].sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt);
          const dateB = new Date(b.updatedAt || b.createdAt);
          return dateB - dateA;
        });
      });
  
      // Pagination
      const totalPages = computed(() => 
        Math.ceil(props.notes.length / props.itemsPerPage)
      );
  
      const paginatedNotes = computed(() => {
        const start = (currentPage.value - 1) * props.itemsPerPage;
        const end = start + props.itemsPerPage;
        return sortedNotes.value.slice(start, end);
      });
  
      // Gestionnaires d'événements
      const handleDelete = (noteId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
          emit('delete', noteId);
          if (selectedNoteId.value === noteId) {
            selectedNoteId.value = null;
          }
        }
      };
  
      const handleEdit = (noteId, content) => {
        emit('edit', noteId, content);
      };
  
      const handleView = (noteId) => {
        emit('view', noteId);
      };
  
      const selectNote = (noteId) => {
        selectedNoteId.value = selectedNoteId.value === noteId ? null : noteId;
        emit('select', selectedNoteId.value);
      };
  
      return {
        currentPage,
        selectedNoteId,
        sortedNotes,
        totalPages,
        paginatedNotes,
        handleDelete,
        handleEdit,
        handleView,
        selectNote
      };
    }
  };
  </script>
  
  <style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .list-move {
    transition: transform 0.5s;
  }
  </style>