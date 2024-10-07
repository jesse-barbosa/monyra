<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Conexao.php';
include 'User.php';
include 'Goals.php';
include 'Transactions.php';

class ManipularDados extends Conexao {

    public function __construct() {
        parent::__construct();
        session_start();
    }
    // Lida com as requisições do Front-End
    public function handleRequest() {
        $input = json_decode(file_get_contents("php://input"), true);
        $action = isset($input['action']) ? $input['action'] : '';

        $user = New User();
        $goal = New Goal();
        $transfer = New Transfer();

        switch ($action) {

            case 'getUserData':
                $user->getUserData($input);
                break;
            case 'getUserGoals':
                $goal->getUserGoals($input);
                break;
            case 'getUserTransactions':
                $transfer->getUserTransactions($input);
                break;
            case 'assignGoalToUser':
                $goal->assignGoalToUser($input);
                break;
            case 'login':
                $user->login($input);
                break;
            case 'register':
                $user->register($input);
                break;
            case 'transfer':
                $transfer->transfer($input);
                break;
            case 'deleteTransaction':
                $transfer->deleteTransaction($input);
                break;
            case 'createGoal':
                $goal->createGoal($input);
                break;
            case 'updateGoal':
                $goal->updateGoal($input);
                break;                
            case 'deleteGoal':
                $goal->deleteGoal($input);
                break;
            default:
                echo json_encode(["success" => false, "message" => "Invalid action"]);
                break;
        }
    }
}

$manipularDados = new ManipularDados();
$manipularDados->handleRequest();
?>
