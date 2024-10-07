-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 07/10/2024 às 22:30
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbmonyra`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbgoals`
--

CREATE TABLE `tbgoals` (
  `codGoal` int(11) NOT NULL,
  `nameGoal` varchar(30) DEFAULT NULL,
  `categoryGoal` varchar(25) DEFAULT NULL,
  `descGoal` varchar(75) DEFAULT NULL,
  `amountSaved` double NOT NULL DEFAULT 0,
  `amountRemaining` double NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userCod` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbgoals`
--

INSERT INTO `tbgoals` (`codGoal`, `nameGoal`, `categoryGoal`, `descGoal`, `amountSaved`, `amountRemaining`, `created_at`, `userCod`) VALUES
(80, 'Reserva de emergÃªncia', 'Moradia', '(Essa meta foi gerada automaticamente na criaÃ§Ã£o de sua conta)', 1000, 12000, '2024-09-20 13:02:09', 131),
(81, 'Reserva de emergÃªncia', 'Economia', '(Essa meta foi gerada automaticamente na criaÃ§Ã£o de sua conta)', 0, 18000, '2024-09-23 13:28:48', 132),
(83, 'Reserva de emergÃªncia', 'Economia', '(Essa meta foi gerada automaticamente na criaÃ§Ã£o de sua conta)', 0, 18000, '2024-09-30 12:27:20', 134);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbtransactions`
--

CREATE TABLE `tbtransactions` (
  `codTransaction` int(11) NOT NULL,
  `valueTransaction` float NOT NULL,
  `descTransaction` varchar(30) DEFAULT NULL,
  `typeTransaction` varchar(10) DEFAULT NULL,
  `categoryTransaction` varchar(25) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `userCod` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbtransactions`
--

INSERT INTO `tbtransactions` (`codTransaction`, `valueTransaction`, `descTransaction`, `typeTransaction`, `categoryTransaction`, `created_at`, `userCod`) VALUES
(48, 1200, 'Meu salÃ¡rio', 'gain', 'RemuneraÃ§Ãµes', '2024-09-20 10:21:22', 131),
(49, 50, 'Coxinha', 'expense', 'AlimentaÃ§Ã£o', '2024-09-27 08:01:51', 131),
(50, 120, 'Passagem para o Rio de Janeiro', 'expense', 'Transporte', '2024-09-27 08:06:46', 131),
(53, 100, 'teste', 'expense', 'AlimentaÃ§Ã£o', '2024-10-07 14:40:47', 131);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbusers`
--

CREATE TABLE `tbusers` (
  `codUser` int(11) NOT NULL,
  `nameUser` varchar(100) DEFAULT NULL,
  `emailUser` varchar(100) DEFAULT NULL,
  `passwordUser` char(60) NOT NULL,
  `incomeUser` varchar(10) DEFAULT NULL,
  `balanceUser` float NOT NULL DEFAULT 0,
  `iconUser` varchar(50) DEFAULT 'default',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passwordUser`, `incomeUser`, `balanceUser`, `iconUser`, `created_at`) VALUES
(131, 'JessÃ© Barbosa', 'barbosajesse419@gmail.com', '$2y$10$Q0/WprZF3S/groZavwZgH.7XkVPZHpi7eDeaYFWdZ.c9B7T0Km2xi', '4000', 630, 'default', '2024-09-20 13:02:09'),
(132, 'JosÃ© Campos', 'jose@gmail.com', '$2y$10$EP1YIfzpJ8fQQSDfVCmI1O7g6cdhsABvXj0mBDuzeOLv41rhe/D3e', '6000', 0, 'default', '2024-09-23 13:28:48'),
(134, 'Marcos', 'marcos@gmail.com', '$2y$10$EAV7qrqDrE6OCEOwYVskh.pBunB.9fOUhRlF58mfC8mtEzG3eMjrC', '6000', 0, 'default', '2024-09-30 12:27:20');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbgoals`
--
ALTER TABLE `tbgoals`
  ADD PRIMARY KEY (`codGoal`),
  ADD KEY `fk_user_goal` (`userCod`),
  ADD KEY `fk_user_goal_idx` (`userCod`);

--
-- Índices de tabela `tbtransactions`
--
ALTER TABLE `tbtransactions`
  ADD PRIMARY KEY (`codTransaction`),
  ADD KEY `fk_user_transaction` (`userCod`);

--
-- Índices de tabela `tbusers`
--
ALTER TABLE `tbusers`
  ADD PRIMARY KEY (`codUser`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbgoals`
--
ALTER TABLE `tbgoals`
  MODIFY `codGoal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de tabela `tbtransactions`
--
ALTER TABLE `tbtransactions`
  MODIFY `codTransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de tabela `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `codUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbgoals`
--
ALTER TABLE `tbgoals`
  ADD CONSTRAINT `fk_user_goal_foreign` FOREIGN KEY (`userCod`) REFERENCES `tbusers` (`codUser`);

--
-- Restrições para tabelas `tbtransactions`
--
ALTER TABLE `tbtransactions`
  ADD CONSTRAINT `fk_user_transaction` FOREIGN KEY (`userCod`) REFERENCES `tbusers` (`codUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
