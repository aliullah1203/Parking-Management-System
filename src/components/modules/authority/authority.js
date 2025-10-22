import React from "react";
import ali from "../../assets/images/ali.jpg";
import xarin from "../../assets/images/xarin.jpeg";
import ayesha from "../../assets/images/aye.jpeg";
import jahidul from "../../assets/images/jahidul.jpeg";
import sir from "../../assets/images/Sir.jpeg";

import "./authority.css";

function Author() {
  const items = [
    {
      name: "Ali Ullah",
      image: ali,
      description:
        "Software Engineer @ Luciety | Competitive Programmer | JavaScript | React.js | Operating Systems | MySQL | Git,Github | Golang | Backend Developer | Docker | UITS",
    },
    {
      name: "Xarin Tasneem Shatubdee",
      image: xarin,
      description:
        "Machine Learning | Python | Student at University of Information Technology & Sciences (UITS)",
    },
    {
      name: "Ayesha Siddika ",
      image: ayesha,
      description:
        "Machine Learning | Python | Student at University of Information Technology & Sciences (UITS)",
    },
    {
      name: "Md. Jahidul Islam Sagor ",
      image: jahidul,
      description:
        "B.Sc. in CSE | Problem Solver | Data Structure & Algorithms | Python | Go | Aspiring to ML & AI Enthusiast | Aspiring to Data Science | Student at University of Information Technology & Sciences (UITS)",
    },
  ];
  const Sir = [
    {
      name: "Dr. Md. Ashraful Islam",
      image: sir,
      description:
        "Professor Dean, Faculty of Science & Engineering PhD, Bangladesh University of Professionals (BUP)",
    },
  ];

  return (
    <div className="collection-container text-center">
      <h2 className="collection-title">Our Supervisor</h2>
      <div className="container-fluid px-3">
        <div className="row justify-content-center gx-3">
          {Sir.map((item, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center"
            >
              <div className="collection-box text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="collection-icon"
                />
                <div className="collection-info">
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="collection-title">The Team</h2>
      <p className="collection-subtitle">
        The people who make this system work. Everyone is a volunteer and works
        for the community just because they love it. <br />
        If you want to join the team, contact us on our Facebook page.
      </p>

      <div className="container-fluid px-3">
        <div className="row justify-content-center gx-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center"
            >
              <div className="collection-box text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="collection-icon"
                />
                <div className="collection-info">
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Author;
