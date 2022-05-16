<template>
  <div id="app" style= "height: 625px">    
    <div id="nav">
        <NavBar :token="token" :rol="rol"/>
    </div>
    <router-view :token="token" :rol="rol"/>
  </div>
</template>

<script>
import NavBar from './views/NavBar.vue'
import axios from 'axios'
export default ({
  components: {
    NavBar
  },
  data() {
    return {
      errors: [],
      token : [],
      rol : ''
    }
  },
  async created() {
      let token = localStorage.getItem('token')
      this.rol = localStorage.getItem('rol')
      if (token != null) {
        try {
          this.token = token
          let res = await axios.get('user?token='+this.token)
          this.token = res.data.data
          this.rol = res.data.rol
          }
          catch (error) {
            // console.log("errior")
            this.errors = (error.response.data.errors ? error.response.data.errors :{})               
          }      
      }
    }

})
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #eceff1;
}

#nav a.router-link-exact-active {
  color: #dce3e4;
}

#nav a:hover {
  color: #0e0f0f;
}

</style>
