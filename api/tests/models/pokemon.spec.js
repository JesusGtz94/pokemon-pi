const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {

    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {

      it('should throw an error if name is null', (done) => {

        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());

      });

      it('should throw an error when its a valid name but have not pokemon stats', (done) => {
        
        Pokemon.create({ name: 'roberto' })
        .then(() => done('It requiere Hp, Attack, Defense, etc...'))
        .catch(() =>done())

      });

      it('should work when recive the complete information', (done) => {
 
        Pokemon.create({

          name: 'roberto',
      
          hp: 1,
      
          attack: 1,
      
          defense: 1,
      
          speed: 1,
      
          height: 1,

          weight: 1

        })
        .then(() => done())
        .catch(() => done('Should work'))

      });

      it('should throw an error when no recive hp', (done) => {
 
        Pokemon.create({

          name: 'roberto',
      
          attack: 1,
      
          defense: 1,
      
          speed: 1,
      
          height: 1,

          weight: 1

        })
        .then(() => done('Should not work'))
        .catch(() => done())

      });

      it('should throw an error when no recive attack', (done) => {
 
        Pokemon.create({

          name: 'roberto',
      
          hp: 1,
      
          defense: 1,
      
          speed: 1,
      
          height: 1,

          weight: 1

        })
        .then(() => done('Should not work'))
        .catch(() => done())

      });

      it('should throw an error when no recive defense', (done) => {
 
        Pokemon.create({

          name: 'roberto',
      
          hp: 1,
      
          attack: 1,
      
          speed: 1,
      
          height: 1,

          weight: 1

        })
        .then(() => done('Should not work'))
        .catch(() => done())

      });

      it('should throw an error when no recive speed', (done) => {
 
        Pokemon.create({

          name: 'roberto',
      
          hp: 1,
      
          attack: 1,
      
          defense: 1,
      
          height: 1,

          weight: 1

        })
        .then(() => done('Should not work'))
        .catch(() => done())

      });

      it('should throw an error when no recive height', (done) => {
 
        Pokemon.create({

          name: 'roberto',
      
          hp: 1,
      
          attack: 1,
      
          defense: 1,
      
          speed: 1,

          weight: 1

        })
        .then(() => done('Should not work'))
        .catch(() => done())

      });

      it('should throw an error when no recive weight', (done) => {
 
        Pokemon.create({

          name: 'roberto',
      
          hp: 1,
      
          attack: 1,
      
          defense: 1,
      
          speed: 1,
      
          height: 1

        })
        .then(() => done('Should not work'))
        .catch(() => done())

      });
    });
  });

  describe('Create' , () => {

    it('Should not create the pokemon when there is an error',async () => {

      try {

        await Pokemon.create({name: 'roberto'})
        
      } catch{}

      let instance = await Pokemon.findOne({
        where: {
            name: 'roberto'
        }});

      console.log(instance)

      expect(instance).to.equal(null)
      

    })

    it('Should create the pokemon when there is not an error',async () => {

      try {

        await Pokemon.create({

          name: 'roberto',
      
          hp: 1,
      
          attack: 1,
      
          defense: 1,
      
          speed: 1,
      
          height: 1,

          weight: 1

        })
        
      } catch{}

      let instance = await Pokemon.findOne({
        where: {
            name: 'roberto'
        }});

      expect(instance.toJSON().name).to.equal('roberto');
      

    })

  })
});
