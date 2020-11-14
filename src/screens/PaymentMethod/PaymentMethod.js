import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getMyBookings } from './../../redux/actions/BookingAction.js';

import { Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Input, Item, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import { Alert } from 'react-native';
import Color from '../../stylesheets/Color.js';
import Spacing from '../../stylesheets/Spacing.js';
import Font from '../../stylesheets/Typography.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PaymentMethod = ({ navigation, user, booking, getMyBookings }) => {

    const [countDownExpired, setCountDownExpired] = useState(15)
    const [expired, setExpired] = useState(false)

    const onBookingCancelled = () => {
        setCountDownExpired(0)
        setExpired(true)
        Alert.alert(
            'Cancelled',
            'Sorry, Your Booking Cancelled!',
            [
              { text: 'Ok', onPress: () => navigation.navigate('Homeee') }
            ],
            { cancelable: false }
        );
    }

    if(booking.data === null){
        return(
            <Container>
                <Header>
                    <Left/>
                    <Body style={{marginLeft: 115}}>
                        <Title>Payment</Title>
                    </Body>
                    <Right />
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
            <Header>
                <Left/>
                <Body style={{marginLeft: 115}}>
                    <Title>Payment</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Grid style={{...Spacing.pxZero, ...Spacing.pyThree, ...Color.bgDark}}>
                    <Row style={{justifyContent: 'center'}}>
                        {
                            expired?
                            <Text style={{...Spacing.mrOne, ...Font.fsTwo, ...Color.danger}}>
                                Your Booking Cancelled
                            </Text>
                        :
                            <Text style={{...Spacing.mrOne, ...Font.fsTwo, ...Color.light}}>
                                Complete Your Booking In 
                            </Text>
                        }
                            <CountDown
                                until={countDownExpired}
                                onFinish={() => onBookingCancelled()}
                                timeToShow={['M', 'S']}
                                timeLabels={{m: null, s: null}}
                                digitStyle={{backgroundColor: '#ffdc02'}}
                                size={8}
                            />
                    </Row>
                </Grid>
                <Grid style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Spacing.mxFive, ...Spacing.mtFive, ...Spacing.mbZero, ...Spacing.pxZero, ...Spacing.pyOne}}>
                    <Row style={{...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row style={{flex: 1, paddingLeft: 1}}>
                            <Icon name='bed' style={{alignSelf: 'center', width: 30, height: 30, borderRadius: 100, paddingTop: 8, textAlign: 'center', ...Color.bgDanger, ...Color.light}} />
                        </Row>
                        <Col style={{flex: 11, ...Spacing.plThree, ...Spacing.prZero}}>
                            <Row>
                                <Text style={{...Font.fStyleBold}}>
                                    {booking.data.data[0].hotel_name}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={{...Color.darkGrey}}>
                                    1 Room, {Number(String(booking.data.data[0].check_out).split('T')[0].split('-')[2]) - Number(String(booking.data.data[0].check_in).split('T')[0].split('-')[2])} Night
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{borderBottomWidth: 1, borderColor: '#c6c6c6', ...Spacing.mxThree, ...Spacing.myThree}}>

                    </Row>
                    <Row style={{justifyContent: 'flex-end', ...Spacing.mxThree, ...Spacing.mbThree}}>
                        <Row>
                            <Text>
                                Total Payment
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            {
                                expired?
                                    <Text style={{...Font.fStyleBold, ...Color.danger}}>
                                        Cancelled
                                    </Text>
                                :
                                    <Text style={{...Font.fStyleBold, ...Color.primary}}>
                                        Rp.{booking.data.data[0].total}
                                    </Text>
                            }
                        </Row>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.ptEight, ...Spacing.pbZero}}>
                    <Row>
                        <Text>
                            Credit Card / Debit
                        </Text>
                    </Row>
                    {
                        expired?
                            <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mtThree, ...Spacing.pxThree, ...Spacing.pyThree}}>
                                <Row style={{flex: 10}}>
                                    <Text style={{...Font.fsThree, ...Color.darkGrey}}>
                                        Credit Card
                                    </Text>
                                </Row>
                                <Row style={{flex: 2, justifyContent: 'flex-end'}}>
                                    <Icon name='cc-visa' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.darkGrey}} />
                                    <Icon name='cc-mastercard' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.darkGrey}} />
                                    <Icon name='cc-jcb' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.darkGrey}} />
                                </Row>
                            </Row>
                        :
                            <TouchableOpacity onPress={() => navigation.navigate('Payment', {idTransaction: booking.data.data[0].id, expiredAt: booking.data.data[0].expired_at})}>
                                <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mtThree, ...Spacing.pxThree, ...Spacing.pyThree}}>
                                    <Row style={{flex: 10}}>
                                        <Text style={{...Font.fsThree}}>
                                            Credit Card
                                        </Text>
                                    </Row>
                                    <Row style={{flex: 2, justifyContent: 'flex-end'}}>
                                        <Icon name='cc-visa' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.primary}} />
                                        <Icon name='cc-mastercard' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.danger}} />
                                        <Icon name='cc-jcb' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.dark}} />
                                    </Row>
                                </Row>
                            </TouchableOpacity>
                    }
                    <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mtThree, ...Spacing.mbZero, ...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row style={{flex: 10}}>
                            <Text style={{...Font.fsThree, ...Color.darkGrey}}>
                                Debit
                            </Text>
                        </Row>
                        <Row style={{flex: 2, justifyContent: 'flex-end'}}>
                            <Icon name='credit-card' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.darkGrey}} />
                        </Row>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.ptEight, ...Spacing.pbZero}}>
                    <Row>
                        <Text>
                            Other
                        </Text>
                    </Row>
                    <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mtThree, ...Spacing.mbZero, ...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row style={{flex: 10}}>
                            <Text style={{...Font.fsThree, ...Color.darkGrey}}>
                                Other
                            </Text>
                        </Row>
                        <Row style={{flex: 2, justifyContent: 'flex-end'}}>
                            <Icon name='cc-paypal' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.darkGrey}} />
                            <Icon name='cc-discover' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.darkGrey}} />
                        </Row>
                    </Row>
                </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod)