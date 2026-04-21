-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2026 at 08:12 PM
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
-- Database: `stock_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `symbol` varchar(10) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `buy_price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `symbol`, `quantity`, `buy_price`) VALUES
(2, 'AMZN', 1, 249.7),
(3, 'META', 1, 676.87),
(4, 'INTC', 1, 68.5),
(5, 'NFLX', 1, 107.79),
(6, 'TSLA', 1, 388.9),
(8, 'NFLX', 1, 108.11),
(9, 'NFLX', 1, 108.58),
(10, 'UBER', 1, 76.49),
(12, 'RELIANCE.N', 1, 1343.85),
(13, 'RELIANCE.N', 1, 1342.85),
(14, 'RELIANCE.N', 1, 1342.85),
(15, 'MSFT', 1, 420.25),
(16, 'AAPL', 1, 263.82),
(17, 'AAPL', 1, 263.43);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `symbol` varchar(10) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `symbol`, `type`, `price`, `quantity`, `created_at`) VALUES
(1, 'AAPL', 'BUY', 263.4, 1, '2026-04-17 01:47:29'),
(2, 'AAPL', 'SELL', 263.4, 1, '2026-04-17 01:47:34'),
(3, 'AMZN', 'BUY', 249.7, 1, '2026-04-17 01:47:36'),
(4, 'META', 'BUY', 676.87, 1, '2026-04-17 01:47:37'),
(5, 'INTC', 'BUY', 68.5, 1, '2026-04-17 01:47:38'),
(6, 'NFLX', 'BUY', 107.79, 1, '2026-04-17 01:47:39'),
(7, 'TSLA', 'BUY', 388.9, 1, '2026-04-17 01:47:43'),
(8, 'AAPL', 'BUY', 263.99, 1, '2026-04-17 01:54:11'),
(9, 'AAPL', 'SELL', 263.4, 1, '2026-04-17 01:54:30'),
(10, 'NFLX', 'BUY', 108.11, 1, '2026-04-17 01:56:46'),
(11, 'NFLX', 'BUY', 108.58, 1, '2026-04-17 01:56:47'),
(12, 'TCS.NS', 'SELL', 2577.41, 1, '2026-04-17 01:57:24'),
(13, 'TCS.NS', 'SELL', 2577.41, 1, '2026-04-17 01:57:24'),
(14, 'TCS.NS', 'SELL', 2577.55, 1, '2026-04-17 01:57:25'),
(15, 'TCS.NS', 'SELL', 2577.55, 1, '2026-04-17 01:57:25'),
(16, 'TCS.NS', 'SELL', 2577.55, 1, '2026-04-17 01:57:25'),
(17, 'UBER', 'BUY', 76.49, 1, '2026-04-17 02:00:08'),
(18, 'TCS.NS', 'BUY', 2576.09, 1, '2026-04-17 02:01:42'),
(19, 'TCS.NS', 'SELL', 2576.09, 1, '2026-04-17 02:01:43'),
(20, 'RELIANCE.N', 'BUY', 1343.85, 1, '2026-04-17 02:03:12'),
(21, 'RELIANCE.N', 'BUY', 1342.85, 1, '2026-04-17 02:03:14'),
(22, 'RELIANCE.N', 'BUY', 1342.85, 1, '2026-04-17 02:03:15'),
(23, 'RELIANCE.N', 'SELL', 1343.09, 1, '2026-04-17 02:03:24'),
(24, 'RELIANCE.N', 'SELL', 1343.09, 1, '2026-04-17 02:03:25'),
(25, 'RELIANCE.N', 'SELL', 1343.09, 1, '2026-04-17 02:03:25'),
(26, 'RELIANCE.N', 'SELL', 1344.23, 1, '2026-04-17 02:03:25'),
(27, 'RELIANCE.N', 'SELL', 1344.23, 1, '2026-04-17 02:03:26'),
(28, 'RELIANCE.N', 'SELL', 1344.23, 1, '2026-04-17 02:03:26'),
(29, 'RELIANCE.N', 'SELL', 1344.23, 1, '2026-04-17 02:03:27'),
(30, 'RELIANCE.N', 'SELL', 1344.23, 1, '2026-04-17 02:03:27'),
(31, 'RELIANCE.N', 'SELL', 1344.23, 1, '2026-04-17 02:03:27'),
(32, 'RELIANCE.N', 'SELL', 1342.63, 1, '2026-04-17 02:03:28'),
(33, 'RELIANCE.N', 'SELL', 1343.27, 1, '2026-04-17 02:03:29'),
(34, 'RELIANCE.N', 'SELL', 1343.27, 1, '2026-04-17 02:03:31'),
(35, 'MSFT', 'BUY', 420.25, 1, '2026-04-17 02:14:55'),
(36, 'AAPL', 'BUY', 263.82, 1, '2026-04-17 08:08:12'),
(37, 'AAPL', 'BUY', 263.43, 1, '2026-04-17 08:08:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
