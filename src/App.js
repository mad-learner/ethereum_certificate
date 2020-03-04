//import React from "react";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import certificate from "./certificate";

class App extends Component {
  /*
  constructor(props) {
    super(props);

    this.state = { issuer: "" };
  } */
  state = { //This declaration = contstructor function above
    issuer: "",
    message: ""
  };

  async componentDidMount() {
    const issuer = await certificate.methods.issuer().call();

    this.setState({ issuer });
  }
  /*
  window.addEventListener('load', async () => {
    try {
        await ethereum.enable();
    } catch (error) {}
  }); */

  onSubmit = async event => {
    event.preventDefault();

    web3.eth.defaultAccount = '0x19bb239e56f93d3bc1b595aec109349921ffb25e';
    var defaultAccount = web3.eth.defaultAccount;
    //console.log(defaultAccount);
    //const accounts = await ethereum.enable();
    //const accounts = await web3.eth.getAccounts(); //Change for hardcoded issuer
    //let from = web3.utils.toChecksumAddress(accounts[0]);
    //let from = web3.utils.toChecksumAddress("0x19bB239E56F93D3bC1B595AEc109349921FFB25e");
    //await console.log(accounts);
    this.setState({ message: 'Signing the transaction on Ethereum network...' });

    await certificate.methods.set_hash("0x123456").send({//Add hash to be sent in set_hash()
      from: defaultAccount
    });
      //from: "0x19bB239E56F93D3bC1B595AEc109349921FFB25e"
      //from: accounts[0]         //Change for hardcoded issuer?
      //from: from
      //value: web3.utils.toWei('0.011', 'ether')
    //});

    this.setState({ message: 'Transaction successfully registered.' });
  };

  render() {
    return (
      <div>
        <h2>Get your Academic Certificate</h2>
        <p>
          Your certificate will be issued by the University's address:{" "}
          {this.state.issuer}
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <div>
            <label>Choose a certificate to be issued among your completed courses: </label>
            <select id="cert">
              <option value="Cybersecurity and Forensics">Cybersecurity and Forensics</option>

            </select>
          </div>
          <button>Issue</button>
        </form>

        <hr />

        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default App;

/*
function App() {
  constructor(props) {
    super(props);

    this.state = { issuer: '' };
  }

  async componentDidMount() {
    const issuer = await certificate.methods.issuer().call();

    this.setState({ issuer });
  }

  return (
    <div>
      <h2>Get your Academic Certificate</h2>
      <p>Your certificate will be issued by the University's address {this.state.issuer}</p>
    </div>
  );
}

export default App;
*/
