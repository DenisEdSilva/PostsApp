import React, { useState, useLayoutEffect, useContext } from 'react';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AuthContext } from '../../contexts/auth'

import {
	Container,
	Input,
	Button,
	ButtonText
} from './style';

export default function NewPost() {
	const navigation = useNavigation();
	const [post, setPost] = useState('');
	const { user } = useContext(AuthContext);

	useLayoutEffect(() => {
		const options = navigation.setOptions({
			headerRight: () => (
				<Button onPress={() => handlePost()}>
					<ButtonText>Compartilhar</ButtonText>
				</Button>
			)
		})
	}, [navigation, post])

	async function handlePost() {
		if (post === '') {
			console.log('Seu post contem conteudo invalido.');
			return;
		}

		let avatarUrl = null;

		try {
			let response = await storage().ref('users').child(user?.uid).getDownloadURL();
			avatarUrl = response

		} catch (err) {
			avatarUrl = null;
		}

		await firestore().collection('posts')
			.add({
				created: new Date(),
				content: post,
				autor: user?.nome,
				userId: user?.uid,
				likes: 0,
				avatarUrl,
			})
			.then(() => {
				setPost('')
				console.log('Post Criado Com Sucesso')
			})
			.catch((error) => {
				console.log('Erro Ao Criar o Post ' + error)
			})

		navigation.goBack();
	}

	return (
		<Container>
			<Input
				placeholder="O que esta acontecendo?"
				value={post}
				onChangeText={(text) => setPost(text)}
				autoCorrect={false}
				multiline={true}
				placeholderTextColor="#ddd"
				maxLength={300}
			/>
		</Container>
	);
}