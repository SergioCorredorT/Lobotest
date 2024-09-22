"use strict";

//----------------------------------
//	Funciones-herramienta Generales
//----------------------------------
function eliminarIndicesConContenidoDuplicados(array) {
	return [...new Set(array)];
}

function getPaginaVisibleSegunAlturaScroll(_idDivConScroll, _classPaginas = "pagina") {
	//Actualiza el input al número de página la cuál tenga mayor cantidad visible en pantalla
	const DIV_CON_SCROLL = document.querySelector("#" + _idDivConScroll);
	let nPaginaVisible = 1;
	let maxVisiblePercentage = 0;
	const PAGINAS = DIV_CON_SCROLL.querySelectorAll("." + _classPaginas);
	for (let i = 0; i < PAGINAS.length; i++) {
		const PAGINA_RECT = PAGINAS[i].getBoundingClientRect();
		const DIV_CON_SCROLL_RECT = DIV_CON_SCROLL.getBoundingClientRect();
		if (PAGINA_RECT.bottom >= DIV_CON_SCROLL_RECT.top && PAGINA_RECT.top <= DIV_CON_SCROLL_RECT.bottom) {
			const VISIBLE_HEIGHT = Math.min(PAGINA_RECT.bottom, DIV_CON_SCROLL_RECT.bottom) - Math.max(PAGINA_RECT.top, DIV_CON_SCROLL_RECT.top);
			const VISIBLE_PORCENTAJE = VISIBLE_HEIGHT / PAGINA_RECT.height;
			if (VISIBLE_PORCENTAJE > maxVisiblePercentage) {
				maxVisiblePercentage = VISIBLE_PORCENTAJE;
				nPaginaVisible = i + 1;
			}
		}
	}
	return nPaginaVisible;
}

function getVisibleElements(elements) {
	let visibleElements = [];
	elements.forEach(function (element) {
		if (window.getComputedStyle(element).display !== "none") {
			visibleElements.push(element);
		}
	});
	return visibleElements;
}

/**
 * Obtiene elementos del DOM por atributo y valor de atributo. Solo para un código más limpio pero gasta más recursos
 * @param {string} _atributo - El atributo por el cual buscar elementos (p. ej., "class", "tag", "name").
 * @param {string} [_valorAtributo=""] - El valor del atributo a buscar.
 * @returns {Array} Un array de elementos del DOM que coinciden con el atributo y valor de atributo especificados.
 */
function getElementos(_atributo, _valorAtributo = "") {
	//_atributo= class, tag, name, o incluso un atributo cualquiera que contenga un _valorAtributo
	//_valorAtributo= contenido del atributo a recoger
	let rsp = [];
	if (_valorAtributo != null && _atributo != null) {
		const selectores =
		{
			id: (id) => document.getElementById(id),
			class: (className) => document.getElementsByClassName(className),
			name: (name) => document.getElementsByName(name),
			tag: (tagName) => document.getElementsByTagName(tagName),
			default: (attribute, value) => document.querySelectorAll(`[${attribute}='${value}']`),
		};

		const selector = selectores[_atributo] || selectores.default;
		rsp = selector(_valorAtributo);
	}
	return rsp;
}

/**
 * Alterna entre clases CSS en elementos del DOM.
 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM a los que aplicar las clases CSS.
 * @param {Array|string} [_class=[]] - Las clases CSS a aplicar. Si se proporciona un array, se alternará entre las clases en el array. El valor "sinClass" equivale a quitar todos los class contenidos en el array al elemento
 * @param {boolean} [_igualarAl0=false] - Si es true, todos los elementos tendrán la misma clase que el primer elemento.
 */
function setToggleClass(_elementos, _class = [], _igualarAl0 = false) {
	let classAAplicar,
		interruptor = false;
	let classAAplicarAlIgualarAl0 = "";

	_elementos = pasarAArray(_elementos);

	for (let i = 0; i < _elementos.length; i++) {
		classAAplicar = "";

		if (Array.isArray(_class)) {
			for (let j = 0; j < _class.length && interruptor == false; j++) {
				if (_class[j] === "sinClass") {
					classAAplicar = "";
					break;
				}
				else if (_elementos[i].classList.contains(_class[j])) {
					interruptor = true;
					if ((j + 1) >= _class.length) {
						if (_igualarAl0 && i == 0) {
							classAAplicarAlIgualarAl0 = _class[0];
						}
						classAAplicar = _class[0];
					}
					else {
						if (_igualarAl0 && i == 0) {
							classAAplicarAlIgualarAl0 = _class[j + 1];
						}
						classAAplicar = _class[j + 1];
					}
				}
			}

			if (classAAplicar == "") {
				if (_igualarAl0 && i == 0) {
					classAAplicarAlIgualarAl0 = _class[0];
				}
				classAAplicar = _class[0];
			}

			if (_igualarAl0) {
				classAAplicar = classAAplicarAlIgualarAl0;
			}

			for (let j = 0; j < _class.length; j++) {
				if (_class[j] != classAAplicar) {
					_elementos[i].classList.remove(_class[j]);
				}
			}
		}
		else {
			classAAplicar = _class;
		}

		if (classAAplicar !== "") {
			_elementos[i].classList.add(classAAplicar);
		}
	}
}

/**
 * Convierte una variable a un array si no lo es ya.
 * @param {*} variable - La variable a convertir a un array.
 * @returns {Array} La variable convertida a un array.
 */
function pasarAArray(variable) {
	let rsp = variable;
	if (!Array.isArray(variable) && variable[Symbol.iterator]) {
		rsp = Array.from(variable);
	}
	else if (!Array.isArray(variable)) {
		rsp = [variable];
	}
	return rsp;
}

/**
 * Alterna entre valores CSS en elementos del DOM.
 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM a los que aplicar los valores CSS.
 * @param {string} _propiedadCSS - La propiedad CSS a cambiar.
 * @param {Array|string} [_valorOValoresCSS=[]] - Los valores CSS a aplicar. Si se proporciona un array, se alternará entre los valores en el array.
 * @param {boolean} [_importante=false] - Si es true, se aplicará el valor CSS con la marca "important".
 */
function setToggleValoresCSS(_elementos, _propiedadCSS, _valorOValoresCSS = [], _importante = false) {
	_elementos = pasarAArray(_elementos);

	for (let elemento of _elementos) {
		const VALOR_CSS = window.getComputedStyle(elemento).getPropertyValue(_propiedadCSS);
		let valorCSSAAplicar = "";

		if (Array.isArray(_valorOValoresCSS)) {
			let indice = _valorOValoresCSS.indexOf(VALOR_CSS);
			if (indice !== -1) {
				valorCSSAAplicar = _valorOValoresCSS[(indice + 1) % _valorOValoresCSS.length];
			}
			else {
				valorCSSAAplicar = _valorOValoresCSS[0];
			}
		}
		else {
			valorCSSAAplicar = _valorOValoresCSS;
		}

		elemento.style.setProperty(_propiedadCSS, valorCSSAAplicar, _importante ? "important" : "");
	}
}

function setToggleValoresCSSPorId(_ids, _propiedadCSS, _valorOValoresCSS = [], _importante = false) {
	_ids = pasarAArray(_ids);
	let elementos = [],
		idElemento,
		elementoId;

	for (let i = 0; i < _ids.length; i++) {
		idElemento = _ids[i];
		elementoId = document.getElementById(idElemento);
		if (elementoId) {
			elementos.push(elementoId);
		}
	}

	for (let elemento of elementos) {
		const VALOR_CSS = window.getComputedStyle(elemento).getPropertyValue(_propiedadCSS);
		let valorCSSAAplicar = "";

		if (Array.isArray(_valorOValoresCSS)) {
			let indice = _valorOValoresCSS.indexOf(VALOR_CSS);
			if (indice !== -1) {
				valorCSSAAplicar = _valorOValoresCSS[(indice + 1) % _valorOValoresCSS.length];
			}
			else {
				valorCSSAAplicar = _valorOValoresCSS[0];
			}
		}
		else {
			valorCSSAAplicar = _valorOValoresCSS;
		}

		elemento.style.setProperty(_propiedadCSS, valorCSSAAplicar, _importante ? "important" : "");
	}
}

/**
 * Alterna entre valores de atributos en elementos del DOM.
 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM a los que aplicar los valores de atributos.
 * @param {string} _atributo - El atributo a cambiar.
 * @param {Array|string} [_valorOValoresAtributo=[]] - Los valores de atributos a aplicar. Si se proporciona un array, se alternará entre los valores en el array.
 */
function setToggleValoresAtributo(_elementos, _atributo, _valorOValoresAtributo = []) {
	_elementos = pasarAArray(_elementos);

	for (let elemento of _elementos) {
		let valorAtributo = elemento.getAttribute(_atributo);

		if (Array.isArray(_valorOValoresAtributo)) {
			let indice = _valorOValoresAtributo.indexOf(valorAtributo);
			if (indice !== -1) {
				valorAtributo = _valorOValoresAtributo[(indice + 1) % _valorOValoresAtributo.length];
			}
			else {
				valorAtributo = _valorOValoresAtributo[0];
			}
		}
		else {
			valorAtributo = _valorOValoresAtributo;
		}

		elemento.setAttribute(_atributo, valorAtributo);
	}
}

function setToggleValoresAtributoPorId(_ids, _atributo, _valorOValoresAtributo = []) {
	_ids = pasarAArray(_ids);
	let elementos = [],
		idElemento,
		elementoId;

	for (let i = 0; i < _ids.length; i++) {
		idElemento = _ids[i];
		elementoId = document.getElementById(idElemento);
		if (elementoId) {
			elementos.push(elementoId);
		}
	}

	for (let elemento of elementos) {
		let valorAtributo = elemento.getAttribute(_atributo);

		if (Array.isArray(_valorOValoresAtributo)) {
			let indice = _valorOValoresAtributo.indexOf(valorAtributo);
			if (indice !== -1) {
				valorAtributo = _valorOValoresAtributo[(indice + 1) % _valorOValoresAtributo.length];
			}
			else {
				valorAtributo = _valorOValoresAtributo[0];
			}
		}
		else {
			valorAtributo = _valorOValoresAtributo;
		}

		elemento.setAttribute(_atributo, valorAtributo);
	}
}

/**
 * Agrega o elimina un atributo en elementos del DOM.
 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM a los que agregar o eliminar el atributo.
 * @param {string} _atributo - El atributo a agregar o eliminar.
 * @param {number} [_funcion=2] - La función a realizar: 0 para eliminar el atributo, 1 para agregar el atributo, 2 para alternar entre agregar y eliminar el atributo.
 */
function setRemoveAtributo(_elementos, _atributo, _funcion = 2) {
	_elementos = pasarAArray(_elementos);

	for (let i = 0; i < _elementos.length; i++) {
		const funciones =
		{
			0: (elemento, atributo) => {
				if (elemento.hasAttribute(atributo)) {
					elemento.removeAttribute(atributo);
				}
			},
			1: (elemento, atributo) => {
				elemento.setAttribute(atributo, "");
			},
			2: (elemento, atributo) => {
				if (elemento.hasAttribute(atributo)) {
					elemento.removeAttribute(atributo);
				}
				else {
					elemento.setAttribute(atributo, "");
				}
			},
		};

		const funcion = funciones[_funcion] || funciones.default;
		funcion(_elementos[i], _atributo);
	}
}

/**
 * Obtiene el valor de un atributo de un elemento del DOM.
 * @param {string} _atributo - El atributo por el cual buscar el elemento (p. ej., "class", "tag", "name").
 * @param {string} _valorAtributo - El valor del atributo a buscar.
 * @param {string} _atributoAVer - El atributo cuyo valor se desea obtener.
 * @returns {*} El valor del atributo especificado en el elemento encontrado.
 */
function getValorAtributo(_atributo, _valorAtributo, _atributoAVer) {
	const elementos =
	{
		id: (valor) => document.getElementById(valor),
		class: (valor) => document.getElementsByClassName(valor)[0],
		name: (valor) => document.getElementsByName(valor)[0],
		tag: (valor) => document.getElementsByTagName(valor)[0],
		default: (valor) => document.querySelector(`[${_atributo}='${valor}']`),
	};
	const elemento = elementos[_atributo] || elementos.default;
	return elemento(_valorAtributo).getAttribute(_atributoAVer);
}

/**
 * Obtiene el valor de una propiedad CSS de un elemento del DOM.
 * @param {string} _atributo - El atributo por el cual buscar el elemento (p. ej., "class", "tag", "name").
 * @param {string} _valorAtributo - El valor del atributo a buscar.
 * @param {string} _propiedadCSS - La propiedad CSS cuyo valor se desea obtener.
 * @param {string} [_porcentajeWidthHeight=""] - Si se especifica "width" o "height", se devuelve el ancho o alto del elemento en porcentaje en lugar del valor de la propiedad CSS.
 * @returns {*} El valor de la propiedad CSS especificada en el elemento encontrado.
 */
function getValorCSS(_atributo, _valorAtributo, _propiedadCSS, _porcentajeWidthHeight = "") {
	let rsp;
	let elemento;
	let CSSElemento;

	const selectores =
	{
		id: `#${_valorAtributo}`,
		class: `.${_valorAtributo}`,
		name: `[name='${_valorAtributo}']`,
		tag: _valorAtributo,
	};

	elemento = document.querySelector(selectores[_atributo] || `[${_atributo}='${_valorAtributo}']`);

	CSSElemento = window.getComputedStyle(elemento);
	rsp = CSSElemento.getPropertyValue(_propiedadCSS);

	if (_porcentajeWidthHeight === "width") {
		rsp = (elemento.clientWidth * 100) / elemento.parentElement.clientWidth;
	}
	if (_porcentajeWidthHeight === "height") {
		rsp = (elemento.clientHeight * 100) / elemento.parentElement.clientHeight;
	}

	return rsp;
}

/**
 * Obtiene el valor de una propiedad CSS de un elemento del DOM.
 * @param {HTMLElement} _elemento - El elemento del DOM del cual obtener el valor de la propiedad CSS.
 * @param {string} _propiedadCSS - La propiedad CSS cuyo valor se desea obtener.
 * @param {string} [_comodin=""] - Si se especifica "width" o "height", se devuelve el ancho o alto del elemento en porcentaje en lugar del valor de la propiedad CSS.
 * @returns {*} El valor de la propiedad CSS especificada en el elemento proporcionado.
 */
function getValorCSS2(_elemento, _propiedadCSS, _comodin = "") {
	let rsp,
		CSSElemento;

	//Recuerda que las 2 siguientes líneas pueden recoger el valor de la propiedad CSS aunque no se le haya cambiado antes ni atribuido en con el atributo style en el html
	CSSElemento = window.getComputedStyle(_elemento);
	rsp = CSSElemento.getPropertyValue(_propiedadCSS);

	//Recuerda que getComputedStyle guarda los valores en px, o que getPropertyValue recoge valores en px
	if (_comodin == "width") {//En porcentaje si recibe tercer parámetro width o height según el parámetro segundo
		rsp = (_elemento.clientWidth * 100) / _elemento.parentElement.clientWidth;
	}
	if (_comodin == "height") {
		rsp = (_elemento.clientHeight * 100) / _elemento.parentElement.clientHeight;
	}
	if (_propiedadCSS == "transform" && _comodin == "scale") {
		if (rsp != "none") {
			let scale = rsp.split("(")[1].split(")")[0].split(",");
			rsp = scale[0];
		}
		else {
			rsp = 1;
		}
	}

	return rsp;
}

/**
 * Convierte una cadena en formato data URL a un objeto Blob.
 * @param {string} dataurl - La cadena en formato data URL a convertir.
 * @returns {Blob} Un objeto Blob que representa los datos de la cadena data URL.
 */
function dataURLtoBlob(dataurl) {
	const ARR = dataurl.split(','),
		mime = ARR[0].match(/:(.*?);/)[1],
		bstr = atob(ARR[1]);
	let n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}

/**
 * Convierte un elemento de imagen a un objeto Blob.
 * @param {HTMLImageElement} image - El elemento de imagen a convertir.
 * @returns {Promise<Blob>} Una promesa que se resuelve con un objeto Blob que representa los datos de la imagen.
 */
function imageToBlob(image) {
	const CANVAS = document.createElement('canvas');
	CANVAS.width = image.width;
	CANVAS.height = image.height;
	const CTX = CANVAS.getContext('2d');
	CTX.drawImage(image, 0, 0);
	return new Promise(function (resolve, reject) {
		CANVAS.toBlob(function (blob) {
			resolve(blob);
		});
	});
}

/**
 * Obtiene objetos Blob a partir de un array de elementos de imagen.
 * @param {Array|NodeList|HTMLCollection} images - Los elementos de imagen a convertir en objetos Blob.
 * @returns {Promise<Array<Blob>>} Una promesa que se resuelve con un array de objetos Blob que representan los datos de las imágenes.
 */
async function getBlobsFromImages(images) {
	// Crea un array de promesas para convertir cada imagen en un objeto Blob
	const BLOB_PROMISES = Array.from(images).map(async (img) => {
		// Comprobar si la posición del array está vacía o contiene los valores null o undefined
		if (img == null || typeof img == undefined) {
			// La posición del array está vacía o contiene los valores null o undefined
			// No procesar esta posición y devolver null
			return null;
		}
		else {
			// La posición del array contiene una imagen
			// Procesar la imagen y convertirla en un objeto Blob
			const RESPONSE = await fetch(img.src);
			const BLOB = await RESPONSE.blob();
			return BLOB;
		}
	});

	// Espera a que todas las promesas se resuelvan y filtra el array para eliminar las posiciones vacías o con valores null o undefined
	const BLOBS = (await Promise.all(BLOB_PROMISES)).filter(blob => blob != null);

	// Devuelve el array filtrado de objetos Blob
	return BLOBS;
}

/**
 * Comprueba el tipo de un parámetro.
 * @param {*} param - El parámetro a comprobar.
 * @returns {string|number} Si el parámetro es una cadena en formato data URL, devuelve "dataURL". Si el parámetro es un elemento de imagen, devuelve "img". En caso contrario, devuelve 0.
 */
function checkParameterType(param) {
	if (typeof param === 'string' && param.startsWith('data:')) {
		return "dataURL";
	}
	else if (param instanceof HTMLElement && param.tagName === 'IMG') {
		return "img";
	}
	else {
		return 0;
	}
}

function addEvent(elementoOElementos, evento, funcion) {
	if (Array.isArray(elementoOElementos)) {
		for (let i = 0; i < elementoOElementos.length; i++) {
			if (elementoOElementos[i].attachEvent)
				elementoOElementos[i].attachEvent('on' + evento, funcion);
			else
				elementoOElementos[i].addEventListener(evento, funcion, false);
		}
	}
	else {
		if (elementoOElementos.attachEvent) {
			elementoOElementos.attachEvent('on' + evento, funcion);
		}
		else {
			elementoOElementos.addEventListener(evento, funcion, false);
		}
	}
}

function removeEvent(elementoOElementos, evento, funcion) {
	if (Array.isArray(elementoOElementos)) {
		for (let i = 0; i < elementoOElementos.length; i++) {
			if (elementoOElementos[i].attachEvent)
				elementoOElementos[i].detachEvent('on' + evento, funcion);
			else
				elementoOElementos[i].removeEventListener(evento, funcion, false);
		}
	}
	else {
		if (elementoOElementos.attachEvent)
			elementoOElementos.detachEvent('on' + evento, funcion);
		else
			elementoOElementos.removeEventListener(evento, funcion, false);
	}
}

function crearBotonClickOPresionContinuaMouse({ _botonId, _tiempoTimeout = 250, _tiempoIntervalo = 100, _accionesAlIniciar = () => { }, _accionesAlFinalizar = () => { }, _accionesAlClick = () => { }, _accionesAlMantener = () => { } }) {
	let botonPresionado = false;
	let intervaloManteniendoPulsado;
	let intervaloPulsado;

	const boton = document.getElementById(_botonId);

	function accionManteniendoPulsado() {
		_accionesAlMantener();
	}

	function accionClic() {
		_accionesAlClick();
	}

	boton.addEventListener("mousedown", function () {
		botonPresionado = true;
		_accionesAlIniciar();

		// Establecer un temporizador para activar la acción manteniendo pulsado después de cierto tiempo
		intervaloPulsado = setTimeout(function () {
			if (botonPresionado) {
				accionManteniendoPulsado();
				intervaloManteniendoPulsado = setInterval(accionManteniendoPulsado, _tiempoIntervalo);
			}
			else {
				accionClic();
			}
		}, _tiempoTimeout);
	});

	boton.addEventListener("mouseup", function () {
		botonPresionado = false;
		clearInterval(intervaloManteniendoPulsado);
		_accionesAlFinalizar();
	});
}

function crearBotonClickOPresionContinuaTactil({ _botonId, _tiempoTimeout = 250, _tiempoIntervalo = 100, _accionesAlIniciar = () => { }, _accionesAlFinalizar = () => { }, _accionesAlClick = () => { }, _accionesAlMantener = () => { } }) {
	let botonPresionado = false;
	let intervaloManteniendoPulsado;
	let intervaloPulsado;

	const boton = document.getElementById(_botonId);

	function accionManteniendoPulsado() {
		_accionesAlMantener();
	}

	function accionClic() {
		_accionesAlClick();
	}

	function iniciarPresionTactil() {
		botonPresionado = true;
		_accionesAlIniciar();

		// Establecer un temporizador para activar la acción manteniendo pulsado después de cierto tiempo
		intervaloPulsado = setTimeout(function () {
			if (botonPresionado) {
				accionManteniendoPulsado();
				intervaloManteniendoPulsado = setInterval(accionManteniendoPulsado, _tiempoIntervalo);
			}
			else {
				accionClic();
			}
		}, _tiempoTimeout);
	}

	function detenerPresionTactil() {
		botonPresionado = false;
		clearInterval(intervaloManteniendoPulsado);
		_accionesAlFinalizar();
	}

	boton.addEventListener("touchstart", iniciarPresionTactil);
	boton.addEventListener("touchend", detenerPresionTactil);
	boton.addEventListener("touchcancel", detenerPresionTactil);
}

/**
 * Centra horizontalmente el contenido desplazable de uno o varios elementos del DOM.
 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM cuyo contenido desplazable se desea centrar horizontalmente.
 */
function centrarScrollHorizontal(_elementos) {
	const CENTRAR_ELEMENTO = (elemento) => {
		setTimeout(() => {
			const SCROLL_BEHAVIOR_INICIAL = getValorCSS2(elemento, "scroll-behavior");
			elemento.style.scrollBehavior = "initial";
			elemento.scrollLeft = (elemento.scrollWidth - elemento.clientWidth) / 2;
			elemento.style.scrollBehavior = SCROLL_BEHAVIOR_INICIAL;
		}, 0);
	};

	if (Array.isArray(_elementos)) {
		_elementos.forEach(CENTRAR_ELEMENTO);
	}
	else {
		CENTRAR_ELEMENTO(_elementos);
	}
}

/**
 * Agrega o elimina una clase CSS en elementos del DOM.
 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM a los que agregar o eliminar la clase CSS.
 * @param {string} _class - La clase CSS a agregar o eliminar.
 * @param {number} [_funcion=2] - La función a realizar: 0 para eliminar la clase, 1 para agregar la clase, 2 para alternar entre agregar y eliminar la clase, 3 para eliminar todas las clases y agregar la clase especificada.
 * @returns {boolean} Devuelve true si se agregó la clase a algún elemento, false en caso contrario.
 */
function anadirQuitarClass(_elementos, _class, _funcion = 2) {
	let rsp = false;
	if (!Array.isArray(_elementos)) {
		_elementos = [_elementos];
	}

	const acciones =
	{
		0: (_elemento) => _elemento.classList.remove(_class),
		1: (_elemento) => {
			_elemento.classList.add(_class);
			rsp = true;
		},
		2: (_elemento) => {
			_elemento.classList.toggle(_class);
			rsp = true;
		},
		3: (_elemento) => {
			_elemento.className = _class;
			rsp = true;
		},
	};

	_elementos.forEach((_elemento) => acciones[_funcion](_elemento));
	return rsp;
}

/**
 * Elimina uno o varios elementos del DOM.
 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM a eliminar.
 */
function eliminarElementos(_elementos) {
	for (let i = 0; i < _elementos.length; i++) {
		eliminarElemento(_elementos[i]);
	}
}

/**
 * Elimina un elemento del DOM.
 * @param {HTMLElement} elemento - El elemento del DOM a eliminar.
 */
function eliminarElemento(elemento) {
	if (!elemento) {
		alert("El elemento seleccionado no existe");
	}
	else {
		const PADRE = elemento.parentNode;
		PADRE.removeChild(elemento);
	}
}

/**
 * Elimina un elemento del DOM por su ID.
 * @param {string} _id - El ID del elemento del DOM a eliminar.
 */
function eliminarElementoPorId(_id) {
	elemento = document.getElementById(_id);
	if (!elemento) {
		alert("El elemento seleccionado no existe");
	}
	else {
		const PADRE = elemento.parentNode;
		PADRE.removeChild(elemento);
	}
}

/**
 * Elimina todas las cookies del sitio web actual.
 */
function eliminarCookies() {
	document.cookie.split(";").forEach(function (c) {
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
	});
}

/**
 * Obtiene el nombre de un mes en español a partir de su número (1-12).
 * @param {number} numero - El número del mes (1-12).
 * @returns {string|null} El nombre del mes en español o null si el número no es válido.
 */
function obtenerNombreMes(numero) {
	const MI_FECHA = new Date();
	if (0 < numero && numero <= 12) {
		MI_FECHA.setMonth(numero - 1);
		return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(MI_FECHA);
	}
	else {
		return null;
	}
}

/**
 * Obtiene la fecha actual en formato "día - mes - año".
 * @returns {string} La fecha actual en formato "día - mes - año".
 */
function fechaActual() {
	const HOY = new Date();

	// día del mes (del 1 al 31)
	const NUM_DIA = HOY.getDate();

	// getMonth da número de mes (de 0 a 11)
	const MES = HOY.getMonth() + 1;

	// año completo
	const AÑO = HOY.getFullYear();

	const RSP = NUM_DIA + " - " + MES + " - " + AÑO;

	return RSP;
}

/**
 * Ejecuta una función después de un tiempo especificado utilizando Date.now() en lugar de setTimeout().
 * @param {function} miFuncion - La función a ejecutar después del tiempo especificado.
 * @param {number} tiempo - El tiempo en milisegundos después del cual ejecutar la función.
 */
function setDateTimeout(funcion, tiempo) {
	let tiempoObjetivo = Date.now() + tiempo;
	let timeoutId;

	function tick() {
		const tiempoActual = Date.now();
		const desfase = tiempoActual - tiempoObjetivo;

		if (desfase >= 0) {
			funcion();
		}
		else {
			timeoutId = setTimeout(tick, -desfase);
		}
	}
	timeoutId = setTimeout(tick, tiempo);

	// Función para detener el setDateTimeout
	function clearDateTimeout() {
		clearTimeout(timeoutId);
	}

	return clearDateTimeout;
	/*
		// Ejemplo de uso:
		const miDateTimeout = setDateTimeout(() =>
		{
			console.log("Esta función se ejecutará con precisión después de 1 segundo.");
		}, 1000);
		
		// Para detener el setDateTimeout en el momento
		miDateTimeout();
	*/
}

/**
 * Ejecuta una función repetidamente cada cierto tiempo utilizando Date.now() en lugar de setInterval().
 * @param {function} miFuncion - La función a ejecutar repetidamente cada cierto tiempo.
 * @param {number} intervalo - El tiempo en milisegundos entre cada ejecución de la función.
 */
function setDateInterval(funcion, intervalo) {
	let tiempoObjetivo = Date.now() + intervalo;
	let timeoutId;

	function tick() {
		const tiempoActual = Date.now();
		const desfase = tiempoActual - tiempoObjetivo;
		funcion();

		tiempoObjetivo = tiempoActual + intervalo - desfase;
		timeoutId = setTimeout(tick, intervalo - desfase);
	}

	timeoutId = setTimeout(tick, intervalo);

	// Función para detener el setDateInterval
	function clearDateInterval() {
		clearTimeout(timeoutId);
	}

	return clearDateInterval;

	/*
		// Ejemplo de uso:
		const miIntervalo = setDateInterval(() => {
		console.log("Esta función se ejecutará con precisión cada segundo.");
		}, 1000);

		// Para detener el setDateInterval en el momento
		miIntervalo();
	*/
}

/**
 * Calcula la distancia entre dos toques en la pantalla.
 * @param {TouchEvent} _e - El evento de toque.
 * @returns {number} La distancia entre los dos toques.
 */
function dameDistanciaEntre2Touch(_e) {
	const POSICION_Y0 = _e.touches[0].clientY;
	const POSICION_X0 = _e.touches[0].clientX;
	let posicionY1;
	let posicionX1;
	let rsp;
	if (_e.touches.length > 1) {
		posicionY1 = _e.touches[1].clientY;
		posicionX1 = _e.touches[1].clientX;
	}
	rsp = (POSICION_Y0 - posicionY1) + (POSICION_X0 - posicionX1);
	if (rsp < 0) {
		rsp = rsp * (-1);
	}
	return rsp;
}

/**
 * Devuelve los últimos números de una cadena.
 * @param {string} string - La cadena de la que se extraerán los últimos números.
 * @returns {string} Los últimos números de la cadena.
 */
function getLastNumbers(string) {
	let lastNumbers = "";
	for (let i = string.length - 1; i >= 0; i--) {
		if (isNaN(string[i])) {
			break;
		}
		else {
			lastNumbers = string[i] + lastNumbers;
		}
	}
	return lastNumbers;
}

/**
 * Muestra un mensaje centrado en la pantalla durante un tiempo determinado.
 * @param {string} _mensaje - El mensaje que se mostrará.
 * @param {number} [_tiempo=1000] - El tiempo en milisegundos durante el cual se mostrará el mensaje.
 */
function mostrarMensajeCentrado(_mensaje, _tiempo = 1000) {
	const DIV = document.createElement("div");
	DIV.innerHTML = _mensaje;
	Object.assign(DIV.style,
		{
			textShadow: "-1px -1px 0 rgba(255, 255, 255,0.5),1px -1px 0 rgba(255, 255, 255,0.5),-1px 1px 0 rgba(255, 255, 255,0.5),1px 1px 0 rgba(255, 255, 255,0.5)",
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			transition: "opacity 2s",
			color: "rgba(0, 0, 0, 0.5)",
			pointerEvents: "none"
		});

	const MODAL = document.createElement("div");
	Object.assign(MODAL.style,
		{
			position: "fixed",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			pointerEvents: "none"
		});
	MODAL.appendChild(DIV);

	// Ajustar el tamaño de la fuente
	const SMALLEST_DIMENSION = Math.min(window.innerWidth, window.innerHeight);
	DIV.style.fontSize = `${SMALLEST_DIMENSION * 0.5}px`;

	document.body.appendChild(MODAL);
	setTimeout(() => {
		MODAL.style.opacity = "0";
		setTimeout(() => {
			MODAL.remove();
		}, _tiempo);
	}, _tiempo);
}

