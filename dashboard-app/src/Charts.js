/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Pie from "./Pie";
import Bar from "./Bar";
import Line from "./Line";
import Area from "./Area";
import Navbar from "./Navbar";

const Charts = () => {

  var [measures, setMeasures] = useState([]);
  var [dimensions, setDimensions] = useState([]);
  var [filters, setFilters] = useState([]);
  var [filterDimension, setFilterDimension] = useState("+ Select Dimension");
  var [filterOperator, setFilterOperator] = useState("+ Select Operator");
  var [filterValue, setFilterValue] = useState("");

  const add = (e) => {
    if(e.target.name === "measures") {
      if(!measures.includes(e.target.innerText)) {
        setMeasures((prevItems) => ([...prevItems, e.target.innerText]));
      }
    }
    else if(e.target.name === "dimensions"){
      if(!dimensions.includes(e.target.innerText)) {
        setDimensions((prevItems) => ([...prevItems, e.target.innerText]));
      }
    }
    else {
      setFilterDimension(e.target.innerText);
    }
  }

  const changeOperator = (e) => {
    setFilterOperator(e.target.innerText);
  } 

  const changeFilterValue = (e) => {
    setFilterValue(e.target.value);
  }

  const addFilter = () => {
    const filter = {
      dimension: filterDimension,
      operator: filterOperator,
      values: [filterValue]
    }
    setFilters((prevItems) => ([...prevItems, filter]));
    setFilterDimension("Select Dimension");
    setFilterOperator("Select Operator");
  }

  const createMeasure = (props, index) => {
    const remove = () => {
      var temp = [...measures];
      var index = temp.indexOf(props);
      if(index !== -1) {
        temp.splice(index, 1);
        setMeasures(temp);
      }
    }
    return <span className="top">
    <span className="top item">  
      <span className="value"> {props} </span>
      <span className="remove expand" onClick={remove}> <strong> X </strong> </span>
    </span>
  </span>
  }

  const createDimension = (props, index) => {
    const remove = () => {
      var temp = [...dimensions];
      var index = temp.indexOf(props);
      if(index !== -1) {
        temp.splice(index, 1);
        setDimensions(temp);
      }
    }
    return <span className="top item">  
      <span className="value"> {props} </span>
      <span className="remove expand" onClick={remove}> <strong> X </strong> </span>
    </span>
  }

  const createFilter = (props, index) => {
    const remove = () => {
      var temp = [...filters];
      var index = temp.indexOf(props);
      if(index !== -1) {
        temp.splice(index, 1);
        setFilters(temp);
      }
    }
    return <span className="top item" key={index}>
        <span className="value right"> {props.dimension} </span>
        <span className="value right"> {props.operator} </span>
        {props.values.map((value) => {return <span className="value right"> {value} </span>})}
        <span className="remove expand" onClick={remove}> <strong> X </strong> </span>
    </span>
  }


  return (<div>
  <Navbar />
  <div className="upper-margin">
    <div className="top boxes upper-margin">
      <h5> MEASURES </h5>
      <div className="dropdown right">
        {measures.map(createMeasure)}
        <button className="btn right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="plus"> + </span> Measure
        </button>
        <div
          className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#" name="measures" onClick={add}> ProductsPrices.cost </a>
            <a className="dropdown-item" href="#" name="measures" onClick={add}> ProductsPrices.numberOfOrders </a>
        </div>
      </div>
    </div>
    <div className="top boxes">
      <h5> DIMENSIONS </h5>
      <div className="dropdown right">
        {dimensions.map(createDimension)}
        <button className="btn right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="plus"> + </span> Dimension
        </button>
        <div
          className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#" name="dimensions" onClick={add}> Products.name </a>
            <a className="dropdown-item" href="#" name="dimensions" onClick={add}> ProductsPrices.city </a>
        </div>
      </div>
    </div>
    <div className="top boxes">
      <h5> FILTERS </h5>
      <span className="dropdown right">
        {filters.map(createFilter)}
        <button className="btn right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="plus"> {filterDimension} </span>
        </button>
        <div
          className="dropdown-menu right" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#" name="filters" onClick={add}> ProductsPrices.cost </a>
            <a className="dropdown-item" href="#" name="filters" onClick={add}> ProductsPrices.numberOfOrders </a>
            <a className="dropdown-item" href="#" name="filters" onClick={add}> Products.name </a>
            <a className="dropdown-item" href="#" name="filters" onClick={add}> ProductsPrices.city </a>
        </div>
      </span>
      <span className="dropdown right">
        <button className="btn right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="plus"> {filterOperator} </span>
        </button>
        <div
          className="dropdown-menu right" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> equals </a>
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> notEquals </a>
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> set </a>
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> notSet </a>
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> gt </a>
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> gte </a>
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> lt </a>
            <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> lte </a>
        </div>
      </span>
      <span className="right">
        <input type="search" onChange={changeFilterValue} placeholder="Enter value" required/>
      </span>
      <span>
        <button onClick={addFilter} className="right left box expand"> Add Filter </button>
      </span>
    </div>
    <div className="charts">
        <div className="space center">
          <Area
            key = {4}
            measures = {measures}
            dimensions = {dimensions}
            filters = {filters}
          />
        </div>
        <div className="space center">
          <Bar
            key = {2}
            measures = {measures}
            dimensions = {dimensions}
            filters = {filters}
          />
        </div>
        <div className="space center">
          <Line
            key = {3}
            measures = {measures}
            dimensions = {dimensions}
            filters = {filters}
          />
        </div>
        <div className="space center">
          <Pie
          key = {4}
            measures = {measures}
            dimensions = {dimensions}
            filters = {filters}
          />
        </div>
    </div>
  </div>
</div>);
}
  

export default Charts;