<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-white text-center">Agregar Nueva Película</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-white">Nombre</label>
        <input v-model="movie.name" type="text" id="name" class="p-2 rounded w-full">
      </div>
      <div class="mb-4">
        <label for="description" class="block text-white">Descripción</label>
        <textarea v-model="movie.description" id="description" class="p-2 rounded w-full"></textarea>
      </div>
      <div class="mb-4">
        <label for="genres" class="block text-white">Géneros</label>
        <input v-model="movie.genres" type="text" id="genres" class="p-2 rounded w-full">
      </div>
      <div class="mb-4">
        <label for="rating" class="block text-white">Calificación</label>
        <input v-model="movie.rating" type="number" step="0.1" id="rating" class="p-2 rounded w-full">
      </div>
      <div class="mb-4">
        <label for="image" class="block text-white">URL de la Imagen</label>
        <input v-model="movie.image" type="text" id="image" class="p-2 rounded w-full">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar Película</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewMovie',
  data() {
    return {
      movie: {
        name: '',
        description: '',
        genres: '',
        rating: 0,
        image: ''
      }
    };
  },
  methods: {
    submitForm() {
      axios.post('http://127.0.0.1:8000/api/movies/', this.movie)
        .then(response => {
          console.log('Película agregada:', response.data);
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error al agregar la película:', error);
        });
    }
  }
};
</script>

<style scoped>
body {
  background-color: rgb(33, 33, 33);
}

.container {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
}

label {
  color: #ffffff;
}

input, textarea {
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
}

button {
  background-color: rgba(0, 122, 255, 0.9);
}

button:hover {
  background-color: rgba(0, 122, 255, 1);
}
</style>
