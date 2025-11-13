from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

# Configuración de Flask-Mail (usa Gmail como ejemplo)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'tulotealtoque.mel@gmail.com'  # ← Cambia esto
app.config['MAIL_PASSWORD'] = 'ptof vtnu lejb uxbw'  # ← Cambia esto
app.config['MAIL_DEFAULT_SENDER'] = 'tulotealtoque.mel@gmail.com'

mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send-info', methods=['POST'])
def send_info():
    data = request.json

    # Extraer datos del formulario
    nombre = data.get('nombre')
    apellidos = data.get('apellidos')
    documento = data.get('documento')
    telefono = data.get('telefono')
    correo = data.get('correo')
    horario = data.get('horario')

    # Crear mensaje
    msg = Message(
        subject="Nueva solicitud de información - TU LOTE AL TOQUE",
        recipients=["tulotealtoque.mel@gmail.com"]  # ← Cambia esto
    )

    msg.body = f"""
    Nombre: {nombre} {apellidos}
    Número de documento: {documento}
    Teléfono: {telefono}
    Correo electrónico: {correo}
    Horario preferido: {horario}

    Este mensaje fue enviado desde el formulario de TU LOTE AL TOQUE.
    """

    try:
        mail.send(msg)
        return jsonify({"success": True, "message": "Gracias por tu información. Nos contactaremos contigo pronto."})
    except Exception as e:
        return jsonify({"success": False, "message": "Hubo un error al enviar tu información. Por favor, inténtalo más tarde."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)