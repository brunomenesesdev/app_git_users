import React, { useState, useEffect } from 'react';
import {
    View,
    Keyboard,
    ActivityIndicator
} from 'react-native';

import api from '../../services/api'

import { 
    Container, 
    Header, 
    Avatar, 
    Name, 
    Bio, 
    Stars, 
    Starred, 
    OwnerAvatar, 
    Info, 
    Title, 
    Author } from './styles'


export default function User({ route, navigation }){
    const [stars, setStars] = useState({
        data: []
    })
    const [user, setUser] = useState(route.params.user)

    useEffect(()=> {
        const title = user.name
        navigation.setOptions({ title: title })

        async function getApi(){
            const response = await api.get(`/users/${user.login}/starred`)
            setStars({ data: [ ...response.data ] })
        }
        getApi()

    }, [])

    return(
        <Container>
            <Header>
                <Avatar source={{ uri: user.avatar }}/>
                <Name>{user.name}</Name>
                <Bio>{user.bio}</Bio>
            </Header>
            <Stars
                data={stars.data}
                keyExtractor={start => String(start.id)}
                renderItem={({ item }) => (
                    <Starred>
                        <OwnerAvatar source={{ uri: item.owner.avatar_url }}/>
                        <Info>
                            <Title>
                                {item.name}
                            </Title>
                            <Author>
                                {item.owner.login}
                            </Author>
                        </Info>
                    </Starred>
                )}
            />
        </Container>
    )
}