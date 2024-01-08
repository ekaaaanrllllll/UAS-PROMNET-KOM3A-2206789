-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2024 at 10:55 AM
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
-- Database: `db_2206789_ekaanrll_uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory_eka`
--

CREATE TABLE `inventory_eka` (
  `id` int(11) NOT NULL,
  `nama_barang` text NOT NULL,
  `jumlah` bigint(20) NOT NULL,
  `harga_satuan` bigint(20) NOT NULL,
  `lokasi` enum('Bandung','Jakarta','Manokwari','Denpasar') NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_eka`
--

INSERT INTO `inventory_eka` (`id`, `nama_barang`, `jumlah`, `harga_satuan`, `lokasi`, `deskripsi`) VALUES
(1, 'Laptop HP Envy x360', 105, 20900000, 'Bandung', 'Processor Ryzen 9'),
(2, 'Laptop HP Victus', 80, 18000000, 'Jakarta', 'Layar OLED '),
(4, 'IP Xr ', 25, 9800000, 'Manokwari', 'RAM 3GB, ROM 256GB'),
(5, 'Keyboard  Logitech K380 Multi Device', 60, 500000, 'Bandung', 'Free Pembelian HP Envy'),
(21, 'Mouse Gaming Razer DeathAdder', 50, 800000, 'Jakarta', 'Free Pembelian HP Victus'),
(22, 'Smartphone Samsung Galaxy Z Flip5', 115, 17899000, 'Denpasar', 'RAM 8, ROM 512GB'),
(23, 'Asus Vivobook', 60, 9000000, 'Bandung', 'Cocok untuk game');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory_eka`
--
ALTER TABLE `inventory_eka`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory_eka`
--
ALTER TABLE `inventory_eka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
