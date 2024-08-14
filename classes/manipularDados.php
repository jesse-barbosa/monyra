<?php
session_start(); 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

class ManipularDados extends Conexao {

    public function __construct() {
        parent::__construct();
    }

    private function getUserData($input) {
        if (isset($input['username'])) {
            $username = $input['username'];

            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
            $stmt->bind_param("s", $username);
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
            echo json_encode(["success" => false, "message" => "Please provide username"]);
        }
    }

    private function getUserGoals($input) {
        if (isset($input['userCod'])) {
            $userCod = $input['userCod'];

            $stmt = $this->conn->prepare("
                SELECT g.codGoal, g.nameGoal, g.amountSaved, g.amountRemaining, GROUP_CONCAT(u.nameUser) AS userNames
                FROM tbgoals g
                LEFT JOIN user_goals ug ON g.codGoal = ug.goalCod
                LEFT JOIN tbusers u ON ug.userCod = u.codUser
                WHERE g.codGoal IN (
                    SELECT goalCod
                    FROM user_goals
                    WHERE userCod = ?
                )
                GROUP BY g.codGoal
            ");
            $stmt->bind_param("i", $userCod);
            $stmt->execute();
            $result = $stmt->get_result();

            $goals = [];
            while ($row = $result->fetch_assoc()) {
                $row['userNames'] = explode(',', $row['userNames']);
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
                    WHERE userCod = ?
                ");
                $stmt->bind_param("i", $userCod);
                $stmt->execute();
                $result = $stmt->get_result();

                $transactions = [];
                while ($row = $result->fetch_assoc()) {
                    $transactions[] = $row;
                }

                if (!empty($transactions)) {
                    echo json_encode(["success" => true, "transactions" => $transactions]);
                } else {
                    echo json_encode(["success" => true, "transactions" => []]);
                }

                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "User not found"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Please provide username"]);
        }
    }

    private function getMonthlyExpenses($input) {
        if (isset($input['username'])) {
            $username = $input['username'];
            $currentMonth = date('Y-m');
            error_log("Current Month: " . $currentMonth);

            $stmt = $this->conn->prepare("SELECT codUser FROM tbusers WHERE nameUser = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $userCod = $user['codUser'];

                $stmt->close();

                $stmt = $this->conn->prepare("
                    SELECT categoryTransaction, SUM(valueTransaction) as totalSpent
                    FROM tbtransactions
                    WHERE typeTransaction = 'expense' AND DATE_FORMAT(created_at, '%Y-%m') = ? AND userCod = ?
                    GROUP BY categoryTransaction
                ");
                if (!$stmt) {
                    error_log("Failed to prepare statement: " . $this->conn->error);
                    echo json_encode(["success" => false, "message" => "Internal server error"]);
                    return;
                }

                $stmt->bind_param("si", $currentMonth, $userCod);
                $stmt->execute();
                $result = $stmt->get_result();

                if (!$result) {
                    error_log("Failed to execute statement: " . $stmt->error);
                    echo json_encode(["success" => false, "message" => "Internal server error"]);
                    return;
                }

                $expenses = [];
                while ($row = $result->fetch_assoc()) {
                    $expenses[] = $row;
                }

                if (!empty($expenses)) {
                    echo json_encode(["success" => true, "expenses" => $expenses]);
                } else {
                    echo json_encode(["success" => true, "expenses" => []]);
                }

                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "User not found"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Please provide username"]);
        }
    }

    private function getMonthlyGains($input) {
        error_log("getMonthlyGains called");
        if (isset($input['username'])) {
            $username = $input['username'];
            $currentMonth = date('Y-m');
            error_log("Current Month: " . $currentMonth);

            $stmt = $this->conn->prepare("SELECT codUser FROM tbusers WHERE nameUser = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            error_log("User query executed");

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $userCod = $user['codUser'];

                $stmt->close();
                error_log("User found with codUser: " . $userCod);

                $stmt = $this->conn->prepare("
                    SELECT categoryTransaction, SUM(valueTransaction) as totalGained
                    FROM tbtransactions
                    WHERE typeTransaction = 'gain' AND DATE_FORMAT(created_at, '%Y-%m') = ? AND userCod = ?
                    GROUP BY categoryTransaction
                ");
                if (!$stmt) {
                    error_log("Failed to prepare statement: " . $this->conn->error);
                    echo json_encode(["success" => false, "message" => "Internal server error"]);
                    return;
                }
                error_log("Statement prepared successfully");

                $stmt->bind_param("si", $currentMonth, $userCod);
                $stmt->execute();
                $result = $stmt->get_result();
                error_log("Gains query executed");

                if (!$result) {
                    error_log("Failed to execute statement: " . $stmt->error);
                    echo json_encode(["success" => false, "message" => "Internal server error"]);
                    return;
                }

                $gains = [];
                while ($row = $result->fetch_assoc()) {
                    $gains[] = $row;
                }

                $stmt->close();
                error_log("Gains retrieved successfully");

                echo json_encode(["success" => true, "gains" => $gains]);
            } else {
                $stmt->close();
                error_log("User not found");
                echo json_encode(["success" => false, "message" => "User not found"]);
            }
        } else {
            error_log("Missing parameters");
            echo json_encode(["success" => false, "message" => "Missing parameters"]);
        }
    }

    private function assignGoalToUser($input) {
        if (isset($input['userCod']) && isset($input['goalCod'])) {
            $userCod = $input['userCod'];
            $goalCod = $input['goalCod'];

            $stmt = $this->conn->prepare("SELECT * FROM user_goals WHERE userCod = ? AND goalCod = ?");
            $stmt->bind_param("ii", $userCod, $goalCod);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Goal already assigned to user"]);
            } else {
                $stmt = $this->conn->prepare("INSERT INTO user_goals (userCod, goalCod) VALUES (?, ?)");
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

    private function transfer($input) {
        if (isset($input['value']) && isset($input['category'])) {
            $value = $input['value'];
            $category = $input['category'];
            $description = isset($input['description']) ? $input['description'] : ''; // Obtém a descrição, se fornecida
    
            // Verifique se a sessão está iniciada e se o código do usuário está definido
            if (isset($_SESSION['userCod'])) {
                $userCod = $_SESSION['userCod'];
    
                $sql = "INSERT INTO tbtransactions (valueTransaction, descTransaction, typeTransaction, categoryTransaction, userCod) VALUES (?, ?, ?, ?, ?)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bind_param('dsssi', $value, $description, $input['operation'], $category, $userCod);
    
                if ($stmt->execute()) {
                    // Retorna a informação do usuário após a transferência
                    $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE codUser = ?");
                    $stmt->bind_param("i", $userCod);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $user = $result->fetch_assoc();
                    
                    echo json_encode(['success' => true, 'message' => 'Transferência realizada com sucesso!', 'user' => $user]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Erro ao realizar a transferência.']);
                }
                $stmt->close();
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
    
            // Verifique se a sessão está iniciada e se o código do usuário está definido
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

    private function login($input) {
        if (isset($input['username']) && isset($input['password'])) {
            $username = $input['username'];
            $password = $input['password'];
    
            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
    
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $storedPassword = $user['passwordUser'];
    
                if (password_verify($password, $storedPassword)) {
                    // Inicia a sessão e armazena o código do usuário
                    session_start();
                    $_SESSION['userCod'] = $user['codUser'];
    
                    echo json_encode(["success" => true, "message" => "Login successful", "user" => $user]);
                } else {
                    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Invalid username or password"]);
            }
    
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Please provide username and password"]);
        }
    }
    
    private function register($input) {
        if (isset($input['username']) && isset($input['email']) && isset($input['password']) && isset($input['incomeUser'])) {
            $username = $input['username'];
            $email = $input['email'];
            $password = $input['password'];
            $incomeUser = $input['incomeUser'];
    
            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
    
            if ($result->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Username already taken"]);
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $this->conn->prepare("INSERT INTO tbusers (nameUser, emailUser, passwordUser, incomeUser) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssss", $username, $email, $hashedPassword, $incomeUser);
                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "User registered successfully"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error registering user"]);
                }
                $stmt->close();
                
            }
        } else {
            echo json_encode(["success" => false, "message" => "Please provide username, password, email, and income"]);
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
            case 'getMonthlyExpenses':
                $this->getMonthlyExpenses($input);
                break;
            case 'getMonthlyGains':
                $this->getMonthlyGains($input);
                break;
            case 'getUserTransactions':
                $this->getUserTransactions($input);
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
