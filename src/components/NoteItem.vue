<template>
    <div class="flex items-center justify-between bg-white shadow-md rounded-lg p-4">
      <div class="flex-grow">
        <span v-if="!isEditing" class="text-gray-800">{{ note.content }}</span>
        <input 
          v-if="isEditing" 
          v-model="updatedContent" 
          class="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div class="flex space-x-2">
        <button 
          @click="isEditing = true" 
          v-if="!isEditing" 
          class="text-blue-500 hover:text-blue-700"
        >
          Modifier
        </button>
        <button 
          @click="saveEdit" 
          v-if="isEditing" 
          class="text-green-500 hover:text-green-700"
        >
          Sauvegarder
        </button>
        <button 
          @click="$emit('delete', note.id)" 
          class="text-red-500 hover:text-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NoteItem",
    props: ["note"],
    data() {
      return {
        isEditing: false,
        updatedContent: this.note.content,
      };
    },
    methods: {
      saveEdit() {
        if (this.updatedContent.trim()) {
          this.isEditing = false;
          this.$emit("edit", this.note.id, this.updatedContent.trim());
        }
      },
    },
  };
  </script>
  