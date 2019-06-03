import React from "react";

let Variant = props => {
  const { name, description, votes } = props.variant;
  return (
    <ui5-li
      onClick={e => props.onVote(props.id, e)}
      icon="sap-icon://it-system"
      description={description}
    >
      {name} - <b>{votes.toNumber()}</b>
    </ui5-li>
  );
};

class VariantList extends React.Component {
  render() {
    const { name, variants, onVote } = this.props;

    return (
      <ui5-panel fixed accessible-role="Form" className="panel-width">
        <ui5-list id="variants-selector" mode="SingleSelect" header-text={name}>
          {variants.map((v, i) => (
            <Variant onVote={onVote} key={i} id={i} variant={v} />
          ))}
        </ui5-list>
      </ui5-panel>
    );
  }
}

export default VariantList;
