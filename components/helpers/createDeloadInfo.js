import { Text, StyleSheet } from 'react-native';

export const createDeloadInfo = (deload) => {
    if (deload) {
        return (
            <>
                <Text style={styles.weekYes}>YES</Text>
                <Text style={styles.weekText}>Deload</Text>
            </>
        )
    } else {
        return (
            <>
                <Text style={styles.weekNo}>NO</Text>
                <Text style={styles.weekText}>Deload</Text>
            </>
        )
    }
}

const styles = StyleSheet.create({
    weekYes: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 5,
        paddingTop: 8

    },
    weekText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
        textAlign: 'center',
    },
    weekNo: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 28,
        textAlign: 'center',
        paddingBottom: 3,
        paddingTop: 5
    }
})