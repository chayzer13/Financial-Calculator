class FinancialCalculator extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      

      this.shadowRoot.innerHTML = `
        <style>
          .calculator {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border: 2px solid #4CAF50;
            border-radius: 10px;
            padding: 20px;
            max-width: 320px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .calculator h3 {
            text-align: center;
            color: #4CAF50;
            font-size: 1.5em;
            margin-bottom: 20px;
          }
          .calculator label {
            display: block;
            margin-bottom: 5px;
            font-size: 0.9em;
            color: #333;
          }
          .calculator input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1em;
            box-sizing: border-box;
          }
          .calculator input:focus {
            border-color: #4CAF50;
            outline: none;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
          }
          .buttons {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
          }
          .calculator button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
          }
          .calculator button:hover {
            background-color: #45a049;
          }
          .results {
            margin-top: 20px;
          }
          .results div {
            margin-bottom: 10px;
            font-size: 1em;
            color: #555;
          }
          .results span {
            font-weight: bold;
            color: #000;
          }
          .results span#monthly-payment {
            color: #4CAF50;
          }
          .results span#total-payment, .results span#total-interest {
            color: #FF5722;
          }
        </style>
        <div class="calculator">
          <h3>Финансовый калькулятор</h3>
          <label for="loan-amount">Сумма кредита:</label>
          <input type="number" id="loan-amount" placeholder="Введите сумму" />
          
          <label for="interest-rate">Процентная ставка (%):</label>
          <input type="number" id="interest-rate" placeholder="Введите ставку" />
          
          <label for="loan-term">Срок кредита (месяцы):</label>
          <input type="number" id="loan-term" placeholder="Введите срок в месяцах" />
          
          <div class="buttons">
            <button id="update-button">Обновить данные</button>
            <button id="clear-button">Очистить калькулятор</button>
          </div>
  
          <div class="results">
            <div>Ежемесячный платеж: <span id="monthly-payment">0</span> руб.</div>
            <div>Общая сумма выплат: <span id="total-payment">0</span> руб.</div>
            <div>Общий процент: <span id="total-interest">0</span> руб.</div>
          </div>
        </div>
      `;
  

      this.loanAmountInput = this.shadowRoot.getElementById('loan-amount');
      this.interestRateInput = this.shadowRoot.getElementById('interest-rate');
      this.loanTermInput = this.shadowRoot.getElementById('loan-term');
      this.updateButton = this.shadowRoot.getElementById('update-button');
      this.clearButton = this.shadowRoot.getElementById('clear-button');

      this.monthlyPaymentOutput = this.shadowRoot.getElementById('monthly-payment');
      this.totalPaymentOutput = this.shadowRoot.getElementById('total-payment');
      this.totalInterestOutput = this.shadowRoot.getElementById('total-interest');

      this.updateButton.addEventListener('click', this.updateCalculations.bind(this));
      this.clearButton.addEventListener('click', this.clearCalculator.bind(this));
    }
  
    connectedCallback() {
      console.log('Финансовый калькулятор создан.');
    }
  
    updateCalculations() {
      const principal = parseFloat(this.loanAmountInput.value);
      const annualInterestRate = parseFloat(this.interestRateInput.value);
      const totalMonths = parseInt(this.loanTermInput.value);

      if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(totalMonths)) {
        console.log('Некорректные данные для расчета.');
        return;
      }

      const monthlyInterestRate = annualInterestRate / 100 / 12;
      const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
      const totalPayment = monthlyPayment * totalMonths;
      const totalInterest = totalPayment - principal;

      this.monthlyPaymentOutput.textContent = monthlyPayment.toFixed(2);
      this.totalPaymentOutput.textContent = totalPayment.toFixed(2);
      this.totalInterestOutput.textContent = totalInterest.toFixed(2);

      console.log('Данные обновлены.');
    }
  
    clearCalculator() {
      this.loanAmountInput.value = '';
      this.interestRateInput.value = '';
      this.loanTermInput.value = '';
      this.monthlyPaymentOutput.textContent = '0';
      this.totalPaymentOutput.textContent = '0';
      this.totalInterestOutput.textContent = '0';
  
      console.log('Калькулятор очищен.');
    }
  }

  customElements.define('financial-calculator', FinancialCalculator);
  