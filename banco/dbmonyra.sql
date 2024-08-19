-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 19/08/2024 às 13:04
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
  `categoryGoal` char(25) DEFAULT NULL,
  `nameGoal` char(30) DEFAULT NULL,
  `descGoal` char(50) NOT NULL,
  `amountSaved` double NOT NULL DEFAULT 0,
  `amountRemaining` double NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tbgoals`
--

INSERT INTO `tbgoals` (`codGoal`, `categoryGoal`, `nameGoal`, `descGoal`, `amountSaved`, `amountRemaining`, `created_at`) VALUES
(55, 'Economia ou Investimentos', 'Reserva de emergência', '', 2000, 12000, '2024-08-16 11:15:31');

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

--
-- Despejando dados para a tabela `tbtransactions`
--

INSERT INTO `tbtransactions` (`codTransaction`, `valueTransaction`, `descTransaction`, `typeTransaction`, `categoryTransaction`, `created_at`, `userCod`) VALUES
(32, 12.5, 'Refrigerante', 'expense', 'Alimentação', '2024-08-14 22:38:58', 1),
(34, 80, 'Blusa Lacoste', 'expense', 'Vestuário', '2024-08-15 06:52:30', 1),
(35, 350, 'Viagem para São Paulo', 'expense', 'Transporte', '2024-08-16 15:29:40', 1),
(36, 120, 'Pagamento atrasado', 'gain', 'Remunerações', '2024-08-16 15:28:19', 1),
(37, 200, 'Benefícios do Governo', 'gain', 'Benefícios', '2024-08-16 15:29:19', 1),
(38, 700, 'Salário', 'gain', 'Remunerações', '2024-08-16 15:29:55', 1);

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
  `iconUser` char(50) NOT NULL DEFAULT '''/assets/img/icons/profile/user.png''',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passwordUser`, `incomeUser`, `balanceUser`, `iconUser`, `created_at`) VALUES
(1, 'Jessé Barbosa', 'barbosajesse419@gmail.com', '$2y$10$JdJ1aK4zWKFGQERuuvMGuurg7ht4JG16Cb7mv5j2z2uFAPJ9D2YGm', '4000', 577.5, 'default', '2024-07-17 13:52:30');

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
(12, 1, 55);

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
  MODIFY `codGoal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de tabela `tbtransactions`
--
ALTER TABLE `tbtransactions`
  MODIFY `codTransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de tabela `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `codUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de tabela `user_goals`
--
ALTER TABLE `user_goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
