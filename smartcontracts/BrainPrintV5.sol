// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BPrintV4 is ERC721Enumerable, Ownable {
    using Strings for uint256;

    constructor(address initialOwner, string memory name, string memory symbol) Ownable(initialOwner) ERC721(name, symbol) {
        //tokenContract = IERC20(_tokenContract);
    }

    // Base URI for metadata
    string private baseTokenURI;

    // Address of the ERC20 token used for minting
  //  IERC20 public tokenContract;

    // Minting price in your custom token (18 decimal places)
    uint256 public mintingPrice = 0; // 1 token, assuming 18 decimals

    // Current token ID
    uint256 private currentTokenId = 0;

    struct NFTMetadata {
        string name;
        string ipfs;
        // Add more attributes as needed
    }

    // Mapping to store metadata
    mapping(uint256 => NFTMetadata) public tokenMetadata;

    // Hashes mapping
    mapping(address => bytes32) public userHashes;

    function setHash(address userAddr, string memory data) public {
        bytes32 calculateHash = sha256(abi.encode(userAddr, data));
        userHashes[userAddr] = calculateHash;
    }

    function checkHash(address ownerAddr, string memory data) public view returns (bool) {
        require(userHashes[ownerAddr] != 0, "User hash not set");
        bytes32 calculatedHash = sha256(abi.encode(ownerAddr, data));
        bytes32 storedHash = userHashes[ownerAddr];
        return calculatedHash == storedHash;
    }

    function mint(string memory ipfs, string memory data) public {
        require(checkHash(msg.sender, data), "Invalid hash");
        require(bytes(ipfs).length > 0, "IPFS cannot be empty");

        _mint(msg.sender, currentTokenId);

        NFTMetadata memory metadata = NFTMetadata({
            name: currentTokenId.toString(),
            ipfs: ipfs
        });

        tokenMetadata[currentTokenId] = metadata;

        currentTokenId++;
    }

    // Set base URI
    function setBaseURI(string memory _newBaseTokenURI) public onlyOwner {
        require(bytes(_newBaseTokenURI).length > 0, "Base URI cannot be empty");
        baseTokenURI = _newBaseTokenURI;
    }

    // Override function to return token URI
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    // Withdraw funds from the contract
    function withdrawFunds() public onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");

        (bool success,) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }



    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory) {
        NFTMetadata memory metadata = tokenMetadata[tokenId];
        return metadata.ipfs;
    }
}