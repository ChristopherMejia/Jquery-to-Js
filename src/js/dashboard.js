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
    
    //Function to sent the item
    videoItemTemplate = (movie) => {
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                  <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                  ${movie.title}
                </h4>
            </div>`
        )
    }

    const $actionContainer = document.querySelector('#action');
    
    //work with each data inside template html
    actionList.data.movies.forEach((movie) =>{
        const HTMLstring = videoItemTemplate(movie);
        const html = document.implementation.createHTMLDocument(); //Create a html document in memory
        html.body.innerHTML = HTMLstring;
        $actionContainer.append(html.body.children[0])
        console.log(HTMLstring);
    })

      //const $home = $('.modal');
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');
    
    const $dramaContainer = document.getElementById('drama');
    const $animationContainer = document.getElementById('animation');
    
    const $featuringContainer = document.getElementById('featuring');
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    
    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

  })()

  