function eliminarEspaciosBlanco(str) {
	return str.replace(/\s/g, '');
}

function textoLegibleColores(textColor, bgColor) {
	textColor = eliminarEspaciosBlanco(textColor);
	bgColor = eliminarEspaciosBlanco(bgColor);

	// Convertir a valores RGB si se pasan colores en formato hexadecimal o rgba
	const textColorRGB = typeof textColor === 'string' ? convertirArgb(textColor) : textColor;
	const bgColorRGB = typeof bgColor === 'string' ? convertirArgb(bgColor) : bgColor;

	const contrastRatio = getContrastRatio(textColorRGB, bgColorRGB);
	return contrastRatio >= 4.5;
}

// Función para determinar si un color está más cercano al blanco o al negro
function colorCercanoAlBlanco(color) {
	let rgb;
	if (typeof color === 'string') {
		// Si el color es una cadena, se trata de un valor hexadecimal
		rgb = convertirArgb(color);
	}
	else if (Array.isArray(color) && color.length === 3) {
		// Si el color es un arreglo con tres elementos, se asume que es RGB
		rgb = color;
	}
	else {
		// Si el color no es un formato válido, devolvemos null
		return null;
	}

	// Calculamos la distancia euclidiana del color al blanco (255, 255, 255) y al negro (0, 0, 0)
	const distanceToWhite = Math.sqrt(
		Math.pow(255 - rgb[0], 2) + Math.pow(255 - rgb[1], 2) + Math.pow(255 - rgb[2], 2)
	);
	const distanceToBlack = Math.sqrt(
		Math.pow(rgb[0], 2) + Math.pow(rgb[1], 2) + Math.pow(rgb[2], 2)
	);

	// Si la distancia al blanco es menor o igual a la distancia al negro, el color está más cercano al blanco
	return distanceToWhite <= distanceToBlack;
}

// Función para calcular el contraste entre dos colores
function getContrastRatio(color1, color2) {
	const luminance1 = getRelativeLuminance(color1);
	const luminance2 = getRelativeLuminance(color2);
	const contrast = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
	return contrast.toFixed(2);
}

// Función para convertir colores en formato hexadecimal o rgba a RGB
function convertirArgb(color) {
	if (color.startsWith("#")) {
		return hexToRGB(color);
	}
	else if (color.startsWith("rgba")) {
		const rgbaValues = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*\d+(\.\d+)?\)/);
		if (rgbaValues) {
			return [parseInt(rgbaValues[1]), parseInt(rgbaValues[2]), parseInt(rgbaValues[3])];
		}
	}
	else if (color.startsWith("rgb")) {
		const rgbValues = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (rgbValues) {
			return [parseInt(rgbValues[1]), parseInt(rgbValues[2]), parseInt(rgbValues[3])];
		}
	}
	// Si no es un formato conocido, se devuelve un valor por defecto [0, 0, 0]
	return [0, 0, 0];
}

// Función para convertir un color hexadecimal a RGB
function hexToRGB(hex) {
	const r = parseInt(hex.substring(1, 3), 16);
	const g = parseInt(hex.substring(3, 5), 16);
	const b = parseInt(hex.substring(5, 7), 16);
	return [r, g, b];
}

// Función para calcular el brillo relativo de un color en la escala RGB
function getRelativeLuminance(color) {
	const [r, g, b] = color.map((c) => {
		const sRGB = c / 255;
		return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
	});

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
//----------------------------------
//	/Funciones-herramienta Generales
//----------------------------------
//======================================================================
// 	Class Temporizador
//======================================================================
class Temporizador {
	horasInicialesTemporizador = 0;
	minutosInicialesTemporizador = 0;
	segundosInicialesTemporizador = 0;

	horasRestantesTemporizador = 0;
	minutosRestantesTemporizador = 0;
	segundosRestantesTemporizador = 0;

	accionesAlIniciarTemporizador = () => { };
	accionesACadaIntervaloTemporizador = () => { };
	accionesAlPausarTemporizador = () => { };
	accionesAlContinuarTemporizador = () => { };
	accionesAlFinalizarTemporizador = () => { };

	intervaloTemporizador;
	tiempoEntreIntervalosEnMilisegundos = 1000;

	saberSiHaFinalizadoTemporizador = false;
	saberSiEstaPausadoTemporizador = false;

	querySelectorInputTemporizador = "";

	constructor(_querySelectorInputTemporizador = "") {
		if (_querySelectorInputTemporizador != "") {
			this.querySelectorInputTemporizador = _querySelectorInputTemporizador;
			this.anadirValidadorDeIntroduccionParaInputTemporizador();
		}
	}

	//	Tools
	/**
	 * Agrega o elimina un atributo en elementos del DOM.
	 * @param {Array|NodeList|HTMLElement} _elementos - Los elementos del DOM a los que agregar o eliminar el atributo.
	 * @param {string} _atributo - El atributo a agregar o eliminar.
	 * @param {number} [_funcion=2] - La función a realizar: 0 para eliminar el atributo, 1 para agregar el atributo, 2 para alternar entre agregar y eliminar el atributo.
	 */
	setRemoveAtributo(_elementos, _atributo, _funcion = 2) {
		_elementos = pasarAArray(_elementos);

		const acciones =
		{
			0: (_elemento) => _elemento.removeAttribute(_atributo),
			1: (_elemento) => _elemento.setAttribute(_atributo, ""),
			2: (_elemento) => {
				if (_elemento.hasAttribute(_atributo)) {
					_elemento.removeAttribute(_atributo);
				}
				else {
					_elemento.setAttribute(_atributo, "");
				}
			},
		};

		for (let i = 0; i < _elementos.length; i++) {
			acciones[_funcion](_elementos[i]);
		}
	}
	//	/Tools
	//	Terciarias
	comprobarFormatoInput(str) {
		const regex = /^([0-5]?\d)(?:([.:])([0-5]?\d)(?:\2([0-5]?\d))?)?$/;
		if (!regex.test(str)) {
			return false;
		}
		const partes = str.split(/[:.]/).map(Number);
		return partes.every(num => num <= 59);
	}
	//	/Terciarias
	//	Secundarias
	validarTeclaPulsadaEnInputTemporizador(e) {
		const input = e.target;
		const valor = input.value;
		const valorValido = valor.replace(/[^0-9:.]/g, '');
		if (valor !== valorValido) {
			input.value = valorValido;
		}
	}

	pausarTemporizador() {
		if (!this.saberSiHaFinalizadoTemporizador) {
			if (!this.saberSiEstaPausadoTemporizador) {
				clearInterval(this.intervaloTemporizador);
				this.saberSiEstaPausadoTemporizador = true;
				this.accionesAlPausarTemporizador();
			}
		}
	}

	continuarTemporizador(str = "") {
		if ((!this.saberSiHaFinalizadoTemporizador)) {
			if (this.saberSiEstaPausadoTemporizador) {
				this.accionesAlContinuarTemporizador();
				if (str != "") {
					if (this.comprobarFormatoInput(str)) {
						let horas = 0;
						let minutos = 0;
						let segundos = 0;

						const partes = str.split(/[:.]/);
						if (partes.length === 3) {
							[horas, minutos, segundos] = partes.map(Number);
						}
						else if (partes.length === 2) {
							[minutos, segundos] = partes.map(Number);
						}
						else {
							[segundos] = partes.map(Number);
						}
						if (horas + minutos + segundos > 0) {
							this.horasRestantesTemporizador = horas;
							this.minutosRestantesTemporizador = minutos;
							this.segundosRestantesTemporizador = segundos;
							this.ejecutarTemporizador();
						}
					}
				}

			}
		}
		else if (str != "") {
			if (this.saberSiEstaPausadoTemporizador) {
				if (this.comprobarFormatoInput(str)) {
					let horas = 0;
					let minutos = 0;
					let segundos = 0;

					const partes = str.split(/[:.]/);
					if (partes.length === 3) {
						[horas, minutos, segundos] = partes.map(Number);
					}
					else if (partes.length === 2) {
						[minutos, segundos] = partes.map(Number);
					}
					else {
						[segundos] = partes.map(Number);
					}
					if (horas + minutos + segundos > 0) {
						this.horasInicialesTemporizador = horas;
						this.minutosInicialesTemporizador = minutos;
						this.segundosInicialesTemporizador = segundos;
						this.reiniciarTemporizador();
					}
				}
			}
		}
	}

	restar1Segundo() {
		if (this.segundosRestantesTemporizador <= 0) {
			if (this.minutosRestantesTemporizador > 0) {
				this.minutosRestantesTemporizador--;
			}
			else {
				this.horasRestantesTemporizador--;
				this.minutosRestantesTemporizador = 59;
			}
			this.segundosRestantesTemporizador = 59;
		}
		else {
			this.segundosRestantesTemporizador--;
		}
	}

	anadir0(_cifra) {
		return _cifra.toString().padStart(2, '0')
		/* 			let cifraStr=String(_cifra);
					if((cifraStr.length)===1)
					{
						cifraStr="0"+cifraStr;
					}
					return cifraStr; */
	}
	//	/Secundarias
	//	Primarias
	/**
	 * Escribe en el input temporizador los valores iniciales de tiempo
	 */
	ponerInputTemporizadorATiempoInicial() {
		let inputTemporizador;
		if (this.querySelectorInputTemporizador != "") {
			inputTemporizador = document.querySelector(this.querySelectorInputTemporizador);
			inputTemporizador.value = this.getTiempoInicialConFormato();
		}
	}

	anadirValidadorDeIntroduccionParaInputTemporizador() {
		const OBJETO = this;
		let inputTemporizador = document.querySelector(this.querySelectorInputTemporizador);
		inputTemporizador.addEventListener('input', (e) => OBJETO.validarTeclaPulsadaEnInputTemporizador(e));
	}

	/**
	 * Inicia el temporizador poniendo los valores iniciales, y finalmente llama a ejecutarTemporizador()
	 */
	iniciarTemporizador() {
		this.horasRestantesTemporizador = this.horasInicialesTemporizador;
		this.minutosRestantesTemporizador = this.minutosInicialesTemporizador;
		this.segundosRestantesTemporizador = this.segundosInicialesTemporizador;

		this.accionesAlIniciarTemporizador();

		this.ejecutarTemporizador();
	}

	finalizarTemporizador() {
		if (!this.saberSiHaFinalizadoTemporizador) {
			this.saberSiHaFinalizadoTemporizador = true;
			clearInterval(this.intervaloTemporizador);

			this.accionesAlFinalizarTemporizador();
			if (this.querySelectorInputTemporizador != "") {
				let inputTemporizador = document.querySelector(this.querySelectorInputTemporizador);
				this.setRemoveAtributo(inputTemporizador, "disabled", 1);
			}
		}
	}

	pausarContinuarTemporizador(str) {
		if (!this.saberSiHaFinalizadoTemporizador) {
			let inputTemporizador;
			if (this.querySelectorInputTemporizador != "") {
				inputTemporizador = document.querySelector(this.querySelectorInputTemporizador);
			}

			if (this.saberSiEstaPausadoTemporizador) {
				if (this.querySelectorInputTemporizador != "") {
					this.setRemoveAtributo(inputTemporizador, "disabled", 1);
				}
				this.continuarTemporizador(str);
			}
			else {
				if (this.querySelectorInputTemporizador != "") {
					this.setRemoveAtributo(inputTemporizador, "disabled", 0);
				}
				this.pausarTemporizador();
			}
		}
		else if (str != "") {
			if (this.saberSiEstaPausadoTemporizador) {
				this.continuarTemporizador(str);
			}
			else {
				this.saberSiEstaPausadoTemporizador = true;
			}
		}
	}

	/**
	 * Ejecuta el temporizador de forma que pone en marcha el setInterval
	 */
	ejecutarTemporizador() {
		const OBJETO = this;
		this.saberSiEstaPausadoTemporizador = false;
		let querySelectorInputTemporizador = this.querySelectorInputTemporizador;
		this.intervaloTemporizador = setInterval(() => {
			OBJETO.restar1Segundo();
			let inputTemporizador;
			OBJETO.accionesACadaIntervaloTemporizador();
			if (querySelectorInputTemporizador != "") {
				inputTemporizador = document.querySelector(querySelectorInputTemporizador);
				inputTemporizador.value = OBJETO.getTiempoTranscurridoConFormato();
			}

			if (OBJETO.getSegundosRestantesTemporizador() <= 0 && OBJETO.getMinutosRestantesTemporizador() <= 0 && OBJETO.getHorasRestantesTemporizador() <= 0) {
				OBJETO.finalizarTemporizador();
			}
		}, this.tiempoEntreIntervalosEnMilisegundos);
	}

	/**
	 * Obtiene el tiempo total en segundos.
	 * @param {number} _horas - Las horas.
	 * @param {number} _minutos - Los minutos.
	 * @param {number} _segundos - Los segundos.
	 * @returns {number} El tiempo total en segundos.
	 */
	getTiempoTotalEnSegundos(_horas, _minutos, _segundos) {
		let rsp = 0;
		rsp = (_horas * 60 * 60) + (_minutos * 60) + (_segundos);

		return rsp;
	}

	/**
	 * Obtiene las horas, minutos y segundos a partir de los segundos.
	 * @param {number} _segundos - Los segundos.
	 * @returns {Array<number>} Las horas, minutos y segundos.
	 */
	getHorasMinutosSegundosFromSegundos(_segundos) {
		const HOUR = Math.floor(_segundos / 3600);
		//hour = (hour < 10)? '0' + hour : hour;
		const MINUTE = Math.floor((_segundos / 60) % 60);
		//minute = (minute < 10)? '0' + minute : minute;
		const SECOND = _segundos % 60;
		//second = (second < 10)? '0' + second : second;

		return [parseInt(HOUR), parseInt(MINUTE), parseInt(SECOND)];
	}

	reiniciarTemporizador() {
		//this.finalizarTemporizador();
		if (!this.saberSiHaFinalizadoTemporizador) {
			this.saberSiHaFinalizadoTemporizador = true;
			clearInterval(this.intervaloTemporizador);
		}

		this.horasRestantesTemporizador = this.horasInicialesTemporizador;
		this.minutosRestantesTemporizador = this.minutosInicialesTemporizador;
		this.segundosRestantesTemporizador = this.segundosInicialesTemporizador;

		this.saberSiHaFinalizadoTemporizador = false;
		this.saberSiEstaPausadoTemporizador = false;
		let inputTemporizador = document.querySelector(this.querySelectorInputTemporizador);
		this.setRemoveAtributo(inputTemporizador, "display", 1);

		this.iniciarTemporizador();
	}

	/**
	 * Obtiene el tiempo transcurrido con formato.
	 * @returns {string} El tiempo transcurrido con formato HH:MM:SS: excluyendo los ceros a la izquierda en ciertos casos.
	 */
	getTiempoTranscurridoConFormato() {
		let tiempoRestante = "";
		if (this.getHorasRestantesTemporizador() > 0) {
			tiempoRestante += this.getHorasRestantesTemporizador(true) + ":";
		}

		if (this.getMinutosRestantesTemporizador() > 0) {
			tiempoRestante += this.getMinutosRestantesTemporizador(true) + ":";
		}
		else if (this.getHorasRestantesTemporizador() > 0) {
			tiempoRestante += this.getMinutosRestantesTemporizador(true) + ":";
		}

		tiempoRestante += this.getSegundosRestantesTemporizador(true);
		return tiempoRestante;
	}

	getTiempoInicialConFormato() {
		let tiempoRestante = "";
		if (this.getHorasInicialesTemporizador() > 0) {
			tiempoRestante += this.getHorasInicialesTemporizador(true) + ":";
		}

		if (this.getMinutosInicialesTemporizador() > 0) {
			tiempoRestante += this.getMinutosInicialesTemporizador(true) + ":";
		}
		else if (this.getHorasInicialesTemporizador() > 0) {
			tiempoRestante += this.getMinutosInicialesTemporizador(true) + ":";
		}

		tiempoRestante += this.getSegundosInicialesTemporizador(true);
		return tiempoRestante;
	}

	/**
	 * Obtiene el tiempo transcurrido.
	 * @returns {Array<number>} El tiempo transcurrido en horas, minutos y segundos.
	 */
	getTiempoTranscurrido() {
		const TIEMPO_INICIAL_EN_SEGUNDOS = this.getTiempoTotalEnSegundos(this.horasInicialesTemporizador, this.minutosInicialesTemporizador, this.segundosInicialesTemporizador);
		const TIEMPO_ACTUAL_EN_SEGUNDOS = this.getTiempoTotalEnSegundos(this.horasRestantesTemporizador, this.minutosRestantesTemporizador, this.segundosRestantesTemporizador);
		const TIEMPO_TRANSCURRIDO_EN_SEGUNDOS = TIEMPO_INICIAL_EN_SEGUNDOS - TIEMPO_ACTUAL_EN_SEGUNDOS;
		const TIEMPO_TRANSCURRIDO = this.getHorasMinutosSegundosFromSegundos(TIEMPO_TRANSCURRIDO_EN_SEGUNDOS);

		return TIEMPO_TRANSCURRIDO;
	}

	getSegundosRestantesTemporizador(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.segundosRestantesTemporizador)
			: rsp = this.segundosRestantesTemporizador;
		return rsp;
	}

	getMinutosRestantesTemporizador(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.minutosRestantesTemporizador)
			: rsp = this.minutosRestantesTemporizador;

		return rsp;
	}

	getHorasRestantesTemporizador(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.horasRestantesTemporizador)
			: rsp = this.horasRestantesTemporizador;
		return rsp;
	}

	getSegundosInicialesTemporizador(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.segundosInicialesTemporizador)
			: rsp = this.segundosInicialesTemporizador;
		return rsp;
	}

	getMinutosInicialesTemporizador(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.minutosInicialesTemporizador)
			: rsp = this.minutosInicialesTemporizador;
		return rsp;
	}

	getHorasInicialesTemporizador(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.horasInicialesTemporizador)
			: rsp = this.horasInicialesTemporizador;
		return rsp;
	}

	getSaberSiHaFinalizadoTemporizador() {
		return this.saberSiHaFinalizadoTemporizador;
	}

	getSaberSiEstaPausadoTemporizador() {
		return this.saberSiEstaPausadoTemporizador;
	}

	setSaberSiHaFinalizadoTemporizador(_saberSiHaFinalizadoTemporizador) {
		this.saberSiHaFinalizadoTemporizador = _saberSiHaFinalizadoTemporizador;
	}

	setMinutosInicialesTemporizador(_minutosIniciales) {
		this.minutosInicialesTemporizador = parseInt(_minutosIniciales);
	}

	setSegundosInicialesTemporizador(_segundosIniciales) {
		this.segundosInicialesTemporizador = parseInt(_segundosIniciales);
	}

	setHorasInicialesTemporizador(_horasIniciales) {
		this.horasInicialesTemporizador = parseInt(_horasIniciales);
	}

	//	/Primarias
}
//======================================================================
// 	/Class Temporizador
//======================================================================

//======================================================================
// 	Class Cronometro
//======================================================================
class Cronometro {
	horasInicialesCronometro = 0;
	minutosInicialesCronometro = 0;
	segundosInicialesCronometro = 0;

	horasActualesCronometro = 0;
	minutosActualesCronometro = 0;
	segundosActualesCronometro = 0;

	accionesAlIniciarCronometro = () => { };
	accionesACadaIntervaloCronometro = () => { };
	accionesAlPausarCronometro = () => { };
	accionesAlContinuarCronometro = () => { };

	intervaloCronometro;
	tiempoEntreIntervalosEnMilisegundos = 1000;

	saberSiEstaPausadoCronometro = false;

	//	Secundarias
	sumar1Segundo() {
		this.segundosActualesCronometro++;
		if (this.segundosActualesCronometro > 59) {
			this.segundosActualesCronometro = 0;
			if (this.minutosActualesCronometro >= 59) {
				this.minutosActualesCronometro = 0;
				this.horasActualesCronometro++;
			}
			else {
				this.minutosActualesCronometro++;
			}
		}
	}

	anadir0(_cifra) {
		return _cifra.toString().padStart(2, '0')
		/* 			let cifraStr=String(_cifra);
					if((cifraStr.length)==1)
					{
						cifraStr="0"+cifraStr;
					}
					return cifraStr; */
	}

	pausarCronometro() {
		this.saberSiEstaPausadoCronometro = true;
		clearInterval(this.intervaloCronometro);
		this.accionesAlPausarCronometro();
	}

	continuarCronometro() {
		this.accionesAlContinuarCronometro();
		this.ejecutarCronometro();
	}
	//	/Secundarias
	//	Primarias
	getSaberSiEstaPausadoCronometro() {
		return this.saberSiEstaPausadoCronometro;
	}

	/**
	 * Obtiene el tiempo transcurrido con formato.
	 * @returns {string} El tiempo transcurrido con formato HH:MM:SS: excluyendo los ceros a la izquierda en ciertos casos.
	 */
	getTiempoActualConFormato() {
		let tiempoActual = "";
		if (this.getHorasActualesCronometro() > 0) {
			tiempoActual += this.getHorasActualesCronometro(true) + ":";
		}

		if (this.getMinutosActualesCronometro() > 0) {
			tiempoActual += this.getMinutosActualesCronometro(true) + ":";
		}
		else if (this.getHorasActualesCronometro() > 0) {
			tiempoActual += this.getMinutosActualesCronometro(true) + ":";
		}

		tiempoActual += this.getSegundosActualesCronometro(true);
		return tiempoActual;
	}

	getSegundosActualesCronometro(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.segundosActualesCronometro)
			: rsp = this.segundosActualesCronometro;
		return rsp;
	}

	getMinutosActualesCronometro(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.minutosActualesCronometro)
			: rsp = this.minutosActualesCronometro;
		return rsp;
	}

	getHorasActualesCronometro(con0 = false) {
		let rsp;
		con0
			? rsp = this.anadir0(this.horasActualesCronometro)
			: rsp = this.horasActualesCronometro;
		return rsp;
	}

	/**
	 * Inicia el cronómetro poniendo los valores iniciales, y finalmente llama a ejecutarTemporizador()
	 */
	iniciarCronometro() {
		this.horasActualesCronometro = this.horasInicialesCronometro;
		this.minutosActualesCronometro = this.minutosInicialesCronometro;
		this.segundosActualesCronometro = this.segundosInicialesCronometro;

		this.accionesAlIniciarCronometro();

		this.ejecutarCronometro();
	}

	pausarContinuarCronometro() {
		this.saberSiEstaPausadoCronometro
			? this.continuarCronometro()
			: this.pausarCronometro();
	}

	reiniciarCronometro() {
		this.pausarCronometro();
		this.horasRestantesCronometro = this.horasInicialesCronometro;
		this.minutosRestantesCronometro = this.minutosInicialesCronometro;
		this.segundosRestantesCronometro = this.segundosInicialesCronometro;

		this.saberSiEstaPausadoCronometro = false;

		this.iniciarCronometro();
	}

	/**
	 * Ejecuta el cronómetro de forma que pone en marcha el setInterval
	 */
	ejecutarCronometro() {
		this.saberSiEstaPausadoCronometro = false;
		const OBJETO = this;
		this.intervaloCronometro = setInterval(() => {
			OBJETO.sumar1Segundo();
			OBJETO.accionesACadaIntervaloCronometro();
		}, this.tiempoEntreIntervalosEnMilisegundos);
	}
	//	/Primarias
}
//======================================================================
// 	/Class Cronometro
//======================================================================

//======================================================================
// 	Class Pizarra
//======================================================================
class Pizarra {
	activado = true;
	mouse;
	tactil;
	borrador = false;
	color = "#000000";
	tamano = 5;
	papel;
	y = 150;
	x = 150;
	idGrupoLineasActual = 1;

	eventosIniciados = false;
	modoMouse = true;
	modoTouch = true;

	tempCanvas;
	tempCtx;

	porcentajeResolucionPizarra = 1.0; //1.0 es el 100%, poner siempre con decimal
	lineas = [];
	lineasBorrador = [];

	miCanvasPizarra;
	idDivConScroll;
	idModeloAltura = "";
	idModeloAnchura = "";
	idModeloContenidoPizarra = "";
	timeOnResize;
	posicionParaCorregirTactil;

	modoCursorBorrador = true;
	//Imagen png de goma codificada a base64
	cursorBorrador = 'data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEhRyv5FT8z/XF+40wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABETsv/RE7L/0ROy/9TXM7/o6XW9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARE7L/0ROy/9ETsv/U1zO/+Tl6v/k5er/d3vJ7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEROy/9ETsv/RE7L/1Nczv/k5er/5OXq/09Zzf9ETsv/Vlu+6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABETsv/RE7L/0ROy/9TXM7/5OXq/+Tl6v9PWc3/RE7L/0ROy/9ETsv/YmO23gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARE7L/0ROy/9ETsv/U1zO/+Tl6v/k5er/T1nN/0ROy/9ETsv/RE7L/0VPzf9MV+L/dG+ozgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEROy/9ETsv/RE7L/1Nczv/k5er/5OXq/09Zzf9ETsv/RE7L/0ROy/9FT83/TFfi/0xX4v9MV+L/dG+ozgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABETsv/RE7L/0ROy/9TXM7/5OXq/+Tl6v9PWc3/RE7L/0ROy/9ETsv/RU/N/0xX4v9MV+L/TFfi/0xX4v9MV+L/dG+ozgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARE7L/0ROy/9ETsv/U1zO/+Tl6v/k5er/T1nN/0ROy/9ETsv/RE7L/0VPzf9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/dG+ozgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEROy/9ETsv/RE7L/1Nczv/k5er/5OXq/09Zzf9ETsv/RE7L/0ROy/9FT83/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/loN4tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABETsv/RE7L/0ROy/9TXM7/5OXq/+Tl6v9PWc3/RE7L/0ROy/9ETsv/RU/N/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/1Vc1f/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASFHK/kROy/9ETsv/U1zO/+Tl6v/k5er/T1nN/0ROy/9ETsv/RE7L/0VPzf9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9VXdX/0aYm/9GmJv/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFT8z/RE7L/1Nczv/k5er/5OXq/09Zzf9ETsv/RE7L/0ROy/9FT83/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/VV3V/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxfuNNTXM7/5OXq/+Tl6v9PWc3/RE7L/0ROy/9ETsv/RU/N/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/1Vc1f/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKOl1vTk5er/T1nN/0ROy/9ETsv/RE7L/0VPzf9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9VXNX/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHd7ye5ETsv/RE7L/0ROy/9FT83/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFZbvulETsv/RU/N/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/1Vc1f/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGJjtt5MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9VXNX/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYljwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/TFfi/0xX4v9MV+L/TFfi/0xX4v9MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/TFfi/0xX4v9MV+L/TFfi/1Vc1f/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/TFfi/0xX4v9VXNX/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=';

	nTouchesALaVez = 4;

	observerPizarra = null;

	//Necesarias para recalcular altura proporcional al cambiar de tamaño el divScroll
	prevContentHeightDivScroll;
	prevScrollTopDivScroll;

	accionesAntesDeRedimensionar = () => { };

	/**
	 * Crea una nueva instancia de la clase.
	 * @param {string} [_idCanvasPizarraObjetivo=""] - El ID del canvas objetivo en donde se pintará.
	 * @param {string} [_idModeloAltura=""] - El ID del modelo de altura, usado para recalcular altura de la pizarra en caso de que cambie de altura el modelo.
	 * @param {string} [_idModeloAnchura=""] - El ID del modelo de anchura, usado para recalcular anchura de la pizarra en caso de que cambie de anchura el modelo.
	 * Si alguno de estos parámetros se recibe en blanco, se recoge el string del parámetro siguiente a la izquierda
	 */
	constructor(_idCanvasPizarraObjetivo, _idModeloAltura = "", _idModeloAnchura = "") {
		this.idCanvasPizarraObjetivo = _idCanvasPizarraObjetivo;

		if (_idModeloAltura == "") {
			this.idModeloAltura = _idCanvasPizarraObjetivo;
		}
		else {
			this.idModeloAltura = _idModeloAltura;
		}

		if (_idModeloAnchura == "") {
			this.idModeloAnchura = _idModeloAltura;
		}
		else {
			this.idModeloAnchura = _idModeloAnchura;
		}

		this.miCanvasPizarra = document.getElementById(_idCanvasPizarraObjetivo);
		this.papel = this.miCanvasPizarra.getContext("2d");
	}

	//No recomendado
	/**
	 * Crea un backup de la pizarra conforme la resolución actual sin poder reestructurar tamaño de contenidos después de rescatarlo, es el método rápido y recomendable solo si no se redimensiona
	 * NO RECOMENDADO
	 */
	guardarPantalla() {
		if (this.miCanvasPizarra.width > 0 && this.miCanvasPizarra.height > 0) {
			// Guardar el contenido del canvas
			this.tempCanvas = document.createElement('canvas');
			this.tempCtx = this.tempCanvas.getContext('2d');
			this.tempCanvas.width = this.miCanvasPizarra.width;
			this.tempCanvas.height = this.miCanvasPizarra.height;
			this.tempCtx.drawImage(this.miCanvasPizarra, 0, 0);
		}
	}

	/**
	 * Rescata el backup guardado previamente de la pizarra
	 * NO RECOMENDADO
	 */
	redibujarPantallaGuardada() {//Redibujar así implica perder resolución de líneas en caso de que se haya cambiado el tamaño de la pizarra
		if (this.miCanvasPizarra.width > 0 && this.miCanvasPizarra.height > 0) {
			// Dibujar el contenido guardado en el nuevo tamaño
			this.papel = this.miCanvasPizarra.getContext("2d");
			this.papel.drawImage(this.tempCanvas, 0, 0, this.tempCanvas.width, this.tempCanvas.height, 0, 0, this.miCanvasPizarra.width, this.miCanvasPizarra.height);
		}
	}
	//	/No recomendado
	//	Tools
	/**
	 * Pasa a array si lo que recibe no lo es o es otro tipo de símbolo o iteración
	 */
	pasarAArray(variable) {
		let rsp = variable;
		if (!Array.isArray(variable) && variable[Symbol.iterator]) {
			rsp = Array.from(variable);
		}
		else if (!Array.isArray(variable)) {
			rsp = [variable];
		}
		return rsp;
	}

