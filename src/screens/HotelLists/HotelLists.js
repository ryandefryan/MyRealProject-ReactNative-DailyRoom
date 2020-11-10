import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import HotelListsCard from './../../components/HotelListsCard.js';
import { getAllHotels } from './../../redux/actions/ListsHotelAction.js';
import { onSetNewStartDateFormat, onSetNewEndDateFormat } from './../../redux/actions/FilterHotelAction.js';
import MonthFormat from './../../supports/functions/MonthFormat.js';

import { Body, Button, Col, Container, Content, Grid, Header, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const HotelLists = ({navigation, route, getAllHotels, hotels, onSetNewStartDateFormat, onSetNewEndDateFormat, filterHotel}) => {
    
    useEffect(() => {
        const filterBy = route.params;

        let cityName = filterBy.cityName
        let startMonth = MonthFormat(filterBy.startDate)
        let endMonth = MonthFormat(filterBy.endDate)
        let newStartDateFormat = String(filterBy.startDate).split(' ')[3] + '-' + startMonth + '-' + String(filterBy.startDate).split(' ')[1]
        let newEndDateFormat = String(filterBy.endDate).split(' ')[3] + '-' + endMonth + '-' + String(filterBy.endDate).split(' ')[1]

        onSetNewStartDateFormat(newStartDateFormat)
        onSetNewEndDateFormat(newEndDateFormat)

        getAllHotels(cityName, newStartDateFormat, newEndDateFormat)
    }, [])

    const renderData = () => {
        return hotels.data.map((value, index) => {
            return(
              <HotelListsCard 
                key={index} 
                index={index}
                onPress={() => navigation.navigate('HotelDetail', {idHotel: value.id})} 
                name={value.name} 
                address={value.address}
                city={value.city}
                price={value.price} 
                star={value.star}
                url={value.url} 
            />
            )
        })
    }

    return(
        <Container>
            <Header style={{...Color.bgPrimary}}>
                <Left style={{marginLeft: 10}}>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='chevron-left' style={{...Font.fsThree, ...Color.light}} />
                    </Button>
                </Left>
                <Body style={{marginLeft: -85}}>
                    <Row>
                        <Title>{filterHotel.cityName}</Title>
                    </Row>
                    <Row>
                        <Text style={{...Color.light}}>
                            {String(filterHotel.startDate)}, {filterHotel.night}
                        </Text>
                    </Row>
                </Body>
            </Header>
            <Content style={{...Color.bgLightGrey}}>
                {
                    hotels.error?
                        <Grid style={{height: 614}}>
                            <Row style={{justifyContent: 'center', alignItems: 'flex-end', ...Spacing.pyThree}}>
                                <Icon name='wifi' style={{...Font.fsSeven, ...Color.darkGrey}} />
                            </Row>
                            <Row style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={{...Font.fStyleBold}}>
                                    {hotels.error}
                                </Text>
                            </Row>
                        </Grid>
                    :
                        null
                }
                {   
                    hotels.data?
                        hotels.data.length > 0?
                            renderData()
                        :
                            <Grid style={{height: 614}}>
                                <Row style={{justifyContent: 'center', alignItems: 'flex-end', ...Spacing.pyThree}}>
                                    <Icon name='times-circle' style={{...Font.fsSeven, ...Color.danger}} />
                                </Row>
                                <Row style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{...Font.fStyleBold}}>
                                        Hotel Not Found In {stateFilterHotel.cityName} Area
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
                                    Searching For Hotels
                                </Text>
                            </Row>
                        </Grid>
                }
            </Content>
        </Container>
        // <Container>
        //     <Header style={{...Color.bgPrimary}}>
        //         <Body style={{alignItems: 'center', width: '100%'}}>
        //             <Title>Jawa Tengah</Title>
        //         </Body>
        //     </Header>
        //     <Content>
        //     {
        //         hotels.data?
        //             hotels.data.map((value, index) => {
        //                 return(
        //                     <Grid key={index} style={{...Spacing.pxFive, ...Spacing.pyFive}}>
        //                         <Row>
        //                             <Image source={IbisBudget} style={{width: '100%', height: 150, borderTopLeftRadius: 5, borderTopRightRadius: 5}} />
        //                         </Row>
        //                         <Row style={{borderWidth: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderColor: '#dddddd', shadowColor: '#000000', shadowOffset: { width: 50, height: 50 }, shadowOpacity: 0.5, shadowRadius: 0.5, elevation: 0.2}}>
        //                             <Col style={{flex: 6}}>
        //                                 <Row style={{...Spacing.pxFive, ...Spacing.ptThree}}>
        //                                     <Text style={{...Font.fStyleBold}}>{value [' name']}</Text>
        //                                 </Row>
        //                                 <Row style={{...Spacing.pxFive, ...Spacing.ptOne}}>
        //                                     <Text style={{...Color.darkGrey}}>{value.address}</Text>
        //                                 </Row>
        //                                 <Row style={{alignItems: 'center', ...Spacing.pxFive, ...Spacing.ptOne}}>
        //                                     <Icon active name='star' style={{...Font.fsTwo, ...Color.warning}} />
        //                                     <Icon active name='star' style={{...Font.fsTwo, ...Color.warning}} />
        //                                     <Icon active name='star' style={{...Font.fsTwo, ...Color.warning}} />
        //                                     <Icon active name='star' style={{...Font.fsTwo, ...Color.warning}} /> 
                                            
        //                                     <Text style={{paddingLeft: 3, ...Font.fsThree, ...Color.darkGrey}}>
        //                                         3/5 Reviews
        //                                     </Text>
        //                                 </Row>
        //                                 <Row style={{alignItems: 'center', ...Spacing.pxFive, ...Spacing.ptFour, ...Spacing.pbThree}}>
        //                                     <Text style={{paddingLeft: 3, ...Font.fsThree, ...Font.fStyleBold, ...Color.primary}}>
        //                                         Rp.{value.price.toLocaleString('id-ID')}
        //                                     </Text>
        //                                 </Row>
        //                             </Col>
        //                             <Col>
        //                                 <Row style={{justifyContent: 'center', alignItems: 'center', width: 30, height: 30, marginTop: -10, borderRadius: 100, ...Color.bgDanger}}>
        //                                     <Icon active name='heart' style={{...Font.fsFour, ...Color.light}} />
        //                                 </Row>
        //                             </Col>
        //                         </Row>
        //                     </Grid>
        //                 )
        //             })
        //         :
        //             <Text>Loading</Text>
        //     }
        //     </Content>
        // </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        hotels: state.hotels, // Merujuk Ke File 'index.js'
        filterHotel: state.filterHotel
    }
}

const mapDispatchToProps = { getAllHotels, onSetNewStartDateFormat, onSetNewEndDateFormat }

export default connect(mapStateToProps, mapDispatchToProps)(HotelLists)