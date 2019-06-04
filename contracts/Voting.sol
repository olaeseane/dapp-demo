pragma solidity >=0.4.21 <0.6.0;

contract Voting {

    string public name;

    struct Variant {
        string name;
        string description;
        uint votes;
    }

    Variant[] public variants;

    mapping(address => bool) public isVoted;

    event votedEvent (
        uint indexed _variantId
    );

    constructor() public {
        name = 'What is the best platform for DAPP development?';

        variants.push(Variant('Ethereum + Quorum', 'Tropical plant with an edible fruit', 0));
        variants.push(Variant('EOS', 'Tropical plant with an edible fruit', 0));
        variants.push(Variant('TRON', 'Tropical plant with an edible fruit', 0));
        variants.push(Variant('Telegram Open Network', 'Tropical plant with an edible fruit', 0));
    }

    modifier hasNotVoted() {
        require(!isVoted[msg.sender]);
        _;
    }

    modifier validVariantId(uint _variantId) {
        require(_variantId >= 0 && _variantId <= variants.length - 1);
        _;
    }

    function getNumberVariants() public view returns (uint) {
        return variants.length;
    }

    function vote(uint _variantId) public validVariantId(_variantId) hasNotVoted {
        variants[_variantId].votes++;
        isVoted[msg.sender] = true;
        emit votedEvent(_variantId);
    }

    function getVotesCount(uint _variantId) public view validVariantId(_variantId) returns (uint) {
        return variants[_variantId].votes;
    }

    function getWinVariantId() public view returns (uint winId) {
        uint maxVotes = variants[0].votes;
        winId = 0;
        for (uint i = 1; i < variants.length; ++i) {
            if (variants[i].votes > maxVotes) {
                maxVotes = variants[i].votes;
                winId = i;
            }
        }
    }
}