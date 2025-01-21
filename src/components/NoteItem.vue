<template>
    <div
      :class="[
        'bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-200',
        isSelected ? 'ring-2 ring-indigo-500 scale-[1.02]' : 'hover:shadow-lg hover:-translate-y-1'
      ]"
      @click="$emit('select', note.id)"
    >
      <div class="p-4">
        <!-- Contenu de la note -->
        <div class="flex-grow">
          <div v-if="!isEditing" class="prose max-w-none">
            <p class="text-gray-700 whitespace-pre-wrap break-words">{{ note.content }}</p>
            
            <!-- Métadonnées -->
            <div class="mt-2 text-sm text-gray-500">
              {{ formatDate(note.createdAt) }}
              <span v-if="note.updatedAt">
                · Modifié le {{ formatDate(note.updatedAt) }}
              </span>
            </div>
          </div>
  
          <!-- Mode édition -->
          <div v-else class="space-y-3">
            <textarea
              v-model="updatedContent"
              ref="editInput"
              rows="3"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition duration-200 resize-none"
              @keydown.esc="cancelEdit"
              @keydown.ctrl.enter="saveEdit"
            />
            <p class="text-xs text-gray-500">
              Appuyez sur Ctrl+Entrée pour sauvegarder ou Échap pour annuler
            </p>
          </div>
        </div>
  
        <!-- Boutons d'action -->
        <div class="flex items-center justify-end space-x-2 mt-3">
          <!-- Boutons d'édition -->
          <template v-if="!isEditing">
            <button
              @click.stop="startEdit"
              class="px-3 py-1 text-indigo-600 hover:bg-indigo-50 rounded-md
                     transition-colors duration-200 flex items-center gap-1"
            >
              <span class="text-sm">✏️</span>
              <span class="hidden sm:inline">Modifier</span>
            </button>
            <button
              @click.stop="confirmDelete"
              class="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md
                     transition-colors duration-200 flex items-center gap-1"
            >
              <span class="text-sm">🗑️</span>
              <span class="hidden sm:inline">Supprimer</span>
            </button>
          </template>
  
          <!-- Boutons de sauvegarde/annulation -->
          <template v-else>
            <button
              @click.stop="cancelEdit"
              class="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-md
                     transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              @click.stop="saveEdit"
              class="px-4 py-1 bg-indigo-600 text-white rounded-md
                     hover:bg-indigo-700 transition-colors duration-200"
            >
              Sauvegarder
            </button>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, nextTick } from 'vue';
  
  export default {
    name: "NoteItem",
    
    props: {
      note: {
        type: Object,
        required: true
      },
      isSelected: {
        type: Boolean,
        default: false
      }
    },
  
    emits: ['edit', 'delete', 'select'],
  
    setup(props, { emit }) {
      const isEditing = ref(false);
      const updatedContent = ref(props.note.content);
      const editInput = ref(null);
      const originalContent = ref(props.note.content);
  
      const startEdit = async (e) => {
        e.stopPropagation();
        isEditing.value = true;
        originalContent.value = props.note.content;
        updatedContent.value = props.note.content;
        
        // Focus sur le textarea après le rendu
        await nextTick();
        editInput.value?.focus();
      };
  
      const saveEdit = (e) => {
        e.stopPropagation();
        if (updatedContent.value.trim() && updatedContent.value !== originalContent.value) {
          emit('edit', props.note.id, updatedContent.value.trim());
        }
        isEditing.value = false;
      };
  
      const cancelEdit = (e) => {
        e.stopPropagation();
        isEditing.value = false;
        updatedContent.value = props.note.content;
      };
  
      const confirmDelete = (e) => {
        e.stopPropagation();
        if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
          emit('delete', props.note.id);
        }
      };
  
      const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { 
          day: 'numeric', 
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      };
  
      return {
        isEditing,
        updatedContent,
        editInput,
        startEdit,
        saveEdit,
        cancelEdit,
        confirmDelete,
        formatDate
      };
    }
  };
  </script>