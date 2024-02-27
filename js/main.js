		"use strict";

		//	Variables auxiliares
				let maxAltoYAnchoContenedoresPDF=75;
				let minAltoYAnchoContenedoresPDF=100 - maxAltoYAnchoContenedoresPDF;
				let cargandoPDFDesdeElInput="";
				let cargandoPDFPara="";
				let antiguoScrollBehaviorPreZoom="";
				let sombrasTextoAutomaticas=true;
				let preguntadoSiSalir = false;
				let primerExitBackButton=false;
		//	/Variables auxiliares

		//	Constantes
				const FASE1CONFIGURACION=document.getElementById("fase1Configuracion");
				const FASE2TEST=document.getElementById("fase2Test");

				const CONTENEDOR_PDF1=document.getElementById("ContenedorPDF1");
				const CONTENEDOR_PDF2=document.getElementById("ContenedorPDF2");
				const CONTENEDOR_PDFS=document.getElementById("contenedorPDFs");
				const CONTENEDOR_PDF1_Y_PIZARRA=document.getElementById("ContenedorPDF1yPizarra");
				const CONTENEDOR_PDF2_Y_PIZARRA=document.getElementById("ContenedorPDF2yPizarra");

				const PIZARRA1_CANVAS=document.getElementById("pizarra1");
				const PIZARRA2_CANVAS=document.getElementById("pizarra2");
				const CONTENEDOR_PDFS_Y_TEST = document.getElementById("contenedorPDFsYTest");
				const CONTENEDOR_TEST_Y_MODAL = document.getElementById("contenedorTestYModal");
				const DIV_MENU_RAPIDO1 = document.getElementById("divMenuRapido1");
				const DIV_MENU_RAPIDO2 = document.getElementById("divMenuRapido2");
				const TITULO_TEST2= document.getElementById("tituloTest2");
				const BOTON_CREAR_TEST=document.getElementById("botonCrearTest");
				const PDF_TOOLS_TAB_PANEL=document.getElementById("PDFToolsTabPanel");
				const MAS_ACCIONES_TAB_PANEL=document.getElementById("masAccionesTabPanel");
				const TAB_CONTAINER=document.getElementById("TabContainer");
				const BOTON_BARRA_HORIZONTAL_CONFIG_PDF1_CAMBIAR_ORIENTACION = document.getElementById("botonBarraHorizontalConfigPDF1CambiarOrientacion");
				const BOTON_CONFIG_PDFS_ACTIVAR_DESACTIVAR_MODO_NOCHE = document.getElementById("botonConfigPDFsActivarDesactivarModoNoche");

				const LINEA_DIVISORIA_MOVIL_VERTICAL = document.getElementById("lineaDivisoriaMovilVertical");
				const LINEA_DIVISORIA_MOVIL_HORIZONTAL = document.getElementById("lineaDivisoriaMovilHorizontal");
				const LINEA_DIVISORIA_MOVIL_VERTICAL_CONTENEDOR_PDFS_Y_CONTENEDOR_TEST_Y_MODAL = document.getElementById("lineaDivisoriaMovilVerticalContenedorPDFsYContenedorTestYModal");
				const LINEA_DIVISORIA_MOVIL_HORIZONTAL_CONTENEDOR_PDFS_Y_CONTENEDOR_TEST_Y_MODAL = document.getElementById("lineaDivisoriaMovilHorizontalContenedorPDFsYContenedorTestYModal");

				const PDF_SELECT=document.getElementById("PDFselect");
				const SELECT_DEFORMAR_PDF = document.getElementById("deformarPDF");
				const MAS = document.getElementById("mas");
				const MENOS = document.getElementById("menos");
				const ACTIVAR_DESACTIVAR_MODO_NOCHE = document.getElementById("activarDesactivarModoNoche");
				const CONTENIDO_PAGINAS_CONTENEDOR_PDF1_EN_IMAGENES = FASE2TEST.getElementsByClassName("contenidoPaginasContenedorPDF1EnImagenes");
				const CONTENIDO_PAGINAS_CONTENEDOR_PDF2_EN_IMAGENES = FASE2TEST.getElementsByClassName("contenidoPaginasContenedorPDF2EnImagenes");
				const CAMBIAR_ORIENTACION = document.getElementById("cambiarOrientacion");
				const BORRADOR = document.getElementById("borrador");
				const COLOR_PINCEL=document.getElementById("botonColorPincel");
				const ARCHIVO=document.getElementById("botonInputFile3");
				const ARCHIVO_INPUT3=document.getElementById("file-open3");
				const ROTAR_PAGINAS=document.getElementById("rotarPaginas");

				const CONTENIDO_INICIAL3=document.getElementById("contenidoInicial3");
				const CONTENIDO_INICIAL4=document.getElementById("contenidoInicial4");
				const CONTENEDOR_PDF1_EN_IMAGENES=document.getElementById("ContenedorPDF1EnImagenes");
				const CONTENEDOR_PDF2_EN_IMAGENES=document.getElementById("ContenedorPDF2EnImagenes");

				const CONTENEDOR_DIVS_SCROLLING_TOUCH2=document.getElementById("contenedorDivsScrollingTouch2");
		//	/Constantes

		//	Iniciar objetos
				const OBJ_CONTROL_INPUT_ARCHIVOS= new ControlInputArchivos("js/frameworks/pdf-3.9.179.worker.min.js");
						//	ToolPDF2img
								OBJ_CONTROL_INPUT_ARCHIVOS.accionesTrasCadaPaginaCargadaToolPDF2img=(_pageCount)=>
								{
									actualizarBarraCarga(_pageCount);
								};
								OBJ_CONTROL_INPUT_ARCHIVOS.accionesAlOcurrirErrorToolPDF2img=()=>
								{
									OBJ_CONTROL_INPUT_ARCHIVOS.alFinalizarInputFile();
								};
						//	/ToolPDF2img
						OBJ_CONTROL_INPUT_ARCHIVOS.accionesAlEmpezarInputFile=()=>{
								actualizarBarraCarga();
								mostrarOcultarModalCargaCorrecto("flex");
				
								setRemoveAtributo(document.querySelectorAll(".file-select, #PDFselect, #activarDesactivarModoNoche, #botonCrearTest"), "disabled", 1);
								const ID_DIVS_A_DESHABILITAR = [
									"botonBarraConfigPDF1InputFile",
									"botonBarraConfigPDF2InputFile",
									"botonBarraConfigPDF1Borrar",
									"botonBarraConfigPDF2Borrar"
								];
								setToggleValoresAtributoPorId(ID_DIVS_A_DESHABILITAR,"data-disabled","true");

								document.querySelectorAll('.botonInputFile').forEach(elem => elem.dataset.disabled = "true");
								BOTON_CREAR_TEST.value = TEXTO_CARGANDO[langActual];
						};
						OBJ_CONTROL_INPUT_ARCHIVOS.accionesAlFinalizarInputFile=()=>{
							setTimeout(
								() =>
								{
									actualizarHabilitacionBotonesMenusRapidos();
									mostrarOcultarBotonesBarraConfigContenedorPDFs();
									const ID_DIVS_A_HABILITAR = [
										"botonBarraConfigPDF1InputFile",
										"botonBarraConfigPDF2InputFile",
										"botonBarraConfigPDF1Borrar",
										"botonBarraConfigPDF2Borrar"
									];
									setToggleValoresAtributoPorId(ID_DIVS_A_HABILITAR,"data-disabled","false");
									setRemoveAtributo(document.querySelectorAll(".file-select, #PDFselect, #activarDesactivarModoNoche, #botonCrearTest"), "disabled", 0);
									actualizarHabilitacionBotonesPDF();
									setToggleValoresAtributo(document.querySelectorAll(".botonInputFileFase1, .botonInputFile"), "data-disabled", "false");
									BOTON_CREAR_TEST.value='Crear test';
								}
							, 1000);
			
							if(FASE2TEST.getElementsByClassName("contenidoPaginasContenedorPDF1EnImagenes").length>0)
							{
								OBJ_PIZARRA1.redimensionarPizarra();
								setToggleValoresCSS(FASE2TEST.getElementsByClassName("paginaContenedorPDF1EnImagenes"), "width", getValorCSS2(FASE2TEST.querySelector(".paginaContenedorPDF1EnImagenes"),"width","width")+"%");
							}
			
							if(FASE2TEST.getElementsByClassName("contenidoPaginasContenedorPDF2EnImagenes").length>0)
							{
								OBJ_PIZARRA2.redimensionarPizarra();
								setToggleValoresCSS(FASE2TEST.getElementsByClassName("paginaContenedorPDF2EnImagenes"), "width", getValorCSS2(FASE2TEST.querySelector(".paginaContenedorPDF2EnImagenes"),"width","width")+"%");
							}
			
							mostrarOcultarModalCargaCorrecto("none");
						};
						OBJ_CONTROL_INPUT_ARCHIVOS.accionesPorCadaIdVisualizacion={
							"ContenedorPDF1EnImagenes": (_imagenes, adicion)=>
							{
								OBJ_CONTROL_PAGINAS_F2_1.introducirContenidosPaginas(_imagenes, adicion);
							},
							"ContenedorPDF2EnImagenes": (_imagenes, adicion)=>
							{
								OBJ_CONTROL_PAGINAS_F2_2.introducirContenidosPaginas(_imagenes, adicion);
							},
							"pdf1EnFase1": (_imagenes, adicion)=>
							{
								OBJ_CONTROL_PAGINAS_F1_1.introducirContenidosPaginas(_imagenes, adicion);
							},
							"pdf2EnFase1": (_imagenes, adicion)=>
							{
								OBJ_CONTROL_PAGINAS_F1_2.introducirContenidosPaginas(_imagenes, adicion);
							}
						};
				const OBJ_PIZARRA1 = new Pizarra("pizarra1","ContenedorPDF1yPizarra");
						OBJ_PIZARRA1.idDivConScroll="ContenedorPDF1yPizarra";
						OBJ_PIZARRA1.porcentajeResolucionPizarra=0.75;
						OBJ_PIZARRA1.idModeloContenidoPizarra="ContenedorPDF1EnImagenes";
				const OBJ_PIZARRA2 = new Pizarra("pizarra2","ContenedorPDF2yPizarra");
						OBJ_PIZARRA2.idDivConScroll="ContenedorPDF2yPizarra";
						OBJ_PIZARRA2.porcentajeResolucionPizarra=0.75;
						OBJ_PIZARRA2.idModeloContenidoPizarra="ContenedorPDF2EnImagenes";
				const OBJ_TEMPORIZADOR_TEST= new Temporizador("#tiempoRestante");
				const OBJ_CRONOMETRO_TEST = new Cronometro();
				const OBJ_CONTROLADOR_CSS = new ControladorReglasCSS();
				const OBJ_TOOL_ZOOM = new ToolZoom();
					const OBJ_ZOOM_CONTENEDOR1=new ControlZoom();
					const OBJ_ZOOM_CONTENEDOR2=new ControlZoom();
				const OBJ_TOOL_BARRA_MOVIL = new ToolBarraMovil();
				const OBJ_TOOL_ALERT = new ToolAlert("es");
				const OBJ_TOOL_BOTONES_PAGINACION = new ToolBotonesPaginacion();
				const OBJ_CONTROL_PAGINAS_F2_1 = new ControlPaginasCargaDinamica("ContenedorPDF1EnImagenes","ContenedorPDF1yPizarra");
				const OBJ_CONTROL_PAGINAS_F2_2 = new ControlPaginasCargaDinamica("ContenedorPDF2EnImagenes","ContenedorPDF2yPizarra");
				const OBJ_CONTROL_PAGINAS_F1_1 = new ControlPaginasCargaDinamica("pdf1EnFase1Contenedor","pdf1EnFase1");
				const OBJ_CONTROL_PAGINAS_F1_2 = new ControlPaginasCargaDinamica("pdf2EnFase1Contenedor","pdf2EnFase1");
						OBJ_CONTROL_PAGINAS_F1_1.iniciarControladorPaginacion();
						OBJ_CONTROL_PAGINAS_F1_2.iniciarControladorPaginacion();
						OBJ_CONTROL_PAGINAS_F2_1.iniciarControladorPaginacion();
						OBJ_CONTROL_PAGINAS_F2_2.iniciarControladorPaginacion();

						OBJ_CONTROL_PAGINAS_F2_1.accionesAlFinalizarDeIntroducirContenidosPaginas=
							() =>
							{
								if(document.getElementById("botonBarraConfigPDF1MostrarOcultarPizarra").classList.contains("botonActivo"))
								{
									OBJ_PIZARRA1.borrarPizarraYLineasGuardadas();
								}
							};

						OBJ_CONTROL_PAGINAS_F2_2.accionesAlFinalizarDeIntroducirContenidosPaginas=
							() =>
							{
								if(document.getElementById("botonBarraConfigPDF2MostrarOcultarPizarra").classList.contains("botonActivo"))
								{
									OBJ_PIZARRA2.borrarPizarraYLineasGuardadas();
								}
							};

						OBJ_CONTROL_PAGINAS_F2_1.accionesAlFinalizarConPaginas=
							() =>
							{
								OBJ_PIZARRA1.redimensionarPizarra();
								OBJ_ZOOM_CONTENEDOR1.activarZoom();
							};

						OBJ_CONTROL_PAGINAS_F2_2.accionesAlFinalizarConPaginas=
							() =>
							{
								OBJ_PIZARRA2.redimensionarPizarra();
								OBJ_ZOOM_CONTENEDOR2.activarZoom();
							};

						OBJ_CONTROL_PAGINAS_F2_1.accionesAlFinalizarSinPaginas=
							() =>
							{
								OBJ_PIZARRA1.redimensionarPizarra();
								OBJ_ZOOM_CONTENEDOR1.desactivarZoom();
							};

						OBJ_CONTROL_PAGINAS_F2_2.accionesAlFinalizarSinPaginas=
							() =>
							{
								OBJ_PIZARRA2.redimensionarPizarra();
								OBJ_ZOOM_CONTENEDOR2.desactivarZoom();
							};

				OBJ_PIZARRA1.accionesAntesDeRedimensionar= ()=>
				{
					let contenedorPDF1Height= window.getComputedStyle(CONTENEDOR_PDF1).getPropertyValue("height");
					let contenedorPDF2EnImagenesHeight= window.getComputedStyle(CONTENEDOR_PDF1_EN_IMAGENES).getPropertyValue("height");

					let contenidoInicialDisplay= window.getComputedStyle(CONTENIDO_INICIAL3).getPropertyValue("display");

					if(parseInt(contenedorPDF2EnImagenesHeight)<parseInt(contenedorPDF1Height) && contenidoInicialDisplay=="none")
					{
						CONTENEDOR_PDF1_Y_PIZARRA.style.height="fit-content";
					}
					else
					{
						CONTENEDOR_PDF1_Y_PIZARRA.style.height="100%";
					}
				};

				OBJ_PIZARRA2.accionesAntesDeRedimensionar=()=>
				{
					let contenedorPDF2Height= window.getComputedStyle(CONTENEDOR_PDF2).getPropertyValue("height");
					let contenedorPDF2EnImagenesHeight= window.getComputedStyle(CONTENEDOR_PDF2_EN_IMAGENES).getPropertyValue("height");
		
					let contenidoInicialDisplay= window.getComputedStyle(CONTENIDO_INICIAL4).getPropertyValue("display");

					if(parseInt(contenedorPDF2EnImagenesHeight)<parseInt(contenedorPDF2Height) && contenidoInicialDisplay=="none")
					{
						CONTENEDOR_PDF2_Y_PIZARRA.style.height="fit-content";
					}
					/*else
					{
						CONTENEDOR_PDF2_Y_PIZARRA.style.height="100%";
					}*/
				};

		//	/Iniciar objetos
			let timeoutUltimaLineaPizarra;

			let langActual="es";
			let langJson;

		//	Para eventListener
				let timeOutBlurDetailsMenuFase2;
		//	/Para eventListener

			let testGuardado=false;

			let modoRellenarFueraDeTiempo=false;
			let modoCorregir=false;
			let modoDeseleccionar=false;
			let modoTouch=false;
			let haciendoTest=true;

			let numPregMax;
			let numeroAlternativas=4;
			const ABECEDARIO = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

			if (!localStorage.getItem('primerAcceso'))
			{
				// Si no existe, establece un valor en el almacenamiento local
				localStorage.setItem('primerAcceso', 'true');

				//Es la primera vez que el usuario accede a la web;
				FASE1CONFIGURACION.querySelector(".primerAcceso").style.display="block";
				FASE1CONFIGURACION.querySelector("#botonInstruccionesF1").style.boxShadow="0px 0px 10px 7px #ffff00";
				FASE1CONFIGURACION.querySelector(".primerAcceso").addEventListener("click", (e) =>
				{
					e.target.style.display="none";
					FASE1CONFIGURACION.querySelector("#botonInstruccionesF1").style.boxShadow="initial";
				});
			}

			function reiniciarWeb()
			{
				window.location.reload();
			}

			function adaptarContenedoresPDF()
			{
				//funcion es ocultar mostrar o toggle siendo valores 0, 1, 2
				const CONTENEDOR_PDF1_CSS= window.getComputedStyle(CONTENEDOR_PDF1);
				const CONTENEDOR_PDF2_CSS= window.getComputedStyle(CONTENEDOR_PDF2);
				const CONTENEDOR_PDFS_CSS= window.getComputedStyle(CONTENEDOR_PDFS);

				CONTENEDOR_PDF2_Y_PIZARRA.style.height="100%";
				CONTENEDOR_PDF2_Y_PIZARRA.style.width="100%";
				CONTENEDOR_PDF2_Y_PIZARRA.style.marginTop="initial";
				CONTENEDOR_PDF2_Y_PIZARRA.style.marginLeft="initial";

				//Segundo distribuimos según los activos
				if(CONTENEDOR_PDF1_CSS.getPropertyValue("display")!="none" && CONTENEDOR_PDF2_CSS.getPropertyValue("display")!="none" )
				{
					if(CONTENEDOR_PDFS_CSS.getPropertyValue("flex-direction")=="column")
					{
						CONTENEDOR_PDF2.style.height="50%";
						CONTENEDOR_PDF2.style.width="100%";
						CONTENEDOR_PDF1.style.height="50%";
						CONTENEDOR_PDF1.style.width="100%";

						CONTENEDOR_PDF2_Y_PIZARRA.style.height="calc(100% - 15px)";
						CONTENEDOR_PDF2_Y_PIZARRA.style.marginTop="15px";
						PIZARRA2_CANVAS.style.marginTop="15px";
						PIZARRA2_CANVAS.style.marginLeft="0";
					}
					else
					{
						CONTENEDOR_PDF2.style.width="50%";
						CONTENEDOR_PDF2.style.height="100%";
						CONTENEDOR_PDF1.style.width="50%";
						CONTENEDOR_PDF1.style.height="100%";

						CONTENEDOR_PDF2_Y_PIZARRA.style.width="calc(100% - 15px)";
						CONTENEDOR_PDF2_Y_PIZARRA.style.marginLeft="15px";
						PIZARRA2_CANVAS.style.marginTop="0";
						PIZARRA2_CANVAS.style.marginLeft="15px";
					}
				}
				else
				{
					CONTENEDOR_PDF2.style.height="100%";
					CONTENEDOR_PDF2.style.width="100%";
					CONTENEDOR_PDF1.style.height="100%";
					CONTENEDOR_PDF1.style.width="100%";
					PIZARRA2_CANVAS.style.marginTop="0";
					PIZARRA2_CANVAS.style.marginLeft="0";
				}

				if(CONTENEDOR_PDF1_CSS.getPropertyValue("display")=="none" && CONTENEDOR_PDF2_CSS.getPropertyValue("display")=="none" )
				{
					CONTENEDOR_PDFS.style.display="none";
				}
				else
				{
					CONTENEDOR_PDFS.style.display="flex";
				}

				DIV_MENU_RAPIDO2.style.paddingTop="0";
				DIV_MENU_RAPIDO2.style.paddingLeft="0";
				CONTENEDOR_DIVS_SCROLLING_TOUCH2.style.paddingTop="0";
				CONTENEDOR_DIVS_SCROLLING_TOUCH2.style.paddingLeft="0";

				if(CONTENEDOR_PDFS_CSS.getPropertyValue("flex-direction")=="column")
				{
					if(CONTENEDOR_PDF1_CSS.getPropertyValue("display")!="none")
					{
						DIV_MENU_RAPIDO2.style.paddingTop="15px";
						DIV_MENU_RAPIDO2.style.paddingLeft="0";
						CONTENEDOR_DIVS_SCROLLING_TOUCH2.style.paddingTop="15px";
						CONTENEDOR_DIVS_SCROLLING_TOUCH2.style.paddingLeft="0";
					}
				}
				else if(CONTENEDOR_PDF1_CSS.getPropertyValue("display")!="none")
				{
					DIV_MENU_RAPIDO2.style.paddingLeft="15px";
					DIV_MENU_RAPIDO2.style.paddingTop="0";
					CONTENEDOR_DIVS_SCROLLING_TOUCH2.style.paddingTop="0";
					CONTENEDOR_DIVS_SCROLLING_TOUCH2.style.paddingLeft="15px";
				}

				centrarScrollHorizontal(CONTENEDOR_PDF1_Y_PIZARRA);
				centrarScrollHorizontal(CONTENEDOR_PDF2_Y_PIZARRA);

				redimensionarSegunOrientacionVertical();
			}

			function actualizarHabilitacionBotonesMenusRapidos()
			{
				actualizarHabilitacionBotonesMenusRapidos2('contenidoPaginasContenedorPDF1EnImagenes', [
					'botonBarraConfigPDF1Borrar',
					'botonBarraConfigRotarPaginaPDF1',
					'botonBarraConfigRotarTodasPaginasPDF1',
					'botonBarraConfigPDF1ActivarDesactivarModoNoche'
				],0);

				actualizarHabilitacionBotonesMenusRapidos2('contenidoPaginasContenedorPDF1EnImagenes', [
					'botonBarraConfigMasPaginaPDF1',
					'botonBarraConfigMenosPaginaPDF1',
					'inputTextPaginaSeleccionadaPDF1'
				],1);

				actualizarHabilitacionBotonesMenusRapidos2('contenidoPaginasContenedorPDF2EnImagenes', [
					'botonBarraConfigPDF2Borrar',
					'botonBarraConfigRotarPaginaPDF2',
					'botonBarraConfigRotarTodasPaginasPDF2',
					'botonBarraConfigPDF2ActivarDesactivarModoNoche'
				],0);

				actualizarHabilitacionBotonesMenusRapidos2('contenidoPaginasContenedorPDF2EnImagenes', [
					'botonBarraConfigMasPaginaPDF2',
					'botonBarraConfigMenosPaginaPDF2',
					'inputTextPaginaSeleccionadaPDF2'
				],1);
			}

			function actualizarHabilitacionBotonesMenusRapidos2(_classContenedor, _ids, _maxPaginasParaDisabled=0)
			{
				const DISABLED = FASE2TEST.getElementsByClassName(_classContenedor).length <= _maxPaginasParaDisabled;
				_ids.forEach(id =>
				{
					const ELEMENTO = document.getElementById(id);
					if (ELEMENTO.tagName === 'INPUT')
					{
						setRemoveAtributo(ELEMENTO, 'disabled', DISABLED ? 1 : 0);
					}
					else
					{
						ELEMENTO.dataset.disabled = DISABLED.toString();
					}
				});
			}

			function actualizarHabilitacionBotonesPDF()
			{
				setRemoveAtributo(SELECT_DEFORMAR_PDF, "disabled", 0);

				if (PDF_SELECT.value == 'contenedorPDFs')
				{
					setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"), "disabled", 1);
				
					if(window.getComputedStyle(CONTENEDOR_PDF1).getPropertyValue("display") != "none" || window.getComputedStyle(CONTENEDOR_PDF2).getPropertyValue("display") != "none")
					{
						if (getValorCSS2(CONTENEDOR_PDFS_Y_TEST, "flex-direction") == "column")
						{
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']"), "disabled", 1);
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"), "disabled", 0);
						}
						else
						{
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']"), "disabled", 0);
							setRemoveAtributo(
								[
									SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
									SELECT_DEFORMAR_PDF.querySelector("option[value='altura']")
								], "disabled", 1);
						}
					}
					else
					{
						setRemoveAtributo(
							[
								SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
								SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"),
								SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']")
							], "disabled", 1);
					}

					if
					(
						(CONTENIDO_PAGINAS_CONTENEDOR_PDF1_EN_IMAGENES.length>0 && getValorCSS2(CONTENEDOR_PDF1, "display") != "none")
						||
						(CONTENIDO_PAGINAS_CONTENEDOR_PDF2_EN_IMAGENES.length>0 && getValorCSS2(CONTENEDOR_PDF2, "display") != "none")
					)
					{
						setRemoveAtributo(ROTAR_PAGINAS, "disabled", 0);
					}
					else
					{
						setRemoveAtributo(ROTAR_PAGINAS, "disabled", 1);
					}

					if(getValorCSS2(CONTENEDOR_PDF1, "display") != "none" || getValorCSS2(CONTENEDOR_PDF2, "display") != "none")
					{
						setRemoveAtributo([COLOR_PINCEL, BORRADOR, ARCHIVO_INPUT3], "disabled", 0);
						ARCHIVO.dataset.disabled="false";
					}
					else
					{
						setRemoveAtributo([COLOR_PINCEL, BORRADOR, ARCHIVO_INPUT3], "disabled", 1);
						ARCHIVO.dataset.disabled="true";
					}
				}
				else
				{
					setRemoveAtributo(
					[
						SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
						SELECT_DEFORMAR_PDF.querySelector("option[value='altura']")
					], "disabled", 0);

					if (PDF_SELECT.value == 'ContenedorPDF1') //Si el select tiene contenedor 1 seleccionado
					{
						if (CONTENIDO_PAGINAS_CONTENEDOR_PDF1_EN_IMAGENES.length > 0)
						{
							setRemoveAtributo(
								[
									SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
									ROTAR_PAGINAS
								], "disabled", 0);
						}
						else
						{
							setRemoveAtributo(
								[
									SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
									ROTAR_PAGINAS
								], "disabled", 1);
						}

						if(window.getComputedStyle(CONTENEDOR_PDF1).getPropertyValue("display") != "none" && CONTENIDO_PAGINAS_CONTENEDOR_PDF1_EN_IMAGENES.length > 0) {
							setRemoveAtributo(ACTIVAR_DESACTIVAR_MODO_NOCHE, "disabled", 0);
						}
						else
						{
							setRemoveAtributo(ACTIVAR_DESACTIVAR_MODO_NOCHE, "disabled", 1);
						}

						if(window.getComputedStyle(CONTENEDOR_PDF1).getPropertyValue("display") == "none")
						{
							setRemoveAtributo(
								[
									SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
									SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"),
									SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']")
								], "disabled", 1);
						}
						else if(getValorCSS2(CONTENEDOR_PDFS, "flex-direction") == "row")
						{
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"), "disabled", 1);
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']"), "disabled", 0);
						}
						else
						{
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']"), "disabled", 1);
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"), "disabled", 0);
						}



						if(CONTENIDO_PAGINAS_CONTENEDOR_PDF1_EN_IMAGENES.length>0 && getValorCSS2(CONTENEDOR_PDF1, "display") != "none")
						{
							setRemoveAtributo(ROTAR_PAGINAS, "disabled", 0);
						}
						else
						{
							setRemoveAtributo(ROTAR_PAGINAS, "disabled", 1);
						}

						if(getValorCSS2(CONTENEDOR_PDF1, "display") != "none")
						{
							setRemoveAtributo([COLOR_PINCEL, BORRADOR, ARCHIVO_INPUT3], "disabled", 0);
							ARCHIVO.dataset.disabled="false";
						}
						else
						{
							setRemoveAtributo([COLOR_PINCEL, BORRADOR, ARCHIVO_INPUT3], "disabled", 1);
							ARCHIVO.dataset.disabled="true";
						}
					}
					else if (PDF_SELECT.value == 'ContenedorPDF2') //Si el select tiene contenedor 2 seleccionado
					{
						if(CONTENIDO_PAGINAS_CONTENEDOR_PDF2_EN_IMAGENES.length > 0)
						{
							setRemoveAtributo(
								[
									SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
									ROTAR_PAGINAS
								], "disabled", 0);
						}
						else
						{
							setRemoveAtributo(
								[
									SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
									ROTAR_PAGINAS
								], "disabled", 1);
						}

						if(window.getComputedStyle(CONTENEDOR_PDF2).getPropertyValue("display") != "none" && CONTENIDO_PAGINAS_CONTENEDOR_PDF2_EN_IMAGENES.length > 0)
						{
							setRemoveAtributo(ACTIVAR_DESACTIVAR_MODO_NOCHE, "disabled", 0);
						}
						else
						{
							setRemoveAtributo(ACTIVAR_DESACTIVAR_MODO_NOCHE, "disabled", 1);
						}

						if(window.getComputedStyle(CONTENEDOR_PDF2).getPropertyValue("display") == "none")
						{
							setRemoveAtributo(
								[
									SELECT_DEFORMAR_PDF.querySelector("option[value='zoom']"),
									SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"),
									SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']")
								], "disabled", 1);
						}
						else if(getValorCSS2(CONTENEDOR_PDFS, "flex-direction") == "row")
						{
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"), "disabled", 1);
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']"), "disabled", 0);
						}
						else
						{
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='anchura']"), "disabled", 1);
							setRemoveAtributo(SELECT_DEFORMAR_PDF.querySelector("option[value='altura']"), "disabled", 0);
						}

						if(CONTENIDO_PAGINAS_CONTENEDOR_PDF2_EN_IMAGENES.length>0 && getValorCSS2(CONTENEDOR_PDF2, "display") != "none")
						{
							setRemoveAtributo(ROTAR_PAGINAS, "disabled", 0);
						}
						else
						{
							setRemoveAtributo(ROTAR_PAGINAS, "disabled", 1);
						}

						if(getValorCSS2(CONTENEDOR_PDF2, "display") != "none")
						{
							setRemoveAtributo([COLOR_PINCEL, BORRADOR, ARCHIVO_INPUT3], "disabled", 0);
							ARCHIVO.dataset.disabled="false";
						}
						else
						{
							setRemoveAtributo([COLOR_PINCEL, BORRADOR, ARCHIVO_INPUT3], "disabled", 1);
							ARCHIVO.dataset.disabled="true";
						}
					}
				}

				//Si se muestran ambos contenedores
				if(getValorCSS2(CONTENEDOR_PDF1, "display") != "none" && getValorCSS2(CONTENEDOR_PDF2, "display") != "none")
				{
					setRemoveAtributo(CAMBIAR_ORIENTACION, "disabled", 0);
				}
				else
				{
					setRemoveAtributo(CAMBIAR_ORIENTACION, "disabled", 1);
				}

				//Si algún select tiene seleccionado un option en disabled
				if
				(
					(PDF_SELECT.options[PDF_SELECT.selectedIndex]).disabled 
					|| 
					(SELECT_DEFORMAR_PDF.options[SELECT_DEFORMAR_PDF.selectedIndex]).disabled
				)
				{
					setRemoveAtributo([MAS,MENOS], "disabled", 1);
				}
				else
				{
					setRemoveAtributo([MAS,MENOS], "disabled", 0);
				}
			}

			function onMasMenosBoton(_masMenos="mas")
			{
				if(SELECT_DEFORMAR_PDF.value=='zoom')
				{
					if(PDF_SELECT.value=='ContenedorPDF1')
					{
						cambiarAnchuraImagenesPorClass( 'paginaContenedorPDF1EnImagenes', _masMenos);
						centrarScrollHorizontal(CONTENEDOR_PDF1_Y_PIZARRA);
					}
					else if(PDF_SELECT.value=='ContenedorPDF2')
					{
						cambiarAnchuraImagenesPorClass( 'paginaContenedorPDF2EnImagenes', _masMenos);
						centrarScrollHorizontal(CONTENEDOR_PDF2_Y_PIZARRA);
					}
				}
				else
				{
					cambiarDimensionDivPorId(PDF_SELECT.value, SELECT_DEFORMAR_PDF.value ,_masMenos);
				}
			}

			function mostrarOcultarPestanaContenedor()
			{
				anadirQuitarClass(document.getElementById("botonMostrarOcultarPestanaContenedor"),"botonActivo",2);
				setToggleValoresCSS(FASE2TEST.querySelector(".pestanaMenuFase2OpcionesContenedor"),"display",["none","block"]);
			}

			function activarDesactivarModoDeseleccionar()
			{
				if(modoCorregir==true)
				{
					modoCorregir=false;
					anadirQuitarClass(document.getElementById('botonCorregir'), "botonActivo",0);
					anadirQuitarClass(Array.from(FASE2TEST.getElementsByClassName("respuesta")), "cursorCorreccion",0);
					anadirQuitarClass(Array.from(FASE2TEST.getElementsByClassName("pregunta")), "cursorCorreccion",0);
				}

				if(modoDeseleccionar==false)
				{
					modoDeseleccionar=true;
					anadirQuitarClass(document.getElementById('botonDeseleccionar'), "botonActivo",1);
					if(modoRellenarFueraDeTiempo)
					{
						modoRellenarFueraDeTiempo=false;
					}
				}
				else
				{
					modoDeseleccionar=false;
					anadirQuitarClass(document.getElementById('botonDeseleccionar'), "botonActivo",0);
					if(haciendoTest==false)
					{
						modoRellenarFueraDeTiempo=true;
					}
				}
			}

			function activarDesactivarModoCorregir(_botonCorregir)
			{
				if(modoDeseleccionar==true)
				{
					modoDeseleccionar=false;
					anadirQuitarClass(document.getElementById('botonDeseleccionar'), "botonActivo",0);
				}

				if(modoCorregir==false)
				{
					modoCorregir=true;
					anadirQuitarClass(_botonCorregir, "botonActivo",1);
					anadirQuitarClass(Array.from(FASE2TEST.getElementsByClassName("respuesta")), "cursorCorreccion",1);
					anadirQuitarClass(Array.from(FASE2TEST.getElementsByClassName("pregunta")), "cursorCorreccion",1);

					if(modoRellenarFueraDeTiempo)
					{
						modoRellenarFueraDeTiempo=false;
					}
				}
				else
				{
					modoCorregir=false;
					anadirQuitarClass(_botonCorregir, "botonActivo",0);
					anadirQuitarClass(Array.from(FASE2TEST.getElementsByClassName("respuesta")), "cursorCorreccion",0);
					anadirQuitarClass(Array.from(FASE2TEST.getElementsByClassName("pregunta")), "cursorCorreccion",0);
					if(haciendoTest==false)
					{
						modoRellenarFueraDeTiempo=true;
					}
				}
			}

			function recogerPreguntasRequeridas(_arrayNumFilaPreguntas)
			{
				let rsp =[];
				for(let numFilaPregunta of _arrayNumFilaPreguntas)
				{
					if(FASE2TEST.querySelector('[data-filapreg="'+numFilaPregunta+'"]')!=null)
					{
						rsp.push(FASE2TEST.querySelector('[data-filapreg="'+numFilaPregunta+'"]'));
					}
				}
				return rsp;
			}

			function crearTest(_numPregMax, _numPregInicial=1)
			{
				document.getElementById("fase2Test").style.display="flex";

				TITULO_TEST2.value=document.getElementById("tituloTest1").value;

				let tabla = "";
				numeroAlternativas = parseInt(document.getElementById("nAlternativas").value);

				tabla = `<table class="tablaPreguntas" border=0>
							<tr class="rellenoTrParaTdApunte"></tr>`;
				for (let i = 1; i<=_numPregMax; i++)
				{
					tabla +=`<tr id="filaPreg${i}" data-filaPregVisible="${i + _numPregInicial - 1}" data-filaPreg="${i}" class="filaPreg">
								<td class="botonMasMenosRsp">
									<div class="contenedorBotonMasMenosRsp">
										<input type="button" value="+" class="anadirRsp">
										<input type="button" value="-" class="quitarRsp">
									</div>
								</td>
								<td id="${i}preg" class="pregunta preguntaSinMarcar" title="Cliquéame para cambiar color de fondo representativo de pregunta dudosa o pregunta erróneamente formulada" data-langlocation="2,test,pregunta" data-langmod="title" data-langactual="es">${i + _numPregInicial - 1}</td>`;
					for (let k = 0; k < numeroAlternativas; k++)
					{
						tabla +=`<td id="${i}${ABECEDARIO[k]}" class="sinRellenar respuestaSinCorregir respuesta respuesta${i}">${ABECEDARIO[k]}</td>`;
					}
					tabla += 	`<td id="tdApunte${i}" class="tdApunte" name="oculto" colspan="${numeroAlternativas}">
									<input placeholder="Apunte individual de pregunta" type="text" id="apuntePregunta${i}" class="apuntePreguntaInputText noCorregible" data-numpreg="${i}" data-langlocation="2,test,phapunteindividual" data-langmod="placeholder" data-langactual="es">
										<p id="apuntePreguntaP${i}" class="apuntePreguntaP"></p>
								</td>
								<td class="botonMostrarOcultarApunte" id="botonMostrarOcultarApunte${i}" title="Cliquéame para mostrar u ocultar la barra de texto de apuntes" data-langlocation="2,test,boli" data-langmod="title" data-langactual="es">🖊️</td>
							</tr>`;
				}
				tabla +=
				`<tr class="trAnadirQuitarPreguntas">
					<td class="tdAnadirQuitarPreguntas" colspan="6">
						<div class="contenedorTdAnadirQuitarPreguntas">
							<input id="btnAnadirPregunta" type="button" value="+">
							<input id="btnQuitarPregunta" type="button" value="-">
						</div>
					</td>
				</tr>
				</table>`;
				document.getElementById("contenedorTest-preguntasSinTextArea").innerHTML = tabla;
				actualizarRspRellenarTrParaTdApunte();
				FASE1CONFIGURACION.style.display = "none";
			}

			function eliminarTodosTdDelTr(tr)
			{
				while (tr.firstChild)
				{
					tr.removeChild(tr.firstChild);
				}
			}

			function anadirTdAlTr(tr, numeroTd)
			{
				for(let i=1;i<=numeroTd;i++)
				{
					tr.appendChild(document.createElement("td"));
				}
			}

			function obtenerElNumTdMayor()
			{
				let maxNumTd=0;
				const FILAS=(FASE2TEST.getElementsByClassName("filaPreg"));
				
				for(let i=0;i<FILAS.length;i++)
				{
					let numTd=(FILAS[i]).querySelectorAll("td").length;
					if(numTd>maxNumTd)
					{
						maxNumTd=numTd;
					}
				}
				return maxNumTd;
			}

			function actualizarRspRellenarTrParaTdApunte()
			{
				const TRS_HIDDEN=FASE2TEST.getElementsByClassName("rellenoTrParaTdApunte");
				const TD_TR_HIDDEN=(TRS_HIDDEN[0]).querySelectorAll("td");

				const NUM_TD_MAXIMO=obtenerElNumTdMayor();

				if(NUM_TD_MAXIMO-2!=TD_TR_HIDDEN.length)
				{
					for(let trHidden of TRS_HIDDEN)
					{
						eliminarTodosTdDelTr(trHidden);
						anadirTdAlTr(trHidden,NUM_TD_MAXIMO-2);
					}
				}
			}

			function mostrarOcultarApuntes(_numFila=0)
			{
				if(_numFila<=0)
				{
					if(getValorCSS("class", "tdApunte", "display")=="none")
					{
						setToggleValoresCSS(FASE2TEST.getElementsByClassName('tdApunte'), 'display', 'table-cell');
						setToggleValoresAtributo(FASE2TEST.getElementsByClassName('tdApunte'), 'name', 'visible');
						setToggleValoresCSS(FASE2TEST.getElementsByClassName('respuesta'), 'display', 'none');
					}
					else
					{
						setToggleValoresCSS(FASE2TEST.getElementsByClassName('tdApunte'), 'display', 'none');
						setToggleValoresAtributo(FASE2TEST.getElementsByClassName('tdApunte'), 'name', 'oculto');
						setToggleValoresCSS(FASE2TEST.getElementsByClassName('respuesta'), 'display', 'table-cell');
					}
				}
				else
				{
					setToggleValoresCSS(FASE2TEST.querySelectorAll('#filaPreg'+_numFila+' .respuesta') , "display" , ["none","table-cell"]);
					setToggleValoresCSS(document.getElementById('tdApunte'+_numFila), 'display', ['none', 'table-cell']);

					if(getValorCSS("id","tdApunte"+_numFila,"display")=="none")
					{
						setToggleValoresAtributo(document.getElementById('tdApunte'+_numFila), 'name', 'oculto');
					}
					else
					{
						setToggleValoresAtributo(document.getElementById('tdApunte'+_numFila), 'name', 'visible');
					}
				}
			}

			function finalizarTest()
			{
				modoRellenarFueraDeTiempo=true;
				if(haciendoTest)
				{
					haciendoTest=false;
					anadirQuitarClass(document.getElementById('botonTerminar'), "botonActivo",1);
					document.getElementById("divCronometro").style.display="flex";
				}
			}

			function empezarTest()
			{
				document.getElementById('modalTest').style.display='none';
				document.getElementById('contenedorTest').style.visibility='initial';

				OBJ_TEMPORIZADOR_TEST.iniciarTemporizador();

				OBJ_CRONOMETRO_TEST.accionesACadaIntervaloCronometro=()=>{escribirCronometro()};
				OBJ_CRONOMETRO_TEST.iniciarCronometro();

				
				document.getElementById("botonDeseleccionar").removeAttribute("disabled");
				document.getElementById("botonPausarContinuarTiempos").removeAttribute("disabled");
				document.getElementById("reiniciarTiempos").removeAttribute("disabled");
				document.getElementById("botonCorregir").removeAttribute("disabled");
				document.getElementById("botonEvaluar").removeAttribute("disabled");
				document.getElementById("botonTerminar").removeAttribute("disabled");
				document.getElementById("guardarResultado").removeAttribute("disabled");
			}

			function escribirCronometro()
			{
				document.getElementById("cronometro").value=OBJ_CRONOMETRO_TEST.getTiempoActualConFormato();
			}

			function pauseContinuar()
			{
				OBJ_CRONOMETRO_TEST.pausarContinuarCronometro();
				OBJ_TEMPORIZADOR_TEST.pausarContinuarTemporizador(document.getElementById("tiempoRestante").value);
				if(OBJ_CRONOMETRO_TEST.getSaberSiEstaPausadoCronometro())
				{
					anadirQuitarClass(document.getElementById('botonPausarContinuarTiempos'), "botonActivo",1);
					document.getElementById("botonPausarContinuarTiempos").value="▶";
					setRemoveAtributo(document.getElementById("tiempoRestante"),"disabled",0);
				}
				else
				{
					anadirQuitarClass(document.getElementById('botonPausarContinuarTiempos'), "botonActivo",0);
					document.getElementById("botonPausarContinuarTiempos").value="⏸︎";
					setRemoveAtributo(document.getElementById("tiempoRestante"),"disabled",1);
				}
			}

			function crearDivsDeTablas(_nPregMax)
			{
				const CONTENEDOR=(document.getElementById("contenedorTest-preguntasSinTextArea"));
				let contenido="";
				_nPregMax=parseInt(_nPregMax);
				let numeroDivs=1;

				if(_nPregMax>25)
				{
					numeroDivs=(Math.trunc(_nPregMax/25));
					if(_nPregMax%25!=0)
					{
						numeroDivs++;
					}
				}

				for(let i=1;i<=numeroDivs;i++)
				{
					contenido+='<div id="resultado'+i+'" class="divResultado"></div>';
				}
				CONTENEDOR.innerHTML=contenido;
			}

			function prepararTemporizadorTest()
			{
				OBJ_TEMPORIZADOR_TEST.setSegundosInicialesTemporizador(document.getElementById("tiempoMaxEnSegundos").value);
				OBJ_TEMPORIZADOR_TEST.setMinutosInicialesTemporizador(document.getElementById("tiempoMaxEnMinutos").value);
				OBJ_TEMPORIZADOR_TEST.setHorasInicialesTemporizador(document.getElementById("tiempoMaxEnHoras").value);

				OBJ_TEMPORIZADOR_TEST.ponerInputTemporizadorATiempoInicial();

				const AC_AL_FINALIZAR_TEMPORIZADOR=
				function()
				{
					document.getElementById("tiempoRestante").setAttribute("disabled", "");
					let tiempoTranscurrido= this.getTiempoTranscurrido();
					let alFinalizar = "<div class='alFinalizarContenidoMiAlert'><p data-langlocation='miAlert,hasTardado' data-langmod='html' data-langactual='es'>Has tardado: </p>";
					let tiempo = [];
					if (tiempoTranscurrido[0] > 0)
					{
						tiempo.push("<p>"+tiempoTranscurrido[0]+"</p>" + "<p data-langlocation='miAlert,horas' data-langmod='html' data-langactual='es'> horas</p>");
					}
					if (tiempoTranscurrido[1] > 0)
					{
						tiempo.push("<p>"+tiempoTranscurrido[1]+"</p>" + "<p data-langlocation='miAlert,minutos' data-langmod='html' data-langactual='es'> minutos</p>");
					}
					if (tiempoTranscurrido[2] > 0)
					{
						tiempo.push("<p>"+tiempoTranscurrido[2]+"</p>" + "<p data-langlocation='miAlert,segundos' data-langmod='html' data-langactual='es'> segundos</p>");
					}
					alFinalizar += tiempo.join(', ') + "<p data-langlocation='miAlert,conTiempoInicialDe' data-langmod='html' data-langactual='es'> con tiempo inicial de </p>";
					tiempo = [];
					if (this.getHorasInicialesTemporizador() > 0)
					{
						tiempo.push("<p>"+this.getHorasInicialesTemporizador()+"</p>" + "<p data-langlocation='miAlert,horas' data-langmod='html' data-langactual='es'> horas</p>");
					}
					if (this.getMinutosInicialesTemporizador() > 0)
					{
						tiempo.push("<p>"+this.getMinutosInicialesTemporizador()+"</p>" + "<p data-langlocation='miAlert,minutos' data-langmod='html' data-langactual='es'> minutos</p>");
					}
					if (this.getSegundosInicialesTemporizador() > 0)
					{
						tiempo.push("<p>"+this.getSegundosInicialesTemporizador()+"</p>" + "<p data-langlocation='miAlert,segundos' data-langmod='html' data-langactual='es'> segundos</p>");
					}
					alFinalizar += tiempo.join(', ') + '.</div>';
					OBJ_TOOL_ALERT.mostrarAlert("<div data-langlocation='miAlert,testFinalizado' data-langmod='html' data-langactual='es'>Test finalizado</div>", alFinalizar, "", "ventanaMiAlert",()=>{cambiarIdioma(langActual)});
					finalizarTest();
				};

				OBJ_TEMPORIZADOR_TEST.accionesAlFinalizarTemporizador=AC_AL_FINALIZAR_TEMPORIZADOR;
			}

			function iniciarPreparativosFase2()
			{
				modoCorregir=false;
				modoRellenarFueraDeTiempo=false;
				numPregMax=(document.getElementById("numPregMax")).value;
				const NUM_PREG_INICIAL=Math.trunc(parseInt((document.getElementById("numPregInicial")).value));

				prepararTemporizadorTest();

				//No hace falta preparar el cronometroTest

				iniciarPreparativosPDFEnTest();

				actualizarBotonesActivosBarraIzq();
				actualizarHabilitacionBotonesMenusRapidos();

				document.getElementById("rangoPregAEvaluar").value="1-"+numPregMax;
				FASE2TEST.querySelector(".modoIncorrectasEvaluacion").dispatchEvent(new Event("change"));

				//mostrarLaBarraDimensionadoraAdecuada();
				redimensionarSegunOrientacionVertical();

				crearDivsDeTablas(numPregMax);
				mostrarLaBarraDimensionadoraAdecuada();
				actualizarHabilitacionBotonesPDF();

				crearTest(numPregMax,NUM_PREG_INICIAL);

				centrarScrollHorizontal(CONTENEDOR_PDF1_Y_PIZARRA);
				centrarScrollHorizontal(CONTENEDOR_PDF2_Y_PIZARRA);

				OBJ_PIZARRA1.iniciarPizarra();
				OBJ_PIZARRA2.iniciarPizarra();

				mostrarOcultarBotonesBarraConfigContenedorPDFs();

				crearEventListenerPestanaContenedor();
				crearEventListenerPestanaOpciones();
				crearEventListenerOpcionesBasicas();
				crearEventListenerBotonesBarraConfig();
				crearEventListenerMenuRapido();
				crearEventListenerContenidoContenedorTest();

				OBJ_TOOL_BOTONES_PAGINACION.aplicarBotonesPaginacion("inputTextPaginaSeleccionadaPDF1", "ContenedorPDF1yPizarra", "ContenedorPDF1EnImagenes", "botonBarraConfigMasPaginaPDF1", "botonBarraConfigMenosPaginaPDF1", "botonBarraConfigRotarPaginaPDF1", "botonBarraConfigRotarTodasPaginasPDF1", modoTouch);
				OBJ_TOOL_BOTONES_PAGINACION.aplicarBotonesPaginacion("inputTextPaginaSeleccionadaPDF2", "ContenedorPDF2yPizarra", "ContenedorPDF2EnImagenes", "botonBarraConfigMasPaginaPDF2", "botonBarraConfigMenosPaginaPDF2", "botonBarraConfigRotarPaginaPDF2", "botonBarraConfigRotarTodasPaginasPDF2", modoTouch);

				if(document.getElementsByClassName("paginaContenedorPDF1EnImagenes").length==0)
				{
					OBJ_ZOOM_CONTENEDOR1.desactivarZoom();
				}

				if(document.getElementsByClassName("paginaContenedorPDF2EnImagenes").length==0)
				{
					OBJ_ZOOM_CONTENEDOR2.desactivarZoom();
				}

				if(modoTouch)
				{
					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilTactilDosElementosRedimensionables(
					{
						_divBarraMovil:document.getElementById('lineaDivisoriaMovilHorizontal'),
						_div1:CONTENEDOR_PDF1,
						_div2_conBarraMovil:CONTENEDOR_PDF2,
						_divAreaDeEvento:CONTENEDOR_PDFS,
						_orientacionBarra:"horizontal", 
						_minTamanoContenedorPorcentaje:minAltoYAnchoContenedoresPDF, 
						_maxTamanoContenedorPorcentaje:maxAltoYAnchoContenedoresPDF, 
						_classBarraActiva:"botonActivo"
					});
					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilTactilDosElementosRedimensionables(
					{
						_divBarraMovil:document.getElementById('lineaDivisoriaMovilVertical'),
						_div1:CONTENEDOR_PDF1,
						_div2_conBarraMovil:CONTENEDOR_PDF2,
						_divAreaDeEvento:CONTENEDOR_PDFS,
						_orientacionBarra:"vertical", 
						_minTamanoContenedorPorcentaje:minAltoYAnchoContenedoresPDF, 
						_maxTamanoContenedorPorcentaje:maxAltoYAnchoContenedoresPDF, 
						_classBarraActiva:"botonActivo"
					});

					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilTactilDosElementosRedimensionables(
					{
						_divBarraMovil: document.getElementById('lineaDivisoriaMovilVerticalContenedorPDFsYContenedorTestYModal'),
						_div1: CONTENEDOR_PDFS,
						_div2_conBarraMovil: CONTENEDOR_TEST_Y_MODAL,
						_divAreaDeEvento: CONTENEDOR_PDFS_Y_TEST, 
						_orientacionBarra: "vertical", 
						_minTamanoContenedorPorcentaje: minAltoYAnchoContenedoresPDF, 
						_maxTamanoContenedorPorcentaje: maxAltoYAnchoContenedoresPDF, 
						_classBarraActiva: "botonActivo"
					});
					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilTactilDosElementosRedimensionables(
					{
						_divBarraMovil: document.getElementById('lineaDivisoriaMovilHorizontalContenedorPDFsYContenedorTestYModal'),
						_div1: CONTENEDOR_PDFS,
						_div2_conBarraMovil: CONTENEDOR_TEST_Y_MODAL,
						_divAreaDeEvento: CONTENEDOR_PDFS_Y_TEST, 
						_orientacionBarra: "horizontal", 
						_minTamanoContenedorPorcentaje: minAltoYAnchoContenedoresPDF, 
						_maxTamanoContenedorPorcentaje: maxAltoYAnchoContenedoresPDF, 
						_classBarraActiva: "botonActivo"
					});

					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilTouchUnElementoRedimensionable(
					{
						_divBarra:FASE2TEST.querySelector('#barraCambioTamanoApunteGeneralTextarea'),
						_divContenedor:FASE2TEST.querySelector('#contenedorTest-textArea'), 
						_orientacionBarra:"horizontal", 
						_tamanoMinimo:30 , 
						_tamanoMaximo:90, 
						_formatoMinimo:"px", 
						_formatoMaximo:"%"
					});

					iniciarEventListenersDivScrollingPDFVTouch();
					iniciarEventListenersDivScrollingPDFHTouch();

					crearBotonClickOPresionContinuaTactil(
					{
						_botonId: "menos", 
						_tiempoTimeout: 100, 
						_tiempoIntervalo: 100, 
						_accionesAlClick: ()=>{onMasMenosBoton("menos")},  
						_accionesAlMantener: ()=>{onMasMenosBoton("menos");}
					});

					crearBotonClickOPresionContinuaTactil(
					{
						_botonId: "mas", 
						_tiempoTimeout: 100, 
						_tiempoIntervalo: 100, 
						_accionesAlClick: ()=>{onMasMenosBoton("mas")},  
						_accionesAlMantener: ()=>{onMasMenosBoton("mas");}
					});

					crearBotonClickOPresionContinuaTactil({
						_botonId: "botonBarraConfigPDF1Deshacer",
						_tiempoTimeout: 250,
						_tiempoIntervalo: 100,
						_accionesAlFinalizar: () =>	DIV_MENU_RAPIDO1.style.opacity=0.7,
						_accionesAlClick: () => OBJ_PIZARRA1.deshacerUltimoGrupoDeLineasGuardadas(),
						_accionesAlMantener: () =>
						{
							DIV_MENU_RAPIDO1.style.opacity=0.1;
							OBJ_PIZARRA1.deshacerUltimaLineaGuardada();
						}
					});

					crearBotonClickOPresionContinuaTactil({
						_botonId: "botonBarraConfigPDF1Rehacer",
						_tiempoTimeout: 250,
						_tiempoIntervalo: 100,
						_accionesAlFinalizar: () =>
							DIV_MENU_RAPIDO1.style.opacity=0.7,
						_accionesAlClick: () =>
							OBJ_PIZARRA1.rehacerUltimoGrupoDeLineasGuardadas(),
						_accionesAlMantener: () =>
						{
							DIV_MENU_RAPIDO1.style.opacity=0.1;
							OBJ_PIZARRA1.rehacerUltimaLineaDeshecha();
						}
					});

					crearBotonClickOPresionContinuaTactil({
						_botonId: "botonBarraConfigPDF2Deshacer",
						_tiempoTimeout: 250,
						_tiempoIntervalo: 100,
						_accionesAlFinalizar: () =>
							DIV_MENU_RAPIDO2.style.opacity=0.7,
						_accionesAlClick: () =>
							OBJ_PIZARRA2.deshacerUltimoGrupoDeLineasGuardadas(),
						_accionesAlMantener: () =>
						{
							DIV_MENU_RAPIDO2.style.opacity=0.1;
							OBJ_PIZARRA2.deshacerUltimaLineaGuardada();
						}
					});

					crearBotonClickOPresionContinuaTactil({
						_botonId: "botonBarraConfigPDF2Rehacer",
						_tiempoTimeout: 250,
						_tiempoIntervalo: 100,
						_accionesAlFinalizar: () =>
							DIV_MENU_RAPIDO2.style.opacity=0.7,
						_accionesAlClick: () =>
							OBJ_PIZARRA2.rehacerUltimoGrupoDeLineasGuardadas(),
						_accionesAlMantener: () =>
						{
							DIV_MENU_RAPIDO2.style.opacity=0.1;
							OBJ_PIZARRA2.rehacerUltimaLineaDeshecha();
						}
					});

					FASE2TEST.querySelectorAll(".divBotonConfigPDF").forEach(
						(elemento) => elemento.style.boxShadow = "rgba(221, 221, 221, 0.5) 5px 5px 0px 5px"
					);

					OBJ_ZOOM_CONTENEDOR1.aplicarZoomTactilDeImagenes(
					{
						_idDivObjetivoEventoZoom:"divScrollingPDF1H", 
						_idDivScroll:"ContenedorPDF1yPizarra", 
						_idDivContenedorPaginas:"ContenedorPDF1EnImagenes", 
						_querySelectorAllDeElementosAAplicarZoom:"#ContenedorPDF1EnImagenes ", 
						_widthMinimoZoom: 100,
						_widthMaximoZoom: 450,
						_accionesAlIniciar: ()=>{
							clearTimeout(timeoutUltimaLineaPizarra); 
							OBJ_PIZARRA1.activado=false; 
							OBJ_PIZARRA1.OffObserver();
							antiguoScrollBehaviorPreZoom=getValorCSS2(CONTENEDOR_PDF1_Y_PIZARRA, "scroll-behavior");
							CONTENEDOR_PDF1_Y_PIZARRA.style.scrollBehavior='initial';
						},
						_accionesAlLevantar: ()=>{
							timeoutUltimaLineaPizarra=setTimeout(() => OBJ_PIZARRA1.activado=true, 500);
							CONTENEDOR_PDF1_Y_PIZARRA.style.scrollBehavior = antiguoScrollBehaviorPreZoom;
							OBJ_PIZARRA1.redimensionarPizarra(); 
							OBJ_PIZARRA1.OnObserver();
						},
						_sensibilidadZoom:0.3
					});

					OBJ_ZOOM_CONTENEDOR1.aplicarZoomTactilDeImagenes(
					{
						_idDivObjetivoEventoZoom:"ContenedorPDF1EnImagenes", 
						_idDivScroll:"ContenedorPDF1yPizarra", 
						_idDivContenedorPaginas:"ContenedorPDF1EnImagenes", 
						_querySelectorAllDeElementosAAplicarZoom:"#ContenedorPDF1EnImagenes ", 
						_widthMinimoZoom: 100,
						_widthMaximoZoom: 450,
						_accionesAlIniciar: ()=>{
							clearTimeout(timeoutUltimaLineaPizarra); 
							OBJ_PIZARRA1.activado=false; 
							OBJ_PIZARRA1.OffObserver();
							antiguoScrollBehaviorPreZoom=getValorCSS2(CONTENEDOR_PDF1_Y_PIZARRA, "scroll-behavior");
							CONTENEDOR_PDF1_Y_PIZARRA.style.scrollBehavior='initial';
						},
						_accionesAlLevantar: ()=>{
							timeoutUltimaLineaPizarra=setTimeout(() =>OBJ_PIZARRA1.activado=true, 500);
							CONTENEDOR_PDF1_Y_PIZARRA.style.scrollBehavior = antiguoScrollBehaviorPreZoom;
							OBJ_PIZARRA1.redimensionarPizarra(); 
							OBJ_PIZARRA1.OnObserver();
						},
						_sensibilidadZoom:0.3
					});

					OBJ_ZOOM_CONTENEDOR2.aplicarZoomTactilDeImagenes(
					{
						_idDivObjetivoEventoZoom:"divScrollingPDF2H", 
						_idDivScroll:"ContenedorPDF2yPizarra", 
						_idDivContenedorPaginas:"ContenedorPDF2EnImagenes", 
						_querySelectorAllDeElementosAAplicarZoom:"#ContenedorPDF2EnImagenes ",
						_widthMinimoZoom: 100,
						_widthMaximoZoom: 450,
						_accionesAlIniciar: ()=>{
							clearTimeout(timeoutUltimaLineaPizarra); 
							OBJ_PIZARRA2.activado=false; 
							OBJ_PIZARRA2.OffObserver(); 
							antiguoScrollBehaviorPreZoom=getValorCSS2(CONTENEDOR_PDF2_Y_PIZARRA, "scroll-behavior");
							CONTENEDOR_PDF2_Y_PIZARRA.style.scrollBehavior='initial';
						},
						_accionesAlLevantar: ()=>{
							timeoutUltimaLineaPizarra=setTimeout(() =>OBJ_PIZARRA2.activado=true, 500);
							CONTENEDOR_PDF2_Y_PIZARRA.style.scrollBehavior = antiguoScrollBehaviorPreZoom;
							OBJ_PIZARRA2.redimensionarPizarra(); 
							OBJ_PIZARRA2.OnObserver();
						},
						_sensibilidadZoom:0.3
					});

					OBJ_ZOOM_CONTENEDOR2.aplicarZoomTactilDeImagenes(
						{
							_idDivObjetivoEventoZoom:"ContenedorPDF2EnImagenes", 
							_idDivScroll:"ContenedorPDF2yPizarra", 
							_idDivContenedorPaginas:"ContenedorPDF2EnImagenes", 
							_querySelectorAllDeElementosAAplicarZoom:"#ContenedorPDF2EnImagenes ",
							_widthMinimoZoom: 100,
							_widthMaximoZoom: 450,
							_accionesAlIniciar: ()=>{
								clearTimeout(timeoutUltimaLineaPizarra); 
								OBJ_PIZARRA2.activado=false; 
								OBJ_PIZARRA2.OffObserver(); 
								antiguoScrollBehaviorPreZoom=getValorCSS2(CONTENEDOR_PDF2_Y_PIZARRA, "scroll-behavior");
								CONTENEDOR_PDF2_Y_PIZARRA.style.scrollBehavior='initial';
							},
							_accionesAlLevantar: ()=>{
								timeoutUltimaLineaPizarra=setTimeout(() => OBJ_PIZARRA2.activado=true, 500);
								CONTENEDOR_PDF2_Y_PIZARRA.style.scrollBehavior = antiguoScrollBehaviorPreZoom;
								OBJ_PIZARRA2.redimensionarPizarra(); 
								OBJ_PIZARRA2.OnObserver();
							},
							_sensibilidadZoom:0.3
						});

					OBJ_TOOL_ZOOM.aplicarZoomTactilDeElementos(
					{
						_idDivObjetivoEventoZoom:"contenedorTest-preguntasSinTextArea",
						_idDivScroll:"contenedorTest-preguntasSinTextArea",
						_querySelectorAllDeElementosAAplicarZoom:"#contenedorTest-preguntasSinTextArea td",
						_sensibilidadZoom: 0.001
					});
				}
				else //modo con mouse
				{
					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilMouseDosElementosRedimensionables(
					{
						_divBarraMovil: document.getElementById('lineaDivisoriaMovilHorizontal'),
						_div1: CONTENEDOR_PDF1,
						_div2_conBarraMovil: CONTENEDOR_PDF2,
						_divAreaDeEvento: CONTENEDOR_PDFS,
						_orientacionBarra: "horizontal",
						_minTamanoContenedorPorcentaje: minAltoYAnchoContenedoresPDF,
						_maxTamanoContenedorPorcentaje: maxAltoYAnchoContenedoresPDF,
						_classBarraActiva: "botonActivo"
					});

					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilMouseDosElementosRedimensionables(
					{
						_divBarraMovil:document.getElementById('lineaDivisoriaMovilVertical'),
						_div1:CONTENEDOR_PDF1,
						_div2_conBarraMovil:CONTENEDOR_PDF2,
						_divAreaDeEvento:CONTENEDOR_PDFS,
						_orientacionBarra:"vertical", 
						_minTamanoContenedorPorcentaje:minAltoYAnchoContenedoresPDF, 
						_maxTamanoContenedorPorcentaje:maxAltoYAnchoContenedoresPDF, 
						_classBarraActiva:"botonActivo"
					});

					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilMouseDosElementosRedimensionables(
					{
						_divBarraMovil: document.getElementById('lineaDivisoriaMovilVerticalContenedorPDFsYContenedorTestYModal'),
						_div1: CONTENEDOR_PDFS,
						_div2_conBarraMovil: CONTENEDOR_TEST_Y_MODAL,
						_divAreaDeEvento: CONTENEDOR_PDFS_Y_TEST, 
						_orientacionBarra: "vertical", 
						_minTamanoContenedorPorcentaje: minAltoYAnchoContenedoresPDF, 
						_maxTamanoContenedorPorcentaje: maxAltoYAnchoContenedoresPDF, 
						_classBarraActiva: "botonActivo"
					});

					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilMouseDosElementosRedimensionables(
					{
						_divBarraMovil: document.getElementById('lineaDivisoriaMovilHorizontalContenedorPDFsYContenedorTestYModal'),
						_div1: CONTENEDOR_PDFS,
						_div2_conBarraMovil: CONTENEDOR_TEST_Y_MODAL,
						_divAreaDeEvento: CONTENEDOR_PDFS_Y_TEST, 
						_orientacionBarra: "horizontal", 
						_minTamanoContenedorPorcentaje: minAltoYAnchoContenedoresPDF, 
						_maxTamanoContenedorPorcentaje: maxAltoYAnchoContenedoresPDF, 
						_classBarraActiva: "botonActivo"
					});

					OBJ_TOOL_BARRA_MOVIL.aplicarBarraMovilMouseUnElementoRedimensionable(
					{
						_divBarra:FASE2TEST.querySelector('#barraCambioTamanoApunteGeneralTextarea'),
						_divContenedor:FASE2TEST.querySelector('#contenedorTest-textArea'), 
						_orientacionBarra:"horizontal", 
						_tamanoMinimo:30 , 
						_tamanoMaximo:90, 
						_formatoMinimo:"px", 
						_formatoMaximo:"%"
					});

					OBJ_ZOOM_CONTENEDOR1.aplicarZoomMouseDeImagenes(
					{
						_idDivObjetivoEventoZoom:"ContenedorPDF1",
						_idDivScroll:"ContenedorPDF1yPizarra", 
						_querySelectorAllDeElementosAAplicarZoom:"#ContenedorPDF1EnImagenes",
						_widthMinimoZoom: 100,
						_widthMaximoZoom: 450,
						_accionesAlIniciar: ()=>{
							OBJ_PIZARRA1.OffObserver();
							antiguoScrollBehaviorPreZoom=getValorCSS2(CONTENEDOR_PDF1_Y_PIZARRA, "scroll-behavior");
							CONTENEDOR_PDF1_Y_PIZARRA.style.scrollBehavior='initial';
						},
						_accionesAlAcabar: ()=>{
							CONTENEDOR_PDF1_Y_PIZARRA.style.scrollBehavior = antiguoScrollBehaviorPreZoom;
							OBJ_PIZARRA1.redimensionarPizarra(); 
							OBJ_PIZARRA1.OnObserver();
						}
					});

					OBJ_ZOOM_CONTENEDOR2.aplicarZoomMouseDeImagenes(
					{
						_idDivObjetivoEventoZoom:"ContenedorPDF2", 
						_idDivScroll:"ContenedorPDF2yPizarra", 
						_querySelectorAllDeElementosAAplicarZoom:"#ContenedorPDF2EnImagenes",
						_widthMinimoZoom: 100,
						_widthMaximoZoom: 450,
						_accionesAlIniciar:()=>{
							OBJ_PIZARRA2.OffObserver(); 
							antiguoScrollBehaviorPreZoom=getValorCSS2(CONTENEDOR_PDF2_Y_PIZARRA, "scroll-behavior");
							CONTENEDOR_PDF2_Y_PIZARRA.style.scrollBehavior='initial';
						},
						_accionesAlAcabar:()=>{
							CONTENEDOR_PDF2_Y_PIZARRA.style.scrollBehavior = antiguoScrollBehaviorPreZoom;
							OBJ_PIZARRA2.redimensionarPizarra(); 
							OBJ_PIZARRA2.OnObserver();
						}
					});

					OBJ_TOOL_ZOOM.aplicarZoomMouseDeElementos(
					{
						_idDivObjetivoEventoZoom:"contenedorTest-preguntasSinTextArea",
						_idDivScroll:"contenedorTest-preguntasSinTextArea",
						_querySelectorAllDeElementosAAplicarZoom:".tablaPreguntas"
					});

					crearBotonClickOPresionContinuaMouse(
					{
						_botonId: "menos", 
						_tiempoTimeout: 100, 
						_tiempoIntervalo: 100, 
						_accionesAlClick: ()=>{onMasMenosBoton("menos")},  
						_accionesAlMantener: ()=>{onMasMenosBoton("menos")}
					});

					crearBotonClickOPresionContinuaMouse(
					{
						_botonId: "mas", 
						_tiempoTimeout: 100, 
						_tiempoIntervalo: 100, 
						_accionesAlClick: ()=>{onMasMenosBoton("mas")},  
						_accionesAlMantener: ()=>{onMasMenosBoton("mas")}
					});

					crearBotonClickOPresionContinuaMouse(
					{
						_botonId:"botonBarraConfigPDF1Deshacer", 
						_tiempoTimeout:250, 
						_tiempoIntervalo:100, 
						_accionesAlMantener: () => {
							OBJ_PIZARRA1.deshacerUltimaLineaGuardada();
							DIV_MENU_RAPIDO1.style.opacity=0.1;
						}, 
						_accionesAlClick: () => OBJ_PIZARRA1.deshacerUltimoGrupoDeLineasGuardadas(),
						_accionesAlFinalizar: () => DIV_MENU_RAPIDO1.style.opacity=0.7
					});

					crearBotonClickOPresionContinuaMouse(
					{
						_botonId:"botonBarraConfigPDF1Rehacer", 
						_tiempoTimeout:250, 
						_tiempoIntervalo:100, 
						_accionesAlMantener: ()=>{
							OBJ_PIZARRA1.rehacerUltimaLineaDeshecha();
							DIV_MENU_RAPIDO1.style.opacity=0.1;
						} , 
						_accionesAlClick: ()=>OBJ_PIZARRA1.rehacerUltimoGrupoDeLineasGuardadas(),
						_accionesAlFinalizar: () => DIV_MENU_RAPIDO1.style.opacity=0.7
					});

					crearBotonClickOPresionContinuaMouse(
					{
						_botonId:"botonBarraConfigPDF2Deshacer", 
						_tiempoTimeout:250, 
						_tiempoIntervalo:100, 
						_accionesAlMantener: ()=>{
							OBJ_PIZARRA2.deshacerUltimaLineaGuardada();
							DIV_MENU_RAPIDO2.style.opacity=0.1;
						}, 
						_accionesAlClick: ()=>OBJ_PIZARRA2.deshacerUltimoGrupoDeLineasGuardadas(),
						_accionesAlFinalizar: () => DIV_MENU_RAPIDO2.style.opacity=0.7
					});

					crearBotonClickOPresionContinuaMouse(
					{
						_botonId:"botonBarraConfigPDF2Rehacer", 
						_tiempoTimeout:250, 
						_tiempoIntervalo:100, 
						_accionesAlMantener: ()=>{
							OBJ_PIZARRA2.rehacerUltimaLineaDeshecha();
							DIV_MENU_RAPIDO2.style.opacity=0.1;
						} , 
						_accionesAlClick: ()=>{OBJ_PIZARRA2.rehacerUltimoGrupoDeLineasGuardadas()},
						_accionesAlFinalizar: () => DIV_MENU_RAPIDO2.style.opacity=0.7
					});

					crearListenerPrecerrado();

					window.addEventListener('beforeunload', (e) =>
					{
						if(!testGuardado && !preguntadoSiSalir)
						{
							e.preventDefault();
							e.returnValue = 'No has guardado tu resultado, ¿seguro que quieres salir?';
						}
					});
				}
				cambiarIdioma(langActual);
			}

			function compruebaAlternativas()
			{
				const ALTER=document.getElementById("nAlternativas");
				if(parseInt(ALTER.value)>ALTER.max)
				{
					ALTER.value=27;
				}
				else if(parseInt(ALTER.value)<ALTER.min)
				{
					ALTER.value=2;
				}
			}

			function validarCaracterRestanIncorrectas(event)
			{
				const REGEX2 = /^[0-9,.]+$/;
			
				if (!REGEX2.test(event.target.value))
				{
					event.target.value = event.target.value.slice(0, -1);
				}
			}

			function validarCaracterRangoPreguntas(event)
			{
				const REGEX2 = /^[0-9,-]+$/;

				if (!REGEX2.test(event.target.value))
				{
					event.target.value = event.target.value.slice(0, -1);
				}
			}

			function comprobarStringPreguntasAEvaluar(_str)
			{
				let rsp=false;
				// Expresión regular para validar el formato del string
				const REGEX = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/;
	
				// Comprobar si el string cumple con el formato
				if(REGEX.test(_str) || _str.trim() === "")
				{
					rsp=true;
				}
				return rsp;
			}

			function comprobarStringRestaPorCadaFallada(_str) {
				let rsp=false;
				// Expresión regular para validar el formato del string
				const REGEX = /^-?\d+(?:[.,]\d+)?$/;
				// Comprobar si el string cumple con el formato
				if(REGEX.test(_str) || _str.trim() === "")
				{
					rsp=true;
				}
				return rsp;
			}

			function comprobarDatosAEvaluar(_elementoRango, _elementoResta)
			{
				//al darle a continuar
				let rsp=false;
				if(!comprobarStringPreguntasAEvaluar(_elementoRango.value))
				{
					_elementoRango.style.outline="2px solid red";
					//poner en outline rojo el campo incorrecto
				}
				else if(!comprobarStringRestaPorCadaFallada(_elementoResta.value))
				{
					_elementoRango.style.outline="none";
					_elementoResta.style.outline="2px solid red";
					//poner en outline rojo el campo incorrecto
				}
				else
				{
					_elementoRango.style.outline="none";
					_elementoResta.style.outline="none";
					//quitar outlines rojos de los campos anteriores
					rsp=true;
				}

				return rsp;
			}

			function traducirStringPregAEvaluarAArray(_str)
			{
				// Dividir el string en partes separadas por comas
				const PARTES = _str.split(',');
			
				// Crear un array para almacenar los números de página
				const PREG_A_EVALUAR = [];
			
				// Procesar cada parte del string
				for (let i = 0; i < PARTES.length; i++)
				{
					const PARTE = PARTES[i];
			
					// Comprobar si la parte contiene un guión
					if (PARTE.indexOf('-') !== -1)
					{
						// La parte contiene un guión, por lo que representa un rango de páginas
						// Dividir la parte en dos partes separadas por el guión
						const RANGO = PARTE.split('-');
			
						// Convertir las partes en números
						const INICIO = parseInt(RANGO[0]);
						const FIN = parseInt(RANGO[1]);
			
						// Agregar todos los números del rango al array de páginas
						for (let j = INICIO; j <= FIN; j++)
						{
							PREG_A_EVALUAR.push(j);
						}
					}
					else
					{
						// La parte no contiene un guión, por lo que representa un único número de página
						// Convertir la parte en un número y agregarlo al array de páginas
						PREG_A_EVALUAR.push(parseInt(PARTE));
					}
				}
			
				// Devolver el array de páginas
				return PREG_A_EVALUAR;
			}

			function evaluar(_trsFilasPreguntas)
			{
				let rsp="";

				const RESULTADO_PREGUNTAS=[""];//Ojo, la posición 1 es la pregunta 1//correcta, incorrecta, noContestada, anulada
				const RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO=[""];//Ojo, la posición 1 es la pregunta 1//correcta, incorrecta, noContestada, anulada
				const PREGUNTAS_NO_CORREGIDAS=[];
				let preguntaNoCorregida=false;

				const CANTIDAD_DE_ALTERNATIVAS_POR_CADA_PREGUNTA=[""];//La posición 1 equivale al número de alternativas de rsp de la pregunta 1
				const NO_CONTESTADAS_INCORRECTAS=document.getElementById("noContestadasIncorrectas");

				for(let trFilaPregunta of _trsFilasPreguntas)
				{
					CANTIDAD_DE_ALTERNATIVAS_POR_CADA_PREGUNTA.push(trFilaPregunta.getElementsByClassName("respuesta").length);

					if(trFilaPregunta.querySelector(".preguntaAnulada")==null)
					{
						//Recopilando datos de dentro de tiempo
						const CANTIDAD_RSP_CONTESTADAS=trFilaPregunta.getElementsByClassName("relleno").length;
						const CANTIDAD_RSP_CORRECTAS_SIN_RELLENAR=trFilaPregunta.querySelectorAll(".respuestaCorrecta:not(.relleno)").length;
						//const CANTIDAD_RSP_CORRECTAS=trFilaPregunta.querySelectorAll(".relleno.respuestaCorrecta").length;
						const CANTIDAD_RSP_INCORRECTAS=trFilaPregunta.querySelectorAll(".relleno.respuestaIncorrecta").length;
						const CANTIDAD_MARCAS_CORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO=trFilaPregunta.querySelectorAll(".respuestaCorrecta").length;
						//const CANTIDAD_MARCAS_INCORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO=trFilaPregunta.querySelectorAll(".respuestaIncorrecta").length;
						const CANTIDAD_RSP_INCORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO=trFilaPregunta.querySelectorAll(".rellenoTrasTiempo.respuestaIncorrecta , .relleno.respuestaIncorrecta").length;
						const NUMERO_VISIBLE_PREGUNTA=parseInt(trFilaPregunta.dataset.filapregvisible);
						preguntaNoCorregida=false;

						if(CANTIDAD_RSP_CONTESTADAS>0)
						{
							if(CANTIDAD_MARCAS_CORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO==0 && CANTIDAD_RSP_INCORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO==0)
							{
								//Si no se corrige, cuenta como no contestada
								RESULTADO_PREGUNTAS.push("noContestada");
								preguntaNoCorregida=true;
							}
							else
							{
								//si hay alguna .relleno sin .respuestaCorrecta o alguna .respuestaIncorrecta: Es incorrecta
								if(CANTIDAD_RSP_CORRECTAS_SIN_RELLENAR==0 && CANTIDAD_RSP_INCORRECTAS==0)
								{
									RESULTADO_PREGUNTAS.push("correcta");
								}
								else
								{
									RESULTADO_PREGUNTAS.push("incorrecta");
								}
							}
						}
						else
						{
							if(NO_CONTESTADAS_INCORRECTAS.checked)
							{
								RESULTADO_PREGUNTAS.push("incorrecta");
							}
							else
							{
								RESULTADO_PREGUNTAS.push("noContestada");
							}
						}

						//Recopilando datos de fuera y dentro de tiempo
						const CANTIDAD_RSP_CONTESTADAS_FUERA_Y_DENTRO_DE_TIEMPO=trFilaPregunta.querySelectorAll(".rellenoTrasTiempo , .relleno").length;
						const CANTIDAD_RSP_CORRECTAS_SIN_RELLENAR_FUERA_Y_DENTRO_DE_TIEMPO=trFilaPregunta.querySelectorAll(".respuestaCorrecta:not(.relleno):not(.rellenoTrasTiempo)").length;
						//const CANTIDAD_RSP_CORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO=trFilaPregunta.querySelectorAll(".rellenoTrasTiempo.respuestaCorrecta , .relleno.respuestaCorrecta").length;

						if(CANTIDAD_RSP_CONTESTADAS_FUERA_Y_DENTRO_DE_TIEMPO>0)
						{
							if(CANTIDAD_MARCAS_CORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO==0 && CANTIDAD_RSP_INCORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO==0)
							{
								//Si no se corrige, cuenta como no contestada
								RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO.push("noContestada");
								preguntaNoCorregida=true;
							}
							else
							{
								if(CANTIDAD_RSP_CORRECTAS_SIN_RELLENAR_FUERA_Y_DENTRO_DE_TIEMPO==0 && CANTIDAD_RSP_INCORRECTAS_FUERA_Y_DENTRO_DE_TIEMPO==0)
								{
									RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO.push("correcta");
								}
								else
								{
									RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO.push("incorrecta");
								}
							}
						}
						else
						{
							if(NO_CONTESTADAS_INCORRECTAS.checked)
							{
								RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO.push("incorrecta");
							}
							else
							{
								RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO.push("noContestada");
							}
						}

						if(preguntaNoCorregida)
						{
							PREGUNTAS_NO_CORREGIDAS.push(NUMERO_VISIBLE_PREGUNTA);
						}
					}
					else
					{
						RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO.push("anulada");
						RESULTADO_PREGUNTAS.push("anulada");
					}
				}

				let notaMedia=0,
					notaMediaIncluyendoFueraDeTiempo=0;

				//Recogemos input text y select de la ventana de evaluación para elegir las cuentas correctas en el switch case
					const CONTENIDO_INPUT_TEXT_RELLENADO=document.getElementById("restanLasIncorrectas").value;

					const SELECT_MODO_INCORRECTAS_EVALUACION=FASE2TEST.querySelector(".modoIncorrectasEvaluacion");
					const SELECTED_OPTION_MODO_INCORRECTAS_EVALUACION = SELECT_MODO_INCORRECTAS_EVALUACION.options[SELECT_MODO_INCORRECTAS_EVALUACION.selectedIndex];
					const NAME_OPTION_MODO_INCORRECTAS_EVALUACION = SELECTED_OPTION_MODO_INCORRECTAS_EVALUACION.getAttribute('name');

				switch (NAME_OPTION_MODO_INCORRECTAS_EVALUACION)
				{
					case "1":
					{
						const RESTA_CADA_INCORRECTA=parseFloat(CONTENIDO_INPUT_TEXT_RELLENADO);
						notaMedia=							(contarOcurrencias("correcta", RESULTADO_PREGUNTAS)								-	(contarOcurrencias("incorrecta", RESULTADO_PREGUNTAS)						* RESTA_CADA_INCORRECTA)) / (contarOcurrencias(["correcta","incorrecta","noContestada"], RESULTADO_PREGUNTAS)/10);
						notaMediaIncluyendoFueraDeTiempo=	(contarOcurrencias("correcta", RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO)	-	(contarOcurrencias("incorrecta", RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO)	* RESTA_CADA_INCORRECTA)) / (contarOcurrencias(["correcta","incorrecta","noContestada"], RESULTADO_PREGUNTAS)/10);
					}
					break;
					case "2":
					{
						let RESTA_CADA_INCORRECTA;
						if(CONTENIDO_INPUT_TEXT_RELLENADO>0)
						{
							RESTA_CADA_INCORRECTA=1/parseFloat(CONTENIDO_INPUT_TEXT_RELLENADO);
						}
						else
						{
							RESTA_CADA_INCORRECTA=0;
						}
						notaMedia=							(contarOcurrencias("correcta", RESULTADO_PREGUNTAS)								-	(contarOcurrencias("incorrecta", RESULTADO_PREGUNTAS)						* RESTA_CADA_INCORRECTA)) / (contarOcurrencias(["correcta","incorrecta","noContestada"], RESULTADO_PREGUNTAS)/10);
						notaMediaIncluyendoFueraDeTiempo=	(contarOcurrencias("correcta", RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO)	-	(contarOcurrencias("incorrecta", RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO)	* RESTA_CADA_INCORRECTA)) / (contarOcurrencias(["correcta","incorrecta","noContestada"], RESULTADO_PREGUNTAS)/10);
					}
					break;
					case "3":
					{
						for(let i=1;i<RESULTADO_PREGUNTAS.length;i++)
						{
							let correcta=0,
								incorrecta=0;
							if(RESULTADO_PREGUNTAS[i]!="noContestada" && RESULTADO_PREGUNTAS[i]!="anulada")
							{
								if(RESULTADO_PREGUNTAS[i]=="correcta")
								{
									correcta=1;
								}
								else
								{
									incorrecta=1;
								}
								notaMedia+=(correcta - (incorrecta / (CANTIDAD_DE_ALTERNATIVAS_POR_CADA_PREGUNTA[i] - 1))) * (10 / contarOcurrencias(["correcta","incorrecta","noContestada"], RESULTADO_PREGUNTAS));
							}
						}

						for(let i=1;i<RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO.length;i++)
						{
							let correcta=0,
								incorrecta=0;
							if(RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO[i]!="noContestada" && RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO[i]!="anulada")
							{
								if(RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO[i]=="correcta")
								{
									correcta=1;
								}
								else
								{
									incorrecta=1;
								}
								notaMediaIncluyendoFueraDeTiempo+=(correcta - (incorrecta / (CANTIDAD_DE_ALTERNATIVAS_POR_CADA_PREGUNTA[i] - 1))) * (10 / contarOcurrencias(["correcta","incorrecta","noContestada"], RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO));
							}
						}
					}
					break;
				}

				rsp+=fechaActual();
				if(TITULO_TEST2.value!="")
				{
					rsp += `<div class="lineaEvaluacion">
								<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,tituloResumenGuardado" data-langmod="html" data-langactual="es">Título: </p>
								<p class="lineaEvaluacionApartado2">${TITULO_TEST2.value}</p>
							</div>`;
				}

				rsp += `<div class="lineaEvaluacion">
							<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,tiempoInicial" data-langmod="html" data-langactual="es">Tiempo inicial: </p>
							<p class="lineaEvaluacionApartado2">${OBJ_TEMPORIZADOR_TEST.getMinutosInicialesTemporizador(true)}:${OBJ_TEMPORIZADOR_TEST.getSegundosInicialesTemporizador(true)}</p>
						</div>`;

				if(OBJ_TEMPORIZADOR_TEST.getMinutosRestantesTemporizador()>0 || OBJ_TEMPORIZADOR_TEST.getSegundosRestantesTemporizador()>0)
				{
					rsp += `<div class="lineaEvaluacion">
								<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,sobradoTiempo" data-langmod="html" data-langactual="es">¡¡¡¡Te ha sobrado tiempo: </p>
								<p class="lineaEvaluacionApartado2">${OBJ_TEMPORIZADOR_TEST.getMinutosRestantesTemporizador(true)}:${OBJ_TEMPORIZADOR_TEST.getSegundosRestantesTemporizador(true)}!!!!</p>
							</div>`;
				}


				if(PREGUNTAS_NO_CORREGIDAS.length>0)
				{
					rsp += `<div class="lineaEvaluacion">
								<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,noCorregidas" data-langmod="html" data-langactual="es">Preguntas específicas contestadas no corregidas: </p>
								<p class="lineaEvaluacionApartado2">`;
									for(let numPregunta of PREGUNTAS_NO_CORREGIDAS)
									{
										rsp +=numPregunta+", ";
									}
					rsp +=		`</p>
							</div>
						`;
				}
				rsp += `
				<div class="lineaEvaluacion">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,notaEnTiempo" data-langmod="html" data-langactual="es">Tu nota dentro de tiempo: </p>
					<p class="lineaEvaluacionApartado2">${notaMedia.toFixed(2)}</p>
				</div>
				<div class="lineaEvaluacion aciertos">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,aciertos" data-langmod="html" data-langactual="es">Aciertos: </p>
					<p class="lineaEvaluacionApartado2">${contarOcurrencias('correcta',RESULTADO_PREGUNTAS)}</p>
				</div>
				<div class="lineaEvaluacion errores">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,errores" data-langmod="html" data-langactual="es">Errores: </p>
					<p class="lineaEvaluacionApartado2">${contarOcurrencias('incorrecta',RESULTADO_PREGUNTAS)}</p>
				</div>
				<div class="lineaEvaluacion">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,noContestadasEnTiempo" data-langmod="html" data-langactual="es">No contestadas dentro de tiempo: </p>
					<p class="lineaEvaluacionApartado2">${contarOcurrencias('noContestada',RESULTADO_PREGUNTAS)}</p>
				</div>
				<div class="lineaEvaluacion">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,anuladas" data-langmod="html" data-langactual="es">Anuladas: </p>
					<p class="lineaEvaluacionApartado2">${contarOcurrencias('anulada',RESULTADO_PREGUNTAS)}</p>
				</div>
				<div class="lineaEvaluacion">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,notaEnTiempoYFueraDeTiempo" data-langmod="html" data-langactual="es">Tu nota incluyendo respuestas fuera de tiempo: </p>
					<p class="lineaEvaluacionApartado2">${(notaMediaIncluyendoFueraDeTiempo).toFixed(2)}</p>
				</div>
				<div class="lineaEvaluacion aciertos">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,aciertosFueraDeTiempo" data-langmod="html" data-langactual="es">Aciertos dentro+fuera de tiempo: </p>
					<p class="lineaEvaluacionApartado2">${contarOcurrencias('correcta',RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO)}</p>
				</div>
				<div class="lineaEvaluacion errores">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,erroresFueraDeTiempo" data-langmod="html" data-langactual="es">Errores dentro+fuera de tiempo: </p>
					<p class="lineaEvaluacionApartado2">${contarOcurrencias('incorrecta',RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO)}</p>
				</div>
				<div class="lineaEvaluacion">
					<p class="lineaEvaluacionApartado1" data-langlocation="evaluacion,noContestadasEnTiempoYFueraDeTiempo" data-langmod="html" data-langactual="es">No contestadas dentro+fuera de tiempo: </p>
					<p class="lineaEvaluacionApartado2">${contarOcurrencias('noContestada',RESULTADO_PREGUNTAS_DENTRO_Y_FUERA_DE_TIEMPO)}</p>
				</div>`;

				if (FASE2TEST.querySelectorAll(".relleno:not(.respuestaCorrecta):not(.respuestaIncorrecta)").length> 0)
				{
					rsp += `<div class="lineaEvaluacion">
								<p data-langlocation="evaluacion,noCorregidasDentroDeTiempo" data-langmod="html" data-langactual="es">¡¡Faltan preguntas por corregir contestadas DENTRO de tiempo!!</p>
							</div>`;
				}
				
				if (FASE2TEST.querySelectorAll(".rellenoTrasTiempo:not(.respuestaCorrecta):not(.respuestaIncorrecta)").length> 0)
				{
					rsp += `<div class="lineaEvaluacion">
								<p data-langlocation="evaluacion,noCorregidasFueraDeTiempo" data-langmod="html" data-langactual="es">¡¡Faltan preguntas por corregir contestadas FUERA de tiempo!!</p>
							</div>`;
				}

				return rsp;
			}

			function contarOcurrencias(cadenaOArreglo, arreglo)
			{
				let contador = 0;
				if (Array.isArray(cadenaOArreglo))
				{
					for (let cadena of cadenaOArreglo)
					{
						for (let elemento of arreglo)
						{
							if (elemento === cadena)
							{
								contador++;
							}
						}
					}
				}
				else
				{
					for (let elemento of arreglo)
					{
						if (elemento === cadenaOArreglo)
						{
							contador++;
						}
					}
				}
				return contador;
			}

			function guardarResumenTest(_trsFilasPreguntas, _accionesAlGuardarBien=()=>{}, _accionesAlGuardarMal=()=>{})
			{
				let rootCSS = getComputedStyle(document.querySelector(':root'));
				let colorRelleno = rootCSS.getPropertyValue('--color-relleno');
				let colorSinRellenar = rootCSS.getPropertyValue('--color-sinRellenar');
				let colorRellenoTrasTiempo = rootCSS.getPropertyValue('--color-rellenoTrasTiempo');
				let colorPreguntaSinMarcar = rootCSS.getPropertyValue('--color-preguntaSinMarcar');
				let colorPreguntaDudosa = rootCSS.getPropertyValue('--color-preguntaDudosa');
				let colorPreguntaMalFormulada = rootCSS.getPropertyValue('--color-preguntaMalFormulada');
				let colorPreguntaAnulada = rootCSS.getPropertyValue('--color-preguntaAnulada');

				let resumenTest=`<!DOCTYPE html>
									<head>
										<meta charset="utf-8">
									</head>
									<body>
										<style type="text/css">
											html
											{
												color: rgb(255,255,255);
												background-color: rgb(0,0,0);
											}
											body
											{
												text-align: center;
												justify-content: center;
												display: flex;
												padding: 0;
												box-sizing: border-box;
												margin: 0;
											}
											#contenedor
											{
												display: flex;
												flex-direction: column;
												justify-content: center;
											}

											table
											{
												border-collapse: collapse;
												border-spacing: 2px;
												width: 100%;
												table-layout: fixed;
											}

											td
											{
												text-align:center;
												box-shadow: inset 0 -1px 0px 0px rgba(0, 0, 0, 1), inset 0 1px 0px 0px rgba(0, 0, 0, 1);
											}
											.pregunta
											{
												min-width: 25px;
												text-shadow: -1px 0 rgb(0, 0, 0), 0 1px rgb(0, 0, 0), 1px 0 rgb(0, 0, 0), 0 -1px rgb(0, 0, 0);
												color: rgb(0,0,0);
											}
											.preguntaSinMarcar
											{
												background-color: ${colorPreguntaSinMarcar};
											}
											.preguntaDudosa
											{
												background-color: ${colorPreguntaDudosa};
											}
											.preguntaMalFormulada
											{
												background-color: ${colorPreguntaMalFormulada};
											}
											.preguntaAnulada
											{
												background-color: ${colorPreguntaAnulada};
											}
											.relleno.respuesta
											{
												background-color: ${colorRelleno};
												color: rgb(255, 255, 255);
												text-shadow: -1px 0 rgb(0, 0, 0), 0 1px rgb(0, 0, 0), 1px 0 rgb(0, 0, 0), 0 -1px rgb(0, 0, 0);
											}

											.rellenoTrasTiempo
											{
												background-color: ${colorRellenoTrasTiempo};
												color: rgb(255, 255, 255);
											}

											.respuestaCorrecta
											{
												background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-size="80">✔️</text></svg>');
												background-repeat: no-repeat;
												background-position: center;
												color: rgb(0, 128, 0)!important;
												text-shadow: -1px 0 rgb(0, 0, 0), 0 1px rgb(0, 0, 0), 1px 0 rgb(0, 0, 0), 0 -1px rgb(0, 0, 0);
											}
											.respuestaIncorrecta
											{
												background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-size="80">❌</text></svg>');
												background-repeat: no-repeat;
												background-position: center;
												color: rgb(255, 0, 0)!important;
												text-shadow: -1px 0 rgb(0, 0, 0), 0 1px rgb(0, 0, 0), 1px 0 rgb(0, 0, 0), 0 -1px rgb(0, 0, 0);
											}
											.respuestaSinCorregir
											{}

											.sinRellenar
											{
												background-color: ${colorSinRellenar};
											}
											.sinRellenar
											{
												background-color: rgb(128, 128, 128);
											}
											.sinRellenar.respuestaSinCorregir
											{
												color: rgb(0, 0, 0);
											}
											.filaPreg
											{
												zoom:1.5;
											}
											.apuntePreguntaP
											{
												margin:0;
												display: flex;
												word-wrap: break-word;
											}
											#apunteGeneralP .apuntePreguntaP
											{
												background-color: rgba(34, 56, 250, 0.5);
											}

											#respuestasResumenGuardado
											{
												overflow: auto;
												height: 100%;
												outline: 1px solid rgb(23 20 44);
												min-width: 50%;
												max-width: 100%;
											}

											.lineaEvaluacion
											{
												display: flex;
												gap: 10px;
												text-shadow: -1px 0 rgb(0, 0, 0), 0 1px rgb(0, 0, 0), 1px 0 rgb(0, 0, 0), 0 -1px rgb(0, 0, 0);
												justify-content: space-between;
												width: 100%;
											}
									
											.lineaEvaluacionApartado1, .lineaEvaluacionApartado2
											{
												margin: 5px;
												display: flex;
												align-items: center;
											}

											.aciertos
											{
												color: rgb(0, 128, 0);
												
											}
									
											.errores
											{
												color: rgb(255, 0, 0);
											}

											#contenedorResumenGuardado
											{
												box-sizing: border-box;
												display: grid;
												grid-template-rows: min-content 1fr;
												width: 100%;
												justify-items: center;
												height: 100%;
												font-size: 20px;
												padding: 10px;
											}

											#evaluacionResumenGuardado
											{
												height: 100%;
												min-width: 50%;
												overflow: auto;
											}

											.botonMasMenosRsp, .trAnadirQuitarPreguntas, #barraCambioTamanoApunteGeneralTextarea, #apunteGeneralTextarea, .botonMostrarOcultarApunte, #barraCambioTamanoApunteGeneralTextareaResumenGuardado,
											#apunteGeneralTextareaResumenGuardado
											{
												display: none!important;
											}

											#apunteGeneralPResumenGuardado
											{
												display: block;
												overflow-wrap: break-word;
												hyphens: auto;
											}

											.leyendaColores {
												display: grid;
												grid-template-columns: repeat(auto-fit, minmax(min(100%, 100px), 1fr));
											}

											.leyendaColores > div {
												outline: 1px solid #fff;
											}

											@media (max-height: 600px)
											{
												#respuestasResumenGuardado
												{
													overflow: initial;
												}
											}

										</style>
				
										<div id="contenedor">
											<div id="evaluacion">
												${evaluar(_trsFilasPreguntas)}
											</div>
											<div id="respuestas">
												<div class="leyendaColores" id="leyendaColores">
													<div>
														<div data-langlocation="leyendaResumenGuardado,pregSinMarcar" data-langmod="html" data-langactual="es">Pregunta sin marcar: </div>
														<span style="color:${colorPreguntaSinMarcar};">&#x25A0;</span>
													</div>
													<div>
														<div data-langlocation="leyendaResumenGuardado,pregDudosa" data-langmod="html" data-langactual="es">Pregunta Dudosa: </div>
														<span style="color:${colorPreguntaDudosa};">&#x25A0;</span>
													</div>
													<div>
														<div data-langlocation="leyendaResumenGuardado,pregMalformulada" data-langmod="html" data-langactual="es">Pregunta mal formulada: </div>
														<span style="color:${colorPreguntaMalFormulada};">&#x25A0;</span>
													</div>
													<div>
														<div data-langlocation="leyendaResumenGuardado,pregAnulada" data-langmod="html" data-langactual="es">Pregunta anulada: </div>
														<span style="color:${colorPreguntaAnulada};">&#x25A0;</span>
													</div>
													<div>
														<div data-langlocation="leyendaResumenGuardado,rspRellena" data-langmod="html" data-langactual="es">Respuesta rellena: </div>
														<span style="color:${colorRelleno};">&#x25A0;</span>
													</div>
													<div>
														<div data-langlocation="leyendaResumenGuardado,rspSinRellenar" data-langmod="html" data-langactual="es">Respuesta sin rellenar: </div>
														<span style="color:${colorSinRellenar};">&#x25A0;</span>
													</div>
													<div>
														<div data-langlocation="leyendaResumenGuardado,rspRellenaFueraTiempo" data-langmod="html" data-langactual="es">Respuesta rellenada fuera de tiempo: </div>
														<span style="color:${colorRellenoTrasTiempo};">&#x25A0;</span>
													</div>
												</div>
				`;

				let	cantidadPreguntasTotal=0;
				const APUNTE_GENERAL_P=document.getElementById("apunteGeneralP");

				setToggleValoresCSS(FASE2TEST.getElementsByClassName("filaPreg"), "display", "none");

				//ponemos visibles .respuesta y .tdApunte concretos
				for(let trFilaPregunta of _trsFilasPreguntas)
				{
					cantidadPreguntasTotal++;
					trFilaPregunta.querySelector(".apuntePreguntaInputText").style.display="none";
					trFilaPregunta.querySelector(".apuntePreguntaP").style.display="block";
					trFilaPregunta.style.display = "table-row";

					setToggleValoresCSS(trFilaPregunta.getElementsByClassName("respuesta") ,"display","table-cell");
					(trFilaPregunta.querySelector(".tdApunte")).style.display="table-cell";
				}

				APUNTE_GENERAL_P.style.display="block";

				resumenTest+= document.getElementById('contenedorTest').innerHTML;
				resumenTest+='</div></div></body></html>';

				setToggleValoresCSS(FASE2TEST.getElementsByClassName("filaPreg"), "display", "table-row");

				//Volvemos a dejar cómo estaban las .tdApunte y .respuesta
				for(let trFilaPregunta of _trsFilasPreguntas)
				{ 
					trFilaPregunta.querySelector(".apuntePreguntaInputText").style.display="block";
					trFilaPregunta.querySelector(".apuntePreguntaP").style.display="none";

					const TD_APUNTE=trFilaPregunta.querySelector(".tdApunte");
					if(TD_APUNTE.getAttribute("name")=="visible")
					{
						TD_APUNTE.style.display="table-cell";
						setToggleValoresCSS(trFilaPregunta.querySelectorAll(".respuesta"),"display","none");
					}
					else
					{
						TD_APUNTE.style.display="none";
						setToggleValoresCSS(trFilaPregunta.querySelectorAll(".respuesta"),"display","table-cell");
					}
				}

				APUNTE_GENERAL_P.style.display="none";

				let tituloArchivo="resultadoTest";
				if(TITULO_TEST2.value!="")
				{
					tituloArchivo=TITULO_TEST2.value;
				}

				// Insertamos el resumen para traducirlo y recogerlo de nuevo
				const DIV = document.createElement('div');
				resumenTest = resumenTest.replace(/id="([^"]+)"/g, 'id="$1ResumenGuardado"');
				DIV.innerHTML = resumenTest;
				document.body.appendChild(DIV);
				cambiarIdioma(langActual);
				resumenTest=DIV.innerHTML;
				document.body.removeChild(DIV);


				// Llamar a la función para descargar el archivo
				if (isAppAndroid)
				{
					descargarArchivoAndroid(resumenTest, tituloArchivo, _accionesAlGuardarBien, _accionesAlGuardarMal);
				}
				else
				{
					descargarArchivoWeb(resumenTest, tituloArchivo);
				}
			}

			function descargarArchivoAndroid(resumenTest, tituloArchivo, _accionesAlGuardarBien=()=>{}, _accionesAlGuardarMal=()=>{})
			{
				// Verificar si tenemos el permiso WRITE_EXTERNAL_STORAGE
				const permissions = cordova.plugins.permissions;
				permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, function (status)
				{
					if (status.hasPermission)
					{
						// Tenemos el permiso, podemos guardar el archivo
						guardarArchivo(resumenTest, tituloArchivo);
					}
					else
					{
						// No tenemos el permiso, debemos solicitarlo
						permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, function (status)
						{
							if (status.hasPermission)
							{
								// El usuario concedió el permiso, podemos guardar el archivo
								guardarArchivo(resumenTest, tituloArchivo);
								_accionesAlGuardarBien();
							}
							else
							{
								// El usuario no concedió el permiso
								console.log('Permiso WRITE_EXTERNAL_STORAGE denegado');
								_accionesAlGuardarMal();
							}
						}, onError);
					}
				}, onError);

					function guardarArchivo(resumenTest, tituloArchivo) {
						// Generar el contenido del archivo
						const contenidoArchivo = resumenTest;

						// Obtener el directorio de descargas externas
						let directorioDescargas;
						if (device.platform === "Android" && parseInt(device.version) >= 11)
						{
							directorioDescargas = cordova.file.externalRootDirectory + "Download/";
						}
						else
						{
							directorioDescargas = cordova.file.externalRootDirectory;
						}

						// Crear el archivo en el directorio de descargas
						window.resolveLocalFileSystemURL(directorioDescargas, function (dirEntry) {
							dirEntry.getFile(
								tituloArchivo + ".html",
								{ create: true, exclusive: false },
								function (fileEntry)
								{
									fileEntry.createWriter(function (fileWriter)
									{
										fileWriter.onwriteend = () => console.log("Descarga exitosa",'Archivo descargado en: ' + fileEntry.toURL());

										fileWriter.onerror = (e) => OBJ_TOOL_ALERT.mostrarAlert("Descargar fallida",'Error en la descarga: ' + e.toString());

										// Escribir el contenido en el archivo
										const blob = new Blob([contenidoArchivo], { type: 'text/plain;charset=utf-8' });
										fileWriter.write(blob);
									}, onError);
								},
								onError
							);
						}, onError);
					}

				function onError(error)
				{
					OBJ_TOOL_ALERT.mostrarAlert("Error",'Error al acceder al sistema de archivos: ' + error.toString());
				}

				testGuardado = true;
			}

			function descargarArchivoWeb(resumenTest, tituloArchivo)
			{
				// Estamos en un navegador web
				// Utilizar el enfoque para navegadores web utilizando la API File y enlace de descarga
		
				// Crear el archivo con la API File
				const FILE = new File([resumenTest], tituloArchivo + ".html", { type: "text/plain;charset=utf-8" });
		
				// Obtener una URL para el archivo que se acaba de crear
				const URL = window.URL.createObjectURL(FILE);
		
				// Crear un enlace y agregarlo al documento
				const A = document.createElement("a");
				document.body.appendChild(A);
				A.style = "display: none";
		
				// Actualizar los parámetros del enlace para descargar el archivo creado
				A.href = URL;
				A.download = FILE.name;
				A.click();
		
				// Revocar la URL para liberar recursos
				window.URL.revokeObjectURL(URL);
		
				// Eliminar el enlace del documento
				A.remove();
				testGuardado = true;
				return true;
			}

