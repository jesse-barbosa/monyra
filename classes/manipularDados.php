<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

class ManipularDados extends Conexao {

    public function __construct() {
        parent::__construct();
        session_start(); // Inicializa a sessão
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
                SELECT g.codGoal, g.nameGoal, g.amountSaved, g.amountRemaining, g.created_at, GROUP_CONCAT(u.nameUser) AS userNames
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

            // Verifica se o usuário já existe
            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Username already taken"]);
            } else {
                $stmt = $this->conn->prepare("INSERT INTO tbusers (nameUser, emailUser, passwordUser, incomeUser) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssss", $username, $email, $password, $incomeUser);
                if ($stmt->execute()) {
                    $userCod = $this->conn->insert_id;
                    $_SESSION['userCod'] = $userCod;
                
                    $goalStmt = $this->conn->prepare("INSERT INTO tbgoals (nameGoal, categoryGoal, descGoal, amountSaved, amountRemaining) VALUES (?, ?, ?, ?, ?)");
                    if ($goalStmt === false) {
                        die('Goal Insert Prepare failed: ' . htmlspecialchars($this->conn->error));
                    }
                    $goalName = 'Reserva de emergência';
                    $goalCategory = 'Economia ou Investimentos';
                    $descGoal = '(Essa meta foi gerada automaticamente na criação de sua conta)';
                    $amountSaved = 0.00;
                    $amountRemaining = $incomeUser * 3;

                    $goalStmt->bind_param("sssdd", $goalName, $goalCategory, $descGoal, $amountSaved, $amountRemaining);
                
                    if ($goalStmt->execute()) {
                        $goalCod = $goalStmt->insert_id;
                
                        $assignStmt = $this->conn->prepare("INSERT INTO user_goals (userCod, goalCod) VALUES (?, ?)");
                        if ($assignStmt === false) {
                            die('Assign Goal Prepare failed: ' . htmlspecialchars($this->conn->error));
                        }
                        $assignStmt->bind_param("ii", $userCod, $goalCod);
                
                        if ($assignStmt->execute()) {
                            echo json_encode(["success" => true, "message" => "User registered and goal assigned successfully"]);
                        } else {
                            echo json_encode(["success" => false, "message" => "Failed to assign goal to user"]);
                        }
                
                        $assignStmt->close();
                    } else {
                        echo json_encode(["success" => false, "message" => "Failed to create goal"]);
                    }
                
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

                $sql = "INSERT INTO tbtransactions (valueTransaction, descTransaction, typeTransaction, categoryTransaction, userCod) VALUES (?, ?, ?, ?, ?)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bind_param('dsssi', $value, $description, $input['operation'], $category, $userCod);

                if ($stmt->execute()) {
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
        if (isset($input['category']) && isset($input['name']) && isset($input['description']) && isset($input['amountSaved']) && isset($input['amountRemaining'])) {
            $category = $input['category'];
            $name = $input['name'];
            $description = $input['description'];
            $amountSaved = $input['amountSaved'];
            $amountRemaining = $input['amountRemaining'];

            if (isset($_SESSION['userCod'])) {
                $userCod = $_SESSION['userCod'];

                $stmt = $this->conn->prepare("INSERT INTO tbgoals (categoryGoal, nameGoal, descGoal, amountSaved, amountRemaining) VALUES (?, ?, ?, ?, ?)");
                $stmt->bind_param("sssdd", $category, $name, $description, $amountSaved, $amountRemaining);
                
                if ($stmt->execute()) {
                    $goalCod = $this->conn->insert_id;
                    $stmt->close();

                    $stmt = $this->conn->prepare("INSERT INTO user_goals (userCod, goalCod) VALUES (?, ?)");
                    $stmt->bind_param("ii", $userCod, $goalCod);

                    if ($stmt->execute()) {
                        echo json_encode(["success" => true, "message" => "Goal created and assigned successfully"]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Failed to assign goal to user"]);
                    }
                } else {
                    echo json_encode(["success" => false, "message" => "Failed to create goal"]);
                }

                $stmt->close();
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

                $stmt = $this->conn->prepare("DELETE FROM user_goals WHERE userCod = ? AND goalCod = ?");
                $stmt->bind_param("ii", $userCod, $goalId);

                if ($stmt->execute()) {
                    if ($stmt->affected_rows > 0) {
                        $stmt = $this->conn->prepare("DELETE FROM tbgoals WHERE codGoal = ?");
                        $stmt->bind_param("i", $goalId);
                        if ($stmt->execute()) {
                            echo json_encode(["success" => true, "message" => "Goal deleted successfully."]);
                        } else {
                            echo json_encode(["success" => false, "message" => "Error deleting goal from the table."]);
                        }
                    } else {
                        echo json_encode(["success" => false, "message" => "Goal not found in the database"]);
                    }
                } else {
                    echo json_encode(["success" => false, "message" => "Error deleting goal."]);
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
