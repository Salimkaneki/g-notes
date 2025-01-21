/* eslint-disable vue/multi-word-component-names */

<template>
    <div class="min-h-screen bg-gray-100 py-10">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">Liste des Notes</h1>
      <div class="flex items-center justify-center">
        <input 
          v-model="newNote" 
          placeholder="Ajouter une note"
          class="border rounded-lg p-2 mr-2"
        />
        <button @click="addNote" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Ajouter</button>
      </div>
      <ul class="mt-6 space-y-4 max-w-xl mx-auto">
        <li v-for="note in notes" :key="note.id" class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <span @click="goToNoteDetail(note.id)" class="cursor-pointer text-blue-600 underline">
            {{ note.content }}
          </span>
          <button @click="deleteNote(note.id)" class="text-red-500">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newNote: '',
        notes: JSON.parse(localStorage.getItem('notes')) || [],
      };
    },
    methods: {
      addNote() {
        if (this.newNote.trim()) {
          const newNote = { id: Date.now(), content: this.newNote.trim() };
          this.notes.push(newNote);
          this.newNote = '';
          this.saveNotes();
        }
      },
      deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
      },
      saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
      },
      goToNoteDetail(id) {
        this.$router.push({ name: 'NoteDetail', params: { id } });
      },
    },
  };
  </script>
  