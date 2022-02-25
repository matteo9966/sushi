const {Piatto} = require('../Table');
class OrdinazioneResponse {
    /** @type {[Piatto]} */
    piatti;
    idUtente;
    idTavolo;
    /**
     * @param {[Piatto]} piatti
     * @param {String} idTavolo
     * @param {String} idUtente
     *  */
    constructor(piatti,idTavolo,idUtente){
      this.idTavolo=idTavolo;
      this.idUtente=idUtente;
      this.piatti=piatti;
    }
}

module.exports=OrdinazioneResponse