import React from 'react';
import styles from './aboutStyle.module.css';


export default function About() {

    return (
        <div className={styles.aboutDiv}>
            <h1>Information about Me</h1>
            <p className={styles.aboutP}>Բարև Ձեզ։Ես կցանկանայի որպես սկսնակ ծրագրավորող պրակտիկա անցնել Ձեր ընկերությունում և հետագայում դառնալով հմուտ մասնագետ, որպես ավելի արժեքվոր կադր աշխատել Ձեր թիմում։Կից ուղարկում եմ իմ ռեզյումեն՝ JS developers հաստիքի համար։Պատրաստ եմ նաև քննարկել  Ձեր առաջարկները։Ինձ հետ կարող եք կապնվել ինչպես էլ․ փոստով, այնպես էլ հեռախոսով։

            Հարգանքներով՝ Կառլեն Կարապետյան 
            </p>
        </div>
    );
}