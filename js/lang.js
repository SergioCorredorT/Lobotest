function escaparScringHtml(_html)
{
    return _html.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
}

const TEXTO_CARGANDO=
{
    es: "Cargando",
    en: "Loading"
}

const TITULO_CONTENIDO_ALERT_GUARDADO_RESUMEN=
{
    es: "Guardado",
    en: "Saved"
}

const CUERPO_CONTENIDO_ALERT_GUARDADO_RESUMEN_CORRECTO=
{
    es: "Guardado en la carpeta descargas",
    en: "Saved in the downloads folder"
}

const CUERPO_CONTENIDO_ALERT_GUARDADO_RESUMEN_FALLO=
{
    es: "Error",
    en: "Error"
}

const DETAILS_AYUDA_RAPIDA_EN=
`
<details value='instruccionesRapidas' class='detailsInstrucciones detailsAyudaRapida'>
    <summary title='Click me to show or hide generic quick instructions'>Quick Instructions</summary>
    <ul>
        <li>
            <img src='img/help/en/F1.png' class='imgInstrucRapidas' alt='Image with instructions for the first screen'>
        </li>
        <li>
            <img src='img/help/en/F2_1.png' class='imgInstrucRapidas' alt='Image with instructions for the second screen part 1'>
        </li>
        <li>
            <img src='img/help/en/F2_2.png' class='imgInstrucRapidas' alt='Image with instructions for the second screen part 2'>
        </li>
    </ul>
</details>
`;

const DETAILS_AYUDA_RAPIDA_ES=
`
<details value='instruccionesRapidas' class='detailsInstrucciones detailsAyudaRapida'>
    <summary title='Cliquéame para mostrar u ocultar instrucciones rápidas genéricas'>Instrucciones rápidas</summary>
    <ul>
        <li>
            <img src='img/help/es/F1.png' class='imgInstrucRapidas' alt='Imagen con instrucciones de la primera pantalla'>
        </li>
        <li>
            <img src='img/help/es/F2_1.png' class='imgInstrucRapidas' alt='Imagen con instrucciones de la segunda pantalla parte 1'>
        </li>
        <li>
            <img src='img/help/es/F2_2.png' class='imgInstrucRapidas' alt='Imagen con instrucciones de la segunda pantalla parte 2'>
        </li>
    </ul>
</details>
`;

let fase1ConfigES=
`
${DETAILS_AYUDA_RAPIDA_ES}
<details value='Panel_izquierdo' class='detailsInstrucciones'>
    <summary title='Cliquéame para mostrar u ocultar instrucciones referentes al panel izquierda de la pantalla'>Panel izquierdo</summary>
    <h4>Explicación de botones y campos</h4>
    <ul>
        <li>Grupos de opciones según su posición respectiva en orden
            <ol>
                <li>Podrá seleccionar la bandera perteneciente al idioma que desee.</li>
                <li>Podrá configurar la forma de mostrar las columnas de las respuestas tras crear el test.</li>
                <li>Se encuentran los campos numéricos que determinarán el tiempo inicial del temporizador del test</li>
                <li>Encontrará un campo numérico que determinará la cantidad de alternativas con letra posibles de respuesta en el test</li>
                <li>Podrá instroducir el número total de preguntas</li>
                <li>Podrá introducir el número de la pregunta inicial del test, siendo las siguientes números consecutivos</li>
                <li>Campo de texto en el que podrá introducir el título del test, que también será usado como título de archivo si pulsa el botón 'Guardar test'</li>
            </ol>
        </li>
        <li>Los botones de la parte inferior conducen a la pantalla del test y a la pantalla de instrucciones respectivamente</li>
    </ul>
</details>
<details value='Panel derecho' class='detailsInstrucciones'>
<summary title='Cliquéame para mostrar u ocultar instrucciones referentes al panel derecho de la pantalla'>Panel derecho</summary>
    <h4>Partes</h4>
    <ul>
        <li>En la parte superior podrá seleccionar la pestaña correspondiente a cada previsualizador de archivo correspondiente a cada contenedor de archivo de la pantalla de test</li>
        <li>Inicialmente puede clicar en el contenido de cada pestaña vacío o en el botón 'Seleccionar archivo' para buscar un archivo PDF o de imagen para cargarlo</li>
    </ul>
    <h4>Gestos que puede hacer</h4>
    <ul>
        <li>Gestos de zoom
            <ul>
                <li>Shift + movimiento de ruleta: Con el cursor sobre un documento abierto hace zoom.</li>
                <li>Pinza táctil: Sobre las barras de scroll inferior hace zoom en el documento.</li>
            </ul>
        </li>
    </ul>
</details>
`;
fase1ConfigES=escaparScringHtml(fase1ConfigES);

let fase2PestanaContenedorES=
`
${DETAILS_AYUDA_RAPIDA_ES}
<details value='instruccionesControlesArchivo' class='detailsInstrucciones' open>
    <summary title='Cliquéame para mostrar u ocultar instrucciones referentes al panel de controles de archivos en contenedor'>Controles PDF</summary>
    <ul>
        <li>
            Explicación de botones según su orden
            <ol>
                <li>
                    Puede seleccionar uno de los 2 contenedores, primario o secundario, o el panel que contiene a ambos representado con la opción 'Panel'
                </li>
                <li>
                    Puede seleccionar la faceta a configurar respecto al contenedor seleccionado previamente
                </li>
                <li>
                    '+' Botón para aumentar la faceta seleccionada del contenedor seleccionado
                </li>
                <li>
                    '-' Botón para disminuir la faceta seleccionada del contenedor seleccionado
                </li>
                <li>
                    '👁' Botón para ocultar o mostrar el contenedor seleccionado
                </li>
                <li>
                    '◧' Botón para invertir colores del contenedor seleccionado
                </li>
                <li>
                    '<img style='width:20px;height:20px;' src='data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8='>'
                     Botón para activar o desactivar el modo borrador del contenedor seleccionado
                </li>
                <li>
                    '<img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>
                    <img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>'
                     Para borrar lo pintado sobre ambos contenedores
                </li>
                <li>
                    '🎨' Botón cambiar el color del pincel
                </li>
                <li>
                    '↷📄📄' Botón girar todas las páginas 90 grados
                </li>
                <li>
                    '📄' Botón para buscar y cargar un archivo en el contenedor seleccionado
                </li>
                <li>
                '❌+📄' '📄+📄' Un botón para activar el modo adición o sustitución. Estando activado, el botón de añadir archivo vecino, añadirá tal archivo al contenedor, si estuviera desactivado, el archivo nuevo sustituirá al previamente cargado
                </li>
                <li>
                    '🔃' Para cambiar la orientación de ambos contenedores a horizontal o vertical
                </li>
                <li>
                    '👁🖌' Para mostrar u ocultar lo pintado en ambos contenedores
                </li>
                <li>
                    '?' Botón para mostrar pantalla de instrucciones en referencia al panel de configuración de archivos
                </li>
            </ol>
        </li>
    </ul>
</details>
`;
fase2PestanaContenedorES=escaparScringHtml(fase2PestanaContenedorES);

let fase2PestanaOpcionesES=
`
${DETAILS_AYUDA_RAPIDA_ES}
<details value='instruccionesOpcionesAnadidas' class='detailsInstrucciones' open>
    <summary title='Cliquéame para mostrar u ocultar instrucciones referentes al panel de opciones generales adicionales'>Opciones adicionales</summary>
    <ul>
        <li>
            Explicación de botones según su orden
            <ol>
                <li>
                    '👁⚙Contenedor' Activa o desactiva la visualización de la pestaña de configuración de contenedores de archivos con acciones ya existentes en otras partes de la aplicación
                </li>
                <li>
                    'Modo deseleccionar+descorrección' Activa o desactiva el modo deseleccionar y quitar corrección, permite que al clicar en una respuesta se restauren sus valores iniciales a no corregida y no seleccionada
                </li>
                <li>
                    '👁 apuntes' Para mostrar ocultar la barra de texto de todas las preguntas. Dicha barra permite añadir apuntes adicionales a cada pregunta, que se guardarán cuando guarde el test
                </li>
                <li>
                    '(◕‿◕)' Para cambiar los colores del test al gusto, dentro solo debe clicar en cada cuadro de color y seleccionar el color deseado
                </li>
                <li>
                    'Terminar' Para dar por finalizado el test, pausar temporizador y mostrar cronómetro en funcionamiento desde el principio del test. Sepa que tras terminar test, si clica en en una respuesta, se rellenará y puntuará de modo distinto de cara a la evaluación
                </li>
                <li>
                    '✔️❌' Activa y desactiva el modo corregir, esto permite que al clicar en una respuesta se resalte como respuesta correcta con fondo de '✔️', si clica por segunda vez se resaltará como incorrecta condo '❌', y por tercera vez devuelve el valor no corregido. Estos valores se tendrán en cuenta para la evaluación del test
                </li>
                <li>
                    'Evaluar' Para dar una evaluación detallada respecto a las respuestas seleccionadas y su corrección previa con la configuración de la ventana de evaluación que contendrá:
                    <ol>
                        <li>
                            Un campo a rellenar con las preguntas a evaluar, el cual debe rellenar con el formato admitido. Separe por comas ',' los números de pregunta y los rangos de preguntas que desee evaluar. Los rangos se escriben separados por guion '-'. Ejemplo: '1,3-5,8' En este ejemplo se evaluarán las preguntas 1,3,4,5 y 8
                        </li>
                        <li>
                            Encontrará un botón con lista de opciones para seleccionar la forma a tener en cuenta las respuestas incorrectas, para después rellenar el campo a su derecha si procede.
                        </li>
                        <li>
                            Botones 'Continuar' o 'Cancelar'.
                        </li>
                    </ol>
                </li>
                <li>
                    '💾' Para guardar en un archivo aparte la evaluación del test y las respuestas seleccionadas tras la ventana de configuración de evaluación de test, explicada en el anterior punto.
                </li>
                <li>
                    'Nuevo test' Para reiniciar la aplicación y dejar la pantalla lista para configurar un nuevo test
                </li>
                <li>
                    Para introducir el título del test. Este se usará como nombre de archivo en el momento de guardar el test
                </li>
                <li>
                '?' Botón para mostrar pantalla de instrucciones en referencia al panel de opciones adicionales
                </li>
            </ol>
        </li>
    </ul>
</details>
`;
fase2PestanaOpcionesES=escaparScringHtml(fase2PestanaOpcionesES);

