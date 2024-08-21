import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-element-dropdown';

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
  const { username } = route.params || {};
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('expenses');
  const [chartType, setChartType] = useState('pie');
  const [hoveredCategory, setHoveredCategory] = useState('');

  const filteredTransactions = transactions.filter((transaction) => {
    const currentDate = new Date();
    const transactionDate = new Date(transaction.created_at);
    const isSameMonth = transactionDate.getMonth() === currentDate.getMonth();
    const isExpense = transaction.typeTransaction === 'expense';
    const isGain = transaction.typeTransaction === 'gain';
    
    return (selectedOption === 'expenses' && isExpense && isSameMonth) || (selectedOption === 'gains' && isGain && isSameMonth);
  });
  useEffect(() => {
    if (username) {
      fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'getUserTransactions', username }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Transactions:', data.transactions);
          setTransactions(data.transactions);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
    }
  }, [username]);

  const handlePress = (transaction) => {
    navigation.navigate('ViewTransfer', {
      username,
      transaction,
    })
  }

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
    color: (opacity = 1) => `#5019d4`,
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'expenses' && styles.selectedOption]}
            onPress={() => setSelectedOption('expenses')}
          >
            <Text style={styles.optionText}>Gastos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'gains' && styles.selectedOption]}
            onPress={() => setSelectedOption('gains')}
          >
            <Text style={styles.optionText}>Ganhos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Análise de {selectedOption === 'expenses' ? 'Gastos' : 'Ganhos'}</Text>
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
        <View style={styles.expenses}>
          <Text style={styles.titleExpenses}>Suas Transações</Text>
          {(filteredTransactions).length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <View key={index} style={styles.expensesCard}>
                <TouchableOpacity onPress={() => handlePress(transaction)}>
                <View style={styles.expensesContent}>
                  <View style={styles.expenseInfo}>
                    <Text style={styles.expenseDate}>{transaction.created_at}</Text>
                    <Text style={styles.expenseTitle}>
                      {transaction.typeTransaction === 'expense' ? 'Você enviou' : 'Você recebeu'} R$ {transaction.valueTransaction}
                    </Text>
                    <Text style={styles.expenseText}>"{transaction.descTransaction}"</Text>
                  </View>
                  <View style={styles.expenseIcon}>
                    {transaction.typeTransaction === 'expense' ?  <Image source={require('./assets/img/icons/arrowDown.png')} /> : <Image source={require('./assets/img/icons/arrowUp.png')} /> }
                  </View>
                </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.dataText}>Nenhum transação realizada este mês.</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/wallet.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/chart-filled.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/bell.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/gears.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginHorizontal: 70,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    backgroundColor: '#c9c9c9',
  },
  selectedOption: {
    backgroundColor: '#5019d4',
    zIndex: 999,
  },
  optionText: {
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
  },
  dropdown: {
    width: 150,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  placeholderStyle: {
    color: '#9B9B9B',
  },
  labelStyle: {
    color: '#9B9B9B',
    fontSize: 14,
    textAlign: 'right',
  },
  titleExpenses: {
    marginBottom: 10,
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
  },
  expenses: {
    marginTop: 10,
  },
  expensesCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expensesContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 16,
    marginTop: 7,
    marginBottom: 7,
  },
  expenseText: {
    opacity: 0.6,
  },
  expenseDate: {
    opacity: 0.5,
  },
  expenseIcon: {
    marginLeft: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5019d4',
    padding: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  menuItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsMenu: {
    height: 30,
    width: 30,
  },
  dataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  pieChartContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  chartContainer: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#2F1155',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    zIndex: 10,
  },
});

export default AnalyticsScreen;
