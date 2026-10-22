-- MySQL Schema & Seeds for Laragon (REZA Full-Stack Portfolio)
-- Compatible with MySQL 8.x / MariaDB / HeidiSQL / Laragon

CREATE DATABASE IF NOT EXISTS `reza_portfolio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `reza_portfolio`;

-- 1. Drop existing tables if re-initializing
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `project_technologies`;
DROP TABLE IF EXISTS `contact_messages`;
DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `technologies`;
SET FOREIGN_KEY_CHECKS = 1;

-- 2. Create Tables
CREATE TABLE `projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(180) NOT NULL UNIQUE,
    `category` VARCHAR(100) NOT NULL,
    `summary` VARCHAR(300) NOT NULL,
    `description` TEXT NOT NULL,
    `problem` TEXT NOT NULL,
    `solution` TEXT NOT NULL,
    `cover_image` VARCHAR(500) NOT NULL,
    `live_url` VARCHAR(500) NULL,
    `repo_url` VARCHAR(500) NULL,
    `status` ENUM('in_progress', 'completed', 'archived') NOT NULL DEFAULT 'completed',
    `is_featured` BOOLEAN NOT NULL DEFAULT 1,
    `sort_order` INT NOT NULL DEFAULT 0,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `technologies` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `category` ENUM('language', 'frontend', 'backend', 'database', 'devops', 'testing', 'security', 'tool', 'other') NOT NULL,
    `icon_url` VARCHAR(500) NULL,
    `documentation_url` VARCHAR(500) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `project_technologies` (
    `project_id` INT NOT NULL,
    `technology_id` INT NOT NULL,
    PRIMARY KEY (`project_id`, `technology_id`),
    CONSTRAINT `fk_proj_tech_proj` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_proj_tech_tech` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NULL,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'read', 'replied', 'spam') NOT NULL DEFAULT 'new',
    `ip_hash` VARCHAR(128) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `replied_at` DATETIME NULL,
    CONSTRAINT `fk_contact_proj` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NULL,
    `title` VARCHAR(180) NOT NULL,
    `slug` VARCHAR(200) NOT NULL UNIQUE,
    `excerpt` VARCHAR(400) NOT NULL,
    `content` TEXT NOT NULL,
    `cover_image` VARCHAR(500) NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `published_at` DATETIME NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_post_proj` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Seed Data
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `summary`, `description`, `problem`, `solution`, `cover_image`, `live_url`, `repo_url`, `status`, `is_featured`, `sort_order`, `start_date`, `end_date`) VALUES
(1, 'AUREO STUDIO', 'aureo-studio', 'FULL-STACK WEB APPLICATION', 
 'Architectural workspace and modular project management platform built for distributed design and engineering teams.',
 'Aureo Studio is a full-stack collaboration platform designed to bridge technical engineering diagrams with design asset pipelines. Engineered with an event-driven architecture, optimistic UI updates, and role-based workspace permissions.',
 'Traditional creative engineering workflows suffer from disjointed asset tracking, slow render preview sync, and fragmented collaboration between design teams and developers.',
 'Built a centralized web platform combining responsive canvas tooling, WebSockets-based real-time cursor sync, and robust Postgres relational data schemas with caching.',
 '/images/project-aureo.jpg', 'https://aureo-studio.demo.app', 'https://github.com/mhmdrzllabdn/aureo-studio', 'completed', 1, 1, '2024-01-15', '2024-06-30'),

(2, 'VANTA', 'vanta-engine', 'BACKEND & HIGH-THROUGHPUT API',
 'High-performance telemetry ingestion engine and developer API gateway with rate-limiting and structured logging.',
 'Vanta is a high-throughput backend service engineered to ingest, validate, and aggregate high-volume metric payloads from IoT devices and web application clients with predictable low latencies.',
 'Sudden bursts of metric traffic caused database connection exhaustion, latency spikes, and silent payload drop in legacy logging setups.',
 'Engineered an asynchronous queue-based ingestion pipeline with token-bucket rate limiting, structured schema validation via Zod, and resilient connection pooling.',
 '/images/project-vanta.jpg', 'https://vanta-engine.demo.app', 'https://github.com/mhmdrzllabdn/vanta-engine', 'completed', 1, 2, '2023-08-01', '2024-02-15'),

(3, 'WILDHORN', 'wildhorn-runner', 'DEVELOPER TOOLS & AUTOMATION',
 'Distributed build runner and automated deployment pipeline dashboard for micro-frontends.',
 'Wildhorn is a lightweight developer orchestration tool that monitors multi-package repositories, automatically resolves dependency build order, and triggers parallel containerized test runners.',
 'Monorepo builds often run redundant tasks across unchanged packages, ballooning developer feedback cycles to over 25 minutes per commit.',
 'Created a content-hash caching pipeline and visualization web dashboard that only builds affected dependency graphs and parallelizes isolated task execution.',
 '/images/project-wildhorn.svg', 'https://wildhorn.demo.app', 'https://github.com/mhmdrzllabdn/wildhorn-runner', 'completed', 1, 3, '2024-03-01', '2024-08-20'),

(4, 'NEXUS FINANCE', 'nexus-finance', 'FINTECH & REAL-TIME LEDGER',
 'Double-entry transactional ledger engine and real-time portfolio analytics dashboard.',
 'Nexus Finance is a mission-critical web application that demonstrates rigorous financial engineering principles: strictly balanced double-entry accounting records, idempotent API transactions, and sub-second market data visualization.',
 'Financial applications risk race conditions and ledger discrepancies when processing concurrent payments without strict serializability.',
 'Implemented an ACID-compliant double-entry ledger database schema with PostgreSQL row-level locks, idempotent request tokens, and a clean responsive client interface.',
 '/images/project-nexus.svg', 'https://nexus-finance.demo.app', 'https://github.com/mhmdrzllabdn/nexus-finance', 'completed', 1, 4, '2023-01-10', '2023-11-28');

