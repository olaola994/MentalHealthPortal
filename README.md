CREATE DATABASE MentalHealthPortal;

USE MentalHealthPortal;

CREATE TABLE Address (
    id integer  NOT NULL,
    city varchar(100)  NOT NULL,
    postal_code varchar(100)  NOT NULL,
    street varchar(100)  NOT NULL,
    street_number varchar(10)  NOT NULL,
    apartament_number varchar(10)  NOT NULL,
    country varchar(50)  NOT NULL,
    CONSTRAINT Address_pk PRIMARY KEY (id)
);

-- Table: Admin
CREATE TABLE Admin (
    user_id integer  NOT NULL,
    level varchar(50)  NOT NULL,
    CONSTRAINT Admin_pk PRIMARY KEY (user_id)
);

-- Table: Appointment
CREATE TABLE Appointment (
    id integer  NOT NULL,
    patient_user_id integer  NOT NULL,
    specialist_user_id integer  NOT NULL,
    Status_id integer  NOT NULL,
    duration integer  NOT NULL,
    date date  NOT NULL,
    CONSTRAINT Appointment_pk PRIMARY KEY (id)
);

-- Table: Patient
CREATE TABLE Patient (
    user_id integer  NOT NULL,
    pesel varchar(11)  NOT NULL,
    date_of_birth date  NOT NULL,
    CONSTRAINT Patient_pk PRIMARY KEY (user_id)
);

-- Table: Recommendations
CREATE TABLE Recommendations (
    id integer  NOT NULL,
    appointment_id integer  NOT NULL,
    description varchar(255)  NOT NULL,
    created_date date  NOT NULL,
    CONSTRAINT Recommendations_pk PRIMARY KEY (id)
);

-- Table: Specialist
CREATE TABLE Specialist (
    user_id integer  NOT NULL,
    specialization varchar(255)  NOT NULL,
    license_number varchar(50)  NOT NULL,
    CONSTRAINT Specialist_pk PRIMARY KEY (user_id)
);

-- Table: Status
CREATE TABLE Status (
    id integer  NOT NULL,
    name varchar(255)  NOT NULL,
    CONSTRAINT Status_pk PRIMARY KEY (id)
);

-- Table: Timetable
CREATE TABLE Timetable (
    id integer  NOT NULL,
    specialist_user_id integer  NOT NULL,
    week_day varchar(20)  NOT NULL,
    time_from timestamp  NOT NULL,
    time_to timestamp  NOT NULL,
    CONSTRAINT Timetable_pk PRIMARY KEY (id)
);

