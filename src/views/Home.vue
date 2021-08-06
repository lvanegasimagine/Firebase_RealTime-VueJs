<template>
  <div class="mt-5 home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <form @submit.prevent="procesarFormulario">
       <Input :tarea="tarea"/>
  </form>
  <ListaTarea/>
</template>

<script>
import Input from '../components/Input.vue'
import ListaTarea from '../components/ListaTarea.vue'
import { mapActions } from "vuex";
const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    Input,
    ListaTarea
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      },
    }
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarFormulario() {
      if(this.tarea.nombre.trim() === ''){
        console.log('vacio');
        return;
      }
      console.log(this.tarea);

      //generar Id
      this.tarea.id = shortid.generate();
      console.log(this.tarea.id);

      // envian los datos

      this.setTareas(this.tarea);

      //Para borrar Formulario
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
}
</script>
<style scoped>
.home{
  text-align: center;
}
</style>
