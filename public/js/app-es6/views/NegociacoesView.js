class NegociacoesView extends View {

	template(model) {
		return `
			<table class="bordered highlight centered">
				<thead>
					<th onclick="ctrl.ordena('data')">Data</th>
					<th onclick="ctrl.ordena('quantidade')">Qtde</th>
					<th onclick="ctrl.ordena('valor')">Valor</th>
					<th onclick="ctrl.ordena('volume')">Volume</th>
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
					<td class="center-align">${model.volumeTotal}</td>
				</tfoot>
			</table>
		`
	}

}
