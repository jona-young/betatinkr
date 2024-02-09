import {
    TouchableOpacity,
    StyleSheet,
    Text,
  } from 'react-native';
import { bgColorSet } from '../../helpers/colorSet';

const ButtonItem = ({navigation, route, btnInfo, bgColor, extraStyling}) => {
    const iconColor = bgColorSet(bgColor)
    const fullStyles = Object.assign({}, styles.button, iconColor, extraStyling)

    return (
        <TouchableOpacity
            style={fullStyles}
            onPress={() => navigation.navigate(route, { indices: btnInfo.indices})}
            key={route + '-' + btnInfo.name}
        >
            <Text style={styles.RalewayBold}>
                {btnInfo.name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        color: 'white',
        borderRadius: 10,
    },
    RalewayBold: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: 'center'
    }
  });

export default ButtonItem;