//================================
//	Para cambiar estilos
//================================
			function mostrarOcultarBotonesBarraConfigContenedorPDFs()
			{
				if(getValorCSS2(CONTENEDOR_PDF1, "display")!="none" && getValorCSS2(CONTENEDOR_PDF2, "display")!="none")
				{
					BOTON_BARRA_HORIZONTAL_CONFIG_PDF1_CAMBIAR_ORIENTACION.style.visibility="visible";
				}
				else
				{
					BOTON_BARRA_HORIZONTAL_CONFIG_PDF1_CAMBIAR_ORIENTACION.style.visibility="hidden";
				}

				if(getValorCSS2(CONTENEDOR_PDF1, "display")!="none" || getValorCSS2(CONTENEDOR_PDF2, "display")!="none")
				{
					if(FASE2TEST.getElementsByClassName("contenidoPaginasContenedorPDF1EnImagenes").length>0 || FASE2TEST.getElementsByClassName("contenidoPaginasContenedorPDF2EnImagenes").length>0)
					{
						BOTON_CONFIG_PDFS_ACTIVAR_DESACTIVAR_MODO_NOCHE.style.visibility="visible";
					}
				}
				else
				{
					BOTON_CONFIG_PDFS_ACTIVAR_DESACTIVAR_MODO_NOCHE.style.visibility="hidden";
				}
			}

			function redimensionarSegunOrientacionVertical()
			{
				const CONTENEDOR_PDFS_CSS = window.getComputedStyle(CONTENEDOR_PDFS);
			
				if (window.innerHeight > window.innerWidth && CONTENEDOR_PDFS_CSS.getPropertyValue("display") != "none")
				{
					CONTENEDOR_PDFS_Y_TEST.style.flexDirection = "column";
					CONTENEDOR_PDFS.style.width = "100%";
					CONTENEDOR_PDFS.style.height = "70%";
					CONTENEDOR_TEST_Y_MODAL.style.width = "100%";
					CONTENEDOR_TEST_Y_MODAL.style.height = "30%";
			
					mostrarLaBarraDimensionadoraAdecuada();
					LINEA_DIVISORIA_MOVIL_VERTICAL_CONTENEDOR_PDFS_Y_CONTENEDOR_TEST_Y_MODAL.style.display = "none";
				}
				else
				{
					CONTENEDOR_PDFS_Y_TEST.style.flexDirection = "row";
					CONTENEDOR_PDFS.style.height = "100%";
					CONTENEDOR_TEST_Y_MODAL.style.height = "100%";
			
					if (CONTENEDOR_PDFS.style.display != "none")
					{
						CONTENEDOR_PDFS.style.width = "75%";
						CONTENEDOR_TEST_Y_MODAL.style.width = "25%";
					}
					else
					{
						CONTENEDOR_PDFS.style.width = "0%";
						CONTENEDOR_TEST_Y_MODAL.style.width = "100%";
					}
			
					mostrarLaBarraDimensionadoraAdecuada();
				}
			}

			function alternarRellenoRsp(_id)
			{
				const ELEMENTO=(document.getElementById(_id));

				if(modoDeseleccionar)
				{
					ELEMENTO.className= "";
					ELEMENTO.classList.add('respuesta');
					ELEMENTO.classList.add('sinRellenar');
					ELEMENTO.classList.add('respuestaSinCorregir');
				}
				else if(modoCorregir)
				{
					setToggleClass(ELEMENTO, ['respuestaCorrecta','respuestaIncorrecta', 'respuestaSinCorregir']);
				}
				else if(modoRellenarFueraDeTiempo)
				{
					if(ELEMENTO.classList.contains('sinRellenar'))
					{
						ELEMENTO.classList.remove('sinRellenar');
						ELEMENTO.classList.add('rellenoTrasTiempo');
					}
					else if(!ELEMENTO.classList.contains('relleno'))
					{
						ELEMENTO.classList.remove('rellenoTrasTiempo');
						ELEMENTO.classList.remove('respuestaIncorrecta');
						ELEMENTO.classList.add('sinRellenar');
					}
				}
				else if(ELEMENTO.classList.contains('sinRellenar'))
				{
					ELEMENTO.classList.remove('sinRellenar');
					ELEMENTO.classList.add('relleno');
				}
				else
				{
					ELEMENTO.classList.remove('relleno');
					ELEMENTO.classList.remove('rellenoTrasTiempo');
					ELEMENTO.classList.remove('respuestaIncorrecta');
					ELEMENTO.classList.add('sinRellenar');
				}
			}

			function iniciarPreparativosPDFEnTest()
			{
				CONTENEDOR_PDFS.style.height = "100%";
				CONTENEDOR_PDFS.style.width = "90%";
				CONTENEDOR_PDFS.style.display = "none";
			
				CONTENEDOR_PDF1.style.display = "none";
				CONTENEDOR_PDF1.style.height = "100%";
				CONTENEDOR_PDF1.style.width = "100%";
			
				CONTENEDOR_PDF2.style.display = "none";
				CONTENEDOR_PDF2.style.height = "100%";
				CONTENEDOR_PDF2.style.width = "100%";

				if (FASE2TEST.getElementsByClassName("paginaContenedorPDF1EnImagenes").length > 0)
				{
					CONTENEDOR_PDFS.style.display='flex';
					CONTENEDOR_PDF1.style.display='block';
					adaptarContenedoresPDF();
				}

				if (FASE2TEST.getElementsByClassName("paginaContenedorPDF2EnImagenes").length > 0)
				{
					CONTENEDOR_PDFS.style.display='flex';
					CONTENEDOR_PDF2.style.display='block';
					adaptarContenedoresPDF();
				}
			}

			function mostrarLaBarraDimensionadoraAdecuada()
			{
				if (getValorCSS2(CONTENEDOR_PDF1, "display") != "none" && getValorCSS2(CONTENEDOR_PDF2, "display") != "none")
				{
					if (getValorCSS2(CONTENEDOR_PDFS, "flex-direction") == "row")
					{
						LINEA_DIVISORIA_MOVIL_VERTICAL.style.display = "flex";
						LINEA_DIVISORIA_MOVIL_HORIZONTAL.style.display = "none";
					}
					else
					{
						LINEA_DIVISORIA_MOVIL_HORIZONTAL.style.display = "flex";
						LINEA_DIVISORIA_MOVIL_VERTICAL.style.display = "none";
					}
				}
				else
				{
					LINEA_DIVISORIA_MOVIL_VERTICAL.style.display = "none";
					LINEA_DIVISORIA_MOVIL_HORIZONTAL.style.display = "none";
				}
			
				if(window.innerHeight > window.innerWidth || getValorCSS2(CONTENEDOR_PDFS, "display") == "none")
				{
					LINEA_DIVISORIA_MOVIL_VERTICAL_CONTENEDOR_PDFS_Y_CONTENEDOR_TEST_Y_MODAL.style.display = "none";
				}
				else
				{
					LINEA_DIVISORIA_MOVIL_VERTICAL_CONTENEDOR_PDFS_Y_CONTENEDOR_TEST_Y_MODAL.style.display = "flex";
				}
			
				if (window.innerHeight > window.innerWidth && getValorCSS2(CONTENEDOR_PDFS, "display") != "none")
				{
					LINEA_DIVISORIA_MOVIL_HORIZONTAL_CONTENEDOR_PDFS_Y_CONTENEDOR_TEST_Y_MODAL.style.display = "flex";
				}
				else
				{
					LINEA_DIVISORIA_MOVIL_HORIZONTAL_CONTENEDOR_PDFS_Y_CONTENEDOR_TEST_Y_MODAL.style.display = "none";
				}
			}

			function cambiarDisposicionPDFs()
			{
				if(getValorCSS2(CONTENEDOR_PDFS,"flex-direction")=="column")
				{
					CONTENEDOR_PDFS.style.flexDirection="row";
				}
				else //flexDirection=="row")
				{
					CONTENEDOR_PDFS.style.flexDirection="column";
				}

				centrarScrollHorizontal(CONTENEDOR_PDF1_Y_PIZARRA);
				centrarScrollHorizontal(CONTENEDOR_PDF2_Y_PIZARRA);
			}

			//Hacer que al cambiar una dimension el otro pdf se adapte
			function cambiarDimensionDivPorId(_idDiv, _alturaAnchura, _masMenos)
			{
				if(_idDiv=="contenedorPDFs")
				{
					if(_alturaAnchura=="anchura" && getValorCSS2(CONTENEDOR_PDFS_Y_TEST,"flex-direction")=="row")
					{
						if(_masMenos === "mas")
						{
							const NEW_WIDTH = Math.min(parseInt(getValorCSS2(CONTENEDOR_PDFS, "width", "width")) + 5, maxAltoYAnchoContenedoresPDF);
							CONTENEDOR_PDFS.style.width = NEW_WIDTH + "%";
							CONTENEDOR_TEST_Y_MODAL.style.width = (100 - NEW_WIDTH) + "%";
						}
						else
						{
							const NEW_WIDTH = Math.max(parseInt(getValorCSS2(CONTENEDOR_PDFS, "width", "width")) - 5, minAltoYAnchoContenedoresPDF);
							CONTENEDOR_PDFS.style.width = NEW_WIDTH + "%";
							CONTENEDOR_TEST_Y_MODAL.style.width = (100 - NEW_WIDTH) + "%";
						}
					}
					else if(_alturaAnchura=="altura" && getValorCSS2(CONTENEDOR_PDFS_Y_TEST,"flex-direction")=="column")
					{
						if(_masMenos === "mas")
						{
							const NEW_HEIGHT = Math.min(parseInt(getValorCSS2(CONTENEDOR_PDFS, "height", "height")) + 5, maxAltoYAnchoContenedoresPDF);
							CONTENEDOR_PDFS.style.height = NEW_HEIGHT + "%";
							CONTENEDOR_TEST_Y_MODAL.style.height = (100 - NEW_HEIGHT) + "%";
						}
						else //menos
						{
							const NEW_HEIGHT = Math.max(parseInt(getValorCSS2(CONTENEDOR_PDFS, "height", "height")) - 5, minAltoYAnchoContenedoresPDF);
							CONTENEDOR_PDFS.style.height = NEW_HEIGHT + "%";
							CONTENEDOR_TEST_Y_MODAL.style.height = (100 - NEW_HEIGHT) + "%";
						}
					}
				}
				else if(_idDiv=="ContenedorPDF1" || _idDiv=="ContenedorPDF2")
				{
					//Recogemos info. del ContenedorPDF seleccionado y del no seleccionado
					const DIV_SELECCIONADO = document.getElementById(_idDiv);
					const DIV_SELECCIONADO_HEIGHT = getValorCSS("id", _idDiv, "height", "height");
					const DIV_SELECCIONADO_WIDTH = getValorCSS("id", _idDiv, "width", "width");

					const DIV_NO_SELECCIONADO_ID = _idDiv === "ContenedorPDF1" ? "ContenedorPDF2" : "ContenedorPDF1";
					const DIV_NO_SELECCIONADO = document.getElementById(DIV_NO_SELECCIONADO_ID);

					if (_alturaAnchura === "altura" && getValorCSS2(CONTENEDOR_PDFS, "flex-direction") === "column")
					{
						// Suponiendo que _masMenos puede tomar valores "mas" o "menos"
						const INCREMENTO = _masMenos === "mas" ? 5 : -5;
						const NEW_HEIGHT_DIV_SELECCIONADO = Math.min(maxAltoYAnchoContenedoresPDF, Math.max(minAltoYAnchoContenedoresPDF, DIV_SELECCIONADO_HEIGHT + INCREMENTO));

						DIV_SELECCIONADO.style.height = NEW_HEIGHT_DIV_SELECCIONADO + "%";
						DIV_NO_SELECCIONADO.style.height = (100 - NEW_HEIGHT_DIV_SELECCIONADO) + "%";
					}
					else if(_alturaAnchura === "anchura" && getValorCSS2(CONTENEDOR_PDFS, "flex-direction") === "row")
					{
						const INCREMENTO = _masMenos === "mas" ? 5 : -5;
						const NEW_WIDTH_DIV_SELECCIONADO = Math.min(maxAltoYAnchoContenedoresPDF, Math.max(minAltoYAnchoContenedoresPDF, DIV_SELECCIONADO_WIDTH + INCREMENTO));

						DIV_SELECCIONADO.style.width = NEW_WIDTH_DIV_SELECCIONADO + "%";
						DIV_NO_SELECCIONADO.style.width = (100 - NEW_WIDTH_DIV_SELECCIONADO) + "%";
					}
				}
			}

			function cambiarAnchuraImagenesPorClass(_classACambiar, _zoom, _maximaAnchura=500, _minimaAnchura=10)
			{
				const MIS_DIV = document.getElementsByClassName(_classACambiar);
				if(MIS_DIV.length > 0)
				{
					const MIS_DIV_CSS_WIDTH = getValorCSS("class", _classACambiar, "width", "width");

					const incremento = _zoom === "mas" ? 5 : -5;
					const withAAplicar = Math.min(_maximaAnchura, Math.max(_minimaAnchura, MIS_DIV_CSS_WIDTH + incremento));

					for(let i=0; i<MIS_DIV.length; i++)
					{
						MIS_DIV[i].style.width = withAAplicar + "%";
					}
				}
			}
