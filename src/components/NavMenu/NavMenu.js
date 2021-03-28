import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import { connect } from 'react-redux';
import { logout } from '../../helpersFunctions/auth';

function NavMenu({ isAuthenticated, name, surname }) {
    console.log(name, surname, );
    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                {
                    isAuthenticated &&
                    <NavLink
                        to='/'
                        activeClassName={styles.active}
                        className={styles.homeLink}
                        exact={true}
                    >
                        Home
                    </NavLink>
                }

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

                {
                    isAuthenticated ?
                        <div>{name} {surname}</div> :
                        <div></div>
                }

                {
                    isAuthenticated ?
                        <Button
                            className={styles.logoutButton}
                            onClick={logout}
                        >Log out
                        </Button> :
                        <>
                            <NavLink
                                to='/register'
                                activeClassName={styles.active}
                                className={styles.registerLink}
                                exact={true}
                            >
                                Register
                    </NavLink>
                            <NavLink
                                to='/login'
                                activeClassName={styles.active}
                                className={styles.loginLink}
                                exact={true}
                            >
                                Login
                    </NavLink>

                        </>
                }

            </Nav>
        </Navbar>

    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
        name: state.name,
        surname: state.surname
    }
};

export default connect(mapStateToProps)(NavMenu);