	getValorCSS2(_elemento, _propiedadCSS, _porcentajeWidthHeight = "") {
		let rsp,
			CSSElemento;

		//Recuerda que las 2 siguientes líneas pueden recoger el valor de la propiedad CSS aunque no se le haya cambiado antes ni atribuido en con el atributo style en el html
		CSSElemento = window.getComputedStyle(_elemento);
		rsp = CSSElemento.getPropertyValue(_propiedadCSS);

		//Recuerda que getComputedStyle guarda los valores en px, o que getPropertyValue recoge valores en px
		if (_porcentajeWidthHeight == "width") {
			rsp = (_elemento.clientWidth * 100) / _elemento.parentElement.clientWidth;
		}
		if (_porcentajeWidthHeight == "height") {
			rsp = (_elemento.clientHeight * 100) / _elemento.parentElement.clientHeight;
		}

		return rsp;
	}
	//	/Tools
	//	Terciarios
	dibujarLinea(_color, _xinicial, _yinicial, _xfinal, _yfinal, _idGrupoLineas, _touches = 1, _ultimaLineaFigura = false) {
		const PORCENTAJE_RESOLUCION_PIZARRA = this.porcentajeResolucionPizarra;
		let tamano = this.tamano;
		let multiplicadorBorrador = 3;
		const CTX = this.papel;

		CTX.beginPath();
		CTX.strokeStyle = _color;
		CTX.lineWidth = tamano * PORCENTAJE_RESOLUCION_PIZARRA;
		CTX.lineHeight = tamano * PORCENTAJE_RESOLUCION_PIZARRA;
		CTX.lineCap = "round";
		CTX.moveTo(_xinicial, _yinicial);
		let modoBorrador = false;
		if (this.borrador) {
			tamano = tamano * multiplicadorBorrador;
			CTX.globalCompositeOperation = "destination-out";
			CTX.arc(_xfinal, _yfinal, tamano * PORCENTAJE_RESOLUCION_PIZARRA, 0, multiplicadorBorrador * Math.PI * PORCENTAJE_RESOLUCION_PIZARRA);
			CTX.fill();
			CTX.globalCompositeOperation = "source-over";
			modoBorrador = true;
		}
		else {
			CTX.lineTo(_xfinal, _yfinal);
			CTX.stroke();
		}
		CTX.closePath();

		// Calcular las coordenadas relativas de la línea con respecto al div con scroll

		const DIV_SCROLL = document.getElementById(this.idDivConScroll);
		const SCROLL_TOP = DIV_SCROLL.scrollTop;
		const SCROLL_LEFT = DIV_SCROLL.scrollLeft;
		const SCROLL_WIDTH = DIV_SCROLL.scrollWidth;
		const SCROLL_HEIGHT = DIV_SCROLL.scrollHeight;
		const PIZARRA = document.getElementById(this.idCanvasPizarraObjetivo);

		//las guardo para poder repintarlas por los difuminados
		this.lineas.push({
			x1: _xinicial,
			y1: _yinicial,
			x2: _xfinal,
			y2: _yfinal,
			widthPizarraResolution: PIZARRA.width,
			heightPizarraResolution: PIZARRA.height,
			divScrollScrollWidth: SCROLL_WIDTH,
			divScrollScrollHeight: SCROLL_HEIGHT,
			divScrollScrollTop: SCROLL_TOP,
			divScrollScrollLeft: SCROLL_LEFT,
			color: _color,
			borrador: modoBorrador,
			visible: true,
			resolucion: this.porcentajeResolucionPizarra,
			tamano: tamano,
			idGrupoLineas: _idGrupoLineas,
			numeroTouch: _touches,
			multiplicadorBorrador: multiplicadorBorrador
		});

		/*verificar se se pinto la figura completa, si sí, llamar a eliminarFigurasAnteriores, aunque no sé por qué la primera línea es de grosor inicial en vez del configurado*/
		if (_touches > 1 && _ultimaLineaFigura) {
			this.eliminarFigurasAnteriores(_idGrupoLineas, _touches);
			this.repintarLineas();
		}
	}

	//	/Terciarios
	//	Secundarios
	iniciarEventosPizarra() {
		this.eventosIniciados = true;
		const OBJETO = this;
		const MI_CANVAS_PIZARRA = this.miCanvasPizarra;
		const MODO_MOUSE = this.modoMouse;
		const MODO_TOUCH = this.modoTouch;

		if (MODO_MOUSE) {
			MI_CANVAS_PIZARRA.addEventListener("mousedown", (e) => OBJETO.apretarMouse(e));
			MI_CANVAS_PIZARRA.addEventListener("mousemove", (e) => OBJETO.dibujarMouse(e));
			MI_CANVAS_PIZARRA.addEventListener("mouseup", (e) => OBJETO.soltarMouse(e));
			MI_CANVAS_PIZARRA.addEventListener("mouseout", (e) => OBJETO.soltarMouse(e));
			MI_CANVAS_PIZARRA.addEventListener("mouseover", (e) => OBJETO.soltarMouse(e));
		}

		if (MODO_TOUCH) {
			MI_CANVAS_PIZARRA.addEventListener("touchstart", (e) => OBJETO.apretarTactil(e));
			MI_CANVAS_PIZARRA.addEventListener("touchmove", (e) => OBJETO.dibujarTactil(e));
			MI_CANVAS_PIZARRA.addEventListener("touchend", (e) => OBJETO.soltarTactil(e));
		}

		var timerResizeObserver;
		const DIV_SCROLL = document.getElementById(this.idDivConScroll);
		//Reacciona a los cambios de tamaño del modelo, en este caso la redimensiona
		this.observerPizarra = new ResizeObserver(entries => {
			clearTimeout(timerResizeObserver);
			timerResizeObserver = setTimeout(function () {
				OBJETO.redimensionarPizarra();
				OBJETO.repintarLineas();
			}, 200);
		});
		this.OnObserver();

		DIV_SCROLL.addEventListener("scroll", function () {
			OBJETO.repintarLineas();
		});

		MI_CANVAS_PIZARRA.addEventListener('wheel', (e) => {
			if (!e.shiftKey) {
				DIV_SCROLL.scrollTop += e.deltaY;
			}
			e.preventDefault();
		});
	}

	OffObserver() {
		(this.observerPizarra).disconnect();
	}

	OnObserver() {
		this.observerPizarra.observe(document.getElementById(this.idModeloAltura));
		if (this.idModeloAltura != this.idModeloAnchura)
			this.observerPizarra.observe(document.getElementById(this.idModeloAnchura));
	}

	reiniciarObserver() {
		this.OffObserver();
		this.OnObserver();
	}

