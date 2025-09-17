// Función para descargar el documento como PDF
function downloadPDF() {
	// Aplicar estilos específicos para PDF antes de generar
	document.body.classList.add('pdf-generation');

	// Detectar si es dispositivo móvil
	const isMobile = window.innerWidth <= 768;
	const isSmallMobile = window.innerWidth <= 480;

	// Obtener el ancho real del contenido
	const contentWidth = Math.max(
		document.body.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.clientWidth,
		document.documentElement.scrollWidth,
		document.documentElement.offsetWidth
	);

	// Configuración optimizada para el PDF basada en el dispositivo
	let options;

	if (isSmallMobile) {
		// Configuración para móviles pequeños
		options = {
			margin: [8, 5, 8, 5],
			filename: 'Propuesta_IgnovaTech_BAPP.pdf',
			image: {type: 'jpeg', quality: 0.95},
			html2canvas: {
				scale: 2.0, // Mayor escala para móviles pequeños
				useCORS: true,
				allowTaint: true,
				letterRendering: true,
				logging: false,
				scrollX: 0,
				scrollY: 0,
				width: 480, // Ancho específico para móviles pequeños
				height: document.body.scrollHeight,
				windowWidth: 480,
				windowHeight: document.body.scrollHeight
			},
			jsPDF: {
				unit: 'mm',
				format: 'a4',
				orientation: 'portrait',
				compress: true
			}
		};
	} else if (isMobile) {
		// Configuración para tablets y móviles medianos
		options = {
			margin: [10, 6, 10, 6],
			filename: 'Propuesta_IgnovaTech_BAPP.pdf',
			image: {type: 'jpeg', quality: 0.96},
			html2canvas: {
				scale: 1.8,
				useCORS: true,
				allowTaint: true,
				letterRendering: true,
				logging: false,
				scrollX: 0,
				scrollY: 0,
				width: 768,
				height: document.body.scrollHeight,
				windowWidth: 768,
				windowHeight: document.body.scrollHeight
			},
			jsPDF: {
				unit: 'mm',
				format: 'a4',
				orientation: 'portrait',
				compress: true
			}
		};
	} else {
		// Configuración para desktop (original)
		options = {
			margin: [10, 8, 10, 8],
			filename: 'Propuesta_IgnovaTech_BAPP.pdf',
			image: {type: 'jpeg', quality: 0.98},
			html2canvas: {
				scale: 1.5,
				useCORS: true,
				allowTaint: true,
				letterRendering: true,
				logging: false,
				scrollX: 0,
				scrollY: 0,
				width: 800,
				height: document.body.scrollHeight,
				windowWidth: 2325,
				windowHeight: document.body.scrollHeight
			},
			jsPDF: {
				unit: 'mm',
				format: 'a4',
				orientation: 'portrait',
				compress: true
			}
		};
	} // Usar solo el contenido del body, no document.documentElement
	const element = document.body;

	// Ocultar elementos no deseados
	const downloadBtn = document.querySelector('button[onclick="downloadPDF()"]');
	if (downloadBtn) {
		downloadBtn.style.display = 'none';
	}

	// Esperar un momento para que se apliquen los estilos
	setTimeout(() => {
		html2pdf()
			.set(options)
			.from(element)
			.save()
			.then(() => {
				// Restaurar elementos
				document.body.classList.remove('pdf-generation');
				if (downloadBtn) {
					downloadBtn.style.display = 'block';
				}
			})
			.catch((error) => {
				console.error('Error al generar PDF:', error);
				document.body.classList.remove('pdf-generation');
				if (downloadBtn) {
					downloadBtn.style.display = 'block';
				}
				alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
			});
	}, 100);
}

