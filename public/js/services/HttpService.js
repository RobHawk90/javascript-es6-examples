class HttpService {

	get(url) {
		return new Promise((resolve, reject) => {
			let http = new XMLHttpRequest()
			http.open('GET', url)
			http.onreadystatechange = () => {
				if(http.readyState == XMLHttpRequest.DONE) { // request is done
					if(http.status == 200) // status is ok
						resolve(JSON.parse(http.responseText))
					else
						reject(http.responseText)
				}
			}
			http.send()
		})
	}

}
