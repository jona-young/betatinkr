import {
    TouchableOpacity,
    StyleSheet,
    Text,
  } from 'react-native';
import { bgColorSet } from '../helpers/colorSet';

const SubmitButton = ({navigation, form, bgColor, postRoute, redirectRoute}) => {
    const iconColor = bgColorSet(bgColor)
    const fullStyles = Object.assign({}, styles.button, iconColor)

    return (
        <TouchableOpacity
            style={fullStyles}
            onPress={() => postRoute(form, navigation, redirectRoute)}
            key={bgColor + '- submit'}
        >
            <Text style={styles.RalewayBold}>
                Submit
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        color: 'white',
        borderRadius: 10,
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%',
        marginBottom: 5,
        padding: 10
    },
    RalewayBold: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: 'center'
    }
  });

export default SubmitButton;