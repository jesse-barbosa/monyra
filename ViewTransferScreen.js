import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';

const ViewTransferScreen = ({ route }) => {
  const navigation = useNavigation();
  const { transaction } = route.params;

  const formattedDate = transaction.created_at.split(' ')[0];
  const formattedTime = transaction.created_at.split(' ')[1];

  const deleteTransaction = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza de que deseja excluir esta transferência?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            fetch(`${API_URL}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                action: 'deleteTransaction',
                transactionId: transaction.codTransaction,
              }),
            })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  Alert.alert("Sucesso", "Transferência excluída com sucesso!");
                  navigation.goBack();
                } else {
                  Alert.alert("Erro", "Não foi possível excluir a transferência.");
                }
              })
              .catch(error => {
                Alert.alert("Erro", "Ocorreu um erro ao excluir a transferência.");
                console.error(error);
              });
          }
        }
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#5A67D8" />
        </TouchableOpacity>
        <Text style={transaction.typeTransaction === 'expense' ? styles.titleExpense : styles.titleGain}>
          {transaction.typeTransaction === 'expense' ? '- ' : '+ '} 
          R$ {transaction.valueTransaction}
        </Text>
        <TouchableOpacity onPress={deleteTransaction} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#FF3838" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={20} color="#5A67D8" />
          <Text style={styles.label}>Valor:</Text>
          <Text style={styles.value}>R$ {transaction.valueTransaction}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="trending-up-outline" size={20} color="#5A67D8"/>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{transaction.typeTransaction === 'expense' ? 'Gasto' : 'Ganho'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#5A67D8" />
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#5A67D8" />
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{formattedTime}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={20} color="#5A67D8" />
          <Text style={styles.label}>Categoria:</Text>
          <Text style={styles.value}>{transaction.categoryTransaction}</Text>
        </View>

        <View style={styles.infoRowDescription}>
          <Ionicons name="information-circle-outline" size={20} color="#5A67D8" />
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.valueDescription}>
            {transaction.descTransaction.length > 0 ? transaction.descTransaction : 'Sem descrição'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  iconButton: {
    padding: 10,
  },
  titleExpense: {
    color: '#FF3838',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    flex: 1,
  },
  titleGain: {
    color: '#8BFF78',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    flex: 1,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 100,
    marginHorizontal: 10,
    marginVertical: 40,
    flex: 1,
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoRowDescription: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#666666',
    marginLeft: 10,
    flex: 1,
  },
  value: {
    fontSize: 18,
    color: '#545454',
    fontWeight: 'bold',
    marginLeft: 10,
    flexShrink: 1,
  },
  valueDescription: {
    fontSize: 18,
    color: '#545454',
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#6630F3',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewTransferScreen;
