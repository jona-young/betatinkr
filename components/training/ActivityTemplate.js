import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
  } from 'react-native';
import SectionTemplate from './SectionTemplate';
import { useActivityTemplateStore } from '../../datastore/useActivityTemplateStore'

const ActivityTemplate = ({route, navigation}) => {
    const { indices } = route.params

    const activityTemplate = useActivityTemplateStore((state) => state.activityTemplates)[indices.activityIndex]

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.banner}>
                <Text style={styles.header}>
                    Activity Template
                </Text>
            </View>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.templateBox}>
                        <SectionTemplate 
                            navigation={navigation} 
                            section={activityTemplate}
                            key={'blocks-' + indices.activityIndex} 
                            indices={indices} />
                    </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#3f78e0',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    header: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 24,
        paddingLeft: 10,
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    boxItem: {
        paddingLeft: 10,
        fontSize: 12,
        fontWeight: '700',
        backgroundColor: 'black',
        color: 'white',
        marginBottom: 10,
        padding: 10
    },
    templateBox: {
        marginLeft: 10,
        marginRight: 10
    }
  });

export default ActivityTemplate;