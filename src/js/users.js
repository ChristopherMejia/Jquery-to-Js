(async function load(){

    const URL_USER = 'https://randomuser.me/api/?results=8'
    const $container = document.getElementById('friendList')
    const {results:  data} = await getUsersData(URL_USER)
    console.log(data)


    async function getUsersData(url){
        const response = await fetch(url)
        const data = await response.json()
        if(data.info.results > 0){
            return data
        }
        throw new Error("No hay ningun amigo conectado")

    }

    //create HTML to add DOM
    featuringTemplate = (user) => {
        return(
        `<li class="playlistFriends-item" data-id="${user.id.name}" >
              <div class="primaryPlaylistItem-image">
                <img src="${user.picture.medium}">
              </div>
              <a href="#">  
                <span >
                  ${user.name.first} ${user.name.last} 
                </span>
              </a>
        </li>`)
    }
    //Create to HTML in memory
    createTemplate = (HTMLstring) =>{
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLstring;
        return html.body.children[0]
    }

    //show modal for each user
    
    const $modalUser = document.getElementById('modalUser');
    const $overlayUser = document.getElementById('overlayUser');
    const $hide = document.getElementById('hide-modal-user');
    const $modalNameUser = $modalUser.querySelector('h1');
    const $modalImgUser = $modalUser.querySelector('img');
    const $modalDescription = $modalUser.querySelector('p')

    findByName = (id, list) => {
        return list.find(element => element.id.name === id)
    }

    function showModal(userElement){
        $overlayUser.classList.add('active');
        $modalUser.style.animation = 'modalIn .8s forwards';
        console.log(userElement)
        
        const id = userElement.dataset.id;
        const userFind = findByName(id, data);
        
        $modalNameUser.textContent = `${userFind.name.first} ${userFind.name.last}`;
        $modalImgUser.setAttribute('src', `${userFind.picture.large}`);
        $modalDescription.innerHTML = `
        <strong>Email:</strong> ${userFind.email}<br>
        <strong>Phone:</strong> ${userFind.phone}<br>
        <strong>Age:</strong> ${userFind.dob.age}<br>
        <strong>Location:</strong> ${userFind.location.city}. ${userFind.location.state}
        `;
    }

    $hide.addEventListener('click',() =>{
        $overlayUser.classList.remove('active');
        $modalUser.style.animation = 'modalOut .8s forwards';
    });

    function userClick(userElement){
        userElement.addEventListener('click', () => {
            showModal(userElement);
          })
    }

    //short code to set the data before add in DOM
    renderFriendList = (list,$container) =>{
        $container.children[0].remove()
        list.forEach((user) => {
            const HTMLstring = featuringTemplate(user)
            const userElement = createTemplate(HTMLstring)
            $container.append(userElement)

            //Show details with click on user
            userClick(userElement);

        });
    }

    renderFriendList(data, $container)

})()