//================================
//	/Para cambiar estilos
//================================

			function compruebaTiempoValues(e)
			{
				const ALTER=e.target;
				if(parseInt(ALTER.value)>59)
				{
					ALTER.value=59;
				}
				else if(parseInt(ALTER.value)<0)
				{
					ALTER.value=0;
				}
			}

			function actualizarBarraCarga(_totalElementos=1)
			{
				switch (cargandoPDFDesdeElInput)
				{
					case "file-open1":
						actualizarBarraCarga2(FASE1CONFIGURACION.querySelector("#modalCarga1"),_totalElementos);
					break;
					case "file-open2":
						actualizarBarraCarga2(FASE1CONFIGURACION.querySelector("#modalCarga2"),_totalElementos);
					break;
					case "file-open12":
						actualizarBarraCarga2(FASE1CONFIGURACION.querySelector("#modalCarga1"),_totalElementos);
						actualizarBarraCarga2(FASE1CONFIGURACION.querySelector("#modalCarga2"),_totalElementos);
					break;
					case "file-open3":
						if(cargandoPDFPara=="ContenedorPDF1")
						{
							actualizarBarraCarga2(FASE2TEST.querySelector("#modalCarga3"),_totalElementos);
						}
						else if(cargandoPDFPara=="ContenedorPDF2")
						{
							actualizarBarraCarga2(FASE2TEST.querySelector("#modalCarga4"),_totalElementos);
						}
						else
						{
							actualizarBarraCarga2(FASE2TEST.querySelector("#modalCarga3"),_totalElementos);
							actualizarBarraCarga2(FASE2TEST.querySelector("#modalCarga4"),_totalElementos);
						}
					break;
					case "file-open4":
						actualizarBarraCarga2(FASE2TEST.querySelector("#modalCarga3"),_totalElementos);
					break;
					case "file-open5":
						actualizarBarraCarga2(FASE2TEST.querySelector("#modalCarga4"),_totalElementos);
					break;
					default:

					break;
				}
			}

			function actualizarBarraCarga2(modalCarga,_totalElementos)
			{
				let barraCarga;
				if(document.querySelector("#"+modalCarga.id+" .barraCarga")!=null)
				{
					barraCarga=document.querySelector("#"+modalCarga.id+" .barraCarga");
					const VALOR_ACTUAL = barraCarga.value;
					const VALOR_MAXIMO = barraCarga.max;
					const INCREMENTO = VALOR_MAXIMO/ _totalElementos;
					barraCarga.value = VALOR_ACTUAL + INCREMENTO;

					if(barraCarga.value >= VALOR_MAXIMO - INCREMENTO)
					{
						document.querySelector("#"+modalCarga.id+" .barraCarga").remove();
						document.querySelector("#"+modalCarga.id+" .lapizCarga").remove();
					}
				}
				else
				{
					barraCarga=document.createElement("progress");
					barraCarga.classList.add("barraCarga");
					const DIV_LAPIZ=document.createElement("div");
					DIV_LAPIZ.classList.add("lapizCarga");
					DIV_LAPIZ.textContent="✏️";
					modalCarga.appendChild(barraCarga);
					modalCarga.appendChild(DIV_LAPIZ);
					barraCarga.value=0;
				}
			}

			function mostrarOcultarModalCargaCorrecto(_display)
			{//_display o flex o none
				let modalCarga="";
				switch (cargandoPDFDesdeElInput)
				{
					case "file-open1":
						modalCarga="modalCarga1";
					break;
					case "file-open2":
						modalCarga="modalCarga2";
					break;
					case "file-open12":
						modalCarga="modalCarga1";
						document.getElementById("modalCarga2").style.display=_display;
					break;
					case "file-open3":
						if(cargandoPDFPara=="ContenedorPDF1")
						{
							modalCarga="modalCarga3";
						}
						else if(cargandoPDFPara=="ContenedorPDF2")
						{
							modalCarga="modalCarga4";
						}
						else
						{
							modalCarga="modalCarga3";
							document.getElementById("modalCarga4").style.display=_display;
						}
					break;
					case "file-open4":
						modalCarga="modalCarga3";
					break;
					case "file-open5":
						modalCarga="modalCarga4";
					break;
					default:

					break;
				}
				document.getElementById(modalCarga).style.display=_display;
			}