	apretarMouse(e) {
		if (this.activado) {
			const RECT = this.miCanvasPizarra.getBoundingClientRect();
			const PORCENTAJE_RESOLUCION_PIZARRA = this.porcentajeResolucionPizarra;
			this.mouse = 1;
			this.x = (e.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
			this.y = (e.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;
			this.dibujarLinea(this.color, this.x, this.y, this.x + 1, this.y, this.idGrupoLineasActual);
		}
	}

	dibujarMouse(e) {
		if (this.activado) {
			const RECT = this.miCanvasPizarra.getBoundingClientRect();
			const PORCENTAJE_RESOLUCION_PIZARRA = this.porcentajeResolucionPizarra;
			if (this.mouse == 1) {
				let x = (e.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
				let y = (e.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;
				this.dibujarLinea(this.color, this.x, this.y, x, y, this.idGrupoLineasActual);
			}
			this.x = (e.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
			this.y = (e.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;
		}
	}

	soltarMouse(e) {
		if (this.activado && this.mouse == 1) {
			const RECT = this.miCanvasPizarra.getBoundingClientRect();
			const PORCENTAJE_RESOLUCION_PIZARRA = this.porcentajeResolucionPizarra;
			this.mouse = 0;
			this.x = (e.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
			this.y = (e.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;

			this.idGrupoLineasActual++;
		}
	}

	apretarTactil(e) {
		if (this.activado) {
			e.preventDefault();
			const PORCENTAJE_RESOLUCION_PIZARRA = this.porcentajeResolucionPizarra;
			this.tactil = 1;
			const RECT = this.miCanvasPizarra.getBoundingClientRect();
			if (e.touches.length > 1 && e.touches.length <= this.nTouchesALaVez) {
				// Dibujar solo las líneas necesarias para formar un cuadrado
				if (e.touches.length == 4) {
					// Calcular las coordenadas del cuadrado
					let coords = [];
					for (let j = 0; j < 4; j++) {
						coords.push({
							x: (e.touches[j].clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA,
							y: (e.touches[j].clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA
						});
					}
					coords.sort((a, b) => a.x - b.x);
					let leftCoords = [coords[0], coords[1]];
					let rightCoords = [coords[2], coords[3]];
					leftCoords.sort((a, b) => a.y - b.y);
					rightCoords.sort((a, b) => a.y - b.y);
					let topLeft = leftCoords[0];
					let bottomLeft = leftCoords[1];
					let topRight = rightCoords[0];
					let bottomRight = rightCoords[1];

					// Dibujar las líneas del cuadrado
					this.dibujarLinea(this.color, topLeft.x, topLeft.y, topRight.x, topRight.y, this.idGrupoLineasActual, e.touches.length, false);
					this.dibujarLinea(this.color, topRight.x, topRight.y, bottomRight.x, bottomRight.y, this.idGrupoLineasActual, e.touches.length, false);
					this.dibujarLinea(this.color, bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y, this.idGrupoLineasActual, e.touches.length, false);
					this.dibujarLinea(this.color, bottomLeft.x, bottomLeft.y, topLeft.x, topLeft.y, this.idGrupoLineasActual, e.touches.length, true);
				}
				else {
					for (let i = 0; i < e.touches.length - 1; i++) {
						for (let j = i + 1; j < e.touches.length; j++) {
							const TOUCH1 = e.touches[i];
							const TOUCH2 = e.touches[j];
							const X1 = (TOUCH1.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
							const Y1 = (TOUCH1.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;
							const X2 = (TOUCH2.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
							const Y2 = (TOUCH2.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;
							this.dibujarLinea(this.color, X1, Y1, X2, Y2, this.idGrupoLineasActual, e.touches.length, false);
						}
					}
				}
			}
			else {
				if (e.touches.length <= this.nTouchesALaVez) {
					const TOUCH = e.touches[0];
					this.x = (TOUCH.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
					this.y = (TOUCH.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;
					this.dibujarLinea(this.color, this.x, this.y, this.x + 1, this.y, this.idGrupoLineasActual, e.touches.length);
				}
			}
		}
	}

	dibujarTactil(e) {
		if (this.activado && this.tactil == 1) {
			e.preventDefault();
			const PORCENTAJE_RESOLUCION_PIZARRA = this.porcentajeResolucionPizarra;
			const RECT = this.miCanvasPizarra.getBoundingClientRect();
			let esUltimaLineaDeFigura = false;
			if (e.touches.length <= this.nTouchesALaVez) {
				for (let i = 1; i <= this.nTouchesALaVez && i <= e.touches.length; i++) {
					const TOUCH = e.touches[i - 1];
					let x = (TOUCH.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
					let y = (TOUCH.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;

					// Dibujar solo las líneas necesarias para formar un cuadrado
					if (e.touches.length == 4) {
						if (i == 1) {
							// Calcular las coordenadas del cuadrado
							let coords = [];
							for (let j = 0; j < 4; j++) {
								coords.push({
									x: (e.touches[j].clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA,
									y: (e.touches[j].clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA
								});
							}
							coords.sort((a, b) => a.x - b.x);
							let leftCoords = [coords[0], coords[1]];
							let rightCoords = [coords[2], coords[3]];
							leftCoords.sort((a, b) => a.y - b.y);
							rightCoords.sort((a, b) => a.y - b.y);
							let topLeft = leftCoords[0];
							let bottomLeft = leftCoords[1];
							let topRight = rightCoords[0];
							let bottomRight = rightCoords[1];

							// Dibujar las líneas del cuadrado
							this.dibujarLinea(this.color, topLeft.x, topLeft.y, topRight.x, topRight.y, this.idGrupoLineasActual, e.touches.length, false);
							this.dibujarLinea(this.color, topRight.x, topRight.y, bottomRight.x, bottomRight.y, this.idGrupoLineasActual, e.touches.length, false);
							this.dibujarLinea(this.color, bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y, this.idGrupoLineasActual, e.touches.length, false);
							this.dibujarLinea(this.color, bottomLeft.x, bottomLeft.y, topLeft.x, topLeft.y, this.idGrupoLineasActual, e.touches.length, true);
						}
					}
					else {
						// Determinar si es la última línea de la figura
						if (i == e.touches.length && e.touches.length > 1) {
							esUltimaLineaDeFigura = true;
						}
						else {
							//No es una figura y no debemos borrar la última línea de figura
							esUltimaLineaDeFigura = false;
						}

						this.dibujarLinea(this.color, this.x, this.y, x, y, this.idGrupoLineasActual, e.touches.length, esUltimaLineaDeFigura);
					}

					this.x = (TOUCH.clientX - RECT.left) * PORCENTAJE_RESOLUCION_PIZARRA;
					this.y = (TOUCH.clientY - RECT.top) * PORCENTAJE_RESOLUCION_PIZARRA;
				}
			}
		}
	}

	soltarTactil(e) {
		if (this.activado && this.tactil == 1) {
			if (e.touches.length <= this.nTouchesALaVez) {
				const OBJETO = this;
				e.preventDefault();
				this.tactil = 0;

				/*Lo desactivamos brevemente porque al levantar uno de los touch tras crear una figura se pinta un resto*/
				this.activado = false;
				setTimeout(function () { OBJETO.activado = true }, 100);
				this.idGrupoLineasActual++;
			}
		}
	}

	eliminarFigurasAnteriores(_idGrupoLineas, _numeroTouch) {
		let contadorLineas = 0;
		for (let i = this.lineas.length - 1; i >= 0; i--) {
			if (this.lineas[i].idGrupoLineas == _idGrupoLineas) {
				contadorLineas++;
				if (contadorLineas > _numeroTouch) {
					this.lineas.splice(i, 1);
				}
			}
			else if (this.lineas[i].idGrupoLineas < _idGrupoLineas) {
				i = -1;
			}
		}
	}

	redimensionarPizarraTrasTiempo({ tiempoSetTimeOut, altura = "", anchura = "" }) {
		const OBJETO = this;
		clearTimeout(this.timeOnResize);
		this.timeOnResize = setTimeout(
			() => OBJETO.redimensionarPizarra(altura, anchura)
			, tiempoSetTimeOut);
	}

	/**
	 * Cambia el tamaño de la pizarra igualando al tamaño del modelo salvo si recibe un modelo momentáneo
	 * @param {string} [_altura=""] - Modelo momentáneo para altura si lo recibe.
	 * @param {string} [_anchura=""] - Modelo momentáneo para anchura si lo recibe.
	 */
	redimensionarPizarra(_altura = "", _anchura = "") {
		const PORCENTAJE_RESOLUCION_PIZARRA = parseFloat(this.porcentajeResolucionPizarra);
		let modeloAltura;
		let modeloAnchura;

		if (_altura != "") {
			modeloAltura = _altura;
		}
		else {
			modeloAltura = document.getElementById(this.idModeloAltura);
		}

		if (_anchura != "") {
			modeloAnchura = _anchura;
		}
		else {
			modeloAnchura = document.getElementById(this.idModeloAnchura);
		}

		const PIZARRA_CANVAS = document.getElementById(this.idCanvasPizarraObjetivo);
		this.accionesAntesDeRedimensionar();

		//const WI=modeloAnchura.getBoundingClientRect().width.toFixed(5);
		//const HE=modeloAltura.getBoundingClientRect().height.toFixed(5);
		const WI = modeloAnchura.clientWidth.toFixed(5);
		const HE = modeloAltura.clientHeight.toFixed(5);

		//Extensión visual del cuadro canvas
		PIZARRA_CANVAS.style.width = WI + "px";
		PIZARRA_CANVAS.style.height = HE + "px";

		//Resolución del contenido canvas
		this.miCanvasPizarra.width = parseFloat(WI) * PORCENTAJE_RESOLUCION_PIZARRA;
		this.miCanvasPizarra.height = parseFloat(HE) * PORCENTAJE_RESOLUCION_PIZARRA;
	}
	//	/Secundarios
	//	Primarios
	setNTouchesALaVez(_nTouchesALaVez) {
		this.nTouchesALaVez = _nTouchesALaVez;
	}

	setidModeloAltura(_idModeloAltura) {
		this.idModeloAltura = _idModeloAltura;
		if (this.eventosIniciados && this.observerPizarra != null) {
			this.reiniciarObserver();
		}
	}

	setidModeloAnchura(_idModeloAnchura) {
		this.idModeloAnchura = _idModeloAnchura;
		if (this.eventosIniciados && this.observerPizarra != null) {
			this.reiniciarObserver();
		}
	}

	setCalidadTrazo(_calidadPizarra) {
		this.porcentajeResolucionPizarra = parseFloat(_calidadPizarra);
	}

	pintarPantallaCompletamente() {//Después puedes descubrir fondo borrando
		//const CTX = this.miCanvasPizarra.getContext("2d");
		const CTX = this.papel;
		const IMAGE_DATA = CTX.getImageData(0, 0, this.miCanvasPizarra.width, this.miCanvasPizarra.height);
		const DATA = IMAGE_DATA.data;
		for (let i = 0; i < DATA.length; i += 4) {
			DATA[i + 3] = 255;
		}
		CTX.putImageData(IMAGE_DATA, 0, 0);
	}

	/**
	 * Repinta las líneas guardadas en el array de tal manera que conservan proporcionalidad al cambio de tamaño del canvas
	 */
	repintarLineas() {
		const PORCENTAJE_RESOLUCION_PIZARRA = this.porcentajeResolucionPizarra;
		this.borrarPizarra();
		const CTX = this.papel;

		// Dibuje todas las líneas guardadas encima de la imagen guardada
		CTX.globalCompositeOperation = "source-over";

		// Obtener la posición actual del scroll en el div con scroll
		const DIV_SCROLL = document.getElementById(this.idDivConScroll);
		const SCROLL_TOP = DIV_SCROLL.scrollTop;
		const SCROLL_LEFT = DIV_SCROLL.scrollLeft;
		const SCROLL_WIDTH = DIV_SCROLL.scrollWidth;
		const SCROLL_HEIGHT = DIV_SCROLL.scrollHeight;

		for (let i = 0; i < this.lineas.length; i++) {
			const LINEA = this.lineas[i];
			if (LINEA.visible) {
				const SCROLL_WIDTH_PORCENTAJE_CAMBIO = SCROLL_WIDTH / (LINEA.divScrollScrollWidth);
				const SCROLL_HEIGHT_PORCENTAJE_CAMBIO = SCROLL_HEIGHT / (LINEA.divScrollScrollHeight);

				const SCROLL_WIDTH_PORCENTAJE_CAMBIO_INVERSO = (LINEA.divScrollScrollWidth) / SCROLL_WIDTH;
				const SCROLL_HEIGHT_PORCENTAJE_CAMBIO_INVERSO = (LINEA.divScrollScrollHeight) / SCROLL_HEIGHT;

				const X1_RELATIVE = LINEA.x1 + ((LINEA.divScrollScrollLeft - (SCROLL_LEFT * SCROLL_WIDTH_PORCENTAJE_CAMBIO_INVERSO)) * PORCENTAJE_RESOLUCION_PIZARRA);
				const Y1_RELATIVE = LINEA.y1 + ((LINEA.divScrollScrollTop - (SCROLL_TOP * SCROLL_HEIGHT_PORCENTAJE_CAMBIO_INVERSO)) * PORCENTAJE_RESOLUCION_PIZARRA);
				const X2_RELATIVE = LINEA.x2 + ((LINEA.divScrollScrollLeft - (SCROLL_LEFT * SCROLL_WIDTH_PORCENTAJE_CAMBIO_INVERSO)) * PORCENTAJE_RESOLUCION_PIZARRA);
				const Y2_RELATIVE = LINEA.y2 + ((LINEA.divScrollScrollTop - (SCROLL_TOP * SCROLL_HEIGHT_PORCENTAJE_CAMBIO_INVERSO)) * PORCENTAJE_RESOLUCION_PIZARRA);

				const X1 = (X1_RELATIVE * SCROLL_WIDTH_PORCENTAJE_CAMBIO);
				const Y1 = (Y1_RELATIVE * SCROLL_HEIGHT_PORCENTAJE_CAMBIO);
				const X2 = (X2_RELATIVE * SCROLL_WIDTH_PORCENTAJE_CAMBIO);
				const Y2 = (Y2_RELATIVE * SCROLL_HEIGHT_PORCENTAJE_CAMBIO);

				let coordenadasVisibles = this.obtenerCoordenadasVisibles(document.getElementById(this.idDivConScroll));
				if ((X1 >= coordenadasVisibles.xMin && X1 <= coordenadasVisibles.xMax && Y1 >= coordenadasVisibles.yMin && Y1 <= coordenadasVisibles.yMax) || (X2 >= coordenadasVisibles.xMin && X2 <= coordenadasVisibles.xMax && Y2 >= coordenadasVisibles.yMin && Y2 <= coordenadasVisibles.yMax)) {
					CTX.beginPath();
					CTX.strokeStyle = LINEA.color;
					let lineWidth = LINEA.tamano * (DIV_SCROLL.scrollWidth / LINEA.divScrollScrollWidth);
					CTX.lineWidth = lineWidth * PORCENTAJE_RESOLUCION_PIZARRA;
					let lineHeight = LINEA.tamano * (DIV_SCROLL.scrollHeight / LINEA.divScrollScrollHeight);
					CTX.lineHeight = lineHeight * PORCENTAJE_RESOLUCION_PIZARRA;
					CTX.lineCap = "round";
					CTX.moveTo(X1, Y1);

					if (LINEA.borrador) {
						let borradorSize = LINEA.tamano * (this.miCanvasPizarra.width / LINEA.widthPizarraResolution);
						CTX.globalCompositeOperation = "destination-out";
						CTX.arc(X2, Y2, borradorSize * PORCENTAJE_RESOLUCION_PIZARRA, 0, LINEA.multiplicadorBorrador * Math.PI * PORCENTAJE_RESOLUCION_PIZARRA);
						CTX.fill();
						CTX.globalCompositeOperation = "source-over";
					}
					else {
						CTX.lineTo(X2, Y2);
						CTX.stroke();
					}
					CTX.closePath();
				}
			}
		}
	}

	obtenerCoordenadasVisibles(divConScroll) {
		//Las coordenadas se usarán comparando con las coordenadas relativas al canvas (coordenada X 0 es la línea izq del canvas)
		const MARGEN = 50;
		const WIDTH_DIV_SCROLL = divConScroll.clientWidth;
		const HEIGHT_DIV_SCROLL = divConScroll.clientHeight;
		const xMin = -MARGEN;
		const xMax = WIDTH_DIV_SCROLL + MARGEN;
		const yMin = -MARGEN;
		const yMax = HEIGHT_DIV_SCROLL + MARGEN;

		return { xMin, xMax, yMin, yMax };
	}

	eliminarUltimaLineaGuardada() {
		this.lineas.splice(-1, 1);
		this.repintarLineas();
	}

	/**
	 * Útil cuando se puede aplicar un zoom tocando en la pizarra dejando pues un resto pintado involuntario, para así borrarlo tras terminar el zoom
	 */
	eliminarUltimoGrupoDeLineasGuardado() {
		if (this.lineas.length === 0) {
			return; // No hay líneas para eliminar
		}

		let idGrupoAEliminar = this.lineas[this.lineas.length - 1]?.idGrupoLineas;

		if (idGrupoAEliminar === undefined) {
			return; // El último elemento no tiene la propiedad "idGrupoLineas"
		}

		for (let i = this.lineas.length - 1; i >= 0; i--) {
			if (this.lineas[i]?.idGrupoLineas === idGrupoAEliminar) {
				this.lineas.splice(i, 1);
			}
			else {
				break; // Detener el bucle si no se cumple la condición
			}
		}
		this.repintarLineas();
	}

	/**
	 * Establece el modelo de anchura aplicando lo guardado en su posición absoluta eligiendo el mayor o el menor.
	 * @param {Array<HTMLElement>|HTMLElement} _elementos - Los elementos a comparar.
	 * @param {string} [_mayorOMenor="mayor"] - Indica si se debe elegir el elemento con mayor o menor anchura.
	 */
	setModeloAnchuraAplicandoLoGuardadoEnSuPosicionAbsolutaEligiendoMayorOMenor(_elementos, _mayorOMenor = "mayor") {
		_elementos = this.pasarAArray(_elementos);

		let elementoSeleccionado = _elementos[0];
		if (_mayorOMenor == "mayor") {
			for (let i = 0; i < _elementos.length; i++) {
				if (_elementos[i].clientWidth > elementoSeleccionado.clientWidth) {
					elementoSeleccionado = _elementos[i];
				}
			}
		}
		else {
			for (let i = 0; i < _elementos.length; i++) {
				if (_elementos[i].clientWidth < elementoSeleccionado.clientWidth) {
					elementoSeleccionado = _elementos[i];
				}
			}
		}
		this.setModeloAnchuraAplicandoLoGuardadoEnSuPosicionAbsoluta(elementoSeleccionado);
	}

	/**
	 * Establece el modelo de anchura aplicando lo guardado en su posición absoluta.
	 * @param {HTMLElement} _elementoModeloNuevo - El nuevo elemento modelo.
	 */
	setModeloAnchuraAplicandoLoGuardadoEnSuPosicionAbsoluta(_elementoModeloNuevo) {
		// Antes de usar esta función se debe usar "guardarLineas()" para poder redibujar lo que había antes de la modificación
		const MODELO_ANCHURA_ANTIGUO = document.getElementById(this.idModeloAnchura);
		const WITH_MODELO_ANTIGUO = MODELO_ANCHURA_ANTIGUO.clientWidth;
		this.idModeloAnchura = _elementoModeloNuevo.id;
		const WIDTH_MODELO_NUEVO = _elementoModeloNuevo.clientWidth;
		const DIFERENCIA_WIDTH = WIDTH_MODELO_NUEVO - WITH_MODELO_ANTIGUO;
		const WIDTH_DESDE_IZQ = DIFERENCIA_WIDTH / 2;

		// Redibujar lineas en la pizarra agrandada
		if (this.miCanvasPizarra.width > 0 && this.miCanvasPizarra.height > 0) {
			// Dibujar el contenido guardado en el nuevo tamaño
			this.papel = this.miCanvasPizarra.getContext("2d");
			this.papel.drawImage(this.tempCanvas, 0, 0, this.tempCanvas.width, this.tempCanvas.height, WIDTH_DESDE_IZQ, 0, this.miCanvasPizarra.width, this.miCanvasPizarra.height);
		}
		this.redimensionarPizarra();
	}

	setModeloAlturaAplicandoLoGuardadoEnSuPosicionAbsolutaEligiendoMayorOMenor(_elementos, _mayorOMenor = "mayor") {
		_elementos = this.pasarAArray(_elementos);

		let elementoSeleccionado = _elementos[0];
		if (_mayorOMenor == "mayor") {
			for (let i = 0; i < _elementos.length; i++) {
				if (_elementos[i].clientHeight > elementoSeleccionado.clientHeight) {
					elementoSeleccionado = _elementos[i];
				}
			}
		}
		else {
			for (let i = 0; i < _elementos.length; i++) {
				if (_elementos[i].clientHeight < elementoSeleccionado.clientHeight) {
					elementoSeleccionado = _elementos[i];
				}
			}
		}
		this.setModeloAlturaAplicandoLoGuardadoEnSuPosicionAbsoluta(elementoSeleccionado);
	}

	setModeloAlturaAplicandoLoGuardadoEnSuPosicionAbsoluta(_elementoModeloNuevo) {//Antes de usar esta función se debe usar "guardarLineas()" para poder redibujar lo que había antes de la modificación;
		const MODELO_ALTURA_ANTIGUO = document.getElementById(this.idModeloAltura);
		const HEIGHT_MODELO_ANTIGUO = MODELO_ALTURA_ANTIGUO.clientHeight;
		this.idModeloAnchura = _elementoModeloNuevo.id;
		const HEIGHT_MODELO_NUEVO = _elementoModeloNuevo.clientHeight;
		const DIFERENCIA_HEIGHT = HEIGHT_MODELO_NUEVO - HEIGHT_MODELO_ANTIGUO;
		const HEIGHT_DESDE_ARRIBA = DIFERENCIA_HEIGHT / 2;
		//redibujar lineas en la pizarra agrandada
		if (this.miCanvasPizarra.width > 0 && this.miCanvasPizarra.height > 0) {
			// Dibujar el contenido guardado en el nuevo tamaño
			this.papel = this.miCanvasPizarra.getContext("2d");
			this.papel.drawImage(this.tempCanvas, 0, 0, this.tempCanvas.width, this.tempCanvas.height, 0, HEIGHT_DESDE_ARRIBA, this.miCanvasPizarra.width, this.miCanvasPizarra.height);
		}
		this.redimensionarPizarra();
	}

	/**
	 * Recorre el array de líneas guardadas empezando desde el final, dejando en no visible la última línea que sea visible, para que al redibujar líneas, no se vean
	 */
	deshacerUltimaLineaGuardada() {
		for (let i = this.lineas.length - 1; i >= 0; i--) {
			if (this.lineas[i].visible) {
				this.lineas[i].visible = false;
				i = -1;
			}
		}
		this.repintarLineas();
	}

	/**
	 * Recorre el array de líneas guardadas empezando desde el principio, dejando en visible la última línea que sea no visible, para que al redibujar líneas, se vean
	 */
	rehacerUltimaLineaDeshecha() {
		for (let i = 0; i < this.lineas.length; i++) {
			if (!this.lineas[i].visible) {
				this.lineas[i].visible = true;
				i = this.lineas.length;
			}
		}
		this.repintarLineas();
	}

	deshacerUltimoGrupoDeLineasGuardadas() {
		let idGrupoLineasAOcultar = 0;
		for (let i = this.lineas.length - 1; i >= 0; i--) {
			if (this.lineas[i].visible) {
				if (idGrupoLineasAOcultar == 0) {
					idGrupoLineasAOcultar = this.lineas[i].idGrupoLineas;
				}

				if (this.lineas[i].idGrupoLineas == idGrupoLineasAOcultar) {
					this.lineas[i].visible = false;
				}
				else if (idGrupoLineasAOcultar != 0 && this.lineas[i].idGrupoLineas < idGrupoLineasAOcultar) {
					i = 0;
				}
			}
		}
		this.repintarLineas();
	}

	rehacerUltimoGrupoDeLineasGuardadas() {
		let idGrupoLineasAMostrar = 0;
		for (let i = 0; i < this.lineas.length; i++) {
			if (!this.lineas[i].visible) {
				if (idGrupoLineasAMostrar == 0) {
					idGrupoLineasAMostrar = this.lineas[i].idGrupoLineas;
				}

				if (this.lineas[i].idGrupoLineas == idGrupoLineasAMostrar) {
					this.lineas[i].visible = true;
				}
				else if (idGrupoLineasAMostrar != 0 && this.lineas[i].idGrupoLineas > idGrupoLineasAMostrar) {
					i = this.lineas.length;
				}
			}
		}
		this.repintarLineas();
	}

	/**
	 * Borra la pizarra pero deja intacto el array de líneas guardadas
	 */
	borrarPizarra() {
		const CTX = this.papel;
		CTX.clearRect(0, 0, this.miCanvasPizarra.width, this.miCanvasPizarra.height);
		this.redimensionarPizarra();
	}

	/**
	 * Borra la pizarra y las posiciones del array de líneas guardadas
	 */
	borrarPizarraYLineasGuardadas() {
		this.borrarPizarra();
		this.lineas = [];
	}

	/**
	 * Adapta la pizarra al tamaño del modelo e inicia eventos para comenzar su uso
	 */
	iniciarPizarra() {
		this.redimensionarPizarra();
		this.iniciarEventosPizarra();
		//this.iniciarEventosPizarra(this.constructor.name);
	}
	//	/Primarios
	//	Opcionales
	setColorTrazo(_color) {
		this.borrador = false;
		this.color = _color;
	}

	setTamano(_tamano) {
		//Recomendados 5, 10 ,15, 50 para borrar
		this.tamano = _tamano;
	}

	/**
	 * Activa modo borrar, en el método pintarLinea se tendrá en cuenta, de modo que las líneas de borrado se guardarán también en el array de líneas pintadas
	 */
	modoBorrador() {
		if (this.borrador) {
			this.borrador = false;
			if (this.modoCursorBorrador) {
				this.miCanvasPizarra.style.cursor = "initial";
			}
		}
		else {
			this.borrador = true;
			if (this.modoCursorBorrador) {
				this.miCanvasPizarra.style.cursor = "url('" + this.cursorBorrador + "') 15 15, auto";
			}
		}
	}
	//	/Opcionales
}
//======================================================================
// 	/Class Pizarra
//======================================================================

//======================================================================
// 	Class ToolZoom
//======================================================================
class ToolZoom {
	//El div padre de los class que cambian de tamaño, no debe tener padding

	activado = true;
	nPaginasMargenDeCarga = 2;

	//	tools
	/**
	 * Obtiene el valor de una propiedad CSS de un elemento del DOM.
	 * @param {HTMLElement} _elemento - El elemento del DOM del cual obtener el valor de la propiedad CSS.
	 * @param {string} _propiedadCSS - La propiedad CSS cuyo valor se desea obtener.
	 * @param {string} [_porcentajeWidthHeight=""] - Si se especifica "width" o "height", se devuelve el ancho o alto del elemento en porcentaje en lugar del valor de la propiedad CSS.
	 * @returns {*} El valor de la propiedad CSS especificada en el elemento proporcionado.
	 */
	getValorCSS2(_elemento, _propiedadCSS, _porcentajeWidthHeight = "") {
		let rsp,
			CSSElemento;

		//Recuerda que las 2 siguientes líneas pueden recoger el valor de la propiedad CSS aunque no se le haya cambiado antes ni atribuido en con el atributo style en el html
		CSSElemento = window.getComputedStyle(_elemento);
		rsp = CSSElemento.getPropertyValue(_propiedadCSS);

		//Recuerda que getComputedStyle guarda los valores en px, o que getPropertyValue recoge valores en px
		if (_porcentajeWidthHeight == "width") {
			rsp = (_elemento.clientWidth * 100) / _elemento.parentElement.clientWidth;
		}
		if (_porcentajeWidthHeight == "height") {
			rsp = (_elemento.clientHeight * 100) / _elemento.parentElement.clientHeight;
		}

		return rsp;
	}
	//	/tools

	//	secundarias
	/**
	 * Calcula la distancia entre dos toques en la pantalla. Inventada por mí :-)
	 * @param {TouchEvent} _e - El evento de toque.
	 * @returns {number} La distancia entre los dos toques.
	 */
	dameDistanciaEntre2TouchMIO_OLD(_e) {
		//Este lo hice yo pensándolo detenidamente
		const POSICION_Y0 = _e.touches[0].clientY;
		const POSICION_X0 = _e.touches[0].clientX;
		let posicionY1;
		let posicionX1;
		let rsp;
		if (_e.touches.length > 1) {
			posicionY1 = _e.touches[1].clientY;
			posicionX1 = _e.touches[1].clientX;
		}
		rsp = (POSICION_Y0 - posicionY1) + (POSICION_X0 - posicionX1);
		if (rsp < 0) {
			rsp = rsp * (-1);
		}
		return rsp;
	}

	dameDistanciaEntre2Touch(_e) {
		const POSICION_Y0 = _e.touches[0].clientY;
		const POSICION_X0 = _e.touches[0].clientX;
		const POSICION_Y1 = _e.touches[1].clientY;
		const POSICION_X1 = _e.touches[1].clientX;
		const RSP = Math.sqrt(Math.pow(POSICION_X1 - POSICION_X0, 2) + Math.pow(POSICION_Y1 - POSICION_Y0, 2));
		return RSP;
	}

	compensarScrollVerticalTrasZoom2(prevContentHeight, divScroll, prevScrollTop) {
		const SCROLL_BEHAVIOR_INICIAL = this.getValorCSS2(divScroll, "scroll-behavior");
		divScroll.style.scrollBehavior = "initial";
		//Compensar Scroll vertical al hacer zoom 2
		// Obtener altura del div que contiene elementos después de aplicar el zoom
		const NEW_CONTENT_HEIGHT = divScroll.scrollHeight;

		// Calcular el factor de cambio de ambas alturas sacadas
		const HEIGHT_CHANGE_FACTOR = NEW_CONTENT_HEIGHT / prevContentHeight;

		// Calcular la posición del centro de la barra de scroll antes del cambio
		const centerBeforeChange = prevScrollTop + divScroll.clientHeight / 2;

		// Aplicar el factor al scrollLeft para mantener la posición relativa en altura
		divScroll.scrollTop = centerBeforeChange * HEIGHT_CHANGE_FACTOR - divScroll.clientHeight / 2;

		divScroll.style.scrollBehavior = SCROLL_BEHAVIOR_INICIAL;

		/*
			Notas de uso:
				Antes del cambio de altura, guardar la altura y el scrollTop para recibirlos a esta función por parámetro, junto al div con scroll.
				P.e.: 	const DIV_SCROLL= document.getElementById("id_div_con_scroll");
						const PREV_CONTENT_HEIGHT = DIV_SCROLL.scrollHeight;
						const PREV_SCROLL_TOP = DIV_SCROLL.scrollTop;

						Acciones que conllevan cambio de tamaño

						compensarScrollVerticalTrasZoom2(PREV_CONTENT_HEIGHT, DIV_SCROLL, PREV_SCROLL_TOP);
		*/
	}

	compensarScrollHorizontalTrasZoom2(prevContentWidth, divScroll, prevScrollLeft) {
		// Quitamos el suavizado de scroll si lo tenía para restaurarlo más adelante
		const SCROLL_BEHAVIOR_INICIAL = this.getValorCSS2(divScroll, "scroll-behavior");
		divScroll.style.scrollBehavior = "auto";

		// Obtener anchura del div que contiene elementos después de aplicar el zoom
		const NEW_CONTENT_WIDTH = divScroll.scrollWidth;

		// Calcular el factor de cambio de ambas alturas sacadas
		const WIDTH_CHANGE_FACTOR = NEW_CONTENT_WIDTH / prevContentWidth;

		// Calcular la posición del centro de la barra de scroll antes del cambio
		const centerBeforeChange = prevScrollLeft + divScroll.clientWidth / 2;

		// Aplicar el factor al scrollLeft para mantener la posición relativa en altura
		divScroll.scrollLeft = centerBeforeChange * WIDTH_CHANGE_FACTOR - divScroll.clientWidth / 2;

		divScroll.style.scrollBehavior = SCROLL_BEHAVIOR_INICIAL;

		/*
		  Notas de uso:
		  Antes del cambio de altura, guardar la anchura y el scrollLeft para recibirlos a esta función por parámetro, junto al div con scroll.
		  P.e.:  const DIV_SCROLL= document.getElementById("id_div_con_scroll");
					 const PREV_CONTENT_WIDTH = DIV_SCROLL.scrollWidth;
				 const PREV_SCROLL_LEFT = DIV_SCROLL.scrollLeft;

				Acciones que conllevan cambio de tamaño

				compensarScrollVerticalTrasZoom2(PREV_CONTENT_WIDTH, DIV_SCROLL, PREV_SCROLL_LEFT);
		*/
	}

	getPaginaVisibleSegunAlturaScroll(_idDivConScroll, _classPaginas = "pagina") {
		//Actualiza el input al número de página la cuál tenga mayor cantidad visible en pantalla
		const DIV_CON_SCROLL = document.querySelector("#" + _idDivConScroll);
		let nPaginaVisible = 1;
		let maxVisiblePercentage = 0;
		const PAGINAS = DIV_CON_SCROLL.querySelectorAll("." + _classPaginas);
		for (let i = 0; i < PAGINAS.length; i++) {
			const PAGINA_RECT = PAGINAS[i].getBoundingClientRect();
			const DIV_CON_SCROLL_RECT = DIV_CON_SCROLL.getBoundingClientRect();
			if (PAGINA_RECT.bottom >= DIV_CON_SCROLL_RECT.top && PAGINA_RECT.top <= DIV_CON_SCROLL_RECT.bottom) {
				const VISIBLE_HEIGHT = Math.min(PAGINA_RECT.bottom, DIV_CON_SCROLL_RECT.bottom) - Math.max(PAGINA_RECT.top, DIV_CON_SCROLL_RECT.top);
				const VISIBLE_PORCENTAJE = VISIBLE_HEIGHT / PAGINA_RECT.height;
				if (VISIBLE_PORCENTAJE > maxVisiblePercentage) {
					maxVisiblePercentage = VISIBLE_PORCENTAJE;
					nPaginaVisible = i + 1;
				}
			}
		}
		return nPaginaVisible;
	}

	compensarScrollVerticalTrasZoom2Temporal(_prevContentHeight, _divScroll, _prevScrollTop, _tamanoAntes, _tamanoDespues, _nDivsCambianTamano) {
		const SCROLL_BEHAVIOR_INICIAL = this.getValorCSS2(_divScroll, "scroll-behavior");
		_divScroll.style.scrollBehavior = "initial";

		const NEW_CONTENT_HEIGHT = _divScroll.scrollHeight;
		const HEIGHT_CHANGE_FACTOR = NEW_CONTENT_HEIGHT / _prevContentHeight;

		const HEIGHT_CHANGE_FACTOR_INVERT = _prevContentHeight / NEW_CONTENT_HEIGHT;

		// Calcular la posición del centro de la barra de scroll antes del cambio
		const centerBeforeChange = _prevScrollTop + _divScroll.clientHeight / 2;

		// Calcular la diferencia total en la altura de los divs que cambian de tamaño
		const diferenciaTamanoDivsFuturo = Math.abs((_tamanoAntes * HEIGHT_CHANGE_FACTOR) - _tamanoDespues) * _nDivsCambianTamano;

		// Ajustar el cambio de altura en función de si _tamanoAntes es mayor o menor que _tamanoDespues
		const changeInHeight = _tamanoAntes > _tamanoDespues ? diferenciaTamanoDivsFuturo : -diferenciaTamanoDivsFuturo;

		// Calcular la nueva posición del centro de la barra de scroll después del cambio
		const newCenterAfterChange = centerBeforeChange * HEIGHT_CHANGE_FACTOR + changeInHeight;

		// Ajustar el scrollTop para mantener la posición relativa en altura
		_divScroll.scrollTop = newCenterAfterChange - _divScroll.clientHeight / 2;

		_divScroll.style.scrollBehavior = SCROLL_BEHAVIOR_INICIAL;
	}

	compensarScrollVerticalTrasZoom2Temporal2(_prevContentHeight, _divScroll, _prevScrollTop, _tamanoAntes, _tamanoDespues, _nDivsCambianTamano) {
		const SCROLL_BEHAVIOR_INICIAL = this.getValorCSS2(_divScroll, "scroll-behavior");
		_divScroll.style.scrollBehavior = "initial";

		const NEW_CONTENT_HEIGHT = _divScroll.scrollHeight;
		const HEIGHT_CHANGE_FACTOR = NEW_CONTENT_HEIGHT / _prevContentHeight;

		const cambioTotalAlturaDivs = ((_tamanoAntes * HEIGHT_CHANGE_FACTOR) - _tamanoDespues) * _nDivsCambianTamano;

		const centerBeforeChange = _prevScrollTop + _divScroll.clientHeight / 2;

		const newCenterAfterChange = centerBeforeChange * HEIGHT_CHANGE_FACTOR + cambioTotalAlturaDivs;

		_divScroll.scrollTop = newCenterAfterChange - _divScroll.clientHeight / 2;

		_divScroll.style.scrollBehavior = SCROLL_BEHAVIOR_INICIAL;
	}



	//base
	compensarScrollVerticalTrasZoom2TemporalBASE(_prevContentHeight, _divScroll, _prevScrollTop, _tamanoAntes, _tamanoDespues, _nDivsCambianTamano) {
		const SCROLL_BEHAVIOR_INICIAL = this.getValorCSS2(_divScroll, "scroll-behavior");
		_divScroll.style.scrollBehavior = "initial";

		const NEW_CONTENT_HEIGHT = _divScroll.scrollHeight;
		const HEIGHT_CHANGE_FACTOR = NEW_CONTENT_HEIGHT / _prevContentHeight;

		//const HEIGHT_CHANGE_FACTOR_INVERT = _prevContentHeight/NEW_CONTENT_HEIGHT;
		//let diferenciaTamanoDivsFuturo=Math.abs((_tamanoAntes*HEIGHT_CHANGE_FACTOR) -_tamanoDespues) * _nDivsCambianTamano ;
		//let diferenciaTamanoDivsPasado=(_tamanoAntes - (_tamanoDespues * HEIGHT_CHANGE_FACTOR_INVERT)) * _nDivsCambianTamano ;

		const CENTER_BEFORE_CHANGE = _prevScrollTop + _divScroll.clientHeight / 2;
		const CENTER_AFTER_CHANGE = CENTER_BEFORE_CHANGE * HEIGHT_CHANGE_FACTOR;

		_divScroll.scrollTop = (CENTER_AFTER_CHANGE - _divScroll.clientHeight / 2);

		_divScroll.style.scrollBehavior = SCROLL_BEHAVIOR_INICIAL;
	}

	//	/secundarias
	//	primarias
	aplicarZoomDeImagenes({ _idDivObjetivoEventoZoom, _idDivScroll, _idDivContenedorPaginas, _querySelectorAllDeElementosAAplicarZoom, _widthMaximoZoom = 0, _widthMinimoZoom = 0, _widthIntervaloZoom = 0, _accionesAlAcabar = () => { }, _accionesAlIniciar = () => { }, _accionesAlLevantar = () => { }, _sensibilidadZoomTactil = 12 }) {
		this.aplicarZoomMouseDeImagenes(
			{
				_idDivObjetivoEventoZoom: _idDivObjetivoEventoZoom,
				_idDivScroll: _idDivScroll,
				_querySelectorAllDeElementosAAplicarZoom: _querySelectorAllDeElementosAAplicarZoom,
				_widthMaximoZoom: _widthMaximoZoom,
				_widthMinimoZoom: _widthMinimoZoom,
				_widthIntervaloZoom: _widthIntervaloZoom,
				_accionesAlAcabar: _accionesAlAcabar,
				_accionesAlIniciar: _accionesAlIniciar
			});
		this.aplicarZoomTactilDeImagenes(
			{
				_idDivObjetivoEventoZoom: _idDivObjetivoEventoZoom,
				_idDivScroll: _idDivScroll,
				_idDivContenedorPaginas: _idDivContenedorPaginas,
				_querySelectorAllDeElementosAAplicarZoom: _querySelectorAllDeElementosAAplicarZoom,
				_widthMaximoZoom: _widthMaximoZoom,
				_widthMinimoZoom: _widthMinimoZoom,
				_accionesAlAcabar: _accionesAlAcabar,
				_accionesAlIniciar: _accionesAlIniciar,
				_accionesAlLevantar: _accionesAlLevantar,
				_sensibilidadZoomTactil: _sensibilidadZoomTactil
			});
	}

	aplicarZoomMouseDeImagenes({ _idDivObjetivoEventoZoom, _idDivScroll, _querySelectorAllDeElementosAAplicarZoom, _widthMaximoZoom = 250, _widthMinimoZoom = 50, _widthIntervaloZoom = 5, _accionesAlIniciar = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlAcabar = () => { } }) {
		const DIV_OBJETIVO_EVENTO_ZOOM = document.getElementById(_idDivObjetivoEventoZoom);
		const OBJETO = this;

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("wheel", (e) => {
			if (OBJETO.activado) {
				const ELEMENTOS_A_ZOOMEAR = Array.from(document.querySelectorAll(_querySelectorAllDeElementosAAplicarZoom));
				let alejando = false;
				if (e.deltaY > 0) {
					alejando = true;
				}

				if (e.shiftKey && ELEMENTOS_A_ZOOMEAR.length > 0) {
					e.preventDefault();
					const DIV_SCROLL = document.getElementById(_idDivScroll);
					let widthPagina1Porcentaje = (ELEMENTOS_A_ZOOMEAR[0].clientWidth * 100) / DIV_SCROLL.clientWidth;

					if (alejando) {
						widthPagina1Porcentaje = Number(widthPagina1Porcentaje - _widthIntervaloZoom).toFixed(3);
						widthPagina1Porcentaje = Math.max(widthPagina1Porcentaje, _widthMinimoZoom);
					}
					else {
						let widthIntervaloZoomTemp;
						if (widthPagina1Porcentaje > 100) {
							widthIntervaloZoomTemp = _widthIntervaloZoom * 1.2;
						}
						else {
							widthIntervaloZoomTemp = _widthIntervaloZoom;
						}
						widthPagina1Porcentaje = Number(widthPagina1Porcentaje + widthIntervaloZoomTemp).toFixed(3);

						widthPagina1Porcentaje = Math.min(widthPagina1Porcentaje, _widthMaximoZoom);
					}

					const WIDTH_PAGINA1_PORCENTAJE = `${widthPagina1Porcentaje}%`;

					const PREV_CONTENT_HEIGHT = DIV_SCROLL.scrollHeight;
					const PREV_SCROLL_TOP = DIV_SCROLL.scrollTop;
					const PREV_CONTENT_WIDTH = DIV_SCROLL.scrollWidth;
					const PREV_SCROLL_LEFT = DIV_SCROLL.scrollLeft;

					_accionesAlIniciar();
					for (let i = 0; i < ELEMENTOS_A_ZOOMEAR.length; i++) {
						ELEMENTOS_A_ZOOMEAR[i].style.width = WIDTH_PAGINA1_PORCENTAJE;
						_accionesDuranteEjecucion();
					}
					OBJETO.compensarScrollVerticalTrasZoom2(PREV_CONTENT_HEIGHT, DIV_SCROLL, PREV_SCROLL_TOP);
					OBJETO.compensarScrollHorizontalTrasZoom2(PREV_CONTENT_WIDTH, DIV_SCROLL, PREV_SCROLL_LEFT);

					_accionesAlAcabar();
				}
			}
		});
	}

	aplicarZoomTactilDeImagenes({ _querySelectorAllDeElementosAAplicarZoom, _idDivObjetivoEventoZoom, _idDivScroll, _widthMaximoZoom = 300, _widthMinimoZoom = 50, _accionesAlIniciar = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlLevantar = () => { }, _sensibilidadZoom = 0.3 }) {
		const DIV_SCROLL = document.getElementById(_idDivScroll);
		const DIV_OBJETIVO_EVENTO_ZOOM = document.getElementById(_idDivObjetivoEventoZoom);
		const OBJETO = this;

		let elementosAZoomear;
		let distanciaInicial = 0;
		let zoomeando = false;

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("touchstart", function (e) {
			if (OBJETO.activado) {
				elementosAZoomear = Array.from(document.querySelectorAll(_querySelectorAllDeElementosAAplicarZoom));
				if (e.touches.length == 2 && elementosAZoomear.length > 0) {
					if (elementosAZoomear.length > 0) {
						e.preventDefault();
						distanciaInicial = OBJETO.dameDistanciaEntre2Touch(e);
						zoomeando = true;
						_accionesAlIniciar();
					}
				}
			}
		});

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("touchmove", function (e) {
			if (OBJETO.activado) {
				if (e.touches.length == 2 && zoomeando) {
					const distanciaActual = OBJETO.dameDistanciaEntre2Touch(e);
					e.preventDefault();
					const diferenciaEntreDistanciasPx = distanciaActual - distanciaInicial;
					distanciaInicial = distanciaActual;
					const sensibilidadZoomRelativa = Math.abs(diferenciaEntreDistanciasPx) * _sensibilidadZoom;
					let widthActual = OBJETO.getValorCSS2(elementosAZoomear[0], "width", "width");
					let widthAAplicar = widthActual;
					if (diferenciaEntreDistanciasPx > 0) {
						widthAAplicar += sensibilidadZoomRelativa;
					}
					else {
						widthAAplicar -= sensibilidadZoomRelativa;
					}

					widthAAplicar = Math.min(Math.max(widthAAplicar, _widthMinimoZoom), _widthMaximoZoom);

					//Paso 1 compensar scroll
					const PREV_CONTENT_HEIGHT = DIV_SCROLL.scrollHeight;
					const PREV_SCROLL_TOP = DIV_SCROLL.scrollTop;
					const PREV_CONTENT_WIDTH = DIV_SCROLL.scrollWidth;
					const PREV_SCROLL_LEFT = DIV_SCROLL.scrollLeft;
					for (let i = 0; i < elementosAZoomear.length; i++) {
						elementosAZoomear[i].style.width = widthAAplicar + "%";
						_accionesDuranteEjecucion();
					}
					//Paso 2 compensar altura scroll
					OBJETO.compensarScrollVerticalTrasZoom2(PREV_CONTENT_HEIGHT, DIV_SCROLL, PREV_SCROLL_TOP);
					OBJETO.compensarScrollHorizontalTrasZoom2(PREV_CONTENT_WIDTH, DIV_SCROLL, PREV_SCROLL_LEFT);
				}
			}
		});

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("touchend", function () {
			if (OBJETO.activado) {
				if (zoomeando) {
					_accionesAlLevantar();
					zoomeando = false;
				}
			}
		});
	}

	aplicarZoomDeElementos({ _idDivObjetivoEventoZoom, _idDivScroll, _querySelectorAllDeElementosAAplicarZoom, _MaximoZoom = 0, _MinimoZoom = 0, _IntervaloZoom = 0, _accionesAlIniciar = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlAcabar = () => { } }) {
		this.aplicarZoomMouseDeElementos(
			{
				_idDivObjetivoEventoZoom: _idDivObjetivoEventoZoom,
				_idDivScroll: _idDivScroll,
				_querySelectorAllDeElementosAAplicarZoom: _querySelectorAllDeElementosAAplicarZoom,
				_MaximoZoom: _MaximoZoom,
				_MinimoZoom: _MinimoZoom,
				_IntervaloZoom: _IntervaloZoom,
				_accionesAlIniciar: _accionesAlIniciar,
				_accionesDuranteEjecucion: _accionesDuranteEjecucion,
				_accionesAlAcabar: _accionesAlAcabar
			});
		this.aplicarZoomTactilDeElementos(
			{
				_idDivObjetivoEventoZoom: _idDivObjetivoEventoZoom,
				_idDivScroll: _idDivScroll,
				_querySelectorAllDeElementosAAplicarZoom: _querySelectorAllDeElementosAAplicarZoom,
				_MaximoZoom: _MaximoZoom,
				_MinimoZoom: _MinimoZoom,
				_IntervaloZoom: _IntervaloZoom,
				_accionesAlIniciar: _accionesAlIniciar,
				_accionesDuranteEjecucion: _accionesDuranteEjecucion,
				_accionesAlAcabar: _accionesAlAcabar
			});
	}

	aplicarZoomMouseDeElementos({ _idDivObjetivoEventoZoom, _idDivScroll, _querySelectorAllDeElementosAAplicarZoom, _MaximoZoom = 1.5, _MinimoZoom = 0.5, _IntervaloZoom = 0.1, _accionesAlIniciar = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlAcabar = () => { } }) {
		const OBJETO = this;
		const DIV_OBJETIVO_EVENTO_ZOOM = document.getElementById(_idDivObjetivoEventoZoom);

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("wheel", (e) => {
			if (OBJETO.activado) {
				const ELEMENTOS_A_ZOOMEAR = Array.from(document.querySelectorAll(_querySelectorAllDeElementosAAplicarZoom));
				let alejando = false;
				if (e.deltaY > 0) {
					alejando = true;
				}

				if (e.shiftKey && ELEMENTOS_A_ZOOMEAR.length > 0) {
					if (e.cancelable) {
						e.preventDefault();
					}

					const DIV_SCROLL = document.getElementById(_idDivScroll);
					let ZOOM_ACTUAL_PRIMER_ELEMENTO;
					let tipoAttrZoom;
					if (getValorCSS2(ELEMENTOS_A_ZOOMEAR[0], "zoom") != "" && getValorCSS2(ELEMENTOS_A_ZOOMEAR[0], "zoom") != NaN) {
						ZOOM_ACTUAL_PRIMER_ELEMENTO = parseFloat(getValorCSS2(ELEMENTOS_A_ZOOMEAR[0], "zoom"));
						tipoAttrZoom = "zoom";
					}
					else {
						ZOOM_ACTUAL_PRIMER_ELEMENTO = parseFloat(getValorCSS2(ELEMENTOS_A_ZOOMEAR[0], "transform", "scale"));
						tipoAttrZoom = "transform"
					}

					let zoomAAplicar = 1;

					if (alejando) {
						zoomAAplicar = ZOOM_ACTUAL_PRIMER_ELEMENTO - _IntervaloZoom;
						zoomAAplicar = Math.max(zoomAAplicar, _MinimoZoom);
					}
					else {
						zoomAAplicar = ZOOM_ACTUAL_PRIMER_ELEMENTO + _IntervaloZoom;
						zoomAAplicar = Math.min(zoomAAplicar, _MaximoZoom);
					}
					/*Para compensar scroll*/
					const PREV_CONTENT_HEIGHT = DIV_SCROLL.scrollHeight;
					const PREV_SCROLL_TOP = DIV_SCROLL.scrollTop;
					const PREV_CONTENT_WIDTH = DIV_SCROLL.scrollWidth;
					const PREV_SCROLL_LEFT = DIV_SCROLL.scrollLeft;
					_accionesAlIniciar();
					if (tipoAttrZoom == "zoom") {
						for (let elemento of ELEMENTOS_A_ZOOMEAR) {
							elemento.style.zoom = zoomAAplicar;
							_accionesDuranteEjecucion();
						}
					}
					else {
						for (let elemento of ELEMENTOS_A_ZOOMEAR) {
							elemento.style.transform = `scale(${zoomAAplicar})`;
							elemento.style.transformOrigin = "top left";
							_accionesDuranteEjecucion();
						}
					}

					OBJETO.compensarScrollVerticalTrasZoom2(PREV_CONTENT_HEIGHT, DIV_SCROLL, PREV_SCROLL_TOP);
					OBJETO.compensarScrollHorizontalTrasZoom2(PREV_CONTENT_WIDTH, DIV_SCROLL, PREV_SCROLL_LEFT);

					_accionesAlAcabar();
				}
			}
		});
	}

	aplicarZoomTactilDeElementos({ _idDivObjetivoEventoZoom, _idDivScroll, _querySelectorAllDeElementosAAplicarZoom, _sensibilidadZoom = 0.01, _maximoZoom = 1.5, _minimoZoom = 0.5, _accionesAlIniciar = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlAcabar = () => { } }) {
		const DIV_SCROLL = document.getElementById(_idDivScroll);
		const DIV_OBJETIVO_EVENTO_ZOOM = document.getElementById(_idDivObjetivoEventoZoom);
		const OBJETO = this;

		let zoomActual;
		let tipoAttrZoom;
		let distanciaInicial;
		let zoomeando = false;
		let elementosAZoomear;

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("touchstart", (e) => {
			if (OBJETO.activado) {
				elementosAZoomear = Array.from(document.querySelectorAll(_querySelectorAllDeElementosAAplicarZoom));
				if (e.touches.length == 2 && elementosAZoomear.length > 0) {
					e.preventDefault();
					distanciaInicial = OBJETO.dameDistanciaEntre2Touch(e);
					zoomeando = true;
					tipoAttrZoom = (OBJETO.getValorCSS2(elementosAZoomear[0], "zoom") !== "" &&
						!isNaN(OBJETO.getValorCSS2(elementosAZoomear[0], "zoom"))) ?
						"zoom" :
						"transform";

					_accionesAlIniciar();
				}
			}
		}, false);

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("touchmove", (e) => {
			if (OBJETO.activado) {
				if (e.touches.length == 2 && zoomeando) {
					const distanciaActual = OBJETO.dameDistanciaEntre2Touch(e);
					e.preventDefault();
					const diferenciaEntreDistanciasPx = distanciaActual - distanciaInicial;
					distanciaInicial = distanciaActual;
					const sensibilidadZoomRelativa = Math.abs(diferenciaEntreDistanciasPx) * _sensibilidadZoom;
					if (tipoAttrZoom == "zoom") {
						zoomActual = parseFloat(getValorCSS2(elementosAZoomear[0], "zoom"));
					}
					else {
						zoomActual = parseFloat(getValorCSS2(elementosAZoomear[0], "transform", "scale"));
					}

					let zoomAAplicar = zoomActual;

					if (diferenciaEntreDistanciasPx > 0) {
						zoomAAplicar += sensibilidadZoomRelativa;
					}
					else {
						zoomAAplicar -= sensibilidadZoomRelativa;
					}

					zoomAAplicar = Math.min(Math.max(zoomAAplicar, _minimoZoom), _maximoZoom);

					//Paso 1 compensar scroll
					const PREV_CONTENT_HEIGHT = DIV_SCROLL.scrollHeight;
					const PREV_SCROLL_TOP = DIV_SCROLL.scrollTop;
					const PREV_CONTENT_WIDTH = DIV_SCROLL.scrollWidth;
					const PREV_SCROLL_LEFT = DIV_SCROLL.scrollLeft;
					if (tipoAttrZoom == "zoom") {
						for (let elemento of elementosAZoomear) {
							elemento.style.zoom = zoomAAplicar;
							_accionesDuranteEjecucion();
						}
					}
					else {
						for (let elemento of elementosAZoomear) {
							elemento.style.transform = `scale(${zoomAAplicar})`;
							elemento.style.transformOrigin = "top left";
							_accionesDuranteEjecucion();
						}
					}
					//Paso 2 compensar altura scroll
					OBJETO.compensarScrollVerticalTrasZoom2(PREV_CONTENT_HEIGHT, DIV_SCROLL, PREV_SCROLL_TOP);
					OBJETO.compensarScrollHorizontalTrasZoom2(PREV_CONTENT_WIDTH, DIV_SCROLL, PREV_SCROLL_LEFT);
				}
			}
		});

		DIV_OBJETIVO_EVENTO_ZOOM.addEventListener("touchend", () => {
			if (OBJETO.activado) {
				if (zoomeando) {
					_accionesAlAcabar();
					zoomeando = false;
				}
			}
		});
	}
	//	/primarias
}

class ControlZoom extends ToolZoom {
	constructor() {
		super();
	}

	activarZoom() {
		super.activado = true;
	}

	desactivarZoom() {
		super.activado = false;
	}
}
//======================================================================
// 	/Class ToolZoom
//======================================================================

//======================================================================
// 	Class ToolBarraMovil
//======================================================================
class ToolBarraMovil {
	divBarraMovil;
	div1;
	div2;
	orientacion;

	minTamanoContenedorPx;
	maxTamanoContenedorPx;
	minTamanoContenedorPorcentaje;
	maxTamanoContenedorPorcentaje;
	classBarraActiva;

	isResizing = false;
	barraDimensionadoraActiva = "";

	//	Tools
	//	/Tools
	//	Primarias
	aplicarBarraMovilDosElementosRedimensionables({ _divBarraMovil, _div1, _div2_conBarraMovil, _divAreaDeEvento, _orientacionBarra, _minTamanoContenedorPorcentaje, _maxTamanoContenedorPorcentaje, _classBarraActiva, _accionesAlIniciarMovimiento = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlFinalizarMovimiento = () => { } }) {
		//OJO, función usada con la barra móvil en el _div2_conBarraMovil
		this.aplicarBarraMovilMouseDosElementosRedimensionables(
			{
				_divBarraMovil: _divBarraMovil,
				_div1: _div1,
				_div2_conBarraMovil: _div2_conBarraMovil,
				_divAreaDeEvento: _divAreaDeEvento,
				_orientacionBarra: _orientacionBarra,
				_minTamanoContenedorPorcentaje: _minTamanoContenedorPorcentaje,
				_maxTamanoContenedorPorcentaje: _maxTamanoContenedorPorcentaje,
				_classBarraActiva: _classBarraActiva,
				_accionesAlIniciarMovimiento: _accionesAlIniciarMovimiento,
				_accionesDuranteEjecucion: _accionesDuranteEjecucion,
				_accionesAlFinalizarMovimiento: _accionesAlFinalizarMovimiento
			});
		this.aplicarBarraMovilTactilDosElementosRedimensionables(
			{
				_divBarraMovil: _divBarraMovil,
				_div1: _div1,
				_div2_conBarraMovil: _div2_conBarraMovil,
				_divAreaDeEvento: _divAreaDeEvento,
				_orientacionBarra: _orientacionBarra,
				_minTamanoContenedorPorcentaje: _minTamanoContenedorPorcentaje,
				_maxTamanoContenedorPorcentaje: _maxTamanoContenedorPorcentaje,
				_classBarraActiva: _classBarraActiva,
				_accionesAlIniciarMovimiento: _accionesAlIniciarMovimiento,
				_accionesDuranteEjecucion: _accionesDuranteEjecucion,
				_accionesAlFinalizarMovimiento: _accionesAlFinalizarMovimiento
			});
	}

	/**
	 * Para convertir un div en una barra que se pueda arrastrar por el mouse y cambiar de tamaño el _div1 y _div2, la barra móvil debe estar en el _div2
	 * @param {HTMLElement} _divBarraMovil - Div que se podrá arrastrar
	 * @param {HTMLElement} _div1 - Div primero que cambiará de tamaño al arrastrar el _divBarraMovil
	 * @param {HTMLElement} _div2_conBarraMovil - Div segundo que cambiará de tamaño al arrastrar el _divBarraMovil, que estará contenida en este div
	 * @param {HTMLElement} _divAreaDeEvento - Div sobre el cual el evento estará escuchando a la espera de arrastre
	 * @param {String} _orientacionBarra - Puede ser "horizontal" o "vertical"
	 * @param {Number} _minTamanoContenedorPorcentaje - Mínimo de tamaño del _div1 y _div2
	 * @param {Number} _maxTamanoContenedorPorcentaje - Máximo de tamaño del _div1 y _div2
	 * @param {String} _classBarraActiva - Class que se aplicará al _divBarraMovil durante su arrastre
	 */
	aplicarBarraMovilMouseDosElementosRedimensionables({ _divBarraMovil, _div1, _div2_conBarraMovil, _divAreaDeEvento, _orientacionBarra, _minTamanoContenedorPorcentaje, _maxTamanoContenedorPorcentaje, _classBarraActiva, _accionesAlIniciarMovimiento = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlFinalizarMovimiento = () => { } }) {
		//OJO, función usada con la barra móvil en el _div2_conBarraMovil
		let barraDimensionadoraActiva = this.barraDimensionadoraActiva;
		let isResizing = this.isResizing;

		if (_orientacionBarra == "vertical") {
			_divBarraMovil.addEventListener("mousedown", (e) => {
				isResizing = true;
				barraDimensionadoraActiva = e.currentTarget;
				barraDimensionadoraActiva.classList.add(_classBarraActiva);
				_divBarraMovil.style.transform = "scale(1.5)";
				_accionesAlIniciarMovimiento();
			});

			let animationFrameId = null;
			_divAreaDeEvento.addEventListener("mousemove", (e) => {
				if (isResizing) {
					if (animationFrameId) {
						//Para que no se amontonen las ejecuciones de código, y ejecute siempre la última vez
						cancelAnimationFrame(animationFrameId);
					}
					animationFrameId = requestAnimationFrame(() => {
						const WIDTH_DIV1_PX = (e.clientX - _div1.getBoundingClientRect().left);

						//pasamos a porcentaje
						const WIDTH_DIV1_PORCENTAJE = Number((WIDTH_DIV1_PX * 100 / _divAreaDeEvento.clientWidth).toFixed(3));
						const WIDTH_DIV2_PORCENTAJE = 100 - WIDTH_DIV1_PORCENTAJE;
						//Comprobamos si se pasa de medidas
						if (WIDTH_DIV1_PORCENTAJE >= _minTamanoContenedorPorcentaje && WIDTH_DIV1_PORCENTAJE <= _maxTamanoContenedorPorcentaje) {
							_div1.style.width = WIDTH_DIV1_PORCENTAJE + "%";
							_div2_conBarraMovil.style.width = WIDTH_DIV2_PORCENTAJE + "%";
						}
						//Comprobamos si el puntero+ click pulsado se sale del div padre que contiene ambos div, la barra se va al límite
						const LINEA_LIMITE_MIN_DIV1 = _div1.getBoundingClientRect().left + ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientWidth) / 100);
						const LINEA_LIMITE_MIN_DIV2 = _div2_conBarraMovil.getBoundingClientRect().right - ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientWidth) / 100);

						if (e.clientX < LINEA_LIMITE_MIN_DIV1) {
							_div1.style.width = _minTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.width = _maxTamanoContenedorPorcentaje + "%";
						}
						else if (e.clientX > LINEA_LIMITE_MIN_DIV2) {
							_div1.style.width = _maxTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.width = _minTamanoContenedorPorcentaje + "%";
						}
						_accionesDuranteEjecucion();
					});
				}
			});

			document.addEventListener("mouseup", () => {
				if (isResizing) {
					const DIV1_CSS = window.getComputedStyle(_div1),
						DIV2_CSS = window.getComputedStyle(_div2_conBarraMovil);
					//Al hacer dejar 2 decimales solo en los porcentajes, puede haber desvaríos de porcentajes, entonces esto lo corrige al final
					if (parseInt(DIV1_CSS.getPropertyValue("width")) + parseInt(DIV2_CSS.getPropertyValue("width")) != 100 && parseInt(DIV1_CSS.getPropertyValue("height")) == 100 && parseInt(DIV2_CSS.getPropertyValue("height")) == 100) {
						const FALTANTE_HASTA_100 = 100 - (parseInt(DIV1_CSS.getPropertyValue("width")) + parseInt(DIV2_CSS.getPropertyValue("width")));
						_div2_conBarraMovil.style.width = (parseInt(DIV2_CSS.getPropertyValue("width")) + FALTANTE_HASTA_100) + "%";
					}

					_divBarraMovil.style.transform = "scale(1)";
					barraDimensionadoraActiva.classList.remove(_classBarraActiva);
					barraDimensionadoraActiva = "";
				}
				isResizing = false;
				_accionesAlFinalizarMovimiento();
			});
		}
		else //orientacionBarra== "horizontal"
		{
			_divBarraMovil.addEventListener("mousedown", (e) => {
				isResizing = true;
				barraDimensionadoraActiva = e.currentTarget;
				barraDimensionadoraActiva.classList.add(_classBarraActiva);
				_divBarraMovil.style.transform = "scale(1.5)";
				_accionesAlIniciarMovimiento();
			});

			let animationFrameId = null;
			_divAreaDeEvento.addEventListener("mousemove", (e) => {
				if (isResizing) {
					if (animationFrameId) {
						cancelAnimationFrame(animationFrameId);
					}
					animationFrameId = requestAnimationFrame(() => {
						const HEIGHT_DIV1_PX = e.clientY - _div1.getBoundingClientRect().top;

						//pasamos a porcentaje
						const HEIGHT_DIV1_PORCENTAJE = Number((HEIGHT_DIV1_PX * 100 / _divAreaDeEvento.clientHeight).toFixed(3));
						const HEIGHT_DIV2_PORCENTAJE = 100 - HEIGHT_DIV1_PORCENTAJE;

						//Comprobamos si se pasa de medidas
						if (HEIGHT_DIV1_PORCENTAJE >= _minTamanoContenedorPorcentaje && HEIGHT_DIV1_PORCENTAJE <= _maxTamanoContenedorPorcentaje) {
							_div1.style.height = HEIGHT_DIV1_PORCENTAJE + "%";
							_div2_conBarraMovil.style.height = HEIGHT_DIV2_PORCENTAJE + "%";
						}

						const LINEA_LIMITE_MIN_DIV1 = _div1.getBoundingClientRect().top + ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientHeight) / 100);
						const LINEA_LIMITE_MIN_DIV2 = _div2_conBarraMovil.getBoundingClientRect().bottom - ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientHeight) / 100);

						//Si el cursor se sale del límite
						if (e.clientY < LINEA_LIMITE_MIN_DIV1) {
							_div1.style.height = _minTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.height = _maxTamanoContenedorPorcentaje + "%";
						} else if (e.clientY > LINEA_LIMITE_MIN_DIV2) {
							_div1.style.height = _maxTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.height = _minTamanoContenedorPorcentaje + "%";
						}

						//Para finalizar
						_accionesDuranteEjecucion();
					});
				}
			});

			document.addEventListener("mouseup", () => {
				if (isResizing) {
					const DIV1_CSS = window.getComputedStyle(_div1),
						DIV2_CSS = window.getComputedStyle(_div2_conBarraMovil);
					//Al hacer dejar 2 decimales solo en los porcentajes, puede haber desvaríos de porcentajes, entonces esto lo corrige al final
					if (parseInt(DIV1_CSS.getPropertyValue("height")) + parseInt(DIV2_CSS.getPropertyValue("height")) != 100 && parseInt(DIV1_CSS.getPropertyValue("width")) == 100 && parseInt(DIV2_CSS.getPropertyValue("width")) == 100) {
						const FALTANTE_HASTA_100 = 100 - (parseInt(DIV1_CSS.getPropertyValue("height")) + parseInt(DIV2_CSS.getPropertyValue("height")));
						_div2_conBarraMovil.style.height = (parseInt(DIV2_CSS.getPropertyValue("height")) + FALTANTE_HASTA_100) + "%";
					}

					_divBarraMovil.style.transform = "scale(1)";
					barraDimensionadoraActiva.classList.remove(_classBarraActiva);
					barraDimensionadoraActiva = "";
				}
				isResizing = false;
				_accionesAlFinalizarMovimiento();
			});
		}
	}

	/**
	 * Para convertir un div en una barra que se pueda arrastrar en modo táctil y cambiar de tamaño el _div1 y _div2, la barra móvil debe estar en el _div2
	 * @param {HTMLElement} _divBarraMovil - Div que se podrá arrastrar
	 * @param {HTMLElement} _div1 - Div primero que cambiará de tamaño al arrastrar el _divBarraMovil
	 * @param {HTMLElement} _div2_conBarraMovil - Div segundo que cambiará de tamaño al arrastrar el _divBarraMovil, que estará contenida en este div
	 * @param {HTMLElement} _divAreaDeEvento - Div sobre el cual el evento estará escuchando a la espera de arrastre
	 * @param {String} _orientacionBarra - Puede ser "horizontal" o "vertical"
	 * @param {Number} _minTamanoContenedorPorcentaje - Mínimo de tamaño del _div1 y _div2
	 * @param {Number} _maxTamanoContenedorPorcentaje - Máximo de tamaño del _div1 y _div2
	 * @param {String} _classBarraActiva - Class que se aplicará al _divBarraMovil durante su arrastre
	 */
	aplicarBarraMovilTactilDosElementosRedimensionables({ _divBarraMovil, _div1, _div2_conBarraMovil, _divAreaDeEvento, _orientacionBarra, _minTamanoContenedorPorcentaje, _maxTamanoContenedorPorcentaje, _classBarraActiva, _accionesAlIniciarMovimiento = () => { }, _accionesDuranteEjecucion = () => { }, _accionesAlFinalizarMovimiento = () => { } }) {
		//OJO, función usada con la barra móvil en el _div2_conBarraMovil
		let barraDimensionadoraActiva = this.barraDimensionadoraActiva;
		let isResizing = this.isResizing;

		if (_orientacionBarra == "vertical") {
			_divBarraMovil.addEventListener("touchstart", (e) => {
				isResizing = true;
				barraDimensionadoraActiva = e.currentTarget;
				barraDimensionadoraActiva.classList.add(_classBarraActiva);
				_divBarraMovil.style.transform = "scale(1.5)";
				_accionesAlIniciarMovimiento();
			});

			let animationFrameId = null;
			_divBarraMovil.addEventListener("touchmove", (e) => {
				if (isResizing) {
					if (animationFrameId) {
						cancelAnimationFrame(animationFrameId);
					}
					animationFrameId = requestAnimationFrame(() => {
						const WIDTH_DIV1_PX = (e.touches[0].clientX - _div1.getBoundingClientRect().left);

						//pasamos a porcentaje
						const WIDTH_DIV1_PORCENTAJE = Number((WIDTH_DIV1_PX * 100 / _divAreaDeEvento.clientWidth).toFixed(3));
						const WIDTH_DIV2_PORCENTAJE = 100 - WIDTH_DIV1_PORCENTAJE;

						//Comprobamos si se pasa de medidas
						if (WIDTH_DIV1_PORCENTAJE >= _minTamanoContenedorPorcentaje && WIDTH_DIV1_PORCENTAJE <= _maxTamanoContenedorPorcentaje) {
							_div1.style.width = WIDTH_DIV1_PORCENTAJE + "%";
							_div2_conBarraMovil.style.width = WIDTH_DIV2_PORCENTAJE + "%";
						}
						const LINEA_LIMITE_MIN_DIV1 = _div1.getBoundingClientRect().left + ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientWidth) / 100);
						const LINEA_LIMITE_MIN_DIV2 = _div2_conBarraMovil.getBoundingClientRect().right - ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientWidth) / 100);

						if (e.touches[0].clientX < LINEA_LIMITE_MIN_DIV1) {
							_div1.style.width = _minTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.width = _maxTamanoContenedorPorcentaje + "%";
						}
						else if (e.touches[0].clientX > LINEA_LIMITE_MIN_DIV2) {
							_div1.style.width = _maxTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.width = _minTamanoContenedorPorcentaje + "%";
						}
						_accionesDuranteEjecucion();
					});
				}
			});

			_divBarraMovil.addEventListener("touchend", () => {
				if (isResizing) {
					const DIV1_CSS = window.getComputedStyle(_div1),
						DIV2_CSS = window.getComputedStyle(_div2_conBarraMovil);
					//Al hacer dejar 2 decimales solo en los porcentajes, puede haber desvaríos de porcentajes, entonces esto lo corrige al final
					if (parseInt(DIV1_CSS.getPropertyValue("width")) + parseInt(DIV2_CSS.getPropertyValue("width")) != 100 && parseInt(DIV1_CSS.getPropertyValue("height")) == 100 && parseInt(DIV2_CSS.getPropertyValue("height")) == 100) {
						const FALTANTE_HASTA_100 = 100 - (parseInt(DIV1_CSS.getPropertyValue("width")) + parseInt(DIV2_CSS.getPropertyValue("width")));
						_div2_conBarraMovil.style.width = (parseInt(DIV2_CSS.getPropertyValue("width")) + FALTANTE_HASTA_100) + "%";
					}

					_divBarraMovil.style.transform = "scale(1)";
					barraDimensionadoraActiva.classList.remove(_classBarraActiva);
					barraDimensionadoraActiva = "";
				}
				isResizing = false;
				_accionesAlFinalizarMovimiento();
			});
		}
		else //orientacionBarra== "horizontal"
		{
			_divBarraMovil.addEventListener("touchstart", (e) => {
				isResizing = true;
				barraDimensionadoraActiva = e.currentTarget;
				barraDimensionadoraActiva.classList.add(_classBarraActiva);
				_divBarraMovil.style.transform = "scale(1.5)";
				_accionesAlIniciarMovimiento();
			});

			let animationFrameId = null;
			_divBarraMovil.addEventListener("touchmove", (e) => {
				if (isResizing) {
					if (animationFrameId) {
						cancelAnimationFrame(animationFrameId);
					}
					animationFrameId = requestAnimationFrame(() => {
						const HEIGHT_DIV1_PX = (e.touches[0].clientY - _div1.getBoundingClientRect().top);

						//pasamos a porcentaje
						const HEIGHT_DIV1_PORCENTAJE = Number((HEIGHT_DIV1_PX * 100 / _divAreaDeEvento.clientHeight).toFixed(3));
						const HEIGHT_DIV2_PORCENTAJE = 100 - HEIGHT_DIV1_PORCENTAJE;

						//Comprobamos si se pasa de medidas
						if (HEIGHT_DIV1_PORCENTAJE >= _minTamanoContenedorPorcentaje && HEIGHT_DIV1_PORCENTAJE <= _maxTamanoContenedorPorcentaje) {
							_div1.style.height = HEIGHT_DIV1_PORCENTAJE + "%";
							_div2_conBarraMovil.style.height = HEIGHT_DIV2_PORCENTAJE + "%";
						}

						const LINEA_LIMITE_MIN_DIV1 = _div1.getBoundingClientRect().top + ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientHeight) / 100);
						const LINEA_LIMITE_MIN_DIV2 = _div2_conBarraMovil.getBoundingClientRect().bottom - ((_minTamanoContenedorPorcentaje * _div1.parentElement.clientHeight) / 100);
						if (e.touches[0].clientY < LINEA_LIMITE_MIN_DIV1) {
							_div1.style.height = _minTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.height = _maxTamanoContenedorPorcentaje + "%";
						}
						else if (e.touches[0].clientY > LINEA_LIMITE_MIN_DIV2) {
							_div1.style.height = _maxTamanoContenedorPorcentaje + "%";
							_div2_conBarraMovil.style.height = _minTamanoContenedorPorcentaje + "%";
						}
						_accionesDuranteEjecucion();
					});
				}
			});

			_divBarraMovil.addEventListener("touchend", () => {
				if (isResizing) {
					const DIV1_CSS = window.getComputedStyle(_div1),
						DIV2_CSS = window.getComputedStyle(_div2_conBarraMovil);
					//Al hacer dejar 2 decimales solo en los porcentajes, puede haber desvaríos de porcentajes, entonces esto lo corrige al final
					if (parseInt(DIV1_CSS.getPropertyValue("height")) + parseInt(DIV2_CSS.getPropertyValue("height")) != 100 && parseInt(DIV1_CSS.getPropertyValue("width")) == 100 && parseInt(DIV2_CSS.getPropertyValue("width")) == 100) {
						const FALTANTE_HASTA_100 = 100 - (parseInt(DIV1_CSS.getPropertyValue("height")) + parseInt(DIV2_CSS.getPropertyValue("height")));
						_div2_conBarraMovil.style.height = (parseInt(DIV2_CSS.getPropertyValue("height")) + FALTANTE_HASTA_100) + "%";
					}

					_divBarraMovil.style.transform = "scale(1)";
					barraDimensionadoraActiva.classList.remove(_classBarraActiva);
					barraDimensionadoraActiva = "";
				}
				isResizing = false;
				_accionesAlFinalizarMovimiento();
			});
		}
	}

	/**
	 * Aplica una barra móvil a un elemento para permitir cambiar su tamaño desde el mouse.
	 *
	 * @param {HTMLElement} _divBarraMovil - El elemento que actúa como barra móvil.
	 * @param {HTMLElement} _divContenedorBarraMovilYContenido - El elemento cuyo tamaño se cambiará.
	 * @param {string} _orientacionBarra - La orientación de la barra móvil ("vertical" o "horizontal").
	 * @param {number} _tamanoMinimo - El tamaño mínimo del elemento en píxeles o porcentaje.
	 * @param {number} _tamanoMaximo - El tamaño máximo del elemento en píxeles o porcentaje.
	 * @param {string} _formatoTamanoMinimo - El formato del tamaño mínimo ("px" o "%").
	 * @param {string} _formatoTamanoMaximo - El formato del tamaño máximo ("px" o "%").
	 */
	aplicarBarraMovilMouseUnElementoRedimensionable({ _divBarra, _divContenedor, _orientacionBarra, _tamanoMinimo, _tamanoMaximo, _formatoMinimo, _formatoMaximo }) {
		let padre = _divContenedor.parentElement;
		let estaArrastrando = false;
		let inicioX;
		let inicioY;

		// Función para manejar el evento mousedown en la barra
		const AL_MOUSE_DOWN = (e) => {
			estaArrastrando = true;
			inicioX = e.clientX;
			inicioY = e.clientY;
			_divBarra.style.transform = "scale(1.5)";
		};

		// Función para manejar el evento mousemove en el documento
		const AL_MOUSE_MOVE = (e) => {
			if (estaArrastrando) {
				const RECT = padre.getBoundingClientRect();
				let tamanoMinimoPx;
				let tamanoMaximoPx;
				let tamanoMinimoPct;
				let tamanoMaximoPct;

				if (_formatoMinimo === 'px') {
					tamanoMinimoPx = _tamanoMinimo;
					tamanoMinimoPct = _tamanoMinimo / padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * 100;
				}
				else {
					tamanoMinimoPx = padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * _tamanoMinimo / 100;
					tamanoMinimoPct = _tamanoMinimo;
				}

				if (_formatoMaximo === 'px') {
					tamanoMaximoPx = _tamanoMaximo;
					tamanoMaximoPct = _tamanoMaximo / padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * 100;
				}
				else {
					tamanoMaximoPx = padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * _tamanoMaximo / 100;
					tamanoMaximoPct = _tamanoMaximo;
				}

				if
					(
					(_orientacionBarra === 'vertical' && e.clientX >= RECT.left + tamanoMinimoPx && e.clientX <= RECT.left + tamanoMaximoPx) ||
					(_orientacionBarra !== 'vertical' && e.clientY >= RECT.top + tamanoMinimoPx && e.clientY <= RECT.top + tamanoMaximoPx)
				) {
					let diff;
					if (_orientacionBarra === 'vertical') {
						diff = e.clientX - inicioX;
					}
					else {
						diff = e.clientY - inicioY;
					}

					let nuevoTamano;
					if (_orientacionBarra === 'vertical') {
						nuevoTamano = (_divContenedor.clientWidth - diff) / padre.clientWidth * 100;
					}
					else {
						nuevoTamano = (_divContenedor.clientHeight - diff) / padre.clientHeight * 100;
					}

					nuevoTamano = Math.min(Math.max(nuevoTamano, tamanoMinimoPct), tamanoMaximoPct);

					if (_orientacionBarra === 'vertical') {
						_divContenedor.style.width = `${nuevoTamano}%`;
					}
					else {
						_divContenedor.style.height = `${nuevoTamano}%`;
					}
				}
				else {
					if
						(
						(_orientacionBarra === 'vertical' && e.clientX < RECT.left + tamanoMinimoPx) ||
						(_orientacionBarra !== 'vertical' && e.clientY < RECT.top + tamanoMinimoPx)
					) {
						if (_orientacionBarra === 'vertical') {
							_divContenedor.style.width = `${tamanoMaximoPct}%`;
						}
						else {
							_divContenedor.style.height = `${tamanoMaximoPct}%`;
						}
					}
					else if
						(
						(_orientacionBarra === 'vertical' && e.clientX > RECT.left + tamanoMaximoPx) ||
						(_orientacionBarra !== 'vertical' && e.clientY > RECT.top + tamanoMaximoPx)
					) {
						if (_orientacionBarra === 'vertical') {
							_divContenedor.style.width = `${tamanoMinimoPct}%`;
						}
						else {
							_divContenedor.style.height = `${tamanoMinimoPct}%`;
						}
					}
				}
				if (_orientacionBarra === "vertical") {
					inicioX = e.clientX;
				}
				else {
					inicioY = e.clientY;
				}
			}
		};

		// Función para manejar el evento mouseup en el documento
		const AL_MOUSE_UP = () => {
			_divBarra.style.transform = "scale(1)";
			estaArrastrando = false;
		};

		_divBarra.addEventListener("mousedown", AL_MOUSE_DOWN, false);
		document.addEventListener("mousemove", AL_MOUSE_MOVE, false);
		document.addEventListener("mouseup", AL_MOUSE_UP, false);
	}

	/**
	 * Aplica una barra móvil a un elemento para permitir cambiar su tamaño desde el touch.
	 *
	 * @param {HTMLElement} _divBarraMovil - El elemento que actúa como barra móvil.
	 * @param {HTMLElement} _divContenedorBarraMovilYContenido - El elemento cuyo tamaño se cambiará.
	 * @param {string} _orientacionBarra - La orientación de la barra móvil ("vertical" o "horizontal").
	 * @param {number} _tamanoMinimo - El tamaño mínimo del elemento en píxeles o porcentaje.
	 * @param {number} _tamanoMaximo - El tamaño máximo del elemento en píxeles o porcentaje.
	 * @param {string} _formatoTamanoMinimo - El formato del tamaño mínimo ("px" o "%").
	 * @param {string} _formatoTamanoMaximo - El formato del tamaño máximo ("px" o "%").
	 */
	aplicarBarraMovilTouchUnElementoRedimensionable({ _divBarra, _divContenedor, _orientacionBarra, _tamanoMinimo, _tamanoMaximo, _formatoMinimo, _formatoMaximo }) {
		let padre = _divContenedor.parentElement;
		let estaArrastrando = false;
		let inicioX;
		let inicioY;

		// Función para manejar el evento touchstart en la barra
		const AL_TOUCH_START = (e) => {
			estaArrastrando = true;
			inicioX = e.touches[0].clientX;
			inicioY = e.touches[0].clientY;
			_divBarra.style.transform = "scale(1.5)";
		};

		let animationFrameId = null;
		// Función para manejar el evento touchmove en el documento
		const AL_TOUCH_MOVE = (e) => {
			if (estaArrastrando) {
				if (animationFrameId) {
					cancelAnimationFrame(animationFrameId);
				}
				animationFrameId = requestAnimationFrame(() => {
					const RECT = padre.getBoundingClientRect();
					let tamanoMinimoPx;
					let tamanoMaximoPx;
					let tamanoMinimoPct;
					let tamanoMaximoPct;

					if (_formatoMinimo === 'px') {
						tamanoMinimoPx = _tamanoMinimo;
						tamanoMinimoPct = _tamanoMinimo / padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * 100;
					}
					else {
						tamanoMinimoPx = padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * _tamanoMinimo / 100;
						tamanoMinimoPct = _tamanoMinimo;
					}

					if (_formatoMaximo === 'px') {
						tamanoMaximoPx = _tamanoMaximo;
						tamanoMaximoPct = _tamanoMaximo / padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * 100;
					}
					else {
						tamanoMaximoPx = padre[_orientacionBarra === 'vertical' ? 'clientWidth' : 'clientHeight'] * _tamanoMaximo / 100;
						tamanoMaximoPct = _tamanoMaximo;
					}

					if
						(
						(_orientacionBarra === 'vertical' && e.touches[0].clientX >= RECT.left + tamanoMinimoPx && e.touches[0].clientX <= RECT.left + tamanoMaximoPx) ||
						(_orientacionBarra !== 'vertical' && e.touches[0].clientY >= RECT.top + tamanoMinimoPx && e.touches[0].clientY <= RECT.top + tamanoMaximoPx)
					) {
						let diff;
						if (_orientacionBarra === 'vertical') {
							diff = e.touches[0].clientX - inicioX;
						}
						else {
							diff = e.touches[0].clientY - inicioY;
						}

						let nuevoTamano;
						if (_orientacionBarra === 'vertical') {
							nuevoTamano = (_divContenedor.clientWidth - diff) / padre.clientWidth * 100;
						}
						else {
							nuevoTamano = (_divContenedor.clientHeight - diff) / padre.clientHeight * 100;
						}

						nuevoTamano = Math.min(Math.max(nuevoTamano, tamanoMinimoPct), tamanoMaximoPct);

						if (_orientacionBarra === 'vertical') {
							_divContenedor.style.width = `${nuevoTamano}%`;
						}
						else {
							_divContenedor.style.height = `${nuevoTamano}%`;
						}
					}
					else {
						if ((_orientacionBarra === 'vertical' && e.touches[0].clientX < RECT.left + tamanoMinimoPx) || (_orientacionBarra !== 'vertical' && e.touches[0].clientY < RECT.top + tamanoMinimoPx)) {
							if (_orientacionBarra === 'vertical') {
								_divContenedor.style.width = `${tamanoMaximoPct}%`;
							}
							else {
								_divContenedor.style.height = `${tamanoMaximoPct}%`;
							}
						}
						else if ((_orientacionBarra === 'vertical' && e.touches[0].clientX > RECT.left + tamanoMaximoPx) || (_orientacionBarra !== 'vertical' && e.touches[0].clientY > RECT.top + tamanoMaximoPx)) {
							if (_orientacionBarra === 'vertical') {
								_divContenedor.style.width = `${tamanoMinimoPct}%`;
							}
							else {
								_divContenedor.style.height = `${tamanoMinimoPct}%`;
							}
						}
					}
					if (_orientacionBarra === "vertical") {
						inicioX = e.touches[0].clientX;
					}
					else {
						inicioY = e.touches[0].clientY;
					}
				});
			}
		};

		// Función para manejar el evento touchend en el documento
		const AL_TOUCH_END = () => {
			_divBarra.style.transform = "scale(1)";
			estaArrastrando = false;
		};

		_divBarra.addEventListener("touchstart", AL_TOUCH_START, false);
		document.addEventListener("touchmove", AL_TOUCH_MOVE, false);
		document.addEventListener("touchend", AL_TOUCH_END, false);
	}

	//	/Primarias
	//	Opcional
	aplicarCSSBasicoABarraMovil(_divBarraMovil, _orientacionBarra) {
		if (_orientacionBarra == "vertical") {
			_divBarraMovil.style.height = "100%";
			_divBarraMovil.style.width = "15px";
		}
		else {
			_divBarraMovil.style.width = "100%";
			_divBarraMovil.style.height = "15px";
		}
	}
	//	/Opcional
}
//======================================================================
// 	/Class ToolBarraMovil
//======================================================================

//======================================================================
// 	Class ToolBotonesPaginacion
//======================================================================
class ToolBotonesPaginacion {
	//Añade clase disabledToolBotonesPaginacion en el CSS para los botones que no se puedan presionar
	anadidoCSS = false;
	timeoutScrollInputPaginador;

	//	Tools
	pasarAArray(variable) {
		let rsp = variable;
		if (!Array.isArray(variable) && variable[Symbol.iterator]) {
			rsp = Array.from(variable);
		}
		else if (!Array.isArray(variable)) {
			rsp = [variable];
		}
		return rsp;
	}

	anadirQuitarClass(_elemento, _class, _funcion = 2) {
		let rsp = false;

		const acciones =
		{
			0: () => _elemento.classList.remove(_class),
			1: () => {
				_elemento.classList.add(_class);
				rsp = true;
			},
			2: () => {
				_elemento.classList.toggle(_class);
				rsp = true;
			},
			3: () => {
				_elemento.className = _class;
				rsp = true;
			},
		};

		acciones[_funcion]();
		return rsp;
	}

	moverScrollAId(_idElementoAVer) {
		const URL = ("#" + _idElementoAVer);

		// creas un enlace y lo añades al documento
		const A = document.createElement("a");
		document.body.appendChild(A);
		A.style = "display: none";

		//le metemos el link que queremos y clickeamos
		A.href = URL;
		A.click();
		//Eliminamos rastro del link y enlace
		A.remove();
	}

	setToggleClass(_elementos, _class = [], _igualarAl0 = false) {
		//_igualarAl0 provoca que todos los elementos reciban el class que le toca al elemento en la posicion 0
		//El primer class es el predeterminado en caso de no encontrar un class coincidente en el elemento con el array de class recibido
		let classAAplicar,
			interruptor = false;
		let classAAplicarAlIgualarAl0 = "";

		_elementos = this.pasarAArray(_elementos);

		for (let i = 0; i < _elementos.length; i++) {
			classAAplicar = "";

			if (Array.isArray(_class)) {
				//Primer for para aplicar el class correspondiente
				for (let j = 0; j < _class.length && interruptor == false; j++) {
					if (_elementos[i].classList.contains(_class[j])) {
						interruptor = true;
						if ((j + 1) >= _class.length) {
							classAAplicar = _class[0];
						}
						else {
							classAAplicar = _class[j + 1];
						}
					}
				}

				if (classAAplicar == "") {
					classAAplicar = _class[0];
				}

				if (_igualarAl0 && i == 0) {
					classAAplicarAlIgualarAl0 = classAAplicar;
				}

				if (_igualarAl0) {
					classAAplicar = classAAplicarAlIgualarAl0;
				}

				//Segundo for para eliminar los demás class
				for (let j = 0; j < _class.length; j++) {
					_elementos[i].classList.remove(_class[j]);
				}
			}
			else {
				classAAplicar = _class;
			}

			_elementos[i].classList.add(classAAplicar);
		}
	}
	//	/Tools
	//	Terciarias
	rotarTodasPaginas(_idDivContenedorPaginas) {
		if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina").length > 0) {
			let elementos = Array.from(document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina"));
			this.setToggleClass(elementos, ["imgRotada90", "imgRotada180", "imgRotada270", "imgRotada0"], true);
		}
	}
	//	/Terciarias
	//	Secundarias
	/**
	 * Añadir clases CSS para la rotación de contenido de páginas
	 */
	anadirCSS() {
		let style = document.createElement('style');
		style.innerHTML =
			".imgRotada0" +
			"{" +
			"transform: rotate(0deg);" +
			"-webkit-transform: rotate(0deg);" +
			"-moz-transform: rotate(0deg);" +
			"-ms-transform: rotate(0deg);" +
			"-o-transform: rotate(0deg);" +
			"}" +

			".imgRotada90" +
			"{" +
			"transform: rotate(90deg);" +
			"-webkit-transform: rotate(90deg);" +
			"-moz-transform: rotate(90deg);" +
			"-ms-transform: rotate(90deg);" +
			"-o-transform: rotate(90deg);" +
			"}" +

			".imgRotada180" +
			"{" +
			"transform: rotate(180deg);" +
			"-webkit-transform: rotate(180deg);" +
			"-moz-transform: rotate(180deg);" +
			"-ms-transform: rotate(180deg);" +
			"-o-transform: rotate(180deg);" +
			"}" +

			".imgRotada270" +
			"{" +
			"transform: rotate(270deg);" +
			"-webkit-transform: rotate(270deg);" +
			"-moz-transform: rotate(270deg);" +
			"-ms-transform: rotate(270deg);" +
			"-o-transform: rotate(270deg);" +
			"}";
		document.head.appendChild(style);
	}

	actualizarInputTextPaginas(_idDivConScroll, _idInputTextPaginas, _idDivContenedorPaginas) {
		//Actualiza el input al número de página la cuál tenga mayor cantidad visible en pantalla
		const DIV_CON_SCROLL = document.querySelector("#" + _idDivConScroll);
		const INPUT = document.querySelector('#' + _idInputTextPaginas);
		let nPaginaVisible = 1;
		let maxVisiblePercentage = 0;
		const PAGINAS = DIV_CON_SCROLL.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina");
		for (let i = 0; i < PAGINAS.length; i++) {
			const PAGINA_RECT = PAGINAS[i].getBoundingClientRect();
			const DIV_CON_SCROLL_RECT = DIV_CON_SCROLL.getBoundingClientRect();
			if (PAGINA_RECT.bottom >= DIV_CON_SCROLL_RECT.top && PAGINA_RECT.top <= DIV_CON_SCROLL_RECT.bottom) {
				const VISIBLE_HEIGHT = Math.min(PAGINA_RECT.bottom, DIV_CON_SCROLL_RECT.bottom) - Math.max(PAGINA_RECT.top, DIV_CON_SCROLL_RECT.top);
				const VISIBLE_PORCENTAJE = VISIBLE_HEIGHT / PAGINA_RECT.height;
				if (VISIBLE_PORCENTAJE > maxVisiblePercentage) {
					maxVisiblePercentage = VISIBLE_PORCENTAJE;
					nPaginaVisible = i + 1;
				}
			}
		}
		INPUT.value = nPaginaVisible;
	}

	moverScrollDivConScroll(_idInputTextPaginas, _idDivContenedorPaginas) {
		const NPAGINA = parseInt(document.getElementById(_idInputTextPaginas).value);
		const PAGINAS = Array.from(document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina"));

		const CONTENIDO_PAGINA = PAGINAS[NPAGINA - 1];
		const ID_CONTENIDO_PAGINA = CONTENIDO_PAGINA.id;

		this.moverScrollAId(ID_CONTENIDO_PAGINA);
	}

	actualizarNumeroDelPaginador(_idDivConScroll, _idInputTextPaginas, _idDivContenedorPaginas) {
		this.actualizarInputTextPaginas(_idDivConScroll, _idInputTextPaginas, _idDivContenedorPaginas);
	}

	crearEventListeners(_idInputTextPaginas, _idDivConScroll, _idDivContenedorPaginas = "", _idBotonMas = "", _idBotonMenos = "", _idBotonRotar = "", _idBotonRotarTodas = "", _touchMode = false) {
		const OBJETO = this;
		const INPUT_TEXT_PAGINAS = document.getElementById(_idInputTextPaginas);

		INPUT_TEXT_PAGINAS.addEventListener("input", (e) => {
			if (e.currentTarget.dataset.disabled != "true") {
				if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 1 && e.target.value != 0) {
					if (!/^\d*$/.test(e.target.value)) {
						// Si el valor ingresado no contiene solo números, eliminar los caracteres no numéricos
						e.target.value = e.target.value.replace(/[^\d]/g, '');
					}
					else {
						if (e.target.value.length > 3) {
							e.target.value = e.target.value.slice(0, 3);
						}

						if (e.target.value > document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length) {
							e.target.value = document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length;
						}
					}
				}
				else {
					e.target.value = "1";
				}
			}
		});

		INPUT_TEXT_PAGINAS.addEventListener("focus", (e) => {
			if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 1) {
				e.target.select();
			}
		});

		INPUT_TEXT_PAGINAS.addEventListener("change", () => {
			if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 1) {
				OBJETO.moverScrollDivConScroll(_idInputTextPaginas, _idDivContenedorPaginas);
			}
		});

		INPUT_TEXT_PAGINAS.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault(); // Evita que el evento 'Enter' realice su comportamiento predeterminado
				if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 1) {
					OBJETO.moverScrollDivConScroll(_idInputTextPaginas, _idDivContenedorPaginas);
				}
			}
		});

		if (_touchMode) {
			document.getElementById(_idDivConScroll).addEventListener("touchmove", () => {
				OBJETO.actualizarInputTextPaginas(_idDivConScroll, _idInputTextPaginas, _idDivContenedorPaginas);
			});
		}
		else {
			document.getElementById(_idDivConScroll).addEventListener("wheel", () => {
				OBJETO.actualizarInputTextPaginas(_idDivConScroll, _idInputTextPaginas, _idDivContenedorPaginas);
			});
		}

		document.getElementById(_idDivConScroll).addEventListener("scroll", () => {
			//El timeout es para que al dar al botón más/menos página no se cambie el número del paginador al principio justo después de que se cambiase por darle al botón, dando un par de cambios de número confusos momentáneamente
			//De esta manera no entorpece los botones más/menos página y a la vez se activa al hacer scroll en el táctil de un portátil
			clearTimeout(OBJETO.timeoutScrollInputPaginador);
			OBJETO.timeoutScrollInputPaginador = setTimeout(function () { OBJETO.actualizarInputTextPaginas(_idDivConScroll, _idInputTextPaginas, _idDivContenedorPaginas) }, 100);
		});

		if (_idBotonMenos != "") {
			document.getElementById(_idBotonMenos).addEventListener("click", (e) => {
				if (e.currentTarget.dataset.disabled != "true") {
					if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 1) {
						const INPUT_TEXT_PAGINAS = document.getElementById(_idInputTextPaginas);
						let num = parseInt(INPUT_TEXT_PAGINAS.value);
						if (num > 1) {
							num--;
							OBJETO.anadirQuitarClass(e.target, "disabledAplicadorBotonesPaginacion", 0);
						}
						else {
							OBJETO.anadirQuitarClass(e.target, "disabledAplicadorBotonesPaginacion", 1);
						}

						if (num > document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length) {
							num = document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length;
						}
						INPUT_TEXT_PAGINAS.value = num;
						OBJETO.moverScrollDivConScroll(_idInputTextPaginas, _idDivContenedorPaginas);
					}
				}
			});
		}

