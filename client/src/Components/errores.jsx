
const Errors = ({errors}) => {

    let id = 0;

    return(

        <ul>
            {
            errors.map(err => {
            
                id++    
                return <li key={id}>{err}</li>

            })}
        </ul>

    )

}

export default Errors;