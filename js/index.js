const size = document.querySelector('#size');
let sizeValue;

size.addEventListener('input', () => {
    sizeValue = size.value;
})

const generate = document.querySelector('#generate');
generate.addEventListener('click', () => {
    if(sizeValue) {
        console.log("Generate");
        localStorage.setItem('size', sizeValue);
    }
})