// Configuraciones adicionales para mejorar la apariencia del PDF
document.addEventListener('DOMContentLoaded', function () {
	// Agregar estilos específicos para PDF cuando se imprima
	const style = document.createElement('style');
	style.textContent = `
        /* Estilos para generación de PDF */
        .pdf-generation {
            width: 100% !important;
            max-width: none !important;
            overflow: visible !important;
        }
        
        .pdf-generation .container {
            max-width: 950px !important;
            margin: 0 auto !important;
            padding: 0 10px !important;
            width: 100% !important;
        }
        
        .pdf-generation .header {
            padding: 15px 0 !important;
            position: relative !important;
            width: 100% !important;
            margin-bottom: 20px !important;
            min-height: auto !important;
            display: block !important;
        }
        
        .pdf-generation .header-logo {
            position: relative !important;
            height: 60px !important;
            display: inline-block !important;
            vertical-align: middle !important;
            margin-right: 15px !important;
            top: auto !important;
            left: auto !important;
        }
        
        .pdf-generation .header .container {
            text-align: center !important;
        }
        
        .pdf-generation .header-content {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-direction: row !important;
            gap: 15px !important;
        }
        
        .pdf-generation .header-content h1 {
            margin: 0 !important;
            display: inline !important;
        }
        
        .pdf-generation .header-content .subtitle {
            display: none !important;
        }
        
        .pdf-generation button {
            display: none !important;
        }
        
        .pdf-generation .info-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
        }
        
        .pdf-generation .tech-list {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
        }
        
        /* Espaciado específico para PDF generation */
        .pdf-generation .section {
            margin: 2px 0 !important;
        }
        
        .pdf-generation .plan-tecnico h2 {
            margin-bottom: 35px !important;
        }
        
        .pdf-generation .company-info {
            margin: 5px 0 !important;
            padding: 10px !important;
        }
        
        .pdf-generation .page-break {
            margin-top: 10px !important;
            page-break-before: auto !important;
        }
        .pdf-generation .plan-tecnico{
            margin: 75px 0 !important;
        }
        
        .pdf-generation .arquitectura-tecnica{
            margin-top: 45px 0 !important;
            padding-bottom: 0px !important;
        }
        
        .pdf-generation .nuestra-perspectiva{
             margin-bottom: 25px !important;
             padding-bottom: 0 !important;
        }
        
        .pdf-generation .nuestra-perspectiva h3{
            margin: 50px 0 !important;
        }

        .pdf-generation .metodologia-agil{
           margin-bottom: 25px !important;
        }

        .pdf-generation .metodologia-agil h3{
            margin: 50px 0 !important;
        }

        .pdf-generation .nota-importante-sprints{
            margin-bottom: 75px !important;
        }
        
        .pdf-generation .nota-importante-sprints h4 {
            margin: 30px 0!important;
            padding: 12px 0 !important;
            }
            
        .pdf-generation .nota-importante-sprints .key-point{
            margin: 25px 20px !important;
            padding: 12px 20px !important;
        }
                        
        .pdf-generation .propuesta-economica{
            margin: 85px 0px 10px 0px !important;
            padding-top:10px !important;
         }

         .pdf-generation .propuesta-economica h3{
            margin: 55px 0px 30px 0px !important;
         }
        
         .pdf-generation .highlight-box,
        .pdf-generation .key-point {
            margin: 12px 0 !important;
            padding: 12px !important;
        }
        
        .pdf-generation .pricing-box {
            margin: 10px 0 !important;
            padding: 0 20px !important;
        }

        .pdf-generation .pricing-box h3{
            padding-top: 0px !important;
        }
        
        .pdf-generation .arquitectura-tecnica .tech-stack {
            margin: 8px 0 !important;
            padding: 5px !important;
        }
        
        .pdf-generation .sprint-timeline {
            margin: 8px 0 !important;
            padding: 12px !important;
        }
        
        .pdf-generation .sprint-item {
            margin: 30px 0 !important;
            padding: 15px !important;
        }
        
        .pdf-generation h2 {
            margin: 8px 0 6px 0 !important;
        }
        
        .pdf-generation h4 {
            margin: 8px 0 4px 0 !important;
        }

        .pdf-generation .tech-stack h4{
            margin-bottom: 25px !important;
            font-size: 1.2em !important;
        }
        
        .pdf-generation ul {
            margin: 3px 0 !important;
        }
        
        .pdf-generation li {
            margin: 10px 0 !important;
        }
        
        .pdf-generation p {
            margin: 2px 0 !important;
        }
        
        .pdf-generation .footer {
            margin-top: 10px !important;
            padding: 10px !important;
        }
        
        /* Estilos específicos para PDF en móvil */
        @media (max-width: 768px) {
            .pdf-generation .container {
                max-width: 100% !important;
                padding: 0 8px !important;
            }
            
            .pdf-generation .header-logo {
                height: 45px !important;
                margin-right: 10px !important;
            }
            
            .pdf-generation .header-content h1 {
                font-size: 1.8em !important;
            }
            
            .pdf-generation .info-grid {
                grid-template-columns: 1fr !important;
                gap: 15px !important;
            }
            
            .pdf-generation .tech-list {
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
                gap: 8px !important;
            }
            
            .pdf-generation .tech-item {
                padding: 8px 10px !important;
                font-size: 0.9em !important;
            }
            
            .pdf-generation .pricing-box {
                padding: 15px !important;
            }
            
            .pdf-generation .pricing-amount {
                font-size: 2em !important;
            }
            
            .pdf-generation .sprint-item {
                padding: 12px !important;
                margin: 10px 0 !important;
            }
            
            .pdf-generation .highlight-box,
            .pdf-generation .key-point {
                padding: 10px !important;
                margin: 8px 0 !important;
            }
            
            .pdf-generation h2 {
                font-size: 1.4em !important;
                margin: 15px 0 10px 0 !important;
            }
            
            .pdf-generation h3 {
                font-size: 1.1em !important;
                margin: 12px 0 8px 0 !important;
            }
            
            .pdf-generation h4 {
                font-size: 1em !important;
                margin: 8px 0 6px 0 !important;
            }
            
            .pdf-generation li {
                margin: 6px 0 !important;
                font-size: 0.9em !important;
            }
            
            .pdf-generation p {
                font-size: 0.9em !important;
                line-height: 1.4 !important;
            }
        }
        
        @media (max-width: 480px) {
            .pdf-generation .container {
                padding: 0 6px !important;
            }
            
            .pdf-generation .header-logo {
                height: 40px !important;
                margin-right: 8px !important;
            }
            
            .pdf-generation .header-content h1 {
                font-size: 1.6em !important;
            }
            
            .pdf-generation .tech-list {
                grid-template-columns: 1fr !important;
            }
            
            .pdf-generation .pricing-amount {
                font-size: 1.8em !important;
            }
            
            .pdf-generation h2 {
                font-size: 1.2em !important;
            }
            
            .pdf-generation h3 {
                font-size: 1em !important;
            }
            
            .pdf-generation p,
            .pdf-generation li {
                font-size: 0.85em !important;
            }
        }

        @media print {
            /* Espaciado reducido para PDF */
            .section {
                margin: 5px 0 !important;
            }
            
            .company-info {
                margin: 5px 0 !important;
                padding: 10px !important;
            }
            
            .page-break {
                page-break-before: auto !important;
                break-before: auto !important;
                margin-top: 5px !important;
            }
            
            .highlight-box, .key-point {
                page-break-inside: avoid;
                margin: 12px 0 !important;
                padding: 15px !important;
            }
            
            .pricing-box {
                margin: 15px 0 !important;
                padding: 20px !important;
            }
            
            .tech-stack {
                margin: 10px 0 !important;
                padding: 15px !important;
            }
            
            .sprint-timeline {
                margin: 10px 0 !important;
                padding: 15px !important;
            }
            
            .sprint-item {
                page-break-inside: avoid;
                margin: 8px 0 !important;
                padding: 12px !important;
            }
            
            /* Reducir espaciado de títulos */
            h2 {
                margin: 15px 0 12px 0 !important;
            }
            
            h3 {
                margin: 15px 0 8px 0 !important;
            }
            
            h4 {
                margin: 10px 0 6px 0 !important;
            }
            
            /* Reducir padding del header para PDF */
            .header {
                padding: 20px 0 !important;
                position: relative !important;
            }
            
            .header img {
                position: relative !important;
                height: 60px !important;
                display: inline-block !important;
                top: auto !important;
                left: auto !important;
            }
            
            /* Reducir espaciado de listas */
            ul {
                margin: 8px 0 !important;
            }
            
            li {
                margin: 3px 0 !important;
            }
            
            /* Reducir espaciado de párrafos */
            p {
                margin: 5px 0 !important;
            }
            
            button {
                display: none !important;
            }
            
            /* Footer más compacto */
            .footer {
                margin-top: 25px !important;
                padding: 20px !important;
            }
        }
    `;
	document.head.appendChild(style);
});
