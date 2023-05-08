// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }


    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // Create Item
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        // Add Item to mapping
        items[_id] = item;

        // Emit event
        emit List(_name, _cost, _stock);
    }

    function buy(uint256 _id) public payable {
        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        require(msg.value >= item.cost);

        // Require item is in stock
        require(item.stock > 0);

        // Create order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++; // <-- Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        items[_id].stock = item.stock - 1;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function getAllItems() public view  returns (Item[] memory) {
        Item[] memory allItems = new Item[](orderCount[msg.sender]);

        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= orderCount[msg.sender]; i++) {
            Order memory currentOrder = orders[msg.sender][i];
            Item memory currentItem = currentOrder.item;
            allItems[currentIndex] = currentItem;
            currentIndex++;
        }

        return allItems;
    }

    function subscribe(uint256 _id) public payable {
        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        require(msg.value >= item.cost);

        // Require item is in stock
        require(item.stock > 0);

        // Create order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++; // <-- Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        // items[_id].stock = item.stock - 1;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    //unsubscribe the product and it will be available for other users
    function unsubscribe(uint256 _id) public  payable {
        // Fetch item
        Item storage item = items[_id];


        // Require user has bought the item before
        require(orderCount[msg.sender] > 0);

        // Get the last order for this item by the user
        Order storage order = orders[msg.sender][orderCount[msg.sender]];

        // Require the order is for this item
        require(order.item.id == _id);

        // Increase stock
        // item.stock++;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);

        delete orders[msg.sender][orderCount[msg.sender]];

        // Decrease the order count for the user
        orderCount[msg.sender]--;
    }
}





