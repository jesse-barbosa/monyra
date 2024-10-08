<?php
class User extends Conexao {
    // Pega os dados do usuário
    public function getUserData($input) {
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
    // Função de Login
    public function login($input) {
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
    // Função de Registro
    public function register($input) {
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
    // Atualiza a descrição do usuário
    public function updateUserDescription($input) {
        if (isset($input['userId']) && isset($input['description'])) {
            $userId = $input['userId'];
            $description = $input['description'];

            $stmt = $this->conn->prepare("UPDATE tbusers SET descUser = ? WHERE codUser = ?");
            $stmt->bind_param("si", $description, $userId);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Descrição atualizada com sucesso"]);
            } else {
                echo json_encode(["success" => false, "message" => "Falha ao atualizar a descrição"]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Parâmetros faltando"]);
        }
    }

}
?>