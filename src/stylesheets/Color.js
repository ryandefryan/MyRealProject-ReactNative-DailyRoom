const { StyleSheet } = require('react-native');

const Primary = '#0064d2'
const Secondary = '#ffdc02'
const Light = '#f8f8f8'
const Dark = '#505050'
const LightGrey = '#f2f2f2'
const DarkGrey = '#c6c6c6'
const DarkBlue = '#0158b8'
const Warning = '#f6e200'
const Danger = '#ff4b4c'

const color = StyleSheet.create({
    bgPrimary : {
        backgroundColor : Primary
    },
    primary : {
        color : Primary
    },
    bgSecondary : {
        backgroundColor : Secondary
    },
    secondary : {
        color : Secondary
    },
    bgLight : {
        backgroundColor : Light
    },
    light : {
        color : Light
    },
    bgDark : {
        backgroundColor : Dark
    },
    dark : {
        color : Dark
    },
    bgLightGrey : {
        backgroundColor : LightGrey
    },
    lightGrey : {
        color : LightGrey
    },
    bgDarkGrey : {
        backgroundColor : DarkGrey
    },
    darkGrey : {
        color : DarkGrey
    },
    bgDarkBlue : {
        backgroundColor : DarkBlue
    },
    darkBlue : {
        color : DarkBlue
    },
    bgWarning : {
        backgroundColor : Warning
    },
    warning : {
        color : Warning
    },
    bgDanger : {
        backgroundColor : Danger
    },
    danger : {
        color : Danger
    },


    bRadiusOne : {
        borderRadius : 10
    },
    bRadiusTwo : {
        borderRadius : 20
    },
    bRadiusThree : {
        borderRadius : 30
    },
    bRadiusFour : {
        borderRadius : 40
    },
    bRadiusFive : {
        borderRadius : 50
    }
})

export default color