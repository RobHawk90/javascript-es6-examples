/* this is a static class, an exception is thrown when creating a new instance  */
class DateHelper {

	constructor() { throw new Error("DateHelper is static and can't be instanciated") }

	static textoParaData(dateStr) {
		if(dateStr && dateStr.indexOf('/') > -1) // probably in ptBR format
			dateStr = dateStr.split('/').reverse().join('-') // converts to valid Date format convertion
		if(/\d{4}-\d{2}-\d{2}/.test(dateStr)) // simple date regex validation
			return new Date(dateStr)
		throw new Error(`The date "${dateStr}" should be in "yyyy-mm-dd" format`)
	}

	static dataParaTexto(date) {
		if(!date) return ''
		let dateTime = date.toISOString().split('T')
		return dateTime[0].split('-').reverse().join('/')
	}

}
