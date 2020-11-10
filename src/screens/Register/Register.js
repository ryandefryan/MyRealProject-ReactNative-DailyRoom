import React, { useState } from 'react';
import { connect } from 'react-redux';

import { onUserRegister } from './../../redux/actions/UserAction.js';

import { Container, Content, Item, Input, Label, Button, Text, Row, Grid } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const Register = ({ navigation, user, onUserRegister }) => {
    
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const onSubmitRegister = () => {
        onUserRegister(email, password, confirmPassword)
    }

    return(
        <Container>
            <Content>
                
                <Grid>
                    <Row style={{...Spacing.pxFive, ...Spacing.ptFive, ...Spacing.pbTwo}}>
                        <Icon name='chevron-circle-left' onPress={() => navigation.navigate('GetStarted')} style={{...Font.fsEight, ...Color.primary}} />
                    </Row>
                </Grid>
                <Grid>
                    <Row style={{...Spacing.pxFive}}>
                        <Text style={{...Font.fsEight, ...Font.fStyleBold}}>
                            Create
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxFive}}>
                        <Text style={{...Font.fsEight, ...Font.fStyleBold}}>
                            Your Account!
                        </Text>
                    </Row>
                    <Row style={{...Spacing.pxFive, ...Spacing.ptTwo}}>
                        <Text style={{...Font.fsThree, ...Color.darkGrey}}>
                            Fill Your Data Below!
                        </Text>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.ptNine}}>
                    <Row style={{...Spacing.pxFour}}>
                        <Item style={{width: '99%'}}>
                            <Input onChangeText={email => setEmail(email)} placeholder='Email' />
                            <Icon name='envelope-open' style={{...Font.fsFour, ...Color.primary}} />
                        </Item>
                    </Row>
                    <Row style={{...Spacing.pxFour, ...Spacing.ptFive}}>
                        <Item style={{width: '99%'}}>
                            <Input secureTextEntry={true} onChangeText={password => setPassword(password)} placeholder='Password' />
                            <Icon name='eye' style={{...Font.fsFour, ...Color.primary}} />
                        </Item>
                    </Row>
                    <Row style={{...Spacing.pxFour, ...Spacing.ptFive}}>
                        <Item style={{width: '99%'}}>
                            <Input secureTextEntry={true} onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} placeholder='Confirm Password' style={{borderColor: '#000'}} />
                            <Icon name='eye' style={{...Font.fsFour, ...Color.primary}} />
                        </Item>
                    </Row>
                    <Row style={{...Spacing.pxFour}}>
                        {
                            user.error?           
                                <Text style={{...Font.fsTwo, ...Color.danger}}>
                                    {user.error}
                                </Text>
                            :
                                null
                        }
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFour, ...Spacing.ptSix}}>
                    <Row>
                        <Button rounded onPress={onSubmitRegister} disabled={user.loading} style={{width: '100%', ...Color.bgPrimary}} block>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleBold}}>
                                {
                                    user.loading?
                                        'Submit Your Data'
                                    :
                                        'Register'
                                }
                            </Text>
                        </Button>
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pxFour, ...Spacing.ptEight}}>
                    <Row style={{justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', ...Color.darkGrey}}>
                            ────── Or Sign Up With ──────
                        </Text>
                    </Row>
                    <Row style={{justifyContent: 'center', ...Spacing.ptFive}}>
                        <Icon name='google' style={{backgroundColor: '#ff4b4c', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 100, ...Spacing.mxFive, ...Font.fsFive, ...Color.light}} />
                        <Icon name='facebook' style={{backgroundColor: '#0064d2', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 100, ...Spacing.mxFive, ...Font.fsFive, ...Color.light}} />
                        <Icon name='twitter' style={{backgroundColor: '#00a8ff', paddingHorizontal: 11, paddingVertical: 10, borderRadius: 100, ...Spacing.mxFive, ...Font.fsFive, ...Color.light}} />
                    </Row>
                </Grid>
                <Grid style={{...Spacing.pyNine}}>
                    <Row>
                        <Text style={{width: '100%', textAlign: 'center'}}>Already Have Account?<Text onPress={() => navigation.navigate('Login')} style={{width: '100%', textAlign: 'center', ...Font.fStyleBold}}> Login.</Text></Text>
                    </Row>
                </Grid>
            </Content>
      </Container>
    )
}

const mapDispatchToProps = {
    onUserRegister
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)