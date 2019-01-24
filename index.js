const request = async (endpoint) => {
  let response = await fetch(`https://my-json-server.typicode.com/ElitaTnk/ListadoOrdenado/${endpoint}`);

  let data = await response.json()
  return data;
}

// default
const F = {
  "calle": "Calle Falsa",
  "altura": "123",
  "ciudad": "Azul",
  "provincia": "Buenos Aires",
  "pais": "Argentina",
};

function checkYAgregar(persona, arr) {
  const found = arr.some(function(el) {
    return el.nombre === persona.nombre && el.apellido === persona.apellido;
  });
  if (!found) {
    arr.push({ ...persona
    });
  }
}


async function limpiarLista() {
  const a = await request('listPersonaA');
  const b = await request('listPersonaB');
  const lista = [...a, ...b];
  let finalLista = [];

  lista.forEach(function(element) {
    checkYAgregar(element, finalLista)
  });
	
  return finalLista;
}

async function armarListado(personas) {
  return personas.map(async (persona) => {
    const direccion = await buscarDireccion(persona);
    const codigoPostal = await buscarCP(direccion);

    direccion.codigoPostal = codigoPostal ? codigoPostal.codigoPostal : null;

    direccion.calleAltura = direccion.calle + direccion.altura;
    delete direccion.calle;
    delete direccion.altura;
    delete direccion.personaId;

    persona.direccion = direccion;
    return persona;
  });
}

 function ordenarPersonas(personas, sortingProperty = "id") {
  return personas.sort( (obj1, obj2) => {
    const valueA =  obj1[sortingProperty];
    const valueB =  obj2[sortingProperty];
	return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
  });
}

async function buscarDireccion(persona) {
  const c = await request('listaDireccionC');
  const personInC = c.find(p => p.personaId == persona.id);
  let personInD = null;

  if (!personInC) {
    const d = await request('listaDireccionD');
    personInD = d.find(p => p.personaId == persona.id);
  }

  return personInC || personInD || F;
}

async function buscarCP(direccion) {
  const e = await request('listaCP');
  return e.find(dir => {
    return dir.calle === direccion.calle && dir.ciudad === direccion.ciudad && dir.provincia === direccion.provincia;
  });
}

async function generarListado() {
  const personas = await limpiarLista();
  const personasConDireccion = await armarListado(personas);

	return personasConDireccion;
}



async function init() {
  const listado = await generarListado();

  Promise.all(listado).then((data) => {
  	let personasOrdenadas =  ordenarPersonas(data, "nombre");
    console.log(JSON.stringify(personasOrdenadas));
  });
}

init();
