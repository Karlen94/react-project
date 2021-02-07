import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenuStyle.module.css';


export default function NavMenu() {

    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">

                <NavLink
                    to='/'
                    activeClassName={styles.active}
                    className={styles.homeLink}
                    exact={true}
                >
                    Home
                    </NavLink>
                <NavLink
                    to='/about'
                    activeClassName={styles.active}
                    className={styles.homeLink}
                    exact={true}
                >
                    About us
                    </NavLink>
                <NavLink
                    to='/contact'
                    activeClassName={styles.active}
                    className={styles.contactLink}
                    exact={true}
                >
                    Contact us
                    </NavLink>
            </Nav>
        </Navbar>

    );
}