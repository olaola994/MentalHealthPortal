import React, { useState, useEffect } from "react";
import "../../styles/UserPanel/UserAppointmentsComponent.css";
import { getUserAppointments, cancelAppointment } from "../../services/api";
import Button from "../Button";

const UserAppointmentsComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadLanguageData = async () => {
      const language = localStorage.getItem("language") || "pl";
      try {
        const data = await import(`../../content/userInfo-${language}.json`);
        setUserData(data);
      } catch (error) {
        console.error("Error loading language file:", error);
      }
    };
    loadLanguageData();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getUserAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (!userData) {
    return <></>;
  }

  if (loading) {
    return <div>Ładowanie wizyt...</div>;
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pl-PL", options);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const filteredAppointments = appointments.filter(
    (appointment) =>
      selectedStatus === "" || appointment.status === selectedStatus
  );
  const handleCancelAppointment = async (appointmentId) => {
    console.log("Usuwanie wizyty o ID:", appointmentId);
    if (!window.confirm(`${userData.cancelConfirmation}`)) {
      return;
    }
    try {
      await cancelAppointment(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );
    } catch (err) {
      console.log("Nie udało się anulować wizyty.");
    }
  };

  return (
    <div className="user-appointments-component-container">
      <div className="user-appointment-component-header">
        {userData.texts.header}
      </div>
      <div className="user-appointment-component-booking-button">
        <Button
          text={userData.texts.bookingButton}
          to="/umow-wizyte"
          backgroundColor="#3c74ef"
          borderColor="#3c74ef"
          textColor="white"
        />
      </div>
      <div className="filter-container">
        <label htmlFor="status-filter">
          {userData.texts.statusFilterLabel}:
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">{userData.statusFilterOptions.all}</option>
          <option value="Zaplanowana">
            {userData.statusFilterOptions.planned}
          </option>
          <option value="Zakończona">
            {userData.statusFilterOptions.completed}
          </option>
        </select>
      </div>

      {filteredAppointments.length > 0 ? (
        <ul className="appointments-list">
          {filteredAppointments.map((appointment, index) => (
            <li key={index} className="appointment-item">

              <div className="appointment-date">
                {userData.appointmentDateLabel}: {formatDate(appointment.data)}
              </div>
              <div className="appointment-specialist-name">
                {userData.specialistNameLabel}: {appointment.imie}
              </div>
              <div className="appointment-specialist-surname">
                {userData.specialistSurnameLabel}: {appointment.nazwisko}
              </div>
              
              <div className="appointment-specialist-specialization">
                {userData.specialistSpecializationLabel}:{" "}
                {localStorage.getItem("language") === "en"
                  ? appointment.specjalizacjaEN
                  : appointment.specjalizacja}
              </div>
              <div className="appointment-duration">
                {userData.appointmentDurationLabel}: {appointment.czas_trwania}{" "}
                {userData.minutes}
              </div>

              <div className="appointment-status">
                {userData.appointmentStatusLabel}:{" "}
                {(() => {
                  const language = localStorage.getItem("language") || "pl";
                  const statusTranslations = {
                    Zaplanowana: { pl: "Zaplanowana", en: "Planned" },
                    Zakończona: { pl: "Zakończona", en: "Completed" },
                  };

                  return (
                    statusTranslations[appointment.status]?.[language] ||
                    appointment.status
                  );
                })()}
              </div>

              {appointment.status !== "Zakończona" && (
                <button
                  className="cancel-booking-button"
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  {userData.cancelButton}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-appointments">{userData.noAppointmentsMessage}</div>
      )}
    </div>
  );
};

export default UserAppointmentsComponent;
