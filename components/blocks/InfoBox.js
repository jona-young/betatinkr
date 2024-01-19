import {
    StyleSheet,
    Text,
    Image,
    View,
  } from 'react-native';


const InfoBox = ({img, name, text, _key}) => {
    return (
        <View style={styles.rowBox} key={_key}>
            <Image source={img} 
                    style={styles.imgIcon} />
            <View style={styles.itemBox}>
                <Text style={styles.contentHeader}>
                    {name}
                </Text>
                <Text style={styles.contentText}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imgIcon: {
        height: 50,
        width: 50
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
        marginBottom: 15,
        width: '82%'
    },
    rowBox: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 5,
    },
    contentHeader: {
        fontFamily: 'Raleway-Bold',
        marginBottom: 5,
        fontSize: 14,
        color: "#000000",
    },
    contentText: {
        fontFamily: 'Raleway-Medium',
        marginBottom: 5,
        fontSize: 12,
        color: "#9499a3",
    }
  });

export default InfoBox;