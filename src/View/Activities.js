import React, { Component } from "react";
import style from "./Activities.module.css";
import ActivitiesL from "./ActivitiesL";
import ActivitiesR from "./ActivitiesR";

const URL = "http://localhost:3001/time-line";

export class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previus: null,
      active: null,
      selectedDate: null,
    };
  }
  componentDidMount() {}

  selectTimeLine = (active, date) => {
    if (active) {
      this.setState({ active: active, selectedDate: date }, () => {
        // console.log(this.state.active);
        // console.log(this.state.selectedDate);
      });
    } else {
      this.setState({ active: null, selectedDate: null }, () => {
        // console.log(this.state.active);
        // console.log(this.state.selectedDate);
      });
    }
  };

  createActiviti = (activitiNme, color) => {
    // console.log(activitiNme);
    if (this.state.active) {
      // console.log(this.state.selectedDate);
      const data = {
        email: "batman@mejl.com",
        activities: {
          name: activitiNme,
          color: color,
          ...this.state.selectedDate,
        },
      };
      // console.log(data);

      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Success:", data);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  };

  render() {
    return (
      <div className={style.con1}>
        <ActivitiesL selectTimeLine={this.selectTimeLine}></ActivitiesL>
        <ActivitiesR createActiviti={this.createActiviti}></ActivitiesR>
      </div>
    );
  }
}

export default Activities;

// const newTimeLine = new TimeLine({
//   email: req.body.email,
//   activities: [
//     {
//       name: req.body.activities.name,
//       color: req.body.activities.color,
//       year: req.body.activities.year,
//       month: req.body.activities.month,
//       day: req.body.activities.day,
//       time: req.body.activities.time,
//       // group: req.body.group,
//     },
//   ],
// });
