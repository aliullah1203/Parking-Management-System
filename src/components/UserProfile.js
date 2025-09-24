import React, { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    license: "",
    nid: "",
    picture: null,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfile({ ...profile, picture: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  return (
    <div className="user-profile-container container-fluid py-4">
      <div className="row gx-4">
        {/* Left Side: Profile Form */}
        <div className="col-lg-6">
          <div className="card shadow profile-form-card">
            <div className="card-header bg-primary text-white">
              <h4>User Profile</h4>
              <small>Manage your account details</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {[
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Email Address", name: "email", type: "email" },
                  { label: "Contact Number", name: "contact", type: "tel" },
                  { label: "License Number", name: "license", type: "text" },
                  { label: "NID Number", name: "nid", type: "text" },
                ].map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="mb-4">
                  <label className="form-label">Upload Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    name="picture"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Profile Preview */}
        <div className="col-lg-6">
          <div className="card shadow profile-preview-card">
            <div className="card-header bg-primary text-white">
              <h4>Profile Preview</h4>
              <small>Check how your profile looks</small>
            </div>
            <div className="card-body text-center">
              {profile.picture ? (
                <img
                  src={profile.picture}
                  alt="Profile"
                  className="profile-image mb-3"
                />
              ) : (
                <div className="profile-placeholder mb-3">
                  <i className="fas fa-user fa-3x"></i>
                </div>
              )}

              <div className="profile-info">
                <h5 className="fw-bold mb-2">{profile.name || "Full Name"}</h5>

                <div className="profile-detail">
                  <span className="label">📧 Email:</span>
                  <span className="value">
                    {profile.email || "Email Address"}
                  </span>
                </div>

                <div className="profile-detail">
                  <span className="label">📱 Contact:</span>
                  <span className="value">
                    {profile.contact || "Contact Number"}
                  </span>
                </div>

                <div className="profile-detail">
                  <span className="label">🚗 License:</span>
                  <span className="value">{profile.license || "-"}</span>
                </div>

                <div className="profile-detail">
                  <span className="label">🆔 NID:</span>
                  <span className="value">{profile.nid || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
