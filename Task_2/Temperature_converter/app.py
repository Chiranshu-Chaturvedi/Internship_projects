from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    temperature = float(request.form['temperature'])
    unit = request.form['unit']
    if unit == 'Celsius':
        converted = (temperature * 9/5) + 32  # Celsius to Fahrenheit
        result_unit = 'Fahrenheit'
    else:
        converted = (temperature - 32) * 5/9  # Fahrenheit to Celsius
        result_unit = 'Celsius'
    return render_template('index.html', converted=converted, result_unit=result_unit)

if __name__ == '__main__':
    app.run(debug=True)
