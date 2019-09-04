
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  // Estos datos seran proporcionados al momento en que se crea la aplicación en Firebase
  apiKey: '',
  authDomain: '',
  projectId: ''
});

// Da inicio a la base de datos
var db = firebase.firestore();

// Agregar Documentos
// Cuando se presione el boton guardar se llamara esta función
function guardar(){
    // Se crean la variables que van a obtener los valores a ingresar

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellidos').value;
    var fecha = document.getElementById('fecha').value;
    var codigo = document.getElementById('codigo').value;

    db.collection("users").add({
        Nombre: nombre,
        Apellido: apellido,
        Fecha: fecha,
        Codigo: codigo
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        // Se dejan los campos en blanco
        document.getElementById('nombre').value = "";
        document.getElementById('apellidos').value = "";
        document.getElementById('fecha').value = "";
        document.getElementById('codigo').value = "";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// Leer documentos
// Creamos la variable tabla
var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {
    // Vaciamos la tabla
    tabla.innerHTML = '';
    // Se comienza a recorrer la base de datos
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Nombre}`);
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().Apellido}</td>
            <td>${doc.data().Fecha}</td>
            <td>${doc.data().Codigo}</td>
            <td><button class="btn btn-warning" onClick="editar('${doc.id}','${doc.data().Nombre}','${doc.data().Apellido}', '${doc.data().Fecha}',
            '${doc.data().Codigo}')">Editar</button></td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>`
    });
});


// Eliminar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


// Actualizar Documentos
function editar(id, nombre, apellido, fecha, codigo){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellidos').value = apellido;
    document.getElementById('fecha').value = fecha;
    document.getElementById('codigo').value = codigo;

    var guardar = document.getElementById('guardar');
    guardar.innerHTML = 'Editar';

    guardar.onclick = function(){
        
        // Se Accede a la base de datos y al id especifico
        var washingtonRef = db.collection("users").doc(id);

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellidos').value;
        var fecha = document.getElementById('fecha').value;
        var codigo = document.getElementById('codigo').value;

        // Datos a actualizar
        return washingtonRef.update({
            Nombre: nombre,
            Apellido: apellido,
            Fecha: fecha,
            Codigo: codigo
        })
        .then(function() {
        console.log("Document successfully updated!");
        guardar.innerHTML = 'Guardar';

        // Volvemos a vaciar los campos
        document.getElementById('nombre').value = '';
        document.getElementById('apellidos').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('codigo').value = '';

        })
        .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        });
    }
}


