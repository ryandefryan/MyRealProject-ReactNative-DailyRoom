import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { updateMyProfile } from './../../redux/actions/UserProfileAction.js';

import { Body, Button, Card, Col, Container, Content, Grid, Header, Input, Item, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const MyDetailAccount = ({ navigation, user, myProfile, updateMyProfile }) => {

    const [fullname, setFullname] = useState(null)
    const [address, setAddress] = useState(null)
    const [phone, setPhone] = useState(null)

    useEffect(() => {
        setFullname(myProfile.data[0].fullname)
        setAddress(myProfile.data[0].address)
        setPhone(myProfile.data[0].phone)
    }, [])

    const onUpdateMyProfile = () => {
        let data = {
            fullname: fullname,
            address: address,
            phone: phone
        }

        updateMyProfile(data, user.token)
    }

    if(myProfile.data === null){
        return(
            <Container>
                <Header style={{...Color.bgPrimary}}>
                    <Left style={{marginLeft: 10}}>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='chevron-left' style={{...Font.fsThree, ...Color.light}} />
                        </Button>
                    </Left>
                    <Body style={{marginLeft: -85}}>
                        <Title style={{marginTop: -3}}>Detail Account</Title>
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
                <Body style={{marginLeft: -85}}>
                    <Title style={{marginTop: -3}}>Detail Account</Title>
                </Body>
            </Header>
            <Content>
                <Grid style={{...Spacing.pxFive, ...Spacing.pyFive}}>
                    <Row>
                        <Text style={{...Font.fsFive, ...Font.fStyleBold}}>
                            Profile
                        </Text>
                    </Row>
                    <Row style={{...Spacing.ptFive}}>
                        <Item regular style={{width: '100%', borderRadius: 5}}>
                            <Input 
                                value={fullname}
                                onChangeText={fullname => setFullname(fullname)}
                                placeholder='Fullname' 
                                style={{width: '100%'}} 
                            />
                        </Item>
                    </Row>
                    <Row style={{...Spacing.ptFive}}>
                        <Item regular style={{width: '100%', borderRadius: 5}}>
                            <Input 
                                value={address} 
                                onChangeText={address => setAddress(address)}
                                placeholder='Address' 
                                tyle={{width: '100%'}} 
                            />
                        </Item>
                    </Row>
                    <Row>
                        <Text style={{...Spacing.ptFive, ...Font.fsFive, ...Font.fStyleBold}}>
                            Email & Phone
                        </Text>
                    </Row>
                    <Row style={{...Spacing.ptFive}}>
                        <Item regular style={{width: '100%', borderRadius: 5}}>
                            <Input disabled value={myProfile.data[0].email} placeholder='Email' style={{width: '100%', ...Color.bgLightGrey}} />
                        </Item>
                    </Row>
                    <Row style={{...Spacing.ptFive}}>
                        <Item regular style={{width: '100%', borderRadius: 5}}>
                            <Input 
                                value={phone} 
                                onChangeText={phone => setPhone(phone)}
                                placeholder='Phone' 
                                style={{width: '100%'}} 
                            />
                        </Item>
                    </Row>
                    <Row style={{justifyContent: 'center', ...Spacing.pyThree}}>
                        <Icon name='product-hunt' style={{marginTop: -1, ...Spacing.mrOne, ...Font.fsFive, ...Color.secondary}} />
                        <Text style={{textAlign: 'center', ...Font.fsTwo}}>
                            Earn 10.000 Point After Complete Your Profile
                        </Text>
                    </Row>
                    <Row style={{...Spacing.ptFive}}>
                        <Button rounded onPress={onUpdateMyProfile} style={{width: '100%', ...Color.bgPrimary}} block>
                            <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.light}}>
                                Save Profile
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
        user: state.user, 
        myProfile: state.userProfile
    }
}

const mapDispatchToProps = { updateMyProfile }

// export default connect(null, mapDispatchToProps)(MyAccount)
export default connect(mapStateToProps, mapDispatchToProps)(MyDetailAccount)