import '../styles/Tutorial.css';
import TutorialStep from './TutorialStep';
import StartImg from '../assets/tutorial/start.png';
import FillinformImg from '../assets/tutorial/fillinform.png';
import CalendarImg from '../assets/tutorial/calendar.png'; 
import CalendarselectImg from '../assets/tutorial/calendar-select.png';
import CalendarperformanceImg from '../assets/tutorial/calendar-performance.png';
import CalendarcoloredImg from '../assets/tutorial/calendar-colored.png';
import { useTranslation} from "react-i18next";

const Tutorial = () => {
    const { t } = useTranslation();
    const steps = {
        step1:"Paso 1. Da click en 'Empieza ya' o en 'Crear lista de tareas' para dirigirte al formulario",
        step2:"Paso 2. Elige un nombre para tu lista y crea algunas tareas. Asignales a las tareas una relevancia en %",
        step3:"Paso 3. Da click en Calendario",
        step4:"Paso 4. Selecciona una dia del calendario",
        step5:"Paso 5. Selecciona la lista que desees utilizar para el día seleccionado, en este caso 'Mi lista'.",
        step5follow:`Asigna un porcentaje de completado a cada tarea. Por ejemplo si debías trabajar 8hrs
        pero solo has trabajado 4, coloca 50. Da click en enviar y observa tu rendimiento`,
        finalInstruc:`Puedes colocar una lista diferente para cada dia o tener una lista para todos los días, al final del mes
        podras ver algo como esto:`,
        colorCodes:`Los codigos de color del rendimiento son los siguientes:`
    }

    return ( 
        <div className="tutorial">
            <TutorialStep
            img={StartImg}
            step={t("tutorial.step1")}
            />
            <TutorialStep
            img={FillinformImg}
            step={t("tutorial.step2")}
            />
            <TutorialStep
            img={CalendarImg}
            step={t("tutorial.step3")}
            />
            <TutorialStep
            img={CalendarselectImg}
            step={t("tutorial.step4")}
            />
            <TutorialStep
            img={CalendarperformanceImg}
            step={t("tutorial.step5")}
            followup={t("tutorial.step5follow")}
            />
             <TutorialStep
            img={CalendarcoloredImg}
            step={t("tutorial.finalInstruc")}
            />
            
        </div>
     );
}
 
export default Tutorial;