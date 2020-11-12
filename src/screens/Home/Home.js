import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import { onSetFilterCityName } from '../../redux/actions/FilterHotelAction.js';

import { Body, Button, Card, CardItem, Container, Content, Grid, Header, Item, Input, Row, Text } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';
import DailyRoomLogo from './../../supports/images/DailyRoomLogo.png';
import PromoBanner from './../../supports/images/PromoImage.png';
import PayLaterBanner from './../../supports/images/PayLaterImage.png';
import Monas from './../../supports/images/Monas.jpg';
import GedungSate from './../../supports/images/GedungSate.jpg';
import CandiBorobudur from './../../supports/images/CandiBorobudur.jpg';
import Bali from './../../supports/images/Bali.jpg';

const Home = ({navigation, onSetFilterCityName, filterHotel}) => {
    useEffect(() => {
    }, [filterHotel.startDate])

    const onSearchHotels = () => {
        if(filterHotel.cityName !== null){
            navigation.navigate('HotelLists', {cityName: filterHotel.cityName, startDate: filterHotel.startDate, endDate: filterHotel.endDate, night: filterHotel.night})
        }
    }

    const onQuickSearch = (cityQuickSearch) => {
        onSetFilterCityName(cityQuickSearch)
        navigation.navigate('HotelLists', {cityName: cityQuickSearch, startDate: filterHotel.startDate, endDate: filterHotel.endDate, night: filterHotel.night})
    }

    return(
        <Container>
            <Header style={{...Color.bgPrimary}}>
                <Body style={{alignItems: 'center', width: '100%'}}>
                    <Image source={DailyRoomLogo} style={{width: 150, height: 45}} />
                    </Body>
            </Header>
            <Content>
                <Grid style={{height: 75, marginTop: -40, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, ...Color.bgPrimary}}>
                    <Row>
                        
                    </Row>
                </Grid>
                <Grid style={{alignSelf: 'center', marginTop: -40, ...Spacing.pxThree}}>
                    <Card style={{width: '98%', borderRadius: 3, }}>
                        <CardItem>
                            <Body>
                                <Row style={{width: '100%'}}>
                                    <Item style={{width: '100%'}}>
                                        <Icon name='map-marker' style={{...Spacing.pxThree, ...Font.fsFive, ...Color.darkBlue}} />
                                        <Input value={filterHotel.cityName} onChangeText={onSetFilterCityName} placeholder='Hotel Location' style={{paddingVertical: 0}} />
                                    </Item>
                                </Row>
                                <Row style={{...Spacing.pyFour}}>
                                    <Row style={{flex: 7, ...Spacing.prTwo}}>
                                        <Item style={{width: '100%'}}>
                                            <Icon name='calendar' style={{...Spacing.pxThree, ...Font.fsFive, ...Color.darkBlue}} />
                                            <Input onTouchStart={() => navigation.navigate('DatePicker')} placeholder={String(filterHotel.startDate)} style={{paddingVertical: 0}} />
                                        </Item>
                                    </Row>
                                    <Row style={{flex: 5, ...Spacing.plTwo}}>
                                        <Item style={{width: '100%'}}>
                                            <Input placeholder={String(filterHotel.night)} style={{paddingVertical: 0}} disabled />
                                        </Item>
                                    </Row>
                                </Row>
                                <Row style={{width: '100%'}}>
                                    <Item style={{width: '100%'}}>
                                        <Icon name='user' style={{...Spacing.pxThree, ...Font.fsFive, ...Color.darkBlue}} />
                                        <Input placeholder='1 Room, 2 Adult, 0 Child' style={{paddingVertical: 0}} />
                                    </Item>
                                </Row>
                                <Row style={{...Spacing.ptFour, ...Spacing.ptFive, ...Spacing.pbFive}}>
                                    <Button rounded onPress={onSearchHotels} style={{width: '100%', ...Color.bgSecondary}} block>
                                        <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.primary}}>
                                            Search Hotel
                                        </Text>
                                    </Button>
                                </Row>
                            </Body>
                        </CardItem>
                    </Card>
                </Grid>
                <Grid style={{...Spacing.mtSeven, ...Spacing.pxFive, ...Spacing.pyFour, ...Color.bgLightGrey}}>
                    <Row>
                        <Text>
                            Quick Search
                        </Text>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pySix, justifyContent: 'center'}}>
                    <Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <Image source={Monas} style={{width: 60, height: 60, borderRadius: 100}} />
                        </Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => onQuickSearch('Bandung')}>
                                <Image source={GedungSate} style={{width: 60, height: 60, borderRadius: 100}} />
                            </TouchableOpacity>
                        </Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <Image source={CandiBorobudur} style={{width: 60, height: 60, borderRadius: 100}} />
                        </Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <Image source={Bali} style={{width: 60, height: 60, borderRadius: 100}} />
                        </Row>
                    </Row>
                    <Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <Text style={{...Font.fsThree}}>
                                Jakarta
                            </Text>
                        </Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <Text style={{...Font.fsThree}}>
                                Bandung
                            </Text>
                        </Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <Text style={{...Font.fsThree}}>
                                Jogja
                            </Text>
                        </Row>
                        <Row style={{flex: 3, justifyContent: 'center'}}>
                            <Text style={{...Font.fsThree}}>
                                Bali
                            </Text>
                        </Row>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.pyFour, ...Color.bgLightGrey}}>
                    <Row>
                        <Row>
                            <Text>
                                Recommended
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text style={{...Color.darkGrey}}>
                                See All
                            </Text>
                        </Row>
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

const mapDispatchToProps = { onSetFilterCityName }

export default connect(mapStateToProps, mapDispatchToProps)(Home)