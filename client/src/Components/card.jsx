import { useHistory } from "react-router-dom";

const Card = ({id,name,img,types,attack,defense,hp}) => {

    types = types.map(type => type.name);
    const history = useHistory();

    const viewPokemon = () => {

        history.push(`/home/details/${id}/pokemon`);

    }
    
    return (
    
    


        <div onClick={viewPokemon}>
                    <img src={img.length > 8 ? img : 'https://assets.thespinoff.co.nz/1/2019/04/HddtBOT.png'} alt={name} />
                    <p> Id: {id} Nombre: {name} Tipo: {types.join('/')}</p>
                    <p>Ataque: {attack} Defensa: {defense} Vida: {hp}</p>

        </div>

   
    )

}

export default Card; 