import React, { useEffect } from 'react';
import { Image } from 'react-native';

import { Container, Content, Row, Grid, Text } from 'native-base';
import Color from './../../stylesheets/Color.js';
import DailyRoomLogo from './../../supports/images/DailyRoomLogo.png';

const Splash = () => {
    return(
        <Container>
            <Content style={{...Color.bgPrimary}}>
                <Grid style={{flexDirection: 'row', width: '100%', height: 400}}>
                    <Row style={{justifyContent: 'center', alignItems: 'flex-end', width: '100%'}}>
                        <Image source={DailyRoomLogo} style={{width: 300, height: 100}} />
                    </Row>
                </Grid>
            </Content>
      </Container>
    )
}

export default Splash