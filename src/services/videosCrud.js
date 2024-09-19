const API_VIDEOS_BASE_URL = "http://localhost:3000/videos"

export async function getVideos() {

    return fetch(API_VIDEOS_BASE_URL)   // ** agregar mejor control de errores al fetch y pasarlo a un custom Hook useFetch
        .then(res => res.json())
        .then(videos => {
            return videos
        })
        .catch((error) => { return error.message })
}

//{ alert("Lo lamentamos no se pudo obener las lista de videos del servidor") }