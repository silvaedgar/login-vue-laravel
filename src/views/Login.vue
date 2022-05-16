<template>
  
<div class="container w-25 mt-5 rounded shadow bg-light">
   <div class = "bg-info" v-if= "loading"> Espere. Leyendo Datos</div>
    <div class="row">
        <div class="text-center mt-3">
            <h4> Inicio de Sesion</h4>
        </div>
         <form @submit="HandleSubmit">
            <div class="mb-2">
                <label for="email" class="form-label" > Correo Electronico</label>
                <div class="form-group has-feedback">
                    <input type="email" class="form-control" required name="email" v-model="data.email">
                </div>
            </div>
            <div class="mb-2">
                <label for="password" class="form-label"> Password</label>
                <input type="password" class="form-control" name="password" required v-model="data.password">
            </div>
            <div class="d-grid">
                <button type= "submit" class="btn btn-primary">Iniciar Sesion </button>
            </div>
            <div class="row mt-2 my-2 justify-content-start ">
               <div class="col-4"><a class= "" href=""> Registrarme </a> </div>
               <div class="col-8 text-end"> 
                    <a href="" style="font-size: small"> Olvidaste la Clave?. Recuperala </a>
               </div> 
            </div>
        </form>

    </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
   name: 'Login',
   data() {
      return {
         data : { email:"", password:""},
         errors:[],
         loading: false
      }
   },
   methods: {
      async HandleSubmit(e) {
         this.loading = true;
         e.preventDefault()
         try {
            // en el API hay 3 login sanctum(esta en USERCONTROLLER) jwt(AUTHCONTROLLER) y user(EN EL API ROUTE)
            let res = await axios.post('login-sanctum',this.data)
            if (res.data.status == "Ok") {
               localStorage.setItem('token',res.data.token)
               localStorage.setItem('rol',res.data.rol)
               window.location.href = '/'
               // this.$router.push({name : 'Home'})
               // redirecciionar ruta
            } 
            else  {
               alert(res.data.message)            
            } 
            this.errors = []
         } catch (error) {
            this.errors = (error.response.data.errors ? error.response.data.errors :{})
            alert(error.message)
         }
         this.loading = false;         
      }
   }
}
</script>