//===========================
//	/Implementación de pdf2img
//===========================

//===========================
//	Para limpieza
//===========================
			window.onbeforeunload = eliminarCookies();
			eliminarCookies();
//===========================
//	/Para limpieza
//===========================

//===========================
//	Comprobar colores
//===========================
			document.getElementById("sombraTexto").addEventListener("change", (e) =>
			{
				switch (e.target.value)
				{
					case "auto":
					{
						sombrasTextoAutomaticas=true;
						comprobarSiElTextoBotonesDebeTenerSombraYSet();
					}
					break;
					case "blanca":
					{
						sombrasTextoAutomaticas=false;
						setSombraTextoBotones("rgb(255,255,255)");
					}
					break;
					case "negra":
					{
						sombrasTextoAutomaticas=false;
						setSombraTextoBotones("rgb(0, 0, 0)");
					}
					break;
					case "nada":
					{
						sombrasTextoAutomaticas=false;
						setSombraTextoBotones("");
					}
					break;
					default:
					break;
				}
				MiLocalStorage.modificar("colores", {sombraTexto: e.target.value});
			});

			function comprobarSiElTextoBotonesDebeTenerSombraYSet()
			{
				const STYLE_VAR = getComputedStyle(document.documentElement);
				const COLOR_FONDO_BOTONES = STYLE_VAR.getPropertyValue('--color-fondoBotones').trim();
				const COLOR_LETRA_BOTONES = STYLE_VAR.getPropertyValue('--color-letraBotones').trim();

				if(!textoLegibleColores(COLOR_FONDO_BOTONES,COLOR_LETRA_BOTONES))
				{
					let colorTextShadow="rgb(255,255,255)";
					if(colorCercanoAlBlanco(COLOR_LETRA_BOTONES))
					{
						colorTextShadow="rgb(0,0,0)";
					}
					setSombraTextoBotones(colorTextShadow);
				}
				else
				{
					setSombraTextoBotones("");
				}
			}

			// Función para aplicar o eliminar la sombra de texto utilizando la clase CSS
			function setSombraTextoBotones(_color)
			{
				const NOMBRE_POSICION="sombraTexto";

				if (_color !== "")
				{
					// Crear la clase de sombra de texto
					const CODIGO_CLASS_CSS = `HTML, body, input, button, select, textarea, .textoBarraCambioTamanoApunteGeneralTextarea { text-shadow: -1px -1px 0 ${_color}, 1px -1px 0 ${_color}, -1px 1px 0 ${_color}, 1px 1px 0 ${_color}; }`;
					OBJ_CONTROLADOR_CSS.crearSustituirRegla(NOMBRE_POSICION, CODIGO_CLASS_CSS);
				}
				else
				{
					// Eliminar la clase de sombra de texto
					OBJ_CONTROLADOR_CSS.eliminarRegla(NOMBRE_POSICION);
				}
			}

			function reiniciarColores()
			{
				const contenidoLocalStorage=MiLocalStorage.obtenerTodasLasClavesYContenidos();
				if ("colores" in contenidoLocalStorage)
				{
					let colores=contenidoLocalStorage["colores"];
					for (let nombreVariableCSS in colores)
					{
						document.documentElement.style.removeProperty(`--color-${nombreVariableCSS}`);
					}
					MiLocalStorage.limpiarTodo();
					sombrasTextoAutomaticas=true;
					comprobarSiElTextoBotonesDebeTenerSombraYSet();
				}
			}
