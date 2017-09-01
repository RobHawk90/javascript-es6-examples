class NegociacoesView {

	constructor($element) {
		this._$element = $element
		console.log($element)
	}

	update(model) {
		this._$element.innerHTML = this._template(model)
	}

	_template(model) {
		return `
			<table class="bordered highlight centered">
				<thead>
					<th>Data</th>
					<th>Qtde</th>
					<th>Valor</th>
					<th>Volume</th>
				</thead>
				<tbody>
					${model.negociacoes.map(negociacao => `
						<tr>
							<td>${DateHelper.dataParaTexto(negociacao.data)}</td>
							<td>${negociacao.quantidade}</td>
							<td>${negociacao.valor}</td>
							<td>${negociacao.volume}</td>
						</tr>
					`).join('')}
				</tbody>
			</table>
		`
	}

}
