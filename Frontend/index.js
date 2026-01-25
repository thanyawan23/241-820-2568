function submitData() {
    let firstNameDOM = document.querySelector("input[name=firstname]");
    let lastNameDOM = document.querySelector("input[name=lastname]");
    let ageDOM = document.querySelector("input[name=age]");
    let genderDOM = document.querySelector("input[name=gender]:checked");
    let interestDOM = document.querySelectorAll("input[name=interest]:checked");
    let descriptionDOM = document.querySelector("textarea[name=description]");
    
    let interests = '';
    for (let i = 0; i < interestDOM.length; i++) {
        interests += interestDOM[i].value + ' ';
        if (i !== interestDOM.length - 1) {
            interests += ', ';
        }
    }   

    let userData = {
        firstName: firstNameDOM ? firstNameDOM.value : '',
        lastName: lastNameDOM ? lastNameDOM.value : '',
        age: ageDOM.value,
        gender: genderDOM.value,
        descriptionDOM: descriptionDOM.value
    }
    console.log('submit data', userData);
}