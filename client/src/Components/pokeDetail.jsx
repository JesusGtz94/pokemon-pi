

const PokeDetail = ({attack, defense, height, hp, id, img, name, speed, types, weight}) => {

    if(!img){
        img = '';
    }

return (

    <>
        <img src={img.length > 8 ? img : 'https://assets.thespinoff.co.nz/1/2019/04/HddtBOT.png'} alt={name}/>
        <p>{`Nombre: ${name}-Ataque: ${attack}-Defensa: ${defense}-Tamaño: ${height}-Vida: ${hp}-Velocidad: ${speed}-Tipo: ${types}-Peso: ${weight}-Id: ${id}`}</p>
    </>
)

}

export default PokeDetail;