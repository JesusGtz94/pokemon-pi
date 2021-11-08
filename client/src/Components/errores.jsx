import { ErrorLi } from "./errores.styles";

const Errors = ({errors,type}) => {

    let id = 0;

    return(

        <ErrorLi type={type}>
            {
            errors.map(err => {
            
                id++    
                return <li key={id}>{err}</li>

            })}
        </ErrorLi>

    )

}

export default Errors;