const por_ec = document.querySelector('#p-ec');
var por_mesa = document.querySelector('#p-mesa');

const nota_ec = document.querySelector('#nota-ec');
const nota_mesa = document.querySelector('#nota-mesa');

const nota_final=document.querySelector('#nota-final');


por_mesa.addEventListener('keyup', (event) => {
    const valor = Number(event.target.value);
    por_ec.value = 100 - valor;
})


nota_ec.addEventListener('keyup', (event) => {
    const nota = Number(event.target.value);
    nota_final.textContent=((nota * Number(por_ec.value))/100)+((Number(nota_mesa.value) * Number(por_mesa.value))/100);
})

nota_mesa.addEventListener('keyup', (event) => {
    const nota = Number(event.target.value);
    nota_final.textContent=((nota * Number(por_mesa.value))/100)+((Number(nota_ec.value) * Number(por_ec.value))/100);
});

