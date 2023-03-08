const cardTop = document.querySelector('#cardTop').content
const fragment = document.createDocumentFragment()
const contenido = document.querySelector('#contenido')
const btnBuscar = document.getElementById('buscador')
let topTwoHundred = []

document.addEventListener('DOMContentLoaded', () => {
    loadMusicData()
})

const loadMusicData = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'aece92988cmshc945ee7e8d1f723p1807a9jsn1daea7bdb972',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
        .then(response => response.json())
        .then(response => {
            topTwoHundred = response
            creaCards()
            console.log('canciones', topTwoHundred)
        })
        .catch(err => console.error(err));
}

const creaCards = () => {
    topTwoHundred.forEach((song) => {
        cardTop.querySelector('img').setAttribute('src', song.trackMetadata.displayImageUri)
        cardTop.querySelector('.songname').textContent = song.trackMetadata.trackName
        let artists = ''
        let size = song.trackMetadata.artists.length
        song.trackMetadata.artists.forEach((item, index) => {
            //console.log(index, size)
            if ( index === size -1 ){
                artists += item.name
            } else {
                artists += item.name +'/'
            }
        })
        cardTop.querySelector('.artistname').textContent = artists

        const clone = cardTop.cloneNode(true)
        fragment.appendChild(clone)

    })
    contenido.appendChild(fragment)
}

btnBuscar.addEventListener('keypress', () => {
    console.log('tecla', btnBuscar.value)
    let otro = btnBuscar.value
    let expre = new RegExp(`${otro}.*`)
    let busq = topTwoHundred.filter(song=>expre.test(song.trackMetadata.trackName))
    if(btnBuscar.value != null){
    document.getElementById('contenido').innerHTML = ''
    busq.forEach((bus) => {
    cardTop.querySelector('.songname').textContent = bus.trackMetadata.trackName
    const clone = cardTop.cloneNode(true)
    fragment.appendChild(clone)
    })
    contenido.appendChild(fragment)
    }else{
    return
    }
    })