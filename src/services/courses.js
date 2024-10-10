const API_VIDEOS_BASE_URL = "http://localhost:3000/courses"

export async function getCourses() {
  return fetch(API_VIDEOS_BASE_URL) // ** agregar mejor control de errores al fetch y pasarlo a un custom Hook useFetch
    .then(res => res.json())
    .then(videos => {
      return videos
    })
    .catch(error => {
      alert("Lo lamentamos no se pudo obener las lista de cursos del servidor")
      console.log(error.message)
    })
}

export async function deleteCourse(id) {
  const response = await fetch(`${API_VIDEOS_BASE_URL}/${id}`, {
    method: "DELETE",
  })
  return response
}

export async function editVideo(editedCard) {
  const response = await fetch(
    `${API_VIDEOS_BASE_URL}/${editedCard.id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedCard),
    }
  )
  return response
}

export async function saveNewCurso(course) {
  const response = await fetch(`${API_VIDEOS_BASE_URL}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  })
  return response
}