-- Table: User
CREATE TABLE User (
    id integer  NOT NULL,
    address_id integer  NOT NULL,
    name varchar(100)  NOT NULL,
    surname varchar(100)  NOT NULL,
    email varchar(100)  NOT NULL,
    password varchar(255)  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Admin_User (table: Admin)
ALTER TABLE Admin ADD CONSTRAINT Admin_User FOREIGN KEY Admin_User (user_id)
    REFERENCES User (id);

-- Reference: Appointment_Patient (table: Appointment)
ALTER TABLE Appointment ADD CONSTRAINT Appointment_Patient FOREIGN KEY Appointment_Patient (patient_user_id)
    REFERENCES Patient (user_id);

-- Reference: Appointment_Specialist (table: Appointment)
ALTER TABLE Appointment ADD CONSTRAINT Appointment_Specialist FOREIGN KEY Appointment_Specialist (specialist_user_id)
    REFERENCES Specialist (user_id);

-- Reference: Appointment_Status (table: Appointment)
ALTER TABLE Appointment ADD CONSTRAINT Appointment_Status FOREIGN KEY Appointment_Status (Status_id)
    REFERENCES Status (id);

-- Reference: Patient_User (table: Patient)
ALTER TABLE Patient ADD CONSTRAINT Patient_User FOREIGN KEY Patient_User (user_id)
    REFERENCES User (id);

-- Reference: Recommendations_Appointment (table: Recommendations)
ALTER TABLE Recommendations ADD CONSTRAINT Recommendations_Appointment FOREIGN KEY Recommendations_Appointment (appointment_id)
    REFERENCES Appointment (id);

-- Reference: Specialist_User (table: Specialist)
ALTER TABLE Specialist ADD CONSTRAINT Specialist_User FOREIGN KEY Specialist_User (user_id)
    REFERENCES User (id);

-- Reference: Timetable_Specialist (table: Timetable)
ALTER TABLE Timetable ADD CONSTRAINT Timetable_Specialist FOREIGN KEY Timetable_Specialist (specialist_user_id)
    REFERENCES Specialist (user_id);

-- Reference: User_Address (table: User)
ALTER TABLE User ADD CONSTRAINT User_Address FOREIGN KEY User_Address (address_id)
    REFERENCES Address (id);

-- End of file.

-- Insert into Address
INSERT INTO Address (id, city, postal_code, street, street_number, apartament_number, country)
VALUES
(1, 'Warsaw', '00-001', 'Main Street', '10', '2A', 'Poland'),
(2, 'Krakow', '30-001', 'Market Square', '5', '1B', 'Poland'),
(3, 'Gdansk', '80-001', 'Seaside Avenue', '20', '3C', 'Poland');

-- Insert into User
INSERT INTO User (id, address_id, name, surname, email, password)
VALUES
-- Users for Admin
(1, 1, 'Admin', 'One', 'admin1@example.com', 'adminpass1'),
(2, 2, 'Admin', 'Two', 'admin2@example.com', 'adminpass2'),
(3, 3, 'Admin', 'Three', 'admin3@example.com', 'adminpass3'),

-- Users for Patients
(4, 1, 'Patient', 'One', 'patient1@example.com', 'patientpass1'),
(5, 2, 'Patient', 'Two', 'patient2@example.com', 'patientpass2'),
(6, 3, 'Patient', 'Three', 'patient3@example.com', 'patientpass3'),
(7, 1, 'Patient', 'Four', 'patient4@example.com', 'patientpass4'),
(8, 2, 'Patient', 'Five', 'patient5@example.com', 'patientpass5'),
(9, 3, 'Patient', 'Six', 'patient6@example.com', 'patientpass6'),
(10, 1, 'Patient', 'Seven', 'patient7@example.com', 'patientpass7'),
(11, 2, 'Patient', 'Eight', 'patient8@example.com', 'patientpass8'),
(12, 3, 'Patient', 'Nine', 'patient9@example.com', 'patientpass9'),
(13, 1, 'Patient', 'Ten', 'patient10@example.com', 'patientpass10'),

-- Users for Specialists
(14, 2, 'Specialist', 'One', 'specialist1@example.com', 'specialistpass1'),
(15, 3, 'Specialist', 'Two', 'specialist2@example.com', 'specialistpass2'),
(16, 1, 'Specialist', 'Three', 'specialist3@example.com', 'specialistpass3'),
(17, 2, 'Specialist', 'Four', 'specialist4@example.com', 'specialistpass4'),
(18, 3, 'Specialist', 'Five', 'specialist5@example.com', 'specialistpass5'),
(19, 1, 'Specialist', 'Six', 'specialist6@example.com', 'specialistpass6'),
(20, 2, 'Specialist', 'Seven', 'specialist7@example.com', 'specialistpass7'),
(21, 3, 'Specialist', 'Eight', 'specialist8@example.com', 'specialistpass8'),
(22, 1, 'Specialist', 'Nine', 'specialist9@example.com', 'specialistpass9'),
(23, 2, 'Specialist', 'Ten', 'specialist10@example.com', 'specialistpass10');

-- Insert into Admin
INSERT INTO Admin (user_id, level)
VALUES
(1, 'Super Admin'),
(2, 'Manager'),
(3, 'Support');

-- Insert into Patient
INSERT INTO Patient (user_id, pesel, date_of_birth)
VALUES
(4, '90010112345', '1990-01-01'),
(5, '85020254321', '1985-02-02'),
(6, '95030367890', '1995-03-03'),
(7, '92040456789', '1992-04-04'),
(8, '88050534567', '1988-05-05'),
(9, '81060612345', '1981-06-06'),
(10, '97070798765', '1997-07-07'),
(11, '86080887654', '1986-08-08'),
(12, '89090976543', '1989-09-09'),
(13, '91101065432', '1991-10-10');

-- Insert into Specialist
INSERT INTO Specialist (user_id, specialization, license_number)
VALUES
(14, 'Psychologist', 'PSY123456'),
(15, 'Psychiatrist', 'PSY789012'),
(16, 'Therapist', 'THR345678'),
(17, 'Psychologist', 'PSY987654'),
(18, 'Therapist', 'THR654321'),
(19, 'Psychiatrist', 'PSY321987'),
(20, 'Psychologist', 'PSY123789'),
(21, 'Therapist', 'THR456123'),
(22, 'Psychiatrist', 'PSY789321'),
(23, 'Psychologist', 'PSY654987');

-- Insert into Status
INSERT INTO Status (id, name)
VALUES
(1, 'Scheduled'),
(2, 'Completed'),
(3, 'Cancelled');

-- Insert into Appointment
INSERT INTO Appointment (id, patient_user_id, specialist_user_id, Status_id, duration, date)
VALUES
(2, 5, 15, 2, 45, '2024-12-21'),
(3, 6, 16, 1, 30, '2024-12-22'),
(4, 7, 17, 2, 50, '2024-12-23'),
(5, 8, 18, 1, 40, '2024-12-24'),
(6, 9, 19, 3, 55, '2024-12-25'),
(7, 10, 20, 1, 60, '2024-12-26'),
(8, 11, 21, 3, 35, '2024-12-27'),
(9, 12, 22, 2, 45, '2024-12-28'),
(10, 13, 23, 1, 50, '2024-12-29');