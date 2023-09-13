/*1. Inicia una promesa que se resuelva después de 2 segundos con un número aleatorio entre 1 y 100.
Luego, toma ese número y crea una segunda promesa que se resuelva después de 3 segundos con el resultado de 
elevar ese número al cuadrado.
Finalmente, toma el resultado de la segunda promesa y crea una tercera promesa que se resuelva después de 1 
segundo con la raíz cuadrada del número resultante.
*/
function numAleatorio() {
    return new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random() * 101)), 2000));
}

function elevar(num) {
    return new Promise(resolve => setTimeout(() => resolve(num * num), 3000));
}

function raiz(num) {
    return new Promise(resolve => setTimeout(() => resolve(Math.sqrt(num)), 1000));
}

numAleatorio()
    .then(elevar)
    .then(raiz)
    .then(result => {
        console.log("Resultado del Ejercicio 1:", result);
    })
    .catch(error => {
        console.error("Error en el Ejercicio 1:", error);
    });

/*Ejercicio 2
Crea una función que realice las siguientes tareas:

Recibe un array de URLs como argumento.
Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.

*/
function peticionUrl(arreglo) {
    return Promise.all(arreglo.map(url => fetch(url).then(res => res.json())));
}

const arregloUrls = ["https://reqres.in/api/users?page=2"];
peticionUrl(arregloUrls)
    .then(results => {
        console.log("Resultado del Ejercicio 2:", results);
    })
    .catch(error => {
        console.error("Error en el Ejercicio 2:", error);
    });


/*3
Crea una función que realice las siguientes tareas:

Recibe un array de funciones que devuelven promesas como argumento.
Ejecuta todas las funciones en paralelo y espera a que todas las promesas se resuelvan.
Devuelve una promesa que se resuelva con un array de los resultados de todas las promesas.

*/ 
function promesasParalelo(funciones) {
    return Promise.all(funciones.map(fn => fn()));
}

const funcionesE = [
    () => Promise.resolve("Promesa num1"),
    () => Promise.resolve("Promesa num2"),
    () => Promise.resolve("Promesa num3")
];

promesasParalelo(funcionesE)
    .then(results => {
        console.log("Resultado Ejercicio 3:", results);
    })
    .catch(error => {
        console.error("Error en el Ejercicio 3:", error);
    });

/*4
Crea una función que realice las siguientes tareas:

Recibe un número n como argumento.
Utiliza un bucle para crear una cadena de promesas, donde cada promesa se resuelve después de N segundos con el 
número actual en el bucle.
Cada promesa debe imprimir el número en la consola antes de resolverse.
Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje "Todas las promesas se 
resolvieron".

*/
function cadenaPromesas(n) {
    let promise = Promise.resolve();
    for (let i = 1; i <= n; i++) {
        promise = promise.then(() => new Promise(resolve => {
            setTimeout(() => {
                console.log(i);
                resolve();
            }, n * 1000);
        }));
    }
    return promise.then(() => "Todas las promesas se resolvieron");
}

cadenaPromesas(2)
    .then(message => {
        console.log("Resultado del Ejercicio 4:", message);
    })
    .catch(error => {
        console.error("Error en el Ejercicio 4:", error);
    });



/*5.
Crea una función que realice las siguientes tareas:

Inicia una promesa que se resuelva después de 5 segundos con un mensaje.
Si se llama a una función cancel antes de que se cumplan los 5 segundos, la promesa debe rechazarse con el 
mensaje "Promesa cancelada".

*/

function cancelarPromesa() {
    let cancelar;
    const promise = new Promise((resolve, reject) => {
        const tiempo = setTimeout(() => resolve("Promesa que si se resuelve"), 5000);
        cancelar = () => {
            clearTimeout(tiempo);
            reject("Promesa cancelada");
        };
    });
    return { promise, cancel: cancelar };
}

const { promise, cancel } = cancelarPromesa();
promise
    .then(message => {
        console.log("Resultado del Ejercicio 5:", message);
    })
    .catch(error => {
        console.error("Error en el Ejercicio 5:", error);
    });
setTimeout(() => cancel(), 3000);
