import {View} from './View'

export class MensagemView extends View {

	template(model) {
		return model.texto ? `<p class="card green white-text center-align">${model.texto}</p>` : '<p></p>'
	}

}
