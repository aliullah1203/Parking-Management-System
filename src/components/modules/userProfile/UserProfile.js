import React, { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    license: "",
    nid: "",
    picture: null,
  });

  const [loading, setLoading] = useState(true);

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (token && token.startsWith('"')) token = token.replace(/^"|"$/g, "");

        const response = await fetch("http://localhost:8080/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({
            id: data.id || "",
            name: data.name || "",
            email: data.email || "",
            contact: data.phone || "",
            license: data.license || "",
            nid: data.nid || "",
            picture: data.picture || null,
          });
        } else {
          console.error("Failed to fetch profile:", response.statusText);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, picture: reader.result });
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem("accessToken");
      if (token && token.startsWith('"')) token = token.replace(/^"|"$/g, "");

      const updateData = {
        license: profile.license,
        nid: profile.nid,
        picture: profile.picture,
      };

      const response = await fetch("http://localhost:8080/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (response.ok) {
        alert("✅ " + data.message);
      } else {
        alert("❌ Failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <p>Loading profile...</p>
      </div>
    );

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
                  {
                    label: "Full Name",
                    name: "name",
                    type: "text",
                    readOnly: true,
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    readOnly: true,
                  },
                  {
                    label: "Contact Number",
                    name: "contact",
                    type: "tel",
                    readOnly: true,
                  },
                  {
                    label: "License Number",
                    name: "license",
                    type: "text",
                    readOnly: false,
                  },
                  {
                    label: "NID Number",
                    name: "nid",
                    type: "text",
                    readOnly: false,
                  },
                ].map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleChange}
                      readOnly={field.readOnly}
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
                  <span className="value">{profile.email || ""}</span>
                </div>

                <div className="profile-detail">
                  <span className="label">📱 Contact:</span>
                  <span className="value">{profile.contact || ""}</span>
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
