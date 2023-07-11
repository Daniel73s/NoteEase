// variable que va a contener el nombre de los items y su porcentaje
var items = [];
//Referencia a los elementos html 
const nombre_item = document.querySelector('#item-name');
const porcentaje_item = document.querySelector('#porcentaje');
var tabla = document.querySelector('#table_id');

porcentaje_item.addEventListener('keyup', (event) => {
    const btn_add = document.querySelector('#btn-add-fila');
    if (Number(event.target.value) > 0) {
        btn_add.classList.remove('disabled');
    } else {
        btn_add.classList.add('disabled');
    }
    calcular_notas_item();
})

const porcentaje_actual = () => {
    return items.reduce((acumulador, item) => {
        return Number(acumulador) + Number(item.porcentaje);
    }, 0);
}

// //escuchando el evento click del boton
// boton_add_item.addEventListener('click', function () {
//     if (Number(porcentaje_actual()) + Number(porcentaje_item.value) > 100 || Number(porcentaje_item.value) == 0) {
//         Swal.fire({
//             title: 'Error',
//             text: 'El porcentaje no debe pasar de 100 y no debe ser 0',
//             icon: 'error',
//             confirmButtonText: 'reintentar'
//         })
//         return
//     } else {
//         additem(nombre_item.value, porcentaje_item.value);
//         items.push({
//             nombre: nombre_item.value,
//             porcentaje: porcentaje.value
//         });
//         console.log(items);
//     }
//     //limpiando los campos de nombre y porcentaje
//     nombre_item.value = '';
//     porcentaje_item.value = 100 - Number(porcentaje_actual());
// });


// //funcion para adicionar columna
// function additem(nombreColumna, porcentaje) {
//     const tabla = document.querySelector('#table_id');
//     const nuevaCabecera = document.createElement('th');
//     nuevaCabecera.textContent = `${nombreColumna} (${porcentaje}%)`;
//     const filaEncabezado = tabla.tHead.rows[0];
//     filaEncabezado.appendChild(nuevaCabecera);

//     const nuevaCelda = document.createElement('td');
//     nuevaCelda.appendChild(createInput());
//     const filaBody = tabla.tBodies[0];
//     filaBody.appendChild(nuevaCelda);
// }



// const createInput = () => {
//     //creacion de un elemento input 
//     const input = document.createElement('input');
//     input.setAttribute('type', 'number');
//     input.setAttribute('name', 'input_items');
//     input.setAttribute('max', '100');
//     input.classList.add('form-control');
//     input.value = 0;
//     input.addEventListener('keyup', calcular_Promedio);
//     return input
// }

// const calcular_Promedio = (event) => {
//     const respuesta = document.querySelector('#resp');
//     const lista_input = document.getElementsByName('input_items');
//     let total_suma = 0;
//     lista_input.forEach(input => {
//         total_suma += Number(input.value);
//     });

//     console.log('se presiono el boton', total_suma);
//     respuesta.textContent = total_suma;

//     // const valor = event.target.value;
//     // respuesta.textContent = valor;
//     // console.log('entro a la funcion y se ejecuto', valor);
// }



////////////////////////////////////////////////////////////////////
////////////FUNCIONES PARA AGREGAR NOTAS DE UN ITEM ////////////////
////////////////////////////////////////////////////////////////////

const createInput = (valor) => {
    const input = document.createElement('input');
    input.setAttribute('placeholder', 'ingrese nota');
    input.setAttribute('name', 'nota');
    input.setAttribute('type', 'number');
    input.value = valor;
    input.classList.add('form-control', 'mb-2');
    input.addEventListener('keyup', () => {
        calcular_notas_item();
    })
    return input;
}

const createButton = (nombre, idfila) => {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-danger', 'btn-sm');
    btn.textContent = nombre;
    btn.addEventListener('click', () => {
        const fila = document.querySelector(`#${idfila}`);
        fila.remove();
        calcular_notas_item();
    });
    return btn;
}


const agregar_fila_nota = () => {
    const tabla_modal = document.querySelector('#table_modal');
    const tr_Total = document.getElementsByName('nota');
    const tr = document.createElement('tr');
    tr.setAttribute('id', `id-${tr_Total.length}`);
    const td = document.createElement('td');
    const td_btn = document.createElement('td');
    td.appendChild(createInput(0));
    td_btn.appendChild(createButton('Eliminar', `id-${tr_Total.length}`));
    tr.appendChild(td);
    tr.appendChild(td_btn);
    tabla_modal.appendChild(tr);
    calcular_notas_item();
}

const calcular_notas_item = () => {
    const notas = document.getElementsByName('nota');
    const nota_calculada = document.querySelector('#nota_cal');
    if (notas.length == 0) {
        nota_calculada.textContent = 0;
        return
    }

    let suma = 0;
    notas.forEach(nota => {
        console.log(nota.value);
        suma += Number(nota.value);
    });

    nota_calculada.textContent = ((suma / notas.length) * Number(porcentaje_item.value)) / 100;
    console.log(((suma / notas.length) * Number(porcentaje_item.value)) / 100, ' esta es la suma de las notas');

    return ((suma / notas.length) * Number(porcentaje_item.value)) / 100;
}

const adicionar_item = () => {
    const total_cal = document.querySelector('#nota_cal');
    if (Number(total_cal.textContent) <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'la nota no puede ser menor o igual a cero 0',
            icon: 'error',
            confirmButtonText: 'ok'
        });
        return
    }


    if (Number(porcentaje_actual()) + Number(porcentaje_item.value) > 100) {
        Swal.fire({
            title: 'Error',
            text: `El porcentaje ingresado debe ser menor o igual a ${100-porcentaje_actual()}`,
            icon: 'error',
            confirmButtonText: 'ok'
        });
        return
    }


    const thead = document.createElement('th');
    thead.textContent = `${nombre_item.value} (${porcentaje_item.value}%)`;
    const filaEncabezado = tabla.tHead.rows[0];
    filaEncabezado.appendChild(thead);

    const td = document.createElement('td');
    td.appendChild(createInput(calcular_notas_item()));
    const tr = tabla.tBodies[0];
    tr.appendChild(td);

    porcentaje_item.value=0;
    items.push({
        nombre: nombre_item.value,
        porcentaje: porcentaje.value
    });
    console.log(items);

}


















// function addfila() {
//     const tabla = document.querySelector('#table_id');
//     const nuevaFila = document.createElement('tr');
//     items.forEach((e, index) => {
//         const nuevaCelda1 = document.createElement('td');
//         nuevaCelda1.textContent = `Dato ${index}`;
//         nuevaFila.appendChild(nuevaCelda1);
//     })
//     tabla.appendChild(nuevaFila);

// }

    // const filas = tabla.getElementsByTagName('tr');

    // for (let i = 0; i < filas.length; i++) {
    //     const nuevaCelda = document.createElement('td');
    //     nuevaCelda.textContent = 'Nuevo Valor';
    //     filas[i].appendChild(nuevaCelda);
    // }


