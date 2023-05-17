import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Register = () => {
    const background = { uri: 'https://static.wixstatic.com/media/8f3506_2b2576482b1f4392ba2efc06bdf48e91~mv2.jpg/v1/fill/w_537,h_716,al_c,q_85,enc_auto/8f3506_2b2576482b1f4392ba2efc06bdf48e91~mv2.jpg' }
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

    const navigation = useNavigation();

    const resgisterNewUser = () => {
        navigation.navigate('login')
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Curso"
                    value={course}
                    onChangeText={setCourse}
                />
                <TouchableOpacity style={styles.button} onPress={resgisterNewUser}>
                    <Text style={styles.buttonText}>Salvar</Text>
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
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#F2F5F7',
        fontWeight: 'bold',
    },
})

export default Register;