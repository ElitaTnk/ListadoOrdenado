const A = [{
    "id": 1,
    "nombre": "Juan",
    "apellido": "Perez",
  },
  {
    "id": 2,
    "nombre": "Cosme",
    "apellido": "Fulanito",
  },
];

const B = [
  {
    "id": 3,
    "nombre": "Juan",
    "apellido": "Perez",
  },
  {
    "id": 4,
    "nombre": "Jane",
    "apellido": "Doe",
  },
];

const C = [{
    "personaId": "1",
    "calle": "Lavalle",
    "altura": "150",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
    "pais": "Argentina",
  },
  {
    "personaId": "3",
    "calle": "Av. del Libertador",
    "altura": "13900",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
    "pais": "Argentina",
  },
];

const D = [
	{
    "personaId": "2",
    "calle": "Peron",
    "altura": "1500",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
    "pais": "Argentina",
  },
];


const E = [
  {
    "codigoPostal": "1047",
    "calle": "Lavalle",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
  },
  {
    "codigoPostal": "1125",
    "calle": "Peron",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
  },
  {
    "codigoPostal": "1047",
    "calle": "Av. del Libertador",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
  },
];

// default
const F = {
  "calle": "Calle Falsa",
  "altura": "123",
  "ciudad": "Azul",
  "provincia": "Buenos Aires",
  "pais": "Argentina",
};

function checkYAgregar(persona, arr) {
  const found = arr.some(function (el) {
    return el.nombre === persona.nombre && el.apellido === persona.apellido;
  });
  if (!found) { arr.push({...persona}); }
}

function limpiarLista(a, b) {
	const lista = [...a, ...b];
  let finalLista = [];

	lista.forEach(function(element) {
		checkYAgregar(element,finalLista)
  });
	return finalLista;
}

function armarListado(personas) {
  return personas.map(persona => {
    const direccion = buscarDireccion(persona);
    const codigoPostal = buscarCP(direccion);

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
  return personas.sort((obj1, obj2) => {
  	const valueA = obj1[sortingProperty];
    const valueB = obj2[sortingProperty];

    return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
  });
}

function buscarDireccion(persona) {
  return C.find(p => p.personaId == persona.id) || D.find(p => p.personaId == persona.id) || F;
}

function buscarCP(direccion) {
  return E.find(dir => {
    	return dir.calle === direccion.calle && dir.ciudad === direccion.ciudad && dir.provincia === direccion.provincia;
    });
}

function generarListado2(sortingProperty) {
  const personas = limpiarLista(A, B);
  const personasConDireccion = armarListado(personas);
  const personasOrdenadas = ordenarPersonas(personasConDireccion, sortingProperty);

  return personasOrdenadas;
}





const listado = generarListado2("nombre");
console.log(JSON.stringify(listado));