//===========================
//	/Comprobar colores
//===========================

			function moverScrollCanvasTouchV(movimientoY, _divObjetivo)
			{
				const DIV_OBJETIVO=document.getElementById(_divObjetivo);
				const SCROLL_BEHAVIOR=getValorCSS2(DIV_OBJETIVO,"scroll-behavior");
				DIV_OBJETIVO.style.scrollBehavior="initial";
				DIV_OBJETIVO.scrollTop+=movimientoY*0.1;
				DIV_OBJETIVO.style.scrollBehavior=SCROLL_BEHAVIOR;
			}

			function moverScrollCanvasTouchH(movimientoX, _divObjetivo)
			{
				const DIV_OBJETIVO=document.getElementById(_divObjetivo);
				const SCROLL_BEHAVIOR=getValorCSS2(DIV_OBJETIVO,"scroll-behavior");
				DIV_OBJETIVO.style.scrollBehavior="initial";
				DIV_OBJETIVO.scrollLeft+=movimientoX*0.1;
				DIV_OBJETIVO.style.scrollBehavior=SCROLL_BEHAVIOR;
			}

			function moverDivScrollingV(_e, _idDivObjetivo)
			{
				//para que, durante el movimiento, si cambia de dirección no continúe moviéndose en dirección errónea
				clearTimeout(temporizadorActualizarLastY);
				temporizadorActualizarLastY= setTimeout(
					() => lastY = _e.touches[0].clientY
					,250);
				//Si activo las lineas "lastY = e.touches[0].clientY;" de debajo, no hay aceleración de movimiento en el _divObjetivo,
				// que entonces no haría falta el Timeout de arriba
				const CURRENT_Y = _e.touches[0].clientY;
				moverScrollCanvasTouchV((CURRENT_Y-lastY), _idDivObjetivo);
				//lastY = _e.touches[0].clientY;
			}

			function moverDivScrollingH(_e, _idDivObjetivo)
			{
				//para que, durante el movimiento, si cambia de dirección no continúe moviéndose en dirección errónea
				clearTimeout(temporizadorActualizarLastX);
				temporizadorActualizarLastX= setTimeout(
					() => lastX = _e.touches[0].clientX
					,250);
				//Si activo las lineas "lastX = e.touches[0].clientX;" de debajo, no hay aceleración de movimiento en el _divObjetivo,
				// que entonces no haría falta el Timeout de arriba
				const CURRENT_X = _e.touches[0].clientX;
				moverScrollCanvasTouchH((CURRENT_X-lastX), _idDivObjetivo);
				//lastX = e.touches[0].clientX;
			}

			function touchOClick(e)
			{
				//Evento originado= e.type
				if(e.type=="click")
				{
					modoTouch=false;
					setToggleValoresCSS(FASE2TEST.getElementsByClassName("contenedorDivsScrollingTouch"), "display", "none");
				}
				else
				{
					modoTouch=true;

				}

				if(getValorCSS2(FASE2TEST,"display")=="none")
				{
					if(modoTouch)
					{
						OBJ_TOOL_ZOOM.aplicarZoomTactilDeImagenes(
						{
							_idDivObjetivoEventoZoom:"pdf1EnFase1",
							_idDivScroll:"pdf1EnFase1",
							_idDivContenedorPaginas:"pdf1EnFase1",
							_querySelectorAllDeElementosAAplicarZoom:"#pdf1EnFase1Contenedor",
							_widthMaximoZoom:450
						});
						OBJ_TOOL_ZOOM.aplicarZoomTactilDeImagenes(
						{
							_idDivObjetivoEventoZoom:"pdf2EnFase1",
							_idDivScroll:"pdf2EnFase1",
							_idDivContenedorPaginas:"pdf2EnFase1",
							_querySelectorAllDeElementosAAplicarZoom:"#pdf2EnFase1Contenedor",
							_widthMaximoZoom:450
						});
					}
					else
					{
						OBJ_TOOL_ZOOM.aplicarZoomMouseDeImagenes(
						{
							_idDivObjetivoEventoZoom:"pdf1EnFase1",
							_idDivScroll:"pdf1EnFase1",
							_querySelectorAllDeElementosAAplicarZoom:"#pdf1EnFase1Contenedor",
							_widthMaximoZoom:450
						});
						OBJ_TOOL_ZOOM.aplicarZoomMouseDeImagenes(
						{
							_idDivObjetivoEventoZoom:"pdf2EnFase1",
							_idDivScroll:"pdf2EnFase1",
							_querySelectorAllDeElementosAAplicarZoom:"#pdf2EnFase1Contenedor",
							_widthMaximoZoom:450
						});
					}
				}
				document.removeEventListener('touchstart', touchOClick);
				document.removeEventListener('click'	 , touchOClick);
			}

			function actualizarBotonesActivosBarraIzq()
			{
				if(getValorCSS2(CONTENEDOR_PDF1, 'display')!='none')
				{
					anadirQuitarClass(document.getElementById("botonBarraVerticalConfigPDF1OcultarMostrar"),"botonActivo",1);
				}
				else
				{
					anadirQuitarClass(document.getElementById("botonBarraVerticalConfigPDF1OcultarMostrar"),"botonActivo",0);
				}
			
				if(getValorCSS2(CONTENEDOR_PDF2, 'display')!='none')
				{
					anadirQuitarClass(document.getElementById("botonBarraVerticalConfigPDF2OcultarMostrar"),"botonActivo",1);
				}
				else
				{
					anadirQuitarClass(document.getElementById("botonBarraVerticalConfigPDF2OcultarMostrar"),"botonActivo",0);
				}
			}

			async function pedirPermisoLectura()
			{
				function onError(error)
				{
					OBJ_TOOL_ALERT.mostrarAlert("Error", 'Error al acceder al sistema de archivos: ' + error.toString());
				}
			
				const permissions = cordova.plugins.permissions;
			
				return new Promise(resolve => {
					// Verificar si tenemos el permiso READ_EXTERNAL_STORAGE
					permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, readStatus => {
						if (!readStatus.hasPermission)
						{
							// No tenemos el permiso READ_EXTERNAL_STORAGE, debemos solicitarlo
							permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, requestReadStatus => {
								resolve(requestReadStatus.hasPermission);
							}, onError);
						}
						else
						{
							resolve(true);
						}
					}, onError);
				});
			}
			
			async function pedirPermisoEscritura()
			{
				function onError(error)
				{
					OBJ_TOOL_ALERT.mostrarAlert("Error", 'Error al acceder al sistema de archivos: ' + error.toString());
				}
			
				const permissions = cordova.plugins.permissions;
			
				return new Promise(resolve =>
					{
					// Verificar si tenemos el permiso WRITE_EXTERNAL_STORAGE
					permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, writeStatus => {
						if (!writeStatus.hasPermission)
						{
							// No tenemos el permiso WRITE_EXTERNAL_STORAGE, debemos solicitarlo
							permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, requestWriteStatus => {
								resolve(requestWriteStatus.hasPermission);
							}, onError);
						}
						else
						{
							resolve(true);
						}
					}, onError);
				});
			}

			async function checkPermisoLectura()
			{
				if (isAppAndroid)
				{
					const PERMISOS = cordova.plugins.permissions;
					const PERMISO_LECTURA = await new Promise(resolve =>
					{
						PERMISOS.checkPermission(PERMISOS.READ_EXTERNAL_STORAGE, status => {
							resolve(status.hasPermission);
						}, null);
					});

					return PERMISO_LECTURA;
				}
				else
				{
					return false; // Si no se está ejecutando en un entorno Android
				}
			}

			async function checkPermisoEscritura()
			{
				if (!isAppAndroid){
					return false;
				}

				const PERMISOS = cordova.plugins.permissions;
				const PERMISO_ESCRITURA = await new Promise(resolve =>
				{
					PERMISOS.checkPermission(PERMISOS.WRITE_EXTERNAL_STORAGE, status => {
						resolve(status.hasPermission);
					}, null);
				});

				return PERMISO_ESCRITURA;
			}

