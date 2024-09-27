<?php
class Transfer extends Conexao {
    // Pega as transferências do usuário
    public function getUserTransactions($input) {
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
    // Realizar uma Transferência
    public function transfer($input) {
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
    // Deletar uma Transferência
    public function deleteTransaction($input) {
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

}
?>