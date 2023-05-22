import { SlideFromRightIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import axios from "axios";
import React, { Component } from "react";
import api from '../services/api';
import { Container, Header, Avatarperfil, Nameperfil, Bioperfil, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';

export default class User extends Component {
  state = {
    characters: []
  };

  characters = []


  async componentDidMount() {
    const { route } = this.props;
    const { character }  = route.params;
    const response = await axios.get(` https://rickandmortyapi.com/api/episode/${character.episodeId}`)
    
    for (let i = 0; i < response.data.characters.length; i++) {
      let res = await axios.get(response.data.characters[i])
      this.characters.push({
        name: res.data.name,
        image: res.data.image
      })
    }    
    this.setState({ characters: this.characters});
  }

  render() {
    const { route } = this.props;
    const { character } = route.params;
    const { characters } = this.state;

    return (
      <Container>
        <Header>
          <Avatarperfil source={{ uri: character.image }} />
          <Nameperfil>{character.name}</Nameperfil>
          <Bioperfil>Personagens que aparecem no primeiro EP de {character.name}</Bioperfil>
        </Header>
        <Stars
          data={characters}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.image }} />
              <Info>
                <Title>{item.name}</Title>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}