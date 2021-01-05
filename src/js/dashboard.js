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
      // destructurar un objeto
      const {
        data: {
          movies: pelicula
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
      const htmlString = featuringTemplate(pelicula[0]);
      $featuringContainer.innerHTML=htmlString;

    })
    
    //Function to sent the item
    videoItemTemplate = (movie, category) => {
        return (
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
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
        showModal($element);
      })
    }

    //work with each data inside template html
    renderMovieList = (list, $container, category) => {
      //actionList.data.movies
      $container.children[0].remove(); //remove the .gif
      list.forEach((movie) =>{
        const HTMLstring = videoItemTemplate(movie, category);
        const movieElement = createTemplate(HTMLstring);
        $container.append(movieElement);
        const image = movieElement.querySelector('img')
        image.addEventListener('load', (event) => {
          event.srcElement.classList.add('fadeIn');
        });
        addEventClick(movieElement);//selector each movie
      })
      
    }

    const {data: { movies: actionList} } = await getData(`${BASE_API}list_movies.json?genre=action`)
    //Selector from html index.html
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList, $actionContainer,'action')
    
    const {data: { movies: dramaList} } = await getData(`${BASE_API}list_movies.json?genre=drama`)
    //Selector from html index.html
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList, $dramaContainer, 'drama')
    
    const {data: { movies: animationList} } = await getData(`${BASE_API}list_movies.json?genre=animation`)
    //Selector from html index.html
    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList, $animationContainer, 'animation')
    
    console.log(actionList, dramaList, animationList);



      //const $home = $('.modal');
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');
    
    
    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    findById = (list, id) =>{
      return list.find( movie => movie.id === parseInt(id, 10) );
    }

    findMovie = (id, category) => {
      switch (category){
        case 'action': {
          return findById(actionList, id)
        }
        case 'drama' : {
          return findById(dramaList, id)
        }
        default : {
          return findById(animationList, id)
        }
      }
    }

    showModal= ($element) => {
      $overlay.classList.add('active');
      $modal.style.animation = 'modalIn .8s forwards';
      const id = $element.dataset.id;
      const category = $element.dataset.category
      const data = findMovie(id, category)

      $modalTitle.textContent = data.title;
      $modalImage.setAttribute('src', data.medium_cover_image); 
      $modalDescription.textContent = data.description_full;

    }

    $hideModal.addEventListener('click',() =>{
      $overlay.classList.remove('active');
      $modal.style.animation = 'modalOut .8s forwards';
    });


  })()

  