		if (_idBotonMas != "") {
			document.getElementById(_idBotonMas).addEventListener("click", (e) => {
				if (e.currentTarget.dataset.disabled != "true") {
					if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 1) {
						const INPUT_TEXT_PAGINAS = document.getElementById(_idInputTextPaginas);
						let num = parseInt(INPUT_TEXT_PAGINAS.value);

						if (num >= 0) {
							num++;
							if (num >= document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length) {
								num = document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length;
								OBJETO.anadirQuitarClass(e.target, "disabledAplicadorBotonesPaginacion", 1);
							}
							else {
								OBJETO.anadirQuitarClass(e.target, "disabledAplicadorBotonesPaginacion", 0);
							}

							if (num < 0) {
								num = 1;
							}
							INPUT_TEXT_PAGINAS.value = num;
							OBJETO.moverScrollDivConScroll(_idInputTextPaginas, _idDivContenedorPaginas);
						}
					}
				}
			});
		}

		if (_idBotonRotar != "") {
			document.getElementById(_idBotonRotar).addEventListener("click", (e) => {
				if (e.currentTarget.dataset.disabled != "true") {
					const INPUT_TEXT_PAGINAS = document.getElementById(_idInputTextPaginas);

					if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 0) {
						const PAGINAS = Array.from(document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina"));
						const NPAGINA = parseInt(INPUT_TEXT_PAGINAS.value);

						const CONTENIDO_PAGINA = PAGINAS[NPAGINA - 1];
						if (CONTENIDO_PAGINA != undefined) {
							OBJETO.setToggleClass(CONTENIDO_PAGINA, ["imgRotada90", "imgRotada180", "imgRotada270", "imgRotada0"]);
						}
					}
				}
			});
		}

		if (_idBotonRotarTodas != "") {
			document.getElementById(_idBotonRotarTodas).addEventListener("click", (e) => {
				if (e.currentTarget.dataset.disabled != "true") {
					if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 0) {
						const ELEMENTOS = Array.from(document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina"));
						OBJETO.setToggleClass(ELEMENTOS, ["imgRotada90", "imgRotada180", "imgRotada270", "imgRotada0"], true);
					}
				}
			});
		}
	}

	//	/Secundarias
	//	Primarias
	aplicarBotonesPaginacion(_idInputTextPaginas, _idDivConScroll, _idDivContenedorPaginas = "", _idBotonMas = "", _idBotonMenos = "", _idBotonRotar = "", _idBotonRotarTodas = "", _touchMode = false) {
		if (_idDivContenedorPaginas == "") {
			_idDivContenedorPaginas = _idDivConScroll;
		}

		if (!this.anadidoCSS) {
			this.anadirCSS();
			this.anadidoCSS = true;
		}

		this.crearEventListeners(_idInputTextPaginas, _idDivConScroll, _idDivContenedorPaginas, _idBotonMas, _idBotonMenos, _idBotonRotar, _idBotonRotarTodas, _touchMode);
	}

	anadirCSSRecomendadoOpcional(_idDivContenedorPaginas) {
		const STYLE = document.createElement('style');
		STYLE.innerHTML =
			"#" + _idDivContenedorPaginas +
			`{
						display: flex;
						flex-direction: column;
					}
					.pagina
					{
						object-fit: contain;
						aspect-ratio: 1/1;
						background-color: rgb(5, 5, 21);
					}`;
		document.head.appendChild(STYLE);
	}
	//	/Primarias
}
//======================================================================
// 	/Class ToolBotonesPaginacion
//======================================================================

