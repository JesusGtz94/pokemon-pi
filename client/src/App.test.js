import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


  
  //const linkElement = screen.getByText(/learn react/i);


    describe('Debe tener un boton que dirija al home', () => {

      render(<App />);
      
      const button = screen.getByRole('button');


      it('El botón debe existir', () => {

        expect(button).toBeInTheDocument();

      })

    });
