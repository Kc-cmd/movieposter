<template>
  <div id="home">
    <!-- <img src="./../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
    <div class="addItem">
            <div class="btndiv">
                <button type="button" v-on:click="showform" class="addbtn"> {{ !addForm ? 'Add Movie' : 'Close'}}</button>
            </div>
            <div class="addForm" v-if="addForm">
                      
                <div   v-if="errors.length > 0" class="error" id="contactUsError">{{errors[0]}}</div>

          <div class="addformitem">
          <input  style="height:30px;text-align:start" v-model="moviename" placeholder="Movie Name"> 
          </div>
            <div class="addformitem">
          <input style="height:30px;text-align:start" v-model="posterurl"  placeholder="Poster Url"> 
                 </div>

      <div class="addformitem btn-form">
          <button  v-on:click="addMovie" type="submit">Add</button>
                 </div>
          
          

            </div>
    </div>

<div class="row">
  <div v-for="item in movieList"  :key="item.imdbID" class="column" style="background-color:#ccc;">
     <img :src="item.Poster">
    <div class="title">{{ item.Title }}</div>
  </div>
  
</div>
  </div>
</template>

<script>
    import {Http} from "../AjaxCall/helper";
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      movieList : null,
      addForm : false,
      moviename : null,
      posterurl : null,
      errors : []
    }
  },

   mounted(){
        this.fetchMoviewList().then(res=>{

            
                this.movieList = res.Search;
        }
            
        );
   },

   methods :{

              fetchMoviewList(){
                    const data =  Http("http://www.omdbapi.com/?s=harry&apikey=e0620bd4");
                    return data ;
                },
                showform : function(event){
                         this.errors = [];
                         this.addForm = !this.addForm;
                },
                addMovie:function(event){
                    this.errors = [];
                    
             if (!this.moviename || this.moviename.trim().length <= 0) {
                this.errors.push("Name required *"); 
                return false;
              }

           if (!this.posterurl) {
               this.errors.push("Url required *");
               return false;
           }

                 if (!this.errors.length) {
                       this.movieList.push({'Poster' : this.posterurl ,'Title' : this.moviename})
                }
        }
   }
}
</script>

<style>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.addItem {
    background-color: darkgrey;
     padding: 0em;
     position: fixed;
     top: 0;
     left: 0;
     z-index: 800;
     width: 100%;
     height: max-content;
     margin-bottom: 20px;
    
}
.btndiv:hover{
      background-color: rgb(117, 167, 117)
}
.addForm {
    display: flex;
    margin-top: 5px;
    flex-direction: column;
}
.addformitem{
    flex: 1;
    margin: 5px;

}
.btndiv {
         position: relative;
          background-color: #90EE90	;
}

.addformitem .btb-form
{
  display: block;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 8px;
  width: 80%;
  max-width: 200px;
  background: #fff; /* fallback color for old browsers */background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s ease-out;
}
.error {
    color: red;
    font-size: 13px;
}
.addbtn{
    border: none;
    border-radius: 25px;
    font-family: sans-serif;
    font-size: 1.2rem;
    line-height: .71429em;
    font-weight: 100;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    height: 30.8px;
    margin: 0.5em;
    align-self: end;
    background-color: #0faa3e;
    padding: 2px 8px 4px 10px;
 

 top: 0;
     right: 0;
     position: absolute;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 20%;
  padding: 10px;
  height : 250px;
  margin-right :0.5em;
  margin-left :0.5em;
  margin-bottom: 1em;
  border: 2px solid gray;
  background-color: #A9A9A9;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.column img {
    height: 200px ;
    width: 200px;
    margin: 5px;
    position: relative;
}
.column .title{
    font-size: 14px;
    padding: 0em;
   white-space: nowrap; 
   overflow: hidden;
   text-overflow: ellipsis; 
  
}
.row {
    overflow: scroll;
    margin-top: 10px;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
/* Style the buttons */
.btn {
  border: none;
  outline: none;
  padding: 12px 16px;
  background-color: #0faa3e;
  cursor: pointer;
}

.btn:hover {
  background-color: #ddd;
}

.btn.active {
  background-color: #666;
  color: white;
}

</style>
