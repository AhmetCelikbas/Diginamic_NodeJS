var pubServices = require('pub-services');

function getListPub() {
    return pubServices.services.pubService.listerPubs();
}

function getListPubsOuvertAujourdHui() {
    return pubServices.services.pubService.listerPubsOuvertAujourdHui();
}


module.exports = {
    getListPub: getListPub,
    getListPubsOuvertAujourdHui: getListPubsOuvertAujourdHui
};