import React, { useState } from 'react';
import {
  Keyboard,
  ActivityIndicator
} from 'react-native';
import api from '../../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont()

import { 
  Container, 
  Form, 
  SubmitButtom, 
  Input, 
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText
 } from './styles'

export default function Main({ navigation }){

    const [state, setState] = useState({
        users: [],
        newUser: '',
        loading: false,
    })

    const handleAddUser = async () => {

        setState({ loading: true })

        const response = await api.get(`/users/${state.newUser.toLowerCase()}`)
        console.log('o usuário é' + state.newUser)
        console.log('a response' + response.data.login)
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url, 
        }
        console.log('aqui é o data ' + data)

        setState({
          users: [ ...state.users, data],
          newUser: ''
        })

        Keyboard.dismiss()
    }

    const handleNavigate = (user) => {
        navigation.navigate('User', { user })
    }

    return(
        <Container>
           <Form>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Adicionar Usuário"
                value={state.newUser}
                onChangeText={text => 
                  setState({ 
                  users: [ ...state.users],
                  newUser: text
                })}
                returnKeyType='send'
                onSubmitEditing={()=> handleAddUser()}
              />
              <SubmitButtom
                loading={state.loading}
                onPress={()=> handleAddUser()}
              >
                { state.loading ? 
                <ActivityIndicator color="#fff"/> : 
                <Icon name="add" size={20} color="#fff"/> }
              </SubmitButtom>
           </Form> 

           <List
              data={state.users}
              keyExtractor={user => user.login}
              renderItem={({ item }) => (
                <User>
                  <Avatar source={{ uri: item.avatar }}/>
                  <Name>{item.name}</Name>
                  <Bio>{item.bio}</Bio>

                  <ProfileButton onPress={() => handleNavigate(item)}>
                    <ProfileButtonText>
                      Ver Perfil
                    </ProfileButtonText>
                  </ProfileButton>
                </User>
              )}
           />
        </Container>
    )
}