-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2025 at 09:48 AM
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
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `date`, `image`, `category`) VALUES
(1, 'hr', 'mg', '2025-01-03 18:09:37', '/uploads/1735927777221.png', NULL),
(2, 'kkkkk', 'ghjkl', '2025-01-03 18:54:43', '/uploads/1735930483561.png', NULL),
(3, 'accountant', 'mg', '2025-01-04 12:29:19', '/uploads/1735993759221.png', NULL),
(4, 'jjjjjj', 'bvbnnmmhjnmd f', '2025-01-10 13:46:32', '/uploads/1736626182709.jpg', NULL),
(14, 'acc', 'saaaaasasaa', '2025-01-12 07:21:43', '/uploads/1736666503672.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `created_at`) VALUES
(1, 'confiance', '$2b$10$GUFQRmhCSejvq6a6zG09H.7zHoBKOGKSBSkmG/6RXsicZiLwMx8JS', 'confianceuwayo9@gmail.com', 'user', '2025-01-09 15:17:35'),
(2, 'kabebe', '', 'devouwiragiye39@gmail.com', 'user', '2025-01-11 11:48:52'),
(3, 'uwayo__confiance', '', 'confianceuwayo9@gmail.com', 'user', '2025-01-11 11:49:17'),
(4, 'confiance', '12345', NULL, 'user', '2025-01-11 13:57:47'),
(5, 'confiance', 'uwaoyo@', NULL, 'user', '2025-01-11 14:01:28'),
(6, 'florence', '11111111111111111', NULL, 'user', '2025-01-11 14:02:42'),
(7, 'admin', 'flo123', 'confianceuwayo@gmail.com', 'user', '2025-01-11 14:08:19'),
(8, 'souvenir', '2019', 'confianceuwayo9@gmail.com', 'user', '2025-01-11 16:51:54'),
(9, 'uwayo', '12345$', 'confianceuwayo@gmail.com', 'user', '2025-01-12 06:57:59'),
(10, 'uwayo__confiance', 'uwayo@', 'confianceuwayo@gmail.com', 'user', '2025-01-12 07:16:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
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
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
