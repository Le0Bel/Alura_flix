export default function Course() {



    return (
        <div className="course-card">
            <h1 className="course-title">Conceptos básicos de HTML</h1>
            <div className="course-main-top">
                <p className="course-description">Descripción del curso,  no hace falta que sea muy larga la descripción, dos o tres líneas de texto estaría bastante bien </p>
                <img src="./logos/html.svg" alt="" />
            </div>
            <div className="course-main-bottom">
                <p>Duracion: 5h 15 mins</p>
                <p>Nivel: Principiante</p>
            </div>
        </div>
    )
}