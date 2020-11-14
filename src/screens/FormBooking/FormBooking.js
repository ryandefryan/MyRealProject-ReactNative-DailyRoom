import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UrlAPI } from './../../supports/constants/UrlAPI.js';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { onBookingRoom } from '../../redux/actions/BookingAction.js';

import { Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Input, Item, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const FormBooking = ({ navigation, route, booking, onBookingRoom }) => {

    const [dataBooking, setDataBooking] = useState(null)

    useEffect(() => {
        setDataBooking(route.params.dataBooking)
    }, [])

    const onContinuePayment = () => {
        onBookingRoom(dataBooking)
        navigation.navigate('PaymentMethod')
    }

    if(dataBooking === null){
        return(
            <Container>
                <Header style={{...Color.bgPrimary}}>
                    <Left style={{marginLeft: 8}}>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='chevron-left' style={{...Font.fsThree, ...Color.light}} />
                        </Button>
                    </Left>
                    <Body style={{marginLeft: -75}}>
                        <Title style={{marginTop: -3}}>Form Booking</Title>
                    </Body>
                </Header>
                <Content>
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
                </Content>
            </Container>
        )
    }

    return(
        <Container>
            <Header style={{...Color.bgPrimary}}>
                <Left style={{marginLeft: 10}}>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='chevron-left' style={{...Font.fsThree, ...Color.light}} />
                    </Button>
                </Left>
                <Body style={{marginLeft: -75}}>
                    <Title style={{marginTop: -3}}>Form Booking</Title>
                </Body>
            </Header>
            <Content>
                <Grid style={{...Spacing.pxFive, ...Spacing.pyFive}}>
                    <Row>
                        <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                            Booking Details
                        </Text>
                    </Row>
                    <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Spacing.mtFive, ...Spacing.mbZero, ...Spacing.pxFour, ...Spacing.pyFour}}>
                        <Col style={{flex: 8}}>
                            <Row style={{flex: 4}}>
                                <Image source={{uri: UrlAPI + '/supports/images/public/Room_Images/' + dataBooking.room_image_url}} style={{width: '100%', height: 100, borderRadius: 3}} />
                            </Row>
                            <Row style={{...Spacing.pxThree, ...Spacing.ptThree, ...Spacing.pbZero}}>
                                <Text style={{...Font.fsFour, ...Font.fStyleBold}}>
                                    {dataBooking.hotel_name}
                                </Text>
                            </Row>
                            <Row style={{...Spacing.pxThree, ...Spacing.pyZero}}>
                                <Text style={{...Font.fsFour, ...Color.darkGrey}}>
                                    {dataBooking.room_name}
                                </Text>
                            </Row>
                            <Row style={{...Spacing.pxThree, ...Spacing.pyZero}}>
                                <Text style={{...Font.fsFour, ...Color.darkGrey}}>
                                    1 Room, {dataBooking.night}
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{...Spacing.ptFive}}>
                        <Row>
                            <Text style={{...Font.fsFour, ...Font.fStyleLight}}>
                                Check-in
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text style={{...Font.fsFour, ...Color.darkGrey}}>
                                {String(dataBooking.check_in).split(' ')[0]}
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{...Spacing.ptOne, ...Spacing.pbZero}}>
                        <Row>
                            <Text style={{...Font.fsFour, ...Font.fStyleLight}}>
                                Check-out
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text style={{...Font.fsFour, ...Color.darkGrey}}>
                                {String(dataBooking.check_out).split(' ')[0]}
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{...Spacing.ptSeven, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                            Contact Details
                        </Text>
                    </Row>
                    <Row style={{...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Item style={{width: '100%', borderRadius: 5}} regular>
                            <Input onChangeText={fullname_guest => setDataBooking({...dataBooking, fullname_guest: fullname_guest})} placeholder='Name' />
                        </Item>
                    </Row>
                    <Row>
                        <Text style={{...Font.fsTwo, ...Color.darkGrey}}>
                            As on ID/passport/driver's license (without degree)
                        </Text>
                    </Row>
                    <Row style={{...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Item style={{width: '100%', borderRadius: 5}} regular>
                            <Input onChangeText={address_guest => setDataBooking({...dataBooking, address_guest: address_guest})} placeholder='Address' />
                        </Item>
                    </Row>
                    <Row>
                        <Text style={{...Font.fsTwo, ...Color.darkGrey}}>
                            Address
                        </Text>
                    </Row>
                    <Row style={{borderBottomWidth: 1, borderColor: '#c6c6c6', ...Spacing.mtSeven}}>

                    </Row>
                    <Row style={{...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Row>
                            <Text style={{...Font.fsFive, ...Font.fStyleLight}}>
                                Total
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text style={{...Font.fsFive, ...Font.fStyleBold, ...Color.darkBlue}}>
                                Rp.{dataBooking.total}
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Button rounded onPress={onContinuePayment} style={{width: '100%', ...Color.bgSecondary}} block>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.primary}}>
                                {
                                    booking.loading?
                                        'Please Wait'
                                    :
                                        'Continue Payment'
                                }
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
        booking: state.booking
    }
}

const mapDispatchToProps = { onBookingRoom }

export default connect(mapStateToProps, mapDispatchToProps)(FormBooking)