let fase2OpcionesBasicasES=
`
${DETAILS_AYUDA_RAPIDA_ES}
<details value='instruccionesOpcionesBasicas' class='detailsInstrucciones'>
    <summary title='Cliquéame para mostrar u ocultar instrucciones referentes al panel de opciones generales básicas'>Opciones básicas</summary>
    <ul>
        <li>
            Explicación de botones según su orden
            <ol>
                <li>
                    '⏳: 00:00' El temporizador, el cual se iniciará al dar a 'Empezar test'
                </li>
                <li>
                    '⏱️: 00:00' El cronómetro, que puede estar o no visible en función de si se ha terminado el test o no
                </li>
                <li>
                    '⏸︎▶' El botón para pausar o renaudar el temporizador y el cronómetro, durante la pausa se podrá modificar el temporizador
                </li>
                <li>
                    '↺' El botón para reiniciar el temporizador y el cronómetro, además de activar el modo de poder rellenar respuestas de modo inicial
                </li>
                <li>
                    '?' El botón para abrir esta ventana de ayuda en referencia a las opciones básicas del test
                </li>
            </ol>
        </li>
    </ul>
</details>

<details value='instruccionesBotonesPanelIzquierdo' class='detailsInstrucciones'>
    <summary title='Cliquéame para mostrar u ocultar instrucciones referentes a los botones del panel lateral izquierdo'>Botones panel lateral izquierdo</summary>
    <ul>
        <li>
            Explicación de botones según su orden
            <ol>
                <li>
                    '👁1' Para mostrar u ocultar el contenedor primario
                </li>
                <li>
                    '👁2' Para mostrar u ocultar el contenedor secundario
                </li>
                <li>
                    '👁 Test' El botón para mostrar u ocultar el panel de preguntas de test
                </li>
                <li>
                    '+-ABC' El botón para mostrar u ocultar los botones para añadir o quitar respuestas a las preguntas
                </li>
                <li>
                    '◧' Para invertir los colores en ambos contenedores solo cuando se ha cargado algún archivo
                </li>
                <li>
                    '🔃' Para cambiar la orientación de ambos contenedores solo cuando ambos están visibles
                </li>
            </ol>
        </li>
    </ul>
</details>

<details value='contenedorArchivos' class='detailsInstrucciones'>
    <summary title='Cliquéame para mostrar u ocultar instrucciones referentes al panel de archivos'>Panel de archivos</summary>
    <ul>
        <li>
            Este panel puede mostrarse o no en función de la configuración y botones presionados previamente del test.
        </li>
        <li>
            Contiene barras arrastrables para configurar el tamaño de tales contenedores junto al panel de test
        </li>
        <li>
            '⚙' Cada contenedor tendrá en su esquina inferior izquierda un botón para mostrar u ocultar barras de menú rápido de opciones, las cuales son:
            <ul>
                <li>
                    Barra superior, la cual contendrá las siguientes opciones expresadas en orden:
                    <ol>
                        <li>
                            '-' Un botón para retroceder una página
                        </li>
                        <li>
                            Un paginador, en el que se podrá visualizar la página actualmente visible, además de poder cambiarla para su redirección
                        </li>
                        <li>
                            '+' Un botón para avanzar una página
                        </li>
                        <li>
                            '↷📄' Un botón girar la página actual
                        </li>
                        <li>
                            '📄📄' Un botón para girar todas las páginas. Nota: El ángulo de giro se igualará al procedente a la primera página
                        </li>
                    </ol>
                </li>
                <li>
                    Barra derecha, la cual contendrá las siguientes opciones:
                    <ol>
                        <li>
                        '<div class='contenedorIconosCerrarYArchivoInstruc'><p class='icono2ArchivoInstruc'>📄</p><p class='icono1CerrarInstruc'>❌</p></div>' Un botón para mostrar un menú el que puede introducir, en el formato correcto, las páginas a eliminar como figura en el ejemplo.
                        </li>
                        <li>
                            '📄' Un botón para buscar y cargar un archivo PDF o de imagen en el contenedor adyacente
                        </li>
                        <li>
                            '❌+📄' '📄+📄' Un botón para activar el modo adición o sustitución. Estando activado, el botón de añadir archivo vecino, añadirá tal archivo al contenedor, si estuviera desactivado, el archivo nuevo sustituirá al previamente cargado
                        </li>
                    </ol>
                </li>
                <li>
                    Barra inferior, la cual contendrá las siguientes opciones:
                    <ol>
                        <li>
                            '<img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>
                            <img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>'
                            Para borrar lo pintado en este contenedore
                        </li>
                        <li>
                            '<img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>'
                            Un botón para activar o desactivar el modo borrador, el cual, activado, permite borrar manualmente la parte de la pizarra deseada clicando donde se desee borrar
                        </li>
                        <li>
                            '👁 🖌' Un botón para mostrar u ocultar lo pintado previamente, además de mostrar el botón 'X' en la parte superior derecha de cada página para poder borrarla de la visualización
                        </li>
                        <li>
                            '🎨' Un botón para cambiar de color el pincel de la pizarra solo para este contenedor
                        </li>
                    </ol>
                </li>
                <li>
                    Barra izquierda, la cual contendrá las siguientes opciones:
                    <ol>
                        <li>
                            '◧' Un botón para invertir colores de cada página
                        </li>
                        <li>
                            '↩' Sirve para deshacer punto por punto los trazos dibujados últimos
                        </li>
                        <li>
                            '↪' Sirve para rehacer punto por punto los trazos deshechos previamente
                        </li>
                    </ol>
                </li>
            </ul>
        </li>
    </ul>
</details>

<details value='instruccionesPanelTest' class='detailsInstrucciones'>
    <summary title='Cliquéame para mostrar u ocultar instrucciones referentes al panel de test'>Panel test</summary>
    <ul>
        <li>
            Al mismo cargar la segunda pantalla de esta aplicación las preguntas estarán cubiertas por una capa transparente negra que representa el botón 'Empezar test', al hacer clic en él se iniciarán el temporizador y cronómetro
        </li>
        <li>
            En cada pregunta podremos seleccionar 1 o varias alternativas de respuesta
        </li>
        <li>
            En cada pregunta podremos encontrar varias partes:
            <ol>
                <li>
                    El número de la pregunta, el cual, si se le hace clic podrá cambiar de color, representando en terminos comunes, el naranja para una pregunta en la que dude de su respuesta, el rosa para pregunta errónea, el tercero, color rojo, para anular la pregunta y no tenerla en cuenta para evaluar, y el cuarto click restaurará el color original
                </li>
                <li>
                    Las alternativas de respuesta posibles, previamente configuradas. AL clicar en una, de modo general se rellenará de fondo negro o gris según si estamos dentro de tiempo según el temporizador o fuera, respectivamente. También puede ocurrir que tengamos el modo corrección habilitado o el modo deseleccionar+descorrección
                </li>
                <li>
                    '🖊️' 'a' En última instancia, hay un botón que ocultar o mostrará un cuadro de texto para escribir apuntes, que, al tener contenido escrito, cambiará su icono de una pluma a la letra 'a'
                </li>
            </ol>
        </li>
        <li>
            A continuación se pueden ver dos botones '+' para añadir o '-' para eliminar preguntas del test
        </li>
        <li>
            En la parte final de este panel se encuentra un campo de texto para apuntes generales personalizados del test, el cual se puede redimensionar arrastrando desde su esquina inferior derecha
        </li>
    </ul>
</details>
<details value='formaEvaluacion' class='detailsInstrucciones'>
    <summary title='Cliquéame para mostrar u ocultar información referente a la forma de evaluación'>Forma de evaluación</summary>
    <ul>
        <li>
            Las fórmulas de correción se aplican a la clasificación de cada pregunta, basándose esta en los estados de las respuestas.
        </li>
        <li>
            Se considera clasificada una pregunta como contestada incorrectamente cuando:
            <ul>
                <li>
                    Contiene una respuesta rellenada incorrecta.
                </li>
                <li>
                    o si hay una respuesta correcta no seleccionada cuando haya al menos una respuesta seleccionada en esa pregunta
                </li>
                <li>
                    Las preguntas que en su parte con el número de pregunta, contengan una corrección, contará como que el número es una respuesta más y está seleccionada
                </li>
                <li>
                    Las preguntas sin respuestas seleccionadas ni número de pregunta con corrección se considerarán como no contestadas, y contarán como incorrectas o sin efecto según se haya configurado previamente
                </li>
            </ul>
        </li>
        <li>
            Las preguntas contestadas pero sin corrección de respuesta correcta, contarán como no contestadas
        </li>
    </ul>
</details>
`;
fase2OpcionesBasicasES=escaparScringHtml(fase2OpcionesBasicasES);

const es =
`{
    "primerAcceso1": {
        "html": "Recomendamos acceder al submenú 'Instrucciones rápidas' si es su primer acceso a Lobotest"
    },
    "1": {
        "config": {
            "contidioma": {
                "title": "Elija el idioma que desee:"
            },
            "contestructura": {
                "title": "Elija el modo de visualización estructural de columnas de las preguntas"
            },
            "conttiempos": {
                "title": "Introduzca el tiempo para el temporizador"
            },
            "etiquetaTiempo": {
                "html": "Temporizador:"
            },
            "horas": {
                "html": "Horas:"
            },
            "minutos": {
                "html": "Minutos:"
            },
            "segundos": {
                "html": "Segundos:"
            },
            "contnAlternativas": {
                "title": "Seleccione la cantidad de alternativas de respuesta con letra. Máximo 27"
            },
            "alternativas": {
                "html": "Número de alternativas de respuesta:"
            },
            "contnnumPregMax": {
                "title": "Introduzca el número de preguntas a generar:"
            },
            "cantidadpreg": {
                "html": "Cantidad de preguntas:"
            },
            "contnumPregInicial": {
                "title": "Introduzca el número de la primera pregunta del test"
            },
            "pregInicial": {
                "html": "Número de pregunta inicial:"
            },
            "conttituloTest1": {
                "title": "Introduzca el título del test a realizar"
            },
            "titulo": {
                "html": "Título:"
            },
            "phtitulo": {
                "placeholder": "Introduzca el título del test"
            },
            "btninstruc": {
                "title": "Cliquéame si tienes dudas acerca de la aplicación"
            },
            "botonCrearTest": {
                "value": "Crear hoja",
                "title": "Cliquéame para trabajar los parámetros que ha introducido y crear el test. En la ventana siguiente podrá clicar en comenzar el test"
            }
        },
        "contenedorPDFsFase1": {
            "pestana1": {
                "html": "Pestaña 1"
            },
            "pestana2": {
                "html": "Pestaña 2"
            },
            "pcontenidoInicial1": {
                "html": "Ningún PDF o imagen seleccionado para contenedor primario"
            },
            "contenedorInputFile1": {
                "title": "Cliquéame para introducir un archivo PDF o imagen a este visor y al contenedor 1 de la próxima ventana"
            },
            "inputfile1": {
                "html": "Seleccionar archivo 1"
            },
            "contenedorInputFile2": {
                "title": "Cliquéame para introducir un archivo PDF o imagen a este visor y al contenedor 2 de la próxima ventana"
            },
            "pcontenidoInicial2": {
                "html": "Ningún PDF o imagen seleccionado para contenedor secundario"
            },
            "inputfile2": {
                "html": "Seleccionar archivo 2"
            }
        },
        "instruc": {
            "tituloinst": {
                "html": "Instrucciones de la hoja de respuestas interactiva"
            }
        }
    },
    "2": {
        "superior": {
            "pestanaPDF": {
                "title": "Cliquéame para mostrar u ocultar opciones referentes directamente a los contenedores",
                "html": "⚙ Contenedor"
            },
            "PDFselect": {
                "title": "Aquí puede seleccionar el contenedor que desee configurar"
            },
            "PDFselectoption1": {
                "html": "Panel"
            },
            "PDFselectoption2": {
                "html": "Primario"
            },
            "PDFselectoption3": {
                "html": "Secundario"
            },
            "deformarPDF": {
                "title": "Aquí puede seleccionar la faceta a configurar respecto al contenedor seleccionado en mi vecino"
            },
            "deformarPDFopcion1": {
                "html": "Alto"
            },
            "deformarPDFopcion2": {
                "html": "Ancho"
            },
            "deformarPDFopcion3": {
                "html": "Zoom"
            },
            "mas": {
                "title": "Cliquéame para aumentar la faceta seleccionada del contenedor seleccionado"
            },
            "menos": {
                "title": "Cliquéame para disminuir la faceta seleccionada del contenedor seleccionado"
            },
            "mostrarOcultarPDF": {
                "title": "Cliquéame para ocultar o mostrar el contenedor seleccionado"
            },
            "activarDesactivarModoNoche": {
                "title": "Cliquéame para invertir colores en el contenedor seleccionado"
            },
            "borrador": {
                "title": "Cliquéame para activar o desactivar el modo borrador en el contenedor seleccionado"
            },
            "rotarPaginas": {
                "title": "Cliquéame para rotar páginas"
            },
            "botonColorPincel": {
                "title": "Cliquéame para cambiar el color de pincel"
            },
            "botonInputFile3": {
                "title": "Cliquéame para cargar un archivo PDF o imagen en el contenedor seleccionado"
            },
            "botonInputFile3Adicion": {
                "title": "Cliquéame para que le diga a mi vecino si sustituir el contenido ya existente o añadir"
            },
            "summarymasAccionesTabItem": {
                "title": "Cliquéame para mostrar u ocultar más opciones",
                "html": "Más acciones"
            },
            "botonMostrarOcultarPestanaContenedor": {
                "title": "Mostrar u ocultar la pestaña de opciones repetidas de contenedor de archivo",
                "value": "👁⚙Contenedor"
            },
            "botonDeseleccionar": {
                "title": "Mientras este modo está activo puede clicar en respuestas del test para deseleccionar si estaba seleccionada y para quitar corrección si estaba marcada como correcta o incorrecta",
                "value": "Modo deseleccionar+descorrección"
            },
            "reiniciarWeb": {
                "title": "Cliquéame para refrescar la página y volver al menú principal",
                "value": "Nuevo test"
            },
            "mostrarOcultarApuntes": {
                "title": "Cliquéame para mostrar u ocultar las barras texto de cada pregunta para escribir apuntes",
                "value": "👁 apuntes"
            },
            "cambiarColores": {
                "title": "Cliquéame para mostrar la ventana de personalización de colores"
            },
            "botonTerminar": {
                "title": "Cliquéame para dar por terminado el test, parar el temporizador y pasar a poder rellenar respuestas tras tiempo",
                "value": "Terminar"
            },
            "botonCorregir": {
                "title": "Mientras este modo está activo puede clicar en las respuestas para señalarlas como correctas, un segundo click cambia a incorrecta y un tercero vuelve al estado de sin corregir"
            },
            "botonEvaluar": {
                "title": "Cliquéame para mostrar una ventana con su evaluación de este test basado en sus respuestas y si su correción realizada previamente",
                "value": "Evaluar"
            },
            "guardarResultado": {
                "title": "Cliquéame para guardar un informe de su test en un archivo con el nombre escrito en el título, que contiene su evaluación, apuntes y respuestas"
            },
            "labelTituloTest2": {
                "html": "Título: "
            },
            "tituloTest2": {
                "title": "Escriba aquí el título del test",
                "placeholder": "Introduzca el título del test"
            },
            "instruc": {
                "title": "Cliquéame si tienes dudas acerca de la aplicación"
            },
            "mostrarOcultarPizarra": {
                "title": "Cliquéame para mostrar u ocultar las pizarras contenidas en contenedor 1 y contenedor 2"
            },
            "resetearPizarra": {
                "title": "Cliquéame para borrar todo el contenido de las pizarras contenidas en contenedor 1 y contenedor 2"
            },
            "cambiarOrientacion": {
                "title": "Cliquéame para cambiar orientación de los contenedores 1 y 2"
            },
            "separador": {
                "title": "Soy un separador superguay ^_^"
            },
            "divTemporizador": {
                "title": "Soy un temporizador, me gusta la rapidez"
            },
            "divCronometro": {
                "title": "Soy un cronómetro, no soy tan impaciente como mi vecino el temporizador"
            },
            "botonPausarContinuarTiempos": {
                "title": "Cliquéame para pausar el temporizador, y el cronómetro también incluso si no está visible"
            },
            "reiniciarTiempos": {
                "title": "Cliquéame para retornar el temporizador al tiempo inicial, y al cronómetro a cero"
            },
            "instruc2": {
                "title": "Cliquéame si tienes dudas acerca de la aplicación"
            }
        },
        "barralateral": {
            "botonBarraVerticalConfigPDF1OcultarMostrar": {
                "title": "Cliquéame para mostrar u ocultar el contenedor 1"
            },
            "botonBarraVerticalConfigPDF2OcultarMostrar": {
                "title": "Cliquéame para mostrar u ocultar el contenedor 2"
            },
            "mostrarOcultarContenedorTestYModal": {
                "title": "Cliquéame para mostrar u ocultar test",
                "value": "👁 Test"
            },
            "mostrarOcultarAnadirQuitarRsp": {
                "title": "Cliquéame para mostrar u ocultar opciones de añadir o quitar opciones de respuesta a cada pregunta",
                "value": "+-ABC"
            },
            "botonBarraVerticalConfigPDFMasAnchuraContenedorPDFs": {
                "title": "Cliquéame para extender horizontalmente ambos contenedores, si no has llegado al límite máximo"
            },
            "botonBarraVerticalConfigPDFMenosAnchuraContenedorPDFs": {
                "title": "Cliquéame para acortar horizontalmente ambos contenedores, si no has llegado al límite mínimo"
            },
            "botonBarraVerticalConfigPDFMasAlturaContenedorPDFs": {
                "title": "Cliquéame para acortar horizontalmente ambos contenedores, si no has llegado al límite mínimo"
            },
            "botonBarraVerticalConfigPDFMenosAlturaContenedorPDFs": {
                "title": "Cliquéame para acortar horizontalmente ambos contenedores, si no has llegado al límite mínimo"
            },
            "botonConfigPDFsActivarDesactivarModoNoche": {
                "title": "Cliquéame para invertir los colores de ambos contenedores"
            },
            "botonBarraHorizontalConfigPDF1CambiarOrientacion": {
                "title": "Cliquéame para cambiar orientación de los contenedores 1 y 2"
            }
        },
        "centro": {
            "contenidoBasicoContenedor1": {
                "html": "Contenedor 1"
            },
            "contenidoBasicoContenedor2": {
                "html": "Contenedor 2"
            }
        },
        "menurapido": {
            "botonBarraConfigMenosPaginaPDF1": {
                "title": "Cliquéame para restar 1 a la página actual y enfocarla"
            },
            "inputTextPaginaSeleccionadaPDF1": {
                "title": "Cliquéame para poder introducir la página a la que quiere ir"
            },
            "botonBarraConfigMasPaginaPDF1": {
                "title": "Cliquéame para sumar 1 a la página actual y enfocarla"
            },
            "botonBarraConfigRotarPaginaPDF1": {
                "title": "Cliquéame para rotar la página seleccionada"
            },
            "botonBarraConfigRotarTodasPaginasPDF1": {
                "title": "Cliquéame para rotar todas las páginas de este contenedor, pero sin marearse"
            },
            "botonBarraConfigPDF1ActivarDesactivarModoNoche": {
                "title": "Cliquéame para invertir los colores de las páginas de este contenedor"
            },
            "botonBarraConfigPDF1Deshacer": {
                "title": "Cliquéame para deshacer lo último pintado"
            },
            "botonBarraConfigPDF1Rehacer": {
                "title": "Cliquéame para rehacer lo último pintado"
            },
            "botonBarraConfigPDF1BorrarPizarra": {
                "title": "Cliquéame para borrar la pizarra entera de este contenedor"
            },
            "botonBarraConfigPDF1Borrador": {
                "title": "Con este modo activo podrá clicar donde desee borrar dentro de este contenedor"
            },
            "botonBarraConfigPDF1MostrarOcultarPizarra": {
                "title": "Cliquéame para mostrar u ocultar lo que ha pintado"
            },
            "botonBarraConfigPDF1ColorPincel": {
                "title": "Cliquéame para mostrar y elegir colores de pincel"
            },
            "botonBarraConfigPDF1Borrar": {
                "title": "Cliquéame para eliminar varias páginas"
            },
            "botonBarraConfigPDF1InputFile": {
                "title": "Cliquéame para introducir un archivo PDF o una imagen. Mi vecino me dice si añadir o sustituir el contenido ya presente"
            },
            "botonBarraConfigPDF1InputFileAdicion": {
                "title": "Cliquéame para que le diga a mi vecino si sustituir el contenido ya existente o añadir"
            },
            "divBotonConfigPDF1": {
                "title": "Cliquéame para mostrar el menú rápido para este contenedor"
            }
        },
        "barramovil": {
            "lineaDivisoriaMovilHorizontal": {
                "title": "Arrástrame para cambiar tamaños verticales"
            },
            "lineaDivisoriaMovilVertical": {
                "title": "Arrástrame para cambiar tamaños horizontales"
            },
            "lineaDivisoriaMovilVerticalContenedorPDFsYContenedorTestYModal": {
                "title": "Arrástrame para cambiar tamaños horizontales"
            },
            "lineaDivisoriaMovilHorizontalContenedorPDFsYContenedorTestYModal": {
                "title": "Arrástrame para cambiar tamaños verticales"
            }
        },
        "test": {
            "modalTest": {
                "title": "Cliquéame para comenzar el test, accionar el temporizador y cronómetro",
                "value": "Empezar test"
            },
            "pregunta": {
                "title": "Cliquéame para cambiar color de fondo representativo de pregunta dudosa o pregunta erróneamente formulada"
            },
            "boli": {
                "title": "Cliquéame para mostrar u ocultar la barra de texto de apuntes"
            },
            "phapunteindividual": {
                "placeholder": "Apunte individual de pregunta"
            },
            "ptextoBarraCambioTamanoApunteGeneralTextarea": {
                "html": "↕ Notas Generales ↕"
            },
            "apunteGeneralTextarea": {
                "title": "Aquí puede introducir sus apuntes respecto a este test",
                "placeholder": "Mis apuntes generales"
            }
        },
        "menuColores": {
            "titulo": {
                "html": "Personalización de colores de interfaz"
            },
            "avisoLocalStorage": {
                "html": "⚠️ ¡Cambia el color y personaliza tu experiencia! Guardaremos tus preferencias en tu dispositivo. ¡Gracias por elegirnos! 😊"
            },
            "varios": {
                "html": "Varios"
            },
            "fondoPantalla": {
                "html": "Fondo pantalla:"
            },
            "fondoMenu": {
                "html": "Fondo ventanas menú:"
            },
            "fondoAuxiliar": {
                "html": "Fondo ventanas auxiliares:"
            },
            "fondoBotones": {
                "html": "Fondo botones:"
            },
            "letramenus": {
                "html": "Letra:"
            },
            "seleccion": {
                "html": "Selección:"
            },
            "test": {
                "html": "Test"
            },
            "rspRellena": {
                "html": "Respuesta rellenada:"
            },
            "rspsinrellenar": {
                "html": "Respuesta sin rellenar:"
            },
            "rsprellenatrastiempo": {
                "html": "Respuesta rellenada tras tiempo:"
            },
            "pregsinmarcar": {
                "html": "Pregunta sin marcar:"
            },
            "preguntadudosa": {
                "html": "Pregunta marcada como dudosa:"
            },
            "preguntamalformulada": {
                "html": "Pregunta marcada como mal formulada:"
            },
            "descripcionselect": {
                "html": "Seleccione borde de texto (auto por defecto)"
            },
            "optionauto": {
                "html": "Auto"
            },
            "optionblanca": {
                "html": "Blanca"
            },
            "optionnegra": {
                "html": "Negra"
            },
            "optionnada": {
                "html": "Nada"
            },
            "botonrestaurar": {
                "value": "Restaurar"
            },
            "botonvolver": {
                "value": "Volver"
            }
        },
        "menuevaluacion": {
            "titulo": {
                "html": "Configurar evaluación"
            },
            "prangopreguntas": {
                "html": "Rango de preguntas"
            },
            "titlerangopreguntas": {
                "title": "Introduzca aquí el rango o rangos de preguntas a evaluar"
            },
            "explicacionrangopreguntas": {
                "html": "Separe por comas ',' las preguntas y los rangos de preguntas que desee evaluar. Los rangos se escriben separados por guion '-'. Ejemplo: '1,3-5,8' En este ejemplo se evaluarán las preguntas 1,3,4,5 y 8"
            },
            "titlemodoincorrectasevaluacion": {
                "title": "Selecciona el modo a tener en cuenta las respuestas incorrectas"
            },
            "modoincorrectasoption1": {
                "html": "¿Cuánto resta cada incorrecta?"
            },
            "modoincorrectasoption2": {
                "html": "¿Cada cuántas incorrectas resta una correcta?"
            },
            "modoincorrectasoption3": {
                "html": "[A – E / (Alternativas – 1)] * 10 / Preguntas"
            },
            "restanlasincorrectas": {
                "title": "Introduzca cómo restan las incorrectas según el modo seleccionado"
            },
            "pNoContestadasIncorrectas": {
                "html": "Seleccione este check para que las preguntas no contestadas cuenten como incorrectas"
            },
            "checkNoContestadasIncorrectas": {
                "title": "Rellene para que las no contestadas cuenten como incorrectas"
            },
            "continuarEvaluacion": {
                "title": "Continuar con la operación seleccionada con la configuración dada",
                "value": "Continuar"
            },
            "cancelarEvaluacion": {
                "title": "Cancelar la operación y cerrar ventana de configuración de evaluación",
                "value": "Cancelar"
            }
        }
    },
    "contenidoInstruc": {
        "fase1Config": {
            "html": "${fase1ConfigES}"
        },
        "fase2PestanaContenedor": {
            "html": "${fase2PestanaContenedorES}"
        },
        "fase2PestanaOpciones": {
            "html": "${fase2PestanaOpcionesES}"
        },
        "fase2OpcionesBasicas": {
            "html": "${fase2OpcionesBasicasES}"
        }
    },
    "miAlert": {
        "tituloNuevotest": {
            "html": "Nuevo test"
        },
        "nuevotest2": {
            "html": "¿Seguro que quiere salir y configurar un nuevo test?"
        },
        "tituloTextoPaginasAEliminar": {
            "html": "Borrar páginas"
        },
        "preeliminar": {
            "html": "Introduzca páginas a eliminar:"
        },
        "textoPaginasAEliminar": {
            "placeholder": "Introduzca páginas a eliminar"
        },
        "pExplicaciontextoPaginasAEliminar": {
            "html": "Separe por comas ',' las páginas y los rangos de página que desee eliminar. Los rangos se escriben separados por guion '-'. Ejemplo: '1,3-5,8' En este ejemplo se eliminarán las páginas 1,3,4,5 y 8"
        },
        "formatoIncorrecto": {
            "html": "El formato del texto es incorrecto."
        },
        "tituloReiniciarTiempos": {
            "html": "Reiniciar tiempos"
        },
        "tituloReiniciarTiemposSeguro": {
            "html": "¿Estás seguro de reiniciar tiempos?"
        },
        "testFinalizado": {
            "html": "Test finalizado"
        },
        "hasTardado": {
            "html": "Has tardado: "
        },
        "horas": {
            "html": " horas"
        },
        "minutos": {
            "html": " minutos"
        },
        "segundos": {
            "html": " segundos"
        },
        "conTiempoInicialDe": {
            "html": " con tiempo inicial de "
        }
    },
    "evaluacion": {
        "tituloResumenGuardado": {
            "html": "Título: "
        },
        "sobradoTiempo": {
            "html": "¡¡¡¡Te ha sobrado tiempo: "
        },
        "noCorregidas": {
            "html": "Preguntas específicas contestadas no corregidas: "
        },
        "notaEnTiempo": {
            "html": "Tu nota dentro de tiempo: "
        },
        "aciertos": {
            "html": "Aciertos: "
        },
        "errores": {
            "html": "Errores: "
        },
        "noContestadasEnTiempo": {
            "html": "No contestadas dentro de tiempo: "
        },
        "anuladas": {
            "html": "Anuladas: "
        },
        "notaEnTiempoYFueraDeTiempo": {
            "html": "Tu nota incluyendo respuestas fuera de tiempo: "
        },
        "aciertosFueraDeTiempo": {
            "html": "Aciertos dentro+fuera de tiempo: "
        },
        "erroresFueraDeTiempo": {
            "html": "Errores dentro+fuera de tiempo: "
        },
        "noContestadasEnTiempoYFueraDeTiempo": {
            "html": "No contestadas dentro+fuera de tiempo: "
        },
        "noCorregidasDentroDeTiempo": {
            "html": "¡¡Faltan preguntas por corregir contestadas DENTRO de tiempo!!"
        },
        "noCorregidasFueraDeTiempo": {
            "html": "¡¡Faltan preguntas por corregir contestadas FUERA de tiempo!!"
        }
    },
    "imgDonar": {
        "src": "https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif",
        "title": "PayPal: ¡La forma más segura y fácil de pagar en línea!",
        "alt": "Donar con botón PayPal"
    },
    "carga": {
        "correcta": {
            "html": "Carga correcta "
        },
        "incorrecta": {
            "html": "Cargando... "
        },
        "incompatibilidades": {
            "html": "Carga correcta pero con incompatibilidades detectadas "
        }
    },
    "leyendaResumenGuardado": {
        "pregSinMarcar":{
            "html": "Pregunta sin marcar:"
        },
        "pregDudosa":{
            "html": "Pregunta Dudosa:"
        },
        "pregMalformulada":{
            "html": "Pregunta mal formulada:"
        },
        "pregAnulada":{
            "html": "Pregunta anulada:"
        },
        "rspRellena":{
            "html": "Respuesta rellena:"
        },
        "rspSinRellenar":{
            "html": "Respuesta sin rellenar:"
        },
        "rspRellenaFueraTiempo":{
            "html": "Respuesta rellenada fuera de tiempo:"
        }
    }
}`;

let fase1ConfigEN=
`
${DETAILS_AYUDA_RAPIDA_EN}
<details value='Panel_izquierdo' class='detailsInstrucciones'>
    <summary title='Click me to show or hide instructions related to the left panel of the screen'>Left panel</summary>
    <h4>Explanation of buttons and fields</h4>
    <ul>
        <li>Groups of options according to their respective position in order
            <ol>
                <li>You can select the flag belonging to the language you want.</li>
                <li>You will be able to configure the way to display the columns of the answers after creating the test.</li>
                <li>There are numeric fields that will determine the initial time of the test timer</li>
                <li>You will find a numeric field that will determine the number of possible letter alternatives in the test</li>
                <li>You can enter the total number of questions</li>
                <li>You can enter the number of the initial question of the test, with the following numbers being consecutive</li>
                <li>Text field in which you can enter the title of the test, which will also be used as a file title if you press the 'Save test' button</li>
            </ol>
        </li>
        <li>The buttons at the bottom lead to the test screen and to the instructions screen respectively</li>
    </ul>
</details>
<details value='Panel derecho' class='detailsInstrucciones'>
<summary title='Click me to show or hide instructions related to the right panel of the screen'>Right panel</summary>
    <h4>Parts</h4>
    <ul>
        <li>At the top you can select the tab corresponding to each file previewer corresponding to each file container on the test screen</li>
        <li>Initially you can click on the empty content of each tab or on the 'Select file' button to search for a PDF or image file to load it</li>
    </ul>
    <h4>Gestures you can make</h4>
    <ul>
        <li>Zoom gestures
            <ul>
                <li>Shift + wheel movement: Zooms in on an open document.</li>
                <li>Touch pinch: On the lower scroll bars zooms in the document.</li>
            </ul>
        </li>
    </ul>
</details>
`;
fase1ConfigEN=escaparScringHtml(fase1ConfigEN);

