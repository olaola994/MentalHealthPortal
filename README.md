
-- Utworzenie bazy danych
CREATE DATABASE MentalHealthPortal;
-- CREATE SCHEMA MentalHealthPortal;
 
USE MentalHealthPortal;

-- Tabela: Address
CREATE TABLE Address (
    id INT NOT NULL AUTO_INCREMENT,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    street_number VARCHAR(10) NOT NULL,
    apartament_number VARCHAR(10),
    country VARCHAR(50) NOT NULL,
    CONSTRAINT Address_pk PRIMARY KEY (id)
);

-- Tabela: User
CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT,
    address_id INT,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    must_change_password BOOLEAN DEFAULT FALSE,
    CONSTRAINT User_pk PRIMARY KEY (id),
    CONSTRAINT User_Address FOREIGN KEY (address_id) REFERENCES Address (id)
);

-- Tabela: Admin
CREATE TABLE Admin (
    user_id INT NOT NULL,
    level VARCHAR(50) NOT NULL,
    CONSTRAINT Admin_pk PRIMARY KEY (user_id),
    CONSTRAINT Admin_User FOREIGN KEY (user_id) REFERENCES User (id)
);

-- Tabela: Patient
CREATE TABLE Patient (
    user_id INT NOT NULL,
    pesel VARCHAR(11) NOT NULL,
    date_of_birth DATE NOT NULL,
    CONSTRAINT Patient_pk PRIMARY KEY (user_id),
    CONSTRAINT Patient_User FOREIGN KEY (user_id) REFERENCES User (id)
);

-- Tabela: Specialist
CREATE TABLE Specialist (
    user_id INT NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    specializationEN VARCHAR(255),
    license_number VARCHAR(50) NOT NULL,
    photo_path VARCHAR(255),
    description VARCHAR(255),
    descriptionEN VARCHAR(255),
    CONSTRAINT Specialist_pk PRIMARY KEY (user_id),
    CONSTRAINT Specialist_User FOREIGN KEY (user_id) REFERENCES User (id)
);

-- Tabela: Status
CREATE TABLE Status (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT Status_pk PRIMARY KEY (id)
);

-- Tabela: Appointment
CREATE TABLE Appointment (
    id INT NOT NULL AUTO_INCREMENT,
    patient_user_id INT NOT NULL,
    specialist_user_id INT NOT NULL,
    Status_id INT NOT NULL,
    duration INT NOT NULL,
    date_time DATETIME NOT NULL,
    CONSTRAINT Appointment_pk PRIMARY KEY (id),
    CONSTRAINT Appointment_Patient FOREIGN KEY (patient_user_id) REFERENCES Patient (user_id),
    CONSTRAINT Appointment_Specialist FOREIGN KEY (specialist_user_id) REFERENCES Specialist (user_id),
    CONSTRAINT Appointment_Status FOREIGN KEY (Status_id) REFERENCES Status (id)
);

-- Tabela: Timetable
CREATE TABLE Timetable (
    id INT NOT NULL AUTO_INCREMENT,
    specialist_user_id INT NOT NULL,
    week_day VARCHAR(20) NOT NULL,
    time_from TIME NOT NULL,
    time_to TIME NOT NULL,
    CONSTRAINT Timetable_pk PRIMARY KEY (id),
    CONSTRAINT Timetable_Specialist FOREIGN KEY (specialist_user_id) REFERENCES Specialist (user_id)
);

-- Dodanie danych do tabeli Address
INSERT INTO Address (city, postal_code, street, street_number, apartament_number, country)
VALUES
('Warsaw', '00-001', 'Main Street', '10', '2A', 'Poland'),
('Krakow', '30-001', 'Market Square', '5', '1B', 'Poland'),
('Gdansk', '80-001', 'Seaside Avenue', '20', '3C', 'Poland');

-- Dodanie danych do tabeli User
INSERT INTO User (address_id, name, surname, email, password)
VALUES
-- Admins
(1, 'Admin', 'One', 'admin1@example.com', 'adminpass1'),
(2, 'Admin', 'Two', 'admin2@example.com', 'adminpass2'),
(3, 'Admin', 'Three', 'admin3@example.com', 'adminpass3'),
-- Patients
(1, 'Patient', 'One', 'patient1@example.com', 'patientpass1'),
(2, 'Patient', 'Two', 'patient2@example.com', 'patientpass2'),
(3, 'Patient', 'Three', 'patient3@example.com', 'patientpass3'),
-- Specialists
(1, 'Specialist', 'One', 'specialist1@example.com', 'specialistpass1'),
(2, 'Specialist', 'Two', 'specialist2@example.com', 'specialistpass2'),
(3, 'Specialist', 'Three', 'specialist3@example.com', 'specialistpass3'),
(1, 'Specialist', 'Four', 'specialist4@example.com', 'specialistpass4'),
(2, 'Specialist', 'Five', 'specialist5@example.com', 'specialistpass5'),
(3, 'Specialist', 'Six', 'specialist6@example.com', 'specialistpass6'),
(1, 'Specialist', 'Seven', 'specialist7@example.com', 'specialistpass7'),
(2, 'Specialist', 'Eight', 'specialist8@example.com', 'specialistpass8'),
(3, 'Specialist', 'Nine', 'specialist9@example.com', 'specialistpass9'),
(1, 'Specialist', 'Ten', 'specialist10@example.com', 'specialistpass10'),
(2, 'Specialist', 'Eleven', 'specialist11@example.com', 'specialistpass11'),
(3, 'Specialist', 'Twelve', 'specialist12@example.com', 'specialistpass12');

