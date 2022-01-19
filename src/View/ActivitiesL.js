import React, { Component } from "react";
import style from "./Activities.module.css";

const URL = "http://localhost:3001/time-line";

export class ActivitiesL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previus: null,
      active: null,
      timeLine: null,
      timeLineGhost: null,
      data: null,
      date: null,
      selectedDate: null,
    };
    this.myRef = React.createRef();
  }
  async componentDidMount() {
    this.drawGhost();

    let myPastDate = new Date();
    let tempDate = String(
      ("00" + myPastDate.getDate()).slice(-2) +
        "/" +
        ("00" + (myPastDate.getMonth() + 1)).slice(-2) +
        "/" +
        myPastDate.getFullYear()
    );
    this.setState({ date: tempDate });

    let data = await fetch(URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((res) => {
        console.log(res);
      });

    console.log(data);
    this.setState({ data: data }, () => {
      this.drawGhost();
    });
  }

  drawGhost = () => {
    console.log("pozvana da crta");
    let temp = [];

    let myCurrentDate = new Date();
    let myPastDate = new Date(myCurrentDate);
    myPastDate.setHours(myPastDate.getHours() - 36);

    if (myPastDate.getMinutes() >= 30) myPastDate.setMinutes(30);
    else myPastDate.setMinutes(0);

    for (let i = 0; i < 96; i++) {
      // let color =
      //   "rgb(" +
      //   ((i * i * i) % 256) +
      //   "," +
      //   (((i + i + i) * 5) % 256) +
      //   "," +
      //   (((i * i + i) * 7) % 256) +
      //   ")";
      let color = "rgb(200,200,200)";

      let date = {
        year: myPastDate.getFullYear(),
        month: ("00" + (myPastDate.getMonth() + 1)).slice(-2),
        day: ("00" + myPastDate.getDate()).slice(-2),
        time:
          ("00" + myPastDate.getHours()).slice(-2) +
          ("00" + myPastDate.getMinutes()).slice(-2),
      };

      // let
      if (this.state.data) {
        this.state.data.forEach((element) => {
          if (
            element.year == date.year &&
            element.month == date.month &&
            element.day == date.day &&
            element.time == date.time
          ) {
            // console.log("-------");
            // console.log(element);
            temp.push(
              <div
                className={style.timeLineBlock}
                key={i}
                onClick={(e) => this.clickfun(e, date)}
              >
                <div className={style.datePart}>
                  {("00" + myPastDate.getHours()).slice(-2)}:
                  {("00" + myPastDate.getMinutes()).slice(-2)}
                </div>
                <div
                  className={style.colorPart}
                  style={{ backgroundColor: element.color }}
                >
                  {element.name}
                </div>
              </div>
            );
          }
        });
      }

      temp.push(
        <div
          className={style.timeLineBlock}
          key={i}
          onClick={(e) => this.clickfun(e, date)}
        >
          <div className={style.datePart}>
            {("00" + myPastDate.getHours()).slice(-2)}:
            {("00" + myPastDate.getMinutes()).slice(-2)}
          </div>
          <div className={style.colorPart} style={{ backgroundColor: color }}>
            color
          </div>
        </div>
      );

      myPastDate.setMinutes(myPastDate.getMinutes() + 30);

      this.setState({ timeLineGhost: temp }, () => {
        this.myRef.current.scrollTo(0, 6300);
      });
    }
  };

  scrollDate = (e) => {
    // moze van
    //-------------------
    let myCurrentDate = new Date();
    let myPastDate = new Date(myCurrentDate);
    myPastDate.setHours(myPastDate.getHours() - 36);

    if (myPastDate.getMinutes() >= 30) myPastDate.setMinutes(30);
    else myPastDate.setMinutes(0);

    //-------------------

    let udaljenost = e.target.childNodes[0].getBoundingClientRect().y - 120;
    let polaSat = Math.floor(-udaljenost / 90) * 30;
    myPastDate.setMinutes(myPastDate.getMinutes() + polaSat);

    let tempDate = String(
      ("00" + myPastDate.getDate()).slice(-2) +
        "/" +
        ("00" + (myPastDate.getMonth() + 1)).slice(-2) +
        "/" +
        myPastDate.getFullYear()
    );

    this.setState({ date: tempDate });
  };

  //obavezno promeni da lici na nesto :D
  //promeni posle u async
  clickfun = async (e, date) => {
    this.setState(
      { active: e.target, previus: this.state.active, selectedDate: date },
      () => {
        if (this.state.previus) {
          let temp = this.state.previus;
          temp.style.border = "5px solid transparent";
          // this.setState({ previus: temp });
        }
        if (this.state.active && this.state.active !== this.state.previus) {
          e.target.style.border = "5px solid rgba(2, 215, 253, 0.486)";
        }
        if (
          this.state.active != null &&
          this.state.active === this.state.previus
        ) {
          this.setState(
            { active: null, previus: null, selectedDate: null },
            () => {
              this.props.selectTimeLine(
                this.state.active,
                this.state.selectedDate
              );
              return;
            }
          );
        }
        this.props.selectTimeLine(this.state.active, this.state.selectedDate); //u callback
      }
    );
  };

  render() {
    return (
      <>
        <div className={style.date}>{this.state.date}</div>
        <div
          className={style.left}
          ref={this.myRef}
          onScroll={(e) => this.scrollDate(e)}
        >
          {this.state.data
            ? this.state.timeLineGhost
            : this.state.timeLineGhost}
        </div>
      </>
    );
  }
}

export default ActivitiesL;
