import React from "react";
import Web3 from "web3";
import TruffleContract from "truffle-contract";

import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/MessageStrip";
import "@ui5/webcomponents/dist/Card";

import VariantList from "./VariantList";
import Voting from "./contracts/Voting";

class App extends React.Component {
  state = {
    account: null,
    hasVoted: false,
    loading: true,
    progress: false,
    voting: { name: "", variants: [], votes: 0 }
  };

  constructor(props) {
    super(props);

    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:7545", null, {});
    this.voting = TruffleContract(Voting);
    this.voting.setProvider(this.web3.currentProvider);
  }

  handleVote = async (id, event) => {
    this.setState({ progress: true });
    try {
      await this.instance.vote(id, { from: this.state.account });
    } catch (err) {
      console.error(err);
    }
    console.log("Vote->", id);
  };

  async componentDidMount() {
    let account = null,
      number,
      name = null,
      hasVoted = false,
      variants = [];

    try {
      account = await this.web3.eth.getCoinbase();
      this.instance = await this.voting.deployed();
      number = (await this.instance.getNumberVariants()).toNumber();
      name = await this.instance.name();
      for (let i = 0; i < number; i++) {
        const { name, description, votes } = await this.instance.variants(i);
        variants.push({ name, description, votes });
      }
      hasVoted = await this.instance.isVoted(account);
      await this.instance.events.VotedEvent({ fromBlock: 0 }, () => {
        this.setState({ progress: false });
      });
    } catch (err) {
      console.error(err);
    }

    this.setState({
      account,
      hasVoted,
      loading: false,
      voting: { name, variants }
    });
  }

  render() {
    const { account, loading, progress, voting } = this.state;

    console.log('this.state->',this.state);
    return (
      <div>
        <ui5-shellbar primary-title={this.props.label} logo={this.props.logo} />
        {loading || progress ? (
          <ui5-messagestrip hide-close-button type="Warning">
            Loading...
          </ui5-messagestrip>
        ) : (
          <div>
            <VariantList onVote={this.handleVote} {...voting} />
            <ui5-panel fixed className="panel-width">
              <ui5-label htmlFor="myAccount">
                Your blockchain account:
              </ui5-label>
              <ui5-input id="myAccount" readonly value={account} />
            </ui5-panel>
          </div>
        )}
      </div>
    );
  }
}

export default App;
