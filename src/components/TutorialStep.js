import Start from '../assets/tutorial/start.png';
import '../styles/TutorialStep.css';

const TutorialStep = () => {
    return ( 
        <div className="tutorial-step">
            <div>Paso 1. Da click en comienza ya para dirigirte al formulario</div>
            <div className="tutorial-step__img-cont">
                <img className='tutorial-step__img' src={Start}/>
            </div>
        </div>
     );
}
 
export default TutorialStep;