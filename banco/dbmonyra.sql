-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 04/09/2024 às 04:10
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
  `nameGoal` char(30) NOT NULL,
  `categoryGoal` char(25) NOT NULL,
  `descGoal` char(75) NOT NULL,
  `amountSaved` double NOT NULL DEFAULT 0,
  `amountRemaining` double NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tbgoals`
--

INSERT INTO `tbgoals` (`codGoal`, `nameGoal`, `categoryGoal`, `descGoal`, `amountSaved`, `amountRemaining`, `created_at`) VALUES
(69, 'Reserva de emergÃªncia', 'Economia ou Investimentos', '(Essa meta foi gerada automaticamente na criaÃ§Ã£o de sua conta)', 0, 18000, '2024-09-04 02:09:11');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbtransactions`
--

CREATE TABLE `tbtransactions` (
  `codTransaction` int(11) NOT NULL,
  `valueTransaction` float NOT NULL,
  `descTransaction` char(30) NOT NULL,
  `typeTransaction` char(10) NOT NULL,
  `categoryTransaction` char(25) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `userCod` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `iconUser` char(50) NOT NULL DEFAULT 'default',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passwordUser`, `incomeUser`, `balanceUser`, `iconUser`, `created_at`) VALUES
(117, 'JessÃ© Barbosa', 'barbosajesse419@gmail.com', '$2y$10$wQSRUQp09iIA39EX6sCHSebSVi06B26GNFHpN3E9pvnNHPw.r/a7m', '6000', 0, 'default', '2024-09-04 02:09:11');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_goals`
--

CREATE TABLE `user_goals` (
  `id` int(11) NOT NULL,
  `userCod` int(11) NOT NULL,
  `goalCod` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `user_goals`
--

INSERT INTO `user_goals` (`id`, `userCod`, `goalCod`) VALUES
(26, 117, 69);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbgoals`
--
ALTER TABLE `tbgoals`
  ADD PRIMARY KEY (`codGoal`);

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
  MODIFY `codGoal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de tabela `tbtransactions`
--
ALTER TABLE `tbtransactions`
  MODIFY `codTransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de tabela `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `codUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT de tabela `user_goals`
--
ALTER TABLE `user_goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restrições para tabelas despejadas
--

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
