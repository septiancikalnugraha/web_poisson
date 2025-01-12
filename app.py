from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

# Route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle the Poisson calculation
@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        lambda_value = float(data['lambda'])
        k_value = int(data['k'])

        # Poisson Distribution formula
        result = (lambda_value ** k_value) * math.exp(-lambda_value) / math.factorial(k_value)

        return jsonify({'success': True, 'result': result})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
