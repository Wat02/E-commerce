
let inputs = document.querySelectorAll('input')
let errors = {
    "ime_prezime": [],
    "korisnicko_ime": [],
    "email": [],
    "lozinka": [],
    "ponovi_lozinku": []
}

inputs.forEach(Element => {
    Element.addEventListener('change', e => {
        let currentInput = e.target
        let inputValue = currentInput.value
        let inputName = currentInput.getAttribute('name')


        if(inputValue.length > 4) {

            errors[inputName] = []

           switch(inputName) {
            case 'ime_prezime': 
           let validation = inputValue.trim()
            validation = validation.split(" ")
           if(validation.length < 2) {
            errors[inputName].push('you must write your first and last name')
        }

        break

        case 'email':
            if(!validateEmail(inputValue)) {
                errors[inputName].push('invalid e-mail address')
            }
  
            break
            

            case 'ponovi_lozinku':
                let lozinka = document.querySelector('input[name="lozinka"]').value
                if(inputValue !== lozinka) {
                    errors[inputName].push('passwords do not match')
                } 
                
                break

           }
        } else {
            errors[inputName] = ['the field cannot have less than 5 characters']
        }

        populationErors()
 
    })
})

const populationErors = () => {

    for(let elem of document.querySelectorAll('ul')) {
        elem.remove()
    }

    

    for(let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`)
        let parent$element = input.parentElement
        let errors$element = document.createElement('ul')
        parent$element.appendChild(errors$element)

        

        errors[key].forEach(error => {
            let li = document.createElement('li')
            li.innerText = error

            errors$element.appendChild(li)
        })



    }

     
}


const validateEmail = email => {

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true 
    }

    return false

}

AOS.init();