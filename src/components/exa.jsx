import React, { Component } from "react";
class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: "Item 1" },
        { id: 2, text: "Item 2" },
        { id: 3, text: "Item 3" },
      ],
    };
    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(id, newText) {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      ),
    }));
  }

  render() {
    return (
      <ul>
        {this.state.items.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.text}
              onChange={(e) => this.updateItem(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    );
  }
}
export default MyList;
