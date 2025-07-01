-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 02:54 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `satisfactionsurvey`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `officer_id` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `suggestions` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `date`, `officer_id`, `point`, `suggestions`) VALUES
(14, '2024-12-23 08:28:11', 2, 5, 'asdsaasda'),
(15, '2024-12-23 08:28:26', 2, 4, 'qweqwe'),
(16, '2024-12-24 02:18:52', 3, 5, ''),
(17, '2024-12-24 02:18:56', 3, 4, 'qwewqqweqw'),
(18, '2024-12-24 02:25:02', 2, 5, ''),
(19, '2024-12-24 02:25:05', 2, 4, ''),
(20, '2024-12-24 02:25:08', 2, 3, 'asdas');

-- --------------------------------------------------------

--
-- Table structure for table `officer`
--

CREATE TABLE `officer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rank` varchar(255) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `path_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `officer`
--

INSERT INTO `officer` (`id`, `name`, `rank`, `image_name`, `path_image`) VALUES
(2, 'Test', 'Test', 'officer4.png', '/SatisfactionSurvey/image/officers/'),
(3, 'Test2', 'Test2', 'officer3.png', '/SatisfactionSurvey/image/officers/');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `role` varchar(25) NOT NULL,
  `last_login` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `salt`, `token`, `role`, `last_login`) VALUES
(1, 'admin', '312aff255bbbc2e5b8538343f11955dd', 'admin', '9ZLQPKiU9d', NULL, 'ADMIN', '2025-03-20 09:40:38'),
(2, 'ratchanon.s', '5b7f66ba26669b9b7d1c8c9283ce9edd', 'รัชชานนท์ เสรีพงค์', 'GjzSO6JqQa', '0bc978887ffabeee9b84f82c1d1573e4', 'ADMIN', '2024-12-23 16:11:40'),
(7, 'test', 'b3c5d52609ea79775d88353008df2b38', 'Testaaaa', 'p2hgp3ZLU0', NULL, 'USER', '2024-12-16 11:57:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_officer_data_id` (`officer_id`);

--
-- Indexes for table `officer`
--
ALTER TABLE `officer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `officer`
--
ALTER TABLE `officer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `fk_officer_data_id` FOREIGN KEY (`officer_id`) REFERENCES `officer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
