import React, { Component } from "react";
import { Keyboard, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Form, Input, SubmitButton, SubTitle, SubTitle2,DetailStatus2, StatusDeath, StatusAlive, DetailStatus, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText, Detail } from './styles';
import api from '../services/api';
import axios, { formToJSON } from "axios";

export default class Main extends Component {

    state = {
        character: '',
        users: [],
        loading: false,
    }

    async componentDidMount() { //busca os dados do storage
        const users = await AsyncStorage.getItem('users');

        if (users) {
            this.setState({ users: JSON.parse(users) });
        }
    }

    async componentDidUpdate(_, prevState) { //salva os dados no storage
        const { users } = this.state;

        if (prevState.users !== users) {
            await AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }

    handleAddUser = async () => {
        try {
            const { users, character } = this.state;

            this.setState({ loading: true });

            const response = await api.get(`/character/?name=${character}`);
            console.log(response);
            const episodes = response.data.results[0].episode[0]
            const firstEpisode = await axios.get(episodes)
            
            const data = {
                name: response.data.results[0].name,
                id: response.data.results[0].id,
                status:response.data.results[0].status,
                image:response.data.results[0].image,
                species: response.data.results[0].species,
                location: response.data.results[0].location.name,
                firstEpisode: firstEpisode.data.name
            };
            
            this.setState({
                users: [data, ...users],
                character: '',
                loading: false,
            });

            Keyboard.dismiss();
            

        } catch (error) {
            alert('Usuário não encontrado');
            console.log(error);
            this.setState({ loading: false });
        }
    }

    render() {

        const { users, character, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={character}
                        onChangeText={text => this.setState({ character: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton loadind={loading} onPress={this.handleAddUser}>
                        {loading ? (<ActivityIndicator color="#fff" />) : (<Icon name='add' size={20} color='#fff' />)}
                    </SubmitButton>
                </Form>

                <List
                    showVerticalScrollIndicator={false}
                    data={users}
                    // keyExtractor={user => user.login}
                    renderItem={({ item }) => (
                        <User>
                            <Avatar source={{ uri: item.image }} />
                            <Detail>
                                <Name>{item.name}</Name>
                                <DetailStatus>
                                    {item.status === 'Alive' ? (<StatusAlive></StatusAlive>): (<StatusDeath></StatusDeath>) }
                                    <SubTitle>{item.species}</SubTitle>
                                </DetailStatus>
                                <DetailStatus>
                                    <SubTitle>Ultima aparição:</SubTitle>
                                </DetailStatus>
                                <SubTitle2>{item.location}</SubTitle2>
                                <DetailStatus2>
                                    <SubTitle>Primeiro episódio</SubTitle>
                                </DetailStatus2>
                                <SubTitle2>{item.firstEpisode}</SubTitle2>

                                <DetailStatus>
                                    <ProfileButton onPress={() => {
                                        this.props.navigation.navigate('character', { character: item });
                                        }}>
                                    <Icon name='more' size={20} color='#fff' />
                                    </ProfileButton>

                                    <ProfileButton onPress={() => {
                                    this.setState({ users: users.filter(char => char.id !== item.id) })
                                    }}
                                    style={{ backgroundColor: '#FF4141' }
                                    }>
                                    
                                    <Icon name='delete' size={20} color='#fff' />
                                    </ProfileButton>
                                </DetailStatus>
                            </Detail>

                           
                        </User>
                    )}
                />
            </Container>
        )
    }
}