let fase2PestanaContenedorEN=
`
${DETAILS_AYUDA_RAPIDA_EN}
<details value='instruccionesControlesArchivo' class='detailsInstrucciones' open>
    <summary title='Click me to show or hide instructions related to the file control panel in container'>PDF Controls</summary>
    <ul>
        <li>
            Explanation of buttons according to their order
            <ol>
                <li>
                    You can select one of the 2 containers, primary or secondary, or the panel that contains both represented by the 'Panel' option
                </li>
                <li>
                    You can select the facet to configure with respect to the previously selected container
                </li>
                <li>
                    '+' Button to increase the selected facet of the selected container
                </li>
                <li>
                    '-' Button to decrease the selected facet of the selected container
                </li>
                <li>
                    '👁' Button to hide or show the selected container
                </li>
                <li>
                    '◧' Button to invert colors of the selected container
                </li>
                <li>
                    '<img style='width:20px;height:20px;' src='data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8='>'
                     Button to activate or deactivate draft mode of the selected container
                </li>
                <li>
                    '<img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>
                    <img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>'
                     To erase what is painted on both containers
                </li>
                <li>
                    '🎨' Button change brush color
                </li>
                <li>
                    '↷📄📄' Button rotate all pages 90 degrees
                </li>
                <li>
                    '📄' Button to search for and load a file in the selected container
                </li>
                <li>
                    '❌+📄' '📄+📄' A button to activate addition or substitution mode. When activated, the neighboring add file button will add such a file to the container, if it were deactivated, the new file would replace the previously loaded one
                </li>
                <li>
                    '🔃' To change the orientation of both containers to horizontal or vertical
                </li>
                <li>
                    '👁🖌' To show or hide what is painted in both containers
                </li>
                <li>
                    '?' Button to display instructions screen in reference to file configuration panel
                </li>
            </ol>
        </li>
    </ul>
</details>
`;
fase2PestanaContenedorEN=escaparScringHtml(fase2PestanaContenedorEN);

let fase2PestanaOpcionesEN=
`
${DETAILS_AYUDA_RAPIDA_EN}
<details value='instruccionesOpcionesAnadidas' class='detailsInstrucciones' open>
    <summary title='Click me to show or hide instructions related to the additional general options panel'>Additional options</summary>
    <ul>
        <li>
            Explanation of buttons according to their order
            <ol>
                <li>
                    '👁⚙Container' Enables or disables the display of the file container settings tab with actions already existing in other parts of the application
                </li>
                <li>
                    'Deselect+uncorrect mode' Activates or deactivates deselect and uncorrect mode, allows clicking on an answer to restore its initial values to uncorrected and unselected
                </li>
                <li>
                    '👁 notes' To show hide the text bar of all questions. This bar allows you to add additional notes to each question, which will be saved when you save the test
                </li>
                <li>
                    '(◕‿◕)' To change the colors of the test to your liking, inside you only have to click on each color square and select the desired color
                </li>
                <li>
                    'Finish' To finish the test, pause timer and show stopwatch running from the beginning of the test. Know that after finishing test, if you click on an answer, it will be filled in and scored differently for evaluation purposes
                </li>
                <li>
                    '✔️❌' Activates and deactivates correct mode, this allows clicking on an answer to highlight it as a correct answer with a '✔️' background, if clicked a second time it will be highlighted as incorrect with a '❌', and for a third time it returns the uncorrected value. These values will be taken into account for test evaluation
                </li>
                <li>
                    'Evaluate' To give a detailed evaluation regarding the selected answers and their previous correction with the configuration of the evaluation window that will contain:
                    <ol>
                        <li> A field to fill in with the questions to evaluate, which must be filled in with the accepted format. Separate by commas ',' the question numbers and the ranges of questions you want to evaluate. The ranges are written separated by a hyphen '-'. Example: '1,3-5,8' In this example, questions 1,3,4,5 and 8 will be evaluated </li>
                        <li> You will find a button with a list of options to select how to take into account incorrect answers, and then fill in the field to its right if applicable. </li>
                        <li> 'Continue' or 'Cancel' buttons. </li>
                    </ol>
                </li>
                <li>
                    '💾' To save the test evaluation and the selected answers in a separate file after the test evaluation configuration window, explained in the previous point.
                </li>
                <li>
                    'New test' To restart the application and leave the screen ready to configure a new test
                </li>
                <li>
                    To enter the title of the test. This will be used as a file name when saving the test
                </li>
                <li>
                '?' Button to display instructions screen in reference to additional options panel
                </li>
            </ol>
        </li>
    </ul>
</details>
`;
fase2PestanaOpcionesEN=escaparScringHtml(fase2PestanaOpcionesEN);

