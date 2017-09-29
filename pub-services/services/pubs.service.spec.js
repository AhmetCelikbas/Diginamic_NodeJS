/* global it, describe */
const { expect } = require('chai').expect;
const pubsSevices = require('./pubs.service');

describe('pubs-services', () => {
  describe('listerPubs', () => {
    it(
      'La valeur retournée par listerPubs() devrait être un tableau',
      () => {
        expect(pubsSevices.listerPubs()).to.be.an('array');
      },
    );
  });

  describe('listerPubsOuverts', () => {
    it(
      'La valeur retournée par listerPubsOuvertAujourdHui() devrait être un tableau',
      () => {
        expect(pubsSevices.listerPubsOuverts()).to.be.an('array');
      },
    );

    it(
      'La valeur retournée par listerPubsOuvertAujourdHui() devrait être un tableau',
      () => {
        expect(pubsSevices.listerPubsOuverts()).to.be.an('array');
      },
    );
  });
});
