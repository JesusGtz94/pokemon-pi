/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'roberto',

  hp: 1,
      
  attack: 1,

  defense: 1,

  speed: 1,

  height: 1,

  weight: 1

};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {

    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );

    it('should get 404 when pokemon name does not exist', () =>
    agent.get('/pokemons?name=errorPokemon').expect(404)
    );

    it('should get 404 when pokemon id does not exist', () =>
      agent.get('/pokemons/thisIsNotAnId').expect(404)
    );

    it('should take the pokemon when the id exists', async () => {

      let poke = await agent.get('/pokemons/1')
   
      expect(poke.body.name).to.equal('bulbasaur')

      })

    it('should take the pokemon when the name exists', async () => {

      let poke = await agent.get('/pokemons?name=pikachu')
    
      expect(poke.body.name).to.equal('pikachu')

      })

  });
});
