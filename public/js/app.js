const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageTwo.innerHTML = ''
    messageOne.textContent = 'Loading...'

    const url = '/weather?address=' + encodeURIComponent(location)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.innerHTML = data.error
            } else {
                messageOne.innerHTML = data.location
                messageTwo.innerHTML = data.forecast
                console.log(data)
            }
        })
    })
})
