import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UrlAPI } from './../../supports/constants/UrlAPI.js';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getMyProfile } from './../../redux/actions/UserProfileAction.js';
import { onBookingRoom } from '../../redux/actions/BookingAction.js';

import { Body, Button, Card, CardItem, Col, Container, Content, Form, Grid, Header, Input, Item, Label, Left, List, ListItem, Right, Row, Spinner, Text, Title, View } from 'native-base';
import Modal from 'react-native-modal';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FormBooking = ({ navigation, route, user, myProfile, getMyProfile, booking, onBookingRoom }) => {

    const [dataBooking, setDataBooking] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getMyProfile(user.token)
        setDataBooking(route.params.dataBooking)
    }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

    const onContinuePayment = () => {
        onBookingRoom(dataBooking)
        navigation.navigate('PaymentMethod')
    }

    if(myProfile.data === null || dataBooking === null){
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
                                Check-In
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
                                Check-Out
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text style={{...Font.fsFour, ...Color.darkGrey}}>
                                {String(dataBooking.check_out).split(' ')[0]}
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{backgroundColor: '#fdfbfb', borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 5, ...Spacing.mtFive, ...Spacing.mbZero}}>
                        <Row style={{flex: 4}}>
                            <List>
                                <ListItem style={{borderColor: '#f2f2f2'}}>
                                    <Text style={{...Font.fStyleBold, ...Color.dark}}>
                                        Free Cancellation
                                    </Text>
                                </ListItem>
                                <ListItem style={{marginTop: -30, borderColor: '#f2f2f2'}}>
                                    <Text style={{...Font.fsTwo, ...Color.dark}}>
                                        Valid Until 20 December 2020
                                    </Text>
                                </ListItem>
                            </List>
                        </Row>
                        <Row style={{justifyContent: 'flex-end', ...Spacing.pxFive, ...Spacing.pyFive}}>
                            <Text style={{...Font.fStyleBold, ...Color.darkBlue}}>
                                Details
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{borderBottomWidth: 1, borderColor: '#c6c6c6', ...Spacing.mtZero, ...Spacing.mbOne}}>
                        <Text style={{...Font.fStyleBold, ...Spacing.mxZero, ...Spacing.myThree}}>
                            Check-In Procedure
                        </Text>
                    </Row>
                    <Row style={{...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                            Contact Details
                        </Text>
                    </Row>
                    <Row style={{borderRadius: 5, ...Spacing.mtThree, ...Spacing.mbZero, ...Color.bgLightGrey}}>
                        <Row style={{flex: 11}}>
                            <List>
                                <ListItem style={{borderColor: '#f2f2f2'}}>
                                    <Text style={{...Font.fStyleBold, ...Color.dark}}>
                                        {myProfile.data[0].fullname}
                                    </Text>
                                </ListItem>
                                <ListItem style={{marginTop: -30, borderColor: '#f2f2f2'}}>
                                    <Text style={{...Color.dark}}>
                                        {myProfile.data[0].email}
                                    </Text>
                                </ListItem>
                                <ListItem style={{marginTop: -28, borderColor: '#f2f2f2'}}>
                                    <Text style={{...Color.dark}}>
                                        {myProfile.data[0].phone}
                                    </Text>
                                </ListItem>
                            </List>
                        </Row>
                        <Row style={{justifyContent: 'flex-end', ...Spacing.pxFive, ...Spacing.pyFive}}>
                            <Icon name='pencil' style={{...Font.fsFive, ...Color.darkBlue}} />
                        </Row>
                    </Row>
                    <Row style={{...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                            Guest Details
                        </Text>
                    </Row>
                    <TouchableOpacity activeOpacity={1} onPress={toggleModal}>
                        <Row style={{borderRadius: 5, ...Spacing.mtThree, ...Spacing.pxFour, ...Spacing.pyFour, ...Color.bgLightGrey}}>
                            <Row style={{flex: 11}}>
                                {
                                    dataBooking.fullname_guest?
                                        <Text style={{...Font.fStyleBold, ...Color.dark}}>
                                            1 Room: ({dataBooking.fullname_guest})
                                        </Text>
                                    :
                                        <Text style={{...Font.fStyleBold, ...Color.darkBlue}}>
                                            1 Room: (Guest Name)
                                        </Text>
                                }
                            </Row>
                            <Row style={{justifyContent: 'flex-end'}}>
                                <Icon name='pencil' style={{...Font.fsFive, ...Color.darkBlue}} />
                            </Row>
                        </Row>
                    </TouchableOpacity>
                    <Row style={{...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                            Special Request
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pbZero}}>
                        <Text style={{...Font.fsThree, ...Color.darkGrey}}>
                            Have Any Requests To Make Your Stay More Comfortable? Ask Here!
                        </Text>
                    </Row>
                    <Row style={{borderRadius: 5, ...Spacing.mtThree, ...Spacing.mbTwo, ...Spacing.pxFour, ...Spacing.pyFour, ...Color.bgLightGrey}}>
                        <Row style={{flex: 10}}>
                            <Text style={{...Font.fStyleBold, ...Color.darkBlue}}>
                                Make Special Request
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text style={{...Font.fStyleBold, ...Color.darkBlue}}>
                                Add
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{borderBottomWidth: 1, borderColor: '#c6c6c6', ...Spacing.mtSeven, ...Spacing.mbZero}}>

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
                <Modal 
                    isVisible={isModalVisible}
                    onBackdropPress={() => toggleModal()}
                    backdropOpacity={0}
                    backdropColor={'#ffffff'}
                >
                    <Col style={{justifyContent: 'flex-end'}}>
                        <Row style={{height: 311, backgroundColor: '#ffffff', marginBottom: -18, borderRadius: 5, ...Spacing.pxFive, ...Spacing.pyFive}}>
                            <Form style={{width: '100%'}}>
                                <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                                    Contact Details
                                </Text>
                                <Item regular style={{width: '100%', borderRadius: 5, ...Spacing.mtFive, ...Spacing.mbZero}}>
                                    <Input value={dataBooking.fullname_guest} onChangeText={fullname_guest => setDataBooking({...dataBooking, fullname_guest: fullname_guest})} placeholder='Name' />
                                </Item>
                                <Text style={{...Font.fsTwo, ...Color.darkGrey}}>
                                    As on ID/passport/driver's license (without degree)
                                </Text>
                                <Item style={{width: '100%', borderRadius: 5, ...Spacing.mtFive, ...Spacing.mbZero}} regular>
                                    <Input value={dataBooking.address_guest} onChangeText={address_guest => setDataBooking({...dataBooking, address_guest: address_guest})} placeholder='Address' />
                                </Item>
                                <Text style={{...Font.fsTwo, ...Color.darkGrey}}>
                                    Address
                                </Text>
                                <Item style={{width: '100%', borderColor: '#ffffff', ...Spacing.mtFive, ...Spacing.mbZero}} regular>
                                    <Button rounded onPress={toggleModal} style={{width: '100%', ...Color.bgPrimary}} block>
                                        <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.light}}>
                                            Save
                                        </Text>
                                    </Button>
                                </Item>
                            </Form>
                        </Row>
                    </Col>
                </Modal>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user, 
        myProfile: state.userProfile,
        booking: state.booking
    }
}

const mapDispatchToProps = { getMyProfile, onBookingRoom }

export default connect(mapStateToProps, mapDispatchToProps)(FormBooking)