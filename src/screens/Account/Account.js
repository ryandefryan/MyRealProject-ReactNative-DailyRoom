import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import { UrlAPI } from './../../supports/constants/UrlAPI.js';
import { getMyProfile } from './../../redux/actions/UserProfileAction.js';
import { onLogout } from './../../redux/actions/UserAction.js';

import { Body, Button, Card, Col, Container, Content, Grid, Header, Left, Right, Row, Spinner, Text, Title } from 'native-base';
import { Image } from 'react-native';
import Color from './../../stylesheets/Color.js';
import Spacing from './../../stylesheets/Spacing.js';
import Font from './../../stylesheets/Typography.js';

const MyAccount = ({ navigation, onLogout, user, myProfile, getMyProfile }) => {

    const [photo, setPhoto] = useState(null)
    const [photoLoading, setPhotoLoading] = useState(false)

    useEffect(() => {
        getMyProfile(user.token)
    }, [])

    const onChangeImageProfile = () => {
        ImagePicker.showImagePicker({storageOptions: {privateDirectory: true}}, (response) => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                setPhoto({uri : response.uri, name : response.fileName, size : response.fileSize, type : response.type})
                setPhotoLoading(true)
              }
        })
    }

    const onSaveImageProfile = () => {
        let fd = new FormData()
        fd.append('image', photo)

        Axios.patch( UrlAPI + '/authentic-system/update-image-profile/' + user.token, fd)
        .then((res) => { 
            setPhotoLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if(myProfile.data === null){
        return(
            <Container>
                <Header style={{...Color.bgPrimary}}>
                    <Left style={{marginLeft: 10, marginRight: -50}}>
                        <Text style={{...Color.light}}>
                            Account
                        </Text>
                    </Left>
                    <Body>
                    </Body>
                    <Right style={{marginLeft: -50, marginRight: 10}}>
                        <Icon name='cog' style={{...Font.fsFive, ...Color.darkGrey}} />
                    </Right>
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
                <Left style={{marginLeft: 10, marginRight: -50}}>
                    <Text style={{...Color.light}}>
                        Account
                    </Text>
                </Left>
                <Body>
                </Body>
                <Right style={{marginLeft: -50, marginRight: 10}}>
                    <Icon name='cog' style={{...Font.fsFive, ...Color.darkGrey}} />
                </Right>
            </Header>
            <Content>
                <Grid style={{...Color.bgPrimary, ...Spacing.pyEight}}>

                </Grid>
                <Grid style={{marginTop: -75, ...Spacing.pxFive}}>
                    <Card style={{width: '100%', ...Spacing.pxFive, ...Spacing.pyFive}}>
                        <Row>
                            <Row>
                                {
                                    photo?
                                        <Image 
                                            source={{uri : photo.uri}}
                                            style={{width : 50, height : 50, borderRadius: 100}}
                                        />
                                    :
                                        <Image 
                                            source={{uri : UrlAPI + myProfile.data[0].image}}
                                            style={{width : 50, height : 50, borderRadius: 100}}
                                        />

                                }
                            </Row>
                            <Row style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Icon name='pencil' onPress={() => navigation.navigate('MyDetailAccount')} style={{...Font.fsFive, ...Color.primary}} />
                            </Row>
                        </Row>
                        <Row>
                            <Text style={{fontWeight: '700', ...Font.fsFive}}>
                                
                                {
                                    myProfile.data[0].fullname === null || myProfile.data[0].fullname === ''?
                                        myProfile.data[0].email
                                    :
                                        myProfile.data[0].fullname
                                }
                            </Text>
                        </Row>
                        {
                            myProfile.data[0].fullname === null || myProfile.data[0].address === null || myProfile.data[0].phone === null || myProfile.data[0].fullname === '' || myProfile.data[0].address === '' || myProfile.data[0].phone === ''?
                                <Row>
                                    <Icon name='check-circle' style={{...Spacing.mrOne, ...Font.fsFour, ...Color.darkGrey}} /> 
                                    <Text style={{...Font.fsTwo, ...Color.darkGrey}}>
                                        Unverified
                                    </Text>
                                </Row>
                            :
                                <Row>
                                    <Icon name='check-circle' style={{...Spacing.mrOne, ...Font.fsFour, ...Color.primary}} /> 
                                    <Text style={{...Font.fsTwo, ...Color.primary}}>
                                        Verified
                                    </Text>
                                </Row>
                        }
                        <Row style={{...Spacing.ptThree}}>
                            <Icon name='product-hunt' style={{marginTop: 3, ...Spacing.mrOne, ...Font.fsFive, ...Color.secondary}} />
                            <Text>
                                You Earn<Text style={{...Font.fStyleBold, ...Color.primary}}> 0 Point</Text>
                            </Text>
                        </Row>
                        <Row style={{...Spacing.ptThree}}>
                            {
                                photoLoading?
                                        <Row>
                                            <Button rounded onPress={onSaveImageProfile} style={{width: '100%', ...Color.bgSecondary}} block>
                                                <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.primary}}>
                                                    Save
                                                </Text>
                                            </Button>
                                        </Row>
                                :
                                    <Button rounded onPress={onChangeImageProfile} style={{width: '100%', ...Color.bgSecondary}} block>
                                        <Text style={{width: '100%', textAlign: 'center', ...Font.fsThree, ...Font.fStyleLight, ...Color.primary}}>
                                            Change Image Profile
                                        </Text>
                                    </Button>
                            }
                        </Row>
                    </Card>
                </Grid>
                <Grid style={{...Spacing.plFive, ...Spacing.prFour, ...Spacing.ptFive}}>
                    <Row>
                        <Text style={{...Font.fsTwo}}>
                            Earn Point Every Book Your Room in Daily Room
                        </Text>
                    </Row>
                    <Row style={{borderBottomWidth: 1, borderColor: '#0064d2', ...Spacing.mtOne}}>

                    </Row>
                </Grid>
                <Grid style={{...Spacing.plFive, ...Spacing.prFour, ...Spacing.ptThree}}>
                    <Card style={{width: '100%', ...Spacing.pxFive, ...Spacing.pyThree}}>
                        <Row>
                            <Icon name='question-circle' style={{marginTop: 5, ...Spacing.mrOne, ...Font.fsSix, ...Color.primary}} />
                            <Text style={{...Font.fsTwo}}>
                                Need Help / Have Question? Our <Text style={{...Font.fsTwo, ...Font.fStyleBold}}>Customer Service Center.</Text>
                            </Text>
                        </Row>
                    </Card>
                </Grid>
                <Grid style={{...Spacing.pyEight}}>
                    <Row style={{borderWidth: 5, borderColor: '#f2f2f2'}}>

                    </Row>
                    <Row style={{...Spacing.pxFive, ...Spacing.pyThree}}>
                        <Button transparent onPress={onLogout}>
                            <Text style={{...Color.dark}}>Logout</Text>
                        </Button>
                    </Row>
                    <Row style={{borderWidth: 5, borderColor: '#f2f2f2'}}>

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

const mapDispatchToProps = { onLogout, getMyProfile }

// export default connect(null, mapDispatchToProps)(MyAccount)
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)