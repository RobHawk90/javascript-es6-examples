'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var NegociacaoController, ctrl, $;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }],
    execute: function () {
      ctrl = new NegociacaoController();
      $ = document.querySelector.bind(document);


      $('#negociacoes-form').onsubmit = ctrl.adiciona.bind(ctrl);
      $('#importar-negociacoes').onclick = ctrl.importaNegociacoes.bind(ctrl);
      $('#apagar-negociacoes').onclick = ctrl.apagaTudo.bind(ctrl);
    }
  };
});
//# sourceMappingURL=boot.js.map