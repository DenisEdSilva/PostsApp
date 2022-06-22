import React from 'react';
import { Text } from 'react-native'
import {
	Container,
	Title
}
	from './style';

export default function Header() {
	return (
		<Container>
			<Title>
				Dev<Text style={{ fontStyle: 'italic', color: '#e52246' }}>Post</Text>
			</Title>
		</Container>
	);
}