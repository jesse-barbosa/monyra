-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2025 at 01:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmonyra`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbgoals`
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
-- Dumping data for table `tbgoals`
--

INSERT INTO `tbgoals` (`codGoal`, `nameGoal`, `categoryGoal`, `descGoal`, `amountSaved`, `amountRemaining`, `created_at`, `userCod`) VALUES
(80, 'Emergency Fund', 'Savings', '(This goal was generated automatically upon account creation)', 1000, 12000, '2024-09-20 13:02:09', 131);

-- --------------------------------------------------------

--
-- Table structure for table `tbtransactions`
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
-- Dumping data for table `tbtransactions`
--

INSERT INTO `tbtransactions` (`codTransaction`, `valueTransaction`, `descTransaction`, `typeTransaction`, `categoryTransaction`, `created_at`, `userCod`) VALUES
(48, 1200, 'My salary', 'gain', 'Salaries', '2024-09-20 10:21:22', 131),
(49, 50, 'Hot Dog', 'expense', 'Food', '2024-09-27 08:01:51', 131),
(50, 120, 'Ticket to Rio de Janeiro', 'expense', 'Transport', '2024-09-27 08:06:46', 131),
(53, 100, 'Bread', 'expense', 'Food', '2024-10-07 14:40:47', 131);

-- --------------------------------------------------------

--
-- Table structure for table `tbusers`
--

CREATE TABLE `tbusers` (
  `codUser` int(11) NOT NULL,
  `nameUser` varchar(100) DEFAULT NULL,
  `emailUser` varchar(100) DEFAULT NULL,
  `passwordUser` char(60) NOT NULL,
  `descUser` char(75) NOT NULL DEFAULT 'No description.',
  `incomeUser` varchar(10) DEFAULT NULL,
  `balanceUser` float NOT NULL DEFAULT 0,
  `iconUser` varchar(50) DEFAULT 'default',
  `type_user` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passwordUser`, `descUser`, `incomeUser`, `balanceUser`, `iconUser`, `type_user`) VALUES
(131, 'Jesse Barbosa', 'barbosajesse419@gmail.com', '$2y$10$Q0/WprZF3S/groZavwZgH.7XkVPZHpi7eDeaYFWdZ.c9B7T0Km2xi', 'No description.', '4000', 630, 'default', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbgoals`
--
ALTER TABLE `tbgoals`
  ADD PRIMARY KEY (`codGoal`),
  ADD KEY `fk_user_goal` (`userCod`),
  ADD KEY `fk_user_goal_idx` (`userCod`);

--
-- Indexes for table `tbtransactions`
--
ALTER TABLE `tbtransactions`
  ADD PRIMARY KEY (`codTransaction`),
  ADD KEY `fk_user_transaction` (`userCod`);

--
-- Indexes for table `tbusers`
--
ALTER TABLE `tbusers`
  ADD PRIMARY KEY (`codUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbgoals`
--
ALTER TABLE `tbgoals`
  MODIFY `codGoal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `tbtransactions`
--
ALTER TABLE `tbtransactions`
  MODIFY `codTransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `codUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbgoals`
--
ALTER TABLE `tbgoals`
  ADD CONSTRAINT `fk_user_goal_foreign` FOREIGN KEY (`userCod`) REFERENCES `tbusers` (`codUser`);

--
-- Constraints for table `tbtransactions`
--
ALTER TABLE `tbtransactions`
  ADD CONSTRAINT `fk_user_transaction` FOREIGN KEY (`userCod`) REFERENCES `tbusers` (`codUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
