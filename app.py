from flask import Flask, render_template

app = Flask(__name__)

# Datos de ejemplo de proyectos (en producción, esto vendría de una base de datos)
PROYECTOS = {
    'santa-leonor': {
        'nombre': 'Santa Leonor',
        'imagen': 'images/carousel1.jpg',
        'descripcion': 'Un proyecto residencial con lotes desde S/. 11,000, ubicado a solo 3 minutos de la Panamericana y la plaza de armas de Viru.',
        'caracteristicas': [
            'Lotes desde 90m²',
            'Áreas verdes y zonas comunes',
            'Alumbrado publico',
            'Punto de agua',
            'Punto de desague',
            'Calles afirmadas'
        ],
        'precio': 'S/. 11,000',
        'ubicacion': 'Viru, La Libertad',
        'entrega': 'En 10 meses',
    'videos': [
            {'titulo': 'Recorrido por Santa Leonor', 'url': 'https://www.youtube.com/embed/dQw4w9WgXcQ'},  # Reemplaza con tu video real
            {'titulo': 'Entrega de lotes', 'url': 'https://www.youtube.com/embed/abc123def456'}  # Ejemplo
        ],
        'planos': [
            {'nombre': 'Ubicación del Proyecto', 'imagen': 'images/plano1.jpg'},
            {'nombre': 'Plano del Proyecto', 'imagen': 'images/plano2.jpg'}
        ],
        'testimonios': [
            {
                'nombre': 'María González',
                'texto': 'Compré mi lote en Santa Leonor y estoy encantada. La ubicación es perfecta y el proceso fue muy sencillo.',
                'imagen': 'images/testimonio1.jpg'
            },
            {
                'nombre': 'Carlos Ruiz',
                'texto': 'Excelente inversión. El valor ha aumentado mucho desde que compré. Recomiendo este proyecto a todos.',
                'imagen': 'images/testimonio2.jpg'
            }
        ]
    },
    'los-portales': {
        'nombre': 'Los Portales',
        'imagen': 'images/carousel2.jpg',
        'descripcion': 'Proyecto urbano con entrega inmediata y precios accesibles, ideal para inversionistas.',
        'caracteristicas': [
            'Lotes desde S/. 31,000',
            'Cercanía a centros comerciales',
            'Financiamiento disponible',
            'Certificado de propiedad'
        ],
        'precio': 'S/. 31,000',
        'ubicacion': 'Virú, La Libertad',
        'entrega': 'Inmediata',
        'videos': [
            {'titulo': 'Tour por Los Portales', 'url': 'https://www.youtube.com/embed/xyz789ijk012'}
        ],
        'planos': [
            {'nombre': 'Plano General', 'imagen': 'images/plano3.jpg'}
        ],
        'testimonios': [
            {
                'nombre': 'Ana López',
                'texto': 'Muy buena atención al cliente. Me ayudaron con todo el proceso de compra y financiamiento.',
                'imagen': 'images/testimonio3.jpg'
            }
        ]
    },
    'chilca-estates': {
        'nombre': 'Chilca Estates',
        'imagen': 'images/carousel3.jpg',
        'descripcion': 'Lotes con vista panorámica y acceso a servicios básicos, perfectos para construir tu hogar soñado.',
        'caracteristicas': [
            'Lotes desde S/. 13,000',
            'Vista a los cerros',
            'Agua y luz disponibles',
            'Acceso pavimentado'
        ],
        'precio': 'S/. 13,000',
        'ubicacion': 'Chilca, Lima',
        'entrega': 'Inmediata',
        'videos': [
            {'titulo': 'Vista panorámica de Chilca Estates', 'url': 'https://www.youtube.com/embed/mno345pqr678'}
        ],
        'planos': [
            {'nombre': 'Plano de Zona Residencial', 'imagen': 'images/plano4.jpg'}
        ],
        'testimonios': [
            {
                'nombre': 'Jorge Pérez',
                'texto': 'El lugar es tranquilo y seguro. Ideal para una vida familiar. Muy contento con mi decisión.',
                'imagen': 'images/testimonio4.jpg'
            }
        ]
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/proyecto/<nombre>')
def proyecto(nombre):
    if nombre not in PROYECTOS:
        return "Proyecto no encontrado", 404
    return render_template('proyecto.html', proyecto=PROYECTOS[nombre])

if __name__ == '__main__':
    app.run(debug=True)