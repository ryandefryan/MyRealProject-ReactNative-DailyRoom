import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Body, Button, Col, Container, Content, Grid, Header, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const Inbox = ({navigation, route}) => {
    
    useEffect(() => {
        console.log(route.params)
    }, [])

    return(
        <Container>
            <Content style={{...Color.bgLightGrey}}>
                <Text>
                    Inbox Pages
                </Text>
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

export default Inbox