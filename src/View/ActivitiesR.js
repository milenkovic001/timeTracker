import React, { Component } from "react";
import style from "./Activities.module.css";

const URL = "http://localhost:3001/activities";
export class ActivitiesR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }
  async componentDidMount() {
    let data = await fetch(URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((res) => console.log(res));

    this.setState({ activities: data });
    console.log(data);
  }

  render() {
    return (
      <div className={style.right}>
        {this.state.activities.map((el, index) => {
          return (
            <div
              key={index}
              className={style.activiti}
              style={{ backgroundColor: el.color }}
              onClick={() => this.props.createActiviti(el.name, el.color)}
            >
              {el.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ActivitiesR;
