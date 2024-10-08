/* eslint-disable react/prop-types */
export default function Course({name, description, image, duration, level}) {

    return (
        <div className="course-card">
            <h1 className="course-title">{name}</h1>
            <div className="course-main-top">
                <p className="course-description">{description} </p>
                <img src={image} alt="" />
            </div>
            <div className="course-main-bottom">
                <p>Duracion: {duration}</p>
                <p>Nivel: {level}</p>
            </div>
        </div>
    )
}