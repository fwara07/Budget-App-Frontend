import React, { Component } from "react";
import CreateCategory from "./containers/CreateCategory";

export default class Categories extends Component {
  render() {
    return (
      <div>
        <CreateCategory
          isUpdate={false}
          categoryTitle=""
          depositLimit={10}
          withdrawLimit={10}
        />
      </div>
    );
  }
}
