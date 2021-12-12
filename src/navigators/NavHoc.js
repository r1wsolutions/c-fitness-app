import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import NavBar from '../components/nav-bar/NavBar'
import InitialNavigator from './InitialNavigator';
import AuthorizedNavigation from './AuthorizedNavigation';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

const NavHoc = () =>{

    const token = useSelector((state) => state.authReducer.authToken)
    const closeNavBar = useSelector((state)=>state.navBarReducer.closed)
    return(
    <>
        {token.length < 1 &&  <InitialNavigator /> }
        {token.length > 0 && 
            <SelectProvider>
                <AuthorizedNavigation />
                {!closeNavBar && <NavBar/>}
            </SelectProvider>}
    </>
    )
}

export default NavHoc