-- Seed Technologies (40 items matching specification)
INSERT INTO `technologies` (`id`, `name`, `category`, `description`, `documentation_url`) VALUES
(1, 'TypeScript', 'language', 'Pengembangan aplikasi web dengan type safety', 'https://www.typescriptlang.org'),
(2, 'JavaScript', 'language', 'Interaktivitas web dan pengembangan server', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'),
(3, 'Python', 'language', 'Backend, automation, dan scripting', 'https://www.python.org'),
(4, 'Go', 'language', 'Backend service dan aplikasi berperforma tinggi', 'https://go.dev'),
(5, 'SQL', 'language', 'Mengelola dan mengambil data database', 'https://www.postgresql.org/docs/'),
(6, 'React', 'frontend', 'Membangun antarmuka pengguna', 'https://react.dev'),
(7, 'Next.js', 'frontend', 'Framework React untuk aplikasi web', 'https://nextjs.org'),
(8, 'Tailwind CSS', 'frontend', 'Styling antarmuka secara konsisten', 'https://tailwindcss.com'),
(9, 'HTML5', 'frontend', 'Struktur halaman web', 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'),
(10, 'CSS3', 'frontend', 'Desain dan tata letak web', 'https://developer.mozilla.org/en-US/docs/Web/CSS'),
(11, 'Node.js', 'backend', 'Menjalankan JavaScript di server', 'https://nodejs.org'),
(12, 'NestJS', 'backend', 'Backend terstruktur menggunakan TypeScript', 'https://nestjs.com'),
(13, 'Express.js', 'backend', 'Membangun REST API', 'https://expressjs.com'),
(14, 'FastAPI', 'backend', 'Membangun API menggunakan Python', 'https://fastapi.tiangolo.com'),
(15, 'REST API', 'backend', 'Komunikasi antara frontend dan backend', 'https://restfulapi.net'),
(16, 'PostgreSQL', 'database', 'Database relasional utama', 'https://www.postgresql.org'),
(17, 'MySQL', 'database', 'Database relasional untuk aplikasi web', 'https://www.mysql.com'),
(18, 'Redis', 'database', 'Cache, session, dan data sementara', 'https://redis.io'),
(19, 'MongoDB', 'database', 'Database dokumen NoSQL', 'https://www.mongodb.com'),
(20, 'Prisma ORM', 'database', 'Mengakses database melalui TypeScript', 'https://www.prisma.io'),
(21, 'Docker', 'devops', 'Containerisasi aplikasi', 'https://www.docker.com'),
(22, 'GitHub Actions', 'devops', 'Otomatisasi testing dan deployment', 'https://github.com/features/actions'),
(23, 'Linux', 'devops', 'Lingkungan server dan administrasi sistem', 'https://www.kernel.org'),
(24, 'Nginx', 'devops', 'Reverse proxy dan web server', 'https://nginx.org'),
(25, 'AWS', 'devops', 'Infrastruktur dan layanan cloud', 'https://aws.amazon.com'),
(26, 'Vitest', 'testing', 'Unit testing', 'https://vitest.dev'),
(27, 'Jest', 'testing', 'Testing JavaScript dan TypeScript', 'https://jestjs.io'),
(28, 'Playwright', 'testing', 'Pengujian aplikasi dari sisi browser', 'https://playwright.dev'),
(29, 'Postman', 'testing', 'Pengujian dan debugging API', 'https://www.postman.com'),
(30, 'k6', 'testing', 'Pengujian beban dan performa', 'https://k6.io'),
(31, 'OAuth 2.0', 'security', 'Kerangka otorisasi', 'https://oauth.net/2/'),
(32, 'OpenID Connect', 'security', 'Autentikasi berbasis identitas', 'https://openid.net/connect/'),
(33, 'JWT', 'security', 'Format token untuk pertukaran klaim', 'https://jwt.io'),
(34, 'OWASP Top 10', 'security', 'Acuan risiko keamanan aplikasi web', 'https://owasp.org'),
(35, 'Argon2id', 'security', 'Hashing password', 'https://en.wikipedia.org/wiki/Argon2'),
(36, 'Git', 'tool', 'Version control', 'https://git-scm.com'),
(37, 'GitHub', 'tool', 'Kolaborasi dan pengelolaan kode', 'https://github.com'),
(38, 'VS Code', 'tool', 'Code editor', 'https://code.visualstudio.com'),
(39, 'pnpm', 'tool', 'Package manager JavaScript/TypeScript', 'https://pnpm.io'),
(40, 'Sentry', 'tool', 'Pemantauan error aplikasi', 'https://sentry.io');

-- Seed Project Technologies
INSERT INTO `project_technologies` (`project_id`, `technology_id`) VALUES
(1, 1), (1, 7), (1, 8), (1, 11), (1, 16), (1, 18), (1, 20), (1, 21),
(2, 1), (2, 11), (2, 13), (2, 16), (2, 18), (2, 21), (2, 27),
(3, 1), (3, 7), (3, 8), (3, 11), (3, 21), (3, 22),
(4, 1), (4, 6), (4, 7), (4, 8), (4, 16), (4, 20), (4, 27);
