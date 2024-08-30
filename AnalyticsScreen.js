import React, { useCallback, useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import Menu from './Menu'
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
  const [initialScroll, setInitialScroll] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const scrollViewRef = useRef(null);
  const monthWidth = 100;

  useEffect(() => {
    if (scrollViewRef.current && initialScroll) {
      const initialIndex = new Date().getMonth();
      const xOffset = initialIndex * monthWidth;
      scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
      setInitialScroll(false);
    }
  }, [scrollViewRef, initialScroll]);


  const handleMonthChange = useCallback((month) => {
    setSelectedMonth(month);
    const xOffset = month * monthWidth;
    scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
  }, [selectedMonth, scrollViewRef, monthWidth]);

  const handleScroll = useCallback((event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const selectedMonth = Math.round(xOffset / monthWidth);
    handleMonthChange(selectedMonth);

  }, [handleMonthChange, monthWidth]);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.created_at);
    const isSameMonth = transactionDate.getMonth() === selectedMonth;
    const isExpense = transaction.typeTransaction === 'expense';
    const isGain = transaction.typeTransaction === 'gain';
    
    return (selectedOption === 'expenses' && isExpense && isSameMonth) || 
           (selectedOption === 'gains' && isGain && isSameMonth);
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
        <View style={styles.monthSelectorContainer}>
        <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.monthScrollView}
            snapToInterval={monthWidth}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            >
            {[
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
            ].map((month, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.monthButton,
                  selectedMonth === month.value && styles.selectedMonthButton,
                ]}
                onPress={() => setSelectedMonth(month.value)}
              >
                <Text
                  style={[
                    styles.monthText,
                    selectedMonth === month.value && styles.selectedMonthText,
                  ]}
                >
                  {month.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.transfers}>
          <Text style={styles.titleTransfers}>Suas Transações</Text>
          {(filteredTransactions).length > 0 ? (
            filteredTransactions.map((transaction, index) => (
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
      <Menu username={username} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginHorizontal: 90,
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
    paddingHorizontal: 20,
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
  titleTransfers: {
    marginBottom: 10,
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
  },
  transfers: {
    padding: 20,
    marginTop: 10,
  },
  transferCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,
  },
  transferContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferInfo: {
    flex: 1,
  },
  transferTitle: {
    fontSize: 16,
    marginTop: 7,
    marginBottom: 7,
  },
  transferText: {
    opacity: 0.6,
  },
  transferDate: {
    opacity: 0.5,
  },
  transferIcon: {
    marginLeft: 10,
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
    paddingHorizontal: 20,
    alignItems: 'center',
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
  monthSelectorContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  monthScrollView: {
    alignItems: 'center',
  },
  monthButton: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',

  },
  selectedMonthButton: {

  },
  monthText: {
    color: '#8a8a8a',
    fontWeight: 'normal',
  },
  selectedMonthText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 22,
  },
});

export default AnalyticsScreen;
