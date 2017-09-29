/* Bibliothèques / Boites à outils */
const _ = require('lodash'); // Méga boite à outils JavaScript
const fs = require('fs-extra');
const moment = require('moment'); // Framework pour obtenir la date formatée facilement !

/* Models de données */
const Pub = require('../models/Pub'); // Pub Model
const Owner = require('../models/Owner'); // Owner Model
const OpenHours = require('../models/OpenHours'); // OpenHours Model
const Beer = require('../models/Beer'); // Beer Model

const MockJSONFilePath = './mocks/pubs.json';

/* Source de données */


/*
 * Vérifie les données du JSON
 */
function verifierDonnees(mockData) {
  if (!_.isArray(mockData)) throw new TypeError('Json Data Root Node is not an array');
  _.forEach(mockData, (pub) => {
    /* Root */
    if (!pub || !_.isObject(pub)) throw new TypeError('Json Data Root Node should only contain objects');

    /* Property name */
    if (!pub.name || !_.isString(pub.name)) throw new TypeError('Name property is not found or is not a string');

    // console.log(_.isString(pub.name));

    /* Property Owner Object */
    if (!pub.owner || !_.isObject(pub.owner)) throw new TypeError('owner property is not found or is not a object');
    if (!pub.owner.firstName || !_.isString(pub.owner.firstName)) throw new TypeError('owner.firstName property is not found or is not a string');
    if (!pub.owner.lastName || !_.isString(pub.owner.lastName)) throw new TypeError('owner.lastName property is not found or is not a string');
    if (!pub.owner.mail || !_.isString(pub.owner.mail)) throw new TypeError('owner.mail property is not found or is not a string');

    /* Property Owner Array */
    if (!_.isArray(pub.openDays)) throw new TypeError('openDays property is not found or is not an array');
    _.forEach(pub.openDays, (openDay) => {
      if (!openDay || !_.isString(openDay)) throw new TypeError('One openDays property is not found or is not a string');
    });

    /* Property openHours Object */
    if (!pub.openHours || !_.isObject(pub.openHours)) throw new TypeError('openHours property is not found or is not a object');
    if (!_.isNumber(pub.openHours.start)) throw new TypeError('openHours.start property is not found or is not a number');
    if (!_.isNumber(pub.openHours.end)) throw new TypeError('openHours.end property is not found or is not a number');


    /* Property beers Array */
    if (!_.isArray(pub.beers)) throw new TypeError('beers property is not found or is not an array');
    _.forEach(pub.beers, (beer) => {
      if (!beer || !_.isObject(beer)) throw new TypeError('One beer property is not found or is not an object');
      if (!beer.type || !_.isString(beer.type)) throw new TypeError('beer.type property of one beer is not found or is not a string');
      if (!beer.name || !_.isString(beer.name)) throw new TypeError('beer.name property of one beer is not found or is not a string');
    });
  });
}


/*
 * Charge les données depuis le fichier JSON : MockJSONFilePath
 */
function getMockData() {
  const pubs = [];
  return new Promise((resolve) => {
    fs.readJson(MockJSONFilePath, (err, mockData) => {
      if (err) {
        throw new TypeError(`Error parsing Mock JSON File : '${err.message}'`);
      }
      try {
        verifierDonnees(mockData);
      } catch (e) {
        throw new TypeError(e.message);
      }

      /* Les données issues du JSON sont valides apres le catch ...
       * Construction du tableau de pubs à retourner en fonction des données du JSON
       */

      _.forEach(mockData, (pubFromJson) => {
        const beers = [];
        _.forEach(pubFromJson.beers, (beer) => {
          beers.push(new Beer(beer.type, beer.name));
        });

        const pub = new Pub(
          pubFromJson.name,
          new Owner(
            pubFromJson.owner.firstName,
            pubFromJson.owner.firstName,
            pubFromJson.owner.mail,
          ),
          pubFromJson.openDays,
          new OpenHours(
            pubFromJson.openHours.start,
            pubFromJson.openHours.end,
          ),
          beers,
        );
        pubs.push(pub);
      });
      resolve(pubs);
    });
  });
}


/* ---------- pub.service.js ---------- */

/* Retourne un tableau contenant tous les pubs */
async function listerPubs() {
  return getMockData();
}

function verifierHeureOuverture(h, s, e) {
  if ((e >= s) && (h >= s && h <= e)) {
    return true;
  } else if ((s >= e) && ((h >= s && h <= 0) || (h <= 0))) {
    return true;
  } else if ((s >= e) && ((e === 0) && h >= s)) {
    return true;
  }
  return false;
}

/* Retourne un tableau contenant les pubs ouverts aujourd'hui */
async function listerPubsOuverts(timestamp) {
  if (!timestamp) { throw new TypeError('Missing timestamp'); }
  return _.filter(
    await getMockData(),
    (pub) => {
      const isCurrentDay = _.includes(pub.openDays, moment(timestamp).format('dddd'));
      const isOpennedHour = verifierHeureOuverture(
        moment(timestamp).format('H'),
        pub.openHours.start,
        pub.openHours.end,
      );
      return isCurrentDay && isOpennedHour;
    },
  );
}


/* Exports */
module.exports = {
  listerPubs,
  listerPubsOuverts,
};
