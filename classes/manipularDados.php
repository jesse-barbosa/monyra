<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

// Pega o método da requisição
$method = $_SERVER['REQUEST_METHOD'];

// Pega o corpo da requisição se for um POST
$input = json_decode(file_get_contents("php://input"), true);

if ($method == 'POST' && isset($input['action'])) {
    $action = $input['action'];

    if ($action == 'login') {
        login($input, $conn);
    } elseif ($action == 'getUserData') {
        getUserData($input, $conn);
    } elseif ($action == 'getUserGoals') { // Corrigido de getUserGoalsData para getUserGoals
        getUserGoals($input, $conn);
    } elseif ($action == 'register') {
        register($input, $conn);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid action"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method or missing action"
    ]);
}

$conn->close();

function login($input, $conn) {
    if (isset($input['username']) && isset($input['password'])) {
        $username = $input['username'];
        $password = $input['password'];

        $stmt = $conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $storedPassword = $user['passwordUser'];

            // Verifica a senha criptografada
            if (password_verify($password, $storedPassword)) {
                echo json_encode([
                    "success" => true,
                    "message" => "Login successful",
                    "user" => $user
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "Invalid username or password"
                ]);
            }
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Invalid username or password"
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Please provide username and password"
        ]);
    }
}

function getUserData($input, $conn) {
    if (isset($input['username'])) {
        $username = $input['username'];

        $stmt = $conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode([
                "success" => true,
                "message" => "User data retrieved",
                "user" => $user
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "User not found"
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Please provide username"
        ]);
    }
}

function getUserGoals($input, $conn) { // Corrigido de getUserGoalsData para getUserGoals
    if (isset($input['userCod'])) { // Corrigido de username para userCod
        $userCod = $input['userCod'];

        $stmt = $conn->prepare("SELECT * FROM tbgoals WHERE userCod = ?"); // Corrigido de username para userCod
        $stmt->bind_param("i", $userCod);
        $stmt->execute();
        $result = $stmt->get_result();

        $goals = [];
        while ($row = $result->fetch_assoc()) {
            $goals[] = $row;
        }

        if (!empty($goals)) {
            echo json_encode([
                "success" => true,
                "message" => "User goals retrieved",
                "goals" => $goals
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "No goals found for the user"
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Please provide userCod"
        ]);
    }
}

function register($input, $conn) {
    if (isset($input['username']) && isset($input['password']) && isset($input['email'])) {
        $username = $input['username'];
        $password = $input['password'];
        $email = $input['email'];

        // Verifica se o usuário já existe
        $stmt = $conn->prepare("SELECT * FROM tbusers WHERE nameUser = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode([
                "success" => false,
                "message" => "Username already taken"
            ]);
        } else {
            // Insere um novo usuário com senha criptografada
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO tbusers (nameUser, passwordUser, emailUser) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $username, $hashedPassword, $email);
            if ($stmt->execute()) {
                echo json_encode([
                    "success" => true,
                    "message" => "User registered successfully"
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "Error registering user"
                ]);
            }
            $stmt->close();
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Please provide username, password, and email"
        ]);
    }
}
?>
