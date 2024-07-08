<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-white text-center">Movie Ratings</h1>

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
  </div>
</template>

<script>
import axios from 'axios';
import movies from './movies.json';

export default {
  name: 'App',
  data() {
    return {
      movies,
      selectedGenre: ''
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
    enviarPelicula() {
      // Ejemplo de envío de datos con Axios y CSRF token
      axios.post('http://localhost:8000/api/tu-endpoint/', {
        // Datos que deseas enviar en la solicitud POST
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
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
</style>
