import { nanoid } from 'nanoid'


export default function NewVideoNoControlada({ dialogRef, newVideo, closeNewVideoModal }) {


    function handleSubmit(e) {
        e.preventDefault();
        const fieldsValues = Object.fromEntries(new FormData(e.target))
        const video = { ...fieldsValues, id: nanoid() }
        newVideo(video)
        e.target.reset()
        closeNewVideoModal()
    }

    function closeModal() {
        closeNewVideoModal()
    }
    
    return (
        <dialog ref={dialogRef}>
            <div className="edit-container">
                <h1>NUEVO VIDEO</h1>
                <svg onClick={closeModal} className="close-btn" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#1b5499" strokeWidth="1.5"/>
                    <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                
                <form action="" className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="title" >Titulo</label>
                    <input
                        className="edit-input"
                        type="text" name="title"
                        required
                    />

                    <label htmlFor="category">Categoria</label>
                    <input
                        className="edit-input"
                        type="text"
                        name="category"
                    />

                    <label htmlFor="image">Imagen</label>
                    <input
                        className="edit-input"
                        type="text"
                        name="image"
                    />

                    <label htmlFor="video">Video</label>
                    <input
                        className="edit-input"
                        type="text"
                        name="video"
                    />

                    <label htmlFor="description">Descripción</label>
                    <textarea
                        className="edit-text-area"
                        rows="4" 
                        name="description"
                    />

                    <label htmlFor="playerBackground">Fondo del reproductor</label>
                    <input
                        className="edit-input"
                        type="text" name="playerBackground"
                    />

                    <div className='modal-btn'>
                        <button type="reset" className='modal-btn-reset' >Limpiar</button>
                        <button type="submit" className='modal-btn-submit' >Guardar</button>
                    </div>

                </form>
            </div>
        </dialog>
    )
}

