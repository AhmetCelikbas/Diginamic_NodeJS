var expect = require('chai').expect;
var pubsSevices = require('./pubs.service');

describe('pubs-services', function () {
    describe('listerPubs', function () {
        it("La valeur retournée par listerPubs() devrait être un tableau",
            function () {
                expect(pubsSevices.listerPubs()).to.be.an('array');
            }
        );
    });

    describe('listerPubsOuvertAujourdHui', function () {
        it("La valeur retournée par listerPubsOuvertAujourdHui() devrait être un tableau",
            function () {
                expect(pubsSevices.listerPubsOuvertAujourdHui()).to.be.an('array');
            }
        );

    });
});
