<?php
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
                // Split the comma-separated user names into an array
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

    private function assignGoalToUser($input) {
        if (isset($input['userCod']) && isset($input['goalCod'])) {
            $userCod = $input['userCod'];
            $goalCod = $input['goalCod'];

            // Verifica se a associação já existe
            $stmt = $this->conn->prepare("SELECT * FROM user_goals WHERE userCod = ? AND goalCod = ?");
            $stmt->bind_param("ii", $userCod, $goalCod);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Goal already assigned to user"]);
            } else {
                // Insere nova associação
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
        if (isset($input['username']) && isset($input['password']) && isset($input['email'])) {
            $username = $input['username'];
            $password = $input['password'];
            $email = $input['email'];

            $stmt = $this->conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Username already taken"]);
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $this->conn->prepare("INSERT INTO tbusers (nameUser, passwordUser, emailUser) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $username, $hashedPassword, $email);
                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "User registered successfully"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error registering user"]);
                }
                $stmt->close();
            }
        } else {
            echo json_encode(["success" => false, "message" => "Please provide username, password, and email"]);
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
            default:
                echo json_encode(["success" => false, "message" => "Invalid action"]);
                break;
        }
    }
}

$manipularDados = new ManipularDados();
$manipularDados->handleRequest();
?>
