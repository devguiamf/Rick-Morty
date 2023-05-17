import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Login = () => {
    const background = { uri: 'https://static.wixstatic.com/media/8f3506_2b2576482b1f4392ba2efc06bdf48e91~mv2.jpg/v1/fill/w_537,h_716,al_c,q_85,enc_auto/8f3506_2b2576482b1f4392ba2efc06bdf48e91~mv2.jpg' }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = () => {
        if (email === '' && password === '') {
            navigation.navigate('main')
        } else {
            alert('E-mail ou senha inválidos!')
        }
    };

    const newUser = () => {
        navigation.navigate('register')
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={newUser}>
                    <Text style={styles.buttonText}>Cadastrar Usuário</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#0A4008',
        backgroundColor: '#F2F5F7',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
    button: {
        backgroundColor: '#0A4008',
        borderRadius: 4,
        padding: 10,
        margin: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#F2F5F7',
        fontWeight: 'bold',
    },
})

export default Login;