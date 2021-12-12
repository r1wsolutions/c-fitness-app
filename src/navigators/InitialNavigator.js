import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import LandingPage from "../screens/LandingPage/LandingPage"
import AuthPage from "../screens/AuthPage/AuthPage"

const InitialNavigator = createStackNavigator({
   Home: {
       screen: LandingPage,
       navigationOptions:{
           headerTitle:'Cadence Fitness'
       }
       
    },
   AuthPage: {
       screen: AuthPage,
       navigationOptions:{
            headerTitle: 'Join'
       }
    }
})

export default createAppContainer(InitialNavigator)