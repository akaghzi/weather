const locationForm = document.querySelector('form')
const address = document.querySelector("#address")
const message = document.querySelector('#message')
locationForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    if (!address.value){
        // console.log('address missing')
        document.querySelector("#infobox").setAttribute("style","display:none;")
        return document.querySelector('#message').textContent = 'Please enter a valid address'
    }
    message.textContent = 'Loading ...'

    // console.log(address.value)
    fetch('/weather?address=' + address.value).then((response)=>{
    response.json().then((data)=>{
        if(data.message === 'Location not found'){
            // console.log('address not found')
            document.querySelector("#infobox").setAttribute("style","display:none;")
            document.querySelector('#message').textContent = 'Address not found, please try again'
            // document.querySelector('#message').textContent = data.error
        } else {
            // console.log('address found')
            // console.log(data.message)
            document.querySelector("#infobox").setAttribute("style","display:block;")
            document.querySelector('#message').textContent = 'Address found'
            document.querySelector('#temperature').textContent = data.temperature
            document.querySelector('#location').textContent = data.location
            document.querySelector('#feelslike').textContent = data.feelsLike
        }
    })
})
    // console.log(location)
    // document.querySelector("#infobox").setAttribute("style","display:block;")
})