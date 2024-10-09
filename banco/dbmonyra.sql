-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 09/10/2024 às 15:57
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
(80, 'Reserva de emergÃªncia', 'Economia', '(Essa meta foi gerada automaticamente na criaÃ§Ã£o de sua conta)', 1000, 12000, '2024-09-20 13:02:09', 131);

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
(69, 150, 'Compra de supermercado', 'expense', 'AlimentaÃ§Ã£o', '2024-10-09 10:00:00', 131),
(70, 200, 'Conta de luz', 'expense', 'Moradia', '2024-10-09 11:30:00', 131),
(72, 90, 'Transporte pÃºblico', 'expense', 'Transporte', '2024-10-01 08:00:00', 131),
(73, 500, 'Curso online', 'expense', 'EducaÃ§Ã£o', '2024-10-05 15:00:00', 131),
(75, 60, 'Jantar fora', 'expense', 'Lazer', '2024-09-15 20:00:00', 131),
(76, 180, 'Medicamentos', 'expense', 'SaÃºde', '2024-09-20 14:00:00', 131),
(78, 250, 'Compra de roupas', 'expense', 'VestuÃ¡rio', '2024-08-05 11:00:00', 131),
(81, 75, 'Cinema com amigos', 'expense', 'Lazer', '2024-07-10 19:00:00', 131),
(82, 150, 'Reforma da casa', 'expense', 'Moradia', '2024-07-15 09:00:00', 131),
(93, 1200, 'SalÃ¡rio do mÃªs', 'gain', 'RemuneraÃ§Ãµes', '2024-10-09 12:00:00', 131),
(94, 300, 'Venda de artesanato', 'gain', 'Empreendimentos', '2024-10-07 17:00:00', 131),
(95, 1000, 'BÃ´nus de desempenho', 'gain', 'RemuneraÃ§Ãµes', '2024-09-25 12:00:00', 131),
(96, 300, 'Venda de produtos', 'gain', 'Empreendimentos', '2024-08-15 16:00:00', 131),
(97, 400, 'Pagamento em aÃ§Ãµes', 'gain', 'Rendimentos', '2024-08-20 10:00:00', 131),
(98, 200, 'Pagamento de freelance', 'gain', 'Empreendimentos', '2024-07-20 13:00:00', 131),
(99, 500, 'Venda de mÃ³veis usados', 'gain', 'Empreendimentos', '2024-07-30 14:00:00', 131),
(100, 200, 'Reembolso de despesas', 'gain', 'BenefÃ­cios', '2024-09-10 16:00:00', 131),
(101, 150, 'Dividendo de aÃ§Ãµes', 'gain', 'Rendimentos', '2024-10-02 09:00:00', 131);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbusers`
--

CREATE TABLE `tbusers` (
  `codUser` int(11) NOT NULL,
  `nameUser` varchar(100) DEFAULT NULL,
  `emailUser` varchar(100) DEFAULT NULL,
  `passwordUser` char(60) NOT NULL,
  `descUser` char(200) NOT NULL DEFAULT 'No description',
  `incomeUser` varchar(10) DEFAULT NULL,
  `balanceUser` float NOT NULL DEFAULT 0,
  `iconUser` varchar(50) DEFAULT 'default',
  `typeUser` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passwordUser`, `descUser`, `incomeUser`, `balanceUser`, `iconUser`, `typeUser`, `created_at`) VALUES
(131, 'JessÃ© Barbosa', 'barbosajesse419@gmail.com', '$2y$10$Q0/WprZF3S/groZavwZgH.7XkVPZHpi7eDeaYFWdZ.c9B7T0Km2xi', 'No description.', '4000', 2595, 'default', 0, '2024-09-20 13:02:09');

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
  MODIFY `codTransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

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
