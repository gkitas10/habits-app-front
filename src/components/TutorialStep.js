import '../styles/TutorialStep.css';

const TutorialStep = ({ img, step, followup }) => {
    return ( 
        <div className="tutorial-step">
            <div className='tutorial-step__step-instruc'>{ step }</div>
            { followup && (
                <div className='tutorial-step__followup'>
                    { followup }
                </div>
            )}
            <div className="tutorial-step__img-cont">
                <img className='tutorial-step__img' src={ img }/>
            </div>
        </div>
     );
}
 
export default TutorialStep;