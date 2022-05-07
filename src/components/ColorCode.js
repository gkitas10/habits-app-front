import styles from '../styles/ColorCode.module.css';

const ColorCode = ({ setShowcolorcode }) => {
    return ( 
        <div className={styles['color-code']}>
            <div className={styles['close-btn']} onClick={() => setShowcolorcode(false)}>X</div>
            <div className={styles.row+' '+styles['titles-row']}>
                <div className={styles.title+' '+styles['title-color']}>
                    Color
                </div>
                <div className={styles.title+' '+styles['title-range']}>
                    Rango de rendimiento
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles['color-cont']}>
                    <div className={styles['verylow-performance']+' '+styles['color']}></div>
                </div>
                <div className={styles['color-code__performance-range']}>
                    40% o menos
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles['color-cont']}>
                    <div className={styles['low-performance']+' '+styles['color']}></div>
                </div>
                <div className={styles['color-code__performance-range']}>
                    De 41% a 60%
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles['color-cont']}>
                    <div className={styles['reg-performance']+' '+styles['color']}></div>
                </div>
                <div className={styles['color-code__performance-range']}>
                    De 61% a 80%
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles['color-cont']}>
                    <div className={styles['good-performance']+' '+styles['color']}></div>
                </div>
                <div className={styles['color-code__performance-range']}>
                    De 81% a 90%
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles['color-cont']}>
                    <div className={styles['great-performance']+' '+styles['color']}></div>
                </div>
                <div className={styles['color-code__performance-range']}>
                    De 91% a 100%
                </div>
            </div>          
        </div>
     );
}
 
export default ColorCode;