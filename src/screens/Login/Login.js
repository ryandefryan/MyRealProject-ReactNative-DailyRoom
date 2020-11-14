import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {onEmailChange, onPasswordChange, onLogin} from './../../redux/actions/UserAction.js';

import { Container, Content, Form, Item, Input, Label, Button, Text, Col, Row, Grid } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const Login = ({ navigation, user, onEmailChange, onPasswordChange, onLogin }) => {
    return(
        <Container>
            <Content>
                <Grid>
                    <Row style={{...Spacing.pxFive, ...Spacing.ptFive, ...Spacing.pbTwo}}>
                        <Icon name='chevron-circle-left' onPress={() => navigation.navigate('GetStarted')} style={{...Font.fsEight, ...Color.primary}} />
                    </Row>
                </Grid>
                <Grid>
                    <Row style={{...Spacing.pxFive, ...Spacing.pyZero}}>
                        <Text style={{...Font.fsEight, ...Font.fStyleBold}}>
                            Hello,
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxFive, ...Spacing.pyZero}}>
                        <Text style={{...Font.fsEight, ...Font.fStyleBold}}>
                            Welcome Back!
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxFive, ...Spacing.ptThree, ...Spacing.pbZero}}>
                        <Text style={{...Font.fsThree, ...Color.darkGrey}}>
                            Enter Your Account To Get Your Room!
                        </Text>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.ptEight, ...Spacing.pbZero}}>
                    <Row style={{...Spacing.pxFive, ...Spacing.pyZero}}>
                        <Item style={{width: '99%'}}>
                            <Input value={user.email} onChangeText={onEmailChange} placeholder='Email' />
                            <Icon name='envelope-open' style={{...Font.fsFour, ...Color.primary}} />
                        </Item>
                    </Row>
                    <Row style={{...Spacing.pxFive, ...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Item style={{width: '99%'}}>
                            <Input secureTextEntry={true} value={user.password} onChangeText={onPasswordChange} placeholder='Password' />
                            <Icon name='eye' style={{...Font.fsFour, ...Color.primary}} />
                        </Item>
                    </Row>
                    <Row style={{...Spacing.pxFive}}>
                        {
                            user.error?           
                                <Text style={{...Font.fsTwo, ...Color.danger}}>
                                    {user.error}
                                </Text>
                            :
                                null
                        }
                    </Row>
                    <Row style={{alignSelf: 'flex-end', ...Spacing.pxFive, ...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Text style={{textAlign: 'right', ...Font.fStyleBold, ...Color.primary}}>Forgot Password?</Text>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.ptFive, ...Spacing.pbFive}}>
                    <Row>
                        <Button rounded onPress={() => onLogin(user.email, user.password)} style={{width: '100%', ...Color.bgPrimary}}>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleBold}}>Login</Text>
                        </Button>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFive, ...Spacing.ptFive, ...Spacing.pbFive}}>
                    <Row style={{justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', ...Color.darkGrey}}>
                            ─────── Or Login With ───────
                        </Text>
                    </Row>
                    <Row style={{justifyContent: 'center', ...Spacing.ptFive, ...Spacing.pbZero}}>
                        <Icon name='google' style={{backgroundColor: '#ff4b4c', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 100, ...Spacing.mxFive, ...Spacing.myZero, ...Font.fsFive, ...Color.light}} />
                        <Icon name='facebook' style={{backgroundColor: '#0064d2', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 100, ...Spacing.mxFive, ...Spacing.myZero, ...Font.fsFive, ...Color.light}} />
                        <Icon name='twitter' style={{backgroundColor: '#00a8ff', paddingHorizontal: 11, paddingVertical: 10, borderRadius: 100, ...Spacing.mxFive, ...Spacing.myZero, ...Font.fsFive, ...Color.light}} />
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxZero, ...Spacing.pyTen}}>
                    <Row>
                        <Text style={{width: '100%', textAlign: 'center'}}>Don't Have Account?<Text onPress={() => navigation.navigate('Register')} style={{width: '100%', textAlign: 'center', ...Font.fStyleBold}}> Register.</Text></Text>
                    </Row>
                </Grid>
            </Content>
      </Container>
    )
}

const mapStateToProps = (store) => {
    return{
        user: store.user
    }
}

export default connect(mapStateToProps, { onEmailChange, onPasswordChange, onLogin })(Login)