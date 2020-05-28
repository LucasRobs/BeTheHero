import React from 'react';

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import * as MailCompose from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail(){
  const navigation = useNavigation();
  const route =  useRoute();

  const incident =  route.params.incident; 
  let message = `Olá ${incident.name} lasdkla, asdaksdkasdkajsdkj ${incident.title}`

  function navigateBack(){
    navigation.goBack()
  }

  function sendMail(){
    MailCompose.composeAsync({
      subject: `heroi do caso: cadelinas: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=55859${incident.whatsapp}&text=${message}`);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incidenst}>

        <Text style={[styles.incidenstProperty, {marginTop: 0}]}> ONG :</Text>
        <Text style={styles.incidenstValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

          <Text style={styles.incidenstProperty}> Caso :</Text>
          <Text style={styles.incidenstValue}>{incident.title}</Text>

          <Text style={styles.incidenstProperty}> VALOR :</Text>
          <Text style={styles.incidenstValue}>
            {Intl.NumberFormat(
              "pt-BR", 
              { style: 'currency', currency: 'BRL'}
            ).format(incident.value)}
          </Text>
      </View>
        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
          <Text style={styles.herodescription}>entre em contato:</Text>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}