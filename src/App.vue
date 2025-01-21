// App.vue
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- En-tête de l'application -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-indigo-700">
          Mes Notes
        </h1>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Formulaire d'ajout de note -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex items-center space-x-3">
          <input 
            v-model="newNote" 
            @keyup.enter="addNote" 
            placeholder="Écrire une nouvelle note..."
            class="flex-grow px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                   text-gray-700 placeholder-gray-400 transition
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button 
            @click="addNote" 
            :disabled="!newNote.trim()"
            class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg
                   transform transition hover:scale-105 hover:bg-indigo-700
                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ajouter
          </button>
        </div>
      </div>

      <!-- Liste des notes -->
      <NoteList 
        :notes="notes"
        @delete="deleteNote"
        @edit="editNote"
        @select="handleNoteSelect"
      />
    </main>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import NoteList from './components/NoteList.vue';

export default {
  name: 'App',
  components: { NoteList },

  setup() {
    const notes = ref([]);
    const newNote = ref('');
    const selectedNoteId = ref(null);

    // Chargement initial des notes
    onMounted(() => {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        notes.value = JSON.parse(savedNotes);
      }
    });

    // Sauvegarde automatique des notes
    watch(notes, (newNotes) => {
      localStorage.setItem('notes', JSON.stringify(newNotes));
    }, { deep: true });

    // Méthodes
    const addNote = () => {
      if (newNote.value.trim()) {
        const note = {
          id: Date.now(),
          content: newNote.value.trim(),
          createdAt: new Date().toISOString(),
        };
        notes.value.unshift(note);
        newNote.value = '';
      }
    };

    const deleteNote = (noteId) => {
      notes.value = notes.value.filter(note => note.id !== noteId);
      if (selectedNoteId.value === noteId) {
        selectedNoteId.value = null;
      }
    };

    const editNote = (noteId, newContent) => {
      const note = notes.value.find(n => n.id === noteId);
      if (note) {
        note.content = newContent;
        note.updatedAt = new Date().toISOString();
      }
    };

    const handleNoteSelect = (noteId) => {
      selectedNoteId.value = noteId;
    };

    return {
      notes,
      newNote,
      selectedNoteId,
      addNote,
      deleteNote,
      editNote,
      handleNoteSelect
    };
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>


