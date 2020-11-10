import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { onSetFilterDate } from '../../redux/actions/FilterHotelAction.js';

import { Body, Button, Container, Content, Grid, Header, Left, Right, Row, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const GetDate = ({navigation, onSetFilterDate, filterHotel}) => {

    const [stateStartDate, setStateStartDate] = useState(null)
    const [stateEndDate, setStateEndDate] = useState(null)

    const onDateChange = (date, type) => {
        if(type === 'END_DATE'){
            setStateEndDate(date)
        }else{
            setStateStartDate(date)
        }
    }

    const onGoback = () => {
        if(stateStartDate !== null && stateEndDate !== null){
            onSetFilterDate(stateStartDate, stateEndDate)
            navigation.goBack()
        }
    }

    return(
        <Container>
            <Header style={{...Color.bgPrimary}}>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='chevron-left' style={{...Font.fsThree, ...Color.light}} />
                    </Button>
                </Left>
                <Body>
                    <Title>Check In Date</Title>
                </Body>
                <Right>

                </Right>
            </Header>
            <Content style={{...Color.bgLightGrey}}>
                <Grid style={{...Spacing.pyThree, ...Color.bgLight}}>
                    <Row>
                        <CalendarPicker 
                            onDateChange = {onDateChange}
                            minDate = {new Date()}
                            startFromMonday = {true}
                            allowRangeSelection = {true}
                            
                            selectedDayColor='#0064d2'
                            selectedDayTextColor='#FFFFFF'
                        />
                    </Row>
                    <Row style={{justifyContent: 'center', ...Spacing.pxSix, ...Spacing.pySix}}>
                        <Button onPress={onGoback} style={{width: '100%', ...Color.bgPrimary}} block>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.light}}>
                                Save Date
                            </Text>
                        </Button>
                    </Row>
                </Grid>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        filterHotel: state.filterHotel
    }
}

const mapDispatchToProps = { onSetFilterDate }

export default connect(mapStateToProps, mapDispatchToProps)(GetDate)