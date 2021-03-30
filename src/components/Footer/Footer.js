import React from 'react';
import { SocialIcon } from 'react-social-icons';
import styles from './footerStyle.module.css';
import { connect } from 'react-redux';

function Footer() {
    return (
        <div className={styles.footer}>

            <div className={styles.linkedin}>
                <SocialIcon url="https://linkedin.com" bgColor='#6a737c' style={{ height: 40, width: 40 }} /> :Linkedin
            </div>
            <div className={styles.gmail}>
                <SocialIcon url="https://gmail.com" bgColor='#6a737c' style={{ height: 40, width: 40 }} /> :Gmail
            </div>
            <div className={styles.github}>
                <SocialIcon url="https://github.com" bgColor='#6a737c' style={{ height: 40, width: 40 }} /> :Github
            </div>
            <br />
            <p className={styles.text}>Copyright © 2021 Facebook Inc.</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        mail: state.email
    }
};

export default connect(mapStateToProps)(Footer);