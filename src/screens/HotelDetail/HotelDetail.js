import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UrlAPI } from './../../supports/constants/UrlAPI.js';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getDetailHotel } from './../../redux/actions/DetailHotelAction.js';

import { Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const HotelDetail = ({ navigation, route, user, detailHotel, getDetailHotel, filterHotel }) => {

    useEffect(() => {
        const dataHotel = route.params;
        console.log('@ScreenHotelDetail: ' + dataHotel.idHotel)

        let idHotel = dataHotel.idHotel
        getDetailHotel(idHotel, filterHotel.newStartDateFormat, filterHotel.newEndDateFormat)
    }, [])

    const onSelectRoom = (idRoom, roomName, roomPrice, room_image_url) => {
        let dataBooking = {
            check_in: filterHotel.newStartDateFormat + ' 14:00:00',
            check_out: filterHotel.newEndDateFormat + ' 12:00:00',
            fullname_guest: null,
            address_guest: null,
            night: filterHotel.night,
            room_id: idRoom,
            hotel_name: detailHotel.data.hotel[0].name,
            room_name: roomName,
            room_price: roomPrice,
            room_image_url: room_image_url,
            token: user.token
        }

        navigation.navigate('FormBooking', {screen: 'FormBooking', params: {dataBooking}})
    }

    const renderStar = (totalStar) => {
        let output = []

        for(var i = 0; i < totalStar; i++){
            output.push(
                <Icon key={i} active name='star' style={{...Spacing.mrOne, ...Font.fsTwo, ...Color.warning}} />
            )
        }

        return output
    }   

    const renderData = () => {
        return(
            <Container key={detailHotel.data.hotel[0].id}>
                <Header style={{...Color.bgPrimary}}>
                    <Left style={{marginLeft: 10}}>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='chevron-left' style={{...Font.fsThree, ...Color.light}} />
                        </Button>
                    </Left>
                    <Body style={{marginLeft: -85}}>
                        <Title style={{marginTop: -3}}>{detailHotel.data.hotel[0].name}</Title>
                    </Body>
                </Header>
                <Content>
                    <Grid>
                        <Row>
                            <Image source={{uri: UrlAPI + detailHotel.data.detailImages[0].url}} style={{width: '100%', height: 300, zIndex: -1}} />
                        </Row>
                    </Grid>
                    <Grid style={{...Spacing.pxFive, ...Spacing.pyThree}}>
                        <Row style={{...Spacing.ptOne}}>
                            <Text style={{borderWidth: 1, borderColor: '#2f5ff0', borderRadius: 3, ...Color.bgPrimary, ...Spacing.pxThree, ...Color.light}}>
                                Hotel
                            </Text>
                        </Row>
                        <Row style={{...Spacing.ptOne}}>
                            <Row style={{flex: 11}}>
                                <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                                    {detailHotel.data.hotel[0].name}
                                </Text>
                            </Row>
                            <Row style={{flex: 3, justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Icon name='share-alt' style={{...Font.fsFive, ...Color.primary}} />
                            </Row>
                        </Row>
                        <Row style={{alignItems: 'center'}}>
                            {
                                renderStar(detailHotel.data.hotel[0].star)
                            }
                            <Text style={{...Color.dark}}>
                                {detailHotel.data.hotel[0].address.split(',')[2]}, {detailHotel.data.hotel[0].city}
                            </Text>
                        </Row>
                    </Grid>
                    <Grid>
                        <Row style={{borderBottomWidth: 5, borderColor: '#f2f2f2'}}>

                        </Row>
                    </Grid>
                    <Grid style={{...Spacing.pxFive, ...Spacing.pyFive}}>
                        <Row>
                            <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                                Common Facilities
                            </Text>
                        </Row>
                        <Row style={{...Spacing.ptFive, ...Spacing.pbTwo}}>
                            {
                                detailHotel.data.facilites.map((value, index) => {
                                    return(
                                        <Row key={index} style={{justifyContent: 'center'}}>
                                            <Image source={{uri: UrlAPI + '/supports/images/public/Hotel_Facilities_Images/' + value.icon}} style={{width: 30, height: 30}} />
                                        </Row>
                                    )
                                })
                            }
                        </Row>
                    </Grid>
                    <Grid>
                        <Row style={{borderBottomWidth: 5, borderColor: '#f2f2f2'}}>

                        </Row>
                    </Grid>
                    <Grid style={{...Spacing.pxFive, ...Spacing.ptFive}}>
                        <Row>
                            <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                                Select Room
                            </Text>
                        </Row>
                    </Grid>
                    {
                        detailHotel.data.rooms.map((value, index) => {
                            return(
                                <Grid key={index} style={{borderWidth: 2, borderRadius: 5, borderColor: '#f2f2f2', ...Spacing.mxFive, ...Spacing.myFive, ...Spacing.pxFive, ...Spacing.pyFive}}>
                                    <Row>
                                        <Image source={{uri: UrlAPI + '/supports/images/public/Room_Images/' + value.room_image_url.split(',')[0]}} style={{width: '100%', height: 100, borderRadius: 3}} />
                                    </Row>
                                    <Row style={{...Spacing.pyThree}}>
                                        <Text style={{...Font.fsFour, ...Font.fStyleBold}}>
                                            {value.name}
                                        </Text>
                                    </Row>
                                    <Row style={{borderBottomWidth: 1, borderColor: '#f2f2f2'}}>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Row style={{justifyContent: 'flex-start', ...Spacing.ptThree}}>
                                                <Text style={{...Font.fsFour, ...Color.primary}}>
                                                    Rp.{value.price}
                                                </Text>
                                            </Row>
                                            <Row style={{justifyContent: 'flex-start', }}>
                                                <Text style={{...Font.fsThree, ...Color.darkGrey}}>
                                                    /Room/Night
                                                </Text>
                                            </Row>
                                        </Col>
                                        <Row style={{justifyContent: 'flex-end', ...Spacing.ptThree}}>
                                            {
                                                value.room_left > 0?
                                                    <Button rounded onPress={() => onSelectRoom(value.id, value.name, value.price, value.room_image_url.split(',')[0])} style={{width: '65%', height: '65%', ...Color.bgSecondary}} block>
                                                        <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.primary}}>
                                                            Select
                                                        </Text>
                                                    </Button>
                                                :
                                                    <Text style={{...Font.fStyleBold, ...Color.danger}}>
                                                        Full Booked!
                                                    </Text>
                                            }
                                        </Row>
                                    </Row>
                                </Grid>
                            )
                        })
                    }
                </Content>
            </Container>
        )
    }

    return(
        <Container>
            {
                detailHotel.data?
                    renderData()
                :
                    <Grid style={{height: 614}}>
                        <Row style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Spinner color='#c6c6c6' />
                        </Row>
                        <Row style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{...Font.fStyleBold}}>
                                Check For Available Room
                            </Text>
                        </Row>
                    </Grid>
            }
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user, // Merujuk Ke File 'index.js'
        filterHotel: state.filterHotel, // Merujuk Ke File 'index.js'
        detailHotel: state.detailHotel, // Merujuk Ke File 'index.js'
    }
}

const mapDispatchToProps = { getDetailHotel }

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetail)