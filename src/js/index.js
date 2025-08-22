const text = document.getElementById('sub')
const textAnimation = (element)=> {
    const textArray = element.innerHTML.split('')
    element.innerHTML = ''
    textArray.forEach((letter, index)=>{
        setTimeout(()=>{
            element.innerHTML += letter
        },100*index)
    })
}
textAnimation(text)
