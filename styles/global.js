import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /* Estilos Gerais */
  container: {
    flex: 1,
    backgroundColor: '#D9EDFF',
  },
  scrollview: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 5,
    marginBottom: 10,
    color: '#2E4053',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 30,
    color: '#2E4053',
    opacity: 0.6,
    fontWeight: 'bold',
    fontSize: 23,
    lineHeight: 32,
    textAlign: 'center',
  },
  inputs: {
    marginVertical: 'auto',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B0C4DE',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#ECF6FF',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ECF6FF',
    borderRadius: 15,
    fontSize: 16,
    marginHorizontal: 10,
  },
  picker: {
    flex: 1,
    borderRadius: 15,
  },
  editButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#2E4053',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4053',
  },
  closeButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#2E4053',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  addGoal: {
    marginVertical: 15,
    padding: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2E4053',
    borderStyle: 'dashed',
  },
  addGoalContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addGoalIcon: {
    marginRight: 5,
    color: '#2E4053',
  },
  addGoalText: {
    fontSize: 16,
    color: '#2E4053',
    fontWeight: '500',
  },
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '60%',
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalMain: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#2E4053',
    paddingVertical: 10,
    borderBottomWidth: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4053',
    opacity: 0.5,
  },
  value: {
    fontSize: 18,
    color: '#2E4053',
    opacity: 0.7,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelModal: {
    fontSize: 20,
    color: '#2E4053',
    opacity: 0.7,
  },
  modalProgressBar: {
    borderWidth: 0,
    backgroundColor: '#fff',
    marginTop: 'auto',
  },
  categoryText: {
    marginRight: 5,
    fontSize: 16,
    color: '#2E4053',
    opacity: 0.7,
  },
  categoryIcon: {
    fontSize: 16,
  },
  
  /* Login/Registro */
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  goRegister: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#808080',
  },
  link: {
    color: '#2E4053',
    fontWeight: 'bold',
  },
  options: {
    marginTop: 100,
    width: '100%',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },
  option: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.4,
  },

  /* Menu */
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2E4053',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
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
  button: {
    borderRadius: 15,
    backgroundColor: '#8BB2D4',
    padding: 20,
    marginHorizontal: 'auto',
    width: '90%',
    marginTop: 'auto',
    marginBottom: 15,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomColor: '#2E4053',
    borderRightColor: '#2E4053',
  },
  buttonText: {
    color: '#2E4053',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* Tela inicial */
  titleApp: {
    color: '#2E4053',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },
  username: {
    color: '#2E4053',
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.5,
  },
  userIcon: {
    width: 50,
    height: 50,
  },
  balance: {
    backgroundColor: '#2E4053',
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  balanceTitle: {
    color: '#fff',
    fontSize: 20,
    opacity: 0.7,
    fontFamily: 'monospace',
  },
  balanceValue: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },
  operations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  operation: {
    width: 100,
    height: 95,
    backgroundColor: '#2E4053',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  operationIcon: {
    marginBottom: 5,
    color: '#FFFFFF',
  },
  descOperation: {
    color: '#FFFFFF',
    opacity: 0.4,
  },

  cardsHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainerHome: {
    width: 170,
    height: 150,
    borderRadius: 15,
    padding: 15,
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  cardTotalHome: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  cardTypeHome: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
    opacity: 0.6,
  },

  goal: {
    backgroundColor: '#B0C4DE',
    padding: 20,
    marginBottom: 10,
    borderRadius: 15,
  },
  goalTitle: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4053',
    opacity: 0.8,
  },
  goalRemainingValue: {
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: '500',
    color: '#2E4053',
    opacity: 0.7,
  },
  goalBarProgressHome: {
    marginTop: 10,
    borderWidth: 0,
    borderColor: '#2E4053',
    width: '100%',
  },

  /* Tela de Análises */
  optionContainerAnalytics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginHorizontal: 'auto',
  },
  optionButtonAnalytics: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    backgroundColor: '#B0C4DE',
  },
  selectedOptionAnalytics: {
    backgroundColor: '#2E4053',
    zIndex: 999,
  },
  optionTextAnalytics: {
    color: '#FFFFFF',
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    color: '#2E4053',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
  },
  transferCard: {
    backgroundColor: '#B0C4DE',
    borderRadius: 17,
    padding: 15,
    marginVertical: 10,
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
    marginVertical: 7,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4053',
    opacity: 0.8,
  },
  transferText: {
    opacity: 0.7,
    color: '#2E4053',

  },
  transferDate: {
    opacity: 0.6,
    color: '#2E4053',
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
    backgroundColor: '#2E4053',
    color: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  monthScrollView: {
    marginVertical: 20,
    alignItems: 'center',
  },
  monthButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  selectedMonthButton: {
    backgroundColor: '#2E4053',
    borderRadius: 10,
    paddingVertical: 15,
  },
  monthText: {
    color: '#666666',
    fontWeight: 'normal',
    fontSize: 16,
  },
  selectedMonthText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },

  /* Tela para Transferir */
  valueTransfer: {
    textAlign: 'center',
    color: '#2E4053',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
    marginVertical: 30,
  },
  keyboard: {
    width: 340,
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '20%',
    margin: '5%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 24,
    color: '#333',
  },

  headerCreateGoal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageFormGoal: {
    height: 260,
    width: 260,
    marginBottom: 15,
  },
  headerViewGoal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  cardViewGoal: {
    borderRadius: 20,
    backgroundColor: '#B0C4DE',
    marginVertical: 60,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
  },
  goalBarProgress: {
    marginVertical: 10,
    width: '100%',
    borderWidth: 0,
    backgroundColor: '#C7C7C7',
  },
  goalRemaining: {
    marginLeft: 'auto',
    fontSize: 16,
    color: 'gray',
  },

  /* Página visualizar transferência */
  titleExpenseTransfer: {
    color: '#FF3838',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    flex: 1,
  },
  titleGainTransfer: {
    color: '#6af054',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    flex: 1,
  },

  fieldDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    alignItems: 'flex-start',
    paddingVertical: 15,
    borderColor: '#2E4053',
    borderBottomWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
  },
  valueDescription: {
    fontSize: 16,
    color: '#2E4053',
    opacity: 0.7,
    textAlign: 'left',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#A9B8C9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: '100%',
    minWidth: '95%',
    overflow: 'hidden',
  },

  /* Página de Configurações */
  selectIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImageSettings: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
  },
  nameUserSettings: {
    textAlign: 'center',
    fontSize: 28,
    marginVertical: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#2E4053',
  },
  arrowButtonIcon: {
    padding: 10,
  },
  arrowIcon: {
    fontSize: 40,
    color: '#2E4053',
  },
  descriptionInput: {
    height: 130,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlignVertical: 'top',
    backgroundColor: '#B0C4DE',
    color: '#2E4053',
    fontWeight: '600',
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    color: '#999',
    paddingRight: 10,
  },
  logOutbutton: {
    borderRadius: 15,
    backgroundColor: '#FF4E4E',
    padding: 20,
    marginTop: 'auto',
    marginHorizontal: 'auto',
    width: '90%',
    marginBottom: 20,
  },
  logOutbuttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* DataText */
  dataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default styles;