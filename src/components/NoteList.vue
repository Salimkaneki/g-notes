<template>
    <div class="space-y-4">
      <NoteItem 
        v-for="note in notes" 
        :key="note.id" 
        :note="note" 
        @delete="$emit('delete', note.id)" 
        @edit="$emit('edit', note.id, $event)"
      />
    </div>
  </template>
  
  <script>
  import NoteItem from "./NoteItem.vue";
  
  export default {
    name: "NoteList",
    components: { NoteItem },
    props: ["notes"],
  };
  </script>
  