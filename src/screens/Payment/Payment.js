import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Input, Item, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const Payment = ({ navigation, booking }) => {

    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        console.log('@ScreenPayment: ' + booking.data)
    }, [])

    if(booking.data === null){
        return(
            <Container>
                <Header style={{...Color.bgPrimary}}>
                    <Left style={{marginLeft: 10}}>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='chevron-left' style={{...Font.fsThree, ...Color.light}} />
                        </Button>
                    </Left>
                    <Body style={{marginLeft: -75}}>
                        <Title style={{marginTop: -3}}>Payment</Title>
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
                    <Title style={{marginTop: -3}}>Payment</Title>
                </Body>
            </Header>
            <Content>
                <Grid style={{...Spacing.pyThree, ...Color.bgDark}}>
                    <Row style={{justifyContent: 'center'}}>
                        <Text style={{...Spacing.mrOne, ...Font.fsTwo, ...Color.light}}>
                            Complete Your Booking In 
                        </Text>
                        <CountDown
                            until={1800}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: null, s: null}}
                            size={8}
                        />
                    </Row>
                </Grid>
                <Grid style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Spacing.mtFive, ...Spacing.mxFive, ...Spacing.pyOne}}>
                    <Row style={{...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row style={{flex: 1, paddingLeft: 1}}>
                            <Icon name='bed' style={{alignSelf: 'center', width: 30, height: 30, borderRadius: 100, paddingTop: 8, textAlign: 'center', ...Color.bgDanger, ...Color.light}} />
                        </Row>
                        <Col style={{flex: 11, ...Spacing.plThree}}>
                            <Row>
                                <Text style={{...Font.fStyleBold}}>
                                    {booking.data.data[0].hotel_name}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={{...Color.darkGrey}}>
                                    1 Room, 1 Night
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
                            <Text style={{...Font.fStyleBold, ...Color.primary}}>
                                Rp.{booking.data.data[0].room_price}
                            </Text>
                        </Row>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.ptEight}}>
                    <Row>
                        <Text>
                            Credit Card / Debit
                        </Text>
                    </Row>
                    <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mtThree, ...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row style={{flex: 10}}>
                            <Text style={{...Font.fsThree}}>
                                Credit Card
                            </Text>
                        </Row>
                        <Row style={{flex: 2, justifyContent: 'flex-end'}}>
                            <Icon name='cc-visa' style={{...Spacing.pxOne, ...Font.fsFive, ...Color.primary}} />
                            <Icon name='cc-mastercard' style={{...Spacing.pxOne, ...Font.fsFive, ...Color.danger}} />
                            <Icon name='cc-jcb' style={{...Spacing.pxOne, ...Font.fsFive, ...Color.dark}} />
                        </Row>
                    </Row>
                    <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mtThree, ...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row style={{flex: 10}}>
                            <Text style={{...Font.fsThree}}>
                                Debit
                            </Text>
                        </Row>
                        <Row style={{flex: 2, justifyContent: 'flex-end'}}>
                            <Icon name='credit-card' style={{...Spacing.pxOne, ...Font.fsFive, ...Color.dark}} />
                        </Row>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.ptEight}}>
                    <Row>
                        <Text>
                            Other
                        </Text>
                    </Row>
                    <Row style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mtThree, ...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row style={{flex: 10}}>
                            <Text style={{...Font.fsThree}}>
                                Other
                            </Text>
                        </Row>
                        <Row style={{flex: 2, justifyContent: 'flex-end'}}>
                            <Icon name='cc-paypal' style={{...Spacing.pxOne, ...Font.fsFive, ...Color.primary}} />
                            <Icon name='cc-discover' style={{...Spacing.pxOne, ...Font.fsFive, ...Color.danger}} />
                        </Row>
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

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(Payment)