// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    telephone: '',
    password: '',
    nom: '',
    prenom: '',
    role: 'DIPLOME', // Valeur par défaut
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Enregistrement en cours...');
    try {
      const response = await fetch('http://localhost:8083/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Essayer de lire le message d'erreur du backend
        const errorText = await response.text();
        throw new Error(errorText || 'Une erreur est survenue.');
      }

      setMessage('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
      setTimeout(() => navigate('/'), 2000); // Redirige vers l'accueil après 2s

    } catch (error) {
      setMessage(`Erreur d'inscription : ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Créer un Compte</h2>
        <div className="form-grid">
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" required />
          <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
          <input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
          <input name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="DIPLOME">Je suis un Diplômé</option>
            <option value="RECRUTEUR">Je suis un Recruteur</option>
          </select>
          <button type="submit">S'inscrire</button>
        </div>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;