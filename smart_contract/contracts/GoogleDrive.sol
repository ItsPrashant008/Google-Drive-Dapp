// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Access {
    address user;
    bool access;
}

contract GoogleDrive {

    address public owner;
    constructor() {
        owner =msg.sender;
    }
    
    mapping(address => Access[]) public accessList;
    mapping(address => string[]) public value;
    mapping(address => mapping(address => bool)) public ownerShip;

    function add(address _user, string memory _url) external {
        value[_user].push(_url);
    }

    function allow(address _user) external {
        ownerShip[msg.sender][_user] = true;
        uint256 checkUser = 0;
        uint256 userExits = 0;
        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                checkUser++;
                userExits = i;
            }
        }

        if (checkUser == 0) {
            accessList[msg.sender].push(Access(_user, true));
        }else{
            accessList[msg.sender][userExits].access = true;
        }
    }

    function disallow(address _user) external {
        ownerShip[msg.sender][_user] = false;
        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownerShip[_user][msg.sender],
            "You don't have Access!"
        );
        return value[_user];
    }

    function shareAccess() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
