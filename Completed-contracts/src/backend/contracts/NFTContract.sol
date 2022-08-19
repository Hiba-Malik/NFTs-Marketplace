// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    mapping(address => bool) public _allowList;

    constructor(address admin) ERC721("Testing NFT", "TNFT") {
        _allowList[admin] = true;
    }

    function whitelistAdmins(address walletAddress) public {
        _allowList[walletAddress] = true;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

    // bulk minting
    function mintAllowList(
        uint8 numberOfTokens,
        string memory _tokenUri,
        address markplace
    ) external {
        require(_allowList[msg.sender] == true, "Invalid Minter");
        for (uint256 i = 0; i < numberOfTokens; i++) {
            _tokenIds++;
            _safeMint(msg.sender, _tokenIds);
            _setTokenURI(_tokenIds, _tokenUri);
            setApprovalForAll(markplace, true);
        }
    }

    function singleMint(string memory _tokenUri, address markplace) external {
        _tokenIds++;
        _safeMint(msg.sender, _tokenIds);
        _setTokenURI(_tokenIds, _tokenUri);
        setApprovalForAll(markplace, true);
    }
}
