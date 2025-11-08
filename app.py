import os
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
        'entrega': 'En 10 meses'
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
        'entrega': 'Inmediata'
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
        'entrega': 'Inmediata'
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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)