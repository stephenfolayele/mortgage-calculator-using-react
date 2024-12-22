
import illustration from '../assets/images/illustration-empty.svg'

export default function EmptyResultContainer(){


    return (
        <div className="box empty-results-container">
            <img src={illustration} alt="illustration image"/>
            <h3>Results shown here</h3>
            <p>Complete the form and click “calculate repayments” to see what 
                your monthly repayments would be.</p>
        </div>
    )
}