let fase2OpcionesBasicasEN=
`
${DETAILS_AYUDA_RAPIDA_EN}
<details value='instruccionesOpcionesBasicas' class='detailsInstrucciones'>
    <summary title='Click me to show or hide instructions related to the basic general options panel'>Basic options</summary>
    <ul>
        <li>
            Explanation of buttons according to their order
            <ol>
                <li>
                    '⏳: 00:00' The timer, which will start when you press 'Start test'
                </li>
                <li>
                    '⏱️: 00:00' The stopwatch, which may or may not be visible depending on whether the test has been completed or not
                </li>
                <li>
                    '⏸︎▶' The button to pause or resume the timer and stopwatch, during the pause the timer can be modified
                </li>
                <li>
                    '↺' The button to reset the timer and stopwatch, as well as activate the mode to be able to fill in initial answers
                </li>
                <li>
                    '?' The button to open this help window in reference to the basic options of the test
                </li>
            </ol>
        </li>
    </ul>
</details>

<details value='instruccionesBotonesPanelIzquierdo' class='detailsInstrucciones'>
    <summary title='Click me to show or hide instructions related to the buttons on the left side panel'>Left side panel buttons</summary>
    <ul>
        <li>
            Explanation of buttons according to their order
            <ol>
                <li>
                    '👁1' To show or hide the primary container
                </li>
                <li>
                    '👁2' To show or hide the secondary container
                </li>
                <li>
                    '👁 Test' The button to show or hide the test question panel
                </li>
                <li>
                    '+-ABC' The button to show or hide the buttons to add or remove the answers to the questions
                </li>
                <li>
                    '◧' To invert colors in both containers only when a file has been loaded
                </li>
                <li>
                    '🔃' To change the orientation of both containers only when both are visible
                </li>
            </ol>
        </li>
    </ul> 
</details>

<details value='contenedorArchivos' class='detailsInstrucciones'>
    <summary title='Click me to show or hide instructions related to the file panel'>File panel</summary> 
    <ul> 
        <li> 
            This panel may or may not be displayed depending on the configuration and previously pressed buttons of the test. 
        </li> 
        <li> 
            Contains draggable bars to configure the size of such containers next to the test panel 
        </li> 
        <li> 
            '⚙' Each container will have a button in its lower left corner to show or hide quick menu option bars, which are: 
            <ul> 
                <li> 
                    Top bar, which will contain the following options expressed in order: 
                    <ol> 
                        <li> 
                            '-' A button to go back one page 
                        </li>
                        <li>
                            A paginator, in which you can view the currently visible page, as well as change it for redirection
                        </li>
                        <li>
                            '+' A button to advance one page
                        </li>
                        <li>
                            '↷📄' A button to rotate the current page
                        </li>
                        <li>
                            '📄📄' A button to rotate all pages. Note: The angle of rotation will be equal to that of the first page
                        </li>
                    </ol>
                </li>
                <li>
                    Right bar, which will contain the following options:
                    <ol>
                        <li>
                            '<div class='contenedorIconosCerrarYArchivoInstruc'><p class='icono2ArchivoInstruc'>📄</p><p class='icono1CerrarInstruc'>❌</p></div>' A button to display a menu in which you can enter, in the correct format, the pages to be deleted as shown in the example.
                        </li>
                        <li>
                            '📄' A button to search for and load a PDF or image file in the adjacent container
                        </li>
                        <li>
                            '❌+📄' '📄+📄' A button to activate addition or substitution mode. When activated, the neighboring add file button will add such a file to the container, if it were deactivated, the new file would replace the previously loaded one
                        </li>
                    </ol>
                </li>
                <li>
                    Bottom bar, which will contain the following options:
                    <ol>
                        <li>
                            '<img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>
                            <img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>'
                            To erase what is painted in this container
                        </li>
                        <li>
                            '<img style='width:20px;height:20px;' src=data:image/x-icon;base64,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Jv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJ6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRvqM5MV+L/VVzV/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaDeLXRpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJv/Rpib/0aYm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib/0aYm/9GmJrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGmJY/Rpib/0aYm/9GmJv/Rpib+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANGnJnbRpib50qYm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P////B////gP///wB///4AP//8AB//+AAP//AAB//gAAP/wAAB/4AAAP8AAAB/AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAfwAAAD+AAAA/wAAAf+AAAP/wAAH/+AAD//wAB//+AA///wAf//+AP///wH///+D////5/8=>'
                            A button to activate or deactivate draft mode, which when activated allows you to manually erase the desired part of the board by clicking where you want to erase
                        </li>
                        <li>
                            '👁 🖌' A button to show or hide what was previously painted, as well as show the 'X' button in the top right corner of each page to be able to delete it from view
                        </li>
                        <li>
                            '🎨' A button to change the color of the brush on the board only for this container
                        </li>
                    </ol>
                </li>
                <li>
                    Left bar, which will contain the following options:
                    <ol>
                        <li>
                            '◧' A button to invert colors on each page
                        </li>
                        <li>
                            '↩' Used to undo point by point the last drawn strokes
                        </li>
                        <li> 
                            '↪' Used to redo point by point previously undone strokes 
                        </li> 
                    </ol> 
                </li> 
            </ul> 
        </li> 
    </ul> 
</details>

<details value='instruccionesPanelTest' class='detailsInstrucciones'>
    <summary title='Click me to show or hide instructions related to the test panel'>Test panel</summary>
    <ul>
        <li>
            When loading the second screen of this application, the questions will be covered by a transparent black layer that represents the 'Start test' button. By clicking on it, the timer and stopwatch will start.
        </li>
        <li>
            In each question we can select 1 or several answer alternatives.
        </li>
        <li>
            In each question we can find several parts:
            <ol>
                <li>
                    The question number, which, if clicked, can change color, representing in common terms, orange for a question in which the answer is uncertain, pink for an incorrect question, the third, red color, to cancel the question and not take it into account for evaluation, and the fourth click will restore the original color.
                </li>
                <li>
                    The possible answer alternatives, previously configured. By clicking on one, in general it will be filled with a black or gray background depending on whether we are within time according to the timer or outside, respectively. It may also happen that we have correction mode enabled or deselect+uncorrect mode.
                </li>
                <li>
                    '🖊️' 'a' Finally, there is a button that will hide or show a text box to write notes, which, when having written content, will change its icon from a pen to the letter 'a'.
                </li>
            </ol>
        </li>
        <li>
            Below you can see two buttons '+' to add or '-' to remove questions from the test
        </li>
        <li>
            At the end of this panel there is a text field for general personalized notes of the test, which can be resized by dragging from its lower right corner.
        </li>
    </ul>
</details>
<details value='formaEvaluacion' class='detailsInstrucciones'>
    <summary title='Click me to show or hide information regarding the evaluation method'>Evaluation method</summary>
    <ul>
        <li>
            Correction formulas are applied to the classification of each question, based on the states of the responses.
        </li>
        <li>
            A question is considered to be incorrectly answered when:
            <ul>
                <li>
                    Contains both an answer filled in and incorrectly.
                </li>
                <li>
                    or if there is a correct answer not selected when there is at least one selected response in that question
                </li>
                <li>
                    Questions that in their part with the question number contain a correction will count as if the number is one more answer and it is selected
                </li>
                <li>
                    Questions without selected answers or question number with correction will be considered as unanswered and will count as incorrect or without effect depending on how it was previously configured
                </li>
            </ul>
        </li>
        <li>
            The questions answered but without correct answer correction, will count as not answered.
        </li>
    </ul>
</details>
`;
fase2OpcionesBasicasEN=escaparScringHtml(fase2OpcionesBasicasEN);

