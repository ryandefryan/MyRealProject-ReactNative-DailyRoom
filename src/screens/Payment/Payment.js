import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Input, Item, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from '../../stylesheets/Color.js';
import Spacing from '../../stylesheets/Spacing.js';
import Font from '../../stylesheets/Typography.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Payment = ({ navigation, route, booking }) => {

    const [countExpired, setCountExpired] = useState(null)

    useEffect(() => {
        let expiredAt = moment(route.params.expiredAt).format('YYYY-MM-DD HH:mm:ss')
        let now = moment(new Date()).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
        let different = moment.duration(moment(expiredAt).diff(moment(now)));
        console.log('@ScreenPayment: ' + expiredAt)
        console.log('@ScreenPayment: ' + now)

        var minutes = parseInt(different.minutes());
        var seconds = parseInt(different.seconds());

        var totalDifferent = minutes * 60 + seconds + 1;
        setCountExpired(totalDifferent)

        console.log('@ScreenPayment: ' + totalDifferent)
    }, [])

    if(countExpired === null){
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
                        <Text style={{...Spacing.mrOne, ...Font.fsTwo, ...Color.light}}>
                            Complete Your Booking In 
                        </Text>
                        <CountDown
                            until={countExpired}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: null, s: null}}
                            digitStyle={{backgroundColor: '#ffdc02'}}
                            size={8}
                        />
                    </Row>
                </Grid>
                <Grid style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mxFive, ...Spacing.mtFive, ...Spacing.mbZero, ...Spacing.pxZero, ...Spacing.pyOne}}>
                    <Row style={{...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Row>
                            <Text>
                                Price
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text>
                                Rp.10000
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{justifyContent: 'flex-end', marginTop: -10, ...Spacing.pxThree, ...Spacing.pyZero}}>
                        <Text style={{...Font.fsOne, ...Color.darkGrey}}>
                            /Room/Night
                        </Text>
                    </Row>
                    <Row style={{borderBottomWidth: 1, borderColor: '#c6c6c6', ...Spacing.mxThree, ...Spacing.myThree}}>

                    </Row>
                    <Row style={{justifyContent: 'flex-end', ...Spacing.mxThree, ...Spacing.mbThree}}>
                        <Row>
                            <Text style={{...Font.fStyleBold}}>
                                Total Payment
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text style={{...Font.fStyleBold, ...Color.primary}}>
                                Rp.100000
                            </Text>
                        </Row>
                    </Row>
                </Grid>
                <Grid style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Spacing.mxFive, ...Spacing.mtFive, ...Spacing.mbZero, ...Spacing.pxZero, ...Spacing.pyOne}}>
                    <Row style={{...Spacing.pxThree, ...Spacing.pyThree}}>
                        <Text style={{...Color.primary}}>
                            Have Promo Code?
                        </Text>
                    </Row>
                </Grid>
                <Grid style={{borderWidth: 1, borderRadius: 5, borderColor: '#c6c6c6', ...Color.bgLightGrey, ...Spacing.mxFive, ...Spacing.mtFive, ...Spacing.mbZero, ...Spacing.pxZero, ...Spacing.pyOne}}>
                    <Row>
                        <Row style={{...Spacing.pxThree, ...Spacing.pyThree}}>
                            <Text style={{...Font.fStyleBold, ...Color.dark}}>
                                Credit Card
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end', ...Spacing.pxThree, ...Spacing.pyThree}}>
                            <Icon name='cc-visa' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.primary}} />
                            <Icon name='cc-mastercard' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.danger}} />
                            <Icon name='cc-jcb' style={{...Spacing.pxOne, ...Spacing.pyZero, ...Font.fsFive, ...Color.dark}} />
                        </Row>
                    </Row>
                    <Row style={{...Spacing.pxThree, ...Spacing.pyZero}}>
                        <Text style={{...Font.fsThree, ...Color.dark}}>
                            Informasi Penting :
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxThree, ...Spacing.ptZero, ...Spacing.pbThree}}>
                        <Text style={{...Font.fsThree, ...Color.dark}}>
                            Pastikan anda melakukan pembayaran sesuai dengan angka yang tertera hingga digit terakhir.
                        </Text>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive}}>
                    <Row style={{...Spacing.pxZero, ...Spacing.pyFive}}>
                        <Button style={{width: '100%', borderRadius: 5, ...Color.bgSecondary}} block>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.primary}}>
                                Pay My Room
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

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(Payment)