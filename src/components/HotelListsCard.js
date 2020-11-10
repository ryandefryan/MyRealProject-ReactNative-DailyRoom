import React from 'react';
import { UrlAPI } from './../supports/constants/UrlAPI.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Grid, Row, Text, Col, Card } from 'native-base';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from './../stylesheets/Color.js';
import Spacing from './../stylesheets/Spacing.js';
import Font from './../stylesheets/Typography.js';

export default HotelListsCard = ({index, onPress, name, address, city, price, star, url}) => {

    const renderStar = (totalStar) =>{
        let output = []

        for(var i = 0; i < totalStar; i++){
            output.push(
                <Icon key={i} active name='star' style={{...Spacing.mrOne, ...Font.fsTwo, ...Color.warning}} />
            )
        }

        return output
    } 

    return(            
        <Grid key={index} style={{...Spacing.pxThree, ...Spacing.pyOne}}>
            <Card style={{width: '99%', borderRadius: 5}}>
                <Row style={{borderRadius: 5, ...Color.bgLight, ...Spacing.pxThree, ...Spacing.pyThree}}>
                    <Col style={{width: '35%'}}>
                        <TouchableOpacity onPress={onPress}>
                            <Row>
                                <Image source={{uri: UrlAPI + '/supports/images/public/Hotel_Images/' + url}} style={{width: '100%', height: 255, borderRadius: 5}} />
                            </Row>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{...Spacing.plFive, ...Spacing.prThree}}>
                        <Row>
                            <Text style={{...Font.fsFour, ...Font.fStyleBold}}>
                                {name}
                            </Text>
                        </Row>
                        <Row style={{...Spacing.ptOne}}>
                            {renderStar(star)}
                        </Row>
                        <Row style={{...Spacing.ptOne}}>
                            <Text style={{...Color.darkGrey}}>
                                <Icon name='map-marker' style={{...Spacing.pxThree, ...Font.fsThree, ...Color.darkGrey}} />{address.split(',')[2]}
                            </Text>
                        </Row>
                        <Row style={{...Spacing.ptTwo}}>
                            <Text style={{borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, ...Color.bgPrimary, ...Color.light, ...Spacing.pxOne, ...Spacing.pyOne}}>
                                4.5
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end', ...Spacing.ptTen}}>
                            <Text style={{...Font.fsFour, ...Color.primary}}>
                                Rp.{price}
                            </Text>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Text style={{...Font.fsThree}}>
                                /Room/Night
                            </Text>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Grid>
    )      
}