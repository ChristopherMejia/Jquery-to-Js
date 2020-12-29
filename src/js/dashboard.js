(async function load(){
    //await
    async function getData(url){
      const response = await fetch(url)
      const data = await response.json()
      return data;
    }

    const BASE_API = 'https://yts.mx/api/v2/';
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    const $featuringContainer = document.getElementById('featuring');

    featuringTemplate = (movie) => {
      return (
      `
        <div class="featuring">
          <div class="featuring-image">
            <img src="${movie.medium_cover_image}" width="70" height="100" alt="">
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula encontrada</p>
            <p class="featuring-album">${movie.title}</p>
          </div>
        </div>
      `
      )
    };

    ///function to set attributes of element html
    function setAttributes ($element, attributes){
      for (const attribute in attributes){ //add the attribute value inside element html created. 
        $element.setAttribute(attribute, attributes[attribute]);
      }
    }

    $form.addEventListener('submit',async (event) =>{
      event.preventDefault(); //does not load the page web with form.
      $home.classList.add('search-active');
      
      const $loader = document.createElement('img');
      //crate attributes from object 
      setAttributes( $loader, {
        src: 'src/images/loader.gif',
        height: 50,
        width: 50,
      })
      $featuringContainer.append($loader);

      //select form of html 
      const data = new FormData($form);
      const movie = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
      const htmlString = featuringTemplate(movie.data.movies[0]);
      $featuringContainer.innerHTML=htmlString;

    })

    const actionList = await getData(`${BASE_API}list_movies.json?genre=action`)
    const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`)
    const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`)
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
        showModal();
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
    
    
    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    showModal= () => {
      $overlay.classList.add('active');
      $modal.style.animation = 'modalIn .8s forwards';
    }

    $hideModal.addEventListener('click',() =>{
      $overlay.classList.remove('active');
      $modal.style.animation = 'modalOut .8s forwards';
    });


  })()

  