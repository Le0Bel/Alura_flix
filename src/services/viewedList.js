const API_VIEWEDLIST_BASE_URL = "http://localhost:3000/viewedlist"

export async function getViewedList(userName) {
    return fetch(`${API_VIEWEDLIST_BASE_URL}/${userName}`)
        .then(res => res.json())
        .then(userData => { return userData.viewed })
        .catch((error) => { console.log("Error no se pudo obtener la lista de videos ya vistos para el usuario", error) })
}

export async function saveViewed(userName, viewedVideos) {
    const response = await fetch(`http://localhost:3000/viewedlist/${userName}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(viewedVideos)
    })
    return response
}
