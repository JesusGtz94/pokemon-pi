
const Card = ({id,name,img,types,attack,defense,hp}) => {

    types = types.map(type => type.name);
    
    return (

        <>

            <img src={img} alt={name} />
            <p> Id: {id} Nombre: {name} Tipo: {types.join('/')}</p>
            <p>Ataque: {attack} Defensa: {defense} Vida: {hp}</p>

        </>

    )

}

export default Card; 