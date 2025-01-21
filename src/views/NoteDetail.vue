<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">Détails de la Note</h1>
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <label for="noteContent" class="block text-gray-700 mb-2">Contenu de la Note :</label>
        <textarea 
          id="noteContent" 
          v-model="noteContent" 
          class="w-full border rounded-lg p-2"
        ></textarea>
        <div class="flex justify-between mt-4">
          <button 
            @click="saveNote" 
            class="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Sauvegarder
          </button>
          <button 
            @click="goBack" 
            class="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        noteContent: '',
        notes: JSON.parse(localStorage.getItem('notes')) || [],
      };
    },
    created() {
      const note = this.notes.find(note => note.id === Number(this.id));
      if (note) {
        this.noteContent = note.content;
      }
    },
    methods: {
      saveNote() {
        const note = this.notes.find(note => note.id === Number(this.id));
        if (note) {
          note.content = this.noteContent.trim();
          localStorage.setItem('notes', JSON.stringify(this.notes));
          this.goBack();
        }
      },
      goBack() {
        this.$router.push({ name: 'Home' });
      },
    },
  };
  </script>
  