//======================================================================
// 	Class PDF2IMG
//======================================================================
class ToolPDF2img {
	//Calidad del PDF en input_quality(a mayor número más calidad (desde el 0 al 1, pasando por 0.1, 0.2,...)
	//Calidad del PDF también input_scale, el predeterminado era 1 (a más número mayor calidad)
	input_scale = 2;
	input_quality = 1;
	input_format = "image/jpeg";
	pdfDoc = null;
	pageCount = 0;
	arrayDeImagenes = [];

	maxDownloadsParalelas = 3;
	numDownloadsParalelasActuales = 0;
	accionesAlAcabarToolPDF2img = () => { };
	accionesTrasCadaPaginaCargadaToolPDF2img = () => { };
	accionesAlOcurrirErrorToolPDF2img = () => { };
	accionesAlSaberNumeroPaginasToolPDF2img = () => { };
	accionesAlAcabarReservadoToolPDF2img = () => { };

	constructor(_pdfjsWorkerURL = "") {
		if (typeof pdfjsLib == "undefined") {
			console.warn("Antes debe importar la librería PDFjs");
		}
		else {
			//Por ejemplo: "js/frameworks/pdfworker.min.js"
			//Firefox es el único que cargará el worker.min y no el fake worker del pdfjs. Este archivo permite cargar el pdf en un hilo aparte
			pdfjsLib.GlobalWorkerOptions.workerSrc = _pdfjsWorkerURL;
		}
	}
	//	Secundarias
	reiniciarVariables() {
		this.pdfDoc = null;
		this.pageCount = 0;
		this.arrayDeImagenes = [];
		this.numDownloadsParalelasActuales = 0;
	}

	async pdf2img(_pdfUrl) {
		try {
			await this.readPDF(_pdfUrl);
			await this.downloadAll();
		}
		catch (error) {
			this.pdf2imgError(error);
		}
	}

	async readPDF(_pdfUrl) {
		this.pdfDoc = await pdfjsLib.getDocument(_pdfUrl).promise;
		this.pageCount = this.pdfDoc.numPages;
		this.accionesAlSaberNumeroPaginasToolPDF2img(this.pdfDoc.numPages);
	}

	async downloadAll() {
		for (let i = 1; i <= this.pageCount; i++) {
			if (this.numDownloadsParalelasActuales > this.maxDownloadsParalelas) {
				// Esperar a que algunas descargas terminen antes de continuar
				await this.waitForParallelDownloads();
			}
			else {
				this.numDownloadsParalelasActuales++;
				await this.renderPaginaPDF(i).catch(this.pdf2imgError);
				this.numDownloadsParalelasActuales--; // Marcar la descarga como finalizada
				this.accionesTrasCadaPaginaCargadaToolPDF2img(this.pageCount);
			}
		}

		// Aquí puedes llamar a la función que depende del resultado actual
		this.accionesAlAcabarToolPDF2img(this.arrayDeImagenes);
		this.accionesAlAcabarReservadoToolPDF2img(this.arrayDeImagenes);
		//AQUÍ QUIERO HACER EL RETURN DE QUIEN LLAMÓ AL MÉTODO inputPDF
	}

	async waitForParallelDownloads() {
		while (this.numDownloadsParalelasActuales >= this.maxDownloadsParalelas) {
			await new Promise(resolve => setTimeout(resolve, 500)); // Esperar un poco
		}
	}

	async renderPaginaPDF(_num) {
		const PAGE = await this.pdfDoc.getPage(_num);
		const VIEWPORT = PAGE.getViewport({ scale: this.input_scale });

		const tempCanvas = document.createElement("canvas");
		const tempCtx = tempCanvas.getContext("2d");
		tempCanvas.height = VIEWPORT.height;
		tempCanvas.width = VIEWPORT.width;

		const RENDER_CONTEXT =
		{
			canvasContext: tempCtx,
			viewport: VIEWPORT,
		};

		const RENDER_TASK = PAGE.render(RENDER_CONTEXT);
		await RENDER_TASK.promise;

		const DATA = tempCanvas.toDataURL(this.input_format, this.input_quality);
		this.arrayDeImagenes[_num - 1] = DATA;

		return Promise.resolve(); // Resolvemos la promesa para que downloadAll() espere
	}

	pdf2imgError(error) {
		console.error(error);
		this.numDownloadsParalelasActuales = 0;
		this.accionesAlOcurrirErrorToolPDF2img();
	}
	//	/Secundarias
	//	Primarias
	inputPDF(_archivo) {
		this.reiniciarVariables();
		const READER = new FileReader();
		const OBJETO = this;

		READER.onload = (e) => OBJETO.pdf2img(e.target.result);

		_archivo
			? READER.readAsDataURL(_archivo)
			: console.log("Error de lectura del archivo");
	}
	//	/Primarias
}
//======================================================================
// 	/Class PDF2IMG
//======================================================================

//======================================================================
// 	Class ControlInputArchivos
//======================================================================
class ControlInputArchivos extends ToolPDF2img {
	adicion = false;
	idsVisualizacion = [];
	archivos;

	accionesAlEmpezarInputFile = () => { };
	accionesAlFinalizarInputFile = () => { };
	accionesPorCadaIdVisualizacion = { idVisualizacion: () => { } };

	constructor(_pdfjsWorkerURL = "") {
		super(_pdfjsWorkerURL);
		const OBJETO = this;
		this.accionesAlAcabarReservadoToolPDF2img = function (arrayDeImagenes) {
			OBJETO.recibidoResultadoInputPDF(arrayDeImagenes);
		};
	}

	onInputFiles(_archivos, _idsVisualizacion, _adicion = false) {
		//saber número páginas y cargar número de divs con ello
		this.idsVisualizacion = _idsVisualizacion;
		this.onInputFiles2(_archivos, _adicion);
	}

	onInputFiles2(_archivos, _adicion = false) {
		this.adicion = _adicion;
		this.archivos = Array.from(_archivos);

		this.accionesAlEmpezarInputFile();
		/*
		Procesamos la última posición del array archivos dado por el input file,
		 porque al final del proceso (en onInputImg) eliminaremos la última posición
		  del array y volveremos a llamar a onInputFile hasta que no queden archivos
		*/
		const FILE = this.archivos[this.archivos.length - 1];
		if (FILE) {
			switch (FILE.type) {
				case "application/pdf":
					this.onInputPDF(FILE);
					break;
				case "image/png":
				case "image/jpeg":
				case "image/jpg":
				case "image/gif":
					this.onInputImg(FILE);
					break;
				default:
					this.accionesAlFinalizarInputFile();
					alert("Formato de archivo no soportado!!");
					break;
			}
		}
	}

	onInputPDF(_archivo) {
		this.inputPDF(_archivo);
	}

	recibidoResultadoInputPDF(_arrayDeImagenes) {
		this.onInputImg(_arrayDeImagenes);
	}

	onInputImg(_imagenes) {
		for (let i = 0; i < this.idsVisualizacion.length; i++) {
			this.accionesPorCadaIdVisualizacion[this.idsVisualizacion[i]](_imagenes, this.adicion);
		}

		this.archivos.splice(-1, 1);
		if (this.archivos.length > 0) {
			/*A por el siguiente archivo*/
			this.onInputFiles2(this.archivos, true);
		}
		else {
			this.accionesAlFinalizarInputFile();
			this.idsVisualizacion = [];
			console.log("Rendering complete");
		}
	}
}
//======================================================================
// 	/Class ControlInputArchivos
//======================================================================

//======================================================================
// 	Class ToolControlPaginas
//======================================================================
class ControlPaginasCargaDinamica {
	idDivContenedorPaginas = "";
	idDivConScroll = "";

	displayMostrarContenidoInicial = "flex";

	nPaginasMargenDeCarga = 2;
	contadorIdSrc = 1;

	idsSrcContenidosPagina = {};
	nPaginasActivas = [];

	timeoutScrollActualizarSrc;


	accionesAlFinalizarSinPaginas = () => { };
	accionesAlFinalizarConPaginas = () => { };
	accionesTrasEliminarPaginaYHaberPaginas = () => { };
	accionesAlFinalizarDeIntroducirContenidosPaginas = () => { };



	constructor(_idDivContenedorPaginas, _idDivConScroll, _displayMostrarContenidoInicial = "flex") {
		this.idDivContenedorPaginas = _idDivContenedorPaginas;
		this.idDivConScroll = _idDivConScroll;
		this.displayMostrarContenidoInicial = _displayMostrarContenidoInicial;
	}

	//	Tools
	pasarAArray(variable) {
		let rsp = variable;
		if (!Array.isArray(variable) && variable[Symbol.iterator]) {
			rsp = Array.from(variable);
		}
		else if (!Array.isArray(variable)) {
			rsp = [variable];
		}
		return rsp;
	}

	setToggleValoresCSS(_elementos, _propiedadCSS, _valorOValoresCSS = [], _importante = false) {
		//El primer valor de _valorOValoresCSS es el predeterminado en caso de no encontrar un valor coincidente en el elemento con el array de _valorOValoresCSS recibido
		//Alterna en orden los valores de _valorOValoresCSS en caso de ser un array con varias posiciones, si no, solo aplica el valor recibido en _valorOValoresCSS
		//También sirve para cambiar CSS de elementos con 2 o más _valorAtributo, se deben escribir tales nombres con un espacio en medio
		let CSSElemento,
			valorCSS,
			interruptor,
			valorCSSAAplicar;

		_elementos = this.pasarAArray(_elementos);


		if (_elementos.length > 0) {
			for (let i = 0; i < _elementos.length; i++) {
				valorCSSAAplicar = "";
				CSSElemento = window.getComputedStyle(_elementos[i]);
				valorCSS = CSSElemento.getPropertyValue(_propiedadCSS);
				interruptor = false;
				if (Array.isArray(_valorOValoresCSS)) {
					for (let j = 0; j < _valorOValoresCSS.length && interruptor == false; j++) {
						if (valorCSS == _valorOValoresCSS[j]) {
							if ((j + 1) >= _valorOValoresCSS.length) {
								valorCSSAAplicar = _valorOValoresCSS[0];
							}
							else {
								valorCSSAAplicar = _valorOValoresCSS[j + 1];
							}
							interruptor = true;
						}
					}
					if (valorCSSAAplicar == "") {
						valorCSSAAplicar = _valorOValoresCSS[0];
					}
				}
				else {
					valorCSSAAplicar = _valorOValoresCSS;
				}

				if (_importante) {
					for (let i = 0; i < _elementos.length; i++) {
						_elementos[i].style.setProperty(_propiedadCSS, valorCSSAAplicar, "important");
					}
				}
				else {
					for (let i = 0; i < _elementos.length; i++) {
						_elementos[i].style.setProperty(_propiedadCSS, valorCSSAAplicar);
					}
				}
			}
		}
	}

