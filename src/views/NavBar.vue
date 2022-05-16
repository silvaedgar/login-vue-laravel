<template>
    <nav class="navbar navbar-expand-lg navbar-warning navbar-light bg-info fixed-top">
        <a class="navbar-brand">Login JWT Vue</a>
        <button class="navbar-toggler" data-bs-target="#my-nav" data-bs-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="my-nav" class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto active text-white">
                <li class="nav-item">
                    <router-link to="Home" >Inicio</router-link> 
                </li>
            </ul>
            <ul class="ml-4 navbar-nav active" v-if="token.name">
                <li class="nav-item" v-if="rol == 'Admin'">
                    <router-link to="Mantenimiento" >Mantenimiento</router-link> 
                </li>
                <li class="nav-item dropdown ml-4">
                    <router-link to="" id="navbarDropdownModule" data-bs-toggle="dropdown"  
                            aria-haspopup="true" aria-expanded="false">Modulos</router-link>                        
                    <div class="dropdown-menu dropdown-menu-right bg-info" aria-labelledby="navbarDropdownModule">
                        <router-link to="Compras" class="nav-link">Modulo de Compras</router-link> 
                        <router-link to="Ventas" class="nav-link">Modulo de Ventas</router-link> 
                        <router-link to="Almacen" class="nav-link">Modulo de Almacen</router-link> 
                    </div>
                </li>
            </ul>
            <div class="navbar-collapse justify-content-end" v-if="token.name">
                    <ul style="list-style: none">
                        <li class="dropdown ms-4">
                            <router-link to="" id="navbarDropdownProfile" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="material-icons">person</i></router-link>                        
                            <div class="dropdown-menu dropdown-menu-right bg-info" 
                                            aria-labelledby="navbarDropdownProfile">
                                <a href="javascript:void(0)" @click="logout">Logout</a>
                            </div>
                        </li>
                    </ul>
                    <ul style="list-style: none">
                    </ul>
                    <ul style="list-style: none">
                    </ul>
            </div>
            <div class="navbar-collapse justify-content-end text-info" v-else>
                    <ul class="navbar-nav active">
                        <li>
                            <router-link to="login">Login</router-link>
                        </li>
                        <li class="ml-4">
                            <router-link to="Register">Register</router-link>
                        </li>
                    </ul>
                    <ul></ul>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'
export default {
   name: 'NavBar',
   props: ['token','rol'],
   methods: {
       async logout() {
            await axios.get('logout-sanctum?token='+localStorage.getItem('token'))
            localStorage.removeItem('token')
            window.location.href = '/'
       }
   }
 
}
</script>

<style>
body {
    background-color: #00AAAA;    
}

a {
    margin-left: 15px;
    text-decoration: none;
}
</style>