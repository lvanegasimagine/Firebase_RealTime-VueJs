<template>
  <input type="text" placeholder="Ingrese Nombre" class="form-control my-2" v-model.trim="tarea.nombre">
        <div class="mt-2">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" v-model="tarea.categorias" value="Javascript">
            <label class="form-check-label" for="inlineCheckbox1">Javascript</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" v-model="tarea.categorias" value="Node.js">
            <label class="form-check-label" for="inlineCheckbox1">Node.js</label>
          </div>
        </div>
        <div class="mt-2">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="urgente" v-model="tarea.estado">
              <label class="form-check-label" for="inlineRadio1">Urgente</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="relax" v-model="tarea.estado">
              <label class="form-check-label" for="inlineRadio2">Relax</label>
            </div>
        </div>
        <div class="mt-2">
          <input class="form-control my-2" type="number" v-model.number="tarea.numero">
        </div>
        <button class="btn btn-primary btn-block" type="submit" :disabled="bloquear">Procesar</button>
</template>

<script>
export default {
    props: {
        tarea: Object
    },
    computed: {
       bloquear() {
            return this.tarea.nombre.trim() === '' ? true: false;
       }
    },
}
</script>