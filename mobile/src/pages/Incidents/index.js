import React, { useState, useEffect} from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import api from '../../services/api';

export default function Incidensts(){
  const [incident, setIncident] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigationToDetail(incident){
    navigation.navigate('Detail', { incident });
  }
  async function loadIncidents(){
    
    if(loading = true){
      return;
    }
    if(total > 0 && incident.length === total){
      return
    }
    setLoading(true);
    const response = await api.get('incidents', {
      parms : { page }
    });
    setIncident([...incident, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, [])
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um caso a baixo e salve o dia.</Text>
      <FlatList 
        data  ={incident}
        style={styles.incidenstsList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incidenst}>
           
           <Text style={styles.incidenstProperty}> ONG :</Text>
          <Text style={styles.incidenstValue}>{incident.name}</Text>

          <Text style={styles.incidenstProperty}> Caso :</Text>
          <Text style={styles.incidenstValue}>{incident.title}</Text>

          <Text style={styles.incidenstProperty}> VALOR :</Text>
          <Text style={styles.incidenstValue}>
            {Intl.NumberFormat(
              "pt-BR", 
              { style: 'currency', currency: 'BRL'}
            ).format(incident.value)}
          </Text>

          <TouchableOpacity 
            style={styles.detailsBotton} 
            onPress={ ()=> navigationToDetail(incident)}
          >
            <Text style={styles.detailsBottonText}>Ver mais detalhers</Text>
            <Feather name = "arrow-right" size={16} color="#E02041"/>
          </TouchableOpacity>
        </View>
        )}
      />
    </View>
  )
}