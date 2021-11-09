import { useHistory } from "react-router-dom";
import { DivCard } from "./card.styles";

const Card = ({id,name,img,types,attack,defense,hp}) => {

    types = types.map(type => type.name);
    const history = useHistory();

    const viewPokemon = () => {

        history.push(`/home/details/${id}/pokemon`);

    }
    
    return (
    
    


        <DivCard type={types[0]? types[0] : "normal"} onClick={viewPokemon}>

                <div className="img-box back-box">

                    <img data-testid="img" src={img.length > 8 ? img : 'https://assets.thespinoff.co.nz/1/2019/04/HddtBOT.png'} alt={name} />
                    
                </div>

                <p data-testid="id" className="one-box back-box"> <span> Id: </span>{id} </p>

                <div className="two-box">
                    <div>
                        <p data-testid="name" className="back-box"> <span> Nombre </span><br/> {name} </p>
                        <p data-testid="type" className="back-box"><span>Tipo</span><br/> {types[0] ? types.join('/') : "?"}</p>

                    </div>
                </div>

                <div className="three-box"> 
                    <div>
                        <p data-testid="attack" className="back-box"><span>Ataque</span><br/> {attack}</p>
                        <p data-testid="defense" className="back-box"><span>Defensa</span><br/> {defense}</p>
                        <p data-testid="hp" className="back-box"><span>Vida</span><br/> {hp}</p>
                    </div>
                </div>
        </DivCard>

   
    )

}

export default Card; 