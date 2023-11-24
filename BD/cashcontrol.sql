-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2023 a las 04:32:41
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cashcontrol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `CategoryIcon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metasfinancieras`
--

CREATE TABLE `metasfinancieras` (
  `GoalID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `TipoMeta` varchar(255) DEFAULT NULL,
  `MontoMeta` decimal(10,2) DEFAULT NULL,
  `FechaVencimiento` timestamp NULL DEFAULT NULL,
  `Progreso` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuestos`
--

CREATE TABLE `presupuestos` (
  `BudgetID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Categoria` varchar(255) DEFAULT NULL,
  `MontoPresupuestado` decimal(10,2) DEFAULT NULL,
  `MontoGastado` decimal(10,2) DEFAULT NULL,
  `StartDate` timestamp NULL DEFAULT NULL,
  `EndDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recordatorios`
--

CREATE TABLE `recordatorios` (
  `ReminderID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ReminderDescription` varchar(255) DEFAULT NULL,
  `ReminderDateTime` timestamp NULL DEFAULT NULL,
  `ReminderStatus` enum('Pending','Completed','Dismissed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporteyanalisis`
--

CREATE TABLE `reporteyanalisis` (
  `ReportID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `TipoReporte` varchar(255) DEFAULT NULL,
  `ReportData` text DEFAULT NULL,
  `ReportDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resumengastos`
--

CREATE TABLE `resumengastos` (
  `SummaryID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `TotalBalance` decimal(10,2) DEFAULT NULL,
  `TotalIncome` decimal(10,2) DEFAULT NULL,
  `TotalExpenses` decimal(10,2) DEFAULT NULL,
  `SummaryDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `TransactionID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `TransactionDate` timestamp NULL DEFAULT NULL,
  `TransactionType` enum('Income','Expense') DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `PaymentMethod` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`TransactionID`, `UserID`, `TransactionDate`, `TransactionType`, `Amount`, `Description`, `Category`, `PaymentMethod`) VALUES
(1, 15, '2023-11-21 05:23:02', 'Income', 500.00, 'Nómina ', 'Sin categoría', 'Son método'),
(2, 15, '2023-11-20 23:26:22', 'Income', 500.00, 'Nómina 2', 'Sin categoría', 'Son método'),
(4, 15, '2023-11-20 23:30:32', 'Income', 500.00, 'Regalo de navidad', 'Sin categoría', 'Son método'),
(11, 1, '2023-11-24 02:52:56', 'Expense', 5000.00, 'Renta', 'Sin categoría', 'Son método'),
(12, 1, '2023-11-24 03:23:58', 'Income', 6000.00, 'Nómina ', 'Sin categoría', 'Son método'),
(13, 1, '2023-11-24 03:26:31', 'Income', 50.00, 'Mesada', 'Sin categoría', 'Son método'),
(14, 1, '2023-11-24 03:26:43', 'Income', 50.00, 'Mesada', 'Sin categoría', 'Son método');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `RegistrationDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UserID`, `Username`, `Email`, `Password`, `RegistrationDate`) VALUES
(1, 'adrian', 'l18141029@queretaro.tecnm.mx', '12345', NULL),
(2, 'paola', 'l18141044@queretaro.tecnm.mx', '12345', NULL),
(4, 'pablo', 'l18141045@queretaro.tecnm.mx', '12345', NULL),
(15, 'hector', 'l18141046@queretaro.tecnm.mx', '12345', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indices de la tabla `metasfinancieras`
--
ALTER TABLE `metasfinancieras`
  ADD PRIMARY KEY (`GoalID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indices de la tabla `presupuestos`
--
ALTER TABLE `presupuestos`
  ADD PRIMARY KEY (`BudgetID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indices de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD PRIMARY KEY (`ReminderID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indices de la tabla `reporteyanalisis`
--
ALTER TABLE `reporteyanalisis`
  ADD PRIMARY KEY (`ReportID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indices de la tabla `resumengastos`
--
ALTER TABLE `resumengastos`
  ADD PRIMARY KEY (`SummaryID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metasfinancieras`
--
ALTER TABLE `metasfinancieras`
  MODIFY `GoalID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `presupuestos`
--
ALTER TABLE `presupuestos`
  MODIFY `BudgetID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  MODIFY `ReminderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporteyanalisis`
--
ALTER TABLE `reporteyanalisis`
  MODIFY `ReportID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resumengastos`
--
ALTER TABLE `resumengastos`
  MODIFY `SummaryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `metasfinancieras`
--
ALTER TABLE `metasfinancieras`
  ADD CONSTRAINT `metasfinancieras_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`);

--
-- Filtros para la tabla `presupuestos`
--
ALTER TABLE `presupuestos`
  ADD CONSTRAINT `presupuestos_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`);

--
-- Filtros para la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD CONSTRAINT `recordatorios_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`);

--
-- Filtros para la tabla `reporteyanalisis`
--
ALTER TABLE `reporteyanalisis`
  ADD CONSTRAINT `reporteyanalisis_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`);

--
-- Filtros para la tabla `resumengastos`
--
ALTER TABLE `resumengastos`
  ADD CONSTRAINT `resumengastos_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`),
  ADD CONSTRAINT `resumengastos_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`);

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