	dataURLtoBlob(dataurl) {
		const ARR = dataurl.split(','),
			mime = ARR[0].match(/:(.*?);/)[1],
			bstr = atob(ARR[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	imageToBlob(image) {
		const CANVAS = document.createElement('canvas');
		CANVAS.width = image.width;
		CANVAS.height = image.height;
		const CTX = CANVAS.getContext('2d');
		CTX.drawImage(image, 0, 0);
		return new Promise(function (resolve, reject) {
			CANVAS.toBlob(function (blob) {
				if (blob) {
					// Si se obtuvo el objeto Blob con éxito, se resuelve la Promesa.
					resolve(blob);
				}
				else {
					// Si no se pudo obtener el objeto Blob, se rechaza la Promesa con un mensaje de error.
					reject(new Error('Error al convertir la imagen a Blob.'));
				}
			});
		});
	}

	async getBlobsFromImages(images) {
		// Crea un array de promesas para convertir cada imagen en un objeto Blob
		let blobPromises = Array.from(images).map(async (img) => {
			// Comprobar si la posición del array está vacía o contiene los valores null o undefined
			if (img == null || typeof img == "undefined") {
				// La posición del array está vacía o contiene los valores null o undefined
				// No procesar esta posición y devolver null
				return null;
			}
			else {
				// La posición del array contiene una imagen
				// Procesar la imagen y convertirla en un objeto Blob
				let response = await fetch(img.src);
				let blob = await response.blob();
				return blob;
			}
		});

		// Espera a que todas las promesas se resuelvan y filtra el array para eliminar las posiciones vacías o con valores null o undefined
		let blobs = (await Promise.all(blobPromises)).filter(blob => blob != null);

		// Devuelve el array filtrado de objetos Blob
		return blobs;
	}

	isValidImageArray(images) {
		let rsp = false;
		for (let img of images) {
			if (img != null && typeof img == 'object' && 'src' in img && typeof img.src == 'string') {
				rsp = true;
			}
		}
		return rsp;
	}

	checkParameterType(param) {
		if (typeof param === 'string' && param.startsWith('data:')) {
			return "dataURL";
		}
		else if (param instanceof HTMLElement && param.tagName === 'IMG' || param instanceof HTMLImageElement || param instanceof HTMLCanvasElement || param instanceof ImageBitmap || param instanceof OffscreenCanvas || param instanceof SVGImageElement) {
			return "img";
		}
		else if (param instanceof Blob) {
			return "Blob";
		}
		else if (param instanceof HTMLVideoElement) {
			return "video";
		}
		else if (Array.isArray(param)) {
			if (this.isValidImageArray(param)) {
				return "arrayImgSrc";
			}
		}
		else {
			return 0;
		}
	}

	async pasaABlob(_param) {
		const ACCIONES =
		{
			dataURL: () => dataURLtoBlob(_param),
			img: () => imageToBlob(_param),
			video: () => imageToBlob(_param),
			Blob: () => _param,
			arrayImgSrc: async () => {
				const BLOBS = await getBlobsFromImages(_param);
				return BLOBS;
			},
		};

		const TIPO = checkParameterType(_param);
		if (ACCIONES[TIPO]) {
			_param = await ACCIONES[TIPO]();
		}
		return _param;
	}

	eliminarElementos(_elementos) {
		for (let i = 0; i < _elementos.length; i++) {
			eliminarElemento(_elementos[i]);
		}
	}

	eliminarElemento(elemento) {
		if (!elemento) {
			alert("El elemento seleccionado no existe");
		}
		else {
			const PADRE = elemento.parentNode;
			PADRE.removeChild(elemento);
		}
	}

	/**
	 * Inserta una imagen en el contenido de la página.
	 * @param {Blob} _miImagen - La imagen a insertar.
	 * @param {string} _idImgSrc - El ID del elemento `img` donde se insertará la imagen.
	 */
	async insertarImgEnContenidoPagina(_miImagen, _idImgSrc) {
		try {
			const BLOB_IMAGEN = await this.pasaABlob(_miImagen);
			if (BLOB_IMAGEN) {
				const reader = new window.FileReader();
				reader.onload = function (event) {
					document.querySelector("#" + _idImgSrc).src = event.target.result;
				};
				reader.readAsDataURL(BLOB_IMAGEN);
			}
		}
		catch (error) {
			console.error('Error al obtener el Blob de la imagen:', error);
		}
	}

	eliminarDuplicados(array) {
		return [...new Set(array)];
	}

	getPaginaVisibleSegunAlturaScroll(_idDivConScroll, _classPaginas = "pagina") {
		//Actualiza el input al número de página la cuál tenga mayor cantidad visible en pantalla
		const DIV_CON_SCROLL = document.querySelector("#" + _idDivConScroll);
		let nPaginaVisible = 1;
		let maxVisiblePercentage = 0;
		const PAGINAS = DIV_CON_SCROLL.querySelectorAll("." + _classPaginas);
		for (let i = 0; i < PAGINAS.length; i++) {
			const PAGINA_RECT = PAGINAS[i].getBoundingClientRect();
			const DIV_CON_SCROLL_RECT = DIV_CON_SCROLL.getBoundingClientRect();
			if (PAGINA_RECT.bottom >= DIV_CON_SCROLL_RECT.top && PAGINA_RECT.top <= DIV_CON_SCROLL_RECT.bottom) {
				const VISIBLE_HEIGHT = Math.min(PAGINA_RECT.bottom, DIV_CON_SCROLL_RECT.bottom) - Math.max(PAGINA_RECT.top, DIV_CON_SCROLL_RECT.top);
				const VISIBLE_PORCENTAJE = VISIBLE_HEIGHT / PAGINA_RECT.height;
				if (VISIBLE_PORCENTAJE > maxVisiblePercentage) {
					maxVisiblePercentage = VISIBLE_PORCENTAJE;
					nPaginaVisible = i + 1;
				}
			}
		}
		return nPaginaVisible;
	}

	/**
	 * Convierte un string que representa una lista de páginas en un array de números.
	 * @param {string} _str - El string que representa la lista de páginas.
	 * @returns {Array<number>} Un array de números que representa las páginas.
	 */
	traducirStringConPaginasAArray(_str) {
		// Dividir el string en partes separadas por comas
		const PARTES = _str.split(',');

		// Crear un array para almacenar los números de página
		const PAGINAS = [];

		// Procesar cada parte del string
		for (let i = 0; i < PARTES.length; i++) {
			const PARTE = PARTES[i];

			// Comprobar si la parte contiene un guión
			if (PARTE.indexOf('-') !== -1) {
				// La parte contiene un guión, por lo que representa un rango de páginas
				// Dividir la parte en dos partes separadas por el guión
				const RANGO = PARTE.split('-');

				// Convertir las partes en números
				const INICIO = parseInt(RANGO[0]);
				const FIN = parseInt(RANGO[1]);

				// Agregar todos los números del rango al array de páginas
				for (let j = INICIO; j <= FIN; j++) {
					PAGINAS.push(j);
				}
			}
			else {
				// La parte no contiene un guión, por lo que representa un único número de página
				// Convertir la parte en un número y agregarlo al array de páginas
				PAGINAS.push(parseInt(PARTE));
			}
		}

		// Devolver el array de páginas
		return PAGINAS;
	}
	//	/Tools

	//	secundarias
	/**
	 * Comprueba si debe mostrarse el contenido inicial en un contenedor de páginas que no tiene páginas.
	 */
	comprobarSiDebeEstarContenidoInicial() {
		let hermano = document.querySelector("#" + this.idDivContenedorPaginas + " ~ .contenidoInicial");
		let hijo = document.querySelector("#" + this.idDivContenedorPaginas + " .contenidoInicial");
		let contenidoInicial = hermano || hijo;

		if (document.querySelectorAll("#" + this.idDivContenedorPaginas + " .contenidoPagina").length == 0) {
			contenidoInicial.style.display = this.displayMostrarContenidoInicial;
			this.accionesAlFinalizarSinPaginas();
		}
		else {
			contenidoInicial.style.display = "none";
			this.accionesAlFinalizarConPaginas();
		}
	}

	/**
	 * Crea e inserta páginas en un contenedor de páginas.
	 * @param {Array<HTMLElement>|HTMLElement} _contenidoPaginasAIntroducir - El contenido de las páginas a introducir.
	 * @param {boolean} [_adicion=false] - Indica si se deben agregar las nuevas páginas o reemplazar las existentes.
	 */
	crearEInsertarPaginas(_contenidoPaginasAIntroducir, _adicion = false) {
		let archivos = [];
		if (_contenidoPaginasAIntroducir[0] == undefined && Array.isArray(_contenidoPaginasAIntroducir) == false && _contenidoPaginasAIntroducir instanceof NodeList == false) {
			archivos[0] = _contenidoPaginasAIntroducir;
		}
		else {
			archivos = _contenidoPaginasAIntroducir;
		}

		this.nPaginasActivas = [];
		const DIV_CONTENEDOR_PAGINAS = document.getElementById(this.idDivContenedorPaginas);
		//Eliminamos el contenido entero si la adicion es false
		if (!_adicion) {
			this.idsSrcContenidosPagina = {};
			let paginas = Array.from(document.querySelectorAll("#" + this.idDivContenedorPaginas + " .pagina"));
			this.eliminarElementos(paginas);
		}

		for (let j = 0; j < archivos.length; j++) {
			if (archivos[j] != undefined) {
				//Averiguamos el número de la página siguiente
				const NUMERO_PAGINAS = document.querySelectorAll("#" + this.idDivContenedorPaginas + " .contenidoPagina").length;
				const NUMERO_PAG_ACTUAL = NUMERO_PAGINAS + 1;
				const TEXTO_PARA_INSERTAR =
					`<div id="pagina${NUMERO_PAG_ACTUAL + this.idDivContenedorPaginas}" class="pagina${NUMERO_PAG_ACTUAL + this.idDivContenedorPaginas} pagina${this.idDivContenedorPaginas} pagina" data-npagina="${NUMERO_PAG_ACTUAL}">
							<img id="contenidoPagina${NUMERO_PAG_ACTUAL + "" + this.idDivContenedorPaginas}" class="contenidoPaginas${this.idDivContenedorPaginas} contenidoPagina" data-ncontenido="${NUMERO_PAG_ACTUAL}" data-idSrc="${this.contadorIdSrc}" src="" loading="lazy"/>
							<button id="cerrarPagina${NUMERO_PAG_ACTUAL + "" + this.idDivContenedorPaginas}" data-idDivContenedorPaginas="${this.idDivContenedorPaginas}" class="botonCerrarPagina" data-npagina="${NUMERO_PAG_ACTUAL}">X</button>
						</div>`;

				DIV_CONTENEDOR_PAGINAS.innerHTML += TEXTO_PARA_INSERTAR;

				//Insertamos las imágenes en el array
				this.idsSrcContenidosPagina[this.contadorIdSrc] = archivos[j];
				this.contadorIdSrc++;
			}
		}
	}

	/**
	 * Crea páginas e introduce contenido en el contenido páginas.
	 * @param {Array<HTMLElement>|HTMLElement} _contenidoPaginasAIntroducir - El contenido de las páginas a introducir.
	 * @param {boolean} [_adicion=false] - Indica si se deben agregar las nuevas páginas o reemplazar las existentes.
	 */
	insertarContenidosPaginas(_contenidoPaginasAIntroducir, _adicion = false) {
		_contenidoPaginasAIntroducir = this.pasarAArray(_contenidoPaginasAIntroducir);

		if (_contenidoPaginasAIntroducir.length > 0) {
			this.crearEInsertarPaginas(_contenidoPaginasAIntroducir, _adicion);
		}
	}

	eliminarPaginasYMostrarContenidoInicial() {
		this.idsSrcContenidosPagina = {};
		this.nPaginasActivas = [];
		const PAGINAS_A_ELIMINAR = Array.from(document.querySelectorAll("#" + this.idDivContenedorPaginas + " .pagina"));
		this.eliminarElementos(PAGINAS_A_ELIMINAR);
		this.comprobarSiDebeEstarContenidoInicial();
	}

	suprimirVariasPaginasYReordenarPaginas(_stringConPaginasAEliminar) {
		if (this.comprobarStringConPaginas(_stringConPaginasAEliminar)) {
			const DIV_CONTENEDOR_PAGINAS = document.getElementById(this.idDivContenedorPaginas);
			const PAGINAS_A_ELIMINAR = this.eliminarDuplicados(this.traducirStringConPaginasAArray(_stringConPaginasAEliminar));
			let contenidoPaginaAEliminar, idSrc;

			for (let j = 0; j < PAGINAS_A_ELIMINAR.length; j++) {
				contenidoPaginaAEliminar = DIV_CONTENEDOR_PAGINAS.querySelector(`.contenidoPagina[data-ncontenido="${PAGINAS_A_ELIMINAR[j]}"]`);
				if (contenidoPaginaAEliminar != null) {
					idSrc = contenidoPaginaAEliminar.getAttribute("data-idSrc");
					delete this.idsSrcContenidosPagina[idSrc];
					this.nPaginasActivas = [];
				}
			}

			if ((Array.from(document.querySelectorAll("#" + this.idDivContenedorPaginas + " .pagina"))).length > 0) {
				this.reestructurarContenidosPaginas();
			}
		}
	}

	reestructurarContenidosPaginas() {
		let paginaActual = 1;
		//	Eliminando paginas
		const PAGINAS = Array.from(document.querySelectorAll("#" + this.idDivContenedorPaginas + " .pagina"));
		this.eliminarElementos(PAGINAS);
		//	/Eliminando páginas
		for (let idSrc in this.idsSrcContenidosPagina) {
			if (Object.prototype.hasOwnProperty.call(this.idsSrcContenidosPagina, idSrc)) {
				const TEXTO_PARA_INSERTAR =
					`<div id="pagina${paginaActual + this.idDivContenedorPaginas}" class="pagina${paginaActual + this.idDivContenedorPaginas} pagina${this.idDivContenedorPaginas} pagina" data-npagina="${paginaActual}">
							<img id="contenidoPagina${paginaActual + "" + this.idDivContenedorPaginas}" class="contenidoPaginas${this.idDivContenedorPaginas} contenidoPagina" data-ncontenido="${paginaActual}" data-idSrc="${idSrc}" src="" loading="lazy"/>
							<button id="cerrarPagina${paginaActual + "" + this.idDivContenedorPaginas}" data-idDivContenedorPaginas="${this.idDivContenedorPaginas}" class="botonCerrarPagina" data-npagina="${paginaActual}">X</button>
						</div>`;
				paginaActual++;
				document.getElementById(this.idDivContenedorPaginas).innerHTML += TEXTO_PARA_INSERTAR;
			}
		}
	}

	actualizarSrcsCorrespondientesAlViewport() {
		//Comprobar Altura scroll e insertar las img correspondientes
		const NUM_PAGINA_VISIBLE = this.getPaginaVisibleSegunAlturaScroll(this.idDivConScroll);
		const N_PAGINAS_TOTALES = Object.keys(this.idsSrcContenidosPagina).length;
		const N_PAGINAS_MARGEN_DE_CARGA = this.nPaginasMargenDeCarga;
		const N_PAG_MINIMA_VISIBLE = Math.max(NUM_PAGINA_VISIBLE - N_PAGINAS_MARGEN_DE_CARGA, 1);
		const N_PAG_MAXIMA_VISIBLE = Math.min(NUM_PAGINA_VISIBLE + N_PAGINAS_MARGEN_DE_CARGA, N_PAGINAS_TOTALES);
		let idContenidoPagina,
			idSrc;

		if (document.querySelector("#" + this.idDivContenedorPaginas + " .pagina") != null) {
			//Mostramos las src de las img
			for (let i = N_PAG_MINIMA_VISIBLE; i <= N_PAG_MAXIMA_VISIBLE; i++) {
				idContenidoPagina = "contenidoPagina" + i + "" + this.idDivContenedorPaginas;
				idSrc = document.getElementById(idContenidoPagina).getAttribute("data-idSrc");
				if (!this.nPaginasActivas.includes(i)) {
					this.nPaginasActivas.push(i);
				}
				if (idSrc != "" && idSrc != null) {
					this.insertarImgEnContenidoPagina(this.idsSrcContenidosPagina[idSrc], idContenidoPagina);
				}
			}

			//Ocultamos las src de las img que están activos y no están dentro del foco
			for (let i = this.nPaginasActivas.length - 1; i >= 0; i--) {
				if (this.nPaginasActivas[i] < N_PAG_MINIMA_VISIBLE || this.nPaginasActivas[i] > N_PAG_MAXIMA_VISIBLE) {
					idContenidoPagina = "contenidoPagina" + this.nPaginasActivas[i] + "" + this.idDivContenedorPaginas;
					document.getElementById(idContenidoPagina).setAttribute("src", "");
					this.nPaginasActivas.splice(i, 1);
				}
			}
		}
		else {
			this.idsSrcContenidosPagina = {};
			this.nPaginasActivas = [];
		}
	}

	//	/secundarias
	//	primarias
	iniciarControladorPaginacion() {
		this.comprobarSiDebeEstarContenidoInicial();
		this.iniciarEventListenerConPaginas();
		this.iniciarListenerScrollCargaContenidoPaginaSrc();
	}

	/**
	 * Inicia el evento de escucha para el contenedor de páginas para los botones con class botonCerrarPagina, no es necesario que haya páginas con anterioridad.
	 */
	iniciarEventListenerConPaginas() {
		const OBJETO = this;
		document.getElementById(this.idDivContenedorPaginas).addEventListener('click', (e) => {
			if (e.target.classList.contains('botonCerrarPagina')) {
				// El evento se originó en un elemento con la clase .botonCerrarPagina
				OBJETO.eliminarPaginaYReordenarPaginas(e.target.getAttribute("data-npagina"));
			}
		});
	}

	iniciarListenerScrollCargaContenidoPaginaSrc() {
		const OBJETO = this;
		document.getElementById(this.idDivConScroll).addEventListener("scroll", () => {
			clearTimeout(OBJETO.timeoutScrollActualizarSrc);
			OBJETO.timeoutScrollActualizarSrc = setTimeout(function () { OBJETO.actualizarSrcsCorrespondientesAlViewport(); }, 400);
		});
	}

	/**
	 * Crea páginas e introduce contenido en el contenido páginas.
	 * @param {Array<HTMLElement>|HTMLElement} _contenidoPaginasAIntroducir - El contenido de las páginas a introducir.
	 * @param {boolean} [_adicion=false] - Indica si se deben agregar las nuevas páginas (true) o reemplazar las existentes (false).
	 */
	introducirContenidosPaginas(_contenidoPaginasAIntroducir, _adicion = false) {
		this.insertarContenidosPaginas(_contenidoPaginasAIntroducir, _adicion);
		this.actualizarSrcsCorrespondientesAlViewport();
		this.accionesAlFinalizarDeIntroducirContenidosPaginas();
		this.comprobarSiDebeEstarContenidoInicial();
	}

	eliminarVariasPaginasYReordenarPaginas(_stringConPaginasAEliminar) {
		this.suprimirVariasPaginasYReordenarPaginas(_stringConPaginasAEliminar);
		this.actualizarSrcsCorrespondientesAlViewport();
		this.comprobarSiDebeEstarContenidoInicial();
	}

	eliminarPaginaYReordenarPaginas(_nPaginaAEliminar) {
		this.suprimirVariasPaginasYReordenarPaginas(_nPaginaAEliminar);

		if (document.querySelectorAll("#" + this.idDivContenedorPaginas + " .pagina").length > 0) {
			this.accionesTrasEliminarPaginaYHaberPaginas();
		}
		this.actualizarSrcsCorrespondientesAlViewport();
		this.comprobarSiDebeEstarContenidoInicial();
	}

	/**
	 * Comprueba si un string cumple con el formato de una lista de páginas.
	 * @param {string} _str - El string que se comprobará.
	 * @returns {boolean} `true` si el string cumple con el formato, `false` en caso contrario.
	 */
	comprobarStringConPaginas(_str) {
		let rsp = false;
		// Expresión regular para validar el formato del string
		const REGEX = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/;

		// Comprobar si el string cumple con el formato
		if (REGEX.test(_str)) {
			rsp = true;
		}
		return rsp;
	}

	//	/primarias
	//	opcional
	anadirClases() {
		if (!this.anadidosCSS) {
			this.anadidosCSS = true;

			const STYLE = document.createElement('style');
			STYLE.innerHTML =
				`
					.${this.idDivContenedorPaginas}
					{
						"display: flex;
						"flex-direction: column;
					}

					.${this.idDivContenedorPaginas} .botonCerrarPagina
					{
						"position: absolute;
						"top: 0;
						"right: 0;
					}

					.${this.idDivContenedorPaginas} .pagina
					{
						object-fit: contain;
						aspect-ratio: 1/1;
						background-color: rgb(5, 5, 21);
						box-sizing: border-box;
						padding: 2px;
					}

					.${this.idDivContenedorPaginas} .contenidoPagina
					{
						object-fit: contain;
						background-color: rgb(127 127 127);
						display: block;
						aspect-ratio: 1/1;
						width: 100%;
					}

					`;
			document.head.appendChild(STYLE);
		}
	}

	validarCaracterPaginasAEliminar(event) {
		const REGEX2 = /^[0-9,-]+$/;

		if (!REGEX2.test(event.target.value)) {
			event.target.value = event.target.value.slice(0, -1);
		}
	}
	//	/opcional
}

class ToolControlPaginas {
	accionesAlFinalizarSinPaginas = () => { };
	accionesAlFinalizarConPaginas = () => { };
	accionesTrasEliminarPaginaYNoHaberPaginas = () => { };
	accionesAlFinalizarDeIntroducirContenidosPaginas = () => { };

	//	Tools
	pasarAArray(variable) {
		let rsp = variable;
		if (!Array.isArray(variable) && variable[Symbol.iterator]) {
			rsp = Array.from(variable);
		}
		else if (!Array.isArray(variable)) {
			rsp = [variable];
		}
		return rsp;
	}

	setToggleValoresCSS(_elementos, _propiedadCSS, _valorOValoresCSS = [], _importante = false) {
		//El primer valor de _valorOValoresCSS es el predeterminado en caso de no encontrar un valor coincidente en el elemento con el array de _valorOValoresCSS recibido
		//Alterna en orden los valores de _valorOValoresCSS en caso de ser un array con varias posiciones, si no, solo aplica el valor recibido en _valorOValoresCSS
		//También sirve para cambiar CSS de elementos con 2 o más _valorAtributo, se deben escribir tales nombres con un espacio en medio
		let CSSElemento,
			valorCSS,
			interruptor,
			valorCSSAAplicar;

		_elementos = this.pasarAArray(_elementos);


		if (_elementos.length > 0) {
			for (let i = 0; i < _elementos.length; i++) {
				valorCSSAAplicar = "";
				CSSElemento = window.getComputedStyle(_elementos[i]);
				valorCSS = CSSElemento.getPropertyValue(_propiedadCSS);
				interruptor = false;
				if (Array.isArray(_valorOValoresCSS)) {
					for (let j = 0; j < _valorOValoresCSS.length && interruptor == false; j++) {
						if (valorCSS == _valorOValoresCSS[j]) {
							(j + 1) >= _valorOValoresCSS.length
								? valorCSSAAplicar = _valorOValoresCSS[0]
								: valorCSSAAplicar = _valorOValoresCSS[j + 1];
							interruptor = true;
						}
					}
					if (valorCSSAAplicar == "") {
						valorCSSAAplicar = _valorOValoresCSS[0];
					}
				}
				else {
					valorCSSAAplicar = _valorOValoresCSS;
				}

				if (_importante) {
					for (let elemento of _elementos) {
						elemento.style.setProperty(_propiedadCSS, valorCSSAAplicar, "important");
					}
				}
				else {
					for (let elemento of _elementos) {
						elemento.style.setProperty(_propiedadCSS, valorCSSAAplicar);
					}
				}
			}
		}
	}

	dataURLtoBlob(dataurl) {
		const ARR = dataurl.split(','),
			mime = ARR[0].match(/:(.*?);/)[1],
			bstr = atob(ARR[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	imageToBlob(image) {
		const CANVAS = document.createElement('canvas');
		CANVAS.width = image.width;
		CANVAS.height = image.height;
		const CTX = CANVAS.getContext('2d');
		CTX.drawImage(image, 0, 0);
		return new Promise(function (resolve, reject) {
			CANVAS.toBlob(function (blob) {
				blob
					? resolve(blob) // Si se obtuvo el objeto Blob con éxito, se resuelve la Promesa.
					: reject(new Error('Error al convertir la imagen a Blob.')); // Si no se pudo obtener el objeto Blob, se rechaza la Promesa con un mensaje de error.
			});
		});
	}

	async getBlobsFromImages(images) {
		// Crea un array de promesas para convertir cada imagen en un objeto Blob
		let blobPromises = Array.from(images).map(async (img) => {
			// Comprobar si la posición del array está vacía o contiene los valores null o undefined
			if (img == null || typeof img == "undefined") {
				// La posición del array está vacía o contiene los valores null o undefined
				// No procesar esta posición y devolver null
				return null;
			}
			else {
				// La posición del array contiene una imagen
				// Procesar la imagen y convertirla en un objeto Blob
				let response = await fetch(img.src);
				let blob = await response.blob();
				return blob;
			}
		});

		// Espera a que todas las promesas se resuelvan y filtra el array para eliminar las posiciones vacías o con valores null o undefined
		let blobs = (await Promise.all(blobPromises)).filter(blob => blob != null);

		// Devuelve el array filtrado de objetos Blob
		return blobs;
	}

	isValidImageArray(images) {
		let rsp = false;
		for (let img of images) {
			if (img != null && typeof img == 'object' && 'src' in img && typeof img.src == 'string') {
				rsp = true;
			}
		}
		return rsp;
	}

	checkParameterType(param) {
		if (typeof param === 'string' && param.startsWith('data:')) {
			return "dataURL";
		}
		else if (param instanceof HTMLElement && param.tagName === 'IMG' || param instanceof HTMLImageElement || param instanceof HTMLCanvasElement || param instanceof ImageBitmap || param instanceof OffscreenCanvas || param instanceof SVGImageElement) {
			return "img";
		}
		else if (param instanceof Blob) {
			return "Blob";
		}
		else if (param instanceof HTMLVideoElement) {
			return "video";
		}
		else if (Array.isArray(param)) {
			if (this.isValidImageArray(param)) {
				return "arrayImgSrc";
			}
		}
		else {
			return 0;
		}
	}

	async pasaABlob(_param) {
		const acciones =
		{
			dataURL: () => dataURLtoBlob(_param),
			img: () => imageToBlob(_param),
			video: () => imageToBlob(_param),
			Blob: () => _param,
			arrayImgSrc: async () => {
				const blobs = await getBlobsFromImages(_param);
				return blobs;
			},
		};

		const tipo = checkParameterType(_param);
		if (acciones[tipo]) {
			_param = await acciones[tipo]();
		}
		return _param;
	}

	eliminarElementos(_elementos) {
		for (let elemento of _elementos) {
			eliminarElemento(elemento);
		}
	}

	eliminarElemento(elemento) {
		if (!elemento) {
			alert("El elemento seleccionado no existe");
		}
		else {
			const PADRE = elemento.parentNode;
			PADRE.removeChild(elemento);
		}
	}

	/**
	 * Inserta una imagen en el contenido de la página.
	 * @param {Blob} _miImagen - La imagen a insertar.
	 * @param {string} _idImgSrc - El ID del elemento `img` donde se insertará la imagen.
	 */
	async insertarImgEnContenidoPagina(_miImagen, _idImgSrc) {
		try {
			const BLOB_IMAGEN = await this.pasaABlob(_miImagen);
			if (BLOB_IMAGEN) {
				const reader = new window.FileReader();
				reader.onload = function (event) {
					document.querySelector("#" + _idImgSrc).src = event.target.result;
				};
				reader.readAsDataURL(BLOB_IMAGEN);
			}
		} catch (error) {
			console.error('Error al obtener el Blob de la imagen:', error);
		}
	}

	//	/Tools
	//	cuaternarias
	reintroducirContenidosPaginas(_idDivContenedorPaginas) {
		const CONTENIDO_PAGINAS_A_INTRODUCIR = Array.from(document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina"));
		this.insertarContenidosPaginas(CONTENIDO_PAGINAS_A_INTRODUCIR, _idDivContenedorPaginas, false);
	}

	//	/cuaternarias
	//	terciarias
	eliminarPaginaYReordenarPaginas(_paginaAEliminar, _idDivContenedorPaginas, _displayMostrarContenidoInicial) {
		_paginaAEliminar.remove();
		this.reintroducirContenidosPaginas(_idDivContenedorPaginas);

		if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .pagina").length > 0) {
			this.accionesTrasEliminarPaginaYNoHaberPaginas(_idDivContenedorPaginas);
		}
		this.comprobarSiDebeEstarContenidoInicial(_idDivContenedorPaginas, _displayMostrarContenidoInicial);
	}

	/**
	 * Convierte un string que representa una lista de páginas en un array de números.
	 * @param {string} _str - El string que representa la lista de páginas.
	 * @returns {Array<number>} Un array de números que representa las páginas.
	 */
	traducirStringConPaginasAArray(_str) {
		// Dividir el string en partes separadas por comas
		const PARTES = _str.split(',');

		// Crear un array para almacenar los números de página
		const PAGINAS = [];

		// Procesar cada parte del string
		for (let i = 0; i < PARTES.length; i++) {
			const PARTE = PARTES[i];

			// Comprobar si la parte contiene un guión
			if (PARTE.indexOf('-') !== -1) {
				// La parte contiene un guión, por lo que representa un rango de páginas
				// Dividir la parte en dos partes separadas por el guión
				const RANGO = PARTE.split('-');

				// Convertir las partes en números
				const INICIO = parseInt(RANGO[0]);
				const FIN = parseInt(RANGO[1]);

				// Agregar todos los números del rango al array de páginas
				for (let j = INICIO; j <= FIN; j++) {
					PAGINAS.push(j);
				}
			}
			else {
				// La parte no contiene un guión, por lo que representa un único número de página
				// Convertir la parte en un número y agregarlo al array de páginas
				PAGINAS.push(parseInt(PARTE));
			}
		}

		// Devolver el array de páginas
		return PAGINAS;
	}

	/**
	 * Comprueba si un string cumple con el formato de una lista de páginas.
	 * @param {string} _str - El string que se comprobará.
	 * @returns {boolean} `true` si el string cumple con el formato, `false` en caso contrario.
	 */
	comprobarStringConPaginas(_str) {
		let rsp = false;
		// Expresión regular para validar el formato del string
		const REGEX = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/;

		// Comprobar si el string cumple con el formato
		if (REGEX.test(_str)) {
			rsp = true;
		}
		return rsp;
	}

	eliminarPaginasYMostrarContenidoInicial(_idContenedorPaginas, _displayMostrarContenidoInicial) {
		const PAGINAS_A_ELIMINAR = Array.from(document.querySelectorAll("#" + _idContenedorPaginas + " .pagina"));
		for (let pagina of PAGINAS_A_ELIMINAR) {
			pagina.remove();
		}

		this.comprobarSiDebeEstarContenidoInicial(_idContenedorPaginas, _displayMostrarContenidoInicial);
	}

	//	/terciarias
	//	secundarias

	/**
	 * Comprueba si debe mostrarse el contenido inicial en un contenedor de páginas que no tiene páginas.
	 * @param {string} _idDivContenedorPaginas - El ID del contenedor de páginas.
	 * @param {string} _displayMostrarContenidoInicial - El valor del atributo `display` para mostrar el contenido inicial.
	 */
	comprobarSiDebeEstarContenidoInicial(_idDivContenedorPaginas, _displayMostrarContenidoInicial) {
		let hermano = document.querySelector("#" + _idDivContenedorPaginas + " ~ .contenidoInicial");
		let hijo = document.querySelector("#" + _idDivContenedorPaginas + " > .contenidoInicial");
		let contenidoInicial = hermano || hijo;

		if (document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina").length == 0) {
			contenidoInicial.style.display = _displayMostrarContenidoInicial;
			this.accionesAlFinalizarSinPaginas(_idDivContenedorPaginas);
		}
		else {
			contenidoInicial.style.display = "none";
			this.accionesAlFinalizarConPaginas(_idDivContenedorPaginas);
		}
	}

	/**
	 * Crea e inserta páginas en un contenedor de páginas.
	 * @param {Array<HTMLElement>|HTMLElement} _contenidoPaginasAIntroducir - El contenido de las páginas a introducir.
	 * @param {string} _idDivContenedorPaginas - El ID del contenedor de páginas.
	 * @param {boolean} [_adicion=false] - Indica si se deben agregar las nuevas páginas o reemplazar las existentes.
	 * @param {string} [_displayMostrarContenidoInicial] - El valor del atributo `display` para mostrar el contenido inicial si el código lo considera necesario.
	 */
	crearEInsertarPaginas(_contenidoPaginasAIntroducir, _idDivContenedorPaginas, _adicion = false) {
		let archivos = [];
		if (_contenidoPaginasAIntroducir[1] == undefined && Array.isArray(_contenidoPaginasAIntroducir) == false && _contenidoPaginasAIntroducir instanceof NodeList == false) {
			archivos[1] = _contenidoPaginasAIntroducir;
		}
		else {
			archivos = _contenidoPaginasAIntroducir;
		}

		const DIV_CONTENEDOR_PAGINAS = document.getElementById(_idDivContenedorPaginas);
		//Eliminamos el contenido entero si la adicion es false
		if (!_adicion) {
			let contenidoPaginas = Array.from(document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina"));
			let parentsContenidoPaginas = [];
			for (let i = 0; i < contenidoPaginas.length; i++) {
				parentsContenidoPaginas.push(contenidoPaginas[i].parentNode);
			}
			this.eliminarElementos(parentsContenidoPaginas);
		}

		for (let j = 0; j < archivos.length; j++) {
			if (archivos[j] != undefined) {
				//Averiguamos el número de la página siguiente
				const NUMERO_PAGINAS = document.querySelectorAll("#" + _idDivContenedorPaginas + " .contenidoPagina").length;
				const NUMERO_PAG_SIGUIENTE = NUMERO_PAGINAS + 1;

				const TEXTO_PARA_INSERTAR = "<div id='pagina" + NUMERO_PAG_SIGUIENTE + _idDivContenedorPaginas + "' class='pagina" + NUMERO_PAG_SIGUIENTE + _idDivContenedorPaginas + " pagina" + _idDivContenedorPaginas + " pagina' data-npagina='" + NUMERO_PAG_SIGUIENTE + "'>" +
					"<img id='contenidoPagina" + NUMERO_PAG_SIGUIENTE + "" + _idDivContenedorPaginas + "' class='contenidoPaginas" + _idDivContenedorPaginas + " contenidoPagina' data-ncontenido='" + NUMERO_PAG_SIGUIENTE + "' src=''/>" +
					"<button id='cerrarPagina" + NUMERO_PAG_SIGUIENTE + "" + _idDivContenedorPaginas + "' data-idDivContenedorPaginas='" + _idDivContenedorPaginas + "' class='botonCerrarPagina'>X</button>" +
					"</div>";

				DIV_CONTENEDOR_PAGINAS.innerHTML += TEXTO_PARA_INSERTAR;

				//Insertamos las imágenes en los img src correspondientes
				this.insertarImgEnContenidoPagina(archivos[j], "contenidoPagina" + NUMERO_PAG_SIGUIENTE + "" + _idDivContenedorPaginas);
			}
		}
	}

	/**
	 * Inicia el evento de escucha para el contenedor de páginas para los botones con class botonCerrarPagina, no es necesario que haya páginas con anterioridad.
	 * @param {string} _idDivContenedorPaginas - El ID del contenedor de páginas.
	 * @param {string} [_displayMostrarContenidoInicial="flex"] - El valor del atributo `display` para mostrar el contenido inicial.
	 */
	iniciarEventListenerConPaginas(_idDivContenedorPaginas, _displayMostrarContenidoInicial) {
		const OBJETO = this;
		document.getElementById(_idDivContenedorPaginas).addEventListener('click', (e) => {
			if (e.target.classList.contains('botonCerrarPagina')) {
				// El evento se originó en un elemento con la clase .botonCerrarPagina
				OBJETO.eliminarPaginaYReordenarPaginas(e.target.closest(".pagina"), _idDivContenedorPaginas, _displayMostrarContenidoInicial);
			}
		});
	}

	/**
	 * Crea páginas e introduce contenido en el contenido páginas.
	 * @param {Array<HTMLElement>|HTMLElement} _contenidoPaginasAIntroducir - El contenido de las páginas a introducir.
	 * @param {string} _idDivContenedorPaginas - El ID del contenedor de páginas.
	 * @param {boolean} [_adicion=false] - Indica si se deben agregar las nuevas páginas o reemplazar las existentes.
	 * @param {string} [_displayMostrarContenidoInicial="flex"] - El valor del atributo `display` para mostrar el contenido inicial si el código lo considera necesario.
	 */
	insertarContenidosPaginas(_contenidoPaginasAIntroducir, _idDivContenedorPaginas, _adicion = false) {
		_contenidoPaginasAIntroducir = this.pasarAArray(_contenidoPaginasAIntroducir);

		if (_contenidoPaginasAIntroducir.length > 0) {
			this.crearEInsertarPaginas(_contenidoPaginasAIntroducir, _idDivContenedorPaginas, _adicion);
		}
	}

	suprimirVariasPaginasYReordenarPaginas(_idContenedorPaginas, _stringConPaginasAEliminar) {
		if (this.comprobarStringConPaginas(_stringConPaginasAEliminar)) {
			const CONTENIDO_PAGINAS_ACTUALES = Array.from(document.querySelectorAll("#" + _idContenedorPaginas + " .contenidoPagina"));
			const PAGINAS_A_ELIMINAR = this.traducirStringConPaginasAArray(_stringConPaginasAEliminar);

			for (let i = 0; i < CONTENIDO_PAGINAS_ACTUALES.length; i++) {
				for (let j = 0; j < PAGINAS_A_ELIMINAR.length; j++) {
					if ((i + 1) == PAGINAS_A_ELIMINAR[j]) {
						if (CONTENIDO_PAGINAS_ACTUALES[i] != undefined && CONTENIDO_PAGINAS_ACTUALES[i] != null) {
							CONTENIDO_PAGINAS_ACTUALES[i].parentElement.remove();
							CONTENIDO_PAGINAS_ACTUALES[i] = undefined;
							j = PAGINAS_A_ELIMINAR.length;
						}
					}
				}
			}

			const PAGINAS_A_REINSERTAR = [];
			for (let i = 0; i < CONTENIDO_PAGINAS_ACTUALES.length; i++) {
				if (CONTENIDO_PAGINAS_ACTUALES[i] != undefined && CONTENIDO_PAGINAS_ACTUALES[i] != null) {
					PAGINAS_A_REINSERTAR.push(CONTENIDO_PAGINAS_ACTUALES[i]);
				}
			}

			if ((Array.from(document.querySelectorAll("#" + _idContenedorPaginas + " .pagina"))).length > 0) {
				this.insertarContenidosPaginas(PAGINAS_A_REINSERTAR, _idContenedorPaginas, false);
			}
		}
	}

	//	/secundarias
	//	primarias
	iniciarControladorPaginacion(_idDivContenedorPaginas, _displayMostrarContenidoInicial = "flex") {
		this.comprobarSiDebeEstarContenidoInicial(_idDivContenedorPaginas, _displayMostrarContenidoInicial);
		this.iniciarEventListenerConPaginas(_idDivContenedorPaginas, _displayMostrarContenidoInicial);
	}

	introducirContenidosPaginas(_contenidoPaginasAIntroducir, _idDivContenedorPaginas, _adicion = false, _displayMostrarContenidoInicial = "flex") {
		this.insertarContenidosPaginas(_contenidoPaginasAIntroducir, _idDivContenedorPaginas, _adicion);
		this.accionesAlFinalizarDeIntroducirContenidosPaginas(_idDivContenedorPaginas);
		this.comprobarSiDebeEstarContenidoInicial(_idDivContenedorPaginas, _displayMostrarContenidoInicial);
	}

	eliminarVariasPaginasYReordenarPaginas(_idContenedorPaginas, _stringConPaginasAEliminar, _displayMostrarContenidoInicial) {
		this.suprimirVariasPaginasYReordenarPaginas(_idContenedorPaginas, _stringConPaginasAEliminar);
		this.comprobarSiDebeEstarContenidoInicial(_idContenedorPaginas, _displayMostrarContenidoInicial);
	}

	//	/primarias
	//	opcional
	anadirClases(_idDivContenedorPaginas) {
		if (!this.anadidosCSS) {
			this.anadidosCSS = true;

			const STYLE = document.createElement('style');
			STYLE.innerHTML =
				"." + _idDivContenedorPaginas +
				`
					{
						"display: flex;
						"flex-direction: column;
					}

					.botonCerrarPagina
					{
						"position: absolute;
						"top: 0;
						"right: 0;
					}
					
					.pagina
					{
						object-fit: contain;
						aspect-ratio: 1/1;
						background-color: rgb(5, 5, 21);
						box-sizing: border-box;
						padding: 2px;
					}`;
			document.head.appendChild(STYLE);
		}
	}

	validarCaracterPaginasAEliminar(event) {
		const REGEX2 = /^[0-9,-]+$/;

		if (!REGEX2.test(event.target.value)) {
			event.target.value = event.target.value.slice(0, -1);
		}
	}
	//	/opcional
}
//======================================================================
// 	/Class ToolControlPaginas
//======================================================================

//======================================================================
// 	Class ToolAlert
//======================================================================
class ToolAlert {
	modalMiAlert = `<div id='modalMiAlert' style='
						top: 0;
						left: 0;
						right: 0;
						bottom:0;
						position: absolute;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, 0.7);
						display: flex;
						justify-content: center;
						align-items: center;
						z-index: 200;
						flex-direction: column
					'>
					</div>`;
	classCreadasCSS = [];
	nombresPosicionesClassCreadasCSS = [];
	idioma = "es";

	constructor(_idioma) {
		this.idioma = _idioma;
	}

	//	Tools
	eliminarElemento(elemento) {
		if (!elemento) {
			alert("El elemento seleccionado no existe");
		}
		else {
			const PADRE = elemento.parentNode;
			PADRE.removeChild(elemento);
		}
	}

	crearClassCSS(_nombrePosicionArrayAsociativo, _codigoClass) {
		const STYLE = document.createElement('style');
		STYLE.textContent = _codigoClass;

		this.classCreadasCSS[_nombrePosicionArrayAsociativo] = STYLE;
		this.nombresPosicionesClassCreadasCSS[this.nombresPosicionesClassCreadasCSS.length] = _nombrePosicionArrayAsociativo;

		document.head.appendChild(STYLE);
	}

	eliminarClassCreadoPorNombrePosicion(_nombrePosicion, _conPostReordenacion = false) {
		document.head.removeChild(this.classCreadasCSS[_nombrePosicion]);
		if (_conPostReordenacion) {
			this.reordenarPosicionNumericaClassCreados();
		}
	}

	eliminarClassCreadoPorNumeroAdicion(_numeroAdicion, _conPostReordenacion = false) {
		document.head.removeChild(this.classCreadasCSS[this.nombresPosicionesClassCreadasCSS[_numeroAdicion]]);
		if (_conPostReordenacion) {
			this.reordenarPosicionNumericaClassCreados();
		}
	}

	eliminarTodosLosClassCreados(_conPostReordenacion = false) {
		for (let i = 0; i < this.nombresPosicionesClassCreadasCSS.length; i++) {
			document.head.removeChild(this.classCreadasCSS[this.nombresPosicionesClassCreadasCSS[i]]);
		}

		if (_conPostReordenacion) {
			this.reordenarPosicionNumericaClassCreados();
		}
	}

	reordenarPosicionNumericaClassCreados() {
		for (let i = 0; i < this.nombresPosicionesClassCreadasCSS.length; i++) {
			if (this.classCreadasCSS[this.nombresPosicionesClassCreadasCSS[i]] == undefined || this.classCreadasCSS[this.nombresPosicionesClassCreadasCSS[i]] == null) {
				this.nombresPosicionesClassCreadasCSS.splice(i, 1);
				i = i - 1;
			}
		}
	}
	//	/Tools
	//	Primarios

	/**
	 * Muestra una alerta personalizada en la página.
	 * @param {string} _tituloContenido - El título de la alerta.
	 * @param {string} _CuerpoContenido - El cuerpo de la alerta.
	 * @param {string} [_pieContenido=""] - El pie de la alerta.
	 * @param {string} _nombresClassMiAlert - Las clases CSS que se aplicarán a la alerta.
	 * @param {string} [_accionesAlCargar=""] - Las funciones que se ejecutarán con un eval al cargar la alerta.
	 */
	mostrarAlert(_tituloContenido, _CuerpoContenido, _pieContenido = "", _nombresClassMiAlert, _accionesAlCargar = () => { }) {
		document.body.insertAdjacentHTML('beforeend', this.modalMiAlert);
		let contenidoAlert =
			`<div style='
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					text-align: center;
					padding: 0;
					box-sizing: border-box;
				'
				class='`+ _nombresClassMiAlert + `'>
					<div class='tituloContenidoMiAlert' style='position:relative;width:100%;height:15%; display: flex; justify-content: center; align-items: center;'>
						`+ _tituloContenido + `<button class='cerrarAlert' style='position: absolute;top: 5px;right: 5px;'>X</button>
					</div>
					<div class='cuerpoContenidoMiAlert' style='position:relative;width:100%;display: flex; overflow:auto; align-items: center;'>
						`+ _CuerpoContenido + `
					</div>`;
		if (_pieContenido != "") {
			contenidoAlert += `
							<div class='pieContenidoMiAlert' 	style='position:relative;width:100%;height:15%; display: flex; justify-content: center; align-items: center;'>
								`+ _pieContenido + `
							</div>`;
		}
		contenidoAlert += `
				</div>`;
		document.getElementById("modalMiAlert").innerHTML = contenidoAlert;
		_accionesAlCargar();

		function handleBackButtonAlert(e) {
			e.preventDefault();
			cerrarMiAlert_();
		}

		function handleEscKey(event) {
			if (event.key === "Escape" || event.key === "Enter") {
				event.preventDefault();
				cerrarMiAlert_();
			}
		}

		function cerrarMiAlert_() {
			document.removeEventListener("keydown", handleEscKey);
			document.removeEventListener('backbutton', handleBackButtonAlert);
			document.getElementById("modalMiAlert").remove();
		}

		//El onclick solo puede tener una acción a la vez por lo que sustituyes cada vez que asignas función. Con addeventlistener, por cada vez que lo haces añades acción
		document.querySelector(".cerrarAlert").onclick = function () {
			cerrarMiAlert_();
		};

		document.addEventListener('backbutton', handleBackButtonAlert);
		document.addEventListener("keydown", handleEscKey);
	}

	/**
	 * Muestra una confirmación personalizada en la página.
	 * @param {string} _tituloContenido - El título de la confirmación.
	 * @param {string} _CuerpoContenido - El cuerpo de la confirmación.
	 * @param {string} _pieContenido - El pie de la confirmación.
	 * @param {string} _nombresClassMiAlert - Las clases CSS que se aplicarán a la confirmación.
	 * @param {string} _accionesAlAceptar - Las funciones que se ejecutarán al aceptar la confirmación.
	 * @param {string} [_accionesAlCancelar=""] - Las funciones que se ejecutarán al cancelar la confirmación.
	 * @param {boolean} [_cerrarAlAceptar=true] - Indica si se debe cerrar la confirmación al aceptarla.
	 * @param {string} [_accionesAlCargar=""] - Las funciones que se ejecutarán al cargar la confirmación.
	 */
	mostrarConfirm(_tituloContenido, _CuerpoContenido, _pieContenido, _nombresClassMiAlert, _accionesAlAceptar, _accionesAlCancelar = "", _cerrarAlAceptar = true, _accionesAlCargar = "") {
		document.body.insertAdjacentHTML('beforeend', this.modalMiAlert);
		let contenidoAlert =
			`<div style='
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					text-align: center;
				'
				class='`+ _nombresClassMiAlert + `'>
					<div class='tituloContenidoMiAlert' style='position:relative;width:100%;height:15%; display: flex; justify-content: center; align-items: center;'>
						`+ _tituloContenido + `<button class='cerrarAlert' style='position: absolute;top: 5px;right: 5px;'>X</button>
					</div>
					<div class='cuerpoContenidoMiAlert' style='position:relative;width:100%; display: flex; overflow:auto; align-items: center;'>
						`+ _CuerpoContenido + `
					</div>
					<div class='pieContenidoMiAlert' 	style='position:relative;width:100%;height:15%; display: flex; justify-content: center; align-items: center;'>`+ _pieContenido;
		if (this.idioma == "es") {
			contenidoAlert += `<button class='btn-aceptarConfirm'>Aceptar</button><button class='btn-cancelarConfirm'>Cancelar</button>`;
		}
		else {
			contenidoAlert += `<button class='btn-aceptarConfirm'>Accept</button><button class='btn-cancelarConfirm'>Cancel</button>`;
		}
		contenidoAlert += `
					</div>
				</div>`;
		document.getElementById("modalMiAlert").innerHTML = contenidoAlert;
		_accionesAlCargar();

		//El onclick solo puede tener una acción a la vez por lo que sustituyes cada vez que asignas función. Con addeventlistener, por cada vez que lo haces añades acción
		document.querySelector(".btn-aceptarConfirm").onclick = function () {
			aceptarConfirm_();
		};

		document.querySelector(".btn-cancelarConfirm").onclick = function () {
			cancelarConfirm_();
		};

		document.querySelector(".cerrarAlert").onclick = function () {
			cancelarConfirm_();
		};

		function handleBackButton(e) {
			e.preventDefault();
			cancelarConfirm_();
		}

		function handleKey(event) {
			if (event.key === "Escape") {
				cancelarConfirm_();
			}
			else if (event.key === "Enter") {
				aceptarConfirm_();
			}
		}

		function aceptarConfirm_() {
			if (_cerrarAlAceptar) {
				cerrarMiConfirm_();
			}
			_accionesAlAceptar();
		}

		function cancelarConfirm_() {
			_accionesAlCancelar();
			cerrarMiConfirm_();
		}

		function cerrarMiConfirm_() {
			document.removeEventListener("keydown", handleKey);
			document.removeEventListener('backbutton', handleBackButton);
			document.getElementById("modalMiAlert").remove();
		}

		document.addEventListener('backbutton', handleBackButton);
		document.addEventListener("keydown", handleKey);
	}
	//	/Primarios
}
//======================================================================
// 	/Class ToolAlert
//======================================================================

//======================================================================
// 	Class ControladorCSSCreadosDesdeJS
//======================================================================
class ControladorReglasCSS {
	styleElement;
	styleSheet;
	reglasCSS = [];

	constructor() {
		this.styleElement = document.createElement('style');
		document.head.appendChild(this.styleElement);
		this.styleSheet = this.styleElement.sheet;
	}
	//	Secundarias
	obtenerIndicePorNombre(nombre) {
		for (let i = 0; i < this.reglasCSS.length; i++) {
			if (this.reglasCSS[i] === nombre) {
				return i;
			}
		}
		return -1;
	}

	crearRegla(nombre, regla) {
		this.styleSheet.insertRule(regla, this.styleSheet.cssRules.length);
		this.reglasCSS.push(nombre);
	}

	eliminarReglaPorIndice(indice) {
		this.styleSheet.deleteRule(indice);
		this.reglasCSS.splice(indice, 1);
	}
	//	/Secundarias
	//	Primarias
	toggleRegla(nombre, regla) {
		const indice = this.obtenerIndicePorNombre(nombre);
		if (indice != -1) {
			this.eliminarReglaPorIndice(indice);
		}
		else {
			this.crearRegla(nombre, regla);
		}
	}

	crearSiNoExiste(nombre, regla) {
		const indice = this.obtenerIndicePorNombre(nombre);
		if (indice === -1) {
			this.crearRegla(nombre, regla);
		}
	}

	crearSustituirRegla(nombre, regla) {
		const indice = this.obtenerIndicePorNombre(nombre);
		if (indice != -1) {
			this.eliminarReglaPorIndice(indice);
		}
		this.crearRegla(nombre, regla);
	}

	eliminarRegla(nombre) {
		const indice = this.obtenerIndicePorNombre(nombre);
		if (indice != -1) {
			this.eliminarReglaPorIndice(indice);
		}
	}

	eliminarTodasLasReglas() {
		for (let i = this.reglasCSS.length - 1; i >= 0; i--) {
			this.eliminarReglaPorIndice(i);
		}
	}

	existeRegla(nombre) {
		return this.reglasCSS.includes(nombre);
	}
	//	/Primarias
}

//Con objeto reglasCSS, descartado porque los objetos no están diseñados para tener un orden en sus propiedades en principio
class ControladorStyleCSS {
	styleElement;
	styleSheet;
	reglasCSS = {};

	constructor() {
		this.styleElement = document.createElement('style');
		document.head.appendChild(this.styleElement);
		this.styleSheet = this.styleElement.sheet;
	}
	//	Secundarias
	actualizarIndicesReglasCSS() {
		let contador = 0;

		for (let nombre in this.reglasCSS) {
			this.reglasCSS[nombre] = contador;
			contador++;
		}
	}
	//	/Secundarias
	//	Primarias
	toggleRegla(nombre, regla) {
		if (Object.prototype.hasOwnProperty.call(this.reglasCSS, nombre)) {
			this.eliminarRegla(nombre);
		}
		else {
			this.crearSiNoExiste(nombre, regla);
		}
	}

	crearSiNoExiste(nombre, regla) {
		if (!Object.prototype.hasOwnProperty.call(this.reglasCSS, nombre)) {
			let reglaNueva = this.styleSheet.insertRule(regla, this.styleSheet.cssRules.length);
			this.reglasCSS[nombre] = reglaNueva;
		}
	}

	crearSustituirRegla(nombre, regla) {
		if (Object.prototype.hasOwnProperty.call(this.reglasCSS, nombre)) {
			this.eliminarRegla(nombre);
		}
		let reglaNueva = this.styleSheet.insertRule(regla, this.styleSheet.cssRules.length);
		this.reglasCSS[nombre] = reglaNueva;
	}

	eliminarRegla(nombre) {
		if (this.reglasCSS[nombre] != undefined) {
			this.styleSheet.deleteRule(this.reglasCSS[nombre]);
			delete this.reglasCSS[nombre];
			//Actualizamos los contenidos de reglasCSS para que coincidan con los índices de styleSheet, que se actualizaron al eliminar una regla
			this.actualizarIndicesReglasCSS();
		}
	}

	eliminarTodasLasReglas() {
		const reglasCSS = Object.keys(this.reglasCSS);
		for (const nombreRegla of reglasCSS) {
			this.eliminarRegla(nombreRegla);
		}
	}

	existeRegla(nombre) {
		let rsp;
		if (Object.prototype.hasOwnProperty.call(this.reglasCSS, nombre)) {
			rsp = true;
		}
		else {
			rsp = false;
		}
		return rsp;
	}
	//	/Primarias
}
//======================================================================
// 	/Class ControladorCSSCreadosDesdeJS
//======================================================================

//======================================================================
// 	Class MiLocalStorage
//======================================================================
class MiLocalStorage {
	static obtenerItem(key, variable) {
		const data = localStorage.getItem(key);
		if (data) {
			try {
				const parsedData = JSON.parse(data);
				return parsedData[variable] || false;
			}
			catch (error) {
				console.error("Error parsing data from localStorage:", error);
			}
		}
		return false;
	}

	static guardar(clave, valor) {
		localStorage.setItem(clave, JSON.stringify(valor));
	}

	static obtener(clave) {
		const valor = localStorage.getItem(clave);
		return JSON.parse(valor);
	}

	static obtenerTodasLasClavesYContenidos() {
		const claves = Object.keys(localStorage);
		const contenidos = {};

		claves.forEach((clave) => {
			contenidos[clave] = this.obtener(clave);
		});

		return contenidos;
	}

	static eliminar(clave) {
		localStorage.removeItem(clave);
	}

	static eliminarPropiedad(clave, propiedad) {
		let objetoExistente = this.obtener(clave);

		if (objetoExistente && propiedad in objetoExistente) {
			delete objetoExistente[propiedad];
			this.guardar(clave, objetoExistente);
		}
	}

	static modificar(clave, nuevoValor) {
		let objetoExistente = this.obtener(clave);

		if (objetoExistente) {
			const objetoModificado = Object.assign({}, objetoExistente, nuevoValor);
			this.guardar(clave, objetoModificado);
		}
		else {
			const nuevoObjeto = Object.assign({}, nuevoValor);
			this.guardar(clave, nuevoObjeto);
		}
	}

	static existe(clave) {
		return localStorage.getItem(clave) !== null;
	}

	static limpiarTodo() {
		localStorage.clear();
	}

	static existeItem(key, item) {
		const data = localStorage.getItem(key);

		if (data) {
			try {
				const parsedData = JSON.parse(data);
				return parsedData.hasOwnProperty(item);
			}
			catch (error) {
				console.error("Error parsing data from localStorage:", error);
			}
		}

		return false;
	}
}
//======================================================================
// 	/Class MiLocalStorage
//======================================================================

//======================================================================
// 	Class GraphicCreator
//======================================================================

class GraphicCreator {
	createCircularGraphic(data, svgClassName) {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "-1 -1 2 2");
		svg.setAttribute("class", svgClassName);

		let currentAngle = 0;
		let totalAmount = data.reduce((total, item) => total + item.amount, 0);

		for (let i = 0; i < data.length; i++) {
			const percentage = data[i].amount / totalAmount;
			const color = data[i].color;
			const name = data[i].name;
			const className = data[i].className;

			const x1 = Math.cos(currentAngle);
			const y1 = Math.sin(currentAngle);

			currentAngle += percentage * 2 * Math.PI;

			const x2 = Math.cos(currentAngle);
			const y2 = Math.sin(currentAngle);

			const midAngle = currentAngle - (percentage * Math.PI);
			const labelX = 0.5 * Math.cos(midAngle);
			const labelY = 0.5 * Math.sin(midAngle);

			const arcLength = percentage > 0.5 ? 1 : 0;

			const path = this.createPath(x1, y1, arcLength, x2, y2, color, className, name);
			const text = this.createText(labelX, labelY, percentage);

			svg.appendChild(path);
			svg.appendChild(text);
		}

		return svg;
	}

	createPath(x1, y1, arcLength, x2, y2, color, className, name) {
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", `M ${x1} ${y1} A 1 1 0 ${arcLength} 1 ${x2} ${y2} L 0 0`);
		path.setAttribute("fill", color);
		path.setAttribute("stroke-width", 0.01);
        path.setAttribute("stroke", "rgb(0,0,0)");
		path.setAttribute("class", className + " pie-slice");
		path.setAttribute("title", name);
		return path;
	}

	createText(labelX, labelY, percentage) {
		const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");

		tspan.setAttribute("x", labelX);
		tspan.setAttribute("y", labelY);
		tspan.setAttribute("fill", "black");
		tspan.setAttribute("font-size", 0.2 * Math.sqrt(percentage));
		tspan.textContent = (percentage * 100).toFixed(2) + "%";

		text.setAttribute("dominant-baseline", "middle");
		text.setAttribute("text-anchor", "middle");
		text.appendChild(tspan);

		return text;
	}

	createLegend(data) {
		const legend = document.createElement("div");
		legend.setAttribute("class", "legend");

		let totalAmount = data.reduce((total, item) => total + item.amount, 0);

		for (let i = 0; i < data.length; i++) {
			const color = data[i].color;
			const name = data[i].name;
			const amount = data[i].amount;
			const percentage = (data[i].amount / totalAmount * 100).toFixed(2);

			const legendItem = this.createLegendItem(color, name, amount, percentage);
			legend.appendChild(legendItem);
		}

		return legend;
	}

	createLegendItem(color, name, amount, percentage) {
		const legendItem = document.createElement("div");
		legendItem.setAttribute("class", "legend-item");

		const colorBox = document.createElement("div");
		colorBox.setAttribute("class", "color-box");
		colorBox.style.backgroundColor = color;

		const labelText = document.createTextNode(`${name}: ${amount} (${percentage}%)`);

		legendItem.appendChild(colorBox);
		legendItem.appendChild(labelText);

		return legendItem;
	}
	/*
	//Ejemplo de uso
	const data = [
		{amount: 200, color: "red", name: "Red", className: "class-red"},
		{amount: 20, color: "green", name: "Green", className: "class-green"},
		{amount: 30, color: "blue", name: "Blue", className: "class-blue"},
		{amount: 40, color: "yellow", name: "Yellow", className: "class-yellow"}
	];
	const graphicCreator = new GraphicCreator();
	const circularGraphic = graphicCreator.createCircularGraphic(data, "myCircle");
	const legend = graphicCreator.createLegend(data, "myCircle");
	
	document.getElementById("graphic").appendChild(circularGraphic);
	document.getElementById("graphic").appendChild(legend); */

	/* 
		//CSS
	#graphic {
	  box-sizing: border-box;
	  position: relative;
	  aspect-ratio: 1/1;
	  margin: 50px;
	  padding: 50px;
	  overflow: visible;
	}
	
	#graphic .pie-slice:hover {
	  transform: scale(1.1);
	  transition: transform 0.5s, fill 0.5s;
	}

	#graphic path:hover + text {
		font-weight: 600;
	}
	
	#graphic .pie-slice {
		stroke: rgb(0, 0, 0);
		stroke-width: 0.01;
	}
	
	#graphic .myCircle {
		overflow: visible;
	}
	
	#graphic .legend {
	  display: flex;
	  flex-direction: column;
	  align-items: flex-start;
	  margin-top: 20px;
	}
	
	#graphic .legend-item {
	  display: flex;
	  align-items: center;
	  margin-bottom: 10px;
	}
	
	#graphic .color-box {
	  width: 20px;
	  height: 20px;
	  margin-right: 10px;
	}
	
	text, tspan {
	  user-select: none;
	  pointer-events: none;
	}
		*/
}

//======================================================================
// 	/Class GraphicCreator
//======================================================================

class CircleGraphic {
    constructor(data, svgClassName) {
        this.data = data;
        this.svgClassName = svgClassName;
        this.svg = null;
        this.legend = null;
    }

    setData(data) {
        this.data = data;
        this.svg = null;
        this.legend = null;
    }

    setSvgClassName(svgClassName) {
        this.svgClassName = svgClassName;
        if (this.svg) {
            this.svg.setAttribute("class", svgClassName);
        }
    }

    render(element) {
        if (!this.svg) {
            this.svg = this.createCircularGraphic();
        }
        if (!this.legend) {
            this.legend = this.createLegend();
        }
        element.appendChild(this.svg);
        element.appendChild(this.legend);
    }

	createCircularGraphic(data, svgClassName) {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "-1 -1 2 2");
		svg.setAttribute("class", svgClassName);

		let currentAngle = 0;
		let totalAmount = data.reduce((total, item) => total + item.amount, 0);

		for (let i = 0; i < data.length; i++) {
			const percentage = data[i].amount / totalAmount;
			const color = data[i].color;
			const name = data[i].name;
			const className = data[i].className;

			const x1 = Math.cos(currentAngle);
			const y1 = Math.sin(currentAngle);

			currentAngle += percentage * 2 * Math.PI;

			const x2 = Math.cos(currentAngle);
			const y2 = Math.sin(currentAngle);

			const midAngle = currentAngle - (percentage * Math.PI);
			const labelX = 0.5 * Math.cos(midAngle);
			const labelY = 0.5 * Math.sin(midAngle);

			const arcLength = percentage > 0.5 ? 1 : 0;

			const path = this.createPath(x1, y1, arcLength, x2, y2, color, className, name);
			const text = this.createText(labelX, labelY, percentage);

			svg.appendChild(path);
			svg.appendChild(text);
		}

		return svg;
	}

	createPath(x1, y1, arcLength, x2, y2, color, className, name) {
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", `M ${x1} ${y1} A 1 1 0 ${arcLength} 1 ${x2} ${y2} L 0 0`);
		path.setAttribute("fill", color);
		path.setAttribute("stroke-width", 0.01);
        path.setAttribute("stroke", "rgb(0,0,0)");
		path.setAttribute("class", className + " pie-slice");
		path.setAttribute("title", name);
		return path;
	}

	createText(labelX, labelY, percentage) {
		const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");

		tspan.setAttribute("x", labelX);
		tspan.setAttribute("y", labelY);
		tspan.setAttribute("fill", "black");
		tspan.setAttribute("font-size", 0.2 * Math.sqrt(percentage));
		tspan.textContent = (percentage * 100).toFixed(2) + "%";

		text.setAttribute("dominant-baseline", "middle");
		text.setAttribute("text-anchor", "middle");
		text.appendChild(tspan);

		return text;
	}

	createLegend(data) {
		const legend = document.createElement("div");
		legend.setAttribute("class", "legend");

		let totalAmount = data.reduce((total, item) => total + item.amount, 0);

		for (let i = 0; i < data.length; i++) {
			const color = data[i].color;
			const name = data[i].name;
			const amount = data[i].amount;
			const percentage = (data[i].amount / totalAmount * 100).toFixed(2);

			const legendItem = this.createLegendItem(color, name, amount, percentage);
			legend.appendChild(legendItem);
		}

		return legend;
	}

	createLegendItem(color, name, amount, percentage) {
		const legendItem = document.createElement("div");
		legendItem.setAttribute("class", "legend-item");

		const colorBox = document.createElement("div");
		colorBox.setAttribute("class", "color-box");
		colorBox.style.backgroundColor = color;

		const labelText = document.createTextNode(`${name}: ${amount} (${percentage}%)`);

		legendItem.appendChild(colorBox);
		legendItem.appendChild(labelText);

		return legendItem;
	}
	/*
	//Ejemplo de uso
	const data = [
		{amount: 200, color: "red", name: "Red", className: "class-red"},
		{amount: 20, color: "green", name: "Green", className: "class-green"},
		{amount: 30, color: "blue", name: "Blue", className: "class-blue"},
		{amount: 40, color: "yellow", name: "Yellow", className: "class-yellow"}
	];
	const graphicCreator = new GraphicCreator();
	const circularGraphic = graphicCreator.createCircularGraphic(data, "myCircle");
	const legend = graphicCreator.createLegend(data, "myCircle");
	
	document.getElementById("graphic").appendChild(circularGraphic);
	document.getElementById("graphic").appendChild(legend); */

	/* 
		//CSS
	#graphic {
	  box-sizing: border-box;
	  position: relative;
	  aspect-ratio: 1/1;
	  margin: 50px;
	  padding: 50px;
	  overflow: visible;
	}
	
	#graphic .pie-slice:hover {
	  transform: scale(1.1);
	  transition: transform 0.5s, fill 0.5s;
	}

	#graphic path:hover + text {
		font-weight: 600;
	}
	
	#graphic .pie-slice {
		stroke: rgb(0, 0, 0);
		stroke-width: 0.01;
	}
	
	#graphic .myCircle {
		overflow: visible;
	}
	
	#graphic .legend {
	  display: flex;
	  flex-direction: column;
	  align-items: flex-start;
	  margin-top: 20px;
	}
	
	#graphic .legend-item {
	  display: flex;
	  align-items: center;
	  margin-bottom: 10px;
	}
	
	#graphic .color-box {
	  width: 20px;
	  height: 20px;
	  margin-right: 10px;
	}
	
	text, tspan {
	  user-select: none;
	  pointer-events: none;
	}
		*/
}