const en = 
`{
    "primerAcceso1": {
        "html": "We recommend accessing the 'Quick Instructions' submenu if this is your first time using Lobotest"
    },
    "1": {
        "config": {
            "contidioma": {
                "title": "Choose the language you want:"
            },
            "contestructura": {
                "title": "Choose the structural column display mode for questions"
            },
            "conttiempos": {
                "title": "Enter the time for the timer"
            },
            "etiquetaTiempo": {
                "html": "Timer:"
            },
            "horas": {
                "html": "Hours:"
            },
            "minutos": {
                "html": "Minutes:"
            },
            "segundos": {
                "html": "Seconds:"
            },
            "contnAlternativas": {
                "title": "Select the number of lettered answer alternatives. Maximum 27"
            },
            "alternativas": {
                "html": "Number of answer alternatives:"
            },
            "contnnumPregMax": {
                "title": "Enter the number of questions to generate:"
            },
            "cantidadpreg": {
                "html": "Number of questions:"
            },
            "contnumPregInicial": {
                "title": "Enter the number of the first test question"
            },
            "pregInicial": {
                "html": "Initial question number:"
            },
            "conttituloTest1": {
                "title": "Enter the title of the test to be conducted"
            },
            "titulo": {
                "html": "Title:"
            },
            "phtitulo": {
                "placeholder": "Enter the test title"
            },
            "btninstruc": {
                "title": "Click me if you have any questions about the application"
            },
            "botonCrearTest": {
                "value": "Create sheet",
                "title": "Click me to work with the parameters you have entered and create the test. In the next window, you can click to start the test"
            }
        },
        "contenedorPDFsFase1": {
            "pestana1": {
                "html": "Tab 1"
            },
            "pestana2": {
                "html": "Tab 2"
            },
            "pcontenidoInicial1": {
                "html": "No PDF or image selected for primary container"
            },
            "contenedorInputFile1": {
                "title": "Click me to add a PDF or image file to this viewer and container 1 in the next window"
            },
            "inputfile1": {
                "html": "Select file 1"
            },
            "contenedorInputFile2": {
                "title": "Click me to add a PDF or image file to this viewer and container 2 in the next window"
            },
            "pcontenidoInicial2": {
                "html": "No PDF or image selected for secondary container"
            },
            "inputfile2": {
                "html": "Select file 2"
            }
        },
        "instruc": {
            "tituloinst": {
                "html": "Instructions for the interactive answer sheet"
            }
        }
    },
    "2": {
        "superior": {
            "pestanaPDF": {
                "title": "Click me to show or hide options related to containers directly",
                "html": "⚙ Container"
            },
            "PDFselect": {
                "title": "Here you can select the container you want to configure"
            },
            "PDFselectoption1": {
                "html": "Panel"
            },
            "PDFselectoption2": {
                "html": "Primary"
            },
            "PDFselectoption3": {
                "html": "Secondary"
            },
            "deformarPDF": {
                "title": "Here you can select the facet to configure in relation to the selected container in my neighbor"
            },
            "deformarPDFopcion1": {
                "html": "Height"
            },
            "deformarPDFopcion2": {
                "html": "Width"
            },
            "deformarPDFopcion3": {
                "html": "Zoom"
            },
            "mas": {
                "title": "Click me to increase the selected facet of the selected container"
            },
            "menos": {
                "title": "Click me to decrease the selected facet of the selected container"
            },
            "mostrarOcultarPDF": {
                "title": "Click me to hide or show the selected container"
            },
            "activarDesactivarModoNoche": {
                "title": "Click me to invert colors in the selected container"
            },
            "borrador": {
                "title": "Click me to activate or deactivate eraser mode in the selected container"
            },
            "rotarPaginas": {
                "title": "Click me to rotate pages"
            },
            "botonColorPincel": {
                "title": "Click me to change the brush color"
            },
            "botonInputFile3": {
                "title": "Click me to load a PDF file or image into the selected container"
            },
            "botonInputFile3Adicion": {
                "title": "Click to tell my neighbor to replace existing content or add"
            },
            "summarymasAccionesTabItem": {
                "title": "Click me to show or hide more options",
                "html": "More actions"
            },
            "botonMostrarOcultarPestanaContenedor": {
                "title": "Show or hide the file container repeating options tab",
                "value": "👁⚙Container"
            },
            "botonDeseleccionar": {
                "title": "While this mode is active, you can click on test answers to deselect them if they were selected and to remove correction if it was marked as correct or incorrect",
                "value": "Deselect+Uncorrect Mode"
            },
            "reiniciarWeb": {
                "title": "Click me to refresh the page and return to the main menu",
                "value": "New test"
            },
            "mostrarOcultarApuntes": {
                "title": "Click me to show or hide text bars for each question to write notes",
                "value": "👁 notes"
            },
            "cambiarColores": {
                "title": "Click me to show the color customization window"
            },
            "botonTerminar": {
                "title": "Click me to finish the test, stop the timer, and be able to fill in answers afterwards",
                "value": "Finish"
            },
            "botonCorregir": {
                "title": "While this mode is active, you can click on answers to mark them as correct. A second click changes it to incorrect, and a third click reverts it back to uncorrected state"
            },
            "botonEvaluar": {
                "title": "Click me to display a window with your evaluation of this test based on your answers and previous corrections",
                "value": "Evaluate"
            },
            "guardarResultado": {
                "title": "Click me to save a report of your test in a file with the name written in the title, which includes your evaluation, notes, and answers"
            },
            "labelTituloTest2": {
                "html": "Title: "
            },
            "tituloTest2": {
                "title": "Enter the test title here",
                "placeholder": "Enter the title of the test"
            },
            "instruc": {
                "title": "Click me if you have any doubts about the application"
            },
            "mostrarOcultarPizarra": {
                "title": "Click me to show or hide the whiteboards contained in container 1 and container 2"
            },
            "resetearPizarra": {
                "title": "Click me to erase all content from the whiteboards contained in container 1 and container 2"
            },
            "cambiarOrientacion": {
                "title": "Click me to change the orientation of containers 1 and 2"
            },
            "separador": {
                "title": "I'm a super cool separator ^_^"
            },
            "divTemporizador": {
                "title": "I'm a timer, I like speed"
            },
            "divCronometro": {
                "title": "I am a stopwatch, I am not as impatient as my neighbor the timer"
            },
            "botonPausarContinuarTiempos": {
                "title": "Click me to pause the timer, and the stopwatch as well, even if it is not visible"
            },
            "reiniciarTiempos": {
                "title": "Click me to reset the timer to the initial time, and the stopwatch to zero"
            },
            "instruc2": {
                "title": "Click me if you have any doubts about the application"
            }
        },
        "barralateral": {
            "botonBarraVerticalConfigPDF1OcultarMostrar": {
                "title": "Click me to show or hide container 1"
            },
            "botonBarraVerticalConfigPDF2OcultarMostrar": {
                "title": "Click me to show or hide container 2"
            },
            "mostrarOcultarContenedorTestYModal": {
                "title": "Click me to show or hide test",
                "value": "👁 Test"
            },
            "mostrarOcultarAnadirQuitarRsp": {
                "title": "Click me to show or hide options to add or remove answer options to each question",
                "value": "+-ABC"
            },
            "botonBarraVerticalConfigPDFMasAnchuraContenedorPDFs": {
                "title": "Click me to horizontally expand both containers, if you haven't reached the maximum limit"
            },
            "botonBarraVerticalConfigPDFMenosAnchuraContenedorPDFs": {
                "title": "Click me to horizontally shrink both containers, if you haven't reached the minimum limit"
            },
            "botonBarraVerticalConfigPDFMasAlturaContenedorPDFs": {
                "title": "Click me to vertically expand both containers, if you haven't reached the maximum limit"
            },
            "botonBarraVerticalConfigPDFMenosAlturaContenedorPDFs": {
                "title": "Click me to vertically shrink both containers, if you haven't reached the minimum limit"
            },
            "botonConfigPDFsActivarDesactivarModoNoche": {
                "title": "Click me to invert the colors of both containers"
            },
            "botonBarraHorizontalConfigPDF1CambiarOrientacion": {
                "title": "Click me to change the orientation of containers 1 and 2"
            }
        },
        "centro": {
            "contenidoBasicoContenedor1": {
                "html": "Container 1"
            },
            "contenidoBasicoContenedor2": {
                "html": "Container 2"
            }
        },
        "menurapido": {
            "botonBarraConfigMenosPaginaPDF1": {
                "title": "Click me to subtract 1 from the current page and focus on it"
            },
            "inputTextPaginaSeleccionadaPDF1": {
                "title": "Click me to enter the desired page number"
            },
            "botonBarraConfigMasPaginaPDF1": {
                "title": "Click me to add 1 to the current page and focus on it"
            },
            "botonBarraConfigRotarPaginaPDF1": {
                "title": "Click me to rotate the selected page"
            },
            "botonBarraConfigRotarTodasPaginasPDF1": {
                "title": "Click me to rotate all pages in this container, without getting dizzy"
            },
            "botonBarraConfigPDF1ActivarDesactivarModoNoche": {
                "title": "Click me to invert the colors of the pages in this container"
            },
            "botonBarraConfigPDF1Deshacer": {
                "title": "Click me to undo the last action"
            },
            "botonBarraConfigPDF1Rehacer": {
                "title": "Click me to redo the last action"
            },
            "botonBarraConfigPDF1BorrarPizarra": {
                "title": "Click me to erase the entire whiteboard of this container"
            },
            "botonBarraConfigPDF1Borrador": {
                "title": "With this mode enabled, you can click anywhere to erase within this container"
            },
            "botonBarraConfigPDF1MostrarOcultarPizarra": {
                "title": "Click me to show or hide what you have drawn"
            },
            "botonBarraConfigPDF1ColorPincel": {
                "title": "Click me to show and choose brush colors"
            },
            "botonBarraConfigPDF1Borrar": {
                "title": "Click me to delete multiple pages"
            },
            "botonBarraConfigPDF1InputFile": {
                "title": "Click me to upload a PDF file or an image. My neighbor will tell me whether to add or replace the existing content"
            },
            "botonBarraConfigPDF1InputFileAdicion": {
                "title": "Click me to tell my neighbor whether to replace the existing content or add to it"
            },
            "divBotonConfigPDF1": {
                "title": "Click me to show the quick menu for this container"
            }
        },
        "barramovil": {
            "lineaDivisoriaMovilHorizontal": {
                "title": "Drag me to change vertical sizes"
            },
            "lineaDivisoriaMovilVertical": {
                "title": "Drag me to change horizontal sizes"
            },
            "lineaDivisoriaMovilVerticalContenedorPDFsYContenedorTestYModal": {
                "title": "Drag me to change horizontal sizes"
            },
            "lineaDivisoriaMovilHorizontalContenedorPDFsYContenedorTestYModal": {
                "title": "Drag me to change vertical sizes"
            }
        },
        "test": {
            "modalTest": {
                "title": "Click me to start the test, activate the timer and stopwatch",
                "value": "Start test"
            },
            "pregunta": {
                "title": "Click me to change the color of the background representative of doubtful question or wrongly formulated question"
            },
            "boli": {
                "title": "Click me to show or hide the notes text bar"
            },
            "phapunteindividual": {
                "placeholder": "Individual question note"
            },
            "ptextoBarraCambioTamanoApunteGeneralTextarea": {
                "html": "↕ General notes ↕"
            },
            "apunteGeneralTextarea": {
                "title": "Here you can enter your notes about this test",
                "placeholder": "My general notes"
            }
        },
        "menuColores": {
            "titulo": {
                "html": "Interface color customization"
            },
            "avisoLocalStorage": {
                "html": "⚠️ Change the color and personalize your experience! We’ll save your preferences on your device. Thank you for choosing us! 😊"
            },
            "varios": {
                "html": "Miscellaneous"
            },
            "fondoPantalla": {
                "html": "Background:"
            },
            "fondoMenu": {
                "html": "Windows menu Background:"
            },
            "fondoAuxiliar": {
                "html": "Assistant windows background:"
            },
            "fondoBotones": {
                "html": "Button Background:"
            },
            "letramenus": {
                "html": "Font:"
            },
            "seleccion": {
                "html": "Selection:"
            },
            "test": {
                "html": "Test"
            },
            "rspRellena": {
                "html": "Filled Response:"
            },
            "rspsinrellenar": {
                "html": "Unfilled Response:"
            },
            "rsprellenatrastiempo": {
                "html": "Delayed Pre-filled Response:"
            },
            "pregsinmarcar": {
                "html": "Unmarked Question:"
            },
            "preguntadudosa": {
                "html": "Question Marked as Doubtful:"
            },
            "preguntamalformulada": {
                "html": "Question Marked as Poorly Formulated:"
            },
            "descripcionselect": {
                "html": "Select text border (auto by default)"
            },
            "optionauto": {
                "html": "Auto"
            },
            "optionblanca": {
                "html": "White"
            },
            "optionnegra": {
                "html": "Black"
            },
            "optionnada": {
                "html": "Nothing"
            },
            "botonrestaurar": {
                "value": "Restore"
            },
            "botonvolver": {
                "value": "Return"
            }
        },
        "menuevaluacion": {
            "titulo": {
                "html": "Configure evaluation"
            },
            "prangopreguntas": {
                "html": "Range of questions"
            },
            "titlerangopreguntas": {
                "title": "Enter the range or ranges of questions to evaluate here"
            },
            "explicacionrangopreguntas": {
                "html": "Separate by commas ',' the questions and ranges of questions you want to evaluate. Ranges are written separated by hyphen '-'. Example: '1,3-5,8' This example will evaluate questions 1,3,4,5 and 8"
            },
            "titlemodoincorrectasevaluacion": {
                "title": "Select the mode to take into account incorrect answers"
            },
            "modoincorrectasoption1": {
                "html": "How much does each incorrect answer subtract?"
            },
            "modoincorrectasoption2": {
                "html": "How many incorrect answers subtract one correct answer?"
            },
            "modoincorrectasoption3": {
                "html": "[C – I / (responses – 1)] * 10 / questions"
            },
            "restanlasincorrectas": {
                "title": "Enter how incorrect answers are subtracted according to the selected mode"
            },
            "pNoContestadasIncorrectas": {
                "html": "Select this check so that unanswered questions count as incorrect"
            },
            "checkNoContestadasIncorrectas": {
                "title": "Fill in so that the unanswered count as incorrect"
            },
            "continuarEvaluacion": {
                "title": "Continue with the selected operation with the given configuration",
                "value": "Continue"
            },
            "cancelarEvaluacion": {
                "title": "Cancel the operation and close the evaluation configuration window",
                "value": "Cancel"
            }
        }
    },
    "contenidoInstruc": {
        "fase1Config": {
            "html": "${fase1ConfigEN}"
        },
        "fase2PestanaContenedor": {
            "html": "${fase2PestanaContenedorEN}"
        },
        "fase2PestanaOpciones": {
            "html": "${fase2PestanaOpcionesEN}"
        },
        "fase2OpcionesBasicas": {
            "html": "${fase2OpcionesBasicasEN}"
        }
    },
    "miAlert": {
        "tituloNuevotest": {
            "html": "New test"
        },
        "nuevotest1": {
            "html": "The test result has not been saved!, press -OK- for new test"
        },
        "nuevotest2": {
            "html": "Are you sure you want to go out and set up a new test?"
        },
        "tituloTextoPaginasAEliminar": {
            "html": "Delete pages"
        },
        "preeliminar": {
            "html": "Enter pages to delete:"
        },
        "textoPaginasAEliminar": {
            "placeholder": "Enter pages to delete"
        },
        "pExplicaciontextoPaginasAEliminar": {
            "html": "Separate by commas ',' the pages and page ranges you want to delete. The ranges are separated by hyphen '-'. Example: '1,3-5,8' In this example, pages 1,3,4,5 and 8 will be removed"
        },
        "formatoIncorrecto": {
            "html": "The format of the text is incorrect."
        },
        "tituloReiniciarTiempos": {
            "html": "Reset times"
        },
        "tituloReiniciarTiemposSeguro": {
            "html": "Are you sure to reset times?"
        },
        "testFinalizado": {
            "html": "Quiz finished"
        },
        "hasTardado": {
            "html": "You took: "
        },
        "horas": {
            "html": " hours"
        },
        "minutos": {
            "html": " minutes"
        },
        "segundos": {
            "html": " seconds"
        },
        "conTiempoInicialDe": {
            "html": " with an initial time of "
        }
    },
    "evaluacion": {
        "tituloResumenGuardado": {
            "html": "Title: "
        },
        "sobradoTiempo": {
            "html": "You have plenty of time: "
        },
        "noCorregidas": {
            "html": "Specific questions answered not corrected: "
        },
        "notaEnTiempo": {
            "html": "Your note in time: "
        },
        "aciertos": {
            "html": "Hits: "
        },
        "errores": {
            "html": "Mistakes: "
        },
        "noContestadasEnTiempo": {
            "html": "Not answered within time: "
        },
        "anuladas": {
            "html": "Cancelled: "
        },
        "notaEnTiempoYFueraDeTiempo": {
            "html": "Your note including answers out of time: "
        },
        "aciertosFueraDeTiempo": {
            "html": "Hits in+out of time: "
        },
        "erroresFueraDeTiempo": {
            "html": "Mistakes in+out of time: "
        },
        "noContestadasEnTiempoYFueraDeTiempo": {
            "html": "Not answered in+out of time: "
        },
        "noCorregidasDentroDeTiempo": {
            "html": "Missing questions to correct answered WITHIN time!!"
        },
        "noCorregidasFueraDeTiempo": {
            "html": "Missing questions to correct answered OUT of time!!"
        }
    },
    "imgDonar": {
        "src": "https://www.paypalobjects.com/en_US/ES/i/btn/btn_donateCC_LG.gif",
        "title": "PayPal - The safer, easier way to pay online!",
        "alt": "Donate with PayPal button"
    },
    "carga": {
        "correcta":{
            "html": "Successful load "
        },
        "incorrecta":{
            "html": "Loading... "
        },
        "incompatibilidades": {
            "html": "Successful load but with detected incompatibilities "
        }
    },
    "leyendaResumenGuardado": {
        "pregSinMarcar":{
            "html": "Unmarked question:"
        },
        "pregDudosa":{
            "html": "Dubious Question:"
        },
        "pregMalformulada":{
            "html": "Poorly phrased question:"
        },
        "pregAnulada":{
            "html": "Question canceled:"
        },
        "rspRellena":{
            "html": "Filled answer:"
        },
        "rspSinRellenar":{
            "html": "Unfilled answer:"
        },
        "rspRellenaFueraTiempo":{
            "html": "Response filled out of time:"
        }
    }
}`;