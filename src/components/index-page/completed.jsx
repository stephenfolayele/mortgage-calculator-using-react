import { useState, useEffect } from "react";

export default function CompletedResultContainer({perMonth, total}){


    const [formattedMonthly, setFormattedMonthly] = useState('')
    const [formattedTotal, setFormattedTotal] = useState('')
  
    useEffect(() => {
      formatData(perMonth, total);
        }, [perMonth, total]);
  
    function formatData(monthly, total){
  
      let formattedMonthly = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(monthly);
      let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(total);
  
      setFormattedMonthly(formattedMonthly)
      setFormattedTotal(formattedTotal)
    }
  
    
    return (
        <div className="box completed-results-container">
            <h3>Your results</h3>
            <p>Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click “calculate repayments” again.
            </p>


            <div className="payment-container">
                <div className="payment">
                <div className="payment-box monthly-payments-container">
                    <p className="monthly-or-interest">Your monthly repayments</p>
                    <h1 id="monthly-rep">{formattedMonthly}</h1>
                </div>
                <hr/>
                <div className="payment-box total-payments-container">
                    <p>Total you'll repay over the term</p>
                    <h3 id="total-rep">{formattedTotal}</h3>
                </div>

                </div>
            </div>
        </div>
    )
}