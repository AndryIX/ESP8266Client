function sendGetRequest(url) {
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
    }

    return fetch(url, {
        headers: headers,
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        return response.json().then(error => {
            const e = new Error()
            e.data = error
            throw e
        })
    })
}

let content = document.getElementById('content')

function getWeatherData() {
    sendGetRequest('http://192.168.0.104/allData')
        .then(data => {
            console.log(data)
            content.innerHTML = `<h2>Температура: ${data.temperature}</h2>
                        <h2>Давление: ${data.pressure}</h2>`
        })
        .catch(err => console.log(err))

    setTimeout(getWeatherData, 2000)
}
getWeatherData()