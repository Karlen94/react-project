import React, { useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import { connect } from 'react-redux';
import { logout } from '../../helpersFunctions/auth';
import { getUserInfo } from '../../store/actions';

function NavMenu({ isAuthenticated, getUserInfo, name, surname }) {

    useEffect(() => {
        if (isAuthenticated) {
            getUserInfo();
        }
    }, [getUserInfo, isAuthenticated]);

    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto navLine">
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
                        <div className={styles.nameLine}>
                            Welcome {name} {surname}!
                        </div> :
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
        userInfo: state.userInfo,
    }
};

const mapDispatchToProps = {
    getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);