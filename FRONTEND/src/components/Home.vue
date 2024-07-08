<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-white text-center">Movie Ratings</h1>

    <!-- Botón para agregar nueva película -->
    <div class="text-center mb-4">
      <router-link to="/new-movie">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Nueva Película
        </button>
      </router-link>
    </div>

    <!-- Select para filtrar por género -->
    <div class="mb-4 text-center">
      <label for="genre-filter" class="text-white">Filtrar por género: </label>
      <select id="genre-filter" v-model="selectedGenre" class="p-2 rounded">
        <option value="">Todos</option>
        <option value="Drama">Drama</option>
        <option value="Música">Música</option>
        <option value="Biografía">Biografía</option>
        <option value="Comedia dramática">Comedia dramática</option>
        <option value="Aventura">Aventura</option>
        <option value="Familiar">Familiar</option>
        <option value="Acción">Acción</option>
        <option value="Animación">Animación</option>
        <option value="Terror">Terror</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="movie in filteredMovies" :key="movie.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img 
          :src="movie.image" 
          :alt="movie.name" 
          class="w-full h-64 object-cover object-center transition-transform transform hover:scale-95"
          @mouseover="zoomOut"
          @mouseleave="zoomIn"
        >
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ movie.name }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ movie.description }}</p>
          <div class="flex items-center mb-2">
            <span class="text-yellow-500 flex">
              <template v-for="star in 5">
                <svg v-if="star <= movie.rating" class="h-5 w-5 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="10 0 13 7 20 7 15 12 17 20 10 15 3 20 5 12 0 7 7 7 10 0" /></svg>
                <svg v-else class="h-5 w-5 fill-current text-gray-300 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="10 0 13 7 20 7 15 12 17 20 10 15 3 20 5 12 0 7 7 7 10 0" /></svg>
              </template>
            </span>
            <span class="ml-2 text-gray-600">{{ movie.rating }}/5</span>
          </div>
          <div class="flex flex-wrap">
            <span v-for="genre in movie.genres" :key="genre" class="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-600">{{ genre }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Componente NewMovie -->
    <div v-if="showNewMovie" class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4 text-white text-center">Agregar Nueva Película</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-white">Nombre</label>
          <input v-model="newMovie.name" type="text" id="name" class="p-2 rounded w-full">
        </div>
        <div class="mb-4">
          <label for="description" class="block text-white">Descripción</label>
          <textarea v-model="newMovie.description" id="description" class="p-2 rounded w-full"></textarea>
        </div>
        <div class="mb-4">
          <label for="genres" class="block text-white">Géneros</label>
          <input v-model="newMovie.genres" type="text" id="genres" class="p-2 rounded w-full">
        </div>
        <div class="mb-4">
          <label for="rating" class="block text-white">Calificación</label>
          <input v-model="newMovie.rating" type="number" step="0.1" id="rating" class="p-2 rounded w-full">
        </div>
        <div class="mb-4">
          <label for="image" class="block text-white">URL de la Imagen</label>
          <input v-model="newMovie.image" type="text" id="image" class="p-2 rounded w-full">
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar Película</button>
      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      movies: [],
      selectedGenre: '',
      showNewMovie: false,
      newMovie: {
        name: '',
        description: '',
        genres: '',
        rating: 0,
        image: ''
      }
    };
  },
  computed: {
    filteredMovies() {
      if (this.selectedGenre) {
        return this.movies.filter(movie => movie.genres.includes(this.selectedGenre));
      }
      return this.movies;
    }
  },
  methods: {
    zoomOut(event) {
      event.target.style.transform = 'scale(0.95)';
    },
    zoomIn(event) {
      event.target.style.transform = 'scale(1)';
    },
    submitForm() {
      axios.post('http://127.0.0.1:8000/api/movies/', this.newMovie)
        .then(response => {
          console.log('Película agregada:', response.data);
          this.movies.push(response.data);
          this.resetForm();
          this.showNewMovie = false;
        })
        .catch(error => {
          console.error('Error al agregar la película:', error);
        });
    },
    resetForm() {
      this.newMovie = {
        name: '',
        description: '',
        genres: '',
        rating: 0,
        image: ''
      };
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/movies/')
      .then(response => {
        this.movies = response.data;
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
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

#genre-filter {
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
}

.bg-white {
  background-color: rgba(255, 255, 255, 0.9);
}

.text-gray-600 {
  color: #000000;
}

.text-white {
  color: #ffffff;
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
