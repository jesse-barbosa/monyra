import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  
  /* Estilos Gerais */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 20,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 30,
    color: '#000',
    opacity: 0.4,
    fontWeight: 'bold',
    fontSize: 23,
    lineHeight: 32,
    textAlign: 'center',
  },
  inputs: {
    marginTop: 'auto',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    fontSize: 16,
    marginHorizontal: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    padding: 20,
  },
  picker2: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
  },
  addCard: {
    marginVertical: 15,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#ededed',
  },
  addContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    marginRight: 5,
  },
  addText: {
    fontSize: 16,
    color: '#000',
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
    backgroundColor: '#E2E2E2',
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
    borderColor: '#ccc',
    paddingVertical: 10,
    borderBottomWidth: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D5D5D',
    opacity: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#000',
    opacity: 0.7,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelModal: {
    fontSize: 20,
    color: '#000',
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
    color: '#000',
    opacity: 0.7,
  },
  categoryIcon: {
    fontSize: 16,
  },
  editButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  logOutbutton: {
    borderRadius: 15,
    backgroundColor: '#FF4E4E',
    padding: 20,
    marginTop: 'auto',
    marginHorizontal: 'auto',
    width: '80%',
    marginBottom: 20,
  },
  logOutbuttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  /* Menu */
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5019D4',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
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
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 'auto',
    marginHorizontal: 'auto',
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomColor: '#000',
    borderRightColor: '#000',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* Tela inicial */
  titleAppHome: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },
  usernameHome: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.5,
  },
  userIconHome: {
    width: 50,
    height: 50,
  },
  balanceContainerHome: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  balanceHome: {
    backgroundColor: '#5019D4',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 45,
    borderRadius: 20,
  },
  balanceTitleHome: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.7,
    fontFamily: 'monospace',
  },
  balanceValueHome: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  operationsHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  operationHome: {
    width: 100,
    height: 95,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomColor: '#000',
    borderRightColor: '#000',
  },
  operationIconHome: {
    marginBottom: 5,
  },
  descOperationHome: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    opacity: 0.4,
  },
  
  cardsHome: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainerHome: {
    width: 170,
    height: 150,
    borderRadius: 15,
    padding: 15,
    alignItems: 'flex-start',
  },
  cardTotalHome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  cardTypeHome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
    opacity: 0.6,
  },
  
  goalsSectionTitleHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  goalsHome: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  goalHome: {
    backgroundColor: '#EBEBEB',
    padding: 20,
    marginBottom: 10,
    borderRadius: 15,
  },
  goalTitleHome: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    opacity: 0.8,
  },
  goalRemainingValueHome: {
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: '500',
    color: '#000',
    opacity: 0.7,
  },
  goalBarProgressHome: {
    marginTop: 10,
    borderWidth: 0,
    borderColor: '#000',
    width: '100%',
  },

  /* Tela Analytics */
  optionContainerAnalytics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginHorizontal: 90,
  },
  optionButtonAnalytics: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    backgroundColor: '#c9c9c9',
  },
  selectedOptionAnalytics: {
    backgroundColor: '#6979F8',
    zIndex: 999,
  },
  optionTextAnalytics: {
    color: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryTitle: {
    color: '#000',
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
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
  },
  transfers: {
    padding: 20,
  },
  transferCard: {
    backgroundColor: '#EEEEEE',
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
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 10,
  },
  monthScrollView: {
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
    backgroundColor: '#6979F8',
    borderRadius: 10,
    paddingVertical: 15,
  },
  monthText: {
    color: '#666666',
    fontWeight: 'normal',
    fontSize: 16,
  },
  selectedMonthText: {
    color: '#f7f7f7',
    fontWeight: '600',
    fontSize: 18,
  },
  selectIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageSettings: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
  },
  nameUserSettings: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: 26,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#666666',
  },
  arrowButtonIcon: {
    padding: 10,
  },
  arrowIcon: {
    fontSize: 40,
    color: '#000',
  },

  headerTransfer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  valueTransfer: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
    marginBottom: 60,
  },
  main: {
    paddingHorizontal: 20,
  },
  keyboard: {
    width: 340,
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
  dataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  goRegister: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#808080',
  },
  link: {
    color: '#5019D4',
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
    borderColor: 'gray',
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
    fontWeight: 'bold',
    opacity: 0.4,
  },
  headerCreateGoal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    backgroundColor: '#FFFFFF',
    marginVertical: 'auto',
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
    borderColor: '#ccc',
    borderBottomWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
  },
  valueDescription: {
    fontSize: 16,
    color: '#000',
    opacity: 0.7,
    textAlign: 'left',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: '100%',
    minWidth: '95%',
    overflow: 'hidden',
  },
  scrollView: {
    maxHeight: 120,
    flexGrow: 1,
  },
  /* Página de Configurações */
  footerSettings: {
    marginTop: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 20,
    width: '100%',
  },
  descriptionContainer: {
    marginVertical: 25,
    paddingHorizontal: 20,
  },
  descriptionInput: {
    height: 130,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlignVertical: 'top',
    backgroundColor: '#EBEBEB',
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    color: '#999',
    paddingRight: 10,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },    
  
  dataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default styles;
