const pubServices = require('pub-services');
const moment = require('moment');

function getListPub() {
  return pubServices.services.pubService.listerPubs().then(listPub => listPub);
}

function getListPubsOuvertAujourdHui() {
  pubServices.services.pubService.listerPubsOuvertAujourdHui(moment.now())
    .then(ListPubsOuvertAujourdHui => ListPubsOuvertAujourdHui);
}


module.exports = {
  getListPub,
  getListPubsOuvertAujourdHui,
};
