<template>
  <div class="container w-25 mt-5 rounded shadow bg-light">
   <div class = "bg-info" v-if= "loading"> Procesando Datos ...</div>
    <div class="row">
      <div class="text-center mt-3">
         <h4> Registro de Usuario</h4>
      </div>
    </div>  
<!-- -----------------------------------------------------------
 FORMULARIO DE ENTRADA DE DATOS PARA INICIO DE SESION
---------------------------------------------------------- -->
    <form @submit="HandleSubmit">
        <div class="mb-1">
            <label for="email" class="form-label"> Nombre Usuario</label>
            <input type="text" class="form-control" name="name" v-model="data.name"
                    placeholder = "Nombre de usuario" required>
            <span class="text-danger" v-if="errors.name"> {{ errors.name[0] }}</span>
        </div>
        <div class="mb-1">
            <label for="email" class="form-label"> Correo Electronico</label>
            <input type="email" class="form-control" name="email" v-model="data.email"
                placeholder = "Correo Electrónico" required>
            <span class="text-danger" style="font-size: 12px;" v-if="errors.email"> {{ errors.email[0] }}</span>

        </div>
        <div class="mb-1">
            <label for="password" class="form-label"> Password</label>
            <input type="password" class="form-control" name="password" v-model="data.password" required>
            <span class="text-danger" style="font-size: 12px;" v-if="errors.password"> {{ errors.password[0] }}</span>

        </div>
        <div class="mb-1">
            <label for="password" class="form-label"> Confirma Password</label>
            <input type="password"  class="form-control" name="password_confirm" required>
        </div>
        <div class="d-grid mt-3 mb-5">
             <button type= "submit" class="btn btn-primary">Registrarme </button>
             <br/>
        </div>
    </form>
   </div>
</template>

<script>
import axios from 'axios'
export default {
   name: 'Register',
   data() {
      return {
         data: { name : '', email: '', password: ''},
         errors:[],
         loading: false
      }
   },
   methods: {
      async HandleSubmit(e) {
         this.loading = true;
         e.preventDefault();
         try {
            await axios.post('users',this.data);
            this.errors = []
            alert("Usuario Registrado")
            window.location.href = '/'
         } catch (error) {
            this.errors = (error.response.data.errors ? error.response.data.errors :{})
         }
         this.loading = false;
      }
   }
}
</script>
