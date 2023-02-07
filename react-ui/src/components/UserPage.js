import React, { Component } from 'react';
import axios from 'axios';

export default class UserPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
       initialTime: new Date(),
       questions: [],
       answers: {},
       result: null
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let answers = [];

    const keys = Object.keys(this.state.answers)
    if (keys.length !== this.state.questions.length) {
      alert("All questions should be answered before submit");
      return
    }

    keys.forEach(key => {
      answers.push({ questionId: key, title: this.state.answers[key]});
    })
    const finalTime =  new Date().getTime()
    const duration = finalTime - this.state.initialTime.getTime();
    const durationInSeconds = duration / 1000;

    console.log({ finalTime, initialTime: this.state.initialTime.getTime()})

    axios.post('http://localhost:3000/api/v1/answers', { answers, durationInSeconds })
    .then(_ => {
      this.setState({result: "answers resgistered, thanks!", duration: durationInSeconds, answers: {}})
      e.target.reset();
    })
    .catch(error => {
      this.setState({result: `ERROR: ${error}`});
    })
  }

  handleInputChange(e) {
    let answers = { ...this.state.answers }
    answers[e.target.name] = e.target.value
    this.setState({answers: answers})
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/questions')
      .then(response => {
        let answers = {}
        response.data.forEach(q => answers[q.id] = "")
        this.setState({questions: response.data, answers: answers})

      })
      .catch(error => console.log(error))
  }

  renderQuestions() {
    return this.state.questions.map((question) => {
      return (
        <div key={question.id}>
          <label>{question.title}: </label>
          <input type="text" name={question.id} value={this.state.answers[question.id]} onChange={(e) => this.handleInputChange(e)}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>User Page</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderQuestions()}
          <input type="submit" value="Submit" />
        </form>

        { this.state.result &&
          <div>
            <p>result: {this.state.result}</p>
            <p>Duration: {this.state.duration} seconds - (time to fill the form)</p>
          </div>
        }
      </div>
    );
  }
}
