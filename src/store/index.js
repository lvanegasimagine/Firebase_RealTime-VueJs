import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
  },
  mutations: {
    cargar(state, payload){
        state.tareas = payload;
    },
    set(state, payloadTarea){
      state.tareas.push(payloadTarea);
    },
    eliminar(state, payloadId){
      // Filtra todo el arreglo que sea de diferente al id que se mando
      state.tareas = state.tareas.filter(item => item.id !== payloadId);
    },
    tarea(state, payloadId){
      if(!state.tareas.find(item => item.id === payloadId)){
        router.push('/');
        return ;
      }
      else{
        // Busca el elemento
        state.tarea = state.tareas.find(item => item.id === payloadId);
      }
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      router.push('/');
    }
  },
  actions: {
    async cargarTareas({commit}){
      try {
        const res = await fetch('https://crud-vuejs-4bd50-default-rtdb.firebaseio.com/tareas.json');
        const dataDB = await res.json();
        const arrayTareas = [];

        for(let id in dataDB){
          arrayTareas.push(dataDB[id]);
        }
        commit('cargar', arrayTareas);
      } catch (error) {

      }
    },
    async setTareas({commit}, tarea){
      try {
        const res = await fetch(`https://crud-vuejs-4bd50-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        });

        const dataDB = await res.json();
        console.log(dataDB);
      } catch (error) {
        console.error(error);
      }
      commit('set', tarea);
    },
    async deleteTareas({commit}, id){
      await fetch(`https://crud-vuejs-4bd50-default-rtdb.firebaseio.com/tareas/${id}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
      });
      commit('eliminar', id);
    },
    setTarea({commit}, id){
      commit('tarea', id);
    },
    async updateTarea({commit}, tarea){
      try {
        const res = await fetch(`https://crud-vuejs-4bd50-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        });
        const dataDB = await res.json();
        commit('update', dataDB)

      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
