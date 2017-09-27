/* Bibliothèques / Boites à outils */
var _ = require("lodash"); // Méga boite à outils JavaScript
var moment = require("moment"); // Framework pour obtenir la date formatée facilement !

/* Source de données */
var mockData = require("../mocks/pubs.json"); // require() interprète  le fichier json et renvoi les données objet !


/* ---------- pub.service.js ---------- */

/* Retourne un tableau contenant tous les pubs */
function listerPubs() {
    return mockData;
}


/* Retourne un tableau contenant les pubs ouverts aujourd'hui */
function listerPubsOuvertAujourdHui() {
    return _.filter(mockData, function (pub) {
        // Ajoute le pub au tableau a retourner
        // si un de ses jour ouvert correspond au jour actuel
        return _.find(pub.openDays, function (day) {
            // Retourne undefined si aucun jour ouvert
            // correspond au jour actuel
            return day === moment().format('dddd');
        });

    });

}


/* Exports */
module.exports = {
    listerPubs: listerPubs,
    listerPubsOuvertAujourdHui: listerPubsOuvertAujourdHui
};