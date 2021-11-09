import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Card from './Components/card';
  
  //const linkElement = screen.getByText(/learn react/i);
  const pokemon = {
    id: 0,
    name: 'Pedro',
    img: '',
    types: [{name:'fire'}],
    attack: 1,
    defense: 2,
    hp: 3
  }

    describe('Debe tener un boton que dirija al home', () => {

      render(<App />);
      
      const button = screen.getByRole('button');

      it('El botón debe existir', () => {

        expect(button).toBeInTheDocument();

      })



    });

    describe('Debe renderizar una card con los datos que recibe', () => {

      render(<Card {...pokemon}/>);
      
      const id = screen.getByTestId("id");
      const name = screen.getByTestId("name");
      const img = screen.getByTestId("img");
      const type = screen.getByTestId("type");
      const attack = screen.getByTestId("attack");
      const defense = screen.getByTestId("defense");
      const hp = screen.getByTestId("hp");

      it('Debe renderizar el id', () => {

        expect(id.innerHTML.includes('0')).toBe(true);

      })
      
      it('Debe renderizar el nombre', () => {

        expect(name.innerHTML.includes('Pedro')).toBe(true);

      })

      it('Debe renderizar el tipo', () => {

        expect(type.innerHTML.includes('fire')).toBe(true);

      })

      it('Debe renderizar el ataque', () => {

        expect(attack.innerHTML.includes('1')).toBe(true);

      })

      it('Debe renderizar la defensa', () => {

        expect(defense.innerHTML.includes('2')).toBe(true);

      })

      it('Debe renderizar la vida', () => {

        expect(hp.innerHTML.includes('3')).toBe(true);

      })

      it('Debe renderizar el nombre del pokemon si no recibe una imagen', () => {

        expect(img.alt.includes('Pedro')).toBe(true);

      })

    });

