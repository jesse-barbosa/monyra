<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

class ManipularDados extends Conexao {

    public function __construct() {
        parent::__construct();
        session_start();
    }

    private function getUserData($input) {
        if (isset($input['email'])) {
            $email = $input['email'];
            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE emailUser = ?");
            if ($stmt === false) {
                die('Prepare failed: ' . htmlspecialchars($this->conn->error));
            }
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                echo json_encode(["success" => true, "message" => "User data retrieved", "user" => $user]);
            } else {
                echo json_encode(["success" => false, "message" => "User not found"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Please provide email"]);
        }
    }
    private function getUserGoals($input) {
        if (isset($input['userCod'])) {
            $userCod = $input['userCod'];
            $stmt = $this->conn->prepare("
                SELECT g.codGoal, g.nameGoal, g.amountSaved, g.amountRemaining, g.created_at, u.nameUser
                FROM tbgoals g
                LEFT JOIN tbusers u ON g.userCod = u.codUser
                WHERE g.userCod = ?
            ");
            if ($stmt === false) {
                die('Prepare failed: ' . htmlspecialchars($this->conn->error));
            }
            $stmt->bind_param("i", $userCod);
            $stmt->execute();
            $result = $stmt->get_result();

            $goals = [];
            while ($row = $result->fetch_assoc()) {
                $goals[] = $row;
            }

            if (!empty($goals)) {
                echo json_encode(["success" => true, "message" => "User goals retrieved", "goals" => $goals]);
            } else {
                echo json_encode(["success" => true, "message" => "No goals found", "goals" => []]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Please provide userCod"]);
        }
    }

    private function getUserTransactions($input) {
        if (isset($input['username'])) {
            $username = $input['username'];
            $stmt = $this->conn->prepare("SELECT codUser FROM tbusers WHERE nameUser = ?");
            if ($stmt === false) {
                die('Prepare failed: ' . htmlspecialchars($this->conn->error));
            }
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $userCod = $user['codUser'];
                $stmt->close();

                $stmt = $this->conn->prepare("
                    SELECT codTransaction, descTransaction, valueTransaction, typeTransaction, categoryTransaction, created_at
                    FROM tbtransactions
                    WHERE userCod = ? ORDER BY created_at DESC
                ");
                if ($stmt === false) {
                    die('Prepare failed: ' . htmlspecialchars($this->conn->error));
                }
                $stmt->bind_param("i", $userCod);
                $stmt->execute();
                $result = $stmt->get_result();

                $transactions = [];
                while ($row = $result->fetch_assoc()) {
                    $transactions[] = $row;
                }

                echo json_encode(["success" => true, "transactions" => $transactions]);
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "User not found"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Please provide username"]);
        }
    }
    private function assignGoalToUser($input) {
        if (isset($input['userCod']) && isset($input['goalCod'])) {
            $userCod = $input['userCod'];
            $goalCod = $input['goalCod'];
    
            // Verificar se a meta já está associada ao usuário
            $stmt = $this->conn->prepare("SELECT * FROM tbgoals WHERE codGoal = ? AND userCod = ?");
            $stmt->bind_param("ii", $goalCod, $userCod);
            $stmt->execute();
            $result = $stmt->get_result();
    
            if ($result->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Goal already assigned to this user"]);
            } else {
                // Atribuir a meta ao usuário atualizando o campo userCod
                $stmt = $this->conn->prepare("UPDATE tbgoals SET userCod = ? WHERE codGoal = ?");
                $stmt->bind_param("ii", $userCod, $goalCod);
                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Goal assigned to user successfully"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error assigning goal to user"]);
                }
                $stmt->close();
            }
        } else {
            echo json_encode(["success" => false, "message" => "Please provide userCod and goalCod"]);
        }
    }    

    private function login($input) {
        if (isset($input['email']) && isset($input['password'])) {
            $email = $input['email'];
            $password = $input['password'];

            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE emailUser = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $storedPassword = $user['passwordUser'];

                if (password_verify($password, $storedPassword)) {
                    $_SESSION['userCod'] = $user['codUser'];
                    echo json_encode(["success" => true, "message" => "Login successful", "user" => $user]);
                } else {
                    echo json_encode(["success" => false, "message" => "Invalid password"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "User not found"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Email and password required"]);
        }
    }
    private function register($input) {
        if (isset($input['username']) && isset($input['email']) && isset($input['password']) && isset($input['incomeUser'])) {
            $username = $input['username'];
            $email = $input['email'];
            $password = password_hash($input['password'], PASSWORD_BCRYPT);
            $incomeUser = $input['incomeUser'];
            $balanceUser = 0;

            // Verifica se o usuário já existe
            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE emailUser = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Usuário já cadastrado no sistema"]);
            } else {
                $stmt = $this->conn->prepare("INSERT INTO tbusers (nameUser, emailUser, passwordUser, incomeUser, balanceUser) VALUES (?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssd", $username, $email, $password, $incomeUser, $balanceUser);
                if ($stmt->execute()) {
                    $userCod = $this->conn->insert_id;
                    $_SESSION['userCod'] = $userCod;
                
                    $goalStmt = $this->conn->prepare("INSERT INTO tbgoals (nameGoal, categoryGoal, descGoal, amountSaved, amountRemaining, userCod) VALUES (?, ?, ?, ?, ?, ?)");
                    if ($goalStmt === false) {
                        die('Goal Insert Prepare failed: ' . htmlspecialchars($this->conn->error));
                    }
                    $goalName = 'Reserva de emergência';
                    $goalCategory = 'Economia ou Investimentos';
                    $descGoal = '(Essa meta foi gerada automaticamente na criação de sua conta)';
                    $amountSaved = 0.00;
                    $amountRemaining = $incomeUser * 3;
                
                    $goalStmt->bind_param("sssddi", $goalName, $goalCategory, $descGoal, $amountSaved, $amountRemaining, $userCod);
                
                    // Execute a query de inserção da meta
                    if ($goalStmt->execute()) {
                        echo json_encode(["success" => true, "message" => "Usuário registrado com sucesso e meta criada"]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Failed to insert goal"]);
                    }
                
                    // Fechar o statement após a execução
                    $goalStmt->close();
                } else {
                    echo json_encode(["success" => false, "message" => "Failed to register user"]);
                }                
                $stmt->close();
            }
        } else {
            echo json_encode(["success" => false, "message" => "Missing parameters"]);
        }
    }
    private function transfer($input) {
        if (isset($input['value']) && isset($input['category']) && isset($input['operation'])) {
            $value = $input['value'];
            $category = $input['category'];
            $description = isset($input['description']) ? $input['description'] : '';
    
            if (isset($_SESSION['userCod'])) {
                $userCod = $_SESSION['userCod'];
    
                // Inicia uma transação para garantir a integridade dos dados
                $this->conn->begin_transaction();
    
                try {
                    // Insere a nova transação
                    $sql = "INSERT INTO tbtransactions (valueTransaction, descTransaction, typeTransaction, categoryTransaction, userCod) VALUES (?, ?, ?, ?, ?)";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bind_param('dssss', $value, $description, $input['operation'], $category, $userCod);
                    $stmt->execute();
                    $stmt->close();
    
                    // Atualiza o saldo do usuário
                    if ($input['operation'] == 'gain') {
                        $updateSql = "UPDATE tbusers SET balanceUser = balanceUser + ? WHERE codUser = ?";
                    } else if ($input['operation'] == 'expense') {
                        // Verifica se há saldo suficiente
                        $currentBalanceQuery = "SELECT balanceUser FROM tbusers WHERE codUser = ?";
                        $balanceStmt = $this->conn->prepare($currentBalanceQuery);
                        $balanceStmt->bind_param("i", $userCod);
                        $balanceStmt->execute();
                        $balanceResult = $balanceStmt->get_result();
                        $currentBalance = $balanceResult->fetch_assoc()['balanceUser'];
                        $balanceStmt->close();
    
                        if ($currentBalance < $value) {
                            echo json_encode(['success' => false, 'message' => 'Saldo insuficiente']);
                            return;
                        }
    
                        $updateSql = "UPDATE tbusers SET balanceUser = balanceUser - ? WHERE codUser = ?";
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Operação inválida']);
                        return;
                    }
    
                    $stmt = $this->conn->prepare($updateSql);
                    $stmt->bind_param('di', $value, $userCod);
                    $stmt->execute();
                    $stmt->close();
    
                    // Confirma a transação
                    $this->conn->commit();
    
                    // Recupera os dados atualizados do usuário
                    $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE codUser = ?");
                    $stmt->bind_param("i", $userCod);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $user = $result->fetch_assoc();
                    $stmt->close();
    
                    echo json_encode(['success' => true, 'message' => 'Transferência realizada com sucesso!', 'user' => $user]);
                } catch (Exception $e) {
                    // Reverte a transação em caso de erro
                    $this->conn->rollback();
                    echo json_encode(['success' => false, 'message' => 'Erro ao realizar a transferência.']);
                }
            } else {
                echo json_encode(["success" => false, "message" => "User not authenticated"]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
        }
    }    

    private function deleteTransaction($input) {
        if (isset($input['transactionId'])) {
            $transactionId = $input['transactionId'];

            if (isset($_SESSION['userCod'])) {
                $userCod = $_SESSION['userCod'];

                $stmt = $this->conn->prepare("DELETE FROM tbtransactions WHERE codTransaction = ? AND userCod = ?");
                $stmt->bind_param("ii", $transactionId, $userCod);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Transferência excluída com sucesso!"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Erro ao excluir a transferência."]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Usuário não autenticado."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "ID da transferência não fornecido."]);
        }
    }

    private function createGoal($input) {
        if (isset($input['name']) && isset($input['category']) && isset($input['description']) && isset($input['amountSaved']) && isset($input['amountRemaining'])) {
            $name = $input['name'];
            $category = $input['category'];
            $description = $input['description'];
            $amountSaved = $input['amountSaved'];
            $amountRemaining = $input['amountRemaining'];

            if (isset($_SESSION['userCod'])) {
                $userCod = $_SESSION['userCod'];

                $stmt = $this->conn->prepare("INSERT INTO tbgoals (nameGoal, categoryGoal ,descGoal, amountSaved, amountRemaining, userCod) VALUES (?, ?, ?, ?, ?, ?)");
                if ($stmt === false) {
                    die('Prepare failed: ' . htmlspecialchars($this->conn->error));
                }
                $stmt->bind_param("sssddi", $name, $category, $description, $amountSaved, $amountRemaining, $userCod);
                $stmt->execute();
                $stmt->close();

                echo json_encode(["success" => true, "message" => "Goal created successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "User not authenticated"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Missing parameters"]);
        }
    }

    private function deleteGoal($input) {
        if (isset($input['goalId'])) {
            $goalId = $input['goalId'];

            if (isset($_SESSION['userCod'])) {
                $userCod = $_SESSION['userCod'];

                $stmt = $this->conn->prepare("DELETE FROM tbgoals WHERE codGoal = ?");
                $stmt->bind_param("i", $goalId);
                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Goal deleted successfully."]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error deleting goal from the table."]);
                }

                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "User not authenticated."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Goal ID not provided."]);
        }
    }
    public function handleRequest() {
        $input = json_decode(file_get_contents("php://input"), true);
        $action = isset($input['action']) ? $input['action'] : '';

        switch ($action) {
            case 'getUserData':
                $this->getUserData($input);
                break;
            case 'getUserGoals':
                $this->getUserGoals($input);
                break;
            case 'getUserTransactions':
                $this->getUserTransactions($input);
                break;
            case 'assignGoalToUser':
                $this->assignGoalToUser($input);
                break;
            case 'login':
                $this->login($input);
                break;
            case 'register':
                $this->register($input);
                break;
            case 'transfer':
                $this->transfer($input);
                break;
            case 'deleteTransaction':
                $this->deleteTransaction($input);
                break;
            case 'createGoal':
                $this->createGoal($input);
                break;
            case 'deleteGoal':
                $this->deleteGoal($input);
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
