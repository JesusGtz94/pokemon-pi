import { useHistory } from 'react-router-dom';
import {DetailDiv, HomeButton, WhiteBackground} from './pokeDetail.styles';

const PokeDetail = ({attack, defense, height, hp, id, img, name, speed, types, weight}) => {

    const history = useHistory();

    if(!img){
        img = '';
    }

    const goHome = () => {
        history.push('/home')
    }

return (

    <WhiteBackground>

        <DetailDiv type={types && types[0] ? types[0].name : "normal"}>

            <img className="rectangle" src={img.length > 8 ? img : 'https://assets.thespinoff.co.nz/1/2019/04/HddtBOT.png'} alt={name}/>

            <div className='data-container'>

                <div className="rectangle">
                    <p><span>Id: </span>{id}</p>
                </div>

                <div className="rectangle">
                    <p><span>Nombre: </span>{name}</p>
                </div>

                <div className="rectangle">

                    <p><span>Tipo: </span>{`${types && types[0] ? types[0].name : "?"} ${types ? types[1] ? ` / ${types[1].name}` : "" : ""}`}</p>

                </div>

                <div className="container">
                    <p className="rectangle element"><span>Vida: </span>{hp}</p>
                    <p className="rectangle element"><span>Ataque: </span>{` ${attack}`}</p>
                    <p className="rectangle element"><span>Defensa: </span>{defense}</p>
                </div>
                
                <div className="container margin-fix">
                    <p className="rectangle element"><span>Velocidad: </span>{speed}</p>
                    <p className="rectangle element"><span>Tamaño: </span>{height}</p>
                    <p className="rectangle element"><span>Peso: </span>{height}</p>

                </div >

            </div>

            

        </DetailDiv>

            <HomeButton onClick={goHome}>Home</HomeButton>

    </WhiteBackground>
)

}

export default PokeDetail;