//==========================================================
//	TRADUCCIÓN
//==========================================================
			async function cambiarIdioma(_lang)
			{
				if (_lang != "")
				{
					langActual = _lang;
					langJson = JSON.parse(eval(_lang));

					const LOC_ELEMENTOS_ATRADUCIR = (document.querySelectorAll("[data-langlocation]"));
					for (const ELEMENTO_A_TRADUCIR of LOC_ELEMENTOS_ATRADUCIR)
					{
						if (langActual != ELEMENTO_A_TRADUCIR.dataset.langactual)
						{
							let langlocation = ELEMENTO_A_TRADUCIR.dataset.langlocation;
							langlocation = langlocation.trim().replace(/\s*,\s*/g, ',');
							const LOCALIZACION_EN_JSON = langlocation.split(',');

							let localizacion = langJson;
							for (const PROPIEDAD of LOCALIZACION_EN_JSON)
							{
								localizacion = localizacion[PROPIEDAD];
							}

							let attrElementoATraducir=ELEMENTO_A_TRADUCIR.dataset.langmod;
							attrElementoATraducir=attrElementoATraducir.trim().replace(/\s*,\s*/g, ',');
							const ATTR_EN_JSON = attrElementoATraducir.split(',');

							ATTR_EN_JSON.forEach(attr => 
								modificarLoQueVeElUsuario(ELEMENTO_A_TRADUCIR, localizacion[attr], attr)
							);

							ELEMENTO_A_TRADUCIR.dataset.langactual = langActual;
						}
					}
					document.documentElement.setAttribute('lang', langActual);
				}
			}


			function modificarLoQueVeElUsuario(elemento, contenido, attrEnJson = "html")
			{
				const atributos =
				{
					"html": "innerHTML",
					"value": "value",
					"title": "title",
					"placeholder": "placeholder",
					"src": "src",
					"alt": "alt"
				};

				const propiedad = atributos[attrEnJson];

				if (propiedad)
				{
					elemento[propiedad] = contenido;
				}
			}

			function aplicarIdiomaAlInicio()
			{
				let langAEnviar="es";
				switch(navigator.language)
				{
					case "es-ES":
						langAEnviar="es";
					break;
					case "en":
						langAEnviar="en";
					break;
					default:
						langAEnviar="es";
					break;
				}
				cambiarIdioma(langAEnviar);
			}
//==========================================================
//	/TRADUCCIÓN
//==========================================================

//==========================================================
//	EVENT LISTENER
//==========================================================

document.querySelector("#botonCerrarVisorImagenes").addEventListener("click",
() =>
	document.querySelector("#visorImagenes").style.display="none"
);

document.querySelector('#contenidoInstrucciones').addEventListener("click", (e) =>
{
	if(e.target.classList.contains("imgInstrucRapidas"))
	{
		document.querySelector("#visorImagenes").style.display="grid";
		document.querySelector("#imagenVisor").src=e.target.src;
		document.querySelector("#imagenVisor").style.width="100%";
	}
});

OBJ_TOOL_ZOOM.aplicarZoomMouseDeImagenes(
{
	_idDivObjetivoEventoZoom:"visorImagenes",
	_idDivScroll:"visorImagenes",
	_querySelectorAllDeElementosAAplicarZoom:"#imagenVisor",
	_widthMaximoZoom:450,
	_widthMinimoZoom: 100
});

OBJ_TOOL_ZOOM.aplicarZoomTactilDeImagenes(
{
	_idDivObjetivoEventoZoom:"visorImagenes",
	_idDivScroll:"visorImagenes",
	_querySelectorAllDeElementosAAplicarZoom:"#imagenVisor",
	_widthMaximoZoom:450,
	_widthMinimoZoom: 100
});

document.querySelectorAll('.maximo2caracteres').forEach((input) =>
{
    input.addEventListener('input', (event) =>
    {
		const EXPREGULAR2 = /^\d{0,2}$/;
        if (!EXPREGULAR2.test(event.target.value))
        {
            event.target.value = event.target.value.slice(0, -1);
        }
    });
});

document.querySelectorAll('.maximo3caracteres').forEach((input) =>
{
    input.addEventListener('input', (event) =>
    {
		const EXPREGULAR3 = /^\d{0,3}$/;
        if (!EXPREGULAR3.test(event.target.value))
        {
            event.target.value = event.target.value.slice(0, -1);
        }
    });
});

document.querySelectorAll('.tiempoValues').forEach((input)=>
{
    input.addEventListener('input', (event)=>
    {
		const EXPREGULAR_TIEMPO = /^([0-9]|[0-9][0-9])$/;
        if (!EXPREGULAR_TIEMPO.test(event.target.value))
        {
            event.target.value = event.target.value.slice(0, -1);
        }
    });
});

document.querySelectorAll('.tiempoValues').forEach((input)=>
{
    input.addEventListener('blur', (e) =>
    {
        compruebaTiempoValues(e);
    });
});

document.querySelectorAll(".contenidoInicial").forEach(e => e.addEventListener("click", (e) =>
{
	const DATA_CONTENEDOR = e.currentTarget.getAttribute("data-contenedor");
	const idFileOpenMap =
	{
		"F1PDF1": "file-open1",
		"F1PDF2": "file-open2",
		"F2PDF1": "file-open4",
		"F2PDF2": "file-open5"
	};
  
	const idFileOpen = idFileOpenMap[DATA_CONTENEDOR];
	if (idFileOpen)
	{
		document.getElementById(idFileOpen).click();
	}
}));

document.querySelectorAll(".botonInstrucciones").forEach(e => e.addEventListener("click", (e) =>
{
    const DATA_AREA_A_EXPLICAR = e.target.getAttribute("data-areaaexplicar");
	let idAMostrar="";

    switch (DATA_AREA_A_EXPLICAR)
    {
        case "fase1Configuracion":
			idAMostrar="Panel_izquierdo";
        break;
        case "PDFToolsTabPanel":
			idAMostrar="instruccionesControlesArchivo";
        break;
        case "masAccionesTabPanel":
			idAMostrar="instruccionesOpcionesAnadidas";
        break;
        case "datos":
			idAMostrar="instruccionesOpcionesBasicas";
        break;
        default:
            
        break;
    }

	document.querySelectorAll('.menuInstrucciones').forEach(el => el.style.display = 'none');
	document.getElementById(idAMostrar).style.display="block";
    document.getElementById('modalInstrucciones').style.display='flex';
}));

document.getElementById("pestanasPestaneroFase2").addEventListener("click", (e) =>
{
	switch (e.target.dataset.value)
	{
		case "PDFToolsTabItem":
		{
			setToggleValoresCSS(PDF_TOOLS_TAB_PANEL,"display",["flex","none"]);
			MAS_ACCIONES_TAB_PANEL.style.display="none";
		}
		break;
		case "masAccionesTabItem":
		{
			setToggleValoresCSS(MAS_ACCIONES_TAB_PANEL,"display",["flex","none"]);
			PDF_TOOLS_TAB_PANEL.style.display="none";
		}
		break;
		default:
		break;
	}
	comprobarResaltadoPestanasFase2();
});

function comprobarResaltadoPestanasFase2()
{
	FASE2TEST.querySelector(".pestanaMenuFase2OpcionesContenedor").dataset.abierto =
    getValorCSS2(PDFToolsTabPanel, "display") != "none";
	FASE2TEST.querySelector(".pestanaMenuFase2OpcionesGenerales").dataset.abierto =
    getValorCSS2(masAccionesTabPanel, "display") != "none";
}

TAB_CONTAINER.addEventListener("mouseover", () =>
{
	clearTimeout(timeOutBlurDetailsMenuFase2);
	timeOutBlurDetailsMenuFase2 = null;
});

//No pongo mouseout porque ¡los elementos disabled cuentan como fuera del .pestanaMenuFase2!, por esto tambien uso el closest
FASE2TEST.addEventListener("mouseover", (e) =>
{
	const PESTANAS=FASE2TEST.querySelectorAll('.pestanaMenuFase2');
	if(PESTANAS[0].dataset.abierto=="true" || PESTANAS[1].dataset.abierto=="true")
	{
		if(!e.target.closest("#TabContainer"))
		{
			if(timeOutBlurDetailsMenuFase2==null)
			{
				timeOutBlurDetailsMenuFase2=setTimeout(() =>
				{
					setToggleValoresCSS(FASE2TEST.querySelectorAll('.contenidoPestanaMenuFase2'),"display","none");
					setToggleValoresAtributo(FASE2TEST.querySelectorAll('.pestanaMenuFase2'),"data-abierto","false");
					timeOutBlurDetailsMenuFase2 = null;
				},3000);
			}
		}
	}
});

TAB_CONTAINER.addEventListener("touchstart", () =>
{
	clearTimeout(timeOutBlurDetailsMenuFase2);
	timeOutBlurDetailsMenuFase2 = null;
});

TAB_CONTAINER.addEventListener("touchenter", () =>
{
	clearTimeout(timeOutBlurDetailsMenuFase2);
	timeOutBlurDetailsMenuFase2 = null;
});

FASE2TEST.addEventListener("touchstart", (e) =>
{
	if(!e.target.closest("#TabContainer") && (FASE2TEST.querySelectorAll('.pestanaMenuFase2')[0].dataset.abierto=="true" || FASE2TEST.querySelectorAll('.pestanaMenuFase2')[1].dataset.abierto=="true"))
	{
		if(timeOutBlurDetailsMenuFase2==null)
		{
			timeOutBlurDetailsMenuFase2 = setTimeout(() =>
			{
				setToggleValoresCSS(FASE2TEST.querySelectorAll('.contenidoPestanaMenuFase2'),"display","none");
				setToggleValoresAtributo(FASE2TEST.querySelectorAll('.pestanaMenuFase2'),"data-abierto","false");
				clearTimeout(timeOutBlurDetailsMenuFase2);
				timeOutBlurDetailsMenuFase2=false;
			}, 3000);
		}
	}
});

let touchYCierreDetails;

FASE2TEST.querySelectorAll(".contenidoPestanaMenuFase2").forEach(div =>
{
    div.addEventListener("touchstart", (e) =>
    {
        touchYCierreDetails = e.touches[0].clientY;
    });

    div.addEventListener("touchmove", (e) =>
    {
        const CURRENT_Y = e.touches[0].clientY;
        const DISTANCE = touchYCierreDetails - CURRENT_Y;
        if (DISTANCE > 100)
        {
			setToggleValoresCSS(FASE2TEST.querySelectorAll('.contenidoPestanaMenuFase2'),"display","none");
			setToggleValoresAtributo(FASE2TEST.querySelectorAll('.pestanaMenuFase2'),"data-abierto","false");
            // El usuario ha arrastrado hacia arriba al menos 100px
        }
    });

    div.addEventListener("touchend", (e) =>
    {
        touchYCierreDetails = null;
    });
});

document.querySelectorAll(".botonInputFile").forEach(e => e.addEventListener("click", (e) =>
{
	const ID_INPUT = e.target.getAttribute("data-idInput");
	document.getElementById(ID_INPUT).click();
}));

document.getElementById("configColores").addEventListener("input", (e) =>
{
	if (e.target.tagName === 'INPUT' && e.target.type === 'color')
	{
		const NOMBRE_VARIABLE_CSS = e.target.getAttribute("data-varCSS");
		document.documentElement.style.setProperty('--color-'+NOMBRE_VARIABLE_CSS, e.target.value);
		MiLocalStorage.modificar("colores",{[NOMBRE_VARIABLE_CSS]: e.target.value});
		if(sombrasTextoAutomaticas)
		{
			comprobarSiElTextoBotonesDebeTenerSombraYSet()
		}
	}	  
});

document.getElementById("nAlternativas").addEventListener("blur",
() => compruebaAlternativas());

BOTON_CREAR_TEST.addEventListener("click",
() =>
{
	const HORAS=document.getElementById("tiempoMaxEnHoras").value;
	const MINUTOS=document.getElementById("tiempoMaxEnMinutos").value;
	const SEGUNDOS=document.getElementById("tiempoMaxEnSegundos").value;
	if(HORAS==0 && MINUTOS == 0 && SEGUNDOS == 0)
	{
		document.querySelector(".camposTiempo").style.boxShadow="rgb(255, 0, 0) 0px 0px 10px 3px inset";
	}
	else
	{
		iniciarPreparativosFase2();
	}
});

document.querySelectorAll(".focusContenido").forEach(
	(btn) => btn.addEventListener('focus', (e) => e.target.select())
);

document.getElementById("closeButtonModalInstrucciones").addEventListener("click", 
() =>
    document.getElementById('modalInstrucciones').style.display='none'
);

document.getElementById("botonVolverInstrucciones").addEventListener("click", 
() =>
    document.getElementById('modalInstrucciones').style.display='none'
);

document.getElementById("modalTest").addEventListener("click", 
() =>
    empezarTest()
);

document.getElementById("botonConfigColores").addEventListener("click",
(e) =>
{
	switch (e.target.id)
	{
		case "botonRestaurarConfigColores":
		{
			reiniciarColores();
			document.getElementById("sombraTexto").selectedIndex=0;
		}
		break;
		case "botonVolverConfigColores":
		{
			document.getElementById("modalConfigColores").style.display="none";
		}
		break;
		default:
		break;
	}
});

document.getElementById("closeButtonModalConfigColores").addEventListener("click", ()=>{
	document.getElementById("modalConfigColores").style.display="none";
});


    document.querySelectorAll(".file-select").forEach(function (inputFile)
	{
        inputFile.addEventListener("click", (e) =>
		{
			if (isAppAndroid)
			{
				if(permisosInputFileRead==false || permisosInputFileWrite==false)
				{
					e.preventDefault();
					pedirPermisosInputFile();
				}
			}
        });
    });

async function pedirPermisosInputFile()
{
	permisosInputFileRead = await pedirPermisoLectura();
	permisosInputFileWrite = await pedirPermisoEscritura();
}

document.getElementById("file-open1").addEventListener("input", (e) => {
	const files = e.target.files;
	if (files.length > 0)
	{
		cargandoPDFDesdeElInput = "file-open1";
		FASE1CONFIGURACION.querySelector("#pdf1EnFase1 .contenidoInicial p").innerHTML = TEXTO_CARGANDO[langActual];

		OBJ_CONTROL_INPUT_ARCHIVOS.onInputFiles(files, ['pdf1EnFase1', 'ContenedorPDF1EnImagenes'], false);
		document.getElementById("inputTextPaginaSeleccionadaPDF1").value = 1;
		e.target.value = "";
	}
});

document.getElementById("file-open2").addEventListener("input", (e) =>
{
	const files = e.target.files;
	if (files.length > 0)
	{
		cargandoPDFDesdeElInput = "file-open2";
		FASE1CONFIGURACION.querySelector("#pdf2EnFase1 .contenidoInicial p").innerHTML = TEXTO_CARGANDO[langActual];
		OBJ_CONTROL_INPUT_ARCHIVOS.onInputFiles(files, ['pdf2EnFase1', 'ContenedorPDF2EnImagenes'], false);
		document.getElementById("inputTextPaginaSeleccionadaPDF2").value = 1;
		e.target.value = "";
	}
});

document.getElementById("botoneraPDFFase1-pestanas-pestana3BotonDobleArchivo").addEventListener("click",
() =>
	document.getElementById("file-open12").click()
);

document.getElementById("file-open12").addEventListener("input",
(e) =>
{
	if(e.target.files[0]!=null)
	{
		cargandoPDFDesdeElInput="file-open12";
		FASE1CONFIGURACION.querySelector("#pdf1EnFase1 .contenidoInicial p").innerHTML=TEXTO_CARGANDO[langActual];
		FASE1CONFIGURACION.querySelector("#pdf2EnFase1 .contenidoInicial p").innerHTML=TEXTO_CARGANDO[langActual];
		OBJ_CONTROL_INPUT_ARCHIVOS.onInputFiles(e.target.files, ['pdf1EnFase1','pdf2EnFase1','ContenedorPDF1EnImagenes','ContenedorPDF2EnImagenes'], false);
		document.getElementById("inputTextPaginaSeleccionadaPDF1").value=1;
		document.getElementById("inputTextPaginaSeleccionadaPDF2").value=1;
		e.target.value="";
	}
});

function crearEventListenerMenuRapido () {
	DIV_MENU_RAPIDO1.addEventListener("click", (e) => {
		switch (e.target.id) {
			case "divBotonConfigPDF1":
				{
					setToggleValoresCSS(FASE2TEST.getElementsByClassName("barraConfigPDF1"), "display", ["none", "flex"]);

					if (getValorCSS("class", "barraConfigPDF1", "display") == "flex") {
						anadirQuitarClass(document.getElementById('divBotonConfigPDF1'), "botonActivo", 1);
					}

					else {
						anadirQuitarClass(document.getElementById('divBotonConfigPDF1'), "botonActivo", 0);
					}
				}
				break;
			case "botonBarraConfigPDF1InputFile":
				{
					document.getElementById("file-open4").click();
				}
				break;
			case "botonBarraConfigPDF1InputFileAdicion":
				{
					anadirQuitarClass(e.target, "botonActivo", 2);
					FASE2TEST.querySelector('#file-open4AdicionCheckbox').checked = !FASE2TEST.querySelector('#file-open4AdicionCheckbox').checked;

					if (e.target.classList.contains("botonActivo")) {
						e.target.querySelector("p").textContent = "📄+📄";
					}

					else {
						e.target.querySelector("p").textContent = "❌+📄";
					}
				}
				break;
			case "botonBarraConfigPDF1ActivarDesactivarModoNoche":
				{
					if (FASE2TEST.getElementsByClassName("paginaContenedorPDF1EnImagenes").length > 0) {
						OBJ_CONTROLADOR_CSS.toggleRegla("contenedor1F2InvertirColores", ".contenidoPaginasContenedorPDF1EnImagenes {filter: invert(1);}");
						anadirQuitarClass(document.getElementById("botonBarraConfigPDF1ActivarDesactivarModoNoche"), "botonActivo");
					}
				}
				break;
			case "botonBarraConfigPDF1Borrar":
				{
					if (e.target.dataset.disabled == "false") {
						OBJ_TOOL_ALERT.mostrarConfirm("<div data-langlocation='miAlert,tituloTextoPaginasAEliminar' data-langmod='html' data-langactual='es'>Borrar páginas</div>",
							`
					<label for="textoPaginasAEliminar">
						<div data-langlocation='miAlert,preeliminar' data-langmod='html' data-langactual='es'>Introduzca páginas a eliminar: </div>
					</label><br>
					<input class="focusContenido" value="1" id="textoPaginasAEliminar" name="textoPaginasAEliminar" type='text' placeholder='Introduzca páginas a eliminar' data-langlocation='miAlert,textoPaginasAEliminar' data-langmod='placeholder' data-langactual='es'>
					<p id="textoPaginasAEliminarMensajeCorreccion" data-langlocation='miAlert,formatoIncorrecto' data-langmod='html' data-langactual='es' style="display:none;">El formato del texto es incorrecto.</p>
					<p data-langlocation='miAlert,pExplicaciontextoPaginasAEliminar' data-langmod='html' data-langactual='es'>Separe por comas ',' las páginas y los rangos de página que desee eliminar. Los rangos se escriben separados por guion '-'. Ejemplo: '1,3-5,8' En este ejemplo se eliminarán las páginas 1,3,4,5 y 8</p>
				`,
							"",
							"ventanaMiConfirm",
							() => {
								if (OBJ_CONTROL_PAGINAS_F2_1.comprobarStringConPaginas(document.getElementById("textoPaginasAEliminar").value)) {
									OBJ_CONTROL_PAGINAS_F2_1.eliminarVariasPaginasYReordenarPaginas(document.getElementById("textoPaginasAEliminar").value);
									OBJ_PIZARRA1.borrarPizarraYLineasGuardadas();
									document.getElementById("modalMiAlert").remove();
									actualizarHabilitacionBotonesMenusRapidos();
								}

								else {
									document.getElementById("textoPaginasAEliminarMensajeCorreccion").style.display = "block";
								}
							},
							() => { },
							false,
							() => { cambiarIdioma(langActual); });

						document.getElementById("textoPaginasAEliminar").removeEventListener("input", (event) => OBJ_CONTROL_PAGINAS_F2_1.validarCaracterPaginasAEliminar(event));
						document.getElementById("textoPaginasAEliminar").addEventListener("input", (event) => OBJ_CONTROL_PAGINAS_F2_1.validarCaracterPaginasAEliminar(event));
					}
				}
				break;
			case "botonBarraConfigPDF1MostrarOcultarPizarra":
				{
					setToggleValoresCSS(PIZARRA1_CANVAS, "display", ["block", "none"]);
					OBJ_PIZARRA1.redimensionarPizarra();
					if (getValorCSS2(PIZARRA1_CANVAS, "display") != "none") {
						anadirQuitarClass(document.getElementById('botonBarraConfigPDF1MostrarOcultarPizarra'), "botonActivo", 0);
						if (FASE2TEST.querySelectorAll(".paginaContenedorPDF1EnImagenes .botonCerrarPagina").length > 0) {
							OBJ_CONTROLADOR_CSS.eliminarRegla("botonCerrarPaginaC1F2");
						}
						if (modoTouch) {
							setToggleValoresCSS(FASE2TEST.querySelectorAll("#ContenedorPDF1 .divScrollingPDF"), "display", "block");
						}
					}

					else {
						if (FASE2TEST.querySelectorAll(".paginaContenedorPDF1EnImagenes .botonCerrarPagina").length > 0) {
							OBJ_CONTROLADOR_CSS.crearSustituirRegla("botonCerrarPaginaC1F2", `#ContenedorPDF1EnImagenes .botonCerrarPagina{display:block;}`);
						}
						anadirQuitarClass(document.getElementById('botonBarraConfigPDF1MostrarOcultarPizarra'), "botonActivo", 1);
						setToggleValoresCSS(FASE2TEST.querySelectorAll("#ContenedorPDF1 .divScrollingPDF"), "display", "none");
					}
					OBJ_PIZARRA1.repintarLineas();
				}
				break;
			case "botonBarraConfigPDF1BorrarPizarra":
				{
					OBJ_PIZARRA1.borrarPizarraYLineasGuardadas();
				}
				break;
			case "botonBarraConfigPDF1ColorPincel":
				{
					document.getElementById('colorPincel1').click();
				}
				break;
			case "botonBarraConfigPDF1Borrador":
				{
					document.getElementById('borradorPincel1').click();
				}
				break;
			case "borradorPincel1":
				{
					OBJ_PIZARRA1.modoBorrador();
					anadirQuitarClass(document.getElementById("botonBarraConfigPDF1Borrador"), "botonActivo");
				}
				break;
			default:
				break;
		}
	});

	document.getElementById('colorPincel1').addEventListener('input', (e) => OBJ_PIZARRA1.setColorTrazo(e.target.value));

	document.getElementById("file-open4").addEventListener("input", (e) => {
		if (e.target.files[0] != null) {
			cargandoPDFDesdeElInput = "file-open4";
			OBJ_CONTROL_INPUT_ARCHIVOS.onInputFiles(e.target.files, ["ContenedorPDF1EnImagenes"], FASE2TEST.querySelector('#file-open4AdicionCheckbox').checked);
			OBJ_PIZARRA1.borrarPizarraYLineasGuardadas();
			document.getElementById("inputTextPaginaSeleccionadaPDF1").value = 1;
			e.target.value = "";
		}
	});

	DIV_MENU_RAPIDO2.addEventListener("click", (e) => {
		switch (e.target.id) {
			case "divBotonConfigPDF2":
				{
					setToggleValoresCSS(FASE2TEST.getElementsByClassName("barraConfigPDF2"), "display", ["none", "flex"]);

					if (getValorCSS("class", "barraConfigPDF2", "display") == "flex") {
						anadirQuitarClass(document.getElementById('divBotonConfigPDF2'), "botonActivo", 1);
					}
					else {
						anadirQuitarClass(document.getElementById('divBotonConfigPDF2'), "botonActivo", 0);
					}
				}
				break;
			case "botonBarraConfigPDF2InputFile":
				{
					document.getElementById("file-open5").click();
				}
				break;
			case "botonBarraConfigPDF2InputFileAdicion":
				{
					anadirQuitarClass(e.target, "botonActivo", 2);
					FASE2TEST.querySelector('#file-open5AdicionCheckbox').checked = !FASE2TEST.querySelector('#file-open5AdicionCheckbox').checked;

					if (e.target.classList.contains("botonActivo")) {
						e.target.querySelector("p").textContent = "📄+📄";
					}

					else {
						e.target.querySelector("p").textContent = "❌+📄";
					}
				}
				break;
			case "botonBarraConfigPDF2ActivarDesactivarModoNoche":
				{
					if (FASE2TEST.getElementsByClassName("paginaContenedorPDF2EnImagenes").length > 0) {
						OBJ_CONTROLADOR_CSS.toggleRegla("contenedor2F2InvertirColores", ".contenidoPaginasContenedorPDF2EnImagenes {filter: invert(1);}");
						anadirQuitarClass(document.getElementById("botonBarraConfigPDF2ActivarDesactivarModoNoche"), "botonActivo");
					}
				}
				break;
			case "botonBarraConfigPDF2Borrar":
				{
					if (e.target.dataset.disabled == "false") {
						OBJ_TOOL_ALERT.mostrarConfirm("<div data-langlocation='miAlert,tituloTextoPaginasAEliminar' data-langmod='html' data-langactual='es'>Borrar páginas</div>",
							`
					<label for="textoPaginasAEliminar">
						<div data-langlocation='miAlert,preeliminar' data-langmod='html' data-langactual='es'>Introduzca páginas a eliminar: </div>
					</label><br>
					<input class="focusContenido" value="1" id="textoPaginasAEliminar" name="textoPaginasAEliminar" type='text' placeholder='Introduzca páginas a eliminar' data-langlocation='miAlert,textoPaginasAEliminar' data-langmod='placeholder' data-langactual='es'>
					<p id="textoPaginasAEliminarMensajeCorreccion" data-langlocation='miAlert,formatoIncorrecto' data-langmod='html' data-langactual='es' style="display:none;">El formato del texto es incorrecto.</p>
					<p data-langlocation='miAlert,pExplicaciontextoPaginasAEliminar' data-langmod='html' data-langactual='es'>Separe por comas ',' las páginas y los rangos de página que desee eliminar. Los rangos se escriben separados por guion '-'. Ejemplo: '1,3-5,8' En este ejemplo se eliminarán las páginas 1,3,4,5 y 8</p>
				`,
							"",
							"ventanaMiConfirm",
							() => {
								if (OBJ_CONTROL_PAGINAS_F2_2.comprobarStringConPaginas(document.getElementById("textoPaginasAEliminar").value)) {
									OBJ_CONTROL_PAGINAS_F2_2.eliminarVariasPaginasYReordenarPaginas(document.getElementById("textoPaginasAEliminar").value);
									OBJ_PIZARRA2.borrarPizarraYLineasGuardadas();
									document.getElementById("modalMiAlert").remove();
									actualizarHabilitacionBotonesMenusRapidos();
								}

								else {
									document.getElementById("textoPaginasAEliminarMensajeCorreccion").style.display = "block";
								}
							},
							() => { },
							false,
							() => { cambiarIdioma(langActual); });

						document.getElementById("textoPaginasAEliminar").removeEventListener("input", (event) => OBJ_CONTROL_PAGINAS_F2_2.validarCaracterPaginasAEliminar(event));
						document.getElementById("textoPaginasAEliminar").addEventListener("input", (event) => OBJ_CONTROL_PAGINAS_F2_2.validarCaracterPaginasAEliminar(event));
					}
				}
				break;
			case "botonBarraConfigPDF2MostrarOcultarPizarra":
				{
					setToggleValoresCSS(PIZARRA2_CANVAS, "display", ["block", "none"]);
					OBJ_PIZARRA2.redimensionarPizarra();
					if (getValorCSS2(PIZARRA2_CANVAS, "display") != "none") {
						anadirQuitarClass(document.getElementById('botonBarraConfigPDF2MostrarOcultarPizarra'), "botonActivo", 0);
						if (FASE2TEST.querySelectorAll(".paginaContenedorPDF2EnImagenes .botonCerrarPagina").length > 0) {
							OBJ_CONTROLADOR_CSS.eliminarRegla("botonCerrarPaginaC2F2");
						}
						if (modoTouch) {
							setToggleValoresCSS(FASE2TEST.querySelectorAll("#ContenedorPDF2 .divScrollingPDF"), "display", "block");
						}
					}

					else {
						anadirQuitarClass(document.getElementById('botonBarraConfigPDF2MostrarOcultarPizarra'), "botonActivo", 1);
						setToggleValoresCSS(FASE2TEST.querySelectorAll("#ContenedorPDF2 .divScrollingPDF"), "display", "none");
						if (FASE2TEST.querySelectorAll(".paginaContenedorPDF2EnImagenes .botonCerrarPagina").length > 0) {
							OBJ_CONTROLADOR_CSS.crearSustituirRegla("botonCerrarPaginaC2F2", `#ContenedorPDF2EnImagenes .botonCerrarPagina{display:block;}`);
						}
					}
					OBJ_PIZARRA2.repintarLineas();
				}
				break;
			case "botonBarraConfigPDF2BorrarPizarra":
				{
					OBJ_PIZARRA2.borrarPizarraYLineasGuardadas();
				}
				break;
			case "botonBarraConfigPDF2ColorPincel":
				{
					document.getElementById('colorPincel2').click();
				}
				break;
			case "botonBarraConfigPDF2Borrador":
				{
					document.getElementById('borradorPincel2').click();
				}
				break;
			case "borradorPincel2":
				{
					OBJ_PIZARRA2.modoBorrador();
					anadirQuitarClass(document.getElementById("botonBarraConfigPDF2Borrador"), "botonActivo");
				}
				break;
			default:
				break;
		}
	});

	document.getElementById('colorPincel2').addEventListener('input', (e) => {
		OBJ_PIZARRA2.setColorTrazo(e.target.value);
	});

	document.getElementById("file-open5").addEventListener("input", (e) => {
		if (e.target.files[0] != null) {
			cargandoPDFDesdeElInput = "file-open5";
			OBJ_CONTROL_INPUT_ARCHIVOS.onInputFiles(e.target.files, ["ContenedorPDF2EnImagenes"], FASE2TEST.querySelector('#file-open5AdicionCheckbox').checked);
			OBJ_PIZARRA2.borrarPizarraYLineasGuardadas();
			document.getElementById("inputTextPaginaSeleccionadaPDF2").value = 1;
			e.target.value = "";
		}
	});
}

