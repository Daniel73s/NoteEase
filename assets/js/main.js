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

// const createButton = (nombre, idfila) => {
//     const btn = document.createElement('button');
//     btn.classList.add('btn', 'btn-danger', 'btn-sm');
//     btn.textContent = nombre;
//     btn.addEventListener('click', () => {
//         const fila = document.querySelector(`#${idfila}`);
//         fila.remove();
//         calcular_notas_item();
//     });
//     return btn;
// }

const eliminar_fila = () => {
    const tabla_modal = document.querySelector('#table_modal');
    const cantidadFilas = tabla_modal.rows.length;
    if (cantidadFilas == 0) {
        Swal.fire({
            title: 'Error',
            text: 'No existen notas para eliminar',
            icon: 'error',
            confirmButtonText: 'ok'
        });

        return
    }
    const fila = document.querySelector(`#id-${cantidadFilas - 1}`);
    fila.remove();
    calcular_notas_item();
}


const agregar_fila_nota = () => {
    const tabla_modal = document.querySelector('#table_modal');
    const tr_Total = document.getElementsByName('nota');
    const tr = document.createElement('tr');
    tr.setAttribute('id', `id-${tr_Total.length}`);
    const td = document.createElement('td');
    td.appendChild(createInput(0));
    tr.appendChild(td);
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
        suma += Number(nota.value);
    });

    nota_calculada.textContent = ((suma / notas.length) * Number(porcentaje_item.value)) / 100;
    // console.log(((suma / notas.length) * Number(porcentaje_item.value)) / 100, ' esta es la suma de las notas');
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
            text: `El porcentaje ingresado debe ser menor o igual a ${100 - porcentaje_actual()}`,
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
    const h3 = document.createElement('h3');
    h3.textContent = calcular_notas_item();
    h3.setAttribute('name', 'item');
    td.appendChild(h3);
    const tr = tabla.tBodies[0];
    tr.appendChild(td);

    items.push({
        nombre: nombre_item.value,
        porcentaje: porcentaje.value
    });
    tabla.appendChild(tr);
    if (Number(porcentaje_actual()) == 100) {
        const bnt_pro = document.querySelector('#btn-pro');
        bnt_pro.classList.remove('d-none');
    }
    reset();
}


const reset = () => {
    porcentaje_item.value = 0;
    const tabla_modal = document.querySelector('#table_modal');
    const cantidadFilas = tabla_modal.rows.length;
    for (let i = 0; i < cantidadFilas; i++) {
        let tr = document.querySelector(`#id-${i}`);
        tr.remove();
    }
    calcular_notas_item();
    const btn_add = document.querySelector('#btn-add-fila');
    btn_add.classList.add('disabled');
}


const calcular_items = () => {
    const h3_array = document.getElementsByName('item');
    let suma = 0;
    h3_array.forEach(e => {
        suma += Number(e.textContent);
    });

    const alert = document.querySelector('#alert-html');
    const mensaje = document.querySelector('#mensaje');
    if (suma >= 80) {
        Swal.fire({
            title: 'Felicidades!!!',
            text: 'Te eximiste en la materia',
            icon: 'success',
            confirmButtonText: 'ok'
        });
    } else if (suma >= 51) {
        mensaje.textContent=`Felicidades Entraste a 1ra mesa con ${Math.round(suma)} puntos`;
        alert.classList.remove('d-none');
        alert.appendChild(mensaje);
    } else if (suma >= 40) {
        mensaje.textContent=`Entraste a 2da mesa con ${Math.round(suma)} puntos`;
        alert.classList.remove('d-none');
        alert.classList.remove('alert-primary');
        alert.classList.add('alert-warning');
        alert.appendChild(mensaje);
    } else if (suma <= 39) {
        mensaje.textContent=`Has Reprobado la materia con ${Math.round(suma)} puntos`;
        alert.classList.remove('d-none');
        alert.classList.remove('alert-primary');
        alert.classList.add('alert-danger');
        alert.appendChild(mensaje);
    }

}

