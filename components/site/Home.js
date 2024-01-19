import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
  } from 'react-native';
import InfoBox from '../blocks/InfoBox';
import ButtonItem from '../blocks/ButtonItem';
import { useHomeInfo } from '../../datahooks/useHomeInfo';

const Home = ({navigation}) => {
    const homeInfo = useHomeInfo();

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.headerBanner}>
                    <Text style={styles.header}>
                        BetaTinkr
                    </Text>
                    <Text style={styles.headerSub}>
                        We want to help you train with intent through periodization and progressive overload!
                    </Text>
                    <ButtonItem 
                        navigation={navigation} 
                        route={'TrainingPlans'} 
                        btnInfo={{name: 'Change to Login Btn'}} 
                        bgColor={'#747ed1'} 
                        extraStyling={styles.extraBtnStyling} />
                </View>
                <View style={styles.imgBox}>
                    <Image source={require('../../assets/imgs/about-img.png')}
                            style={styles.imgBanner} />
                </View>
                <View style={styles.itemBox}>
                    {
                        homeInfo.map((info, idx) => {
                            return <InfoBox img={info.img} name={info.name} text={info.text} key={idx + info.name} />
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerBanner: {
        height: 250,
        backgroundColor: '#e9eaf8'
    },
    header: {
      fontFamily: 'Raleway-Bold',
      fontSize: 16,
      marginTop: 30,
      marginBottom: 15,
      color: '#747ed1',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    headerSub: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        color: "#000000",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    imgBox: {
        marginTop: -50,
        marginBottom: 20
    },
    imgBanner: {
        height: 200,
        width: 'auto'
    },
    imgIcon: {
        height: 50,
        width: 50
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column',
    },
    extraBtnStyling: {
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%',
        marginBottom: 5,
        padding: 10
    }
  });

export default Home;