import React, { Component } from "react";
import api from '../services/api';
import { Container, Header, Avatarperfil, Nameperfil, Bioperfil, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';
import axios from "axios";

export default class Character extends Component {
  state = {
    characters: []
  };

 charactersArray = []

  async componentDidMount() {
    const { route } = this.props;
    const { character }  = route.params;
    console.log(character.episodeId,'IDDD');
    const response = await api.get(`/episode/${character.episodeId}`)
    const episodesCharacter =  response.data.characters
    console.log(episodesCharacter, 'EPISODES');

    for (let i = 0; i < episodesCharacter.length; i++) {
      const firstEpisode = await axios.get(episodesCharacter[i])
      this.charactersArray.push({
        image: firstEpisode.data.image,
        name: firstEpisode.data.name
      })
      console.log(this.charactersArray);
    }

    this.setState({ characters: this.charactersArray });
    
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
        </Header>
        <Nameperfil>Personagens que aparecem no episodio</Nameperfil>
        <Stars
          data={characters}
          // keyExtractor={(star) => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.image}} />
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