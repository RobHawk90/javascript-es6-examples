class NegociacoesView extends View {

	template(model) {
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
				<tfoot>
					<td colspan="3" class="right-align"><strong>Total: </strong></td>
					<td class="center-align">${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}</td>
				</tfoot>
			</table>
		`
	}

}
