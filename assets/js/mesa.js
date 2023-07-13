const por_ec = document.querySelector('#p-ec');
var por_mesa = document.querySelector('#p-mesa');

const nota_ec = document.querySelector('#nota-ec');
const nota_mesa = document.querySelector('#nota-mesa');

const nota_final = document.querySelector('#nota-final');


por_mesa.addEventListener('keyup', (event) => {
    const valor = Number(event.target.value);
    por_ec.value = 100 - valor;

    let n_mesa = (Number(nota_final.value) - ((Number(nota_ec.value) * Number(por_ec.value)) / 100)) / (valor / 100);
    nota_mesa.value = n_mesa.toFixed(2);
    if (Number(n_mesa) < 0) {
        nota_mesa.value = 0
    }
});

nota_final.addEventListener('keyup', (event) => {
    let notafinal = event.target.value;
    let n_mesa = (Number(notafinal) - ((Number(nota_ec.value) * Number(por_ec.value)) / 100)) / (Number(por_mesa.value) / 100);
    nota_mesa.value = n_mesa.toFixed(2);
    if (Number(n_mesa) < 0) {
        nota_mesa.value = 0
    }
});


nota_ec.addEventListener('keyup', (event) => {
    let notaEc = event.target.value;
    let n_mesa = (Number(nota_final.value) - ((Number(notaEc) * Number(por_ec.value)) / 100)) / (Number(por_mesa.value) / 100);
    nota_mesa.value=n_mesa.toFixed(2);
    if (Number(n_mesa) < 0) {
        nota_mesa.value = 0
    }
});