-- Dodanie danych do tabeli Admin
INSERT INTO Admin (user_id, level)
VALUES
(1, 'Super Admin'),
(2, 'Manager'),
(3, 'Support');

-- Dodanie danych do tabeli Patient
INSERT INTO Patient (user_id, pesel, date_of_birth)
VALUES
(4, '90010112345', '1990-01-01'),
(5, '85020254321', '1985-02-02'),
(6, '95030367890', '1995-03-03');

-- Dodanie danych do tabeli Specialist
INSERT INTO Specialist (user_id, specialization, specializationEN, license_number, photo_path, description, descriptionEN)
VALUES
(7, 'Psycholog', 'Psychologist', 'PSY123456', '/images/specialists/specialist1.png', 'Doświadczony psycholog specjalizujący się w terapii poznawczo-behawioralnej.', 'Experienced psychologist specializing in cognitive-behavioral therapy.'),
(8, 'Psychiatra', 'Psychiatrist', 'PSY789012', '/images/specialists/specialist2.png', 'Psychiatra dziecięcy z pasją do pomagania młodym pacjentom.', 'Child psychiatrist with a passion for helping young patients.'),
(9, 'Terapeuta', 'Therapist', 'THR345678', '/images/specialists/specialist3.png', 'Ekspert w poradnictwie dla par.', 'Expert in couples counseling.'),
(10, 'Psycholog', 'Psychologist', 'PSY654321', '/images/specialists/specialist4.png', 'Specjalista w obszarze psychologii rozwojowej dzieci.', 'Specialist in child developmental psychology.'),
(11, 'Psychiatra', 'Psychiatrist', 'PSY987654', '/images/specialists/specialist5.png', 'Doświadczony lekarz psychiatra specjalizujący się w terapii uzależnień.', 'Experienced psychiatrist specializing in addiction therapy.'),
(12, 'Terapeuta', 'Therapist', 'THR876543', '/images/specialists/specialist6.png', 'Specjalista terapii grupowej i wsparcia rodzinnego.', 'Specialist in group therapy and family support.'),
(13, 'Psycholog', 'Psychologist', 'PSY112233', '/images/specialists/specialist7.png', 'Ekspert w leczeniu depresji i zaburzeń lękowych.', 'Expert in treating depression and anxiety disorders.'),
(14, 'Psychiatra', 'Psychiatrist', 'PSY445566', '/images/specialists/specialist8.png', 'Psychiatra z wieloletnim doświadczeniem w pracy klinicznej.', 'Psychiatrist with many years of clinical experience.'),
(15, 'Terapeuta', 'Therapist', 'THR778899', '/images/specialists/specialist9.png', 'Specjalista w terapii par i konfliktów małżeńskich.', 'Specialist in couples and marital conflict therapy.'),
(16, 'Psycholog', 'Psychologist', 'PSY998877', '/images/specialists/specialist10.png', 'Psycholog zajmujący się terapią traumy i odbudową odporności psychicznej.', 'Psychologist focused on trauma therapy and rebuilding mental resilience.'),
(17, 'Psycholog', 'Psychologist', 'PSY995832','/images/specialists/specjalist11.avif','Psycholog zajmujący się imigrantami wspiera ich w procesie adaptacji w nowym środowisku.', 'Psychologist assisting immigrants in adapting to a new environment.'),
(18, 'Psychiatra', 'Psychiatrist', 'PSY231296', '/images/specialists/specjalist12.jpg', 'Psychiatra specjalizuje się w diagnozie i leczeniu zaburzeń psychicznych oraz wsparciu emocjonalnym ofiar przemocy domowej.', 'Psychiatrist specializing in diagnosing and treating mental disorders and providing emotional support to victims of domestic violence.');

-- Dodanie danych do tabeli Status
INSERT INTO Status (name)
VALUES
('Zaplanowana'),
('Zakończona');

-- Dodanie danych do tabeli Appointment
INSERT INTO Appointment (patient_user_id, specialist_user_id, Status_id, duration, date_time)
VALUES
(4, 8, 1, 60, '2025-01-15 10:00:00'),
(5, 9, 2, 45, '2025-01-16 11:00:00'),
(6, 10, 1, 30, '2025-01-17 12:00:00');

-- Dodanie danych do tabeli Timetable
INSERT INTO Timetable (specialist_user_id, week_day, time_from, time_to)
VALUES
(7, 'Monday', '09:00:00', '13:00:00'),
(8, 'Tuesday', '10:00:00', '15:00:00'),
(9, 'Wednesday', '08:00:00', '12:00:00'),
(7, 'Thursday', '11:00:00', '16:00:00'),
(8, 'Friday', '12:00:00', '18:00:00'),
(9, 'Monday', '09:30:00', '13:30:00'),
(15, 'Tuesday', '10:30:00', '15:30:00'),
(18, 'Wednesday', '08:30:00', '12:30:00'),
(13, 'Thursday', '11:30:00', '16:30:00'),
(14, 'Friday', '12:30:00', '18:30:00');
