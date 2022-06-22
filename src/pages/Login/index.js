import React, { useState, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import {
	Container,
	Title,
	Input,
	Button,
	ButtonText,
	SignUpButton,
	SignUpText
} from './style'

export default function Login() {
	const [login, setLogin] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signUp, signIn, loadingAuth } = useContext(AuthContext);

	function toggleLogin() {
		setLogin(!login)
		setName('')
		setEmail('')
		setPassword('')
	}

	async function handleSignIn() {
		if (email === '' || password === '') {
			console.log('Preencha todos os campos')
			return;
		}

		//fazer o login o usuario
		await signIn(email, password)
	}

	async function handleSignUp() {
		if (name === '' || email === '' || password === '') {
			console.log('Preencha todos os campos para concluir o cadastro')
			return;
		}

		// cadastrar o usuario
		await signUp(email, password, name)
	}

	if (login) {
		return (
			<Container>
				<Title>
					Dev<Text style={{ color: '#e52246' }}>Post</Text>
				</Title>

				<Input
					placeholder="Seu nome"
					autoCapitalize="none"
					value={name.trim()}
					onChangeText={(text) => setName(text)}
				/>

				<Input
					placeholder="email@email.com"
					autoCapitalize="none"
					value={email.trim()}
					onChangeText={(text) => setEmail(text)}
				/>

				<Input
					placeholder="●●●●●●●●●●"
					autoCapitalize="none"
					secureTextEntry={true}
					value={password.trim()}
					onChangeText={(text) => setPassword(text)}
				/>

				<Button onPress={handleSignUp}>
					<ButtonText>Cadastrar</ButtonText>
				</Button>

				<SignUpButton onPress={toggleLogin}>
					<SignUpText>Já possuo uma conta</SignUpText>
				</SignUpButton>
			</Container>
		);
	}

	return (
		<Container>
			<Title>
				Dev<Text style={{ color: '#e52246' }}>Post</Text>
			</Title>

			<Input
				placeholder="email@email.com"
				autoCapitalize="none"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>

			<Input
				placeholder="●●●●●●●●●●"
				autoCapitalize="none"
				secureTextEntry={true}
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>

			<Button onPress={handleSignIn}>
				{loadingAuth ? (
					<ActivityIndicator size={35} color="#fff" />
				) : (
					<ButtonText>Acessar</ButtonText>
				)}
			</Button>

			<SignUpButton onPress={toggleLogin}>
				<SignUpText>Criar uma conta</SignUpText>
			</SignUpButton>
		</Container>
	);
}