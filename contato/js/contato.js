// Cada img representa as fotos dos TechNerds na primeira section, no topo da página!
const img1 = document.querySelector('#davi')
const img2 = document.querySelector('#gabi')
const img3 = document.querySelector('#luana')
const img4 = document.querySelector('#luth')
const img5 = document.querySelector('#pedro')

// Cada div é um card de perfil TechNerd
const div1 = document.querySelector('.div1')
const div2 = document.querySelector('.div2')
const div3 = document.querySelector('.div3')
const div4 = document.querySelector('.div4')
const div5 = document.querySelector('.div5')

// Cada addEventListener faz com que: ao clicar em uma foto de um integrante do time Technerd, a página rola para o card e seu perfil.
img1.addEventListener('click', function() {
    div1.scrollIntoView(true)
})

img2.addEventListener('click', function() {
    div2.scrollIntoView(true)
})
img3.addEventListener('click', function() {
    div3.scrollIntoView(true)
})
img4.addEventListener('click', function() {
    div4.scrollIntoView(true)
})
img5.addEventListener('click', function() {
    div5.scrollIntoView(true)
})