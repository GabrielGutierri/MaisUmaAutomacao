import numpy as np
import matplotlib.pyplot as plt
from flask import Flask, render_template, request, jsonify
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from io import BytesIO
from scipy import signal
import control
import base64

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/grafico/primeira-ordem')
def plot_grafico_primeira_ordem():
    numerador = float(request.args.get('numerador', None))
    denominador = float(request.args.get('denominador', None))
    # Definição da função de transferência
    num = [numerador]
    den = [denominador, 1]
    sys = signal.TransferFunction(num, den)

    # Geração do sinal degrau
    t = np.linspace(0,50,1000)
    u = np.ones_like(t)
    t, y, _ = signal.lsim(sys, u, t)

    # Criação do gráfico
    fig, ax = plt.subplots()
    ax.plot(t, y, label ='Resposta ao Degrau')
    ax.plot(t, u, label = 'Resposta do Sinal de Entrada')
    ax.set_xlabel('Tempo')
    ax.set_ylabel('Saída')
    ax.grid(True)

    # Criação do objeto FigureCanvas e renderização do gráfico
    canvas = FigureCanvas(fig)
    buffer = BytesIO()
    canvas.print_png(buffer)
    image_data = buffer.getvalue()

    # Codificação da imagem em base64
    encoded_image = base64.b64encode(image_data).decode('utf-8')

    # Retorno da imagem como HTML
    return '<img src="data:image/png;base64,{}">'.format(encoded_image)

@app.route('/api/grafico/segunda-ordem')
def plot_grafico_segunda_ordem():
    numerador = float(request.args.get('numerador'))
    denominador1 = float(request.args.get('denominador1'))
    denominador2 = float(request.args.get('denominador2'))
    denominador3 = float(request.args.get('denominador3'))
    # Definição da função de transferência
    num = [numerador]
    den = [1, 2 * denominador1 * denominador2, denominador3]
    sys = signal.TransferFunction(num, den)
    t = np.linspace(0,50,1000)
    u = np.ones_like(t)
    # Geração do sinal degrau
    t, y = signal.step(sys, T=t)

    # Criação do gráfico
    fig, ax = plt.subplots()
    ax.plot(t, y, label = 'Resposta ao Degrau')
    ax.plot(t, u, label = 'Resposta Sinal de Entrada')
    ax.set_xlabel('Tempo')
    ax.set_ylabel('Saída')
    ax.set_title('Resposta ao Degrau')
    ax.grid(True)

    # Criação do objeto FigureCanvas e renderização do gráfico
    canvas = FigureCanvas(fig)
    buffer = BytesIO()
    canvas.print_png(buffer)
    image_data = buffer.getvalue()

    # Codificação da imagem em base64
    encoded_image = base64.b64encode(image_data).decode('utf-8')

    # Retorno da imagem como HTML
    return '<img src="data:image/png;base64,{}">'.format(encoded_image)

@app.route('/api/grafico/primeira-ordem/malha-fechada')
def plot_grafico_primeira_malha_fechada():
    numerador = float(request.args.get('numerador', None))
    denominador = float(request.args.get('denominador', None))
    num = [numerador]
    den = [denominador,1]

    G = control.TransferFunction(num, den)
    H = control.feedback(G)
    t = np.linspace(0, 50, 1000)
    u = np.ones_like(t)
    t_out, y_out = control.step_response(H, T=t, input=u)
    fig, ax = plt.subplots()
    ax.plot(t_out, y_out, label = 'Resposta ao Degrau - Malha Fechada')
    ax.plot(t_out, u, label = 'Resposta Sinal de Entrada')
    ax.set_xlabel('Tempo')
    ax.set_ylabel('Saída')
    ax.grid(True)

    canvas = FigureCanvas(fig)
    buffer = BytesIO()
    canvas.print_png(buffer)
    image_data = buffer.getvalue()
    encoded_image = base64.b64encode(image_data).decode('utf-8')
    return '<img src="data:image/png;base64,{}">'.format(encoded_image)

@app.route('/api/grafico/segunda-ordem/malha-fechada')
def plot_grafico_segunda_malha_fechada():
    numerador = float(request.args.get('numerador'))
    denominador1 = float(request.args.get('denominador1'))
    denominador2 = float(request.args.get('denominador2'))
    denominador3 = float(request.args.get('denominador3'))
    # Definição da função de transferência
    num = [numerador]
    den = [1, 2 * denominador1 * denominador2, denominador3]
    G = control.TransferFunction(num, den)

    # Função de transferência em malha fechada
    H = control.feedback(G)

    # Tempo de simulação
    t = np.linspace(0, 50, 1000)

    # Sinal de degrau
    u = np.ones_like(t)

    # Resposta ao degrau
    t_out, y_out = control.step_response(H, T=t, input=u)

    # Plotagem do gráfico
    fig, ax = plt.subplots()
    ax.plot(t_out, y_out, label = 'Resposta ao Degrau')
    ax.plot(t_out, u, label = 'Resposta ao Sinal de Entrada')
    ax.set_xlabel('Tempo')
    ax.set_ylabel('Saída')
    ax.grid(True)

    canvas = FigureCanvas(fig)
    buffer = BytesIO()
    canvas.print_png(buffer)
    image_data = buffer.getvalue()

    # Codificação da imagem em base64
    encoded_image = base64.b64encode(image_data).decode('utf-8')

    # Retorno da imagem como HTML
    return '<img src="data:image/png;base64,{}">'.format(encoded_image)
 
if __name__ == '__main__':
    app.run()