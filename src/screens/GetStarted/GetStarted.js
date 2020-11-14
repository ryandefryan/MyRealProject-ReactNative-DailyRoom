import React, { useState } from 'react';
import { connect } from 'react-redux';

import { onUserRegister } from './../../redux/actions/UserAction.js';

import { Container, Content, Item, Input, Label, Button, Text, Row, Grid, Col } from 'native-base';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';
import ImageBackground from './../../supports/images/Vector2.jpg';

const GetStarted = ({ navigation }) => {
    return(
        <Container>
            <Content>
                <Grid style={{...Spacing.ptEight, ...Spacing.pbZero}}>
                    <Row style={{justifyContent: 'center'}}>
                        <Image source={ImageBackground} style={{width: 425, height: 300, borderRadius: 5}} />
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.pyZero}}>
                    <Row style={{justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', ...Font.fsEight, ...Font.fStyleBold, ...Color.dark}}>
                            Welcome To Our Apps!
                        </Text>
                    </Row>
                    <Row style={{justifyContent: 'center', ...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Text style={{textAlign: 'center', ...Font.fsFive, ...Color.darkGrey}}>
                            The Best Apps For Book Your Room Every Where You Want! 
                            Earn Points Every Book In Our Apps.
                        </Text>
                    </Row>
                </Grid>
                <Grid style={{marginTop: 30, ...Spacing.pxSeven, ...Spacing.ptThree, ...Spacing.pbZero}}>
                    <Row style={{...Spacing.pxZero, ...Spacing.pyThree}}>
                        <Button rounded onPress={() => navigation.navigate('Login')} style={{width: '100%', ...Color.bgPrimary}} block>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleBold}}>
                                Login
                            </Text>
                        </Button>
                    </Row>
                    <Row>
                        <Button rounded onPress={() => navigation.navigate('Register')} style={{width: '100%', borderWidth: 1, borderColor: '#0064d2', ...Color.bgLight}} block>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleBold, ...Color.primary}}>
                                Register
                            </Text>
                        </Button>
                    </Row>
                </Grid>
            </Content>
      </Container>
    )
}

export default GetStarted