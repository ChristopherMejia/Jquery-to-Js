console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@ChristopherMejia"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(Bien, Mal){
    setTimeout(function(){
      Bien(`Todo de Maravilla`)
    }, 3000)
})

const getUser = new Promise(function(Bien, Mal) {
  setTimeout(function(){
    Mal(`Se acabo el tiempo`)
  }, 5000)
  setTimeout(function(){
    Bien(`Todo esta excelente`)
  },4000)
})

// getUser
//   .then(function(message){
//     console.log(`${message}`)
//   })
//   .catch(function(message){
//     console.log(`${message}`)
//   })

Promise.race([
  getUser,
  getUserAll,
])
.then(function(message){
  console.log(`${message}`)
})
.catch(function(message){
  console.log(`${message}`)
})

//JQUERY - REQUEST API
// $.ajax('https://randomuser.me/api/',{
//   method: 'GET',
//   success: function(data){
//     console.log(data)
//   },
//   error: function(error){
//     console.log(error)
//   }
// })

//JS VANILLA - REQUEST API 
fetch('https://randomuser.me/api/')
  .then(function(response){
    //console.log(response)
    return response.json()
  })//result from Pending Promise of response.json
  .then(function(user){
    console.log(user.results[0])
  })
  .catch(function(){
    console.log('algo fallo')
  });


(async function load(){
  //await
  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
  console.log(actionList, dramaList, animationList);

})()