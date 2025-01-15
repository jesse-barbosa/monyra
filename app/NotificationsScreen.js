import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Modal } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import Menu from './components/Menu';
import styles from '../styles/global';

const NotificationsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params || {};
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (userData) {
        fetch(`${API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'getUserTransactions', username: userData.nameUser }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setTransactions(data.transactions);
            } else {
              console.log(data.message);
            }
          })
          .catch((error) => {
            console.error('Error fetching transactions:', error);
          });
      }
    }, [userData.nameUser])
  );

  const handlePress = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleEdit = () => {
    setIsModalVisible(false);
    navigation.navigate('ViewTransfer', { transaction: selectedTransaction });
  };

  return (
    <SafeAreaView style={{ ...styles.container, paddingTop: 40 }}>
      <ScrollView>
        <Text style={styles.title}>Recentes</Text>
        <View style={styles.transfers}>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <View key={index} style={styles.transferCard}>
                <TouchableOpacity onPress={() => handlePress(transaction)}>
                  <View style={styles.transferContent}>
                    <View style={styles.transferInfo}>
                      <Text style={styles.transferDate}>{transaction.created_at}</Text>
                      <Text style={styles.transferTitle}>
                        {transaction.typeTransaction === 'expense' ? 'Você enviou' : 'Você recebeu'} R$ {transaction.valueTransaction}
                      </Text>
                      <Text style={styles.transferText}>"{transaction.descTransaction}"</Text>
                    </View>
                    <View style={styles.transferIcon}>
                      {transaction.typeTransaction === 'expense' ? (
                        <Icon name="arrow-circle-o-down" size={24} color="black" />
                      ) : (
                        <Icon name="arrow-circle-o-up" size={24} color="black" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.dataText}>Nenhuma notificação encontrada</Text>
          )}
        </View>

        {/* Modal de pré-visualização da transação */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedTransaction ? (
                <>
                  <View style={styles.field}>
                    <Text style={styles.label}>Valor:</Text>
                    <Text style={styles.value}>R$ {selectedTransaction.valueTransaction}</Text>
                  </View>

                  <View style={styles.field}>
                    <Text style={styles.label}>Data:</Text>
                    <Text style={styles.value}>{new Date(selectedTransaction.created_at).toLocaleDateString()}</Text>
                  </View>

                  <View style={styles.field}>
                    <Text style={styles.label}>Horário:</Text>
                    <Text style={styles.value}>{new Date(selectedTransaction.created_at).toLocaleTimeString()}</Text>
                  </View>

                  <View style={styles.field}>
                    <Text style={styles.label}>Categoria:</Text>
                    <View style={styles.category}>
                      <Text style={styles.categoryText}>{selectedTransaction.categoryTransaction || 'N/A'}</Text>
                    </View>
                  </View>

                  <View style={styles.field}>
                    <Text style={styles.label}>Descrição:</Text>
                    <Text style={styles.value}>{selectedTransaction.descTransaction || 'Sem descrição'}</Text>
                  </View>

                  <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Text style={styles.editButtonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text>Carregando dados da transação...</Text>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Menu userData={userData} />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
