<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Gestion de Notes</h1>
    <div class="flex items-center w-full max-w-md">
      <input 
        v-model="newNote" 
        @keyup.enter="addNote" 
        placeholder="Écrire une nouvelle note"
        class="flex-grow border rounded-lg p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
      />
      <button 
        @click="addNote" 
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Ajouter
      </button>
    </div>
    <NoteList 
      :notes="notes" 
      @delete="deleteNote" 
      @edit="editNote"
      class="mt-6 w-full max-w-md"
    />
  </div>
</template>

<script>
import NoteList from "./components/NoteList.vue";

export default {
  name: "App",
  components: { NoteList },
  data() {
    return {
      newNote: "",
      notes: JSON.parse(localStorage.getItem("notes")) || [],
    };
  },
  methods: {
    addNote() {
      if (this.newNote.trim()) {
        const newNoteObj = { id: Date.now(), content: this.newNote.trim() };
        this.notes.push(newNoteObj);
        this.newNote = "";
        this.saveNotes();
      }
    },
    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
      this.saveNotes();
    },
    editNote(id, updatedContent) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        note.content = updatedContent;
        this.saveNotes();
      }
    },
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
  },
};
</script>
