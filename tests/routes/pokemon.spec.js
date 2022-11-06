/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemons, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pepe',
};

describe('Pokemon  routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemons.sync({ force: true })
    .then(() => Pokemons.create(pokemon)));
  describe('GET /pokemon', () => {
    it('should get 200', () =>
      agent.get('/pokemon').expect(200)
    );
  });
});
