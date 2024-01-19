import * as Progress from 'react-native-progress';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { colorSet } from '../helpers/colorSet';

const ProgressBar = ({progPct, color, unfillColor}) => {
    const progColor = colorSet(color)

    return (
        <View style={styles.rowBox}>
            <View style={styles.progressBarBox}>
                <Progress.Bar 
                    progress={progPct} 
                    width={null} 
                    height={15} 
                    borderWidth={2}
                    color={color}
                    unfilledColor={unfillColor}
                    />
            </View>
            <Text style={Object.assign({}, styles.progressText, progColor)}>
                {(progPct * 100) + "%"}
            </Text>

        </View>
    )
}


const styles = StyleSheet.create({
    rowBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    progressBarBox: {
        width: '88%'
    },
    progressText: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 16,
    }
  });

export default ProgressBar