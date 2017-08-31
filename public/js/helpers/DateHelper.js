/* this is a static class, an exception is thrown when creating a new instance  */
class DateHelper {

	constructor() { throw new Error("DateHelper is static and can't be instanciated") }

	static textoParaData(dataStr) {
		let isValidDate = /\d{4}-\d{2}-\d{2}/.test(dataStr) // simple date regex validation
		if(!isValidDate) throw new Error(`The date "${dataStr}" should be in "yyyy-mm-dd" format`)
		let formattedDataStr = dataStr.split('-').reverse().join('/') // convert to ptBR format
		return new Date(formattedDataStr)
	}

	static dataParaTexto(date) {
		if(!date) return ''
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
	}

}
