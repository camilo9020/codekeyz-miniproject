import React, { Component } from 'react';
import axios from 'axios'
import { CSVLink } from 'react-csv';

export default class AdminPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      csvData: [],
      formDurations: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/questions')
      .then(response => {
        let csvData = [['QuestionId', 'QuestionTitle', 'Answers']]
        response.data.forEach(question => {
          const answers = question.answers.map(answer => answer.title)
          csvData.push([question.id, question.title, answers])
        });
        this.setState({questions: response.data, csvData: csvData})
      })
      .catch(error => console.log(error))


    axios.get('http://localhost:3000/api/v1/form_durations')
      .then(response => {
        this.setState({formDurations: response.data})

      })
      .catch(error => console.log(error))
  }

  renderFormDurations() {
    return this.state.formDurations.map((register) =>{
      const date = new Date(`${register.created_at}`)
      console.log({date})
      return (
        <li>{date.toLocaleString()}: <strong>{register.duration} Seconds</strong></li>
      )
    })
  }


  renderQuestionsWithAnswers() {
    return this.state.questions.map((question) => {
      return (
        <div key={question.id}>
          <p><strong>question: {question.title}</strong></p>
          <p><strong>Answers:</strong></p>
          <ul>
            {question.answers.map((answer) =>
              <li key={answer.id}>{answer.title}</li>
            )}
          </ul>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <h2>Form Times</h2>
        <ul>
          {this.renderFormDurations()}
        </ul>
        <h2>Questions</h2>
        {this.renderQuestionsWithAnswers()}
        <CSVLink data={this.state.csvData}>Download data in CSV</CSVLink>;
      </div>
    );
  }
}
