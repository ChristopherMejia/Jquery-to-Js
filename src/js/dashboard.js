(async function load(){
    //await
    async function getData(url){
      const response = await fetch(url)
      const data = await response.json()
      return data;
    }

    const $form = document.getElementById('form');
    $form.addEventListener('submit',(event) =>{
      event.preventDefault(); //does not load the page web with form.
    })

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

    //fuction to create the template html 
    createTemplate = (htmlString) => {
      const html = document.implementation.createHTMLDocument(); //Create a html document in memory
      html.body.innerHTML = htmlString;
      return html.body.children[0]
    }

    //function to add event to each element movie
    addEventClick = ($element) =>{
      $element.addEventListener('click', () => {
        alert('click')
      })
    }
    //Selector from html index.html
    const $actionContainer = document.querySelector('#action');
    const $dramaContainer = document.getElementById('drama');
    const $animationContainer = document.getElementById('animation');

    //work with each data inside template html
    renderMovieList = (list, $container) => {
      //actionList.data.movies
      $container.children[0].remove(); //remove the .gif
      list.data.movies.forEach((movie) =>{
        const HTMLstring = videoItemTemplate(movie);
        const movieElement = createTemplate(HTMLstring)
        $container.append(movieElement)
        addEventClick(movieElement)//selector each movie
      })
      
    }

    renderMovieList(actionList, $actionContainer)
    renderMovieList(dramaList, $dramaContainer )
    renderMovieList(animationList, $animationContainer )

      //const $home = $('.modal');
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');
    
    const $featuringContainer = document.getElementById('featuring');
    const $home = document.getElementById('home');
    
    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

  })()

  