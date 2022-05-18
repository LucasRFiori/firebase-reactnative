import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously()
  } // Logar anonimamente

  function handleCreateUserAccount() {
    auth().createUserWithEmailAndPassword(email, password)
    .then(res => Alert.alert('Usuario criado com sucesso'))
    .catch(err => {
      if(err.code == 'auth/email-already-in-use') {
        Alert.alert('Email ja em uso')
      }
    })
  } //criando conta com email e senha

  async function handleSignInWithEmailAndPassword() {
    const { user } = await auth().signInWithEmailAndPassword(email, password)
  } // Login com email e senha

  function handleForgotPassword() {
    auth().sendPasswordResetEmail(email)
    .then(() => Alert.alert('Enviamos um link no seu email com a senha'))
  } // Esqueci minha senha


  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}