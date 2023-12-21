// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract bettingPlatform {
    struct Bet {
        address better;
        uint256 betamount;
        uint256 answer;
        uint256 id;
    }

    mapping(uint256 => Bet) public bets;
    uint256 public betCounter;

    uint256 private answerog = 3;

    function bet(uint256 _betamount, uint256 _answer, address payable _better) external payable {
        require(_betamount > 0, "Bet amount must be greater than zero");

        bets[betCounter] = Bet({
            better: _better,
            betamount: _betamount,
            answer: _answer,
            id: betCounter
        });
        betCounter++;
    }

    function adminAnswer(uint256 _answer) external {
        answerog = _answer;
    }

    function uploadQuestion() external {
        answerog=3;
        while (betCounter!=0) {
            delete bets[betCounter];
            betCounter--;
        }
    }
    function getAll() public view returns (Bet[] memory, uint256){
    Bet[] memory ret = new Bet[](betCounter);
    for (uint256 i = 0; i < betCounter; i++) {
        ret[i] = bets[i];
    }
    return (ret,answerog);
}
    function counter() public view returns(uint256){
        return(betCounter);
    }
}
