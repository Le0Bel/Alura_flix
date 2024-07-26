import { nanoid } from 'nanoid'

export default [
    {
        id:nanoid(),
        title: "Video numero 1",
        image : "/home-fondo-player.png",
        description:" Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución" + 
        "de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.",
        category:"frontend",
        video:"https://www.youtube.com/embed/15JLxVzKMRQ?si=UauW6-wyoTAhCfI9"
    },

    {  id:nanoid(),
        title: "Que es javascipt etc",
        image : "/card-2-back.png",
        description:" Como aprender backend rapidamente sin morir en el intento",
        category:"backend",
        video:"https://www.youtube.com/embed/KCuiNzGbGTE?si=qv0r4fDf076gzXsH"
    },

    {   id:nanoid(),
        title: "Peli 3 backend",
        image : "/card-1.png",
        description:" Este capitulo considera el Bla bla bla",
        category:"backend",
        video:"https://www.youtube.com/embed/nMXEHfxYaQE?si=C1kigK9Yz8zfZ029" 
    }
]