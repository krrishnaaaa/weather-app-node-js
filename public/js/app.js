console.log('Client side js loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgTitle = document.querySelector('#message-title')
const msgSubtitle = document.querySelector('#message-subtitle')
const icon = document.querySelector('#weather-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msgTitle.textContent = 'Loading...'
    msgSubtitle.textContent = ''
    icon.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                msgTitle.textContent = data.error
                msgSubtitle.textContent = ''
                icon.textContent = ''
            } else {
                msgTitle.textContent = data.location
                msgSubtitle.textContent = data.forecast
                const img = document.createElement("img");
                img.src = data.icon
                img.height = 200
                img.width = 200
                icon.appendChild(img)
            }
        })
    })
})