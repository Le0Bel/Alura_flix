import { useState } from "react";
import { nanoid } from 'nanoid'


export default function NewVideo({ dialogRef , newVideo}) {
    const [formData , serFormData] = useState(
        {
            titulo: "" ,
            categoria: "",
            imagen: "",
            video: "",
            descripcion:""
        }

    )
    
    function handleChange(event) {
        const id = event.target.id
        const value = event.target.value
        serFormData(prevFormData => {
            return {
                ...prevFormData,
                [id] : value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const video = {...formData, id:nanoid()}
        newVideo(video)
    }
  
    return (
        <dialog ref={dialogRef}>
            <div className="edit-container">
                <h1>NUEVO VIDEO</h1>
                <form action="" className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="titulo" >Titulo</label>
                    <input 
                        className="edit-input" 
                        type="text" id="titulo" 
                        onChange={handleChange} 
                        value={formData.titulo}
                    />
                    
                    <label htmlFor="categoria">Categoria</label>
                    <input 
                        className="edit-input" 
                        type="text" 
                        id="categoria" 
                        onChange={handleChange} 
                        value={formData.categoria}
                        />
                    
                    <label htmlFor="imagen">Imagen</label>
                    <input 
                        className="edit-input" 
                        type="text" id="imagen" 
                        onChange={handleChange} 
                        value={formData.imagen}
                        />
                    
                    <label htmlFor="video">Video</label>
                    <input 
                        className="edit-input" 
                        type="text" id="video" 
                        onChange={handleChange} 
                        value={formData.video}
                        />
                    
                    <label htmlFor="descripcion">Descripción</label>
                    <input 
                        className="edit-input" 
                        type="text" id="descripcion" 
                        onChange={handleChange} 
                        value={formData.descripcion}
                        />
                    
                    <div>
                        <button type="submit">Guardar</button>
                        <button>Limpiar</button>
                    </div>
                    

                </form>
            </div>
        </dialog>
    )
}

