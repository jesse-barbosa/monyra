import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, Modal, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import Menu from './Menu';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';

const getCategoryColor = (category) => {
  const colors = {
    Moradia: '#FF6347',
    Alimentação: '#4682B4',
    Transporte: '#32CD32',
    Saúde: '#FF4500',
    Educação: '#6A5ACD',
    Lazer: '#FFD700',
    Vestuário: '#FF69B4',
    Economia: '#8A2BE2',

    Remunerações: '#7FFF00',
    Rendimentos: '#DC143C',
    Empreendimentos: '#00BFFF',
    Benefícios: '#FF1493',
  };
  return colors[category] || '#cccccc';
};

const AnalyticsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params || {};
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('expenses');
  const [chartType, setChartType] = useState('pie');
  const [hoveredCategory, setHoveredCategory] = useState('');
  const scrollViewRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const monthWidth = 100;

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setSelectedMonth(currentMonth);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToIndex({ index: selectedMonth, animated: true });
      }, 300);
    }
  }, [selectedMonth]);

  const handleMonthChange = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.created_at);
    const isSameMonth = transactionDate.getMonth() === selectedMonth;
    const isExpense = transaction.typeTransaction === 'expense';
    const isGain = transaction.typeTransaction === 'gain';
    
    return (selectedOption === 'expenses' && isExpense && isSameMonth) || 
           (selectedOption === 'gains' && isGain && isSameMonth);
  });

  useEffect(() => {
    if (userData.nameUser) {
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
  }, [userData.nameUser, selectedMonth, selectedOption]);  

  useFocusEffect(
    useCallback(() => {
      if (userData.nameUser) {
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

  const truncateCategoryName = (name) => {
    return name.length > 4 ? name.slice(0, 4) : name;
  };

  const aggregatedData = filteredTransactions.reduce((acc, transaction) => {
    const category = transaction.categoryTransaction || 'N/A';
    const existingCategory = acc.find(item => item.category === category);
  
    if (existingCategory) {
      existingCategory.value += transaction.valueTransaction;
    } else {
      acc.push({
        category: category,
        value: transaction.valueTransaction,
        color: getCategoryColor(category),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      });
    }
  
    return acc;
  }, []);

  const chartData = {
    labels: aggregatedData.map(item => truncateCategoryName(item.category)),
    datasets: [
      {
        data: aggregatedData.map(item => item.value),
      },
    ],
  };

  const pieData = aggregatedData.map(item => ({
    name: item.category,
    value: item.value,
    color: item.color,
    legendFontColor: item.legendFontColor,
    legendFontSize: item.legendFontSize,
  }));

  const chartConfig = {
    backgroundColor: '#f7f7f7',
    backgroundGradientFrom: '#f7f7f7',
    backgroundGradientTo: '#f7f7f7',
    decimalPlaces: 2,
    color: (opacity = 1) => `#000`,
    labelColor: (opacity = 1) => `black`,
    barPercentage: 1,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    paddingHorizontal: 0,
  };

  const handleBarPress = (index) => {
    const category = (filteredTransactions)[index].categoryTransaction || 'N/A';
    setHoveredCategory(category);
  };

  return (
    <View style={{...styles.container, paddingTop: 40}}>
      <ScrollView>
        <View style={styles.optionContainerAnalytics}>
          <TouchableOpacity
            style={[styles.optionButtonAnalytics, selectedOption === 'expenses' && styles.selectedOptionAnalytics]}
            onPress={() => setSelectedOption('expenses')}
          >
            <Text style={styles.optionTextAnalytics}>Gastos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButtonAnalytics, selectedOption === 'gains' && styles.selectedOptionAnalytics]}
            onPress={() => setSelectedOption('gains')}
          >
            <Text style={styles.optionTextAnalytics}>Ganhos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.secondaryTitle}>Análise de {selectedOption === 'expenses' ? 'Gastos' : 'Ganhos'}</Text>
          <Dropdown
            style={styles.dropdown}
            data={[
              { label: 'Gráfico Pizza', value: 'pie' },
              { label: 'Gráfico Barra', value: 'bar' },
            ]}
            value={chartType}
            onChange={(item) => setChartType(item.value)}
            placeholder="Tipo de Gráfico"
            labelField="label"
            valueField="value"
            selectedTextStyle={styles.labelStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
          />
        </View>
        {chartType === 'bar' ? (
          (filteredTransactions).length > 0 ? (
            <ScrollView horizontal>
              <View style={styles.chartContainer}>
                <BarChart
                  data={chartData}
                  width={Math.max(Dimensions.get('window').width - 40, chartData.labels.length * 80)}
                  height={230}
                  yAxisLabel="R$"
                  chartConfig={chartConfig}
                  style={{
                    borderRadius: 16,
                  }}
                  fromZero
                  onDataPointClick={({ index }) => handleBarPress(index)}
                />
                {hoveredCategory ? (
                  <Text style={styles.tooltip}>{hoveredCategory}</Text>
                ) : null}
              </View>
            </ScrollView>
          ) : (
            <Text style={styles.dataText}>Nenhum dado encontrado para este mês.</Text>
          )
        ) : (
          (filteredTransactions).length > 0 ? (
            <View style={styles.pieChartContainer}>
              <PieChart
                data={pieData}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 10]}
                style={{
                  borderRadius: 16,
                }}
              />
            </View>
          ) : (
            <Text style={styles.dataText}>Nenhum dado encontrado para este mês.</Text>
          )
        )}
        <View style={styles.monthSelectorContainer}>
        <FlatList
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.monthScrollView}
        data={[
          { label: 'Jan', value: 0 },
          { label: 'Feb', value: 1 },
          { label: 'Mar', value: 2 },
          { label: 'Apr', value: 3 },
          { label: 'May', value: 4 },
          { label: 'Jun', value: 5 },
          { label: 'Jul', value: 6 },
          { label: 'Aug', value: 7 },
          { label: 'Sep', value: 8 },
          { label: 'Oct', value: 9 },
          { label: 'Nov', value: 10 },
          { label: 'Dec', value: 11 },
        ]}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.monthButton,
              selectedMonth === item.value && styles.selectedMonthButton
            ]}
            onPress={() => handleMonthChange(item.value)}
          >
            <Text style={[
              styles.monthText,
              selectedMonth === item.value && styles.selectedMonthText
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        getItemLayout={(data, index) => ({
          length: monthWidth,
          offset: monthWidth * index,
          index,
        })}
      />
        </View>
        <View style={styles.transfers}>
          <Text style={styles.secondaryTitle}>Suas Transações</Text>
          {(filteredTransactions).length > 0 ? (
            <View>
              {filteredTransactions.map((transaction, index) => (
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
                        {transaction.typeTransaction === 'expense' ?  
                          <Image source={require('./assets/img/icons/arrowDown.png')} /> : 
                          <Image source={require('./assets/img/icons/arrowUp.png')} /> 
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.dataText}>Nenhum transação realizada este mês.</Text>
          )}
        </View>
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
    </View>
  );
};


export default AnalyticsScreen;
