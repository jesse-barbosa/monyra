<?php
class Goal extends Conexao {
    // Pega as goals do usuário
    public function getUserGoals($input) {
        if (isset($input['userCod'])) {
            $userCod = $input['userCod'];
            $stmt = $this->conn->prepare("
                SELECT g.codGoal, g.nameGoal, g.categoryGoal, g.descGoal, g.amountSaved, g.amountRemaining, g.created_at, u.nameUser
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
    // Relaciona as goals com o usuário
    public function assignGoalToUser($input) {
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
    // Criar uma Goal
    public function createGoal($input) {
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
    // Atualizar meta
    public function updateGoal($input) {
        // Verifica se os parâmetros necessários estão definidos
        if (isset($input['goalId']) && isset($input['amountSaved']) && isset($input['categoryGoal']) && isset($input['descGoal'])) {
            $goalId = $input['goalId'];
            $amountSaved = $input['amountSaved'];
            $categoryGoal = $input['categoryGoal'];
            $descGoal = $input['descGoal'];
    
            // Prepara a consulta SQL para atualizar a meta
            $stmt = $this->conn->prepare("UPDATE tbgoals SET amountSaved = ?, categoryGoal = ?, descGoal = ? WHERE codGoal = ?");
            
            if ($stmt === false) {
                die('Prepare failed: ' . htmlspecialchars($this->conn->error));
            }
    
            // Faz o binding dos parâmetros
            $stmt->bind_param("dssi", $amountSaved, $categoryGoal, $descGoal, $goalId);
    
            // Executa a consulta
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Goal updated successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error updating goal"]);
            }
    
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Missing parameters"]);
        }
    }
    

    // Deletar uma Goal
    public function deleteGoal($input) {
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
}
?>