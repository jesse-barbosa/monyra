-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 14/08/2024 às 12:50
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
  `userGoalCod` int(11) DEFAULT NULL,
  `categoryGoal` char(25) DEFAULT NULL,
  `nameGoal` char(30) DEFAULT NULL,
  `amountSaved` double NOT NULL DEFAULT 0,
  `amountRemaining` double NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tbgoals`
--

INSERT INTO `tbgoals` (`codGoal`, `userGoalCod`, `categoryGoal`, `nameGoal`, `amountSaved`, `amountRemaining`, `created_at`, `updated_at`) VALUES
(2, 1, 'Economia ou Investimentos', 'Reserva de emergência', 100, 1000, '2024-07-19 15:20:34', '2024-07-19 15:20:34');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbtransactions`
--

CREATE TABLE `tbtransactions` (
  `codTransaction` int(11) NOT NULL,
  `valueTransaction` float NOT NULL,
  `descTransaction` char(50) NOT NULL,
  `typeTransaction` char(10) NOT NULL,
  `categoryTransaction` char(25) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `userCod` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbtransactions`
--

INSERT INTO `tbtransactions` (`codTransaction`, `valueTransaction`, `descTransaction`, `typeTransaction`, `categoryTransaction`, `created_at`, `updated_at`, `userCod`) VALUES
(15, 100, 'Lorem ipsum', 'expense', 'Saúde', '2024-08-08 10:57:38', '2024-08-08 10:57:38', 1),
(18, 100, 'Teste', 'gain', 'Empreendimentos', '2024-08-08 11:21:42', '2024-08-08 11:21:42', 1),
(21, 75, 'Teste', 'gain', 'Benefícios', '2024-08-08 11:26:20', '2024-08-08 11:26:20', 1),
(24, 100, 'Lorem ipsum Dolor Lorem ipsum Dolor Lore', 'expense', 'Moradia', '2024-08-10 11:11:11', '2024-08-10 11:11:11', 1),
(25, 100, 'Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Do', 'gain', 'Remunerações', '2024-08-10 11:15:47', '2024-08-10 11:15:47', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbusers`
--

CREATE TABLE `tbusers` (
  `codUser` int(11) NOT NULL,
  `nameUser` varchar(100) DEFAULT NULL,
  `emailUser` varchar(100) DEFAULT NULL,
  `passwordUser` char(60) NOT NULL,
  `incomeUser` char(10) NOT NULL,
  `balanceUser` float DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passwordUser`, `incomeUser`, `balanceUser`, `created_at`) VALUES
(1, 'Jesse Barbosa', 'barbosajesse419@gmail.com', '$2y$10$JdJ1aK4zWKFGQERuuvMGuurg7ht4JG16Cb7mv5j2z2uFAPJ9D2YGm', '', 31.6, '2024-07-17 13:52:30');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_goals`
--

CREATE TABLE `user_goals` (
  `id` int(11) NOT NULL,
  `userCod` int(11) DEFAULT NULL,
  `goalCod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `user_goals`
--

INSERT INTO `user_goals` (`id`, `userCod`, `goalCod`) VALUES
(6, 1, 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbgoals`
--
ALTER TABLE `tbgoals`
  ADD PRIMARY KEY (`codGoal`),
  ADD KEY `userGoalCod` (`userGoalCod`);

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
-- Índices de tabela `user_goals`
--
ALTER TABLE `user_goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userCod` (`userCod`),
  ADD KEY `goalCod` (`goalCod`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbgoals`
--
ALTER TABLE `tbgoals`
  MODIFY `codGoal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `tbtransactions`
--
ALTER TABLE `tbtransactions`
  MODIFY `codTransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `codUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `user_goals`
--
ALTER TABLE `user_goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbgoals`
--
ALTER TABLE `tbgoals`
  ADD CONSTRAINT `tbgoals_ibfk_1` FOREIGN KEY (`userGoalCod`) REFERENCES `tbusers` (`codUser`);

--
-- Restrições para tabelas `tbtransactions`
--
ALTER TABLE `tbtransactions`
  ADD CONSTRAINT `fk_user_transaction` FOREIGN KEY (`userCod`) REFERENCES `tbusers` (`codUser`);

--
-- Restrições para tabelas `user_goals`
--
ALTER TABLE `user_goals`
  ADD CONSTRAINT `user_goals_ibfk_1` FOREIGN KEY (`userCod`) REFERENCES `tbusers` (`codUser`),
  ADD CONSTRAINT `user_goals_ibfk_2` FOREIGN KEY (`goalCod`) REFERENCES `tbgoals` (`codGoal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
