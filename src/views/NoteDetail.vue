<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-10 px-4">
      <div class="w-full max-w-md">
        <!-- En-tête avec navigation -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-4xl font-bold text-indigo-700 tracking-tight">
            Note
          </h1>
          <button 
            @click="goBack" 
            class="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-2"
          >
            ← Retour
          </button>
        </div>
  
        <!-- Card principale -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="space-y-4">
            <!-- Textarea pour le contenu -->
            <div class="space-y-2">
              <label 
                for="noteContent" 
                class="block text-sm font-medium text-gray-700"
              >
                Contenu de la note
              </label>
              <textarea 
                id="noteContent" 
                v-model="noteContent" 
                rows="6"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                       text-gray-700 placeholder-gray-400 transition
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       resize-none"
                placeholder="Écrivez votre note ici..."
              ></textarea>
            </div>
  
            <!-- Métadonnées -->
            <div v-if="noteMetadata" class="text-sm text-gray-500">
              Créée le {{ formatDate(noteMetadata.createdAt) }}
              <span v-if="noteMetadata.updatedAt">
                · Modifiée le {{ formatDate(noteMetadata.updatedAt) }}
              </span>
            </div>
  
            <!-- Boutons d'action -->
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                @click="goBack" 
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg
                       hover:bg-gray-200 transition
                       focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Annuler
              </button>
              <button 
                @click="saveNote" 
                class="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg
                       transform transition hover:scale-105 hover:bg-indigo-700
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
  
    data() {
      return {
        noteContent: '',
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        noteMetadata: null
      };
    },
  
    created() {
      const note = this.notes.find(note => note.id === Number(this.id));
      if (note) {
        this.noteContent = note.content;
        this.noteMetadata = {
          createdAt: note.createdAt,
          updatedAt: note.updatedAt
        };
      } else {
        this.goBack();
      }
    },
  
    methods: {
      saveNote() {
        if (!this.noteContent.trim()) {
          return;
        }
  
        const note = this.notes.find(note => note.id === Number(this.id));
        if (note) {
          note.content = this.noteContent.trim();
          note.updatedAt = new Date().toISOString();
          localStorage.setItem('notes', JSON.stringify(this.notes));
          this.goBack();
        }
      },
  
      goBack() {
        this.$router.push({ name: 'Home' });
      },
  
      formatDate(dateString) {
        if (!dateString) return '';
        const options = { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      }
    }
  };
  </script>


