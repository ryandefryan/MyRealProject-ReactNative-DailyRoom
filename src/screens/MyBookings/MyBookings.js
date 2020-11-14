import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UrlAPI } from './../../supports/constants/UrlAPI.js';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getMyBookings } from './../../redux/actions/BookingAction.js';

import { Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Input, Item, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const MyBookings = ({ navigation, user, booking, getMyBookings }) => {

    useEffect(() => {
        getMyBookings(user.token)
    }, [])

    const renderData = () => {
        return booking.data.data.map((value, index) => {
            return(
                <Grid key={index} style={{...Color.bgLight, ...Spacing.mtThree, ...Spacing.mbZero, ...Spacing.pxThree, ...Spacing.pyThree}}>
                    <Row>
                        <Image source={{uri: UrlAPI + '/supports/images/public/Room_Images/' + String(value.room_image_url).split(',')[0]}} style={{width: '100%', height: 100}} />
                    </Row>
                    <Row style={{...Spacing.pxThree, ...Spacing.ptThree, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsFour, ...Font.fStyleBold}}>
                            {value.hotel_name}
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxThree, ...Spacing.ptOne, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsThree, ...Font.fStyleLight, ...Color.darkGrey}}>
                            {String(value.check_in).split('T')[0]} - {String(value.check_out).split('T')[0]}
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxThree, ...Spacing.ptOne, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsThree, ...Font.fStyleLight, ...Color.darkGrey}}>
                            1 Room, {Number(String(value.check_out).split('T')[0].split('-')[2]) - Number(String(value.check_in).split('T')[0].split('-')[2])} Night
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxThree, ...Spacing.ptOne, ...Spacing.pbOne}}>
                        {
                            value.status === 'Cancelled'?
                                <Text style={{...Font.fsThree, ...Font.fStyleLight, ...Color.danger}}>
                                    <Icon name='circle' /> {value.status}
                                </Text>
                            :
                                <Text style={{...Font.fsThree, ...Font.fStyleLight, ...Color.primary}}>
                                    <Icon name='circle' /> {value.status}
                                </Text>
                        }
                    </Row>
                </Grid>
            )
        })
    }

    return(
        <Container style={{backgroundColor: '#ebebeb'}}>
            <Header style={{...Color.bgPrimary}}>
                <Left/>
                <Body style={{marginLeft: 90}}>
                    <Title>My Bookings</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                {   
                    booking.data?
                        booking.data.data.length > 0?
                            renderData()
                        :
                            <Grid style={{height: 614}}>
                                <Row style={{justifyContent: 'center', alignItems: 'flex-end', ...Spacing.pxZero, ...Spacing.pyThree}}>
                                    <Icon name='times-circle' style={{...Font.fsSeven, ...Color.danger}} />
                                </Row>
                                <Row style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{...Font.fStyleBold}}>
                                        Your Booking Still Empty
                                    </Text>
                                </Row>
                            </Grid>
                    :
                        <Grid style={{height: 614}}>
                            <Row style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Spinner color='#c6c6c6' />
                            </Row>
                            <Row style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={{...Font.fStyleBold}}>
                                    Please Wait
                                </Text>
                            </Row>
                        </Grid>
                }
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user, 
        booking: state.booking
    }
}

const mapDispatchToProps = { getMyBookings }

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings)