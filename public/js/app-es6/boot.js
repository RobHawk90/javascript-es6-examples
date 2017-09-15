import {NegociacaoController} from './controllers/NegociacaoController'

let ctrl = new NegociacaoController()

let $ = document.querySelector.bind(document)

$('#negociacoes-form').onsubmit = ctrl.adiciona.bind(ctrl)
$('#importar-negociacoes').onclick = ctrl.importaNegociacoes.bind(ctrl)
$('#apagar-negociacoes').onclick = ctrl.apagaTudo.bind(ctrl)