function crearEventListenerBotonesBarraConfig()
{
	document.getElementById("barraConfigContenedorPDFs").addEventListener('click', (e) =>
	{
		switch (e.target.id)
		{
			case "botonBarraVerticalConfigPDF1OcultarMostrar":
			{
				setToggleValoresCSS(CONTENEDOR_PDF1, 'display', ['block', 'none']);

				if(getValorCSS2(CONTENEDOR_PDF1, 'display')!='none' || getValorCSS2(CONTENEDOR_PDF2, 'display')!='none')
				{
					CONTENEDOR_PDFS.style.display='flex';
				}
				else
				{
					CONTENEDOR_PDFS.style.display='none';
				}

				actualizarBotonesActivosBarraIzq();
				adaptarContenedoresPDF();
				mostrarLaBarraDimensionadoraAdecuada();
				mostrarOcultarBotonesBarraConfigContenedorPDFs();
				actualizarHabilitacionBotonesPDF();
				centrarScrollHorizontal(CONTENEDOR_PDF1_Y_PIZARRA);
			}
			break;
			case "botonBarraVerticalConfigPDF2OcultarMostrar":
			{
				setToggleValoresCSS(CONTENEDOR_PDF2, 'display', ['block', 'none']);

				if(getValorCSS2(CONTENEDOR_PDF1, 'display')!='none' || getValorCSS2(CONTENEDOR_PDF2, 'display')!='none')
				{
					CONTENEDOR_PDFS.style.display='flex';
				}
				else
				{
					CONTENEDOR_PDFS.style.display='none';
				}

				actualizarBotonesActivosBarraIzq();
				adaptarContenedoresPDF();
				mostrarLaBarraDimensionadoraAdecuada();
				mostrarOcultarBotonesBarraConfigContenedorPDFs();
				actualizarHabilitacionBotonesPDF();
				centrarScrollHorizontal(CONTENEDOR_PDF2_Y_PIZARRA);
			}
			break;
			case "botonBarraVerticalConfigPDFmostrarOcultarContenedorTestYModal":
			{
				const ANADIR_QUITAR_RSP=document.getElementById("botonBarraVerticalConfigPDFmostrarOcultarAnadirQuitarRsp");
				setToggleValoresCSS(CONTENEDOR_TEST_Y_MODAL, 'display', ['none','flex']);
				anadirQuitarClass(document.getElementById(e.target.id),"botonActivo",2);
				mostrarOcultarBotonesBarraConfigContenedorPDFs();
				if(getValorCSS2(CONTENEDOR_TEST_Y_MODAL, "display") != "none")
				{
					ANADIR_QUITAR_RSP.setAttribute("data-disabled","false");
					setRemoveAtributo(ANADIR_QUITAR_RSP, "disabled", 0);
				}
				else
				{
					ANADIR_QUITAR_RSP.setAttribute("data-disabled","true");
					setRemoveAtributo(ANADIR_QUITAR_RSP, "disabled", 1);
				}
			}
			break;
			case "botonBarraVerticalConfigPDFmostrarOcultarAnadirQuitarRsp":
			{
				if(e.target.getAttribute("data-disabled")!="true")
				{
					OBJ_CONTROLADOR_CSS.toggleRegla("botonMasMenosRsp_MostrarOcultar",".botonMasMenosRsp{display:table-cell;}")
					anadirQuitarClass(e.target,"botonActivo",2);
				}
			}
			break;
			case "botonConfigPDFsActivarDesactivarModoNoche":
			{
				if(e.target.dataset.disabled!="true")
				{
					if(FASE2TEST.querySelector('.contenidoPaginasContenedorPDF1EnImagenes') != null)
					{
						OBJ_CONTROLADOR_CSS.toggleRegla("contenedor1F2InvertirColores",".contenidoPaginasContenedorPDF1EnImagenes {filter: invert(1);}");
					}

					if(FASE2TEST.querySelector('.contenidoPaginasContenedorPDF2EnImagenes') != null)
					{
						OBJ_CONTROLADOR_CSS.toggleRegla("contenedor2F2InvertirColores",".contenidoPaginasContenedorPDF2EnImagenes {filter: invert(1);}");
					}
			
					if(FASE2TEST.querySelector('.contenidoPaginasContenedorPDF1EnImagenes') != null)
					{
						if(!OBJ_CONTROLADOR_CSS.existeRegla("contenedor1F2InvertirColores"))
						{
							anadirQuitarClass(document.getElementById("botonBarraConfigPDF1ActivarDesactivarModoNoche"), "botonActivo",0);
						}
						else
						{
							anadirQuitarClass(document.getElementById("botonBarraConfigPDF1ActivarDesactivarModoNoche"), "botonActivo",1);
						}
					}
				
					if(FASE2TEST.querySelector('.contenidoPaginasContenedorPDF2EnImagenes') != null)
					{
						if(!OBJ_CONTROLADOR_CSS.existeRegla("contenedor2F2InvertirColores"))
						{
							anadirQuitarClass(document.getElementById("botonBarraConfigPDF2ActivarDesactivarModoNoche"), "botonActivo",0);
						}
						else
						{
							anadirQuitarClass(document.getElementById("botonBarraConfigPDF2ActivarDesactivarModoNoche"), "botonActivo",1);
						}
					}
				}
			}
			break;
			case "botonBarraHorizontalConfigPDF1CambiarOrientacion":
			{
				cambiarDisposicionPDFs();
				adaptarContenedoresPDF();
				mostrarLaBarraDimensionadoraAdecuada();
				actualizarHabilitacionBotonesPDF();
			}
			break;
			default:
			break;
		}
	});
}

function crearListenerPrecerrado()
{
	window.addEventListener('beforeunload', (e) =>
	{
		if(!testGuardado && !preguntadoSiSalir)
		{
			e.preventDefault();
			e.returnValue = 'No has guardado tu resultado, ¿seguro que quieres salir?';
		}
	});
}

function crearEventListenerContenidoContenedorTest()
{
	const apuntePreguntaInputTextList = FASE2TEST.getElementsByClassName("apuntePreguntaInputText");
	for (let i = 0; i < apuntePreguntaInputTextList.length; i++)
	{
		apuntePreguntaInputTextList[i].addEventListener("blur", (e) =>
		{
			const NUM_PREG_REAL = e.target.dataset.numpreg;
			document.getElementById("apuntePreguntaP" + NUM_PREG_REAL).innerHTML = e.target.value;
			const TD_BOLI = document.getElementById("botonMostrarOcultarApunte" + NUM_PREG_REAL);
			if (e.target.value.length > 0)
			{
				TD_BOLI.innerHTML = "a";
			}
			else
			{
				TD_BOLI.innerHTML = "🖊️";
			}
		});
	}

	document.getElementById('contenedorTest-preguntasSinTextArea').addEventListener('click', (e) =>
	{
		switch (true)
		{
			case e.target.classList.contains("respuesta"):
			{
				alternarRellenoRsp(e.target.id);
			}
			break;
			case e.target.classList.contains("pregunta"):
			{
				if(modoCorregir)
				{
					setToggleClass(e.target, ['respuestaCorrecta','respuestaIncorrecta', 'sinClass']);
					if (e.target.classList.contains('respuestaCorrecta') || e.target.classList.contains('respuestaIncorrecta'))
					{
						e.target.classList.add('relleno');
					}
					else
					{
						e.target.classList.remove('relleno');
					}
				}
				else
				{
					setToggleClass(e.target, ['preguntaSinMarcar', 'preguntaDudosa', 'preguntaMalFormulada', 'preguntaAnulada']);
				}
			}
			break;
			case e.target.classList.contains("botonMostrarOcultarApunte"):
			{
				mostrarOcultarApuntes(getLastNumbers(e.target.id));
			}
			break;
			case e.target.classList.contains("anadirRsp"):
			{
				const FILAPREG=e.target.closest('.filaPreg');
				const RSP_FILA_PREG=FILAPREG.getElementsByClassName("respuesta");
				if(RSP_FILA_PREG.length<27)
				{
					const LETRA_NUEVA=ABECEDARIO[RSP_FILA_PREG.length];
					const ULTIMA_RSP=RSP_FILA_PREG[RSP_FILA_PREG.length-1];
					const NUM_FILA_PREGUNTA=FILAPREG.dataset.filapreg;
					const TD_NUEVO=`<td id="${NUM_FILA_PREGUNTA}${LETRA_NUEVA}" class="sinRellenar respuestaSinCorregir respuesta respuesta${NUM_FILA_PREGUNTA}">${LETRA_NUEVA}</td>`;
					// Crear un elemento temporal para contener el nuevo td
					const TEMP_TR = document.createElement('tr');
					TEMP_TR.innerHTML = TD_NUEVO;
					const NUEVO_TD = TEMP_TR.firstChild;
					if(getValorCSS2(FILAPREG.querySelector(".tdApunte"),"display")!="none")
					{
						NUEVO_TD.style.display="none";
					}
					// Insertar el nuevo td después del último td con la clase respuesta
					ULTIMA_RSP.parentNode.insertBefore(NUEVO_TD, ULTIMA_RSP.nextSibling);
					FILAPREG.querySelector(".tdApunte").setAttribute("colspan",FILAPREG.getElementsByClassName("respuesta").length);
					mostrarMensajeCentrado(LETRA_NUEVA, 500);
					actualizarRspRellenarTrParaTdApunte();
				}
			}
			break;
			case e.target.classList.contains("quitarRsp"):
			{
				const FILAPREG=e.target.closest('.filaPreg');
				const RSP_FILA_PREG=FILAPREG.getElementsByClassName("respuesta");
				if(RSP_FILA_PREG.length>2)
				{
					const ULTIMA_RSP=RSP_FILA_PREG[RSP_FILA_PREG.length-1];
					ULTIMA_RSP.remove();
					FILAPREG.querySelector(".tdApunte").setAttribute("colspan",FILAPREG.getElementsByClassName("respuesta").length);
	
					mostrarMensajeCentrado(ABECEDARIO[FILAPREG.getElementsByClassName("respuesta").length-1], 500);
					actualizarRspRellenarTrParaTdApunte();
				}
			}
			break;
			case e.target.id=="btnAnadirPregunta":
			{
				const FILA_PREGS=FASE2TEST.getElementsByClassName("filaPreg");
				const ULTIMA_FILA_PREG=(FILA_PREGS[FILA_PREGS.length-1]);
				const NUEVO_NUMERO_VISIBLE_PREGUNTA=parseInt(ULTIMA_FILA_PREG.querySelector(".pregunta").innerHTML)+1;
				const NUEVO_NUMERO_PREGUNTA=parseInt(ULTIMA_FILA_PREG.dataset.filapreg)+1;
				const NUMERO_ALTERNATIVAS=ULTIMA_FILA_PREG.getElementsByClassName("respuesta").length;
	
				let nuevoFilaPreg=
				`<tr id="filaPreg${NUEVO_NUMERO_PREGUNTA}" data-filaPregVisible="${NUEVO_NUMERO_VISIBLE_PREGUNTA}" data-filaPreg="${NUEVO_NUMERO_PREGUNTA}" class="filaPreg">
					<td class="botonMasMenosRsp">
						<div class="contenedorBotonMasMenosRsp">
							<input type="button" value="+" class="anadirRsp">
							<input type="button" value="-" class="quitarRsp">
						</div>
					</td>
					<td id="${NUEVO_NUMERO_PREGUNTA}preg" class="pregunta preguntaSinMarcar" title="Cliquéame para cambiar color de fondo representativo de pregunta dudosa o pregunta erróneamente formulada" data-langlocation="2,test,pregunta" data-langmod="title" data-langactual="es">${NUEVO_NUMERO_VISIBLE_PREGUNTA}</td>`;
					for (let k = 0; k < NUMERO_ALTERNATIVAS; k++)
					{
						nuevoFilaPreg+=`<td id="${NUEVO_NUMERO_PREGUNTA}${ABECEDARIO[k]}" class="sinRellenar respuestaSinCorregir respuesta respuesta${NUEVO_NUMERO_PREGUNTA}">${ABECEDARIO[k]}</td>`;
					}
					nuevoFilaPreg +=`<td id="tdApunte${NUEVO_NUMERO_PREGUNTA}" class="tdApunte" name="oculto" colspan="${NUMERO_ALTERNATIVAS}"><input placeholder="Apunte individual de pregunta" type="text" id="apuntePregunta${NUEVO_NUMERO_PREGUNTA}" class="apuntePreguntaInputText noCorregible" data-numpreg="${NUEVO_NUMERO_PREGUNTA}" data-langlocation="2,test,phapunteindividual" data-langmod="placeholder" data-langactual="es"><p id="apuntePreguntaP${NUEVO_NUMERO_PREGUNTA}" class="apuntePreguntaP"></p></td>
					<td class="botonMostrarOcultarApunte" id="botonMostrarOcultarApunte${NUEVO_NUMERO_PREGUNTA}" title="Cliquéame para mostrar u ocultar la barra de texto de apuntes" data-langlocation="2,test,boli" data-langmod="title" data-langactual="es">🖊️</td>
				</tr>`;
				
				//Creamos un temporal para convertir a elemento el string creado
				const TEMP_TBODY = document.createElement('tbody');
				TEMP_TBODY.innerHTML = nuevoFilaPreg;
				const NUEVO_FILA_PREG2 = TEMP_TBODY.firstChild;
	
				//Insertamos después del último tr
				ULTIMA_FILA_PREG.parentNode.insertBefore(NUEVO_FILA_PREG2, ULTIMA_FILA_PREG.nextSibling);
	
				//Traducimos
				cambiarIdioma(langActual);
	
				//Movemos scroll abajo para mayor comodidad de seguir añadiendo
				const CONTENEDOR_CON_SCROLL=document.getElementById("contenedorTest-preguntasSinTextArea");
				CONTENEDOR_CON_SCROLL.scrollTop = CONTENEDOR_CON_SCROLL.scrollHeight;

				mostrarMensajeCentrado(NUEVO_NUMERO_VISIBLE_PREGUNTA);
			}
			break;
			case e.target.id=="btnQuitarPregunta":
			{	
				const FILA_PREGS=FASE2TEST.getElementsByClassName("filaPreg");
				if(FILA_PREGS.length>1)
				{
					(FILA_PREGS[FILA_PREGS.length-1]).remove();
				}
				const ULTIMA_FILA_PREG=(FILA_PREGS[FILA_PREGS.length-1]);
				const NUEVO_NUMERO_VISIBLE_PREGUNTA=parseInt(ULTIMA_FILA_PREG.querySelector(".pregunta").innerHTML);
				mostrarMensajeCentrado(NUEVO_NUMERO_VISIBLE_PREGUNTA);
				actualizarRspRellenarTrParaTdApunte();
			}
			break;
		}
	});
}

function crearEventListenerPestanaContenedor()
{
	PDF_TOOLS_TAB_PANEL.addEventListener("click",
	(e) =>
	{
		switch(e.target.id)
		{
			case "mostrarOcultarPDF":
			{
				if(PDF_SELECT.value=="contenedorPDFs")
				{
					setToggleValoresCSS(CONTENEDOR_PDF1, 'display', ['block','none']);
					setToggleValoresCSS(CONTENEDOR_PDF2, 'display', ['block','none']);
				}
				else
				{
					setToggleValoresCSS(document.getElementById(PDF_SELECT.value), 'display', ['block','none']);
				}

				adaptarContenedoresPDF();

				actualizarBotonesActivosBarraIzq();
				redimensionarSegunOrientacionVertical();
				mostrarLaBarraDimensionadoraAdecuada();
				mostrarOcultarBotonesBarraConfigContenedorPDFs();
				actualizarHabilitacionBotonesPDF();

				if(PDF_SELECT.value=="ContenedorPDF1")
				{
					centrarScrollHorizontal(CONTENEDOR_PDF1_Y_PIZARRA);
				}
				else if(PDF_SELECT.value=="ContenedorPDF2")
				{
					centrarScrollHorizontal(CONTENEDOR_PDF2_Y_PIZARRA);
				}
				else
				{
					centrarScrollHorizontal(CONTENEDOR_PDF1_Y_PIZARRA);
					centrarScrollHorizontal(CONTENEDOR_PDF2_Y_PIZARRA);
				}
			}
			break;
			case "activarDesactivarModoNoche":
			{
				switch (PDF_SELECT.value)
				{
					case "ContenedorPDF1":
					{
						if(FASE2TEST.querySelector('.paginaContenedorPDF1EnImagenes') != null)
						{
							OBJ_CONTROLADOR_CSS.toggleRegla("contenedor1F2InvertirColores",".contenidoPaginasContenedorPDF1EnImagenes {filter: invert(1);}");
						}
					}
					break;
					case "ContenedorPDF2":
					{
						if(FASE2TEST.querySelector('.paginaContenedorPDF2EnImagenes') != null)
						{
							OBJ_CONTROLADOR_CSS.toggleRegla("contenedor2F2InvertirColores",".contenidoPaginasContenedorPDF2EnImagenes {filter: invert(1);}");
						}
					}
					break;
					case "contenedorPDFs":
					{
						if(FASE2TEST.querySelector('.paginaContenedorPDF1EnImagenes') != null)
						{
							OBJ_CONTROLADOR_CSS.toggleRegla("contenedor1F2InvertirColores",".contenidoPaginasContenedorPDF1EnImagenes {filter: invert(1);}");
						}

						if(FASE2TEST.querySelector('.paginaContenedorPDF2EnImagenes') != null)
						{
							OBJ_CONTROLADOR_CSS.toggleRegla("contenedor2F2InvertirColores",".contenidoPaginasContenedorPDF2EnImagenes {filter: invert(1);}");
						}
					}
					break;
				}

				if(FASE2TEST.querySelector('.paginaContenedorPDF1EnImagenes') != null)
				{
					if(!OBJ_CONTROLADOR_CSS.existeRegla("contenedor1F2InvertirColores"))
					{
						anadirQuitarClass(document.getElementById("botonBarraConfigPDF1ActivarDesactivarModoNoche"), "botonActivo",0);
					}
					else
					{
						anadirQuitarClass(document.getElementById("botonBarraConfigPDF1ActivarDesactivarModoNoche"), "botonActivo",1);
					}
				}
		
				if(FASE2TEST.querySelector('.paginaContenedorPDF2EnImagenes') != null)
				{
					if(!OBJ_CONTROLADOR_CSS.existeRegla("contenedor2F2InvertirColores"))
					{
						anadirQuitarClass(document.getElementById("botonBarraConfigPDF2ActivarDesactivarModoNoche"), "botonActivo",0);
					}
					else
					{
						anadirQuitarClass(document.getElementById("botonBarraConfigPDF2ActivarDesactivarModoNoche"), "botonActivo",1);
					}
				}
			}
			break;
			case "borrador":
			{
				const SELECCIONADO_TEMP=PDF_SELECT.value;
				if(SELECCIONADO_TEMP=='ContenedorPDF1')
				{
					OBJ_PIZARRA1.modoBorrador();
					anadirQuitarClass(document.getElementById("botonBarraConfigPDF1Borrador"),"botonActivo");
				}
				else if(SELECCIONADO_TEMP=='ContenedorPDF2')
				{
					OBJ_PIZARRA2.modoBorrador();
					anadirQuitarClass(document.getElementById("botonBarraConfigPDF2Borrador"),"botonActivo");
				}
				else
				{
					OBJ_PIZARRA1.modoBorrador();
					OBJ_PIZARRA2.modoBorrador();
					anadirQuitarClass(document.getElementById("botonBarraConfigPDF1Borrador"),"botonActivo");
					anadirQuitarClass(document.getElementById("botonBarraConfigPDF2Borrador"),"botonActivo");
				}
			}
			break;
			case "botonColorPincel":
			{
				document.getElementById('colorPincel').click();
			}
			break;
			case "rotarPaginas":
			{
				const SELECCIONADO_TEMP=PDF_SELECT.value;
				if(SELECCIONADO_TEMP=='ContenedorPDF1')
				{
					OBJ_TOOL_BOTONES_PAGINACION.rotarTodasPaginas("ContenedorPDF1EnImagenes", "contenidoPagina");
				}
				else if(SELECCIONADO_TEMP=='ContenedorPDF2')
				{
					OBJ_TOOL_BOTONES_PAGINACION.rotarTodasPaginas("ContenedorPDF2EnImagenes", "contenidoPagina");
				}
				else
				{
					OBJ_TOOL_BOTONES_PAGINACION.rotarTodasPaginas("ContenedorPDF1EnImagenes", "contenidoPagina");
					OBJ_TOOL_BOTONES_PAGINACION.rotarTodasPaginas("ContenedorPDF2EnImagenes", "contenidoPagina");
				}
			}
			break;
			case "botonInputFile3Adicion":
			{
				if(e.target.dataset.disabled=="false")
				{
					anadirQuitarClass(e.target, "botonActivo", 2);
					FASE2TEST.querySelector('#file-open3AdicionCheckbox').checked = !FASE2TEST.querySelector('#file-open3AdicionCheckbox').checked;
			
					if(e.target.classList.contains("botonActivo"))
					{
						e.target.querySelector("p").textContent="📄+📄";
					}
					else
					{
						e.target.querySelector("p").textContent="❌+📄";
					}
				}
			}
			break;
		}
	});

	document.getElementById("colorPincel").addEventListener("input", (e) =>
	{
		const SELECCIONADO_TEMP=PDF_SELECT.value;
		if(SELECCIONADO_TEMP=='ContenedorPDF1')
		{
			OBJ_PIZARRA1.setColorTrazo(e.target.value);
		}
		else if(SELECCIONADO_TEMP=='ContenedorPDF2')
		{
			OBJ_PIZARRA2.setColorTrazo(e.target.value);
		}
		else
		{
			OBJ_PIZARRA1.setColorTrazo(e.target.value);
			OBJ_PIZARRA2.setColorTrazo(e.target.value);
		}
	});

	document.getElementById("file-open3").addEventListener("input",
	(e) =>
	{
		if(e.target.files[0]!=null)
		{
			cargandoPDFDesdeElInput="file-open3";
			cargandoPDFPara=PDF_SELECT.value;
			if(PDF_SELECT.value=="contenedorPDFs")
			{
				OBJ_CONTROL_INPUT_ARCHIVOS.onInputFiles(e.target.files, ['ContenedorPDF1EnImagenes','ContenedorPDF2EnImagenes'], FASE2TEST.querySelector('#file-open3AdicionCheckbox').checked);
			}
			else
			{
				OBJ_CONTROL_INPUT_ARCHIVOS.onInputFiles(e.target.files, [cargandoPDFPara+'EnImagenes'], FASE2TEST.querySelector('#file-open3AdicionCheckbox').checked);
			}
			e.target.value="";

			setTimeout(
				() =>
				{
					if(cargandoPDFPara=="ContenedorPDF1")
					{
						OBJ_PIZARRA1.borrarPizarraYLineasGuardadas();
						document.getElementById("inputTextPaginaSeleccionadaPDF1").value=1;
					}
					else if((cargandoPDFPara=="ContenedorPDF2"))
					{
						OBJ_PIZARRA2.borrarPizarraYLineasGuardadas();
						document.getElementById("inputTextPaginaSeleccionadaPDF2").value=1;
					}
					else if((cargandoPDFPara=="contenedorPDFs"))
					{
						OBJ_PIZARRA1.borrarPizarraYLineasGuardadas();
						document.getElementById("inputTextPaginaSeleccionadaPDF1").value=1;
						OBJ_PIZARRA2.borrarPizarraYLineasGuardadas();
						document.getElementById("inputTextPaginaSeleccionadaPDF2").value=1;
					}
				}
				,1500
			);
		}
	});

	PDF_SELECT.addEventListener("change", () =>
		actualizarHabilitacionBotonesPDF()
	);

	SELECT_DEFORMAR_PDF.addEventListener("change", () =>
		actualizarHabilitacionBotonesPDF()
	);
}

