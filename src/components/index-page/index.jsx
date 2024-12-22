import { useState, useRef, useEffect } from 'react';
import './style.css';
import calculatorLogo from '../assets/images/icon-calculator.svg'
import CompletedResultContainer from './completed';
import EmptyResultContainer from './empty';

// calculator app

export default function MortgageCalculator(){
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [rate, setRate] = useState('');
    const [mortgageType, setMortgageType] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [totalPayment, setTotalPayment] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [showResults, setShowResults] = useState(false);

    const ref = useRef()


    useEffect(() => {
      setShowResults(false);
        }, []);

      function handleCalculate () {
            setValidationErrors({});
            let isValid = true;
            
            if (isNaN(amount) || amount <= 0) {
            setValidationErrors((prev) => ({ ...prev, amount: true }));
            isValid = false;
            }
        
            if (isNaN(term) || term <= 0) {
            setValidationErrors((prev) => ({ ...prev, term: true }));
            isValid = false;
            }
        
            if (isNaN(rate) || rate <= 0) {
            setValidationErrors((prev) => ({ ...prev, rate: true }));
            isValid = false;
            }
        
            if (!mortgageType) {
            setValidationErrors((prev) => ({ ...prev, type: true }));
            isValid = false;
            }
        
            if (isValid) {
            let monthlyPaymentCalc = 0;
            let totalPaymentCalc = 0;
        
            if (mortgageType === 'repayment') {
                const monthlyRate = rate / 100 / 12;
                const n = term * 12;
                monthlyPaymentCalc = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n));
                totalPaymentCalc = monthlyPaymentCalc * n;
            } else if (mortgageType === 'interest-only') {
                monthlyPaymentCalc = (amount * rate / 100) / 12;
                totalPaymentCalc = monthlyPaymentCalc * term * 12;
            }
        
            setMonthlyPayment(monthlyPaymentCalc.toFixed(2));
            setTotalPayment(totalPaymentCalc.toFixed(2));
            setShowResults(true);
            } else {
            setMonthlyPayment('');
            setTotalPayment('');
            setShowResults(false);
            }
        };


              
  function handleClear (event) {
    event.preventDefault();
    ref.current.reset();
    setAmount('');
    setTerm('');
    setRate('');
    setMortgageType('');
    setMonthlyPayment('');
    setTotalPayment('');
    setValidationErrors({});
    setShowResults(false);
  }

    return (
            <div className="container" id='link'>
                <form className="form" action="" ref={ref}>
                    <div className="box morgage-calc-container">
                    <div className="calculator-heading">
                    <h3>Mortgage Calculator</h3>
                    <a href="#link" className="clear" onClick={handleClear}>Clear All</a>
                    </div>

                    <div className="amount">
                        <p>Morgage Amount</p>
                        <div className={`value input-title ${validationErrors.amount ? 'border' : null}`}>
                        <span className="amount-symbol">£</span>
                        <input 
                        className="morgage-amt value-input" 
                        type="number" 
                        onChange={(e)=>{setAmount(e.target.value)}}
                        required/>
                        </div>
                        {
                            validationErrors.amount ? <p className="error-msg">This field is required</p> : null
                        }
                        
                    </div>

                    <div className="morgage-term-interest">
                        <div className="term">
                        <p>Morgage Term</p>
                        <div className={`value input-title ${validationErrors.term ? 'border' : null}`}>
                            <input 
                            className="morgage-term value-input" 
                            type="number" 
                            onChange={(e)=>{setTerm(e.target.value)}}
                            required/>
                            <span className="term-interest-span">years</span>
                        </div>
                        {
                            validationErrors.term ? <p className="error-msg">This field is required</p> : null
                        }
                        
                        </div>

                        <div className="rate">
                        <p>Interest Rate</p>
                        <div className={`value input-title ${validationErrors.rate ? 'border' : null}`}>
                            <input 
                            className="morgage-rate value-input"
                            type="number" 
                            onChange={(e)=>(setRate(e.target.value))}
                            required/>
                            <span className="term-interest-span">%</span>
                        </div>
                        {
                            validationErrors.rate ? <p className="error-msg">This field is required</p> : null
                        }
                        
                        </div>
                    </div>

                    <div className="morgage-type">
                    <p>Mortgage Type</p>
                        <div className={`radio input-title ${mortgageType === 'repayment'? 'selected' : null}`}>
                        <input 
                        className="input-margin" 
                        type="radio" 
                        name="repayment-format" 
                        value="repayment" 
                        id="choice1"
                        onChange={(e)=> setMortgageType(e.target.value)}/>
                        <label htmlFor="choice1">Repayment</label>
                        </div>
                        
                        <div className={`radio input-title ${mortgageType === 'interest-only'? 'selected' : null}`}>
                        <input 
                        className="input-margin" 
                        type="radio" 
                        name="repayment-format" 
                        value="interest-only" 
                        id="choice2"
                        onChange={(e)=> setMortgageType(e.target.value)}
                        />
                        <label htmlFor="choice2">Interest Only</label>
                        </div>
                        {
                            validationErrors.type ? <p className="error-msg">This field is required</p> : null
                        }
                    </div>

                    <div 
                    className="button"
                    onClick={handleCalculate}>
                    <img src={calculatorLogo} alt="calculate icon"/>
                    <span>Calculate Repayments</span>
                    </div>
                    </div>
                </form>
            <div className="result-container">

                {
                    showResults ? <CompletedResultContainer perMonth={monthlyPayment} total={totalPayment} /> 
                    : <EmptyResultContainer/>
                }


            </div>
            </div>
    )
}