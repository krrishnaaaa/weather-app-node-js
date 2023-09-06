console.log('Client side js loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgTitle = document.querySelector('#message-title')
const msgSubtitle = document.querySelector('#message-subtitle')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msgTitle.textContent = 'Loading...'
    msgSubtitle.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                msgTitle.textContent = data.error
                msgSubtitle.textContent = ''
            } else {
                msgTitle.textContent = data.location
                msgSubtitle.textContent = data.forecast
            }
        })
    })
})