function crearEventListenerPestanaOpciones()
{
	MAS_ACCIONES_TAB_PANEL.addEventListener("click", (e) =>
	{
		switch(e.target.id)
		{
			case "botonMostrarOcultarPestanaContenedor":
			{
				mostrarOcultarPestanaContenedor();
			}
			break;
			case "botonDeseleccionar":
			{
				activarDesactivarModoDeseleccionar();
			}
			break;
			case "mostrarOcultarApuntes":
			{
				mostrarOcultarApuntes();
			}
			break;
			case "cambiarColores":
			{
				document.getElementById("modalConfigColores").style.display="flex";
			}
			break;
			case "botonTerminar":
			{
				OBJ_TEMPORIZADOR_TEST.finalizarTemporizador();
			}
			break;
			case "botonCorregir":
			{
				activarDesactivarModoCorregir(e.target);
			}
			break;
			case "botonEvaluar":
			{
				document.getElementById("modalOpcionesDeEvaluacion").style.display="flex";
				document.getElementById("botonPulsadoDeProcedencia").value="botonEvaluar";
			}
			break;
			case "guardarResultado":
			{
				document.getElementById("modalOpcionesDeEvaluacion").style.display="flex";
				document.getElementById("botonPulsadoDeProcedencia").value="guardarResultado";
			}
			break;
			case "reiniciarWeb":
			{
				eliminarCookies();
				preguntadoSiSalir=true;
				if(!testGuardado)
				{
					OBJ_TOOL_ALERT.mostrarConfirm("<div data-langlocation='miAlert,tituloNuevotest' data-langmod='html' data-langactual='es'>Nuevo test</div>", "<div data-langlocation='miAlert,nuevotest1' data-langmod='html' data-langactual='es'>¡Ojo! el resultado del test no ha sido guardado, pulsa -Aceptar- para nuevo test</div>","","ventanaMiConfirm",()=>{reiniciarWeb();}, ()=>{preguntadoSiSalir=false;}, true, ()=>{cambiarIdioma(langActual)});
				}
				else
				{
					OBJ_TOOL_ALERT.mostrarConfirm("<div data-langlocation='miAlert,tituloNuevotest' data-langmod='html' data-langactual='es'>Nuevo test</div>", "<div data-langlocation='miAlert,nuevotest2' data-langmod='html' data-langactual='es'>¿Seguro que quiere salir y configurar un nuevo test?</div>","","ventanaMiConfirm",()=>{reiniciarWeb();}, ()=>{preguntadoSiSalir=false;},true, ()=>{cambiarIdioma(langActual)});
				}
			}
			break;
		}
	});
}

function crearEventListenerOpcionesBasicas()
{
	document.getElementById("datos").addEventListener("click", (e) =>
	{
		switch(e.target.id)
		{
			case "mostrarOcultarPizarra":
			{
				if(getValorCSS2(PIZARRA1_CANVAS, "display") != "none")
				{
					anadirQuitarClass(document.getElementById('botonBarraConfigPDF1MostrarOcultarPizarra'),"botonActivo",1);
					PIZARRA1_CANVAS.style.display='none';
				}
				else
				{
					OBJ_PIZARRA1.repintarLineas();
					anadirQuitarClass(document.getElementById('botonBarraConfigPDF1MostrarOcultarPizarra'),"botonActivo",0);
					PIZARRA1_CANVAS.style.display='block';
				}
			
				if(getValorCSS2(PIZARRA2_CANVAS,"display")!="none")
				{
					anadirQuitarClass(document.getElementById('botonBarraConfigPDF2MostrarOcultarPizarra'),"botonActivo",1);
					PIZARRA2_CANVAS.style.display='none';
				}
				else
				{
					OBJ_PIZARRA2.repintarLineas();
					anadirQuitarClass(document.getElementById('botonBarraConfigPDF2MostrarOcultarPizarra'),"botonActivo",0);
					PIZARRA2_CANVAS.style.display='block';
				}
			}
			break;
			case "resetearPizarra":
			{
				OBJ_PIZARRA1.borrarPizarraYLineasGuardadas();
				OBJ_PIZARRA2.borrarPizarraYLineasGuardadas();
			}
			break;
			case "cambiarOrientacion":
			{
				cambiarDisposicionPDFs();
				adaptarContenedoresPDF();
				mostrarLaBarraDimensionadoraAdecuada();
			}
			break;
			case "botonPausarContinuarTiempos":
			{
				pauseContinuar();
			}
			break;
			case "reiniciarTiempos":
			{
				OBJ_TOOL_ALERT.mostrarConfirm("<div data-langlocation='miAlert,tituloReiniciarTiempos' data-langmod='html' data-langactual='es'>Reiniciar tiempos</div>",
				"<div data-langlocation='miAlert,tituloReiniciarTiemposSeguro' data-langmod='html' data-langactual='es'>¿Estás seguro de reiniciar tiempos?</div>",
				"",
				"ventanaMiConfirm",
				()=>{
					OBJ_TEMPORIZADOR_TEST.reiniciarTemporizador();
					OBJ_CRONOMETRO_TEST.reiniciarCronometro();
					document.getElementById('botonPausarContinuarTiempos').style.background='var(--color-fondoBotones)';
					document.getElementById('botonPausarContinuarTiempos').value='⏸︎';
					anadirQuitarClass(document.getElementById('botonPausarContinuarTiempos'),"botonActivo",0);
					haciendoTest=true;
					modoRellenarFueraDeTiempo=false;
				},
				()=>{},
				true,
				()=>{cambiarIdioma(langActual)});
			}
			break;
		}
	});
}

document.getElementById("apunteGeneralTextarea").addEventListener("blur", (e) =>
{
    document.getElementById(`apunteGeneralP`).innerHTML = e.target.value;
});

Array.from(FASE1CONFIGURACION.getElementsByClassName("bandera")).forEach((elemento) =>
{
    elemento.addEventListener("click", (event) =>
    {
        cambiarIdioma(event.currentTarget.dataset.idioma);
		OBJ_TOOL_ALERT.idioma=langActual;
    });
});

//	divScrollingPDF
		let lastY;
		let lastX;
		let temporizadorActualizarLastY;
		let temporizadorActualizarLastX;

		function iniciarEventListenersDivScrollingPDFVTouch()
		{
			crearDobleTouchListenerParaScroll("divScrollingPDF1V", "ContenedorPDF1yPizarra", "vertical");
			crearDobleTouchListenerParaScroll("divScrollingPDF2V", "ContenedorPDF2yPizarra", "vertical");
			crearDobleTouchListenerParaScroll("divScrollingPDF1H", "ContenedorPDF1yPizarra", "horizontal");
			crearDobleTouchListenerParaScroll("divScrollingPDF2H", "ContenedorPDF2yPizarra", "horizontal");

			document.getElementById("divScrollingPDF1V").addEventListener('touchstart', (e) =>
			{
				lastY = e.touches[0].clientY;
				e.preventDefault();
			});
			document.getElementById("divScrollingPDF1V").addEventListener('touchmove', (e) =>
			{
				moverDivScrollingV(e, 'ContenedorPDF1yPizarra');
				OBJ_TOOL_BOTONES_PAGINACION.actualizarNumeroDelPaginador("ContenedorPDF1yPizarra", "inputTextPaginaSeleccionadaPDF1", "ContenedorPDF1EnImagenes", "paginaContenedorPDF1EnImagenes");
			});
			document.getElementById("divScrollingPDF2V").addEventListener('touchstart', (e) =>
			{
				lastY = e.touches[0].clientY;
				e.preventDefault();
			});
			document.getElementById("divScrollingPDF2V").addEventListener('touchmove', (e) =>
			{
				moverDivScrollingV(e, 'ContenedorPDF2yPizarra');
				OBJ_TOOL_BOTONES_PAGINACION.actualizarNumeroDelPaginador("ContenedorPDF2yPizarra", "inputTextPaginaSeleccionadaPDF2", "ContenedorPDF2EnImagenes", "paginaContenedorPDF2EnImagenes");
			});
		}

		function iniciarEventListenersDivScrollingPDFHTouch()
		{
			document.getElementById("divScrollingPDF1H").addEventListener('touchstart', (e) =>
			{
				if (e.touches.length === 1)
				{
					lastX = e.touches[0].clientX;
					e.preventDefault();
					temporizadorActualizarLastX = setTimeout(()=>
						moverDivScrollingH(e, 'ContenedorPDF1yPizarra')
					, 200); // Espera 200 milisegundos antes de activar el movimiento
				}
				else
				{
					clearTimeout(temporizadorActualizarLastX);
					temporizadorActualizarLastX=null;
				}
			});
			
			document.getElementById("divScrollingPDF1H").addEventListener('touchmove', (e) => {
				if (e.touches.length === 1 && temporizadorActualizarLastX)
				{
					clearTimeout(temporizadorActualizarLastX);
					temporizadorActualizarLastX=null;
					moverDivScrollingH(e, 'ContenedorPDF1yPizarra');
				}
			});
			
			document.getElementById("divScrollingPDF1H").addEventListener('touchend', () => {
				clearTimeout(temporizadorActualizarLastX);
				temporizadorActualizarLastX=null;
			});

			// Repite el mismo patrón para el otro div
			document.getElementById("divScrollingPDF2H").addEventListener('touchstart', (e) => {
				if (e.touches.length === 1)
				{
					lastX = e.touches[0].clientX;
					e.preventDefault();
					temporizadorActualizarLastX = setTimeout(() =>
						moverDivScrollingH(e, 'ContenedorPDF2yPizarra')
					, 200); // Espera 300 milisegundos antes de activar el movimiento
				}
				else
				{
					clearTimeout(temporizadorActualizarLastX);
					temporizadorActualizarLastX=null;
				}
			});
			
			document.getElementById("divScrollingPDF2H").addEventListener('touchmove', (e) => {
				if (e.touches.length === 1 && temporizadorActualizarLastX)
				{
					clearTimeout(temporizadorActualizarLastX);
					temporizadorActualizarLastX=null;
					moverDivScrollingH(e, 'ContenedorPDF2yPizarra');
				}
			});
			
			document.getElementById("divScrollingPDF2H").addEventListener('touchend', () => {
				clearTimeout(temporizadorActualizarLastX);
				temporizadorActualizarLastX=null;
			});
		}

/*
//Este modo deja la barra centrada en donde se dio el doble touch
		function crearDobleTouchListenerParaScroll(touchElementId, scrollElementId, scrollType)
		{
			let touchtime = 0;
			document.getElementById(touchElementId).addEventListener("touchstart", function(e)
			{
				if (touchtime == 0)
				{
					// set first click
					touchtime = new Date().getTime();
				}
				else
				{
					// compare first click to this click and see if they occurred within double click threshold
					if (((new Date().getTime()) - touchtime) < 800)
					{
						// double click occurred
						const SCROLL_ELEMENT = document.getElementById(scrollElementId);
						if (scrollType === 'vertical')
						{
							const TOUCH_POSITION = e.touches[0].clientY;
							const ELEMENT_POSITION = this.getBoundingClientRect().top;
							const RELATIVE_POSITION = TOUCH_POSITION - ELEMENT_POSITION;
							const CENTER_POSITION = RELATIVE_POSITION - this.clientHeight / 2; // Posición desde el centro
							const SCROLL_POSITION = (CENTER_POSITION / this.clientHeight) * SCROLL_ELEMENT.scrollHeight;
							SCROLL_ELEMENT.scrollTop = SCROLL_POSITION;
						}
						else if(scrollType === 'horizontal')
						{
							const TOUCH_POSITION = e.touches[0].clientX;
							const ELEMENT_POSITION = this.getBoundingClientRect().left;
							const RELATIVE_POSITION = TOUCH_POSITION - ELEMENT_POSITION;
							const CENTER_POSITION = RELATIVE_POSITION - this.clientWidth / 2; // Posición desde el centro
							const SCROLL_POSITION = (CENTER_POSITION / this.clientWidth) * SCROLL_ELEMENT.scrollWidth;
							SCROLL_ELEMENT.scrollLeft = SCROLL_POSITION;
						}
						touchtime = 0;
					}
					else
					{
						// not a double click so set as a new first click
						touchtime = new Date().getTime();
					}
				}
			});
		}
*/

		function crearDobleTouchListenerParaScroll(touchElementId, scrollElementId, scrollType)
		{
			//Centra hacia el principio de la barra móvil de scroll
			let touchtime = 0;
			document.getElementById(touchElementId).addEventListener("touchstart", (e) =>
			{
				if(e.touches.length===1)
				{
					if (touchtime == 0)
					{
						// set first click
						touchtime = new Date().getTime();
					}
					else
					{
						// compare first click to this click and see if they occurred within double click threshold
						if (((new Date().getTime()) - touchtime) < 800)
						{
							// double click occurred
							const SCROLL_ELEMENT = document.getElementById(scrollElementId);
							if (scrollType === 'vertical')
							{
								const TOUCH_POSITION = e.touches[0].clientY;
								const ELEMENT_POSITION = e.target.getBoundingClientRect().top;
								const RELATIVE_POSITION = TOUCH_POSITION - ELEMENT_POSITION;
								const SCROLL_POSITION = (RELATIVE_POSITION / e.target.clientHeight) * SCROLL_ELEMENT.scrollHeight;
								SCROLL_ELEMENT.scrollTop = SCROLL_POSITION;
							}
							else if(scrollType === 'horizontal')
							{
								const TOUCH_POSITION = e.touches[0].clientX;
								const ELEMENT_POSITION = e.target.getBoundingClientRect().left;
								const RELATIVE_POSITION = TOUCH_POSITION - ELEMENT_POSITION;
								const SCROLL_POSITION = (RELATIVE_POSITION / e.target.clientWidth) * SCROLL_ELEMENT.scrollWidth;
								SCROLL_ELEMENT.scrollLeft = SCROLL_POSITION;
							}
							touchtime = 0;
						}
						else
						{
							// not a double click so set as a new first click
							touchtime = new Date().getTime();
						}
					}
				}
			});
		}
//	/divScrollingPDF
//	Ventana evaluación
		document.getElementById("rangoPregAEvaluar").addEventListener("input", (event) => validarCaracterRangoPreguntas(event));

		FASE2TEST.querySelector(".modoIncorrectasEvaluacion").addEventListener("change", (e) =>
		{
			const SELECTED_OPTION_MODO_INCORRECTAS_EVALUACION = e.target.options[e.target.selectedIndex];
			const NAME_OPTION_MODO_INCORRECTAS_EVALUACION = SELECTED_OPTION_MODO_INCORRECTAS_EVALUACION.getAttribute('name');
			switch (NAME_OPTION_MODO_INCORRECTAS_EVALUACION)
			{
				case "3":
					numeroAlternativas = parseInt(document.getElementById("nAlternativas").value);
					document.getElementById("restanLasIncorrectas").value=(1/(numeroAlternativas-1)).toFixed(3);
					setRemoveAtributo(document.getElementById("restanLasIncorrectas"),"disabled",1);
				break;
				default:
					document.getElementById("restanLasIncorrectas").value=0;
					setRemoveAtributo(document.getElementById("restanLasIncorrectas"),"disabled",0);
				break;
			}
		});

		document.getElementById("restanLasIncorrectas").addEventListener("input", (event) => validarCaracterRestanIncorrectas(event));

		document.getElementById("continuarEvaluacion").addEventListener("click", () =>
		{
			const RANGO_PREG_A_EVALUAR=document.getElementById("rangoPregAEvaluar");

			if(comprobarDatosAEvaluar(RANGO_PREG_A_EVALUAR, restanLasIncorrectas))
			{
				//Recogemos las preguntas a evaluar
				let stringRangoPreguntas="1-"+numPregMax;
				let preguntasAEvaluar;
				if(RANGO_PREG_A_EVALUAR.value!="")
				{
					stringRangoPreguntas= RANGO_PREG_A_EVALUAR.value;
				}
				preguntasAEvaluar= traducirStringPregAEvaluarAArray(stringRangoPreguntas);
				const TRS_FILAS_PREGUNTAS=recogerPreguntasRequeridas(preguntasAEvaluar);

				//Averiguamos si procede de pulsar Evaluar o guardar resumen para proceder
				if(document.getElementById("botonPulsadoDeProcedencia").value=="botonEvaluar")
				{
					OBJ_TOOL_ALERT.mostrarAlert("<h3>Evaluación del test:</h3>",evaluar(TRS_FILAS_PREGUNTAS), "","ventanaMiAlert", ()=>{cambiarIdioma(langActual);});
				}
				else if(document.getElementById("botonPulsadoDeProcedencia").value=="guardarResultado")
				{
					let accionesAlAcabarBien;
					let accionesAlAcabarMal;
					if(isTerminalAndroid)
					{
						accionesAlAcabarBien=()=>{OBJ_TOOL_ALERT.mostrarAlert(TITULO_CONTENIDO_ALERT_GUARDADO_RESUMEN[langActual], CUERPO_CONTENIDO_ALERT_GUARDADO_RESUMEN_CORRECTO[langActual], "", "ventanaMiAlert")};
						accionesAlAcabarMal=()=>{OBJ_TOOL_ALERT.mostrarAlert(TITULO_CONTENIDO_ALERT_GUARDADO_RESUMEN[langActual], CUERPO_CONTENIDO_ALERT_GUARDADO_RESUMEN_FALLO[langActual], "", "ventanaMiAlert")};
					}
					guardarResumenTest(TRS_FILAS_PREGUNTAS, accionesAlAcabarBien, accionesAlAcabarMal);
					anadirQuitarClass(document.getElementById("guardarResultado"),"botonActivo",1);
					mostrarMensajeCentrado("💾");

				}
				document.getElementById("modalOpcionesDeEvaluacion").style.display="none";
			}
		});

		document.getElementById("cancelarEvaluacion").addEventListener("click", 
		() =>
			document.getElementById(`modalOpcionesDeEvaluacion`).style.display="none"
		);
//	/Ventana evaluación
//	Botonera Fase1
		document.getElementById("botoneraPDFFase1").addEventListener("click",
		(e) =>
		{
			switch(e.target.id)
			{
				case "botoneraPDFFase1-pestanas-pestana1":
				{
					document.getElementById("botoneraPDFFase1-contenidos-contenido2").style.display="none";
					document.getElementById("botoneraPDFFase1-contenidos-contenido1").style.display="block";
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana1"), "pestanaNoActiva", 0);
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana2"), "pestanaNoActiva", 1);
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana1"), "pestanaActiva", 1);
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana2"), "pestanaActiva", 0);
				}
				break;
				case "botoneraPDFFase1-pestanas-pestana2":
				{
					document.getElementById("botoneraPDFFase1-contenidos-contenido1").style.display="none";
					document.getElementById("botoneraPDFFase1-contenidos-contenido2").style.display="block";
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana1"), "pestanaActiva", 0);
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana2"), "pestanaActiva", 1);
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana1"), "pestanaNoActiva", 1);
					anadirQuitarClass(document.getElementById("botoneraPDFFase1-pestanas-pestana2"), "pestanaNoActiva", 0);
				}
				break;
			}
		});
//	/Botonera Fase1
//	Generales
		function addBackButtonListener()
		{
			document.addEventListener("backbutton",
			(e) =>
			{
				e.preventDefault();
				let elements = getVisibleElements(document.querySelectorAll("#modalInstrucciones, #visorImagenes, #modalOpcionesDeEvaluacion, #modalConfigColores, #modalMiAlert, #masAccionesTabPanel, #PDFToolsTabPanel"));
				if (elements.length > 0)
				{
					for(let pestana of document.getElementsByClassName("pestanaMenuFase2"))
					{
						pestana.dataset.abierto="false";
					}
					elements.forEach((element) =>
						element.style.display = "none"
					);
				}
				else
				{
					if(primerExitBackButton)
					{
						navigator.app.exitApp();
					}
					else
					{
						primerExitBackButton=true;
						setTimeout(() => primerExitBackButton=false, 1000);
					}
				}
			});
		}

		typeof cordova !== "undefined"
		? addBackButtonListener()
		: document.addEventListener("deviceready", addBackButtonListener);

		document.addEventListener("keydown",
		(e) =>
		{
			if (e.key === "Escape")
			{
				setToggleValoresCSS(document.querySelectorAll("#modalInstrucciones, #modalOpcionesDeEvaluacion, #modalConfigColores, #visorImagenes"),"display","none");
			}
		});

		let onresize;
		window.addEventListener("resize",
		() =>
		{
			clearTimeout(onresize);
			onresize=setTimeout(
			() =>
			{
				actualizarHabilitacionBotonesPDF();
				redimensionarSegunOrientacionVertical();
				mostrarLaBarraDimensionadoraAdecuada();
				mostrarOcultarBotonesBarraConfigContenedorPDFs();
			},300);
		});
//	/Generales
//	Cargar LocalStorage
		const contenidoLocalStorage=MiLocalStorage.obtenerTodasLasClavesYContenidos();
		if ("colores" in contenidoLocalStorage)
		{
			const colores=contenidoLocalStorage["colores"];
			for (let nombreVariableCSS in colores)
			{
				document.documentElement.style.setProperty(`--color-${nombreVariableCSS}`,  `${colores[nombreVariableCSS]}`);
			}

			if(MiLocalStorage.existeItem("colores","sombraTexto"))
			{
				const SOMBRA_TEXTO_OBTENIDA=MiLocalStorage.obtenerItem("colores","sombraTexto");
				const SOMBRA_TEXTO_COMPORTAMIENTOS =
				{
					"auto": () =>
					{
						sombrasTextoAutomaticas = true;
						comprobarSiElTextoBotonesDebeTenerSombraYSet();
					},
					"blanca": () =>
					{
						sombrasTextoAutomaticas = false;
						setSombraTextoBotones("rgb(255, 255, 255)");
					},
					"negra": () =>
					{
						sombrasTextoAutomaticas = false;
						setSombraTextoBotones("rgb(0, 0, 0)");
					},
					"nada": () =>
					{
						sombrasTextoAutomaticas = false;
						setSombraTextoBotones("");
					}
				};

				if (SOMBRA_TEXTO_COMPORTAMIENTOS.hasOwnProperty(SOMBRA_TEXTO_OBTENIDA))
				{
					SOMBRA_TEXTO_COMPORTAMIENTOS[SOMBRA_TEXTO_OBTENIDA]();
					document.getElementById("sombraTexto").value=SOMBRA_TEXTO_OBTENIDA;
				}
			}
			else if(sombrasTextoAutomaticas)
			{
				comprobarSiElTextoBotonesDebeTenerSombraYSet()
			}
		}
//	/Cargar LocalStorage

setToggleValoresAtributo(document.getElementsByClassName("botonInputFile"), "data-disabled", "false");

aplicarIdiomaAlInicio();

//Para saber si estamos en usando un touch o click y eliminar unos posibles innecesarios divScrollingPDF
//es un eventlistener de un solo uso
document.addEventListener('touchstart', touchOClick);
document.addEventListener('click', touchOClick);

//Lo siguiente siempre debe estar en el último archivo js que cargue
comprobarErrorCarga();