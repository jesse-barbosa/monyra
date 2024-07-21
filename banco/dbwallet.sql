-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/07/2024 às 22:45
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
-- Banco de dados: `dbwallet`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbgoals`
--

CREATE TABLE `tbgoals` (
  `codGoal` int(11) NOT NULL,
  `userGoalCod` int(11) DEFAULT NULL,
  `categoryGoal` char(20) DEFAULT NULL,
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
(1, 1, 'Lazer', 'Meu casamento', 5600, 7200, '2024-07-19 14:53:28', '2024-07-19 14:53:28'),
(2, 1, 'Moradia', 'Apartamento novo', 76430, 320000, '2024-07-19 15:20:34', '2024-07-19 15:20:34');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbusers`
--

CREATE TABLE `tbusers` (
  `codUser` int(11) NOT NULL,
  `nameUser` varchar(100) DEFAULT NULL,
  `emailUser` varchar(100) DEFAULT NULL,
  `passwordUser` char(60) NOT NULL,
  `balanceUser` float DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passwordUser`, `balanceUser`, `created_at`) VALUES
(1, 'Jesse Barbosa', 'barbosajesse419@gmail.com', '$2y$10$JdJ1aK4zWKFGQERuuvMGuurg7ht4JG16Cb7mv5j2z2uFAPJ9D2YGm', 31.6, '2024-07-17 13:52:30'),
(2, 'teste', 'teste@teste.com', '$2y$10$ji5ZzlJInlzJ6TFvGaGey.VrkXiIlG.613L3CCqqFptrkug9w9FUa', 0, '2024-07-19 18:24:54');

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
(5, 1, 1),
(6, 1, 2),
(7, 2, 2);

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
-- AUTO_INCREMENT de tabela `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `codUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- Restrições para tabelas `user_goals`
--
ALTER TABLE `user_goals`
  ADD CONSTRAINT `user_goals_ibfk_1` FOREIGN KEY (`userCod`) REFERENCES `tbusers` (`codUser`),
  ADD CONSTRAINT `user_goals_ibfk_2` FOREIGN KEY (`goalCod`) REFERENCES `tbgoals` (`codGoal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
